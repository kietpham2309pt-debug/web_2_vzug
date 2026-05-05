import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

const PRODUCTS_FILE = "src/data/products.json";
const PUBLIC_DIR = "public";
const PLACEHOLDER_RE = /placeholder|placehold|fallback/i;

function collectImageRefs(product) {
  const refs = [];
  if (typeof product.thumbnail === "string") {
    refs.push({ field: "thumbnail", image: product.thumbnail.trim() });
  } else {
    refs.push({ field: "thumbnail", image: "" });
  }

  if (Array.isArray(product.images)) {
    product.images.forEach((image, index) => {
      refs.push({
        field: `images[${index}]`,
        image: typeof image === "string" ? image.trim() : "",
      });
    });
  } else {
    refs.push({ field: "images", image: "" });
  }

  return refs;
}

async function checkLocalImage(image) {
  const relativePath = image.replace(/^\/+/, "");
  try {
    await access(join(process.cwd(), PUBLIC_DIR, relativePath));
    return { ok: true, issue: "" };
  } catch {
    return { ok: false, issue: "local file missing in public/" };
  }
}

async function checkExternalImage(image) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    let response = await fetch(image, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "VZUG product image audit" },
    });

    if ([403, 405].includes(response.status)) {
      response = await fetch(image, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "user-agent": "VZUG product image audit",
          range: "bytes=0-0",
        },
      });
    }

    const contentType = response.headers.get("content-type") || "";
    if (!response.ok && response.status !== 206) {
      return { ok: false, issue: `HTTP ${response.status}` };
    }
    if (contentType && !contentType.toLowerCase().startsWith("image/")) {
      return { ok: false, issue: `content-type ${contentType}` };
    }
    return { ok: true, issue: "" };
  } catch (error) {
    return {
      ok: false,
      issue: error.name === "AbortError" ? "timeout" : String(error.message || error),
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function checkImage(image) {
  if (!image) return { ok: false, issue: "empty image path" };
  if (image.startsWith("/")) return checkLocalImage(image);
  if (/^https:\/\//i.test(image)) return checkExternalImage(image);
  if (/^http:\/\//i.test(image)) return { ok: false, issue: "image URL is not HTTPS" };
  return { ok: false, issue: "image path is not root-relative or absolute HTTPS" };
}

const products = JSON.parse(await readFile(PRODUCTS_FILE, "utf8"));
const allRefs = products.flatMap((product) =>
  collectImageRefs(product).map((ref) => ({ product, ...ref }))
);
const uniqueImages = [...new Set(allRefs.map((ref) => ref.image).filter(Boolean))];
const statusByImage = new Map();

let cursor = 0;
async function worker() {
  while (cursor < uniqueImages.length) {
    const image = uniqueImages[cursor++];
    statusByImage.set(image, await checkImage(image));
  }
}
await Promise.all(Array.from({ length: 10 }, worker));

const issues = [];
for (const ref of allRefs) {
  const status = ref.image ? statusByImage.get(ref.image) : { ok: false, issue: "empty image path" };
  if (!status?.ok) {
    issues.push({
      product: ref.product.name || "(missing name)",
      slug: ref.product.slug || "(missing slug)",
      image: ref.image || ref.field,
      issue: `${ref.field}: ${status?.issue || "unknown"}`,
      suggestedFix: ref.image?.startsWith("/")
        ? "Add the file under public/ or update the image path."
        : "Replace with a valid official HTTPS image URL or a licensed local asset.",
    });
  }
}

const placeholderRefs = allRefs.filter((ref) => PLACEHOLDER_RE.test(ref.image));
const duplicateImages = uniqueImages
  .map((image) => ({ image, count: allRefs.filter((ref) => ref.image === image).length }))
  .filter((entry) => entry.count > 1);
const suspicious = placeholderRefs.length > Math.max(5, products.length * 0.1) ? placeholderRefs.length : 0;

console.log(`Total products: ${products.length}`);
console.log(`Total image references: ${allRefs.length}`);
console.log(`Unique image references: ${uniqueImages.length}`);
console.log(`Broken/missing images: ${issues.length}`);
console.log(`Duplicate image URLs: ${duplicateImages.length}`);
console.log(`Suspicious placeholder refs: ${suspicious}`);

if (issues.length > 0) {
  console.table(
    issues.map((issue) => ({
      "product name": issue.product,
      slug: issue.slug,
      image: issue.image,
      issue: issue.issue,
      "suggested fix": issue.suggestedFix,
    }))
  );
  process.exitCode = 1;
} else {
  console.log("No broken or missing product images found.");
}

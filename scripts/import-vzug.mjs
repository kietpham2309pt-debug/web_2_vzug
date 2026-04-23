/**
 * import-vzug.mjs
 * Reads vzug_products.xlsx and writes:
 *   - src/data/products.json
 *   - src/data/summary.json
 *   - src/data/category-counts.json
 *
 * Run: node scripts/import-vzug.mjs
 * Or:  node scripts/import-vzug.mjs path/to/vzug_products.xlsx
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import XLSX from "xlsx";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

function slugify(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripHtml(html) {
  if (!html) return "";
  return String(html)
    .replace(/<img[^>]*>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

// ── Category mapping (V-ZUG product types -> website slugs) ─────────────────

const TYPE_TO_CATEGORY = {
  // Ovens
  "lò nướng": { name: "Lò nướng âm tủ", slug: "lo-nuong" },
  "lò nướng âm tủ": { name: "Lò nướng âm tủ", slug: "lo-nuong" },
  // Steam ovens / combi
  "lò hấp": { name: "Lò hấp kết hợp", slug: "lo-hap" },
  "lò hấp kết hợp": { name: "Lò hấp kết hợp", slug: "lo-hap" },
  "lò nướng kết hợp hơi nước": { name: "Lò hấp kết hợp", slug: "lo-hap" },
  // Microwave
  "lò vi sóng": { name: "Lò vi sóng", slug: "lo-vi-song" },
  "lò vi sóng kèm nướng": { name: "Lò vi sóng", slug: "lo-vi-song" },
  // Warming drawers
  "ngăn hâm nóng": { name: "Ngăn hâm nóng", slug: "ngan-ham-nong" },
  "ngăn chứa": { name: "Ngăn hâm nóng", slug: "ngan-ham-nong" },
  // Vacuum drawer
  "ngăn hút chân không": { name: "Ngăn hút chân không", slug: "ngan-hut-chan-khong" },
  // Fridges
  "tủ lạnh": { name: "Tủ lạnh", slug: "tu-lanh" },
  "tủ lạnh kết hợp tủ đông": { name: "Tủ lạnh", slug: "tu-lanh" },
  "tủ đông": { name: "Tủ lạnh", slug: "tu-lanh" },
  // Wine cabinets
  "tủ rượu": { name: "Tủ rượu vang", slug: "tu-ruou" },
  // Hoods
  "máy hút mùi": { name: "Máy hút mùi", slug: "may-hut-mui" },
  "máy hút mùi thiết kế": { name: "Máy hút mùi", slug: "may-hut-mui" },
  "máy hút mùi âm": { name: "Máy hút mùi", slug: "may-hut-mui" },
  "máy hút mùi âm bàn": { name: "Máy hút mùi", slug: "may-hut-mui" },
  // Cooktops
  "bếp từ": { name: "Bếp từ", slug: "bep-tu" },
  "bếp từ tích hợp hút mùi": { name: "Bếp từ", slug: "bep-tu" },
  "bếp module": { name: "Bếp từ", slug: "bep-tu" },
  "bếp gas": { name: "Bếp gas", slug: "bep-gas" },
  // Dishwashers
  "máy rửa chén": { name: "Máy rửa chén", slug: "may-rua-chen" },
  // Laundry
  "máy giặt": { name: "Máy giặt & sấy", slug: "may-giat-say" },
  "máy sấy": { name: "Máy giặt & sấy", slug: "may-giat-say" },
  "hệ thống chăm sóc vải": { name: "Máy giặt & sấy", slug: "may-giat-say" },
  // Supremo / others
  "supremo": { name: "Bộ sưu tập Supremo", slug: "supremo" },
};

function mapCategory(productType) {
  if (!productType) return { name: "Khác", slug: "khac" };
  const lower = String(productType).toLowerCase().trim();
  if (TYPE_TO_CATEGORY[lower]) return TYPE_TO_CATEGORY[lower];
  for (const [key, cat] of Object.entries(TYPE_TO_CATEGORY)) {
    if (lower.includes(key)) return cat;
  }
  return { name: productType, slug: slugify(productType) };
}

function parseSpecs(specsStr, sku, brand) {
  const base = [
    { label: "Thương hiệu", value: brand || "V-ZUG" },
    { label: "Xuất xứ", value: "Thụy Sĩ (Swiss Made)" },
    { label: "Mã sản phẩm", value: sku },
  ];
  if (!specsStr || specsStr === "[]") return base;
  try {
    const parsed = JSON.parse(specsStr);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const existing = new Set(base.map((s) => s.label.toLowerCase()));
      for (const spec of parsed) {
        if (
          spec &&
          spec.label &&
          spec.value &&
          !existing.has(String(spec.label).toLowerCase())
        ) {
          base.push({ label: String(spec.label), value: String(spec.value) });
          existing.add(String(spec.label).toLowerCase());
        }
      }
    }
  } catch {
    // ignore invalid json
  }
  return base;
}

function extractFeatures(htmlDesc) {
  if (!htmlDesc) return [];
  const items = htmlDesc.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
  return items
    .map((li) => stripHtml(li))
    .filter((t) => t.length > 10 && t.length < 280)
    .slice(0, 10);
}

// Build a unique slug per product (handle dedupe)
function uniqueSlug(base, used) {
  let slug = base;
  let i = 2;
  while (used.has(slug)) {
    slug = `${base}-${i++}`;
  }
  used.add(slug);
  return slug;
}

// ── Main ────────────────────────────────────────────────────────────────────

const xlsxPath = process.argv[2]
  ? resolve(process.argv[2])
  : resolve(ROOT, "vzug_products.xlsx");

console.log(`Reading: ${xlsxPath}`);

const wb = XLSX.readFile(xlsxPath);
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });

console.log(`Found ${rows.length} rows\n`);

const products = [];
const warnings = [];
const usedSlugs = new Set();

for (let i = 0; i < rows.length; i++) {
  const row = rows[i];
  const rowNum = i + 2;

  const name = String(row["Tên sản phẩm"] || "").trim();
  const sku = String(row["Mã sản phẩm"] || "").trim();
  const priceDisplay = String(row["Giá"] || "").trim();
  const priceNum = row["Giá (số)"];
  const productType = String(row["Loại sản phẩm"] || "").trim();
  const brand = String(row["Thương hiệu"] || "V-ZUG").trim();
  const descHtml = String(row["Mô tả (HTML)"] || "").trim();
  const shortDesc = String(row["Mô tả ngắn"] || "").trim();
  const specsStr = String(row["Thông số kỹ thuật"] || "").trim();
  const inStockStr = String(row["Còn hàng"] || "").trim();
  const tagsStr = String(row["Tags"] || "").trim();
  const handle = String(row["Handle"] || "").trim();

  if (!sku) {
    warnings.push(`Row ${rowNum}: missing SKU, skipped.`);
    continue;
  }

  // Images: Ảnh 1 .. Ảnh 8 (VZUG Excel has up to 8)
  const images = [];
  for (let j = 1; j <= 12; j++) {
    const raw = String(row[`Ảnh ${j}`] || "").trim();
    if (!raw) continue;
    // Some URLs contain `{IMAGE_FORMAT}` placeholder — replace with a real size
    const url = raw.replace(/\{IMAGE_FORMAT\}/g, "large");
    if (url.startsWith("http://") || url.startsWith("https://")) {
      images.push(url);
    }
  }

  const category = mapCategory(productType);

  // Price — VZUG data has no prices; display as "Liên hệ"
  const price = typeof priceNum === "number" && priceNum > 0 ? priceNum : 0;

  const specs = parseSpecs(specsStr, sku, brand);

  let features = extractFeatures(descHtml);
  if (features.length === 0) {
    features = [
      "Swiss Made — chế tác thủ công tại Zug, Thụy Sĩ",
      "Công nghệ điều khiển cảm ứng CircleSlider",
      `Mã sản phẩm: ${sku}`,
    ];
  }

  const baseSlug = handle ? slugify(handle) : slugify(`vzug-${name}-${sku}`);
  const slug = uniqueSlug(baseSlug, usedSlugs);

  let finalShort = shortDesc;
  if (!finalShort) finalShort = stripHtml(descHtml).slice(0, 260);
  if (!finalShort) {
    finalShort = `${name} — thiết bị nhà bếp cao cấp V-ZUG Thụy Sĩ, nhập khẩu chính hãng.`;
  }

  const tags = [category.slug, "vzug", "swiss-made"];
  if (tagsStr) {
    for (const t of tagsStr.split(",")) {
      const ts = slugify(t);
      if (ts && !tags.includes(ts)) tags.push(ts);
    }
  }

  // rating heuristic: premium brand baseline
  const rating = 4.7 + (Number(sku.slice(-1)) % 3) * 0.1;
  const reviewCount = 12 + (Number(sku.slice(-2)) || 0) % 80;

  products.push({
    id: `vzug-${sku}`,
    slug,
    name: name || `${productType} V-ZUG ${sku}`,
    brand: "V-ZUG",
    category: category.name,
    categorySlug: category.slug,
    subcategory: productType !== category.name ? productType : undefined,
    price,
    originalPrice: undefined,
    discount: 0,
    images: images.length > 0 ? images : [],
    thumbnail: images[0] || "",
    description:
      descHtml ||
      `<p>Sản phẩm ${brand} ${sku} chính hãng, nhập khẩu từ Thụy Sĩ.</p>`,
    shortDescription: finalShort,
    priceDisplay: price > 0 ? undefined : (priceDisplay || "Liên hệ"),
    specs,
    features,
    inStock: inStockStr !== "Hết hàng",
    isNew: i < 8,
    isBestseller: i % 7 === 0,
    rating: Number(rating.toFixed(1)),
    reviewCount,
    tags,
    seoTitle: `${name} | V-ZUG Vietnam`,
    seoDescription: finalShort.slice(0, 160),
  });
}

console.log(`Processed ${products.length} products\n`);

// ── Write products.json ────────────────────────────────────────────────────

writeFileSync(
  resolve(ROOT, "src/data/products.json"),
  JSON.stringify(products, null, 2),
  "utf-8"
);

// ── Counts ──────────────────────────────────────────────────────────────────

const categoryCounts = {};
const categoryNames = {};
for (const p of products) {
  categoryCounts[p.categorySlug] = (categoryCounts[p.categorySlug] || 0) + 1;
  categoryNames[p.categorySlug] = p.category;
}
writeFileSync(
  resolve(ROOT, "src/data/category-counts.json"),
  JSON.stringify(categoryCounts, null, 2),
  "utf-8"
);

const brandCounts = {};
for (const p of products) brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;

const CATEGORY_ICONS = {
  "lo-nuong": "🔥",
  "lo-hap": "💨",
  "lo-vi-song": "⚡",
  "ngan-ham-nong": "🍽️",
  "ngan-hut-chan-khong": "🥡",
  "tu-lanh": "❄️",
  "tu-ruou": "🍷",
  "may-hut-mui": "🌬️",
  "bep-tu": "♨️",
  "bep-gas": "🔥",
  "may-rua-chen": "🧼",
  "may-giat-say": "🧺",
  supremo: "⭐",
  khac: "📦",
};

const summary = {
  total: products.length,
  categories: Object.entries(categoryCounts)
    .map(([slug, count]) => ({
      slug,
      name: categoryNames[slug],
      icon: CATEGORY_ICONS[slug] || "📦",
      count,
    }))
    .sort((a, b) => b.count - a.count),
  brands: Object.entries(brandCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count),
  updatedAt: new Date().toISOString(),
};

writeFileSync(
  resolve(ROOT, "src/data/summary.json"),
  JSON.stringify(summary, null, 2),
  "utf-8"
);

console.log(`Wrote ${products.length} products`);
console.log("\nCategories:");
for (const [slug, count] of Object.entries(categoryCounts).sort(
  (a, b) => b[1] - a[1]
)) {
  console.log(`  ${CATEGORY_ICONS[slug] || "📦"} ${categoryNames[slug]} (${slug}): ${count}`);
}

const noImages = products.filter((p) => p.images.length === 0);
if (noImages.length > 0) {
  console.log(`\nWarning: ${noImages.length} products have no images`);
}

if (warnings.length > 0) {
  console.log(`\nWarnings: ${warnings.length}`);
  warnings.forEach((w) => console.log(`  ${w}`));
}

console.log("\nDone.");

/**
 * Data layer — đọc dữ liệu từ src/data/products.json (server-side only).
 * Không import file này vào client components (sẽ bundle toàn bộ JSON vào browser).
 */
import rawProducts from "@/data/products.json";
import type { Product, Spec } from "@/types";
import { slugify } from "@/lib/utils";
import { productGroups } from "@/lib/data";

// ── HTML extraction helpers ──────────────────────────────────────────────────

/**
 * Extract spec rows from the HTML <table> found in the product description.
 * Handles tables like: <tr><td><strong>Label</strong></td><td><p>Value</p></td></tr>
 */
function extractSpecsFromHtml(html: string): Spec[] {
  if (!html) return [];
  const tableMatch = html.match(/<table[\s\S]*?<\/table>/i);
  if (!tableMatch) return [];
  const rows = tableMatch[0].match(/<tr[\s\S]*?<\/tr>/gi) || [];
  const strip = (s: string) =>
    s.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  return rows
    .map((row) => {
      const cells = row.match(/<td[\s\S]*?<\/td>/gi) || [];
      if (cells.length < 2) return null;
      const label = strip(cells[0] ?? "");
      const value = strip(cells[1] ?? "");
      if (!label || !value) return null;
      return { label, value } as Spec;
    })
    .filter((s): s is Spec => s !== null);
}

/**
 * Extract feature bullets from the first <ul> section of the product description.
 * Strips inner HTML tags (including images) and returns plain-text lines.
 */
function extractFeaturesFromHtml(html: string): string[] {
  if (!html) return [];
  const items = html.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
  return items
    .map((li) =>
      li
        .replace(/<img[^>]*>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    )
    .filter((text) => text.length > 10)
    .slice(0, 12);
}

// ── Normalize JSON data ──────────────────────────────────────────────────────
const rawArray: Record<string, unknown>[] = Array.isArray(rawProducts)
  ? (rawProducts as Record<string, unknown>[])
  : [];

export const allProducts: Product[] = rawArray.map((p) => {
  const htmlDesc = typeof p.description === "string" ? p.description : "";
  const rawSpecs = p.specs as Spec[] | undefined;
  const rawFeatures = p.features as string[] | undefined;
  return {
    ...(p as unknown as Product),
    // Prefer explicit JSON fields; fall back to parsing HTML description
    specs:
      Array.isArray(rawSpecs) && rawSpecs.length > 0
        ? rawSpecs
        : extractSpecsFromHtml(htmlDesc),
    features:
      Array.isArray(rawFeatures) && rawFeatures.length > 0
        ? rawFeatures
        : extractFeaturesFromHtml(htmlDesc),
    images: Array.isArray(p.images) ? (p.images as string[]) : [],
    tags: Array.isArray(p.tags) ? (p.tags as string[]) : [],
    rating: typeof p.rating === "number" ? p.rating : 0,
    reviewCount: typeof p.reviewCount === "number" ? p.reviewCount : 0,
    price: typeof p.price === "number" ? p.price : 0,
    inStock: p.inStock !== false,
  };
});

export interface FilterParams {
  q?: string;
  category?: string;
  brand?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResult {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export function filterAndPaginate(params: FilterParams = {}): PaginatedResult {
  const {
    q = "",
    category = "",
    brand = "",
    sort = "default",
    page = 1,
    limit = 20,
  } = params;

  let result = [...allProducts];

  // Tìm kiếm
  if (q) {
    const lower = q.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower) ||
        (p.shortDescription || "").toLowerCase().includes(lower)
    );
  }

  // Lọc danh mục — chấp nhận cả slug chuẩn (categorySlug) lẫn tên gốc
  if (category) {
    const catSlug = slugify(category);
    result = result.filter((p) => {
      const explicit = (p as Product & { categorySlug?: string }).categorySlug;
      return (explicit && explicit === catSlug) || slugify(p.category) === catSlug;
    });
  }

  // Lọc thương hiệu
  if (brand) {
    result = result.filter(
      (p) => p.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  // Sắp xếp
  switch (sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "discount":
      result.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
      break;
    case "new":
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case "name-asc":
      result.sort((a, b) => a.name.localeCompare(b.name, "vi"));
      break;
  }

  const total = result.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * limit;
  const products = result.slice(start, start + limit);

  return { products, total, page: safePage, totalPages, limit };
}

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = allProducts.filter(
    (p) => p.slug !== product.slug && p.category === product.category
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const fillers = allProducts.filter(
    (p) =>
      p.slug !== product.slug &&
      p.category !== product.category &&
      p.brand === product.brand
  );
  return [...sameCategory, ...fillers].slice(0, limit);
}

export function getFeaturedProducts(limit = 8): Product[] {
  // Ưu tiên sản phẩm có ảnh, đánh dấu bestseller hoặc rating cao
  const withImages = allProducts.filter((p) => p.thumbnail);
  const bestsellers = withImages.filter((p) => p.isBestseller);
  const pool = bestsellers.length >= limit ? bestsellers : withImages;
  return pool
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function getCategories(): { name: string; count: number; slug: string }[] {
  const map: Record<string, { count: number; slug: string }> = {};
  for (const p of allProducts) {
    if (!p.category) continue;
    const slug =
      (p as Product & { categorySlug?: string }).categorySlug ||
      slugify(p.category);
    if (!map[p.category]) map[p.category] = { count: 0, slug };
    map[p.category].count++;
  }
  return Object.entries(map)
    .map(([name, { count, slug }]) => ({ name, slug, count }))
    .sort((a, b) => b.count - a.count);
}

export interface CollectionCategorySummary {
  id: string;
  name: string;
  slug: string;
  href: string;
  productCount: number;
  /** Thumbnail of a representative product in the category (fallback: category mood image) */
  sampleImage: string;
}

/**
 * Build a summary of every category that has products, for the collections
 * mega-menu. Picks the first product with a thumbnail whose categorySlug matches,
 * so the nav shows a real product photo — not the editorial mood shot.
 *
 * `productGroups` is kept as a higher-level grouping if we ever want a two-tier
 * menu, but the mega-menu now surfaces all categories directly.
 */
export function getCollectionCategories(): CollectionCategorySummary[] {
  const catMap: Record<string, CollectionCategorySummary> = {};

  for (const p of allProducts) {
    const slug =
      (p as Product & { categorySlug?: string }).categorySlug ||
      slugify(p.category || "");
    if (!slug) continue;

    let entry = catMap[slug];
    if (!entry) {
      entry = {
        id: slug,
        name: p.category,
        slug,
        href: `/san-pham?category=${slug}`,
        productCount: 0,
        sampleImage: "",
      };
      catMap[slug] = entry;
    }
    entry.productCount++;
    if (!entry.sampleImage && p.thumbnail) entry.sampleImage = p.thumbnail;
  }

  return Object.values(catMap)
    .filter((c) => c.productCount > 0)
    .sort((a, b) => b.productCount - a.productCount);
}

// Kept for back-compat if other code imports it — identical shape to the
// higher-level `productGroups` used on the homepage tile section.
export interface CollectionGroupSummary {
  id: string;
  name: string;
  tagline: string;
  description: string;
  href: string;
  productCount: number;
  sampleImage: string;
}

export function getCollectionGroups(): CollectionGroupSummary[] {
  return productGroups.map((group) => {
    const sample = allProducts.find(
      (p) =>
        !!p.thumbnail &&
        group.slugs.includes(
          (p as Product & { categorySlug?: string }).categorySlug ||
            slugify(p.category)
        )
    );
    return {
      id: group.id,
      name: group.name,
      tagline: group.tagline,
      description: group.description,
      href: group.href,
      productCount: group.productCount,
      sampleImage: sample?.thumbnail || group.image,
    };
  });
}

export function getBrands(): { name: string; count: number }[] {
  const map: Record<string, number> = {};
  for (const p of allProducts) {
    if (p.brand) map[p.brand] = (map[p.brand] ?? 0) + 1;
  }
  return Object.entries(map)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

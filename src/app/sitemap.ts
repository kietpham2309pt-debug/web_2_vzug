import { MetadataRoute } from "next";
import { allProducts } from "@/lib/products-data";
import { categories } from "@/lib/data";
import { BASE_URL } from "@/lib/seo";

/**
 * Auto-generated sitemap.xml
 * Truy cập: /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/san-pham`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/ve-v-zug`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/lien-he`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/chinh-sach-bao-hanh`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/chinh-sach-doi-tra`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/san-pham?category=${cat.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.85,
  }));

  const productRoutes: MetadataRoute.Sitemap = allProducts.map((product) => ({
    url: `${BASE_URL}/san-pham/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: product.images,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}

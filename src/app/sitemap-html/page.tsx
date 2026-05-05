import { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  allProducts,
  getCategories,
  getProductsByCategorySlug,
} from "@/lib/products-data";
import { SITE_NAME, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Sitemap HTML | ${SITE_NAME}`,
  description: "Sơ đồ trang HTML của website V-ZUG WellHome.",
  alternates: { canonical: canonicalUrl("/sitemap-html") },
};

const staticLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Tất cả sản phẩm", href: "/san-pham" },
  { label: "Về V-ZUG", href: "/ve-v-zug" },
  { label: "Liên hệ", href: "/lien-he" },
  { label: "Câu hỏi thường gặp", href: "/cau-hoi-thuong-gap" },
  { label: "Chính sách bảo hành", href: "/chinh-sach-bao-hanh" },
  { label: "Chính sách vận chuyển", href: "/chinh-sach-van-chuyen" },
  { label: "Hướng dẫn mua hàng", href: "/huong-dan-mua-hang" },
];

export default function SitemapHtmlPage() {
  const categories = getCategories();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 pt-4 pb-1">
          <Breadcrumb items={[{ label: "Sitemap HTML" }]} />
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a0522d]">
            Sitemap
          </p>
          <h1 className="mt-2 text-2xl md:text-4xl font-black text-[#3e2723]">
            Sitemap HTML
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Tổng hợp {categories.length} danh mục và {allProducts.length} sản phẩm V-ZUG.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        <section className="bg-white border border-gray-100 rounded-xl p-6">
          <h2 className="text-xl font-bold text-[#3e2723] mb-4">Trang chính</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {staticLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-[#3e2723] hover:text-[#a0522d] hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white border border-gray-100 rounded-xl p-6">
          <h2 className="text-xl font-bold text-[#3e2723] mb-4">Danh mục sản phẩm</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/danh-muc/${category.slug}`}
                  className="text-sm text-[#3e2723] hover:text-[#a0522d] hover:underline"
                >
                  {category.name} ({category.count})
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold text-[#3e2723]">Sản phẩm theo danh mục</h2>
          {categories.map((category) => {
            const products = getProductsByCategorySlug(category.slug);
            return (
              <div key={category.slug} className="bg-white border border-gray-100 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#3e2723] mb-4">
                  <Link href={`/danh-muc/${category.slug}`} className="hover:text-[#a0522d] hover:underline">
                    {category.name}
                  </Link>
                </h3>
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                  {products.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/san-pham/${product.slug}`}
                        className="text-sm text-gray-700 hover:text-[#a0522d] hover:underline"
                      >
                        {product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}

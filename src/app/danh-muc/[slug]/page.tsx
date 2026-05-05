import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import {
  getCategories,
  getCategoryBySlug,
  getProductsByCategorySlug,
} from "@/lib/products-data";
import {
  SITE_NAME,
  canonicalUrl,
  OG_IMAGE_DEFAULT,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Danh mục không tồn tại",
      robots: { index: false, follow: false },
    };
  }

  const title = `${category.name} V-ZUG`;
  const description = `Khám phá ${category.count} sản phẩm ${category.name} V-ZUG chính hãng tại ${SITE_NAME}.`;
  const url = canonicalUrl(`/danh-muc/${category.slug}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${title} | ${SITE_NAME}`,
      description,
      siteName: SITE_NAME,
      locale: "vi_VN",
      images: [
        {
          url: OG_IMAGE_DEFAULT,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [OG_IMAGE_DEFAULT],
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const products = getProductsByCategorySlug(category.slug);
  const breadcrumbItems = [
    { label: "Sản Phẩm", href: "/san-pham" },
    { label: category.name },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadcrumbSchema
        items={[
          { label: "Sản Phẩm", href: "/san-pham" },
          { label: category.name, href: `/danh-muc/${category.slug}` },
        ]}
      />

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 pt-4 pb-1">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a0522d]">
            Danh mục V-ZUG
          </p>
          <h1 className="mt-2 text-2xl md:text-4xl font-black text-[#3e2723]">
            {category.name}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {products.length} sản phẩm chính hãng
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-xl p-8 text-center">
            <h2 className="text-lg font-semibold text-[#3e2723]">
              Chưa có sản phẩm trong danh mục này
            </h2>
          </div>
        )}
      </main>
    </div>
  );
}

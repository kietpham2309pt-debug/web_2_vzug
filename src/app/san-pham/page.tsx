import { Metadata } from "next";
import { Suspense } from "react";
import ProductsClient from "./ProductsClient";
import {
  filterAndPaginate,
  getCategories,
} from "@/lib/products-data";
import {
  SITE_NAME, canonicalUrl, OG_IMAGE_DEFAULT,
  OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT,
} from "@/lib/seo";

const LIMIT = 20;

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    brand?: string;
    sort?: string;
    page?: string;
  }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const cat = params.category || "";
  const brand = params.brand || "";
  const q = params.q || "";

  const title = q
    ? `Tìm kiếm "${q}"`
    : cat
    ? cat
    : brand
    ? `Thương hiệu ${brand}`
    : "Tất Cả Sản Phẩm";

  const description = `Khám phá ${title} - thiết bị gia dụng cao cấp tại ${SITE_NAME}. Giá tốt, bảo hành chính hãng.`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl("/san-pham") },
    openGraph: {
      type: "website",
      url: canonicalUrl("/san-pham"),
      title: `${title} | ${SITE_NAME}`,
      description,
      siteName: SITE_NAME,
      locale: "vi_VN",
      images: [{ url: OG_IMAGE_DEFAULT, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [OG_IMAGE_DEFAULT],
    },
  };
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const q = params.q || "";
  const category = params.category || "";
  const brand = params.brand || "";
  const sort = params.sort || "default";
  const page = Math.max(1, Number(params.page) || 1);

  // Server-side: filter + paginate (không bundle vào client)
  const { products, total, totalPages } = filterAndPaginate({
    q, category, brand, sort, page, limit: LIMIT,
  });

  const categories = getCategories();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" aria-label="Đang tải...">
          <div className="w-8 h-8 border-4 border-[#3e2723] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProductsClient
        products={products}
        total={total}
        page={page}
        totalPages={totalPages}
        limit={LIMIT}
        categories={categories}
        brands={[]}
        activeCategory={category}
        activeBrand={brand}
        activeSort={sort}
        searchQuery={q}
      />
    </Suspense>
  );
}

import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getRelatedProducts,
  allProducts,
} from "@/lib/products-data";
import ProductDetailClient from "./ProductDetailClient";
import ProductSchema from "@/components/seo/ProductSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import {
  SITE_NAME, canonicalUrl, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT,
} from "@/lib/seo";
import { slugify } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Dynamic rendering on-demand cho product detail
// Dùng dynamic rendering on-demand
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Sản phẩm không tồn tại",
      robots: { index: false, follow: false },
    };
  }

  const title = product.name.length <= 55
    ? product.name
    : `${product.name.slice(0, 52)}...`;

  const description = (product.shortDescription || product.name).length <= 155
    ? (product.shortDescription || product.name)
    : `${(product.shortDescription || product.name).slice(0, 152)}...`;

  const pageUrl = canonicalUrl(`/san-pham/${product.slug}`);
  const ogImage = product.thumbnail || "/og-default.jpg";

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "website",
      url: pageUrl,
      title: `${title} | ${SITE_NAME}`,
      description,
      siteName: SITE_NAME,
      locale: "vi_VN",
      images: [
        { url: ogImage, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, alt: product.name },
        ...product.images.slice(1, 4).map((img) => ({
          url: img, width: 800, height: 800, alt: product.name,
        })),
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  const breadcrumbItems = [
    { label: "Sản Phẩm", href: "/san-pham" },
    ...(product.category
      ? [{ label: product.category, href: `/san-pham?category=${slugify(product.category)}` }]
      : []),
    { label: product.name },
  ];

  return (
    <>
      <ProductSchema product={product} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <ProductDetailClient product={product} related={related} />
    </>
  );
}

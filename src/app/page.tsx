import { Metadata } from "next";
import VideoHero from "@/components/home/VideoHero";
import HeroBanner from "@/components/home/HeroBanner";
import HeroCurtain from "@/components/home/HeroCurtain";
import HeroFlickSnap from "@/components/home/HeroFlickSnap";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import AllProducts from "@/components/home/AllProducts";
import PromoSection from "@/components/home/PromoSection";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import {
  allProducts,
  getCollectionCategories,
} from "@/lib/products-data";
import {
  SITE_NAME,
  OG_IMAGE_DEFAULT,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  canonicalUrl,
} from "@/lib/seo";

const PAGE_TITLE =
  "Thiết Bị Nhà Bếp V-ZUG Thụy Sĩ Chính Hãng — Swiss Made Since 1913";
const PAGE_DESCRIPTION =
  "Công ty TNHH K-Homès phân phối chính hãng toàn bộ sản phẩm V-ZUG Thụy Sĩ: lò nướng âm tủ, lò hấp kết hợp, tủ lạnh, tủ rượu, máy hút mùi, bếp từ. Bảo hành chính hãng, lắp đặt miễn phí.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: canonicalUrl("/") },
  openGraph: {
    type: "website",
    url: canonicalUrl("/"),
    title: `${SITE_NAME} - ${PAGE_TITLE}`,
    description: PAGE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "vi_VN",
    images: [
      {
        url: OG_IMAGE_DEFAULT,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - ${PAGE_TITLE}`,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE_DEFAULT],
  },
};

export default function HomePage() {
  const collectionCats = getCollectionCategories().map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    href: c.href,
    productCount: c.productCount,
    image: c.sampleImage,
  }));

  return (
    <>
      <OrganizationSchema />
      <h1 className="sr-only">
        {SITE_NAME} — Phân phối thiết bị nhà bếp V-ZUG Thụy Sĩ chính hãng tại
        Việt Nam
      </h1>
      <HeroCurtain />
      <HeroFlickSnap />
      <VideoHero />
      <HeroBanner />
      <PromoSection />
      <CategoryCarousel categories={collectionCats} />
      <AllProducts products={allProducts} perPage={8} />
    </>
  );
}

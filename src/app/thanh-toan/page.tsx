import { Metadata } from "next";
import CheckoutClient from "./CheckoutClient";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { SITE_NAME, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Thanh Toán",
  description:
    "Hoàn tất đặt hàng: nhập thông tin giao hàng, chọn phương thức vận chuyển và thanh toán.",

  alternates: {
    canonical: canonicalUrl("/thanh-toan"),
  },

  /** Trang checkout không nên được index */
  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: `Thanh Toán | ${SITE_NAME}`,
    description: "Hoàn tất đặt hàng thiết bị nhà bếp cao cấp.",
    url: canonicalUrl("/thanh-toan"),
    siteName: SITE_NAME,
    locale: "vi_VN",
  },
};

export default function CheckoutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: "Giỏ Hàng", href: "/gio-hang" },
          { label: "Thanh Toán", href: "/thanh-toan" },
        ]}
      />
      <CheckoutClient />
    </>
  );
}

import { Metadata } from "next";
import CartClient from "./CartClient";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { SITE_NAME, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Giỏ Hàng",
  description:
    "Xem lại các sản phẩm đã chọn, điều chỉnh số lượng và tiến hành thanh toán tại V-ZUG Vietnam.",

  alternates: {
    canonical: canonicalUrl("/gio-hang"),
  },

  /** Giỏ hàng không nên được index bởi Google */
  robots: {
    index: false,
    follow: true,
  },

  openGraph: {
    title: `Giỏ Hàng | ${SITE_NAME}`,
    description: "Xem lại và thanh toán các sản phẩm đã chọn.",
    url: canonicalUrl("/gio-hang"),
    siteName: SITE_NAME,
    locale: "vi_VN",
  },
};

export default function CartPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ label: "Giỏ Hàng", href: "/gio-hang" }]} />
      <CartClient />
    </>
  );
}

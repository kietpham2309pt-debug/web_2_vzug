import { Metadata } from "next";
import ContactOrderClient from "./ContactOrderClient";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { SITE_NAME, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Liên Hệ Đặt Hàng",
  description:
    "Gửi yêu cầu đặt hàng — nhân viên sẽ liên hệ xác nhận trong 30 phút.",

  alternates: {
    canonical: canonicalUrl("/lien-he-dat-hang"),
  },

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: `Liên Hệ Đặt Hàng | ${SITE_NAME}`,
    description: "Gửi yêu cầu đặt hàng thiết bị nhà bếp cao cấp V-ZUG.",
    url: canonicalUrl("/lien-he-dat-hang"),
    siteName: SITE_NAME,
    locale: "vi_VN",
  },
};

export default function ContactOrderPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: "Giỏ Hàng", href: "/gio-hang" },
          { label: "Liên Hệ Đặt Hàng", href: "/lien-he-dat-hang" },
        ]}
      />
      <ContactOrderClient />
    </>
  );
}

import { Metadata } from "next";
import ContactClient from "./ContactClient";
import { SITE_NAME, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Liên Hệ",
  description: "Liên hệ Công ty TNHH WELLHOME (Việt Nam) — showroom, hotline, email và form liên hệ trực tiếp.",
  alternates: { canonical: canonicalUrl("/lien-he") },
  openGraph: {
    title: `Liên Hệ | ${SITE_NAME}`,
    description: "Liên hệ Công ty TNHH WELLHOME (Việt Nam) — showroom, hotline, email và form liên hệ trực tiếp.",
    url: canonicalUrl("/lien-he"),
    siteName: SITE_NAME,
    locale: "vi_VN",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}

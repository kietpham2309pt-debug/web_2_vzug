import JsonLd from "./JsonLd";
import {
  BASE_URL, SITE_NAME, SITE_PHONE, SITE_EMAIL,
  SITE_ADDRESS, OG_IMAGE_DEFAULT,
} from "@/lib/seo";

/**
 * Schema.org Organization + WebSite (sitelinks search box).
 * Đặt ở trang chủ trong <head> hoặc trực tiếp trong body — đều hợp lệ.
 */
export default function OrganizationSchema() {
  const organization = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: SITE_NAME,
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: OG_IMAGE_DEFAULT,
          width: 1200,
          height: 630,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: SITE_PHONE,
            contactType: "customer service",
            areaServed: "VN",
            availableLanguage: "Vietnamese",
          },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "10 Đồng Văn Cống, Bình Trưng Tây",
          addressLocality: "Cát Lái",
          addressRegion: "Hồ Chí Minh",
          addressCountry: "VN",
        },
        email: SITE_EMAIL,
        telephone: SITE_PHONE,
        sameAs: [
          "https://www.facebook.com/vzugvietnam",
          "https://www.instagram.com/vzugvietnam",
          "https://vzug.com/vn",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${BASE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/san-pham?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
        inLanguage: "vi",
      },
    ],
  };

  return <JsonLd data={organization} id="organization-schema" />;
}

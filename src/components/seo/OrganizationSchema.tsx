import JsonLd from "./JsonLd";
import {
  BASE_URL, SITE_NAME, SITE_PHONE, SITE_EMAIL, OG_IMAGE_DEFAULT,
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
        legalName: "CÔNG TY TNHH WELLHOME (VIỆT NAM)",
        alternateName: ["WellHome", "WellHome Việt Nam", "K-Homès"],
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: OG_IMAGE_DEFAULT,
          width: 1200,
          height: 630,
        },
        foundingDate: "2023-11-03",
        taxID: "0318140880",
        vatID: "0318140880",
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: SITE_PHONE,
            contactType: "customer service",
            areaServed: "VN",
            availableLanguage: "Vietnamese",
            hoursAvailable: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "18:00",
            },
          },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Phòng 5.09, Lầu 5, Toà nhà ST Moritz, Số 1014 Phạm Văn Đồng",
          addressLocality: "Phường Hiệp Bình Chánh, Thành phố Thủ Đức",
          addressRegion: "Hồ Chí Minh",
          postalCode: "700000",
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

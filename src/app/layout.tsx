import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactFab from "@/components/layout/ContactFab";
import { getCollectionCategories } from "@/lib/products-data";
import {
  BASE_URL, SITE_NAME, OG_IMAGE_DEFAULT,
  OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT,
} from "@/lib/seo";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2b1810",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: `${SITE_NAME} - Thiết Bị Nhà Bếp Cao Cấp Thụy Sĩ`,
    /** Template áp dụng cho tất cả trang con — giữ ngắn để không vượt 60 ký tự */
    template: `%s | ${SITE_NAME}`,
  },

  description:
    "Phân phối thiết bị nhà bếp cao cấp V-ZUG Thụy Sĩ: lò nướng, lò hấp, tủ lạnh, tủ rượu, máy hút mùi, bếp từ. Bảo hành chính hãng, miễn phí lắp đặt.",

  keywords: [
    "v-zug vietnam",
    "vzug",
    "thiết bị nhà bếp thụy sĩ",
    "lò nướng âm tủ v-zug",
    "lò hấp v-zug",
    "tủ lạnh v-zug",
    "máy hút mùi v-zug",
    "bếp từ v-zug",
    "tủ rượu v-zug",
  ],

  authors: [{ name: SITE_NAME, url: BASE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  /** Canonical — Next.js tự inject <link rel="canonical"> từ alternates.canonical */
  alternates: {
    canonical: BASE_URL,
    languages: { "vi-VN": BASE_URL },
  },

  /** Open Graph — Facebook, Zalo, Messenger */
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: BASE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Thiết Bị Nhà Bếp Cao Cấp Thụy Sĩ`,
    description:
      "Phân phối thiết bị nhà bếp V-ZUG nhập khẩu chính hãng từ Thụy Sĩ. Lò nướng, lò hấp, tủ lạnh, tủ rượu, máy hút mùi, bếp từ. Bảo hành chính hãng.",
    images: [
      {
        url: OG_IMAGE_DEFAULT,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: `${SITE_NAME} - Thiết bị nhà bếp cao cấp`,
        type: "image/jpeg",
      },
    ],
  },

  /** Twitter / X Card */
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Thiết Bị Nhà Bếp Cao Cấp Thụy Sĩ`,
    description:
      "Phân phối thiết bị nhà bếp V-ZUG nhập khẩu chính hãng từ Thụy Sĩ. Bảo hành chính hãng.",
    images: [OG_IMAGE_DEFAULT],
    creator: "@vzugvn",
    site: "@vzugvn",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /** Favicon & App icons */
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },

  /** Verification codes (thêm khi có tài khoản Google Search Console) */
  // verification: {
  //   google: "your-google-site-verification-code",
  // },

  /** Không cho các trang clone index nội dung */
  other: {
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const collections = getCollectionCategories();

  return (
    <html lang="vi" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#faf6f0] antialiased">
        <Header collections={collections} />
        <main id="main-content" className="flex-1" role="main">
          {children}
        </main>
        <Footer />
        <ContactFab />
      </body>
    </html>
  );
}

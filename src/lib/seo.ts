/** Cấu hình SEO trung tâm — dùng cho canonical, sitemap.xml và robots.txt */
const DEFAULT_SITE_URL = "https://vzug.wellhome.asia";

function normalizeSiteUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export const BASE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
);

export const SITE_NAME = "V-ZUG Vietnam";
export const SITE_PHONE = "028 8887 5668";
export const SITE_EMAIL = "hotro@wellhome.asia";
export const SITE_ADDRESS =
  "Phòng 5.09, Lầu 5, Toà nhà ST Moritz, Số 1014 Phạm Văn Đồng, Phường Hiệp Bình Chánh, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam";

/** Ảnh OG mặc định — đặt tại /public/og-default.jpg */
export const OG_IMAGE_DEFAULT = `${BASE_URL}/og-default.jpg`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

/** Tạo canonical URL tuyệt đối */
export function canonicalUrl(path: string = ""): string {
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Metadata mặc định tái sử dụng cho OG + Twitter */
export function buildOpenGraph({
  title,
  description,
  url,
  image = OG_IMAGE_DEFAULT,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    title,
    description,
    url,
    siteName: SITE_NAME,
    locale: "vi_VN",
    type: "website" as const,
    images: [
      {
        url: image,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: title,
      },
    ],
  };
}

export function buildTwitterCard({
  title,
  description,
  image = OG_IMAGE_DEFAULT,
}: {
  title: string;
  description: string;
  image?: string;
}) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
    images: [image],
    creator: "@vzugvietnam",
  };
}

/** Cấu hình SEO trung tâm — thay đổi BASE_URL khi deploy */
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://vzug-vietnam.vn";

export const SITE_NAME = "V-ZUG Vietnam";
export const SITE_PHONE = "028 7774 8885";
export const SITE_EMAIL = "cskh@khomes.vn";
export const SITE_ADDRESS =
  "10 Đồng Văn Cống, Bình Trưng Tây, Cát Lái, TP. Hồ Chí Minh";

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

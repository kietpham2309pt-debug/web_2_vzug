import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo";

/**
 * robots.txt — chỉ dẫn Googlebot và các crawler
 * Truy cập: /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/gio-hang",       // Giỏ hàng — không cần index
          "/thanh-toan",     // Trang checkout — không cần index
          "/lien-he-dat-hang", // Trang liên hệ đặt hàng — không cần index
          "/tai-khoan",      // Trang tài khoản cá nhân
          "/api/",           // API routes nội bộ
          "/*.json$",        // JSON files
        ],
      },
      {
        // Cho phép Googlebot ảnh crawl tất cả hình ảnh sản phẩm
        userAgent: "Googlebot-Image",
        allow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}

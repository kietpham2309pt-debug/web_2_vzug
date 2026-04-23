import JsonLd from "./JsonLd";
import { BASE_URL } from "@/lib/seo";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

/**
 * Schema.org BreadcrumbList — Google hiểu cấu trúc thư mục và hiển thị breadcrumb
 * ngay trên kết quả tìm kiếm.
 * Trang chủ (Trang Chủ) luôn được thêm tự động ở vị trí đầu tiên.
 */
export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const allItems = [{ label: "Trang Chủ", href: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `${BASE_URL}${item.href}` : undefined,
    })),
  };

  return <JsonLd data={schema} id="breadcrumb-schema" />;
}

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb navigation — Semantic HTML5 với aria-label chuẩn WCAG.
 * Trang chủ luôn được prepend tự động.
 */
export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Đường dẫn điều hướng" className="flex items-center space-x-1 text-sm text-gray-500">
      <ol className="flex items-center space-x-1 list-none p-0 m-0">
        {/* Trang chủ */}
        <li>
          <Link
            href="/"
            className="flex items-center hover:text-[#3e2723] transition-colors"
            aria-label="Trang chủ"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-1">
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" aria-hidden="true" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[#3e2723] transition-colors truncate max-w-[200px]"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="text-gray-700 font-medium truncate max-w-[200px]"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

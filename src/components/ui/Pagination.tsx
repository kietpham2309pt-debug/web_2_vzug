"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
}

export default function Pagination({ page, totalPages, total, limit }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (p === 1) {
      params.delete("page");
    } else {
      params.set("page", String(p));
    }
    router.push(`/san-pham?${params.toString()}`, { scroll: true });
  };

  // Tạo danh sách trang hiển thị: [..., prev-1, prev, current, next, next+1, ...]
  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "...")[] = [1];
    if (page > 3) pages.push("...");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      {/* Info */}
      <p className="text-sm text-gray-500">
        Hiển thị <strong>{from}–{to}</strong> / <strong>{total}</strong> sản phẩm
      </p>

      {/* Controls */}
      <div className="flex items-center gap-1">
        {/* First */}
        <button
          onClick={() => goToPage(1)}
          disabled={page === 1}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500
                     hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Trang đầu"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Prev */}
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500
                     hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Trang trước"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={cn(
                "w-9 h-9 rounded-lg text-sm font-medium transition-colors",
                p === page
                  ? "bg-[#3e2723] text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              )}
              aria-label={`Trang ${p}`}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500
                     hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Trang tiếp"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last */}
        <button
          onClick={() => goToPage(totalPages)}
          disabled={page === totalPages}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500
                     hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Trang cuối"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>

      {/* Jump to page */}
      <form
        className="flex items-center gap-2 text-sm text-gray-500"
        onSubmit={(e) => {
          e.preventDefault();
          const input = (e.currentTarget.elements.namedItem("jump") as HTMLInputElement);
          const p = Math.min(Math.max(1, Number(input.value)), totalPages);
          if (!isNaN(p)) goToPage(p);
          input.value = "";
        }}
      >
        <span>Đến trang</span>
        <input
          name="jump"
          type="number"
          min={1}
          max={totalPages}
          className="w-14 h-8 px-2 rounded-lg border-2 border-gray-200 text-center text-sm
                     focus:outline-none focus:border-[#3e2723] transition-colors"
          placeholder={String(page)}
        />
        <button
          type="submit"
          className="h-8 px-3 bg-[#3e2723] text-white text-sm rounded-lg hover:bg-[#2e1f1a] transition-colors"
        >
          Đi
        </button>
      </form>
    </div>
  );
}

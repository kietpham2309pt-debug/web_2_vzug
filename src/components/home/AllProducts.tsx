"use client";

import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "@/components/products/ProductCard";
import { cn } from "@/lib/utils";

interface AllProductsProps {
  products: Product[];
  /** Items per page. Defaults to 8. */
  perPage?: number;
}

export default function AllProducts({
  products,
  perPage = 8,
}: AllProductsProps) {
  const [page, setPage] = useState(1);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const totalPages = Math.max(1, Math.ceil(products.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * perPage;
  const visible = useMemo(
    () => products.slice(start, start + perPage),
    [products, start, perPage]
  );

  const goToPage = (p: number) => {
    const clamped = Math.min(Math.max(1, p), totalPages);
    if (clamped === currentPage) return;
    setPage(clamped);
    // Scroll to top of the section so the user sees the new page from the start.
    if (sectionRef.current) {
      const y =
        sectionRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const getPageNumbers = (): (number | "…")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "…")[] = [1];
    if (currentPage > 3) pages.push("…");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("…");
    pages.push(totalPages);
    return pages;
  };

  if (products.length === 0) return null;

  const showPagination = totalPages > 1;

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-24 bg-[#f2ebdf]"
      aria-label="Toàn bộ sản phẩm V-ZUG"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <p className="hair-line text-[10px] tracking-[0.4em] uppercase text-[#a0522d] font-medium mb-3">
              Bộ Sưu Tập
            </p>
            <h2 className="text-3xl md:text-4xl text-[#2b1810] leading-tight font-semibold tracking-tight">
              Toàn Bộ Sản Phẩm V-ZUG
            </h2>
            <p className="text-sm md:text-[15px] text-[#4a3a30] mt-3 max-w-xl leading-relaxed">
              {products.length} thiết bị Swiss Made — lò nướng, lò hấp, tủ
              lạnh, bếp từ, máy rửa chén và nhiều loại khác.
            </p>
          </div>
          <Link
            href="/san-pham"
            className="group inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase font-semibold text-[#2b1810] hover:text-[#a0522d] transition-colors self-start md:self-end"
          >
            Xem Chi Tiết & Lọc
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {showPagination && (
          <div className="mt-10 md:mt-12 flex flex-col items-center gap-4">
            <p className="text-[12px] tracking-[0.18em] uppercase text-[#4a3a30]/80">
              Trang{" "}
              <strong className="text-[#2b1810]">{currentPage}</strong> / {totalPages}
              <span className="mx-2 text-[#c87941]">·</span>
              {start + 1}–{Math.min(start + perPage, products.length)} / {products.length}
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Trang trước"
                className="w-10 h-10 flex items-center justify-center border border-[#2b1810]/30 text-[#2b1810] hover:bg-[#2b1810] hover:text-[#faf6f0] hover:border-[#2b1810] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#2b1810] disabled:hover:border-[#2b1810]/30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {getPageNumbers().map((p, i) =>
                p === "…" ? (
                  <span
                    key={`dots-${i}`}
                    className="w-10 h-10 flex items-center justify-center text-[#2b1810]/40 text-sm"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    onClick={() => goToPage(p)}
                    aria-label={`Trang ${p}`}
                    aria-current={p === currentPage ? "page" : undefined}
                    className={cn(
                      "w-10 h-10 text-sm font-semibold tracking-tight transition-colors",
                      p === currentPage
                        ? "bg-[#2b1810] text-[#faf6f0] border border-[#2b1810]"
                        : "border border-[#2b1810]/30 text-[#2b1810] hover:bg-[#2b1810] hover:text-[#faf6f0] hover:border-[#2b1810]"
                    )}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Trang kế"
                className="w-10 h-10 flex items-center justify-center border border-[#2b1810]/30 text-[#2b1810] hover:bg-[#2b1810] hover:text-[#faf6f0] hover:border-[#2b1810] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#2b1810] disabled:hover:border-[#2b1810]/30 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

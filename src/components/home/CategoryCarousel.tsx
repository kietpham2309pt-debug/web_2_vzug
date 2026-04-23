"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselCategory {
  id: string;
  name: string;
  slug: string;
  href: string;
  productCount: number;
  image: string;
  tagline?: string;
}

interface CategoryCarouselProps {
  categories: CarouselCategory[];
}

/**
 * Showcases product categories 4-at-a-time with prev/next arrows. Uses an
 * inner scroller that horizontally translates by full "pages" of 4 items.
 */
export default function CategoryCarousel({ categories }: CategoryCarouselProps) {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(4);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Responsive items-per-view — 1 / 2 / 3 / 4 based on breakpoints
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setPerPage(1);
      else if (w < 900) setPerPage(2);
      else if (w < 1200) setPerPage(3);
      else setPerPage(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pages = Math.max(1, Math.ceil(categories.length / perPage));
  // Clamp page if perPage changes
  useEffect(() => {
    if (page > pages - 1) setPage(pages - 1);
  }, [pages, page]);

  const prev = () => setPage((p) => (p - 1 + pages) % pages);
  const next = () => setPage((p) => (p + 1) % pages);

  const canPaginate = categories.length > perPage;

  // Width each card takes inside the track: 100 / perPage %
  // Translate: page * 100% of container width
  const trackStyle = useMemo(
    () => ({
      transform: `translate3d(-${page * 100}%, 0, 0)`,
      transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
    }),
    [page]
  );

  if (categories.length === 0) return null;

  return (
    <section
      className="bg-[#faf6f0] py-16 md:py-24"
      aria-label="Danh mục nhóm sản phẩm V-ZUG"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <p className="hair-line text-[10px] tracking-[0.4em] uppercase text-[#a0522d] font-medium mb-3">
              Collections
            </p>
            <h2 className="text-3xl md:text-4xl text-[#2b1810] leading-tight max-w-2xl font-semibold tracking-tight">
              Danh Mục Nhóm Sản Phẩm
            </h2>
            <p className="text-sm md:text-[15px] text-[#4a3a30] mt-3 max-w-xl leading-relaxed">
              Duyệt qua các nhóm thiết bị V-ZUG — từ nấu nướng, bảo quản đến
              chăm sóc sau bữa ăn.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start md:self-end">
            <Link
              href="/san-pham"
              className="group inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase font-semibold text-[#2b1810] hover:text-[#a0522d] transition-colors"
            >
              Toàn Bộ Danh Mục
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {canPaginate && (
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Nhóm trước"
                  className="w-11 h-11 flex items-center justify-center border border-[#2b1810]/30 text-[#2b1810] hover:bg-[#2b1810] hover:text-[#faf6f0] hover:border-[#2b1810] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Nhóm kế"
                  className="w-11 h-11 flex items-center justify-center border-t border-r border-b border-[#2b1810]/30 text-[#2b1810] hover:bg-[#2b1810] hover:text-[#faf6f0] hover:border-[#2b1810] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={trackRef}
            className="flex"
            style={trackStyle}
            aria-live="polite"
          >
            {categories.map((cat, i) => (
              <div
                key={cat.id}
                className="flex-shrink-0 px-1.5 md:px-2 first:pl-0 last:pr-0"
                style={{ width: `${100 / perPage}%` }}
                aria-hidden={
                  Math.floor(i / perPage) !== page ? true : undefined
                }
              >
                <Link
                  href={cat.href}
                  className="group relative block aspect-[4/5] overflow-hidden bg-[#2b1810] text-[#faf6f0] border border-transparent hover:border-[#c87941] transition-colors"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover opacity-80 group-hover:opacity-95 group-hover:scale-[1.04] transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,9,10,0.1)_0%,rgba(20,9,10,0.2)_45%,rgba(20,9,10,0.85)_100%)]"
                  />

                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.35em] uppercase text-[#c87941] font-semibold">
                      {String(i + 1).padStart(2, "0")}
                      {cat.tagline ? ` · ${cat.tagline}` : ""}
                    </span>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#faf6f0]/70">
                      {cat.productCount} SP
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <h3 className="text-xl md:text-2xl leading-tight font-semibold tracking-tight mb-3 md:mb-4">
                      {cat.name}
                    </h3>
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-semibold text-[#faf6f0] border-b border-[#faf6f0]/50 group-hover:border-[#c87941] group-hover:text-[#c87941] pb-1 transition-colors">
                      Khám Phá
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Page dots */}
        {canPaginate && pages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Trang ${i + 1}`}
                className={cn(
                  "h-[2px] transition-all duration-300",
                  i === page
                    ? "w-10 bg-[#a0522d]"
                    : "w-5 bg-[#2b1810]/25 hover:bg-[#2b1810]/60"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

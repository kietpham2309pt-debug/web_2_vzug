import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { productGroups } from "@/lib/data";

export default function ProductGroups() {
  if (productGroups.length === 0) return null;

  return (
    <section
      className="bg-[#faf6f0] py-16 md:py-24"
      aria-label="Nhóm sản phẩm V-ZUG"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <p className="hair-line text-[10px] tracking-[0.4em] uppercase text-[#a0522d] font-medium mb-3">
              Product Groups
            </p>
            <h2 className="text-3xl md:text-4xl text-[#2b1810] leading-tight max-w-2xl font-semibold tracking-tight">
              Nhóm Sản Phẩm V-ZUG
            </h2>
            <p className="text-sm md:text-[15px] text-[#4a3a30] mt-3 max-w-xl leading-relaxed">
              Bốn không gian thiết bị Thụy Sĩ — từ nấu nướng, bảo quản, ngăn
              chuyên biệt đến chăm sóc sau bữa ăn.
            </p>
          </div>
          <Link
            href="/san-pham"
            className="group inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase font-semibold text-[#2b1810] hover:text-[#a0522d] transition-colors self-start md:self-end"
          >
            Toàn Bộ Danh Mục
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {productGroups.map((group, i) => (
            <Link
              key={group.id}
              href={group.href}
              className="group relative overflow-hidden bg-[#2b1810] text-[#faf6f0]
                         aspect-[4/5] border border-transparent hover:border-[#c87941]
                         transition-colors"
            >
              <Image
                src={group.image}
                alt={group.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover opacity-80 group-hover:opacity-95
                           group-hover:scale-[1.04] transition-[transform,opacity]
                           duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              />

              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,9,10,0.1)_0%,rgba(20,9,10,0.2)_45%,rgba(20,9,10,0.85)_100%)]"
              />

              {/* Index + count top */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#c87941] font-semibold">
                  {String(i + 1).padStart(2, "0")} · {group.tagline}
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#faf6f0]/70">
                  {group.productCount} SP
                </span>
              </div>

              {/* Content bottom */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <h3 className="text-xl md:text-2xl leading-tight mb-2 md:mb-3 font-semibold tracking-tight">
                  {group.name}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#faf6f0]/80 line-clamp-2 mb-4 md:mb-5">
                  {group.description}
                </p>
                <span
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase
                             font-semibold text-[#faf6f0] border-b border-[#faf6f0]/50
                             group-hover:border-[#c87941] group-hover:text-[#c87941]
                             pb-1 transition-colors"
                >
                  Khám Phá
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

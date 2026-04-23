import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "@/components/products/ProductCard";

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-20 md:py-24 bg-[#f2ebdf]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="hair-line text-[10px] tracking-[0.4em] uppercase text-[#a0522d] font-medium mb-3">
              Editor&apos;s Pick
            </p>
            <h2 className="text-3xl md:text-4xl text-[#2b1810] leading-tight font-semibold tracking-tight">
              Sản Phẩm Nổi Bật
            </h2>
            <p className="text-sm text-[#4a3a30] mt-3 max-w-md">
              Những thiết bị V-ZUG được ưa chuộng nhất tại Việt Nam — chế tác thủ công tại Zug, Thụy Sĩ.
            </p>
          </div>
          <Link
            href="/san-pham"
            className="group inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase font-semibold text-[#2b1810] hover:text-[#a0522d] transition-colors self-start md:self-end"
          >
            Khám Phá Toàn Bộ
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Desktop: grid 4 cols. Mobile: horizontal snap scroll */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-hide -mx-6 px-6 pb-2">
          {products.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[72%] snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

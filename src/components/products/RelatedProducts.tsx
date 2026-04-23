import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { slugify } from "@/lib/utils";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  products: Product[];
  currentCategory: string;
}

export default function RelatedProducts({ products, currentCategory }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-[#8d6e63] text-xs font-semibold uppercase tracking-widest mb-1">
            Có Thể Bạn Thích
          </p>
          <h2 className="text-xl md:text-2xl font-black text-[#3e2723]">
            Sản Phẩm Tương Tự
          </h2>
        </div>
        <Link
          href={`/san-pham?category=${slugify(currentCategory)}`}
          className="flex items-center gap-1.5 text-sm text-[#3e2723] font-semibold hover:text-[#8d6e63] transition-colors"
        >
          Xem Thêm <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

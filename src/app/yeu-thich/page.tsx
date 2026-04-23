"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/lib/store";
import ProductCard from "@/components/products/ProductCard";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function WishlistPage() {
  const { items } = useWishlistStore();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Breadcrumb items={[{ label: "Sản Phẩm Yêu Thích" }]} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-black text-[#3e2723] flex items-center gap-2 mb-6">
          <Heart className="w-6 h-6 fill-red-500 text-red-500" aria-hidden="true" />
          Sản Phẩm Yêu Thích
          <span className="text-lg font-semibold text-gray-500">({items.length})</span>
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Chưa có sản phẩm yêu thích
            </h2>
            <p className="text-gray-500 mb-8">Thêm sản phẩm vào danh sách yêu thích để xem sau</p>
            <Link href="/san-pham">
              <Button size="lg">Khám Phá Sản Phẩm</Button>
            </Link>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            aria-label="Danh sách sản phẩm yêu thích"
          >
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart, Heart, Share2, Phone, Shield,
  Truck, RotateCcw, CheckCircle, Minus, Plus,
} from "lucide-react";
import { Product } from "@/types";
import { formatPrice, slugify } from "@/lib/utils";
import { useCartStore, useWishlistStore } from "@/lib/store";
import ProductGallery from "@/components/products/ProductGallery";
import ProductSpecs from "@/components/products/ProductSpecs";
import RelatedProducts from "@/components/products/RelatedProducts";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";

interface ProductDetailClientProps {
  product: Product;
  related: Product[];
}

export default function ProductDetailClient({ product, related }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, hasItem } = useWishlistStore();
  const isWishlisted = hasItem(product.id);

  const breadcrumbs = [
    { label: "Sản Phẩm", href: "/san-pham" },
    ...(product.category
      ? [{ label: product.category, href: `/san-pham?category=${slugify(product.category)}` }]
      : []),
    { label: product.name },
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const handleContact = () => {
    const message = `Xin chào, tôi muốn đặt hàng sản phẩm: ${product.name} (x${quantity})`;
    window.open(`https://zalo.me/0901234567?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const savings = product.originalPrice && product.originalPrice > product.price
    ? product.originalPrice - product.price
    : 0;

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* Gallery */}
          <div>
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-3">
              {product.isNew && <Badge variant="new">Mới</Badge>}
              {product.isBestseller && <Badge variant="bestseller">Bán Chạy</Badge>}
              {(product.discount ?? 0) > 0 && <Badge variant="discount">-{product.discount}%</Badge>}
            </div>

            {/* Brand */}
            <span className="text-sm text-[#8d6e63] font-semibold uppercase tracking-widest mb-2 capitalize">
              {product.brand}
            </span>

            {/* Name */}
            <h1 className="text-2xl md:text-3xl font-black text-[#3e2723] leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <StarRating rating={product.rating} count={product.reviewCount} size="md" />
              <span className="text-sm text-gray-500">
                {product.rating}/5 ({product.reviewCount} đánh giá)
              </span>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-[#f0f4f8] to-blue-50 rounded-2xl p-5 mb-6">
              {product.price > 0 ? (
                <>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-3xl font-black text-[#3e2723]">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-lg text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  {savings > 0 && (
                    <p className="text-sm text-green-600 font-semibold">
                      Tiết kiệm {formatPrice(savings)} ({product.discount}% giảm)
                    </p>
                  )}
                </>
              ) : (
                <p className="text-xl font-bold text-[#3e2723]">Liên hệ để biết giá</p>
              )}
              <p className="text-xs text-gray-500 mt-1">Đã bao gồm VAT · Miễn phí lắp đặt</p>
            </div>

            {/* Short Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-gray-700">Số Lượng:</span>
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 text-gray-600 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 text-gray-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {product.price > 0 && (
                <span className="text-sm text-gray-500">
                  Tổng: <strong className="text-[#3e2723]">{formatPrice(product.price * quantity)}</strong>
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1"
              >
                <ShoppingCart className="w-5 h-5" />
                Thêm Vào Giỏ
              </Button>
              <Button
                onClick={handleWishlist}
                variant={isWishlisted ? "danger" : "outline"}
                size="lg"
                className="w-12 px-0"
                title={isWishlisted ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
              >
                <Heart className={isWishlisted ? "fill-current w-5 h-5" : "w-5 h-5"} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-12 px-0"
                title="Chia sẻ"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Contact to Order */}
            <Button
              variant="secondary"
              size="xl"
              className="w-full mb-4"
              onClick={handleContact}
            >
              <Phone className="w-5 h-5" />
              Liên Hệ Đặt Hàng
            </Button>

            {/* Hotline */}
            <a
              href="tel:02877748885"
              className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-[#8d6e63] rounded-xl text-[#8d6e63] font-semibold text-sm hover:bg-[#8d6e63]/5 transition-colors mb-6"
            >
              <Phone className="w-4 h-4" />
              Hotline Tư Vấn: 028 7774 8885
            </a>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: "Bảo Hành", sub: "Chính hãng 2-5 năm" },
                { icon: Truck, label: "Miễn Phí", sub: "Vận chuyển & lắp đặt" },
                { icon: RotateCcw, label: "Đổi Trả", sub: "15 ngày dễ dàng" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl">
                  <item.icon className="w-5 h-5 text-[#3e2723] mb-1.5" />
                  <p className="text-xs font-semibold text-gray-900">{item.label}</p>
                  <p className="text-[10px] text-gray-500">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specs & Description */}
        <div className="mt-12">
          <ProductSpecs
            specs={product.specs}
            description={product.description}
          />
        </div>

        {/* Related Products */}
        <div className="mt-4 border-t border-gray-100 pt-2">
          <RelatedProducts products={related} currentCategory={product.category} />
        </div>
      </div>
    </div>
  );
}

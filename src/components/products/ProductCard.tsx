"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowUpRight } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCartStore();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    hasItem,
  } = useWishlistStore();
  const isWishlisted = hasItem(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const handleCta = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  const hasPrice = product.price > 0;

  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className={cn(
        "group relative flex flex-col bg-white border border-[#e8dfd4]",
        "hover:border-[#2b1810] transition-colors duration-300",
        className
      )}
    >
      {/* Image panel — cream background, product contained */}
      <div className="relative aspect-[4/5] bg-[#f2ebdf] overflow-hidden">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={`${product.name}${product.brand ? ` - ${product.brand}` : ""}`}
            fill
            className="object-contain p-6 md:p-8 group-hover:scale-[1.04] transition-transform duration-700"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[#a0522d] font-serif tracking-widest">
            V-ZUG
          </div>
        )}

        {/* Badges — minimal, top-left as text tags */}
        <div className="absolute top-4 left-4 flex flex-col gap-1">
          {product.isNew && (
            <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-[#a0522d] bg-[#faf6f0] px-2 py-1">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-[#faf6f0] bg-[#2b1810] px-2 py-1">
              Bestseller
            </span>
          )}
          {(product.discount ?? 0) > 0 && (
            <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-white bg-[#a0522d] px-2 py-1">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist — top right */}
        <button
          onClick={handleWishlist}
          aria-label={
            isWishlisted
              ? `Xóa ${product.name} khỏi yêu thích`
              : `Thêm ${product.name} vào yêu thích`
          }
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center transition-colors"
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              isWishlisted
                ? "text-[#a0522d] fill-[#a0522d]"
                : "text-[#2b1810] hover:text-[#a0522d]"
            )}
          />
        </button>

        {/* Hover CTA — slides up from bottom */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
          <button
            onClick={handleCta}
            className="w-full py-3.5 bg-[#2b1810] text-[#faf6f0] text-[11px] tracking-[0.25em] uppercase font-semibold
                       flex items-center justify-center gap-2 hover:bg-[#a0522d] transition-colors"
            aria-label={
              hasPrice
                ? `Thêm ${product.name} vào giỏ`
                : `Liên hệ tư vấn ${product.name}`
            }
          >
            {hasPrice ? "Thêm Vào Giỏ" : "Liên Hệ Tư Vấn"}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5 gap-2">
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#a0522d] font-semibold">
          {product.brand}
          {product.categorySlug && (
            <span className="text-[#2b1810]/40"> · {product.category}</span>
          )}
        </p>

        <h3 className="text-base md:text-lg leading-[1.25] text-[#2b1810] line-clamp-2 font-semibold tracking-tight group-hover:text-[#a0522d] transition-colors">
          {product.name}
        </h3>

        <div className="mt-auto pt-3 border-t border-[#e8dfd4] flex items-end justify-between gap-3">
          {hasPrice ? (
            <div>
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="text-[11px] text-[#2b1810]/40 line-through">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
              <p className="text-lg md:text-xl text-[#2b1810] leading-none font-semibold tracking-tight">
                {formatPrice(product.price)}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#a0522d] mb-0.5">
                Giá
              </p>
              <p className="text-xl text-[#2b1810] leading-none font-semibold">
                Liên hệ
              </p>
            </div>
          )}
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#2b1810]/60">
            Xem →
          </span>
        </div>
      </div>
    </Link>
  );
}

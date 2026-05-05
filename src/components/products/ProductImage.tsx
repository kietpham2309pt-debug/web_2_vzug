"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const FALLBACK_PRODUCT_IMAGE = "/images/placeholder-product.svg";

type ProductImageVariant = "card" | "gallery" | "thumbnail" | "inline";

interface ProductImageProps {
  src?: string | null;
  alt?: string | null;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  variant?: ProductImageVariant;
  fallbackSrc?: string;
  children?: ReactNode;
}

const wrapperByVariant: Record<ProductImageVariant, string> = {
  card: "relative aspect-[4/5] overflow-hidden bg-[#f2ebdf]",
  gallery: "relative aspect-square overflow-hidden bg-gray-50",
  thumbnail: "relative overflow-hidden bg-white",
  inline: "relative overflow-hidden bg-gray-50",
};

const imageByVariant: Record<ProductImageVariant, string> = {
  card: "object-contain p-3 md:p-4",
  gallery: "object-contain p-4 md:p-6",
  thumbnail: "object-contain p-1",
  inline: "object-contain p-2",
};

export default function ProductImage({
  src,
  alt,
  className,
  imageClassName,
  priority = false,
  sizes,
  variant = "inline",
  fallbackSrc = FALLBACK_PRODUCT_IMAGE,
  children,
}: ProductImageProps) {
  const safeSrc = src && src.trim() ? src : fallbackSrc;
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const currentSrc = failedSrc === safeSrc ? fallbackSrc : safeSrc;
  const safeAlt = alt && alt.trim() ? alt : "Product image";

  return (
    <div className={cn(wrapperByVariant[variant], className)}>
      <Image
        src={currentSrc}
        alt={safeAlt}
        fill
        priority={priority}
        sizes={sizes}
        unoptimized={currentSrc.endsWith(".svg")}
        className={cn(imageByVariant[variant], imageClassName)}
        onError={() => {
          if (currentSrc !== fallbackSrc) setFailedSrc(safeSrc);
        }}
      />
      {children}
    </div>
  );
}

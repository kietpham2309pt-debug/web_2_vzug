"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div
        className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 cursor-zoom-in group"
        onClick={() => setIsZoomed(true)}
      >
        <Image
          src={images[activeIndex]}
          alt={`${name} - Ảnh sản phẩm ${activeIndex + 1} / ${images.length}`}
          fill
          priority
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div
          className="absolute top-3 right-3 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-lg
                      flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        >
          <ZoomIn className="w-4 h-4 text-gray-700" />
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200",
                activeIndex === index
                  ? "ring-2 ring-[#3e2723] ring-offset-2"
                  : "ring-1 ring-gray-200 hover:ring-gray-400"
              )}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full aspect-square">
            <Image
              src={images[activeIndex]}
              alt={name}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          <button
            className="absolute top-4 right-4 text-white bg-white/20 rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/40 transition-colors"
            onClick={() => setIsZoomed(false)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

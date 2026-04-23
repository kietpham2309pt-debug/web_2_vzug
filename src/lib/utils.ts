import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  // V-ZUG catalog uses "Liên hệ" for quote-on-request SKUs. Keep zero out of the
  // UI so it is obvious the customer must contact us to place an order.
  if (!price || price <= 0) return "Liên hệ";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export function calculateDiscount(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100);
}

export function slugify(text: string): string {
  return text
    .normalize("NFD")                      // decompose accented chars → base + combining marks
    .replace(/[\u0300-\u036f]/g, "")       // strip all combining diacritical marks (covers all Vietnamese)
    .toLowerCase()
    .replace(/đ/g, "d")                    // Vietnamese đ (U+0111) doesn't decompose in NFD
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

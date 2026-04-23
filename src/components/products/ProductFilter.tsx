"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";
import { categories } from "@/lib/data";
import { FilterState } from "@/types";
import { cn, formatPrice } from "@/lib/utils";

interface ProductFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalProducts: number;
}

const PRICE_RANGES = [
  { label: "Dưới 5 triệu", min: 0, max: 5000000 },
  { label: "5 - 10 triệu", min: 5000000, max: 10000000 },
  { label: "10 - 20 triệu", min: 10000000, max: 20000000 },
  { label: "20 - 35 triệu", min: 20000000, max: 35000000 },
  { label: "Trên 35 triệu", min: 35000000, max: 999999999 },
];

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-5 mb-5 last:border-0 last:pb-0 last:mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <span className="font-semibold text-gray-900 text-sm">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
      {isOpen && <div>{children}</div>}
    </div>
  );
}

export default function ProductFilter({ filters, onChange, totalProducts }: ProductFilterProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleBrand = (brandId: string) => {
    const next = filters.brands.includes(brandId)
      ? filters.brands.filter((b) => b !== brandId)
      : [...filters.brands, brandId];
    onChange({ ...filters, brands: next });
  };

  const toggleCategory = (categorySlug: string) => {
    const next = filters.categories.includes(categorySlug)
      ? filters.categories.filter((c) => c !== categorySlug)
      : [...filters.categories, categorySlug];
    onChange({ ...filters, categories: next });
  };

  const setPriceRange = (min: number, max: number) => {
    onChange({ ...filters, priceRange: [min, max] });
  };

  const clearAll = () => {
    onChange({
      brands: [],
      categories: [],
      priceRange: [0, 999999999],
      inStock: false,
      sortBy: "default",
    });
  };

  const hasActiveFilters =
    filters.brands.length > 0 ||
    filters.categories.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 999999999 ||
    filters.inStock;

  const filterContent = (
    <div className="space-y-0">
      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Đang lọc</span>
            <button
              onClick={clearAll}
              className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Xóa tất cả
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filters.brands.map((b) => (
              <span
                key={b}
                onClick={() => toggleBrand(b)}
                className="inline-flex items-center gap-1 px-2 py-1 bg-[#3e2723] text-white text-xs rounded-md cursor-pointer hover:bg-red-500 transition-colors capitalize"
              >
                {b} <X className="w-3 h-3" />
              </span>
            ))}
            {filters.categories.map((c) => {
              const cat = categories.find((cat) => cat.slug === c);
              return (
                <span
                  key={c}
                  onClick={() => toggleCategory(c)}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-[#3e2723] text-white text-xs rounded-md cursor-pointer hover:bg-red-500 transition-colors"
                >
                  {cat?.name} <X className="w-3 h-3" />
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Categories */}
      <FilterSection title="Danh Mục">
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat.slug)}
                onChange={() => toggleCategory(cat.slug)}
                className="w-4 h-4 rounded border-gray-300 text-[#3e2723] accent-[#3e2723]"
              />
              <span className="text-sm text-gray-700 group-hover:text-[#3e2723] transition-colors flex-1">
                {cat.name}
              </span>
              <span className="text-xs text-gray-400">{cat.productCount}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Brand filter ẩn — website chỉ bán V-ZUG */}

      {/* Price Range */}
      <FilterSection title="Mức Giá">
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => {
            const isActive =
              filters.priceRange[0] === range.min && filters.priceRange[1] === range.max;
            return (
              <button
                key={range.label}
                onClick={() => setPriceRange(range.min, range.max)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-[#3e2723] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {range.label}
              </button>
            );
          })}
          <button
            onClick={() => setPriceRange(0, 999999999)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
              filters.priceRange[0] === 0 && filters.priceRange[1] === 999999999
                ? "bg-[#3e2723] text-white"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            Tất cả mức giá
          </button>
        </div>
      </FilterSection>

      {/* In Stock */}
      <FilterSection title="Tình Trạng">
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => onChange({ ...filters, inStock: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 accent-[#3e2723]"
          />
          <span className="text-sm text-gray-700 group-hover:text-[#3e2723] transition-colors">
            Chỉ hiện hàng có sẵn
          </span>
        </label>
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-[#3e2723] transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Bộ Lọc
          {hasActiveFilters && (
            <span className="ml-1 w-5 h-5 bg-[#3e2723] text-white text-xs rounded-full flex items-center justify-center">
              {filters.brands.length + filters.categories.length}
            </span>
          )}
        </button>

        {/* Mobile Filter Drawer */}
        {isMobileOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setIsMobileOpen(false)}
            />
            <div className="fixed left-0 top-0 h-full w-80 bg-white z-50 flex flex-col shadow-2xl">
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <h3 className="font-semibold text-gray-900">Bộ Lọc ({totalProducts} sản phẩm)</h3>
                <button onClick={() => setIsMobileOpen(false)}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4">{filterContent}</div>
              <div className="px-5 py-4 border-t">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full py-3 bg-[#3e2723] text-white font-semibold rounded-xl"
                >
                  Xem {totalProducts} Sản Phẩm
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-[calc(theme(spacing.20)+theme(spacing.12)+1rem)]">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Bộ Lọc
            </h3>
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="text-xs text-red-500 hover:text-red-600 font-medium"
              >
                Xóa tất cả
              </button>
            )}
          </div>
          {filterContent}
        </div>
      </div>
    </>
  );
}

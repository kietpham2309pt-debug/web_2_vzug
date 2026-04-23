"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, List, ArrowUpDown, SlidersHorizontal, X } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "@/components/products/ProductCard";
import Pagination from "@/components/ui/Pagination";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "default", label: "Mặc định" },
  { value: "price-asc", label: "Giá thấp đến cao" },
  { value: "price-desc", label: "Giá cao đến thấp" },
  { value: "discount", label: "Giảm giá nhiều nhất" },
  { value: "name-asc", label: "Tên A → Z" },
  { value: "new", label: "Mới nhất" },
];

interface ProductsClientProps {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
  categories: { name: string; slug: string; count: number }[];
  brands: { name: string; count: number }[];
  // active filters (from URL)
  activeCategory: string;
  activeBrand: string;
  activeSort: string;
  searchQuery: string;
  viewMode?: "grid" | "list";
}

export default function ProductsClient({
  products,
  total,
  page,
  totalPages,
  limit,
  categories,
  brands,
  activeCategory,
  activeBrand,
  activeSort,
  searchQuery,
}: ProductsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page"); // Reset về trang 1 khi đổi filter
    router.push(`/san-pham?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => router.push("/san-pham", { scroll: false });
  const hasFilters = activeCategory || activeBrand || searchQuery;

  // Resolve slug → display name for category (URL may hold either slug or full name)
  const activeCategoryName =
    activeCategory
      ? (categories.find((c) => c.slug === activeCategory)?.name ?? activeCategory)
      : "";

  const pageTitle = searchQuery
    ? `Kết quả cho: "${searchQuery}"`
    : activeCategoryName || activeBrand
    ? `${activeCategoryName || activeBrand}`
    : "Tất Cả Sản Phẩm";

  const breadcrumbs = [
    { label: "Sản Phẩm", href: "/san-pham" },
    ...(activeCategoryName ? [{ label: activeCategoryName }] : []),
    ...(activeBrand ? [{ label: activeBrand }] : []),
    ...(searchQuery ? [{ label: `"${searchQuery}"` }] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 pt-4 pb-1">
          <Breadcrumb items={breadcrumbs.slice(0, -1)} />
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-5">
          <h1 className="text-2xl md:text-3xl font-black text-[#3e2723]">{pageTitle}</h1>
          <p className="text-sm text-gray-500 mt-1">{total} sản phẩm</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6 lg:gap-8">
          {/* ── Sidebar Filter ── */}
          <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-36">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
                  <SlidersHorizontal className="w-4 h-4" />
                  Bộ Lọc
                </h2>
                {hasFilters && (
                  <button onClick={clearAll} className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1">
                    <X className="w-3 h-3" /> Xóa
                  </button>
                )}
              </div>

              {/* Danh mục */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Danh Mục</p>
                <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
                  <button
                    onClick={() => setParam("category", "")}
                    className={cn(
                      "w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors flex justify-between",
                      !activeCategory ? "bg-[#3e2723] text-white" : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <span>Tất cả</span>
                    <span className="opacity-60">{total}</span>
                  </button>
                  {categories.map((cat, index) => (
                    <button
                      key={`${cat.slug}-${index}`}
                      onClick={() => setParam("category", cat.slug)}
                      className={cn(
                        "w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors flex justify-between gap-2",
                        activeCategory === cat.slug
                          ? "bg-[#3e2723] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="opacity-60 flex-shrink-0">{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand filter ẩn — website chỉ bán V-ZUG, không cần chọn thương hiệu */}
            </div>
          </aside>

          {/* ── Main Content ── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 bg-white rounded-xl border border-gray-100 px-4 py-3">
              <span className="text-sm text-gray-600 hidden sm:block">
                Trang <strong>{page}</strong> / {totalPages}
              </span>

              <div className="flex items-center gap-3 ml-auto">
                <div className="flex items-center gap-1.5">
                  <ArrowUpDown className="w-4 h-4 text-gray-400 hidden sm:block" />
                  <select
                    value={activeSort}
                    onChange={(e) => setParam("sort", e.target.value)}
                    className="text-sm border-0 bg-transparent text-gray-700 font-medium focus:outline-none cursor-pointer"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Mobile filter button */}
                <button
                  className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600"
                  onClick={() => {/* TODO: mobile filter drawer */}}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Lọc {hasFilters && <span className="w-4 h-4 bg-[#3e2723] text-white text-[10px] rounded-full flex items-center justify-center">!</span>}
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeCategory && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#3e2723] text-white text-xs rounded-full font-medium">
                    {activeCategoryName}
                    <button onClick={() => setParam("category", "")} aria-label="Xóa lọc danh mục">
                      <X className="w-3 h-3 ml-1 hover:opacity-70" />
                    </button>
                  </span>
                )}
                {/* brand chip ẩn — không dùng brand filter ngoài UI */}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full font-medium">
                    🔍 "{searchQuery}"
                    <button onClick={() => setParam("q", "")} aria-label="Xóa tìm kiếm">
                      <X className="w-3 h-3 ml-1 hover:opacity-70" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products Grid */}
            {products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-500 text-sm mb-4">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                <button onClick={clearAll} className="text-[#3e2723] font-semibold text-sm hover:underline">
                  Xem tất cả sản phẩm
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              limit={limit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

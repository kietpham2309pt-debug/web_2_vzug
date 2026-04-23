"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Heart,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { useCartStore } from "@/lib/store";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";
import CartDrawer from "./CartDrawer";

export interface HeaderCollection {
  id: string;
  name: string;
  slug: string;
  href: string;
  productCount: number;
  sampleImage: string;
}

interface HeaderProps {
  collections?: HeaderCollection[];
}

const NAV_ITEMS = [
  { label: "Trang Chủ", href: "/" },
  { label: "Bộ Sưu Tập", href: "/san-pham", hasMenu: true },
  { label: "Về V-ZUG", href: "/ve-v-zug" },
  { label: "Liên Hệ", href: "/lien-he" },
];

export default function Header({ collections = [] }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalItems, openCart } = useCartStore();
  const router = useRouter();
  const totalItems = getTotalItems();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/san-pham?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
      setIsMobileOpen(false);
    }
  };

  // Collections mega-menu — open on hover with a short close delay so pointer
  // can travel from the nav item into the panel without flicker.
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const hasCollections = collections.length > 0;

  const openCollections = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setIsCollectionsOpen(true);
  };
  const scheduleCloseCollections = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setIsCollectionsOpen(false);
      closeTimer.current = null;
    }, 140);
  };

  return (
    <>
      {/* Announcement strip — slim, chocolate background */}
      <div className="hidden md:block bg-[#2b1810] text-[#faf6f0]/90 text-[11px] tracking-[0.12em] uppercase">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-8">
          <span className="font-medium">
            V-ZUG · Swiss Made Since 1913
          </span>
          <div className="flex items-center gap-5">
            <a
              href="tel:02888875668"
              className="flex items-center gap-1.5 hover:text-[#c87941] transition-colors"
            >
              <Phone className="w-3 h-3" />
              028 8887 5668
            </a>
            <span className="text-[#c87941]">·</span>
            <Link href="/lien-he" className="hover:text-[#c87941] transition-colors">
              Showroom HCM
            </Link>
          </div>
        </div>
      </div>

      {/* Main header — single row, logo left | nav center | actions right */}
      <header
        className={cn(
          "sticky top-0 z-40 bg-[#faf6f0]/95 backdrop-blur-md transition-all duration-300",
          isScrolled ? "border-b border-[#e8dfd4] shadow-sm" : "border-b border-transparent"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center h-20 gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 border border-[#2b1810] flex items-center justify-center group-hover:bg-[#2b1810] transition-colors">
                <span className="font-serif text-xl font-medium text-[#2b1810] group-hover:text-[#faf6f0] transition-colors leading-none">
                  V
                </span>
              </div>
              <div className="hidden sm:block">
                <div className="font-serif text-2xl text-[#2b1810] leading-none tracking-[0.22em] font-medium">
                  V-ZUG
                </div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-[#a0522d] mt-1">
                  WellHome · Since 1913
                </div>
              </div>
            </Link>

            {/* Desktop nav — centered */}
            <nav className="hidden lg:flex flex-1 items-center justify-center gap-10">
              {NAV_ITEMS.map((item) => {
                const isCollections = item.hasMenu && hasCollections;
                const active = isCollections && isCollectionsOpen;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={isCollections ? openCollections : undefined}
                    onMouseLeave={isCollections ? scheduleCloseCollections : undefined}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "relative text-[13px] tracking-[0.15em] uppercase font-medium transition-colors group py-2 inline-flex items-center gap-1.5",
                        active ? "text-[#a0522d]" : "text-[#2b1810] hover:text-[#a0522d]"
                      )}
                      aria-haspopup={isCollections ? "true" : undefined}
                      aria-expanded={isCollections ? active : undefined}
                      onFocus={isCollections ? openCollections : undefined}
                      onBlur={isCollections ? scheduleCloseCollections : undefined}
                    >
                      {item.label}
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 h-px bg-[#a0522d] transition-all duration-300",
                          active ? "w-full" : "w-0 group-hover:w-full"
                        )}
                      />
                    </Link>
                  </div>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1 ml-auto lg:ml-0">
              <button
                onClick={() => setIsSearchOpen((v) => !v)}
                aria-label="Tìm kiếm"
                className="p-2.5 text-[#2b1810] hover:text-[#a0522d] transition-colors"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>

              <Link
                href="/yeu-thich"
                aria-label="Danh sách yêu thích"
                className="hidden sm:flex p-2.5 text-[#2b1810] hover:text-[#a0522d] transition-colors"
              >
                <Heart className="w-[18px] h-[18px]" />
              </Link>

              <button
                onClick={openCart}
                aria-label="Giỏ hàng"
                className="relative p-2.5 text-[#2b1810] hover:text-[#a0522d] transition-colors"
              >
                <ShoppingCart className="w-[18px] h-[18px]" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-[16px] bg-[#a0522d] text-white
                                   text-[9px] font-bold rounded-full flex items-center justify-center px-1">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileOpen(true)}
                aria-label="Mở menu"
                className="lg:hidden p-2.5 text-[#2b1810] ml-1"
              >
                <Menu className="w-[20px] h-[20px]" />
              </button>
            </div>
          </div>

          {/* Collections mega-menu — compact dropdown listing all categories */}
          {hasCollections && (
            <div
              onMouseEnter={openCollections}
              onMouseLeave={scheduleCloseCollections}
              className={cn(
                "absolute left-1/2 -translate-x-1/2 top-full w-[min(720px,calc(100vw-2rem))] origin-top bg-white border border-[#e8dfd4] shadow-[0_20px_40px_-20px_rgba(20,9,10,0.25)] rounded-b-xl transition-all duration-200 ease-out",
                isCollectionsOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              )}
              aria-hidden={!isCollectionsOpen}
            >
              <div className="p-5">
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
                  {collections.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={c.href}
                        onClick={() => setIsCollectionsOpen(false)}
                        className="group flex items-center gap-3 p-2 rounded-lg hover:bg-[#faf6f0] transition-colors"
                      >
                        <div className="relative w-12 h-12 rounded-md overflow-hidden bg-[#f2ebdf] flex-shrink-0">
                          {c.sampleImage && (
                            <Image
                              src={c.sampleImage}
                              alt={c.name}
                              fill
                              sizes="48px"
                              className="object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[13px] font-semibold text-[#2b1810] group-hover:text-[#a0522d] transition-colors leading-tight truncate">
                            {c.name}
                          </div>
                          <div className="text-[11px] text-[#4a3a30]/70 mt-0.5">
                            {c.productCount} sản phẩm
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-3 border-t border-[#e8dfd4] flex items-center justify-between">
                  <span className="text-[12px] text-[#4a3a30]/70">
                    Xem toàn bộ danh mục V-ZUG
                  </span>
                  <Link
                    href="/san-pham"
                    onClick={() => setIsCollectionsOpen(false)}
                    className="text-[12px] tracking-[0.18em] uppercase font-semibold text-[#2b1810] hover:text-[#a0522d] transition-colors inline-flex items-center gap-1"
                  >
                    Xem Tất Cả
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Search dropdown */}
          {isSearchOpen && (
            <div className="border-t border-[#e8dfd4] py-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0522d]" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm lò nướng, lò hấp, tủ rượu V-ZUG…"
                  className="w-full h-10 pl-7 pr-10 bg-transparent border-0 border-b border-[#e8dfd4]
                             font-serif text-2xl text-[#2b1810] placeholder:text-[#a0522d]/60
                             focus:outline-none focus:border-[#2b1810] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#2b1810] hover:text-[#a0522d]"
                  aria-label="Đóng"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 bg-[#faf6f0] flex flex-col lg:hidden">
          <div className="flex items-center justify-between h-20 px-6 border-b border-[#e8dfd4]">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className="font-serif text-2xl tracking-[0.22em] text-[#2b1810]"
            >
              V-ZUG
            </Link>
            <button
              onClick={() => setIsMobileOpen(false)}
              aria-label="Đóng menu"
              className="p-2.5 text-[#2b1810]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-8">
            <form onSubmit={handleSearch} className="relative mb-8">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0522d]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm sản phẩm…"
                className="w-full h-10 pl-7 bg-transparent border-0 border-b border-[#e8dfd4]
                           font-serif text-xl text-[#2b1810] placeholder:text-[#a0522d]/60
                           focus:outline-none focus:border-[#2b1810]"
              />
            </form>

            <ul className="space-y-0 divide-y divide-[#e8dfd4]">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-between py-4 font-serif text-2xl text-[#2b1810]
                               hover:text-[#a0522d] transition-colors"
                  >
                    <span>{item.label}</span>
                    <span className="text-[#a0522d] text-sm">→</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-6 border-t border-[#e8dfd4]">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#a0522d] mb-4">
                Danh Mục
              </p>
              <ul className="space-y-3">
                {categories.slice(0, 8).map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/san-pham?category=${cat.slug}`}
                      onClick={() => setIsMobileOpen(false)}
                      className="text-sm text-[#4a3a30] hover:text-[#2b1810] flex items-center justify-between"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[#a0522d]/60 text-xs">{cat.productCount}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="px-6 py-5 bg-[#2b1810] text-[#faf6f0] text-xs tracking-[0.12em] uppercase">
            <a href="tel:02888875668" className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-[#c87941]" />
              Hotline: 028 8887 5668
            </a>
          </div>
        </div>
      )}

      <CartDrawer />
    </>
  );
}

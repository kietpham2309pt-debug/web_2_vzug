"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems, clearCart } =
    useCartStore();

  const total = getTotalPrice();
  const count = getTotalItems();
  const shipping = total >= 5000000 ? 0 : 250000;
  const discount = 0;
  const finalTotal = total + shipping - discount;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Breadcrumb items={[{ label: "Giỏ Hàng" }]} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black text-[#3e2723] flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            Giỏ Hàng ({count} sản phẩm)
          </h1>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              Xóa Tất Cả
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Giỏ hàng của bạn đang trống</h2>
            <p className="text-gray-500 mb-8">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục</p>
            <Link href="/san-pham">
              <Button size="lg">Khám Phá Sản Phẩm</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Header Row */}
              <div className="hidden md:grid grid-cols-12 gap-4 bg-white rounded-xl border border-gray-100 px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <div className="col-span-6">Sản phẩm</div>
                <div className="col-span-2 text-center">Đơn giá</div>
                <div className="col-span-2 text-center">Số lượng</div>
                <div className="col-span-2 text-right">Thành tiền</div>
              </div>

              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-4"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                    <Image
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/san-pham/${item.product.slug}`}
                      className="text-sm font-semibold text-gray-900 hover:text-[#3e2723] line-clamp-2 transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-[#8d6e63] font-semibold uppercase mt-0.5 capitalize">
                      {item.product.brand}
                    </p>

                    <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                      {/* Price */}
                      <div>
                        <span className="text-base font-bold text-[#3e2723]">
                          {formatPrice(item.product.price)}
                        </span>
                        {item.product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through ml-2">
                            {formatPrice(item.product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <span className="text-base font-black text-[#3e2723]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <Link href="/san-pham" className="inline-flex items-center gap-2 text-sm text-[#3e2723] font-semibold hover:text-[#8d6e63] transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Tiếp Tục Mua Sắm
              </Link>
            </div>

            {/* Summary */}
            <div className="space-y-4">
              {/* Order Summary */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Tóm Tắt Đơn Hàng</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính ({count} sản phẩm)</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển</span>
                    <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                      {shipping === 0 ? "Miễn phí" : formatPrice(shipping)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-100 pt-3 flex justify-between font-black text-base">
                    <span className="text-gray-900">Tổng Cộng</span>
                    <span className="text-[#3e2723]">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                {shipping === 0 && (
                  <div className="mt-3 bg-green-50 text-green-700 text-xs p-3 rounded-xl">
                    ✓ Bạn được miễn phí vận chuyển!
                  </div>
                )}
                {shipping > 0 && (
                  <div className="mt-3 bg-amber-50 text-amber-700 text-xs p-3 rounded-xl">
                    Mua thêm {formatPrice(5000000 - total)} để được miễn phí vận chuyển
                  </div>
                )}

                <Link href="/lien-he-dat-hang" className="block mt-4">
                  <Button size="lg" className="w-full">
                    Liên Hệ Đặt Hàng
                  </Button>
                </Link>

                <p className="text-xs text-center text-gray-500 mt-3">
                  Nhân viên sẽ liên hệ xác nhận đơn hàng trong 30 phút
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

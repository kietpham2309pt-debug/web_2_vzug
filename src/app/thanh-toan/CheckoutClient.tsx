"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ChevronRight, CreditCard, Banknote, Smartphone, Truck } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";

type Step = "info" | "shipping" | "payment" | "success";

const SHIPPING_OPTIONS = [
  { id: "standard", label: "Giao hàng tiêu chuẩn", desc: "3-5 ngày làm việc", price: 0, icon: "🚚" },
  { id: "express", label: "Giao hàng nhanh", desc: "1-2 ngày làm việc", price: 150000, icon: "⚡" },
  { id: "same-day", label: "Giao trong ngày", desc: "Trong ngày (đặt trước 12h)", price: 300000, icon: "🏃" },
];

const PAYMENT_METHODS = [
  { id: "cod", label: "Tiền mặt khi nhận hàng (COD)", icon: Banknote },
  { id: "bank", label: "Chuyển khoản ngân hàng", icon: CreditCard },
  { id: "momo", label: "Ví MoMo", icon: Smartphone },
  { id: "vnpay", label: "VNPay", icon: CreditCard },
];

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>("info");
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
    note: "",
  });

  const total = getTotalPrice();
  const shippingOption = SHIPPING_OPTIONS.find((s) => s.id === selectedShipping);
  const shippingCost = shippingOption?.price ?? 0;
  const finalTotal = total + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    setStep("success");
    clearCart();
  };

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-lg w-full mx-4 text-center">
          <div className="bg-white rounded-3xl p-10 shadow-xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-black text-[#3e2723] mb-3">Đặt Hàng Thành Công!</h2>
            <p className="text-gray-600 mb-2">
              Mã đơn hàng: <strong className="text-[#3e2723]">#LH{Date.now().toString().slice(-6)}</strong>
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Chúng tôi sẽ liên hệ xác nhận đơn hàng trong vòng 30 phút. Cảm ơn bạn đã tin tưởng V-ZUG Vietnam!
            </p>
            <div className="space-y-3">
              <Link href="/">
                <Button size="lg" className="w-full">Về Trang Chủ</Button>
              </Link>
              <Link href="/san-pham">
                <Button variant="outline" size="lg" className="w-full">Tiếp Tục Mua Sắm</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Breadcrumb items={[{ label: "Giỏ Hàng", href: "/gio-hang" }, { label: "Thanh Toán" }]} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-black text-[#3e2723] mb-6">Thanh Toán</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Form */}
            <div className="lg:col-span-2 space-y-5">
              {/* Customer Info */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 bg-[#3e2723] text-white text-xs font-bold rounded-full flex items-center justify-center">1</span>
                  Thông Tin Khách Hàng
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { field: "name", label: "Họ và tên", type: "text", required: true, placeholder: "Nguyễn Văn A" },
                    { field: "phone", label: "Số điện thoại", type: "tel", required: true, placeholder: "0901 234 567" },
                    { field: "email", label: "Email", type: "email", required: false, placeholder: "example@email.com", full: true },
                  ].map((f) => (
                    <div key={f.field} className={f.full ? "md:col-span-2" : ""}>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {f.label} {f.required && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type={f.type}
                        value={formData[f.field as keyof typeof formData]}
                        onChange={(e) => updateForm(f.field, e.target.value)}
                        required={f.required}
                        placeholder={f.placeholder}
                        className="w-full h-11 px-4 rounded-xl border-2 border-gray-200 text-sm
                                   focus:outline-none focus:border-[#3e2723] transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 bg-[#3e2723] text-white text-xs font-bold rounded-full flex items-center justify-center">2</span>
                  Địa Chỉ Giao Hàng
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Tỉnh / Thành phố <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => updateForm("city", e.target.value)}
                        required
                        className="w-full h-11 px-4 rounded-xl border-2 border-gray-200 text-sm
                                   focus:outline-none focus:border-[#3e2723] transition-colors bg-white"
                      >
                        <option value="">Chọn tỉnh/thành</option>
                        <option value="hcm">TP. Hồ Chí Minh</option>
                        <option value="hn">Hà Nội</option>
                        <option value="dn">Đà Nẵng</option>
                        <option value="other">Tỉnh/thành khác</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Quận / Huyện <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.district}
                        onChange={(e) => updateForm("district", e.target.value)}
                        required
                        placeholder="Quận 7"
                        className="w-full h-11 px-4 rounded-xl border-2 border-gray-200 text-sm
                                   focus:outline-none focus:border-[#3e2723] transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Địa chỉ cụ thể <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => updateForm("address", e.target.value)}
                      required
                      placeholder="Số nhà, tên đường, phường/xã"
                      className="w-full h-11 px-4 rounded-xl border-2 border-gray-200 text-sm
                                 focus:outline-none focus:border-[#3e2723] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Ghi chú</label>
                    <textarea
                      value={formData.note}
                      onChange={(e) => updateForm("note", e.target.value)}
                      rows={3}
                      placeholder="Ghi chú thêm về đơn hàng, thời gian giao hàng..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm resize-none
                                 focus:outline-none focus:border-[#3e2723] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 bg-[#3e2723] text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
                  Phương Thức Vận Chuyển
                </h2>
                <div className="space-y-3">
                  {SHIPPING_OPTIONS.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedShipping === option.id
                          ? "border-[#3e2723] bg-[#f0f4f8]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={selectedShipping === option.id}
                        onChange={() => setSelectedShipping(option.id)}
                        className="accent-[#3e2723]"
                      />
                      <span className="text-xl">{option.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{option.label}</p>
                        <p className="text-xs text-gray-500">{option.desc}</p>
                      </div>
                      <span className={`text-sm font-bold ${option.price === 0 ? "text-green-600" : "text-gray-900"}`}>
                        {option.price === 0 ? "Miễn phí" : formatPrice(option.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 bg-[#3e2723] text-white text-xs font-bold rounded-full flex items-center justify-center">4</span>
                  Phương Thức Thanh Toán
                </h2>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedPayment === method.id
                          ? "border-[#3e2723] bg-[#f0f4f8]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={() => setSelectedPayment(method.id)}
                        className="accent-[#3e2723]"
                      />
                      <method.icon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900 text-sm">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Summary */}
            <div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-36">
                <h3 className="font-bold text-gray-900 mb-4">Đơn Hàng Của Bạn</h3>

                {/* Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
                        <Image
                          src={item.product.thumbnail}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#3e2723] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900 line-clamp-2">{item.product.name}</p>
                        <p className="text-xs font-bold text-[#3e2723] mt-0.5">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Vận chuyển</span>
                    <span className={shippingCost === 0 ? "text-green-600" : ""}>
                      {shippingCost === 0 ? "Miễn phí" : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="border-t border-gray-100 pt-2 flex justify-between font-black text-base">
                    <span>Tổng Cộng</span>
                    <span className="text-[#3e2723]">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-4"
                  loading={loading}
                >
                  {loading ? "Đang xử lý..." : "Đặt Hàng Ngay"}
                  {!loading && <ChevronRight className="w-4 h-4" />}
                </Button>

                <p className="text-xs text-gray-400 text-center mt-3">
                  Bằng cách đặt hàng, bạn đồng ý với{" "}
                  <Link href="/dieu-khoan" className="text-[#3e2723] hover:underline">
                    Điều Khoản Sử Dụng
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

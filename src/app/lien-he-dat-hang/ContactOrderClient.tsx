"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ChevronRight, Phone } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";

type Step = "form" | "success";

export default function ContactOrderClient() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>("form");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
            <h2 className="text-2xl font-black text-[#3e2723] mb-3">Gửi Yêu Cầu Thành Công!</h2>
            <p className="text-gray-600 mb-2">
              Mã yêu cầu: <strong className="text-[#3e2723]">#LH{Date.now().toString().slice(-6)}</strong>
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Nhân viên sẽ liên hệ xác nhận đơn hàng trong vòng 30 phút.
              Cảm ơn bạn đã tin tưởng Công ty TNHH WELLHOME (Việt Nam)!
            </p>
            <div className="space-y-3">
              <Link href="/">
                <Button size="lg" className="w-full">Về Trang Chủ</Button>
              </Link>
              <Link href="/san-pham">
                <Button variant="outline" size="lg" className="w-full">Tiếp Tục Xem Sản Phẩm</Button>
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
          <Breadcrumb items={[{ label: "Giỏ Hàng", href: "/gio-hang" }, { label: "Liên Hệ Đặt Hàng" }]} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-black text-[#3e2723] mb-2">Liên Hệ Đặt Hàng</h1>
        <p className="text-gray-500 text-sm mb-6">Vui lòng điền thông tin, nhân viên sẽ liên hệ xác nhận đơn hàng trong 30 phút.</p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Form */}
            <div className="lg:col-span-2 space-y-5">
              {/* Customer Info */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 bg-[#3e2723] text-white text-xs font-bold rounded-full flex items-center justify-center">1</span>
                  Thông Tin Liên Hệ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { field: "name", label: "Họ và tên", type: "text", required: true, placeholder: "Nguyễn Văn A" },
                    { field: "phone", label: "Số điện thoại", type: "tel", required: true, placeholder: "0901 234 567" },
                    { field: "email", label: "Email", type: "email", required: false, placeholder: "example@email.com", full: true },
                  ].map((f) => (
                    <div key={f.field} className={(f as { full?: boolean }).full ? "md:col-span-2" : ""}>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Ghi chú thêm</label>
                    <textarea
                      value={formData.note}
                      onChange={(e) => updateForm("note", e.target.value)}
                      rows={3}
                      placeholder="Ghi chú thêm về đơn hàng, thời gian giao hàng mong muốn..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm resize-none
                                 focus:outline-none focus:border-[#3e2723] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Summary */}
            <div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-36">
                <h3 className="font-bold text-gray-900 mb-4">Sản Phẩm Cần Đặt</h3>

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
                    <span className="text-green-600">Liên hệ</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2 flex justify-between font-black text-base">
                    <span>Tổng Cộng</span>
                    <span className="text-[#3e2723]">{formatPrice(total)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-4"
                  loading={loading}
                >
                  <Phone className="w-4 h-4" />
                  {loading ? "Đang gửi..." : "Gửi Yêu Cầu Đặt Hàng"}
                  {!loading && <ChevronRight className="w-4 h-4" />}
                </Button>

                <p className="text-xs text-gray-400 text-center mt-3">
                  Nhân viên sẽ liên hệ xác nhận đơn hàng trong vòng 30 phút
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

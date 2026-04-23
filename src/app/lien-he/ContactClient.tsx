"use client";

import { useState } from "react";
import { CheckCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function ContactClient() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Breadcrumb items={[{ label: "Liên Hệ" }]} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-black text-[#3e2723] mb-2">Liên Hệ Với Chúng Tôi</h1>
        <p className="text-gray-500 text-sm mb-8">Công ty TNHH K-Homès luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ qua form bên dưới hoặc đến trực tiếp showroom.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Contact Form */}
          <div>
            {sent ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-black text-[#3e2723] mb-2">Gửi Thành Công!</h2>
                <p className="text-gray-500 text-sm mb-6">Nhân viên sẽ liên hệ lại trong vòng 30 phút. Cảm ơn bạn!</p>
                <Button onClick={() => setSent(false)} variant="outline">Gửi Tin Nhắn Khác</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                <h2 className="font-bold text-gray-900 mb-2">Gửi Tin Nhắn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateForm("name", e.target.value)}
                      required
                      placeholder="Nguyễn Văn A"
                      className="w-full h-11 px-4 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-[#3e2723] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateForm("phone", e.target.value)}
                      required
                      placeholder="0901 234 567"
                      className="w-full h-11 px-4 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-[#3e2723] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    placeholder="example@email.com"
                    className="w-full h-11 px-4 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-[#3e2723] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Chủ đề</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => updateForm("subject", e.target.value)}
                    placeholder="Tư vấn sản phẩm, bảo hành, ..."
                    className="w-full h-11 px-4 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-[#3e2723] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nội dung <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => updateForm("message", e.target.value)}
                    required
                    rows={4}
                    placeholder="Nhập nội dung tin nhắn..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm resize-none focus:outline-none focus:border-[#3e2723] transition-colors"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full" loading={loading}>
                  {loading ? "Đang gửi..." : "Gửi Tin Nhắn"}
                </Button>
              </form>
            )}

            {/* Contact Info */}
            <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Thông Tin Liên Hệ</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#3e2723] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Hotline</p>
                    <a href="tel:02877748885" className="text-sm text-[#8d6e63] hover:underline">028 7774 8885</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#3e2723] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Email</p>
                    <a href="mailto:cskh@khomes.vn" className="text-sm text-[#8d6e63] hover:underline">cskh@khomes.vn</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#3e2723] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Showroom</p>
                    <p className="text-sm text-gray-600">10 Đồng Văn Cống, Bình Trưng Tây, Cát Lái, TP.HCM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#3e2723] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Giờ làm việc</p>
                    <p className="text-sm text-gray-600">Thứ 2 - Chủ Nhật: 8:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Google Maps */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-fit sticky top-36">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Công ty TNHH K-Homès</h3>
              <p className="text-sm text-gray-500 mt-1">10 Đồng Văn Cống, Bình Trưng Tây, Cát Lái, TP.HCM</p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29803.081138506263!2d106.73444083995184!3d10.78760587584766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317525d9420a8ad1%3A0xb5cfc22b5bb736f2!2zMTAgxJDhu5NuZyBWxINuIEPhu5FuZywgUGjGsOG7nW5nIELDrG5oIFRyxrBuZyBUw6J5LCBDw6F0IEzDoWksIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e1!3m2!1svi!2s!4v1776418881707!5m2!1svi!2s"
              width="100%"
              height="480"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Công ty TNHH K-Homès"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

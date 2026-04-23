import { Shield, Truck, Wrench, Headphones } from "lucide-react";

export default function PromoSection() {
  const features = [
    {
      icon: Truck,
      title: "Giao Hàng Toàn Quốc",
      desc: "Miễn phí nội thành HCM & Hà Nội",
    },
    {
      icon: Shield,
      title: "Bảo Hành Chính Hãng",
      desc: "V-ZUG Thụy Sĩ · 2 năm",
    },
    {
      icon: Wrench,
      title: "Lắp Đặt Miễn Phí",
      desc: "Đội ngũ kỹ thuật V-ZUG",
    },
    {
      icon: Headphones,
      title: "Tư Vấn 24/7",
      desc: "028 7774 8885",
    },
  ];

  return (
    <section className="bg-[#2b1810] text-[#faf6f0]">
      <div className="max-w-[1400px] mx-auto px-6 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 divide-x divide-[#faf6f0]/15">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`flex items-start gap-4 ${i > 0 ? "md:pl-6" : ""}`}
            >
              <div className="w-10 h-10 border border-[#c87941] flex items-center justify-center flex-shrink-0">
                <f.icon className="w-[18px] h-[18px] text-[#c87941]" />
              </div>
              <div>
                <p className="text-base font-semibold leading-tight">{f.title}</p>
                <p className="text-[11px] tracking-[0.12em] uppercase text-[#faf6f0]/60 mt-1">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

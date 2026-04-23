import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const productLinks = [
    { label: "Lò Nướng Âm Tủ", href: "/san-pham?category=lo-nuong" },
    { label: "Lò Hấp Kết Hợp", href: "/san-pham?category=lo-hap" },
    { label: "Tủ Lạnh", href: "/san-pham?category=tu-lanh" },
    { label: "Tủ Rượu Vang", href: "/san-pham?category=tu-ruou" },
    { label: "Máy Hút Mùi", href: "/san-pham?category=may-hut-mui" },
    { label: "Bếp Từ", href: "/san-pham?category=bep-tu" },
  ];

  const supportLinks = [
    { label: "Về V-ZUG", href: "/ve-v-zug" },
    { label: "Chính Sách Vận Chuyển", href: "/chinh-sach-van-chuyen" },
    { label: "Chính Sách Bảo Hành", href: "/chinh-sach-bao-hanh" },
    { label: "Hướng Dẫn Mua Hàng", href: "/huong-dan-mua-hang" },
    { label: "Câu Hỏi Thường Gặp", href: "/cau-hoi-thuong-gap" },
    { label: "Liên Hệ", href: "/lien-he" },
  ];

  const policyBottomLinks = [
    { label: "Quyền Riêng Tư", href: "/chinh-sach-quyen-rieng-tu" },
    { label: "Điều Khoản", href: "/dieu-khoan" },
    { label: "Cookie", href: "/chinh-sach-cookie" },
  ];

  return (
    <footer className="bg-[#2b1810] text-[#faf6f0]">
      {/* Top — centered brand block */}
      <div className="max-w-[1400px] mx-auto px-6 pt-20 pb-14 text-center border-b border-[#faf6f0]/10">
        <div className="inline-flex items-center justify-center w-16 h-16 border border-[#c87941] mb-6 font-serif text-3xl text-[#c87941]">
          V
        </div>
        <h3 className="font-serif text-4xl md:text-5xl tracking-[0.22em] mb-3">
          V-ZUG
        </h3>
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#c87941] mb-5">
          Swiss Made · Since 1913
        </p>
        <p className="max-w-lg mx-auto text-sm text-[#faf6f0]/70 leading-relaxed">
          Công ty TNHH K-Homès — Nhà phân phối chính thức sản phẩm V-ZUG Thụy Sĩ tại Việt Nam. Lò nướng, lò hấp, tủ lạnh, tủ rượu, máy hút mùi, bếp từ âm tủ.
        </p>
      </div>

      {/* Middle — 3 columns */}
      <div className="max-w-[1400px] mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Contact */}
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#c87941] mb-5">
            Liên Hệ
          </p>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#c87941] mt-0.5 flex-shrink-0" />
              <div>
                <a
                  href="tel:02877748885"
                  className="font-serif text-xl hover:text-[#c87941] transition-colors block"
                >
                  028 7774 8885
                </a>
                <span className="text-xs text-[#faf6f0]/50 tracking-wide">
                  Tư vấn mua hàng · Phím 1
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#c87941] mt-0.5 flex-shrink-0" />
              <a
                href="mailto:cskh@khomes.vn"
                className="hover:text-[#c87941] transition-colors"
              >
                cskh@khomes.vn
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#c87941] mt-0.5 flex-shrink-0" />
              <span className="text-[#faf6f0]/80 leading-relaxed">
                10 Đồng Văn Cống, Bình Trưng Tây,<br />
                Cát Lái, TP. Hồ Chí Minh
              </span>
            </li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="px-3 py-1 border border-[#c87941]/40 text-[10px] tracking-[0.25em] uppercase text-[#c87941]">
              Swiss Made
            </span>
            <span className="px-3 py-1 border border-[#c87941]/40 text-[10px] tracking-[0.25em] uppercase text-[#c87941]">
              Chính Hãng
            </span>
          </div>
        </div>

        {/* Products */}
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#c87941] mb-5">
            Sản Phẩm
          </p>
          <ul className="space-y-2.5 text-sm">
            {productLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[#faf6f0]/80 hover:text-[#c87941] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#c87941] mb-5">
            Hỗ Trợ
          </p>
          <ul className="space-y-2.5 text-sm">
            {supportLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[#faf6f0]/80 hover:text-[#c87941] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#faf6f0]/10">
        <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] tracking-[0.1em] uppercase text-[#faf6f0]/50">
          <p>
            © {new Date().getFullYear()} Công ty TNHH K-Homès · MST 0317763152
          </p>
          <div className="flex items-center gap-5">
            {policyBottomLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-[#c87941] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

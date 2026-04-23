import { Metadata } from "next";
import PolicyPage from "@/components/ui/PolicyPage";
import { SITE_NAME, SITE_PHONE, SITE_EMAIL, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Hướng Dẫn Mua Hàng | ${SITE_NAME}`,
  description: "Hướng dẫn mua hàng sản phẩm V-ZUG chính hãng tại Công ty TNHH WELLHOME (Việt Nam) — đặt hàng, liên hệ, nhận hàng.",
  alternates: { canonical: canonicalUrl("/huong-dan-mua-hang") },
};

export default function BuyingGuidePage() {
  return (
    <PolicyPage title="Hướng Dẫn Mua Hàng">

      <p>V-ZUG Công ty TNHH WELLHOME (Việt Nam) hỗ trợ quý khách đặt hàng dễ dàng qua nhiều kênh. Dưới đây là hướng dẫn chi tiết.</p>

      <h2>Cách 1: Đặt hàng qua website</h2>
      <ol>
        <li>
          <strong>Chọn sản phẩm:</strong> Truy cập trang <a href="/san-pham" className="text-[#3e2723] underline">Sản Phẩm</a>, duyệt theo danh mục hoặc tìm kiếm theo tên sản phẩm.
        </li>
        <li>
          <strong>Xem chi tiết:</strong> Nhấn vào sản phẩm để xem thông số kỹ thuật, hình ảnh, giá và các tính năng nổi bật.
        </li>
        <li>
          <strong>Thêm vào giỏ hàng:</strong> Chọn số lượng mong muốn rồi nhấn &quot;Thêm Vào Giỏ&quot;.
        </li>
        <li>
          <strong>Gửi yêu cầu đặt hàng:</strong> Nhấn &quot;Liên Hệ Đặt Hàng&quot; trong giỏ hàng, điền thông tin liên hệ và địa chỉ giao hàng.
        </li>
        <li>
          <strong>Xác nhận đơn hàng:</strong> Nhân viên sẽ liên hệ xác nhận đơn hàng trong vòng 30 phút và tư vấn phương thức thanh toán phù hợp.
        </li>
      </ol>

      <h2>Cách 2: Liên hệ trực tiếp</h2>
      <p>Quý khách có thể liên hệ để được tư vấn và đặt hàng qua:</p>
      <ul>
        <li><strong>Hotline:</strong> {SITE_PHONE} (9h – 12h, 13h – 18h, T2 – T6) · Hỗ trợ kỹ thuật: 1800 8167 (miễn phí)</li>
        <li><strong>Email:</strong> {SITE_EMAIL}</li>
        <li><strong>Zalo / Facebook:</strong> Nhắn tin qua các kênh mạng xã hội chính thức</li>
      </ul>

      <h2>Cách 3: Đến showroom trực tiếp</h2>
      <p>
        Quý khách có thể đến trực tiếp showroom để xem và trải nghiệm sản phẩm V-ZUG:
      </p>
      <ul>
        <li><strong>Địa chỉ:</strong> Phòng 5.09, Lầu 5, Toà nhà ST Moritz, 1014 Phạm Văn Đồng, P. Hiệp Bình Chánh, TP. Thủ Đức, TP.HCM</li>
        <li><strong>Giờ mở cửa:</strong> 9h – 12h, 13h – 18h (T2 – T6)</li>
      </ul>

      <h2>Phương thức thanh toán</h2>
      <p>V-ZUG Công ty TNHH WELLHOME (Việt Nam) hỗ trợ các phương thức thanh toán sau:</p>
      <ul>
        <li><strong>Tiền mặt khi nhận hàng (COD):</strong> Thanh toán trực tiếp cho nhân viên giao hàng</li>
        <li><strong>Chuyển khoản ngân hàng:</strong> Thông tin tài khoản sẽ được cung cấp khi xác nhận đơn hàng</li>
        <li><strong>Thanh toán tại showroom:</strong> Tiền mặt hoặc quẹt thẻ</li>
      </ul>

      <h2>Sau khi đặt hàng</h2>
      <ol>
        <li>Nhân viên liên hệ xác nhận đơn hàng và phương thức thanh toán (trong 30 phút)</li>
        <li>Đơn hàng được xử lý và đóng gói</li>
        <li>Giao hàng đến địa chỉ (3–10 ngày tùy khu vực)</li>
        <li>Đội ngũ kỹ thuật liên hệ lắp đặt (nếu cần) trong vòng 24 giờ sau khi giao</li>
        <li>Kích hoạt bảo hành chính hãng</li>
      </ol>

      <h2>Cần hỗ trợ?</h2>
      <p>
        Nếu gặp khó khăn trong quá trình mua hàng, quý khách vui lòng liên hệ hotline <strong>{SITE_PHONE}</strong> hoặc gửi tin nhắn qua trang <a href="/lien-he" className="text-[#3e2723] underline">Liên Hệ</a> để được hỗ trợ nhanh chóng.
      </p>
    </PolicyPage>
  );
}

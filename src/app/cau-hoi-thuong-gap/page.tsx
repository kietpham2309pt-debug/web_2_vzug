import { Metadata } from "next";
import PolicyPage from "@/components/ui/PolicyPage";
import { SITE_NAME, SITE_PHONE, SITE_EMAIL, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Câu Hỏi Thường Gặp | ${SITE_NAME}`,
  description: "Câu hỏi thường gặp về sản phẩm V-ZUG, mua hàng, giao hàng, bảo hành tại Công ty TNHH K-Homès.",
  alternates: { canonical: canonicalUrl("/cau-hoi-thuong-gap") },
};

export default function FAQPage() {
  return (
    <PolicyPage title="Câu Hỏi Thường Gặp">

      <h2>Về sản phẩm</h2>

      <h3>Sản phẩm trên website có phải hàng chính hãng V-ZUG không?</h3>
      <p>
        Tất cả sản phẩm tại Công ty TNHH K-Homès đều là hàng <strong>nhập khẩu chính hãng từ V-ZUG Thụy Sĩ (Swiss Made)</strong>, có đầy đủ tem bảo hành, hóa đơn và chứng từ nhập khẩu. Quý khách hoàn toàn yên tâm về nguồn gốc và chất lượng sản phẩm.
      </p>

      <h3>Màu sắc sản phẩm thực tế có giống hình trên web không?</h3>
      <p>
        Chúng tôi cố gắng hiển thị hình ảnh chính xác nhất. Tuy nhiên, màu sắc có thể khác nhau đôi chút tùy thuộc vào cài đặt màn hình của quý khách. Để xem màu thực tế, quý khách có thể đến trực tiếp showroom tại <strong>10 Đồng Văn Cống, Bình Trưng Tây, Cát Lái, TP.HCM</strong>.
      </p>

      <h3>Giá trên website đã bao gồm VAT chưa?</h3>
      <p>Tất cả giá hiển thị trên website đã <strong>bao gồm VAT</strong> và phí lắp đặt cơ bản.</p>

      <h2>Về đặt hàng</h2>

      <h3>Tôi đặt hàng bằng cách nào?</h3>
      <p>
        Quý khách có thể đặt hàng qua website bằng cách thêm sản phẩm vào giỏ hàng, sau đó nhấn &quot;Liên Hệ Đặt Hàng&quot;. Ngoài ra, quý khách có thể gọi hotline <strong>{SITE_PHONE}</strong> hoặc nhắn tin qua Zalo/Facebook. Xem chi tiết tại trang <a href="/huong-dan-mua-hang" className="text-[#3e2723] underline">Hướng Dẫn Mua Hàng</a>.
      </p>

      <h3>Sau khi đặt hàng bao lâu thì được xác nhận?</h3>
      <p>
        Nhân viên sẽ liên hệ xác nhận đơn hàng trong vòng <strong>30 phút</strong> (trong giờ làm việc: Thứ 2 – Chủ Nhật, 8:00 – 18:00). Đơn đặt ngoài giờ sẽ được xử lý vào ngày làm việc tiếp theo.
      </p>

      <h3>Tôi có thể hủy đơn hàng không?</h3>
      <p>
        <strong>Trước khi giao hàng:</strong> Quý khách có thể hủy đơn và nhận hoàn tiền.<br />
        <strong>Sau khi đã giao hàng:</strong> Không thể hủy đơn, nhưng có thể áp dụng chính sách đổi trả nếu sản phẩm lỗi.
      </p>

      <h2>Về giao hàng</h2>

      <h3>Phí giao hàng là bao nhiêu?</h3>
      <p>
        <strong>Miễn phí</strong> giao hàng cho đơn hàng từ 5.000.000đ trở lên. Đơn hàng dưới 5.000.000đ có phí vận chuyển 250.000đ.
      </p>

      <h3>Thời gian giao hàng mất bao lâu?</h3>
      <ul>
        <li><strong>TP.HCM & Hà Nội:</strong> 3–5 ngày làm việc</li>
        <li><strong>Đà Nẵng & các thành phố lớn:</strong> 4–7 ngày làm việc</li>
        <li><strong>Các tỉnh thành khác:</strong> 5–10 ngày làm việc</li>
      </ul>

      <h3>Tôi có cần kiểm tra hàng khi nhận không?</h3>
      <p>
        <strong>Bắt buộc.</strong> Quý khách vui lòng kiểm tra kỹ sản phẩm trước khi ký nhận. Nếu phát hiện hư hỏng hoặc thiếu hàng, từ chối nhận và liên hệ hotline ngay. Chúng tôi khuyến khích quý khách <strong>quay video quá trình mở hộp</strong> để bảo vệ quyền lợi.
      </p>

      <h2>Về lắp đặt</h2>

      <h3>Có được lắp đặt miễn phí không?</h3>
      <p>
        <strong>Lắp đặt cơ bản miễn phí</strong> (cắm điện, khởi động). Chi phí phát sinh thêm (khoan, cắt, đục...) sẽ thỏa thuận trực tiếp với kỹ thuật viên. Tủ lạnh không cần lắp đặt, chỉ cần để yên 4 tiếng trước khi sử dụng.
      </p>

      <h3>Khi nào đội lắp đặt sẽ liên hệ?</h3>
      <p>Trong vòng <strong>24 giờ</strong> sau khi giao hàng (trừ thứ 7, Chủ Nhật, ngày lễ). Nếu không nhận được liên hệ, vui lòng gọi hotline <strong>{SITE_PHONE}</strong>.</p>

      <h2>Về bảo hành</h2>

      <h3>Thời hạn bảo hành sản phẩm V-ZUG là bao lâu?</h3>
      <ul>
        <li><strong>Thiết bị gia dụng lớn</strong> (tủ lạnh, lò nướng, bếp, máy hút mùi): <strong>36 tháng</strong></li>
        <li><strong>Thiết bị gia dụng nhỏ</strong> (ấm đun nước, máy pha cà phê, máy nướng bánh mì): <strong>24 tháng</strong></li>
      </ul>
      <p>Xem chi tiết tại trang <a href="/chinh-sach-bao-hanh" className="text-[#3e2723] underline">Chính Sách Bảo Hành</a>.</p>

      <h3>Làm sao để kích hoạt bảo hành?</h3>
      <p>
        Quý khách nên kích hoạt bảo hành <strong>trong vòng 7 ngày</strong> sau khi nhận hàng để được hưởng thời hạn bảo hành tối đa. Liên hệ hotline <strong>{SITE_PHONE}</strong> hoặc email <strong>{SITE_EMAIL}</strong> để kích hoạt.
      </p>

      <h2>Về đổi trả</h2>

      <h3>Tôi có thể đổi sản phẩm không?</h3>
      <p>
        Có, trong vòng <strong>15 ngày</strong> kể từ ngày nhận hàng nếu sản phẩm bị lỗi do nhà sản xuất, giao sai, hoặc hư hỏng trong vận chuyển. Sản phẩm phải còn đầy đủ bao bì và phụ kiện gốc. Xem chi tiết tại trang <a href="/chinh-sach-van-chuyen" className="text-[#3e2723] underline">Chính Sách Đổi Trả</a>.
      </p>

      <h2>Câu hỏi khác?</h2>
      <p>
        Nếu quý khách có bất kỳ câu hỏi nào khác, vui lòng liên hệ:<br />
        Hotline: <strong>{SITE_PHONE}</strong> (miễn phí)<br />
        Email: <strong>{SITE_EMAIL}</strong><br />
        Hoặc gửi tin nhắn qua trang <a href="/lien-he" className="text-[#3e2723] underline">Liên Hệ</a>.
      </p>
    </PolicyPage>
  );
}

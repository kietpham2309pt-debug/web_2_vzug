import { Metadata } from "next";
import PolicyPage from "@/components/ui/PolicyPage";
import { SITE_NAME, SITE_PHONE, SITE_EMAIL, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Vận Chuyển, Lắp Đặt & Đổi Trả | ${SITE_NAME}`,
  description: "Chính sách vận chuyển, lắp đặt và đổi trả sản phẩm V-ZUG tại Công ty TNHH K-Homès.",
  alternates: { canonical: canonicalUrl("/chinh-sach-van-chuyen") },
};

export default function ShippingPolicyPage() {
  return (
    <PolicyPage title="Vận Chuyển, Lắp Đặt & Đổi Trả">

      <h2>1. Chính sách vận chuyển</h2>
      <p>
        V-ZUG Công ty TNHH K-Homès cung cấp dịch vụ <strong>giao hàng miễn phí</strong> tận nhà cho tất cả đơn hàng từ 5.000.000đ trở lên. Đơn hàng dưới 5.000.000đ sẽ có phí vận chuyển 250.000đ.
      </p>
      <p>Khi đặt hàng, quý khách vui lòng ghi chú đặc điểm nơi nhận hàng (ví dụ: &quot;tầng 3 không có thang máy&quot;, &quot;chung cư&quot;) để hỗ trợ vận chuyển thuận lợi hơn.</p>

      <h3>Thời gian giao hàng</h3>
      <ul>
        <li><strong>TP. Hồ Chí Minh & Hà Nội:</strong> 3–5 ngày làm việc</li>
        <li><strong>Đà Nẵng & các thành phố lớn:</strong> 4–7 ngày làm việc</li>
        <li><strong>Các tỉnh thành khác:</strong> 5–10 ngày làm việc</li>
      </ul>
      <p>Nhân viên giao hàng sẽ liên hệ quý khách trước khi giao. Đơn vị vận chuyển chỉ thực hiện giao hàng, đội ngũ lắp đặt sẽ liên hệ riêng.</p>

      <h2>2. Kiểm tra hàng khi nhận</h2>
      <p>
        Quý khách <strong>vui lòng kiểm tra kỹ sản phẩm trước khi ký nhận</strong>. Nếu phát hiện hàng thiếu hoặc hư hỏng, vui lòng từ chối nhận hàng và liên hệ ngay hotline <strong>{SITE_PHONE}</strong>.
      </p>
      <p>
        <strong>Lưu ý quan trọng:</strong> Quý khách nên quay video quá trình mở hộp và lắp đặt để thuận tiện cho việc xử lý đổi trả nếu cần. Sau khi ký nhận, chúng tôi không chịu trách nhiệm với các hư hỏng bên ngoài.
      </p>

      <h2>3. Chính sách lắp đặt</h2>
      <p>
        <strong>Lắp đặt cơ bản miễn phí</strong> (cắm điện và khởi động). Các chi phí phát sinh thêm về vật tư, nhân công (khoan, cắt, đục bê tông...) sẽ được thỏa thuận trực tiếp giữa quý khách và kỹ thuật viên, thanh toán khi hoàn thành.
      </p>
      <ul>
        <li><strong>Tủ lạnh:</strong> Không cần lắp đặt — chỉ cần để yên 4 tiếng trước khi cắm điện sử dụng</li>
        <li><strong>Bếp từ, lò nướng, máy hút mùi:</strong> Cần lắp đặt bởi kỹ thuật viên</li>
        <li><strong>Thiết bị gia dụng nhỏ:</strong> Không cần lắp đặt, sử dụng trực tiếp</li>
      </ul>
      <p>Trong vòng <strong>24 giờ</strong> kể từ khi nhận hàng (trừ thứ 7, Chủ Nhật và ngày lễ), đội ngũ lắp đặt sẽ liên hệ quý khách. Nếu không nhận được liên hệ, vui lòng gọi hotline <strong>{SITE_PHONE}</strong>.</p>

      <h2>4. Chính sách đổi trả</h2>
      <p>V-ZUG Công ty TNHH K-Homès hỗ trợ đổi sản phẩm <strong>trong vòng 15 ngày</strong> kể từ ngày nhận hàng, áp dụng cho các trường hợp:</p>
      <ul>
        <li>Sản phẩm bị lỗi do nhà sản xuất</li>
        <li>Giao sai sản phẩm hoặc sai thông số</li>
        <li>Sản phẩm bị hư hỏng trong quá trình vận chuyển</li>
      </ul>

      <h3>Điều kiện đổi trả</h3>
      <ul>
        <li>Sản phẩm còn đầy đủ bao bì, phụ kiện, tài liệu đi kèm</li>
        <li>Có video quay quá trình mở hộp (đối với hàng chưa sử dụng)</li>
        <li>Đối với hàng đã sử dụng/lắp đặt có lỗi kỹ thuật: áp dụng theo chính sách bảo hành</li>
      </ul>
      <p><strong>Không áp dụng đổi trả</strong> trong các trường hợp: hư hỏng do người dùng, sử dụng sai hướng dẫn, hoặc không còn đầy đủ bao bì gốc.</p>

      <h2>5. Hủy đơn hàng</h2>
      <ul>
        <li><strong>Trước khi giao hàng:</strong> Quý khách có thể hủy đơn và nhận hoàn tiền. Có thể phát sinh phí xử lý thanh toán tùy phương thức</li>
        <li><strong>Sau khi đã giao hàng:</strong> Không thể hủy đơn</li>
      </ul>

      <h2>6. Liên hệ hỗ trợ</h2>
      <p>
        Mọi thắc mắc về vận chuyển, lắp đặt và đổi trả, vui lòng liên hệ:<br />
        Hotline: <strong>{SITE_PHONE}</strong><br />
        Email: <strong>{SITE_EMAIL}</strong>
      </p>
    </PolicyPage>
  );
}

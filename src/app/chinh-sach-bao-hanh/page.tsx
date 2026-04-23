import { Metadata } from "next";
import PolicyPage from "@/components/ui/PolicyPage";
import { SITE_NAME, SITE_PHONE, SITE_EMAIL, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Chính Sách Bảo Hành | ${SITE_NAME}`,
  description: "Chính sách và điều kiện bảo hành sản phẩm V-ZUG chính hãng tại Công ty TNHH WELLHOME (Việt Nam).",
  alternates: { canonical: canonicalUrl("/chinh-sach-bao-hanh") },
};

export default function WarrantyPolicyPage() {
  return (
    <PolicyPage title="Chính Sách & Điều Kiện Bảo Hành">
      <p>
        V-ZUG Công ty TNHH WELLHOME (Việt Nam) cam kết bảo hành chính hãng cho tất cả sản phẩm V-ZUG được phân phối qua hệ thống của chúng tôi. Khách hàng vui lòng kích hoạt bảo hành tại trang web hoặc liên hệ trung tâm dịch vụ.
      </p>

      <h2>1. Thời hạn bảo hành</h2>
      <h3>Trường hợp 1: Kích hoạt bảo hành trong vòng 7 ngày kể từ ngày nhận hàng</h3>
      <ul>
        <li><strong>Thiết bị gia dụng lớn</strong> (tủ lạnh, lò nướng, bếp, máy hút mùi): <strong>36 tháng</strong> kể từ ngày kích hoạt</li>
        <li><strong>Thiết bị gia dụng nhỏ</strong> (ấm đun nước, máy pha cà phê, máy nướng bánh mì, máy xay): <strong>24 tháng</strong> kể từ ngày kích hoạt</li>
      </ul>

      <h3>Trường hợp 2: Kích hoạt bảo hành sau 7 ngày kể từ ngày nhận hàng</h3>
      <ul>
        <li><strong>Thiết bị gia dụng lớn</strong>: <strong>36 tháng</strong> kể từ ngày mua hàng (theo hóa đơn)</li>
        <li><strong>Thiết bị gia dụng nhỏ</strong>: <strong>24 tháng</strong> kể từ ngày mua hàng (theo hóa đơn)</li>
      </ul>

      <h2>2. Điều kiện bảo hành</h2>
      <p>Sản phẩm được bảo hành miễn phí khi đáp ứng đầy đủ các điều kiện sau:</p>
      <ul>
        <li>Sản phẩm còn trong thời hạn bảo hành</li>
        <li>Tem bảo hành còn nguyên vẹn, không bị thay đổi</li>
        <li>Lỗi phát sinh do nhà sản xuất (lỗi vật liệu hoặc lỗi sản xuất)</li>
        <li>Sản phẩm được sử dụng đúng theo hướng dẫn của nhà sản xuất</li>
      </ul>
      <p>
        Các linh kiện bị lỗi sẽ được sửa chữa hoặc thay thế miễn phí. Khách hàng nên ghi lại quá trình mở hộp và sử dụng sản phẩm để bảo vệ quyền lợi.
      </p>

      <h2>3. Phạm vi ngoài bảo hành</h2>
      <p>Các trường hợp sau <strong>không được bảo hành</strong>:</p>
      <ul>
        <li>Sứt, móp, vỡ, biến dạng do lắp đặt không đúng cách hoặc không tuân thủ hướng dẫn sử dụng</li>
        <li>Hư hỏng do sửa chữa bởi bên không được ủy quyền</li>
        <li>Hư hỏng do nguồn điện không ổn định</li>
        <li>Hư hỏng do thiên tai, hỏa hoạn, lũ lụt</li>
        <li>Mất phụ kiện đi kèm</li>
        <li>Hư hỏng do côn trùng, động vật gây ra</li>
        <li>Tem bảo hành bị rách, sửa đổi hoặc không còn nguyên vẹn</li>
      </ul>

      <h2>4. Quy trình bảo hành</h2>
      <ol>
        <li>Liên hệ hotline <strong>{SITE_PHONE}</strong> hoặc email <strong>{SITE_EMAIL}</strong></li>
        <li>Cung cấp thông tin sản phẩm, mã đơn hàng và mô tả lỗi</li>
        <li>Nhân viên kỹ thuật sẽ đánh giá và hẹn lịch sửa chữa</li>
        <li>Sản phẩm được sửa chữa hoặc thay thế linh kiện miễn phí (nếu trong phạm vi bảo hành)</li>
      </ol>

      <h2>5. Lưu ý</h2>
      <ul>
        <li>Vui lòng giữ lại hóa đơn mua hàng trong suốt thời gian bảo hành</li>
        <li>Kích hoạt bảo hành sớm trong vòng 7 ngày sau khi nhận hàng để được hưởng thời hạn bảo hành tối đa</li>
        <li>Chính sách bảo hành có thể thay đổi tùy từng thời điểm. Phiên bản mới nhất luôn được cập nhật trên trang web</li>
      </ul>
    </PolicyPage>
  );
}

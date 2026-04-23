import { Metadata } from "next";
import PolicyPage from "@/components/ui/PolicyPage";
import { SITE_NAME, SITE_EMAIL, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Điều Khoản & Điều Kiện Sử Dụng | ${SITE_NAME}`,
  description: "Điều khoản và điều kiện sử dụng trang web Công ty TNHH WELLHOME (Việt Nam).",
  alternates: { canonical: canonicalUrl("/dieu-khoan") },
};

export default function TermsPage() {
  return (
    <PolicyPage title="Điều Khoản & Điều Kiện Sử Dụng">
      <p>
        Cảm ơn bạn đã ghé thăm trang web của Công ty TNHH WELLHOME (Việt Nam). Vui lòng đọc các điều khoản và điều kiện sử dụng trước khi truy cập và sử dụng bất kỳ phần nào của trang web. Bạn nên ngừng sử dụng trang web nếu không đồng ý với các điều khoản này.
      </p>

      <h2>1. Quyền sở hữu trí tuệ</h2>
      <p>
        Nội dung và tài liệu có trong trang web bao gồm nhưng không giới hạn: thông tin, văn bản, đồ họa, thiết kế, hình ảnh, nhãn hiệu, tên thương mại, biểu tượng, logo và phần mềm được bảo vệ bởi luật bản quyền và các quyền sở hữu trí tuệ khác.
      </p>
      <p>
        Bạn không được sao chép, phân phối, tải xuống, tái sản xuất, sửa đổi hoặc xử lý bất kỳ phần nào của nội dung trang web dưới bất kỳ hình thức nào mà không có sự đồng ý trước bằng văn bản của chúng tôi.
      </p>

      <h2>2. Giấy phép sử dụng trang web</h2>
      <p>Bạn có thể:</p>
      <ul>
        <li>Xem và truy cập các tài liệu trong trang web</li>
        <li>Sử dụng trang web theo đúng các quy định của điều khoản</li>
        <li>Tải xuống tài liệu cho mục đích xem cá nhân (không thương mại)</li>
      </ul>
      <p>Bạn không được thiết lập liên kết trên bất kỳ trang web nào khác đến trang web này mà không có sự đồng ý trước bằng văn bản.</p>

      <h2>3. Các hành động bị nghiêm cấm</h2>
      <p>Khi sử dụng trang web, bạn bị cấm:</p>
      <ul>
        <li>Gửi, đăng nội dung trái pháp luật, quấy rối, bôi nhọ, tục tĩu hoặc xúc phạm</li>
        <li>Tải lên tệp có chứa vi-rút hoặc các chương trình gây hại</li>
        <li>Vi phạm quyền sở hữu trí tuệ của bên thứ ba</li>
        <li>Tiến hành các hoạt động trái pháp luật</li>
      </ul>
      <p>Chúng tôi bảo lưu quyền xóa bất kỳ nội dung không phù hợp mà không cần thông báo trước.</p>

      <h2>4. Sản phẩm và dịch vụ</h2>
      <ul>
        <li>Mẫu, tính năng và thông số kỹ thuật sản phẩm có thể thay đổi bất cứ lúc nào mà không cần thông báo</li>
        <li>Kích thước và màu sắc hiển thị trên trang web chỉ là ước tính</li>
        <li>Đơn hàng chỉ có hiệu lực khi được chúng tôi xác nhận</li>
      </ul>

      <h2>5. Từ chối trách nhiệm</h2>
      <p>
        Trang web và nội dung được cung cấp trên cơ sở &quot;nguyên trạng&quot; và &quot;có sẵn&quot;. Chúng tôi không đảm bảo rằng trang web sẽ không bị gián đoạn hoặc không có lỗi. Trong phạm vi tối đa được pháp luật cho phép, chúng tôi sẽ không chịu trách nhiệm đối với bất kỳ thiệt hại nào phát sinh từ việc bạn sử dụng trang web.
      </p>

      <h2>6. Bồi thường</h2>
      <p>
        Bạn đồng ý bồi thường cho chúng tôi mọi hành động, khiếu nại, chi phí, trách nhiệm pháp lý, thiệt hại và tổn thất phát sinh từ việc bạn vi phạm các điều khoản này hoặc sử dụng trái phép trang web.
      </p>

      <h2>7. Liên kết ngoài</h2>
      <p>
        Trang web có thể chứa liên kết đến các trang web bên thứ ba. Chúng tôi không chịu trách nhiệm về nội dung hoặc chính sách quyền riêng tư của các trang web đó. Việc sử dụng trang web bên thứ ba hoàn toàn do bạn tự chịu rủi ro.
      </p>

      <h2>8. Trẻ vị thành niên</h2>
      <p>
        Nếu bạn dưới 18 tuổi, bạn cần có sự cho phép của cha mẹ hoặc người giám hộ hợp pháp để sử dụng trang web. Cha mẹ hoặc người giám hộ có trách nhiệm giám sát việc sử dụng trang web của trẻ.
      </p>

      <h2>9. Quyền thay đổi</h2>
      <p>
        Chúng tôi có quyền thay đổi các điều khoản, sửa đổi nội dung trang web và điều chỉnh giá cả bất kỳ lúc nào. Việc bạn tiếp tục sử dụng trang web sau khi thay đổi sẽ được coi là sự chấp nhận các điều khoản mới.
      </p>

      <h2>10. Luật điều chỉnh</h2>
      <p>
        Điều khoản sử dụng này được điều chỉnh bởi luật pháp nước Cộng hòa Xã hội Chủ nghĩa Việt Nam. Bạn đồng ý với quyền tài phán của tòa án Việt Nam đối với bất kỳ tranh chấp nào phát sinh liên quan đến trang web.
      </p>

      <p className="text-xs text-gray-400 mt-8">(Cập nhật tháng 4 năm 2026)</p>
    </PolicyPage>
  );
}

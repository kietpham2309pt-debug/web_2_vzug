import { Metadata } from "next";
import PolicyPage from "@/components/ui/PolicyPage";
import { SITE_NAME, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Chính Sách Cookie | ${SITE_NAME}`,
  description: "Chính sách Cookie — công nghệ trang web và sử dụng cookie tại Công ty TNHH K-Homès.",
  alternates: { canonical: canonicalUrl("/chinh-sach-cookie") },
};

export default function CookiePolicyPage() {
  return (
    <PolicyPage title="Chính Sách Cookie">
      <p>Chính sách Cookie — Công nghệ trang web và sử dụng cookie</p>

      <h2>1. Thu thập thông tin qua Cookie</h2>
      <p>
        Trang web của chúng tôi sử dụng một tính năng của trình duyệt được gọi là &quot;cookie&quot;. Khi bạn truy cập trang web, máy chủ web của chúng tôi sẽ tự động ghi lại các thông tin sau:
      </p>
      <ul>
        <li>Ngày, thời gian và thời lượng truy cập</li>
        <li>URL của trang web liên kết</li>
        <li>Tên nhà cung cấp dịch vụ internet của bạn</li>
        <li>Các trang web mà bạn truy cập và các tập tin được truy cập</li>
        <li>Loại và phiên bản trình duyệt, hệ điều hành</li>
        <li>Địa chỉ IP (ẩn danh)</li>
      </ul>

      <h2>2. Mục đích sử dụng</h2>
      <p>
        Thông tin này được thu thập thông qua cookie và các thành phần hoạt động mà Công ty TNHH K-Homès sử dụng để tối ưu hóa trải nghiệm người dùng trên trang web. Chúng tôi không cố gắng xác định danh tính của bạn bằng thông tin này.
      </p>

      <h2>3. Quản lý Cookie</h2>
      <p>
        Bạn có thể đặt lại trình duyệt để thông báo khi nhận được cookie hoặc từ chối chấp nhận cookie. Xin lưu ý rằng một số phần nhất định của trang web có thể không hoạt động bình thường nếu bạn từ chối cookie.
      </p>
      <p>
        Chúng tôi sử dụng cookie để cá nhân hóa nội dung gửi cho bạn và để làm cho hoạt động tiếp thị phù hợp hơn.
      </p>

      <h2>4. Cookie của bên thứ ba</h2>
      <p>
        Trang web cũng cho phép Facebook, Instagram, Zalo và Google sử dụng cookie của bên thứ ba để nhắm mục tiêu quảng cáo đến bạn khi bạn truy cập trang web và các nền tảng truyền thông xã hội khác.
      </p>
      <p>
        Để tìm hiểu thêm về cookie, bao gồm cách xem những cookie nào đã được đặt cũng như cách quản lý và xóa chúng, hãy truy cập <strong>www.allaboutcookies.org</strong>.
      </p>

      <h2>5. Phân tích trang web</h2>
      <p>
        Để thiết kế trang web phù hợp, chúng tôi có thể thu thập dữ liệu sử dụng liên quan đến việc bạn truy cập trang web bằng cookie phân tích và các công nghệ khác. Chúng tôi không kết hợp hồ sơ sử dụng với tên hoặc bất kỳ chi tiết nào có thể tiết lộ danh tính của bạn. Dữ liệu sử dụng sẽ bị xóa sau ba tháng kể từ ngày thu thập.
      </p>

      <h2>6. Liên kết ngoài</h2>
      <p>
        Trang web có thể bao gồm các liên kết đến các trang web khác không nằm trong Chính sách quyền riêng tư này và Công ty TNHH K-Homès không chịu trách nhiệm. Chúng tôi sẽ không chịu trách nhiệm cho bất kỳ lỗi nhập dữ liệu nào do đăng ký hoặc truyền thông tin cá nhân do bạn cung cấp.
      </p>
    </PolicyPage>
  );
}

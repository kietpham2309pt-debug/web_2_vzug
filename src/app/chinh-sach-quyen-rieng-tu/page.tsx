import { Metadata } from "next";
import PolicyPage from "@/components/ui/PolicyPage";
import { SITE_NAME, SITE_EMAIL, SITE_PHONE, SITE_ADDRESS, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Chính Sách Quyền Riêng Tư | ${SITE_NAME}`,
  description: "Chính sách quyền riêng tư — bảo vệ thông tin cá nhân tại Công ty TNHH K-Homès.",
  alternates: { canonical: canonicalUrl("/chinh-sach-quyen-rieng-tu") },
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage title="Chính Sách Quyền Riêng Tư">
      <h2>1. Giới thiệu</h2>
      <p>
        Bảo vệ thông tin cá nhân của bạn có vai trò quan trọng đối với chúng tôi. Chính sách Quyền riêng tư này phác thảo chính sách và trách nhiệm của Công ty TNHH K-Homès liên quan đến việc thu thập, sử dụng, xử lý và tiết lộ thông tin cá nhân của bạn.
      </p>

      <h2>2. Bảo vệ thông tin cá nhân</h2>
      <p>Chúng tôi cam kết bảo mật thông tin cá nhân của bạn và tuân thủ luật hiện hành về bảo vệ dữ liệu cá nhân.</p>

      <h2>3. Thông tin cá nhân là gì?</h2>
      <p>
        Thông tin cá nhân hoặc Dữ liệu cá nhân có nghĩa là bất kỳ thông tin nào liên quan trực tiếp hoặc gián tiếp đến một cá nhân, người được xác định hoặc có thể nhận dạng được.
      </p>

      <h2>4. Thông tin cá nhân chúng tôi thu thập</h2>
      <p>Chúng tôi có thể thu thập các loại thông tin sau:</p>
      <ul>
        <li>Tên, giới tính, ngày sinh, số nhận dạng</li>
        <li>Thông tin thanh toán và giao hàng</li>
        <li>Chi tiết sản phẩm và bảo hành</li>
        <li>Phản hồi khảo sát và đánh giá sản phẩm</li>
        <li>Hồ sơ liên lạc (email, số điện thoại, địa chỉ)</li>
        <li>Lịch sử mua hàng và tương tác trên trang web</li>
      </ul>

      <h2>5. Cách thức sử dụng thông tin cá nhân</h2>
      <p>Chúng tôi sử dụng dữ liệu để:</p>
      <ul>
        <li>Cung cấp dịch vụ và xử lý đơn hàng</li>
        <li>Xác minh danh tính và cập nhật hồ sơ khách hàng</li>
        <li>Phát triển sản phẩm và cải thiện dịch vụ khách hàng</li>
        <li>Gửi thông tin khuyến mãi (với sự đồng ý của bạn)</li>
        <li>Tuân thủ pháp luật</li>
      </ul>

      <h2>6. Tiết lộ thông tin cá nhân</h2>
      <p>
        Chúng tôi có thể chia sẻ thông tin với: công ty liên quan, nhà cung cấp dịch vụ bên thứ ba, và cơ quan tòa án khi được pháp luật yêu cầu. Chúng tôi đảm bảo bảo vệ dữ liệu khi chuyển giao.
      </p>

      <h2>7. Bảo mật dữ liệu</h2>
      <p>
        Chúng tôi thực hiện các biện pháp bảo mật để bảo vệ dữ liệu khỏi lạm dụng, mất mát, truy cập trái phép. Truyền thông qua internet không hoàn toàn an toàn, và chúng tôi khuyến cáo bạn bảo vệ mật khẩu cá nhân.
      </p>

      <h2>8. Tiếp thị trực tiếp và quyền từ chối</h2>
      <p>
        Chúng tôi có thể liên lạc về sản phẩm, dịch vụ và xúc tiến với sự đồng ý của bạn. Bạn có thể từ chối bất cứ lúc nào qua email <strong>{SITE_EMAIL}</strong>.
      </p>

      <h2>9. Quyền truy cập và chỉnh sửa dữ liệu</h2>
      <p>
        Bạn có quyền yêu cầu truy cập, chỉnh sửa, cập nhật hoặc xóa dữ liệu cá nhân của mình. Vui lòng liên hệ với chúng tôi để thực hiện các yêu cầu này.
      </p>

      <h2>10. Bảo vệ trẻ vị thành niên</h2>
      <p>Trẻ dưới 18 tuổi phải có sự đồng ý của cha mẹ hoặc người giám hộ khi cung cấp thông tin cá nhân.</p>

      <h2>11. Thay đổi chính sách</h2>
      <p>Công ty TNHH K-Homès bảo lưu quyền cập nhật chính sách này theo luật hiện hành. Mọi thay đổi sẽ được thông báo trên trang web.</p>

      <h2>12. Luật điều chỉnh</h2>
      <p>Chính sách này được điều chỉnh bởi luật pháp nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.</p>

      <h2>13. Liên hệ</h2>
      <p>
        Công ty TNHH K-Homès<br />
        Địa chỉ: {SITE_ADDRESS}<br />
        Điện thoại: {SITE_PHONE}<br />
        Email: {SITE_EMAIL}
      </p>
    </PolicyPage>
  );
}

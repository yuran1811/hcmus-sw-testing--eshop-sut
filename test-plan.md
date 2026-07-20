# Kế hoạch usability test U-06

## Thông tin chung

- Ngày: 2026-07-20
- Website: https://lumierecinema-testing-demo-ui.vercel.app/
- Flow: **U-06**
- FR: **FR-09, FR-10, FR-11, FR-12, FR-13, FR-35, FR-37**
- Timebox: 10 phút/persona
- Người thực hiện: 23127065 - Ngô Nguyễn Thế Khoa
- Cross-browser: BrowserStack Live — Chrome 150/Windows 11 và Edge 150/Windows 11

## Mục tiêu

Đánh giá liệu người dùng sau đăng nhập có thể tự tìm và hiểu vé cá nhân, lịch sử xem, wishlist, rating và Lunar Points hay không; đồng thời kiểm tra khả năng phục hồi khi dữ liệu rỗng, control bị khóa hoặc trạng thái hệ thống không nhất quán.

## Task scenario

> Bạn đã đăng nhập vào Lumiere Cinema và muốn kiểm tra lại hoạt động của tài khoản. Hãy tìm vé cá nhân, xem lịch sử các phim đã xem, kiểm tra danh sách phim yêu thích, rating một phim đã xem và cho biết số Lunar Points cùng hạng thành viên hiện tại của bạn.

Scenario chỉ nêu mục tiêu, không hướng dẫn từng click.

## Điều kiện

- Bắt đầu: trang chủ đã tải và tài khoản mẫu đã đăng nhập.
- Tài khoản: `cust1@cust.vn`, dùng mật khẩu mẫu trong `Usability_Testing_Requirement.md`.
- Thành công: tự tìm và hoàn thành đủ 5 khu vực: vé, lịch sử, wishlist, rating và Lunar Points.
- Thất bại: bỏ cuộc, hết timebox, bị kẹt không phục hồi hoặc thiếu chức năng/dữ liệu khiến một mục tiêu chính không thể hoàn thành.
- Deviation: dữ liệu mẫu có thể rỗng; phải ghi nhận trạng thái rỗng, không tự tạo vé hoặc lịch sử giả.

## Personas

| Mã  | Đặc điểm hành vi                                      | Thiết bị mô phỏng  | Kỳ vọng hành vi                                                                   |
| --- | ----------------------------------------------------- | ------------------ | --------------------------------------------------------------------------------- |
| P01 | Người dùng mới, thận trọng, đọc nhãn trước khi click  | Mobile 390 × 844   | Dễ do dự khi menu thiếu mục hoặc nội dung dài; thử control nhìn có vẻ khả dụng    |
| P02 | Người dùng quen ứng dụng đặt vé, thao tác nhanh       | Desktop 1200 × 900 | Dùng navbar/footer, nhận ra nhanh trạng thái không nhất quán, ít cần hỗ trợ       |
| P03 | Người dùng mobile có xu hướng kiểm chứng lại thao tác | Mobile 390 × 844   | Quay lại màn hình trước nếu thiếu feedback; nhạy với target bị che và empty state |

## Checklist trước phiên

- [x] Xác định đúng U-06 và các FR liên quan.
- [x] Task scenario không hướng dẫn từng click.
- [x] Kiểm tra website deploy và tài khoản mẫu.
- [x] Chạy BrowserStack Live trên Chrome và Edge.
- [x] Không tập trước flow cho người tham gia.

# Kế hoạch Usability Test — [Flow Name]

- Ngày: [YYYY-MM-DD]
- Website: [SUT URL — e.g. http://localhost:3000 hoặc deployed URL]
- Flow: [Mô tả ngắn luồng E2E đã chọn]
- FR / IA liên quan: [FR-xx, FR-yy, IA-01, IA-03, ...]
- Timebox: [e.g. 15 phút]
- Người điều phối (Moderator): [Họ tên sinh viên]
- Thiết bị/trình duyệt test chính: [e.g. Laptop Windows, Google Chrome]

## Mục tiêu

<!-- 2-4 mục tiêu đo lường được. Tránh viết chung chung như "xem UI có tốt không". -->

1. [e.g. Xác định điểm mà người dùng bị kẹt khi thêm sản phẩm vào giỏ hàng]
2. [e.g. Đánh giá khả năng tự phục hồi khi nhập mã giảm giá sai]
3. [e.g. Đo mức độ tự tin của người dùng rằng đơn hàng đã được đặt thành công]

## Task Scenario

<!-- Viết dạng mục tiêu (goal-only), KHÔNG hướng dẫn từng bước click.
     Bối cảnh thực tế thương mại điện tử Việt Nam. -->

> [e.g. Bạn muốn mua một sản phẩm có giá dưới 500.000đ trên EShop. Hãy tìm sản phẩm phù hợp, thêm vào giỏ hàng, và hoàn tất thanh toán sử dụng mã giảm giá SAVE10. Bạn hoàn thành khi thấy thông tin xác nhận đơn hàng.]

## Test Data

| Mục đích | Thông tin | Ghi chú |
| --- | --- | --- |
| [e.g. Tài khoản đăng nhập] | [email / password] | [Tài khoản test có sẵn] |
| [e.g. Mã giảm giá] | [SAVE10] | [Mã hợp lệ, giảm 10%] |
| [e.g. Sản phẩm mục tiêu] | [Tên hoặc category] | [Phải có giá < ngưỡng] |

## Điều kiện bắt đầu / thành công / thất bại

- **Bắt đầu (Start state):** [e.g. Trang chủ EShop đã tải xong, đã đăng nhập tài khoản test, giỏ hàng trống]
- **Thành công (Success):** [e.g. Hoàn thành tất cả sub-goals — (1) tìm được sản phẩm, (2) thêm vào giỏ, (3) áp mã giảm giá, (4) thấy xác nhận đơn hàng]
- **Thất bại (Fail):** [e.g. Bỏ cuộc, hết timebox, bị kẹt không phục hồi, hoặc không hoàn thành được ≥ 2 sub-goals]
- **Deviation:** [e.g. Nếu hệ thống bị lỗi server giữa chừng, moderator reload và ghi deviation. Thời gian bị lỗi không tính vào duration.]

## Checklist trước phiên

- [ ] Có đồng thuận tham gia (miệng hoặc văn bản) / ghi hình nếu áp dụng
- [ ] Dùng mã participant (P01-P07), không ghi dữ liệu cá nhân không cần thiết
- [ ] Kiểm tra website đã tải, tài khoản test hoạt động, dữ liệu sẵn sàng
- [ ] Chuẩn hóa start state theo điều kiện trên
- [ ] Không cho participant tập trước flow
- [ ] Đồng hồ bấm giờ / ghi hình sẵn sàng
- [ ] Nói rõ: "Mình đang test hệ thống, không test bạn. Bạn hãy vừa làm vừa nói ra suy nghĩ."

# Usability Tests — Tổng quan các luồng kiểm thử

> **Hệ thống**: EShop — Nền tảng thương mại điện tử demo
> **Phương pháp**: Moderated usability testing, think-aloud protocol
> **Thang đo**: SUS (System Usability Scale) + 4 câu hỏi mở
> **Số người tham gia**: 7 người / luồng

---

## Danh sách các luồng kiểm thử

| Mã    | Luồng kiểm thử                                                        | Số bước chính | Thời gian ước tính | Trạng thái |
| ----- | --------------------------------------------------------------------- | ------------- | ------------------ | ---------- |
| U-001 | Đăng ký → Đăng nhập → Xem sản phẩm → Thêm giỏ hàng → Checkout       | 5             | 10–20 phút         | 📋 Planned |

---

## Chi tiết từng luồng

### [U-001](./U-001/) — Luồng mua hàng cơ bản (không coupon)

**Mô tả**: Đánh giá trải nghiệm người dùng lần đầu khi thực hiện toàn bộ luồng mua hàng trên EShop — từ tạo tài khoản mới đến hoàn tất thanh toán.

**Các bước trong luồng**:
1. **Đăng ký** tài khoản mới (FR-01)
2. **Đăng nhập** vào hệ thống (FR-02)
3. **Xem / tìm kiếm sản phẩm** trên trang chủ (FR-05, FR-06)
4. **Thêm sản phẩm** vào giỏ hàng (FR-07)
5. **Thanh toán** đơn hàng (FR-08)

**Mục tiêu đánh giá chính**:
- Người dùng lần đầu có hoàn thành được toàn bộ luồng không cần trợ giúp?
- Ở bước nào trong luồng người dùng gặp khó khăn/do dự nhiều nhất?
- Điểm SUS trung bình có đạt ngưỡng chấp nhận được (≥ 68)?

**Tài liệu trong thư mục**:

| File                   | Nội dung                                                                     |
| ---------------------- | ---------------------------------------------------------------------------- |
| `evaluation_goals.md`  | 3 mục tiêu đánh giá cụ thể với chỉ số đo rõ ràng                            |
| `task_scenario.md`     | Kịch bản nhiệm vụ goal-oriented (mua quà sinh nhật) + hướng dẫn facilitator |
| `instrument.md`        | Thang đo SUS (10 câu tiếng Việt) + 4 câu hỏi mở + bảng ghi điểm            |
| `recruiting_screen.md` | Tin nhắn tuyển người + checklist sàng lọc + bảng danh sách 7 người           |
| `pilot_runsheet.md`    | Runsheet phiên pilot: chuẩn bị → giới thiệu → quan sát → kết thúc → rà soát |

---

## Hướng dẫn sử dụng

1. **Đọc file này trước** để có góc nhìn tổng quan về tất cả các luồng đang/đã test.
2. **Vào từng thư mục `U-xxx`** để xem chi tiết kế hoạch, kịch bản, và kết quả kiểm thử.
3. Khi thêm luồng mới, tạo thư mục `U-002`, `U-003`... và cập nhật bảng danh sách ở trên.
4. Sau khi chạy 7 phiên thật, bổ sung kết quả SUS và synthesis vào thư mục tương ứng.

---

## Ký hiệu trạng thái

| Ký hiệu       | Ý nghĩa                                    |
| -------------- | ------------------------------------------- |
| 📋 Planned     | Đã thiết kế kế hoạch, chưa chạy pilot       |
| 🧪 Pilot Done  | Đã chạy pilot, đang tinh chỉnh             |
| 🔄 In Progress | Đang chạy 7 phiên thật                      |
| ✅ Completed   | Đã chạy xong + phân tích + báo cáo          |

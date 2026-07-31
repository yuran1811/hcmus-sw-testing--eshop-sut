# Kịch bản nhiệm vụ (Task Scenario) — Luồng mua hàng EShop

> **Lưu ý quan trọng**: Kịch bản này viết theo hướng **goal-oriented** — chỉ mô tả tình huống và mục tiêu cuối cùng, KHÔNG hướng dẫn người dùng bấm nút nào hay điền trường nào. Nếu bạn thấy bất kỳ câu nào dạng "click vào...", "nhập vào ô...", "bấm nút..." → phải xóa ngay.

---

## Kịch bản (đọc cho người tham gia)

> **Bối cảnh**: Bạn bè giới thiệu cho bạn một trang mua sắm trực tuyến tên là **EShop**. Sinh nhật một người bạn thân sắp đến, và bạn muốn mua một món quà phù hợp.
>
> **Nhiệm vụ của bạn**: Hãy tạo tài khoản mới trên EShop, sau đó tìm và chọn một sản phẩm mà bạn muốn tặng. Thêm sản phẩm đó vào giỏ hàng, rồi tiến hành thanh toán.
>
> Hãy làm mọi thứ như cách bạn sẽ làm bình thường khi mua hàng online. Nói to suy nghĩ của bạn trong suốt quá trình.

---

## Thông tin hỗ trợ cho facilitator (KHÔNG đọc cho người tham gia)

| Mục                   | Chi tiết                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| URL bắt đầu           | `http://localhost:5173`                                                                                                        |
| Tài khoản test có sẵn | Không — người dùng phải tự đăng ký tài khoản mới                                                           |
| Luồng kỳ vọng         | Đăng ký → Đăng nhập → Xem/tìm sản phẩm → Xem chi tiết → Thêm vào giỏ → Vào giỏ hàng → Checkout → Thanh toán |
| Thời gian ước tính    | 10–20 phút                                                                                                                     |
| Điều kiện hoàn thành  | Đơn hàng được đặt thành công (hiển thị trang xác nhận đơn hàng hoặc chuyển về trang chủ với giỏ hàng trống)                    |

### Khi nào can thiệp

- **Không can thiệp** nếu người dùng chỉ do dự hoặc thử sai — quan sát và ghi chú.
- **Can thiệp nhẹ** (hỏi "Bạn đang nghĩ gì?") nếu người dùng im lặng quá 30 giây.
- **Can thiệp** chỉ khi người dùng bị kẹt hoàn toàn (> 2 phút không tiến triển) hoặc yêu cầu giúp đỡ trực tiếp. Ghi lại chính xác thời điểm và lý do can thiệp.

---

## Review checklist (dành cho sinh viên)

- [ ] Kịch bản chỉ mô tả mục tiêu và tình huống, KHÔNG có hướng dẫn click-by-click
- [ ] Kịch bản có bối cảnh thực tế (mua quà sinh nhật), tạo động lực cho người tham gia
- [ ] Kịch bản dưới 80 từ (phần đọc cho người tham gia)
- [ ] Không có từ ngữ kỹ thuật gây khó hiểu cho người không chuyên IT
- [ ] Kịch bản không đề cập chi tiết kỹ thuật không liên quan đến mục tiêu test
- [ ] Tôi đã đọc lại và loại bỏ mọi hướng dẫn từng bước nếu có (lỗi AI hay mắc)

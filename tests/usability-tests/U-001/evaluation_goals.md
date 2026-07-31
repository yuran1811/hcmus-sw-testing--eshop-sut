# Mục tiêu đánh giá Usability — Luồng Đăng ký → Đăng nhập → Xem sản phẩm → Thêm giỏ hàng → Checkout

> **Luồng kiểm thử**: Đăng ký tài khoản mới → Đăng nhập → Duyệt/tìm kiếm sản phẩm → Thêm sản phẩm vào giỏ hàng → Thanh toán
>
> **Hệ thống**: EShop — Nền tảng thương mại điện tử demo (Frontend Web: `http://localhost:5173`)
>
> **Phương pháp**: Moderated usability testing, think-aloud protocol, 7 phiên / 7 người tham gia

---

## Mục tiêu đánh giá

### EG-01: Khả năng hoàn thành luồng mua hàng end-to-end của người dùng lần đầu

Đánh giá liệu một người dùng **chưa từng sử dụng EShop** có thể tự mình hoàn thành toàn bộ luồng — từ đăng ký tài khoản đến thanh toán thành công — **mà không cần sự trợ giúp từ bên ngoài** (hỏi người khác, tìm hướng dẫn, hoặc facilitator phải can thiệp).

**Chỉ số đo**:

- Task completion rate (% người hoàn thành toàn bộ luồng không cần can thiệp)
- Số lần facilitator phải can thiệp (intervention count)

---

### EG-02: Xác định các điểm gây do dự, nhầm lẫn, hoặc lỗi nghiêm trọng nhất trong luồng

Xác định chính xác **ở bước nào** trong luồng (đăng ký, đăng nhập, tìm sản phẩm, thêm giỏ hàng, checkout) người dùng gặp khó khăn nhiều nhất — thể hiện qua:

- Thời gian dừng lại / do dự (hesitation > 5 giây)
- Hành động sai (misclick, nhập sai trường, quay lại trang trước)
- Phát biểu bối rối hoặc bực bội trong think-aloud
- Lỗi hệ thống mà người dùng không hiểu cách khắc phục

**Chỉ số đo**:

- Bản đồ các điểm khó khăn (pain point map) theo từng bước trong luồng
- Tần suất xuất hiện của từng loại vấn đề (bao nhiêu trên 7 người gặp cùng vấn đề)

---

### EG-03: Mức độ hài lòng tổng thể đạt ngưỡng chấp nhận được

Xác nhận điểm usability tổng thể (đo bằng thang SUS) đạt **ngưỡng trung bình chấp nhận được (SUS ≥ 68)** — tương đương mức "above average" theo chuẩn Bangor et al. (2009). Nếu điểm SUS dưới 68, các câu hỏi mở sẽ giúp xác định nguyên nhân cụ thể cần cải thiện.

**Chỉ số đo**:

- Điểm SUS trung bình của 7 người tham gia
- Phân bố điểm SUS cá nhân (min, max, median)
- Kết quả các câu hỏi mở bổ sung (clarity, error recovery, speed, trust)

---

## Ghi chú cho sinh viên (review checklist)

- [ ] Tôi đã đọc lại 3 mục tiêu ở trên và xác nhận chúng **cụ thể hơn** "tìm lỗi usability chung chung"
- [ ] Mỗi mục tiêu có chỉ số đo rõ ràng, có thể thu thập được trong phiên test
- [ ] Các mục tiêu bao phủ cả 3 chiều: hiệu quả (EG-01), hiệu suất/trải nghiệm (EG-02), và sự hài lòng (EG-03)
- [ ] Tôi đã chỉnh sửa / bổ sung theo ngữ cảnh thực tế của luồng mình chọn (không copy nguyên bản AI)

# Kế hoạch Đánh giá Usability (Usability Evaluation Plan — Phase 1)
## Luồng: Tìm sản phẩm → Thêm vào giỏ (FR-07) → Thanh toán áp dụng Mã giảm giá (FR-08, FR-09)

---

## 1. Thông tin chung & Mục tiêu

- **Hệ thống kiểm thử (SUT):** EShop Web (`http://localhost:5173`)
- **Phạm vi luồng:** End-to-End Shopping & Checkout Flow
- **Mã FR liên quan:** `FR-05`, `FR-06`, `FR-07`, `FR-08`, `FR-09`, `FR-17`
- **Phương pháp:** Moderated, small-sample usability testing với 7 người tham gia thực tế (7 sessions, 1 người/session).

### Mục tiêu kiểm thử (Objectives)
1. **Xác định điểm nghẽn điều hướng (Navigation Bottlenecks):** Đánh giá mức độ dễ dàng của người dùng khi di chuyển từ trang Chi tiết sản phẩm → Giỏ hàng (`/cart`) → Thanh toán (`/checkout`).
2. **Đánh giá sự tự tin & minh bạch về tiền tệ:** Đánh giá xem người dùng có hiểu rõ cách tính **Tổng cộng**, thành tiền từng dòng và số tiền được giảm khi áp dụng coupon hay không.
3. **Kiểm tra khả năng phục hồi lỗi khi nhập coupon:** Quan sát phản ứng và hành vi của người dùng khi nhập sai mã giảm giá, mã hết hạn hoặc không đủ điều kiện đơn hàng tối thiểu.

---

## 2. Task Scenario chi tiết từng bước (Step-by-Step Real Application Flow)

> **Hướng dẫn cho Người điều phối (Moderator):**
> Đưa kịch bản mục tiêu cho người tham gia. Không chỉ tay, không hướng dẫn click từng nút. Đọc câu phát động: *"Bạn hãy đóng vai một khách hàng mua sắm trực tuyến trên EShop. Mục tiêu của bạn là tìm chọn 1 sản phẩm yêu thích, kiểm tra giỏ hàng, và tiến hành đặt hàng trực tiếp bằng mã giảm giá tiết kiệm nhất hiện có."*

### Chi tiết các bước thực tế của luồng ứng dụng (Real App Flow Steps)

```
 [Trang chủ] ────► [Chi tiết sản phẩm] ────► [Giỏ hàng /cart] ────► [Thanh toán /checkout] ────► [Hoàn tất Đơn hàng]
  Tìm sản phẩm       Xem giá & số lượng       Kiểm tra tổng tiền      Nhập địa chỉ & Coupon     Xác nhận & xem lịch sử
```

1. **Bước 1 — Truy cập & Đăng nhập:**
   - Người dùng mở ứng dụng tại `http://localhost:5173`.
   - Đăng nhập tài khoản test: `test@eshop.com` / `Test1234!`.
2. **Bước 2 — Tìm kiếm & Xem chi tiết sản phẩm:**
   - Tại trang chủ (`/`), tìm kiếm hoặc chọn 1 sản phẩm mong muốn.
   - Click vào thẻ sản phẩm để mở trang Chi tiết sản phẩm (`/products/:id`).
3. **Bước 3 — Chọn số lượng & Thêm vào giỏ:**
   - Nhập số lượng sản phẩm (ví dụ: `2`).
   - Bấm nút **Thêm vào giỏ hàng** và quan sát phản hồi trực quan (toast notification / badge cập nhật trên navbar).
4. **Bước 4 — Kiểm tra Giỏ hàng (`/cart`):**
   - Click biểu tượng/link **Giỏ hàng** trên Navbar để chuyển sang màn hình `/cart`.
   - Kiểm tra tên sản phẩm, đơn giá, số lượng, thành tiền dòng và nhãn **"Tổng cộng"**.
   - Thử nghiệm điều chỉnh số lượng (nút `+` / `−`) hoặc quan sát tổng tiền thay đổi.
5. **Bước 5 — Chuyển sang Thanh toán (`/checkout`):**
   - Bấm nút **Tiến hành thanh toán**.
   - Xác nhận hệ thống chuyển tới trang `/checkout` cùng với danh sách sản phẩm và tổng tiền dự kiến.
6. **Bước 6 — Nhập thông tin giao hàng & Áp dụng Mã giảm giá:**
   - Nhập Địa chỉ giao hàng (ví dụ: `123 Lê Lợi, Q1, TP.HCM`).
   - Tại ô nhập mã giảm giá, thử nghiệm nhập mã giảm giá mẫu (ví dụ: `SAVE10` hoặc `BIGBUY`).
   - Bấm nút **Áp dụng** mã giảm giá.
7. **Bước 7 — Kiểm tra kết quả giảm giá & Đặt hàng:**
   - Kiểm tra số tiền được giảm (`discount_amount`) và tổng tiền thanh toán cuối cùng (`final_amount`).
   - Bấm **Đặt hàng / Xác nhận thanh toán**.
   - Kiểm tra thông báo hoàn tất đơn hàng và thông tin trong Lịch sử đơn hàng.

---

## 3. Bộ công cụ & Thang đo (Instruments & Metrics)

### 3.1 Thang đo SUS (System Usability Scale — 10 câu hỏi chuẩn)
Sau mỗi phiên, người tham gia đánh giá 10 câu hỏi theo thang Likert 1–5:
*(1 = Hoàn toàn không đồng ý | 5 = Hoàn toàn đồng ý)*

1. Tôi nghĩ rằng mình sẽ muốn sử dụng hệ thống này thường xuyên.
2. Tôi thấy hệ thống này phức tạp một cách không cần thiết.
3. Tôi thấy hệ thống dễ sử dụng.
4. Tôi nghĩ rằng mình sẽ cần sự hỗ trợ của kỹ thuật viên để có thể sử dụng hệ thống.
5. Tôi thấy các chức năng trong hệ thống được tích hợp rất tốt.
6. Tôi nghĩ có quá nhiều sự bất nhất trong hệ thống này.
7. Tôi nghĩ rằng hầu hết mọi người sẽ học cách sử dụng hệ thống này rất nhanh.
8. Tôi thấy hệ thống rất cồng kềnh/rườm rà khi sử dụng.
9. Tôi cảm thấy rất tự tin khi sử dụng hệ thống.
10. Tôi cần phải học rất nhiều điều trước khi có thể sử dụng thành thạo hệ thống.

**Công thức tính điểm SUS:** `SUS Score = [Sum(Odd Qs - 1) + Sum(5 - Even Qs)] * 2.5` (Thang điểm 0–100).

### 3.2 Bộ 4 câu hỏi đào sâu (Probe Questions)

| Khía cạnh | Câu hỏi đào sâu |
| --- | --- |
| **Rõ ràng (Clarity)** | Bạn thấy các nút bấm, nhãn tổng tiền và ô nhập mã giảm giá có dễ nhận biết và rõ ràng không? |
| **Phục hồi lỗi (Error Recovery)** | Khi gặp lỗi (ví dụ nhập sai mã coupon hoặc giỏ hàng trống), thông báo của hệ thống có giúp bạn biết cần làm gì tiếp theo không? |
| **Tốc độ & Luồng (Speed & Flow)** | Bạn có gặp sự do dự hoặc nghẽn ở bước nào từ lúc thêm hàng đến khi thanh toán xong không? |
| **Mức độ tin tưởng (Trust)** | Bạn có tin tưởng số tiền giảm giá và tổng tiền thanh toán được tính toán chính xác trên màn hình không? |

---

## 4. Tiêu chí tuyển chọn người tham gia (7 Participants Matrix)

> **Quy định anti-cheat:** Tuyển 7 người tham gia thực tế ngoài lớp học HW03. Thông tin liên hệ (Zalo/SĐT/Email) phải được che 4 chữ số giữa để bảo mật.

| Mã ID | Họ và tên | Đối tượng | Thiết bị / Trình duyệt | Số điện thoại / Contact (Masked) | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| P01 | Nguyễn Văn A | Khách hàng cá nhân (Non-IT) | Chrome 150 / Windows 11 | 0903****12 | Chờ thực hiện |
| P02 | Trần Thị B | Nhân viên văn phòng | Safari / macOS Sonoma | 0912****56 | Chờ thực hiện |
| P03 | Lê Hoàng C | Sinh viên ngành khác | Edge 150 / Windows 11 | 0988****89 | Chờ thực hiện |
| P04 | Phạm Minh D | Người mua sắm online thường xuyên | Chrome Mobile / Android | 0977****34 | Chờ thực hiện |
| P05 | Đỗ Quỳnh E | Người mới dùng E-commerce | Safari Mobile / iOS | 0933****78 | Chờ thực hiện |
| P06 | Vũ Quốc F | Kế toán viên | Firefox / Windows 11 | 0944****90 | Chờ thực hiện |
| P07 | Hoàng Anh G | Thiết kế tự do | Chrome 150 / macOS | 0966****23 | Chờ thực hiện |

---

## 5. Danh mục kiểm tra phiên chạy thử (Pilot Session Checklist)

Trước khi tiến hành với 7 người tham gia chính thức, thực hiện 1 phiên Pilot thử nghiệm:
- [ ] Kiểm tra môi trường SUT: Backend Node.js (`:3000`), Web (`:5173`), Admin (`:5174`) chạy ổn định.
- [ ] Kiểm tra tài khoản test `test@eshop.com` và mã giảm giá mẫu (`SAVE10`, `BIGBUY`) hoạt động.
- [ ] Kiểm tra thiết bị quay màn hình & ghi âm (OBS / QuickTime / Loom).
- [ ] Đo thời gian hoàn tất trung bình của kịch bản (kỳ vọng 3–5 phút).
- [ ] Tinh chỉnh từ ngữ trong task scenario nếu người chạy pilot bị do dự do câu từ chưa rõ.

---

## 6. Mẫu Ghi chép Quan sát (Observer Script & Observation Template)

### Kịch bản lời thoại Người điều phối (Moderator Script)
> *"Chào bạn, cảm ơn bạn đã tham gia phiên kiểm thử hôm nay. Chúng tôi đang kiểm thử giao diện và trải nghiệm của ứng dụng EShop, KHÔNG kiểm thử năng lực của bạn. Trong quá trình thao tác, xin bạn hãy **nói ra suy nghĩ của mình (Think-Aloud)** — ví dụ: bạn đang tìm cái gì, mong đợi điều gì xảy ra khi bấm nút, hoặc điều gì làm bạn bối rối. Nếu bạn gặp khó khăn, hãy cứ tự nhiên thể hiện vì đó chính là thông tin quý giá giúp chúng tôi cải thiện sản phẩm."*

### Bảng ghi chép quan sát phiên (Session Observation Log Template)

| Mốc thời gian | Bước trong luồng | Thao tác người dùng | Phát ngôn (Think-Aloud Quote) | Điểm vướng (Friction Point) | Severity (S1–S4) |
| --- | --- | --- | --- | --- | --- |
| 00:30 | Bước 2: Xem sản phẩm | Click vào ảnh sản phẩm | "Tôi tìm nút xem chi tiết..." | Nút xem chi tiết khó nhận biết | S3 |
| 01:15 | Bước 4: Kiểm tra giỏ | Quan sát tổng tiền | "Ủa nhãn ghi là Tổng tạm tính hả?" | Nhãn sai FR-07 quy định | S2 |
| 02:20 | Bước 6: Nhập coupon | Nhập mã `SAVE10` | "Nhập xong bấm nút nào để áp dụng?" | Vị trí nút áp dụng chưa nổi bật | S3 |

---

## 7. Quy trình Phân tích & Báo cáo kết quả (Phase 3 Framework)

1. **Tổng hợp điểm SUS:** Tính điểm SUS trung bình của 7 phiên, xếp hạng theo thang Chuẩn Quốc tế (Grade A > 80.3, B > 68, C > 51).
2. **Phân loại vấn đề Usability:**
   - **S1 (Blocker):** Lỗi khiến người dùng không thể hoàn thành đơn hàng hoặc không áp dụng được mã giảm giá.
   - **S2 (Major):** Lỗi gây nhầm lẫn nghiêm trọng (ví dụ: sai nhãn tổng tiền, giỏ hàng không cập nhật badge).
   - **S3 (Minor):** Người dùng bị do dự, do dự > 10 giây hoặc cần thử lại.
   - **S4 (Cosmetic):** Vướng mắc nhỏ về thẩm mỹ/khoảng cách chữ.
3. **Log GitHub Issues:** Đăng toàn bộ bug tìm được lên GitHub Issues page kèm screenshot minh chứng.

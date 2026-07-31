# Kế hoạch Kiểm thử Usability — Luồng Đăng nhập & Quên Mật Khẩu

## Metadata

| Trường | Giá trị |
| --- | --- |
| **Flow** | Đăng nhập → Quên Mật Khẩu → Đặt lại Mật Khẩu (2 bước) → Đăng nhập lại |
| **FR / IA** | FR-02 (Đăng nhập), FR-03 (Quên mật khẩu / Đặt lại mật khẩu) / IA-01, IA-02, IA-03, IA-04 |
| **Timebox** | 15 phút |
| **Scale** | SUS (System Usability Scale) |
| **Moderator** | [Sinh viên điền tên] |
| **Thiết bị** | Laptop (Windows / macOS), trình duyệt Google Chrome |
| **SUT URL** | http://localhost:5173 |
| **Ngày dự kiến** | [YYYY-MM-DD] |

## Mục tiêu (2–4 mục tiêu đo lường được)

1. **Xác định tỷ lệ hoàn thành** luồng đăng nhập → quên mật khẩu → đặt lại mật khẩu → đăng nhập lại **mà không cần trợ giúp** (target: ≥ 5/7 unassisted).
2. **Phát hiện điểm nghẽn** trong quy trình 2 bước quên mật khẩu (nhập email → nhận OTP → nhập mật khẩu mới) — nơi người dùng bị kẹt, ngập ngừng ≥ 5 giây, hoặc hiểu sai thông báo lỗi.
3. **Đánh giá mức độ tin tưởng** rằng mật khẩu đã được đổi thành công và đăng nhập lại bằng mật khẩu mới hoạt động đúng (IA-04).
4. **Đo lường SUS trung bình** của luồng này trên 7 participant (benchmark: ≥ 68 = Good).

## Task Scenario (goal-only)

> Bạn đã có tài khoản trên EShop nhưng quên mật khẩu. Hãy thử đăng nhập, sau đó tìm cách lấy lại mật khẩu qua email đã đăng ký. Khi đã đặt lại mật khẩu mới thành công, hãy đăng nhập lại bằng mật khẩu mới đó. Bạn hoàn thành khi đã vào được trang chủ EShop bằng mật khẩu mới.

**Lưu ý cho moderator:** KHÔNG hướng dẫn bước cụ thể. Chỉ đưa scenario trên và để participant tự tìm cách.

## Test Data

| Dữ liệu | Giá trị | Ghi chú |
| --- | --- | --- |
| Tài khoản test (email) | `testuser@eshop.com` | Tạo sẵn trên hệ thống trước buổi test |
| Mật khẩu hiện tại | `OldPass123!` | Participant sẽ cố đăng nhập bằng mật khẩu này trước (thành công), sau đó đăng xuất và giả vờ quên |
| Mật khẩu mới (do participant tự chọn) | Do participant tự đặt | Phải đáp ứng yêu cầu: ≥ 8 ký tự, chữ hoa, chữ thường, số, ký tự đặc biệt |
| OTP | Hệ thống tự sinh | Moderator hỗ trợ đọc OTP từ console/email nếu hệ thống gửi qua kênh khác |

**Lưu ý:** Nếu SUT không gửi email thật, moderator cần chuẩn bị cách cung cấp OTP cho participant (đọc từ backend console). Ghi rõ intervention này trong session notes.

## Sub-goals

| # | Sub-goal | FR | Thành công = ? |
|---|---|---|---|
| 1 | Truy cập trang đăng nhập và thử đăng nhập (thành công hoặc nhận lỗi) | FR-02 | Participant tìm được form đăng nhập và nhập thông tin |
| 2 | Tìm và truy cập chức năng "Quên mật khẩu" | FR-03 | Participant nhấn link "Quên mật khẩu" và đến được trang tương ứng |
| 3 | Nhập email và yêu cầu mã OTP (Bước 1) | FR-03 | Participant nhập đúng email test và nhấn gửi OTP |
| 4 | Nhập OTP và mật khẩu mới (Bước 2) | FR-03 | Participant nhập OTP đúng + mật khẩu mới hợp lệ và gửi |
| 5 | Đăng nhập lại bằng mật khẩu mới | FR-02 | Participant quay về trang đăng nhập và login thành công với mật khẩu mới |

## Điều kiện bắt đầu (Start State)

- SUT chạy ổn định tại `http://localhost:5173`
- Tài khoản test đã tạo sẵn và hoạt động
- Trình duyệt Chrome mở ở tab trống (không mở sẵn trang EShop)
- Participant chưa nhìn thấy giao diện EShop trước buổi test

## Điều kiện thành công (Success)

- Participant hoàn thành cả 5 sub-goals trong timebox 15 phút
- Đăng nhập thành công bằng mật khẩu mới và thấy trang chủ EShop

## Điều kiện thất bại (Fail)

- Participant không thể hoàn thành ≥ 1 sub-goal bất kỳ trong timebox
- Participant bỏ cuộc (ABANDONED)
- Moderator phải can thiệp hướng dẫn bước cụ thể để participant tiếp tục (ghi SUCCESS_ASSISTED)

## Deviation (Sai lệch cho phép)

- Nếu SUT không gửi email thật: moderator cung cấp OTP từ backend — đây là deviation kỹ thuật, ghi lại nhưng không coi là thất bại của participant
- Nếu participant gặp lỗi server (500, timeout): tạm dừng timer, khởi động lại SUT, tiếp tục

## Checklist trước phiên

- [ ] Đồng thuận tham gia (miệng hoặc văn bản)
- [ ] Giới thiệu think-aloud: "Mình đang test hệ thống, không phải test bạn. Hãy vừa làm vừa nói ra suy nghĩ của bạn."
- [ ] Tài khoản test đã tạo, SUT chạy ổn định
- [ ] Trình duyệt ở tab trống, không có lịch sử/cookie EShop
- [ ] Timer sẵn sàng (15 phút)
- [ ] Công cụ ghi chú/ghi hình sẵn sàng
- [ ] Form SUS đã in hoặc mở sẵn
- [ ] Probe questions đã chuẩn bị
- [ ] KHÔNG coaching, KHÔNG demo trước

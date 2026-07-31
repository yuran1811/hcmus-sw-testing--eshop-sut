# Design Notes — Task 2 Usability

## Flow đã chọn

- **Flow:** Đăng nhập → Quên Mật Khẩu → Đặt lại Mật Khẩu (2 bước: email+OTP → mật khẩu mới) → Đăng nhập lại
- **FR / IA liên quan:** FR-02 (Đăng nhập), FR-03 (Quên Mật Khẩu / Đặt lại Mật Khẩu) / IA-01 (General UI), IA-02 (Forms), IA-03 (Navigation), IA-04 (Feedback/State)
- **Lý do chọn flow này:** Luồng xác thực là luồng cốt lõi cho bất kỳ ứng dụng e-commerce nào. Quy trình 2 bước (email → OTP+mật khẩu mới) có nhiều điểm tiềm ẩn gây nhầm lẫn cho người dùng không quen IT. Đồng thời luồng này đã được kiểm thử GUI ở Task 1 (phát hiện 8 bugs trên trang Forgot Password) — test usability sẽ xác minh xem các lỗi đó thực sự ảnh hưởng đến người dùng thật như thế nào.

## Phân tách FR → Sub-goals

| Sub-goal | FR | Mô tả | Thành công = ? |
|---|---|---|---|
| 1 | FR-02 | Truy cập trang đăng nhập, thử đăng nhập | Tìm được form login, nhập thông tin |
| 2 | FR-03 | Tìm link "Quên mật khẩu" và truy cập | Nhấn link, đến trang Quên Mật Khẩu |
| 3 | FR-03 | Nhập email đăng ký, yêu cầu OTP (Bước 1) | Nhập email đúng, nhận phản hồi OTP đã gửi |
| 4 | FR-03 | Nhập OTP + mật khẩu mới (Bước 2) | Nhập OTP đúng, mật khẩu mới hợp lệ, gửi thành công |
| 5 | FR-02 | Đăng nhập lại bằng mật khẩu mới | Login thành công, thấy trang chủ EShop |

## Giả định (Assumptions)

1. Participant biết cách dùng trình duyệt web cơ bản (mở trang, nhập URL, click link)
2. SUT đang chạy ổn định tại URL test (`http://localhost:5173`)
3. Tài khoản test (`testuser@eshop.com`) đã tồn tại trên hệ thống
4. Nếu SUT không gửi email thật, moderator sẽ cung cấp OTP từ backend console — đây là deviation kỹ thuật có ghi nhận, không coi là thất bại của participant
5. Participant chưa từng sử dụng EShop trước phiên test

## Mối liên hệ Task 1 → Task 2

Task 1 GUI Checklist đã phát hiện 8 bugs trên trang Quên Mật Khẩu:
- `BUG-FORGOT-001`: Thiếu thẻ `<h1>` (Minor)
- `BUG-FORGOT-002`: Email dùng `type="text"` + thiếu dấu `*` (Minor)
- `BUG-FORGOT-003`: Thiếu "Xác nhận mật khẩu" + thiếu step indicator (Major)
- `BUG-FORGOT-004`: Nhãn OTP ghi "4 số" thay vì "6 số" (Minor)
- `BUG-FORGOT-005`: Regex mật khẩu bắt `\s` thay vì ký tự đặc biệt (Critical)
- `BUG-FORGOT-006`: Label thiếu `htmlFor` (Trivial)
- `BUG-FORGOT-007`: Lỗi dùng `window.alert()` thay vì inline message (Major)
- `BUG-FORGOT-008`: Không redirect về `/login` sau khi đổi mật khẩu (Major)

Test usability sẽ cho thấy bugs nào **thực sự gây khó khăn cho người dùng thật** (ví dụ: BUG-FORGOT-005 regex sai có thể khiến participant không thể hoàn thành sub-goal 4).

## AI vs Human Authorship

| Artifact | Tác giả chính | AI hỗ trợ gì | Human review |
|---|---|---|---|
| Task scenario | AI draft | Viết bản đầu goal-only | Student chỉnh bối cảnh, xác nhận test data |
| SUS instrument | Template chuẩn | Dịch sang Vietnamese | Student kiểm tra ngữ nghĩa |
| Probe questions | AI + Student | Gợi ý câu hỏi | Student thêm/bớt theo flow cụ thể |
| Session notes | Student | Cấu trúc template | N/A — nội dung từ quan sát thực |
| Findings | AI + Student | Nhóm lỗi, đề xuất severity | Student xác nhận severity, bổ sung evidence |

## Không được fabricate

- Danh sách participant (student tự tuyển)
- Quotes / hành vi quan sát (phải từ phiên test thật)
- Screen recordings (phải ghi thật nếu có)
- Điểm SUS (phải từ câu trả lời thật của participant)

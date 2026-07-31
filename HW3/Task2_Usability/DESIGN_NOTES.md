# Design Notes — Task 2 Usability

## Flow đã chọn

- **Flow:** Đăng nhập → Quên Mật Khẩu → Đặt lại Mật Khẩu (2 bước: email+OTP → mật khẩu mới) → Đăng nhập lại
- **FR / IA liên quan:** FR-02 (Đăng nhập), FR-03 (Quên Mật Khẩu / Đặt lại Mật Khẩu) / IA-01 (General UI), IA-02 (Forms), IA-03 (Navigation), IA-04 (Feedback/State)
- **Lý do chọn flow này:** Các thành viên trong nhóm chia luồng khác nhau để không trùng lặp. Luồng xác thực (đăng nhập + quên mật khẩu 2 bước) là luồng cốt lõi với nhiều bước tương tác form, phù hợp để kiểm thử usability.

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

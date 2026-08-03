# Pilot Session — Notes & Kết quả

## Vấn đề phát hiện
1. **Lỗi Regex Validation của Mật khẩu mới (Blocker)**: Hệ thống bắt buộc mật khẩu mới phải chứa ký tự khoảng trắng (`\s`) thay vì kiểm tra ký tự đặc biệt, khiến cho việc nhập mật khẩu bảo mật chuẩn (ví dụ: `Admin123!`) liên tục báo lỗi "Mật khẩu quá yếu". Điều này chặn đứng hoàn toàn tiến trình hoàn thành task của người dùng.
2. **OTP hiển thị trên UI (Security Issue)**: Mã OTP được hiển thị trực tiếp trên giao diện web sau khi gửi yêu cầu, thay vì gửi qua Email. Người dùng cảm thấy mơ hồ và mất lòng tin về tính bảo mật.

## Thay đổi đã áp dụng trước khi chạy chính thức
- Vì đây là các lỗi logic/giao diện nằm trong mã nguồn của hệ thống SUT (EShop) mà nhóm kiểm thử không được phép tự ý thay đổi (SUT phải được giữ nguyên bản để đánh giá khách quan), nhóm quyết định **không sửa đổi SUT**.
- Thay vào đó, nhóm điều chỉnh tài liệu quan sát và hướng dẫn cho điều phối viên để chú ý ghi nhận hành vi của 7 người dùng chính thức khi họ đối mặt với các lỗi này.
- Giữ nguyên kết quả phiên của P01 làm kết quả chính thức vì quy trình chạy hoàn toàn chuẩn chỉ.

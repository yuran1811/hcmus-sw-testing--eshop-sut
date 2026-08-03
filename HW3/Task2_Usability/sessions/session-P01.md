# Session P01

## Thông tin session
- Thời gian bắt đầu: 10:30
- Thời gian kết thúc: 11:00
- Thời lượng: 30 phút
- Link recording: https://drive.google.com/drive/folders/1TRHkThUuhScuz481w8w_TWmqbbdWIG3E?usp=sharing (Video: P05.mp4)

## Kết quả task
- Hoàn thành task? (Có/Không): Không
- Số lần cần trợ giúp: 0
- Thời gian hoàn thành task (phút): 30 (Thất bại sau 30 phút thử nghiệm)

## Ghi chú Think-aloud (friction points, lỗi, hesitation, câu nói đáng chú ý)
- Người dùng bắt đầu luồng Quên mật khẩu bằng cách nhập email của mình.
- Hệ thống gửi mã OTP bằng cách hiển thị trực tiếp trên giao diện (friction point: OTP không được gửi qua email mà hiển thị trực tiếp là một lỗ hổng bảo mật nghiêm trọng). Người dùng nhập OTP thành công nhanh chóng.
- Đến bước đặt lại mật khẩu mới, người dùng nhập các mật khẩu chuẩn bảo mật cao như `Admin123!`, `P@ssword12345` nhưng hệ thống liên tục báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT".
- Người dùng thử lại nhiều lần với nhiều định dạng mật khẩu khác nhau nhưng vẫn bị chặn, dẫn đến trạng thái cực kỳ bất lực và bỏ cuộc.
- Verbatim quote: *"Chỉ có bước tạo lại mật khẩu quá mù mờ. Hệ thống không nói mật khẩu thiếu điều kiện ở chỗ nào nên người dùng không biết đặt mật khẩu đúng."*

## Điểm SUS thô (10 câu)
| Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 |
|----|----|----|----|----|----|----|----|----|-----|
| 1 | 5 | 2 | 5 | 1 | 5 | 1 | 5 | 1 | 1 |

## Trả lời Probe Questions
**Clarity:** Chỉ có bước tạo lại mật khẩu quá mù mờ. Hệ thống không nói mật khẩu thiếu điều kiện ở chỗ nào nên người dùng không biết đặt mật khẩu đúng. Bước đăng nhập khá rõ ràng. Bước đặt lại mật khẩu quá mơ hồ.
**Error Recovery:** Hệ thống báo người dùng không tồn tại khi nhập sai email, nhập đúng email thì hiển thị mã OTP trực tiếp trên web. Khi báo mật khẩu yếu, người dùng không thể hiểu lỗi và không biết cách sửa.
**Speed:** Không nhanh và không cụ thể do tốn nhiều thời gian thử các mật khẩu khác nhau.
**Trust:** Không tin tưởng vì hệ thống luôn báo lỗi mật khẩu yếu dù đã nhập đúng tiêu chí cảnh báo.

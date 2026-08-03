# Session P01

## Thông tin session

- Thời gian bắt đầu: 10:30
- Thời gian kết thúc: 11:00
- Thời lượng: 30 phút (Thời lượng video: 1 phút 19 giây)
- Link recording: https://drive.google.com/drive/folders/1TRHkThUuhScuz481w8w_TWmqbbdWIG3E?usp=sharing (Video: P01.mp4)

## Kết quả task

- Hoàn thành task? (Có/Không): Không
- Số lần cần trợ giúp: 1
- Thời gian hoàn thành task (phút): 30 (Thất bại sau 30 phút thử nghiệm)

## Ghi chú Think-aloud (friction points, lỗi, hesitation, câu nói đáng chú ý)

- Người dùng bắt đầu luồng Quên mật khẩu bằng cách nhập email của mình.
- Hệ thống gửi mã OTP bằng cách hiển thị trực tiếp trên giao diện (friction point: OTP không được gửi qua email mà hiển thị trực tiếp là một lỗ hổng bảo mật nghiêm trọng). Người dùng nhập OTP thành công nhanh chóng.
- Đến bước đặt lại mật khẩu mới, người dùng nhập các mật khẩu chuẩn bảo mật cao như `Admin123!`, `P@ssword12345` nhưng hệ thống liên tục báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT".
- Người dùng thử lại nhiều lần với nhiều định dạng mật khẩu khác nhau nhưng vẫn bị chặn, dẫn đến trạng thái cực kỳ bất lực và bỏ cuộc.
- Verbatim quote: _"Chỉ có bước tạo lại mật khẩu quá mù mờ. Hệ thống không nói mật khẩu thiếu điều kiện ở chỗ nào nên người dùng không biết đặt mật khẩu đúng."_

## Điểm SUS thô (10 câu)

| Q1  | Q2  | Q3  | Q4  | Q5  | Q6  | Q7  | Q8  | Q9  | Q10 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1   | 5   | 2   | 5   | 1   | 5   | 1   | 5   | 1   | 1   |

## Trả lời Probe Questions

### Clarity (Sự rõ ràng)
- **Q1: Bạn có hiểu mình cần phải làm gì ở mỗi bước không? Bước nào rõ ràng/mù mờ nhất?**
  - Trả lời: Chỉ có bước tạo lại mật khẩu quá mù mờ. Hệ thống không nói mật khẩu thiếu điều kiện ở chỗ nào nên người dùng không biết đặt mật khẩu đúng
- **Q2: Bước nào rõ ràng nhất và bước nào mơ hồ/khó hiểu nhất với bạn?**
  - Trả lời: Bước đăng nhập khá rõ ràng. Bước đặt lại mật khẩu quá mơ hồ

### Error Recovery (Sửa lỗi)
- **Q3: Khi nhập sai (email, OTP, pass), hệ thống phản hồi ra sao?**
  - Trả lời: hệ thống báo người dùng ko tồn tại khi nhập sai email, nhập đúng email thì gửi luôn mã otp trên web
- **Q4: Bạn có hiểu rõ nội dung thông báo lỗi đó và biết cách sửa cho đúng không?**
  - Trả lời: Không hiểu

### Speed (Tốc độ)
- **Q5: Bạn có thấy quá trình đặt lại mật khẩu diễn ra nhanh không?**
  - Trả lời: Không nhanh và không cụ thể
- **Q6: Bước nào trong luồng này làm bạn tốn thời gian nhiều nhất?**
  - Trả lời: Bước đặt lại mật khẩu

### Trust (Độ tin cậy)
- **Q7: Đổi mật khẩu xong, bạn có tin rằng mật khẩu của mình đã thực sự được đổi thành công không?**
  - Trả lời: Không
- **Q8: Tại sao bạn lại tin tưởng hoặc nghi ngờ điều đó?**
  - Trả lời: Vì hệ thống luôn báo mật khẩu quá yếu

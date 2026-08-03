# Session P04

## Thông tin session
- Thời gian bắt đầu: 15:30
- Thời gian kết thúc: 15:52
- Thời lượng: 22 phút (Thời lượng video: 3 phút 20 giây)
- Link recording: https://drive.google.com/drive/folders/1TRHkThUuhScuz481w8w_TWmqbbdWIG3E?usp=sharing (Video: P04.mp4)

## Kết quả task
- Hoàn thành task? (Có/Không): Không
- Số lần cần trợ giúp: 1 (Liên hệ điều phối viên/kỹ thuật hỗ trợ khi bị kẹt ở bước nhập mật khẩu mới)
- Thời gian hoàn thành task (phút): 22 (Thất bại sau 22 phút thử nghiệm)

## Ghi chú Think-aloud (friction points, lỗi, hesitation, câu nói đáng chú ý)
- Người dùng nhận biết tốt các nhiệm vụ cần thực hiện nhờ chỉ dẫn giao diện.
- Đi nhanh qua bước email và nhập OTP.
- Bước nhập mật khẩu mới: người dùng nhập mật khẩu theo đúng yêu cầu nhưng liên tục bị hệ thống bác bỏ với thông báo mật khẩu quá yếu.
- Người dùng phân vân và hoang mang tột độ: *"sao nhập đúng rồi mà vẫn không được"*.
- Người dùng mất nhiều thời gian loay hoay thử đi thử lại các mật khẩu mạnh khác nhau và phải tìm sự trợ giúp từ bộ phận kỹ thuật/điều phối viên (moderator intervention). Tuy nhiên, vì đây là lỗi logic regex của hệ thống (bắt buộc khoảng trắng thay vì ký tự đặc biệt), moderator chỉ ghi nhận lỗi chứ không can thiệp thay đổi code SUT, dẫn đến kết quả phiên kiểm thử thất bại.

## Điểm SUS thô (10 câu)
| Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 |
|----|----|----|----|----|----|----|----|----|-----|
| 1 | 5 | 2 | 5 | 2 | 4 | 3 | 3 | 5 | 1 |

## Trả lời Probe Questions

### Clarity (Sự rõ ràng)
- **Q1: Bạn có hiểu mình cần phải làm gì ở mỗi bước không? Bước nào rõ ràng/mù mờ nhất?**
  - Trả lời: Tôi thấy minh biết cần làm gì nhờ các hiển thị trên website, bước nhập lại mật khẩu mới làm tôi thấy phân vân sao nhập đúng rồi mà vẫn không được
- **Q2: Bước nào rõ ràng nhất và bước nào mơ hồ/khó hiểu nhất với bạn?**
  - Trả lời: Bước nhập mật khẩu mới khiến tôi khó hiểu nhất

### Error Recovery (Sửa lỗi)
- **Q3: Khi nhập sai (email, OTP, pass), hệ thống phản hồi ra sao?**
  - Trả lời: Tôi quên luôn mật khẩu nên chưa có dịp để kiểm tra cái này
- **Q4: Bạn có hiểu rõ nội dung thông báo lỗi đó và biết cách sửa cho đúng không?**
  - Trả lời: Chưa có cơ hội được thấy

### Speed (Tốc độ)
- **Q5: Bạn có thấy quá trình đặt lại mật khẩu diễn ra nhanh không?**
  - Trả lời: Tôi thấy cũng nhanh mà bị vấn đề là không đặt lại mật khẩu mới được làm tôi mất thời gian tìm kĩ thuật hỗ trợ
- **Q6: Bước nào trong luồng này làm bạn tốn thời gian nhiều nhất?**
  - Trả lời: Bước nhập mất khẩu mới

### Trust (Độ tin cậy)
- **Q7: Đổi mật khẩu xong, bạn có tin rằng mật khẩu của mình đã thực sự được đổi thành công không?**
  - Trả lời: Tôi chưa thực hiện được việc đổi mật khẩu thành công
- **Q8: Tại sao bạn lại tin tưởng hoặc nghi ngờ điều đó?**
  - Trả lời: Tôi thấy tôi đổi mật khẩu không được do cứ báo lỗi mật khẩu yếu

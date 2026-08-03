# Session P04

## Thông tin session
- Thời gian bắt đầu: 15:30
- Thời gian kết thúc: 15:52
- Thời lượng: 22 phút
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
**Clarity:** Giao diện hiển thị rõ ràng giúp người dùng định hướng tốt. Tuy nhiên, bước nhập mật khẩu mới gây khó hiểu nhất do nhập đúng tiêu chuẩn rồi mà hệ thống vẫn báo lỗi.
**Error Recovery:** Do đi thẳng vào luồng chính xác, người dùng chưa có dịp kiểm tra các thông báo lỗi nhập sai OTP hay sai Email. Riêng lỗi mật khẩu yếu, người dùng thấy và không thể tự khắc phục.
**Speed:** Tốc độ ban đầu rất nhanh, nhưng bị tắc nghẽn hoàn toàn và mất nhiều thời gian nhất ở bước nhập mật khẩu mới, buộc phải gọi kỹ thuật hỗ trợ.
**Trust:** Chưa thực hiện đổi mật khẩu thành công do lỗi hệ thống luôn báo mật khẩu yếu, không tin cậy.

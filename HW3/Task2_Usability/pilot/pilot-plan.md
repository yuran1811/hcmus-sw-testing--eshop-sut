# Pilot Session — Plan

## Mục đích

Chạy thử scenario với 1 participant trước khi triển khai 7 session chính thức, nhằm phát hiện:

- Task scenario có gây hiểu nhầm không.
- Flow có bug/lỗi kỹ thuật chặn tiến trình không.
- Thời gian ước tính cho 1 session có hợp lý không (dự kiến 30 phút).

## Thời gian dự kiến

- Ngày thực hiện: 01/08/2026
- Thời lượng dự kiến: 30 phút

## Participant pilot

- P01 (Nguyễn Thiên Phúc) - Được chọn làm đối tượng chạy pilot. Do phát hiện lỗi nghiêm trọng chặn tiến trình nhưng không thể sửa mã nguồn SUT, kết quả phiên này vẫn được giữ lại làm dữ liệu chính thức cho P01 để phân tích trải nghiệm.

## Checklist quan sát khi chạy pilot

- [x] Scenario có rõ nghĩa, không cần giải thích thêm không? (Đạt)
- [x] Participant có tự tìm ra chức năng "Quên mật khẩu" không? (Đạt, dễ tìm thấy ở trang Đăng nhập)
- [x] Có bug kỹ thuật nào chặn hoàn thành task không (OTP không gửi, link reset lỗi...)? (Có - Lỗi Regex mật khẩu bắt buộc khoảng trắng chặn đứng bước thiết lập mật khẩu mới)
- [x] Probe questions có dễ hiểu, participant trả lời được không? (Đạt, phản hồi tốt)
- [x] Thời lượng thực tế so với dự kiến chênh lệch bao nhiêu? (Đạt, dao động khoảng 30 phút)

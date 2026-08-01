# Mục tiêu đánh giá Usability — U-001

> **Luồng kiểm thử**: Đăng ký → Đăng nhập → Xem sản phẩm → Thêm giỏ hàng → Checkout
>
> **Bản test**: `https://23127115-testing-hw3.vercel.app/`
>
> **Phương pháp**: moderated think-aloud, 1 pilot riêng + 7 phiên thật

## Mục tiêu

### EG-01

Đo xem người dùng lần đầu có thể hoàn thành toàn bộ luồng mua hàng mà không cần trợ giúp đáng kể hay không.

Chỉ số:

- Tỷ lệ hoàn thành độc lập.
- Số lần phải dùng M2/recovery.
- Mốc làm việc: mong muốn ít nhất 6/7 phiên chính thức hoàn thành độc lập.

### EG-02

Xác định chặng nào gây do dự, nhầm lẫn hoặc lỗi nhiều nhất để biết vấn đề nằm ở đăng ký, đăng nhập, tìm sản phẩm, thêm giỏ hàng hay checkout.

Chỉ số:

- Số lần do dự trên 5 giây.
- Số lỗi thao tác hoặc quay lui.
- Thời gian theo chặng và tổng time-on-task.

### EG-03

Đo mức độ hài lòng tổng thể bằng SUS và kiểm tra xem trải nghiệm có đạt benchmark chấp nhận được hay không.

Chỉ số:

- SUS cá nhân, mean, median, min, max.
- 4 câu hỏi mở để làm rõ clarity, error recovery, speed, trust.

SUS 68 chỉ là benchmark mô tả, không phải phần trăm. Nếu hành vi và SUS lệch nhau, giữ cả hai và giải thích bằng dữ liệu định tính.

## Định nghĩa vận hành

| Khái niệm           | Cách ghi nhận                                                        |
| ------------------- | -------------------------------------------------------------------- |
| Completed           | Đạt confirmation mà không cần M2                                     |
| Completed with help | Đạt confirmation sau ít nhất một M2/recovery                         |
| Not completed       | Bỏ cuộc, hết timebox 15 phút hoặc checkout không thành công          |
| Hesitation          | Dừng rõ ràng từ 5 giây trở lên                                       |
| Recovery            | Hỗ trợ để tiếp tục phần sau, không xóa thất bại trước đó             |
| Time-on-task        | Từ thao tác đầu tiên đến confirmation/bỏ cuộc/timebox                |
| M0/M1/M2            | M0 nhắc think-aloud, M1 nhắc scenario trung lập, M2 chỉ dẫn/recovery |

## Scope và giới hạn

- In scope: đăng ký, đăng nhập, xem/chọn sản phẩm, thêm giỏ hàng, checkout.
- Out of scope: coupon, profile, order history, forgot password, admin.
- Participant được tự chọn sản phẩm và route tự nhiên.
- Mẫu nhỏ `n=7` không dùng để suy rộng thống kê.


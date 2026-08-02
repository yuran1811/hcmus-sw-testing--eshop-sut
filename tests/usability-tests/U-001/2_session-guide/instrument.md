# Công cụ đo usability — U-001

> **Luồng kiểm thử**: Đăng ký → Đăng nhập → Xem sản phẩm → Thêm giỏ hàng → Checkout
>
> **Thang đo định lượng**: SUS (System Usability Scale) — Brooke (1996)
>
> **Lý do chọn SUS**: 10 câu cố định, dễ triển khai với mẫu nhỏ, và có benchmark tham chiếu quốc tế.
>
> **Biểu mẫu khảo sát trực tuyến (Google Form)**: [Khảo sát Usability U-001](https://docs.google.com/forms/d/e/1FAIpQLSdt6lBw1MNP2KnIbLN36dPhVXyuGmH8aAE0sHla8HNIE6UUWA/viewform)

## SUS

Hướng dẫn cho participant: khoanh mức từ 1 đến 5 theo cảm nhận của bạn, không suy nghĩ quá lâu.

| #   | Phát biểu                                                                                 | 1   | 2   | 3   | 4   | 5   |
| --- | ----------------------------------------------------------------------------------------- | --- | --- | --- | --- | --- |
| 1   | Tôi nghĩ rằng tôi sẽ muốn sử dụng trang web này thường xuyên.                             | ○   | ○   | ○   | ○   | ○   |
| 2   | Tôi thấy trang web này phức tạp một cách không cần thiết.                                 | ○   | ○   | ○   | ○   | ○   |
| 3   | Tôi thấy trang web này dễ sử dụng.                                                        | ○   | ○   | ○   | ○   | ○   |
| 4   | Tôi nghĩ rằng tôi sẽ cần sự hỗ trợ của người có kỹ thuật để có thể sử dụng trang web này. | ○   | ○   | ○   | ○   | ○   |
| 5   | Tôi thấy các chức năng trong trang web này được tích hợp tốt với nhau.                    | ○   | ○   | ○   | ○   | ○   |
| 6   | Tôi thấy có quá nhiều sự không nhất quán trong trang web này.                             | ○   | ○   | ○   | ○   | ○   |
| 7   | Tôi cho rằng hầu hết mọi người sẽ học cách sử dụng trang web này rất nhanh.               | ○   | ○   | ○   | ○   | ○   |
| 8   | Tôi thấy trang web này rất khó sử dụng.                                                   | ○   | ○   | ○   | ○   | ○   |
| 9   | Tôi cảm thấy rất tự tin khi sử dụng trang web này.                                        | ○   | ○   | ○   | ○   | ○   |
| 10  | Tôi cần phải học nhiều thứ trước khi có thể sử dụng trang web này.                        | ○   | ○   | ○   | ○   | ○   |

### Tính điểm

| Bước                    | Cách tính                        |
| ----------------------- | -------------------------------- |
| Câu lẻ 1, 3, 5, 7, 9    | Điểm = giá trị đánh dấu - 1      |
| Câu chẵn 2, 4, 6, 8, 10 | Điểm = 5 - giá trị đánh dấu      |
| Tổng SUS                | Tổng 10 điểm đã chuyển đổi × 2.5 |

SUS là điểm quy đổi, không phải phần trăm. Với `n=7`, báo đủ mean, median, min, max và range. Không impute raw answers nếu còn thiếu; giữ `NA`.

| Người tham gia | Q1  | Q2  | Q3  | Q4  | Q5  | Q6  | Q7  | Q8  | Q9  | Q10 | Tổng SUS |
| -------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | -------- |
| P01            | 2   | 1   | 5   | 5   | 4   | 5   | 4   | 1   | 3   | 3   | 57.5     |
| P02            | 1   | 3   | 1   | 5   | 1   | 5   | 3   | 3   | 3   | 2   | 27.5     |
| P03            | 2   | 3   | 2   | 4   | 2   | 4   | 3   | 4   | 2   | 3   | 32.5     |
| P04            | 1   | 4   | 1   | 5   | 1   | 5   | 1   | 5   | 1   | 5   | 2.5      |
| P05            | 2   | 2   | 4   | 1   | 4   | 3   | 4   | 2   | 4   | 2   | 70.0     |
| P06            | 2   | 3   | 3   | 4   | 3   | 4   | 2   | 3   | 3   | 3   | 40.0     |
| P07            | 3   | 1   | 5   | 1   | 3   | 4   | 3   | 1   | 4   | 2   | 72.5     |

## Câu hỏi mở

### OQ-01: Độ rõ ràng

> Trong quá trình sử dụng EShop vừa rồi, có thời điểm nào bạn không biết phải làm gì tiếp theo không? Nếu có, đó là ở đâu và bạn đã làm gì lúc đó?

Mục đích: tìm chỗ giao diện không truyền đạt rõ ràng hành động tiếp theo.

### OQ-02: Khả năng phục hồi lỗi

> Nếu bạn gặp phải lỗi hoặc thông báo lỗi nào trong quá trình sử dụng, bạn có hiểu lỗi đó là gì không? Bạn có tự khắc phục được không, hay cần phải thử nhiều lần?

Mục đích: xem người dùng có tự sửa được lỗi hay không.

### OQ-03: Tốc độ / Hiệu quả

> Có bước nào trong quá trình mua hàng mà bạn cảm thấy mất nhiều thời gian hơn mức cần thiết không? Có thao tác nào bạn thấy thừa hoặc lặp lại không?

Mục đích: phát hiện chỗ gây cảm giác chậm hoặc cồng kềnh.

### OQ-04: Độ tin cậy

> Có thời điểm nào bạn không chắc hệ thống đã ghi nhận đúng hành động hoặc đơn hàng của bạn không? Điều gì làm bạn chắc chắn hoặc không chắc chắn?

Mục đích: phát hiện tín hiệu làm tăng hoặc giảm niềm tin.

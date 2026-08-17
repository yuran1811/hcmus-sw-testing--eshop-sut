# AI Critique — HW05

Trong bài tập này, việc sử dụng AI cũng khá tương tự các bài tập trước, AI giúp em có thể xây dựng được bộ khung cho việc kiểm thử hiệu năng, từ việc phân tích workflow, thiết kế test plan, viết script, chạy test và phân tích kết quả. Tuy nhiên, AI vẫn còn một số hạn chế trong việc diễn giải kết quả và đưa ra các đề xuất tối ưu hóa.

Trong quá trình phân tích workflow `checkout-with-coupon`, AI đã tính đúng phần lớn số liệu tổng thể nhưng diễn giải sai một số điểm quan trọng. AI dùng giá trị `53 ms` từ JMeter dashboard như p95 của Stress, trong khi percentile tính trực tiếp trên cột `elapsed` của raw JTL là `259 ms` và p99 là `925 ms`. Với Spike, AI đọc max `481450 ms` là outlier ở cuối run; thực tế sample này xuất hiện khoảng giây `237.485`, và toàn run có 34 failures, 7 sample vượt `5000 ms`, gồm một failure episode nghiêm trọng. AI cũng gọi `104.725 rps` của Soak 180 là steady throughput, dù giá trị này bao gồm 180 giây ramp-up và chỉ là whole-run average.

Các lỗi này xuất hiện vì AI dựa quá nhiều vào dashboard aggregate, không truy ngược vị trí sample bằng `timeStamp`, và chưa phân biệt rõ `elapsed`, `Latency` và `success`. AI cũng có xu hướng gọi max lớn là outlier đơn lẻ thay vì kiểm tra số lượng failure và failure message. Tương tự, các đề xuất index/WAL ban đầu dễ bị hiểu thành nguyên nhân đã được chứng minh, dù JTL không chứa query plan, lock wait hay CPU profile.

Nguyên tắc tôi rút ra là không dùng kết luận hiệu năng từ một giá trị dashboard hoặc một percentile duy nhất. Với mỗi claim, cần tính lại từ raw JTL, kiểm tra `success`, vị trí theo timestamp, failure message và các cửa sổ thời gian. Các đề xuất tối ưu hóa chỉ được xem là hypothesis cho đến khi có `EXPLAIN QUERY PLAN`, profiling hoặc A/B benchmark trên cùng workload.

Trong việc đề xuất tối ưu hóa, AI có thể chưa nắm được các chi tiết kỹ thuật của hệ thống, dẫn đến một số đề xuất không khả thi hoặc không chính xác. Ví dụ, AI đề xuất tăng `max_connections` và `work_mem`, nhưng không xem xét rằng hệ thống có thể đã đạt giới hạn phần cứng hoặc cấu hình hiện tại đã tối ưu cho workload cụ thể.

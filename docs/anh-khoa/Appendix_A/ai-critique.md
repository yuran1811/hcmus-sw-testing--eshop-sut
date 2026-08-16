# AI Critique

Sai lầm nghiêm trọng nhất của AI xảy ra ở Task 2: khi phân tích file `.jtl` của bài Stress, AI tin thẳng vào dashboard HTML của JMeter (p95 = 4699ms) mà không đối chiếu dữ liệu thô. Số đúng, tính lại từ raw log, là 3603ms — lệch 30%. Nguyên nhân là tham số ẩn `statistic_window = 20000`, khiến dashboard chỉ tính percentile trên 20.000 sample cuối, trong khi bài Stress có gần 40.000 sample. AI không phát hiện vì mặc định coi công cụ hiển thị sẵn là nguồn sự thật, không tự hỏi liệu chính công cụ đo có thể sai hay không.

Một ví dụ khác: AI từng kết luận "không có memory leak" chỉ dựa vào đồ thị RAM phẳng suốt 15 phút soak test, trong khi giỏ hàng phía server thực tế phình tới hơn 24.000 phần tử không bao giờ được giải phóng. Tốc độ rò rỉ quá nhỏ so với nhiễu tự nhiên của phép đo RSS nên không lộ ra. AI đã tự tin phát biểu một kết luận phủ định từ một phép đo không đủ nhạy để chứng minh điều đó — nhầm "không thấy bằng chứng" thành "có bằng chứng cho thấy không có".

Nguyên tắc rút ra: AI tính toán chính xác trên dữ liệu được cung cấp, nhưng không tự nghi ngờ nguồn dữ liệu đó có đáng tin hay không. Trách nhiệm của người làm bài là luôn đối chiếu kết luận của AI bằng phương pháp độc lập — tính lại bằng công cụ khác, đọc trực tiếp mã nguồn — trước khi chấp nhận, nhất là những kết luận nghe "yên tâm".

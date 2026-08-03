# Thang đo Hệ thống - SUS (System Usability Scale)

## 1. Lý do lựa chọn thang đo SUS
Chúng tôi sử dụng bảng câu hỏi SUS (Brooke, 1996) để đánh giá định lượng luồng Đăng ký và Đăng nhập vì các lý do sau:
- **Tập trung vào tính khả dụng của tác vụ (Task-based usability)**: SUS rất nhạy cảm trong việc đo lường mức độ dễ sử dụng và tính hiệu quả của các luồng giao dịch/chức năng độc lập.
- **Tính chuẩn hóa cao**: SUS là thang đo chuẩn có tuổi đời lâu năm, có dữ liệu benchmark phong phú giúp chuyển đổi từ điểm số thô sang xếp hạng định tính một cách khoa học (ví dụ: điểm trung bình toàn ngành là khoảng 68).
- **Ngắn gọn & Dễ trả lời**: Chỉ gồm 10 câu hỏi với thang đo Likert 5 điểm, rất thích hợp cho các buổi usability test ngắn (15-20 phút) và giảm tải gánh nặng nhận thức cho người dùng không thuộc ngành IT.

---

## 2. Bản dịch tiếng Việt chuẩn hóa của 10 câu hỏi SUS

Mỗi câu hỏi sẽ được đánh giá theo thang đo từ **1 (Hoàn toàn không đồng ý)** đến **5 (Hoàn toàn đồng ý)**:

1. Tôi nghĩ rằng tôi sẽ muốn sử dụng luồng đăng ký/đăng nhập này thường xuyên khi mua hàng.
2. Tôi thấy luồng đăng ký/đăng nhập này phức tạp một cách không cần thiết.
3. Tôi thấy luồng đăng ký/đăng nhập này dễ sử dụng.
4. Tôi nghĩ tôi cần sự trợ giúp của một chuyên gia kỹ thuật để có thể hoàn thành việc đăng ký và đăng nhập.
5. Tôi thấy các bước và các trường trong luồng đăng ký/đăng nhập được tích hợp và liên kết tốt với nhau.
6. Tôi thấy có quá nhiều sự thiếu nhất quán trong cách thiết kế luồng đăng ký và đăng nhập này.
7. Tôi tưởng tượng rằng hầu hết mọi người sẽ học cách sử dụng luồng đăng ký/đăng nhập này rất nhanh.
8. Tôi thấy luồng đăng ký/đăng nhập này rất cồng kềnh và khó dùng.
9. Tôi cảm thấy rất tự tin khi thực hiện đăng ký và đăng nhập trên hệ thống này.
10. Tôi cần phải học/đọc tài liệu hướng dẫn trước khi có thể sử dụng thành thạo luồng đăng ký/đăng nhập này.

---

## 3. Cách tính điểm SUS (SUS Scoring)

Điểm SUS thô của mỗi cá nhân sẽ được chuẩn hóa về thang điểm từ 0 đến 100 theo công thức sau:
- Đối với các câu hỏi lẻ (1, 3, 5, 7, 9): **Điểm đóng góp = (Điểm của người dùng - 1)**.
- Đối với các câu hỏi chẵn (2, 4, 6, 8, 10): **Điểm đóng góp = (5 - Điểm của người dùng)**.
- **Điểm SUS tổng của 1 participant = Tổng điểm đóng góp của 10 câu × 2.5**.

**Ví dụ:**
Nếu tổng các điểm đóng góp là 30, điểm SUS của người dùng đó sẽ là: $30 \times 2.5 = 75$.

---

## 4. Thang phân loại & Benchmark kết quả

Điểm trung bình (Mean SUS Score) của 7 người dùng sẽ được phân loại theo các ngưỡng nghiên cứu của Bangor (2008):

| Điểm SUS | Xếp hạng định tính (Adjective) | Mức độ chấp nhận (Acceptability) | Xếp hạng điểm số (Grade Scale) |
| :--- | :--- | :--- | :--- |
| **> 80.3** | Xuất sắc (Excellent) | Chấp nhận được (Acceptable) | A |
| **68.0 - 80.3** | Tốt (Good) | Chấp nhận được (Acceptable) | B / C |
| **51.0 - 67.9** | Trung bình (OK) | Cận biên (Marginal) | D |
| **38.0 - 50.9** | Yếu (Poor) | Không chấp nhận được (Not Acceptable) | F |
| **< 38.0** | Tồi tệ (Worst) | Không chấp nhận được (Not Acceptable) | F |

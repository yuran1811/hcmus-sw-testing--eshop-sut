# Biên bản Quan sát Session P[XX]

## 1. Thông tin Session (Session Metadata)
- **Họ và tên người tham gia (Participant)**: [Điền họ tên hoặc viết tắt để bảo mật]
- **Thời lượng**: [Ví dụ: 12 phút 45 giây]
- **Thời lượng video (nếu có)**: [Ví dụ: 13 phút 00 giây]
- **Link recording**: [Điền link Drive]
- **Thiết bị & Trình duyệt sử dụng**: [Ví dụ: Windows 11 - Chrome 124]
- **Đồng ý ghi âm/ghi hình (Consent)**: [ ] Có / [ ] Không
- **Sự lệch hướng nghiêm trọng (Deviation)**: [ ] Có (Mô tả ở dưới) / [ ] Không

---

## 2. Kết quả thực hiện tác vụ (Task Outcome)

| Chỉ số | Kết quả ghi nhận | Hướng dẫn ghi nhận |
| :--- | :--- | :--- |
| **Trạng thái Hoàn thành** | [ ] Thành công <br> [ ] Thất bại <br> [ ] Thất bại một phần (cần chỉ dẫn trực tiếp) | **Thành công**: Tự hoàn tất đăng ký & đăng nhập.<br>**Thất bại**: Bỏ cuộc giữa chừng.<br>**Thất bại một phần**: Hoàn tất nhưng phải nhờ moderator can thiệp chỉ cách bấm. |
| **Tổng số lần lỗi nhập liệu** | | Đếm số lần hệ thống báo lỗi form đỏ/alert (nhập sai email, pass yếu, pass không khớp). |
| **Tổng số lần đi lạc hướng (Wrong turns)** | | Số lần người dùng bấm vào các khu vực không liên quan (ví dụ: Admin page, nhầm lẫn giữa Đăng ký/Quên mật khẩu). |
| **Tổng số lần ngập ngừng (Hesitations)** | | Số lần người dùng dừng lại lâu (> 10s) tại một chỗ mà không biết làm gì tiếp theo. |
| **Tổng số lần Moderator can thiệp** | | Số lần Moderator phải đưa ra gợi ý gợi mở hoặc can thiệp kỹ thuật. |
| **Thời gian hoàn thành (giây)** | | Tổng thời gian tính từ khi moderator giao task đến khi hoàn thành hoặc dừng cuộc test. |

---

## 3. Checklist các tác vụ con (Sub-goals Checklist)

- [ ] **G1. Tìm lối vào Đăng ký**: Tự tìm thấy liên kết chuyển sang trang Đăng ký từ màn hình Đăng nhập/Trang chủ.
- [ ] **G2. Nhập thông tin Đăng ký**: Điền đầy đủ Họ Tên, Email đúng định dạng và thiết lập mật khẩu.
- [ ] **G3. Đáp ứng ràng buộc mật khẩu mạnh**: Vượt qua kiểm tra Regex của hệ thống ở lần thử đầu tiên hoặc tự sửa sau khi báo lỗi.
- [ ] **G4. Nhập đúng Xác nhận mật khẩu**: Nhập chính xác hai ô mật khẩu khớp nhau.
- [ ] **G5. Nhận diện Đăng ký thành công**: Nhận biết hệ thống đăng ký xong và tự chuyển hướng về trang Đăng nhập (hoặc hiển thị thông tin chuyển hướng).
- [ ] **G6. Đăng nhập thành công**: Nhập email/pass vừa đăng ký và đăng nhập vào hệ thống thành công.
- [ ] **G7. Nhận diện trạng thái Đăng nhập**: Nhận biết hệ thống đã đăng nhập thành công thông qua thay đổi hiển thị ở header (nút Đăng xuất, hiển thị Tên tài khoản).

---

## 4. Nhật ký quan sát (Observation Timeline)

*Ghi nhận chi tiết theo dòng thời gian về hành động, phát biểu (think-aloud verbatim quotes), lỗi và sự bối rối của người dùng:*

| Thời gian (mm:ss) | Hành động của người dùng | Lỗi / Điểm bối rối (Friction / Issue) | Phát biểu của người dùng (Verbatim Quotes) | Gợi ý / Can thiệp của Moderator |
| :---: | :--- | :--- | :--- | :--- |
| `00:00` | Bắt đầu nhận task từ Moderator. | | *"Tôi đang xem trang chủ để tìm nút đăng ký..."* | |
| `00:30` | Bấm vào nút Đăng nhập, sau đó thấy liên kết "Đăng ký tài khoản mới" và click vào. | | | |
| `01:15` | Điền xong thông tin Họ tên, Email. Bắt đầu nhập mật khẩu `user1234`. | Hệ thống báo lỗi mật khẩu quá yếu (Friction). | *"Sao mật khẩu này lại bị báo yếu nhỉ?"* | |
| `02:10` | Nhập lại mật khẩu mạnh hơn là `User123!`. | Vẫn bị báo lỗi mật khẩu yếu (Friction/SUT Bug). | *"Tôi đã nhập đủ ký tự hoa, thường, số, ký tự đặc biệt rồi mà?"* | |
| `03:40` | Loay hoay đổi nhiều mật khẩu khác nhau. | Người dùng bị ngập ngừng lâu (Hesitation). | *"Tôi không biết phải đặt thế nào nữa, có phải hệ thống bị lỗi không?"* | Moderator nhắc nhở: *"Hãy cứ thử lại theo cách bạn nghĩ là đúng."* |
| `05:00` | [Bấm dừng test hoặc tiếp tục...] | | | |

---

## 5. Điểm khảo sát SUS (SUS Raw Scores)

*Đánh giá của Participant trên thang Likert từ 1 (Hoàn toàn không đồng ý) đến 5 (Hoàn toàn đồng ý):*

| Câu hỏi | Điểm (1-5) | Ghi chú phản hồi của người dùng |
| :--- | :---: | :--- |
| **Q1**. Muốn sử dụng chức năng này thường xuyên | | |
| **Q2**. Chức năng phức tạp không cần thiết | | |
| **Q3**. Chức năng dễ sử dụng | | |
| **Q4**. Cần hỗ trợ của chuyên gia kỹ thuật | | |
| **Q5**. Các thành phần tích hợp tốt | | |
| **Q6**. Có quá nhiều sự bất nhất | | |
| **Q7**. Người khác sẽ học rất nhanh | | |
| **Q8**. Rất cồng kềnh/khó sử dụng | | |
| **Q9**. Cảm thấy tự tin khi sử dụng | | |
| **Q10**. Cần học nhiều thứ trước khi dùng | | |

---

## 6. Trả lời phỏng vấn thăm dò (Probe Questions Answers)

### 6.1. Clarity (Sự rõ ràng)
- **Q1 (Hiểu các bước)**: *[Ghi verbatim câu trả lời]*
- **Q2 (Nhãn & nút bấm)**: *[Ghi verbatim câu trả lời]*

### 6.2. Error Recovery (Sửa lỗi)
- **Q3 (Cách báo lỗi)**: *[Ghi verbatim câu trả lời]*
- **Q4 (Mức độ dễ hiểu của lỗi)**: *[Ghi verbatim câu trả lời]*

### 6.3. Speed (Tốc độ)
- **Q5 (Cảm nhận tốc độ)**: *[Ghi verbatim câu trả lời]*
- **Q6 (So sánh với bên khác)**: *[Ghi verbatim câu trả lời]*

### 6.4. Trust (Độ tin cậy)
- **Q7 (Độ an toàn của tài khoản)**: *[Ghi verbatim câu trả lời]*
- **Q8 (Cảm xúc về quy tắc pass)**: *[Ghi verbatim câu trả lời]*

---

## 7. Tổng kết của Điều phối viên (Researcher Summary)
- **Điểm Friction chính**: [Ví dụ: Người dùng bị chặn ở bước đặt mật khẩu do lỗi Regex của SUT, hoặc thiếu trường xác nhận mật khẩu làm tăng tỷ lệ nhập nhầm].
- **Điểm tích cực (Helpers)**: [Ví dụ: Nút chuyển hướng giữa Đăng nhập và Đăng ký rất rõ ràng, màu sắc tương phản tốt].
- **Khuyến nghị UI/UX nhanh**: [Ví dụ: Bổ sung tooltip gợi ý trực quan về điều kiện mật khẩu khi người dùng hover vào ô Password, sửa lại regex ở frontend].

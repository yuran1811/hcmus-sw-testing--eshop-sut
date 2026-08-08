# Công cụ đánh giá — SUS, UEQ-S, và ngân hàng câu hỏi mở

Đọc file này trước khi viết phần "Công cụ đánh giá" trong test plan hoặc chấm điểm ở Phase 3 —
đừng diễn giải lại nội dung item từ trí nhớ, dùng đúng nguyên văn/công thức dưới đây.

---

## SUS — System Usability Scale

10 item, thang Likert 1–5 (1 = Hoàn toàn không đồng ý, 5 = Hoàn toàn đồng ý). Đây là thang đo
chuẩn phổ biến nhất, dễ chấm điểm và dễ giải thích với người tham gia không chuyên IT.

| # | English (gốc, Brooke 1996) | Gợi ý tiếng Việt |
| --- | --- | --- |
| 1 | I think that I would like to use this system frequently. | Tôi nghĩ tôi sẽ muốn dùng hệ thống này thường xuyên. |
| 2 | I found the system unnecessarily complex. | Tôi thấy hệ thống này phức tạp một cách không cần thiết. |
| 3 | I thought the system was easy to use. | Tôi thấy hệ thống này dễ sử dụng. |
| 4 | I think that I would need the support of a technical person to be able to use this system. | Tôi nghĩ mình cần người rành kỹ thuật hỗ trợ mới dùng được hệ thống này. |
| 5 | I found the various functions in this system were well integrated. | Tôi thấy các chức năng trong hệ thống này được tích hợp tốt với nhau. |
| 6 | I thought there was too much inconsistency in this system. | Tôi thấy hệ thống này có quá nhiều điểm thiếu nhất quán. |
| 7 | I would imagine that most people would learn to use this system very quickly. | Tôi nghĩ hầu hết mọi người sẽ học cách dùng hệ thống này rất nhanh. |
| 8 | I found the system very cumbersome to use. | Tôi thấy hệ thống này rất cồng kềnh, bất tiện khi dùng. |
| 9 | I felt very confident using the system. | Tôi cảm thấy rất tự tin khi dùng hệ thống này. |
| 10 | I needed to learn a lot of things before I could get going with this system. | Tôi cần học nhiều thứ trước khi có thể bắt đầu dùng hệ thống này. |

**Công thức tính điểm:**
- Item lẻ (1, 3, 5, 7, 9): điểm đóng góp = (giá trị người dùng chọn) − 1
- Item chẵn (2, 4, 6, 8, 10): điểm đóng góp = 5 − (giá trị người dùng chọn)
- Tổng 10 điểm đóng góp (khoảng 0–40) × 2.5 = điểm SUS cuối cùng (khoảng 0–100)

**Thang xếp loại** (dùng đúng bảng này để nhất quán với tài liệu môn học):

| Khoảng điểm | Xếp loại |
| --- | --- |
| > 85 | A — Tuyệt vời |
| 73–85 | B — Tốt |
| 52–72 | C — Trung bình |
| < 51 | D/F — Kém, cần thiết kế lại |

---

## UEQ-S — User Experience Questionnaire (Short)

8 cặp tính từ đối lập, thang 7 điểm (1–7, quy đổi về −3..+3 bằng cách trừ 4). Dùng khi ngoài
tính "dùng được" còn muốn đo cảm nhận hấp dẫn/thu hút (hedonic quality) — phù hợp với sản phẩm
tiêu dùng như thương mại điện tử.

> Nội dung item dưới đây theo cấu trúc UEQ-S công bố công khai (Schrepp, Hinderks & Thomaschewski).
> Bản dịch tiếng Việt là gợi ý, chưa phải bản dịch chính thức — nếu cần khớp chính xác cho mục
> đích học thuật, đối chiếu lại với bản gốc trước khi in phiếu khảo sát.

| # | Cặp tính từ (gốc) | Gợi ý tiếng Việt | Thuộc nhóm |
| --- | --- | --- | --- |
| 1 | obstructive — supportive | gây cản trở — hỗ trợ tốt | Pragmatic |
| 2 | complicated — easy | phức tạp — dễ dàng | Pragmatic |
| 3 | inefficient — efficient | kém hiệu quả — hiệu quả | Pragmatic |
| 4 | confusing — clear | gây rối — rõ ràng | Pragmatic |
| 5 | boring — exciting | nhàm chán — thú vị | Hedonic |
| 6 | not interesting — interesting | không hấp dẫn — hấp dẫn | Hedonic |
| 7 | conventional — inventive | thông thường — sáng tạo | Hedonic |
| 8 | usual — leading edge | quen thuộc — đột phá | Hedonic |

**Công thức tính điểm:**
- Quy đổi mỗi lựa chọn 1–7 về thang −3..+3 (trừ 4).
- Pragmatic Quality (PQ) = trung bình item 1–4.
- Hedonic Quality (HQ) = trung bình item 5–8.
- Overall = trung bình cả 8 item.
- Điểm càng gần +3 càng tốt; quanh 0 là trung tính; âm là tiêu cực.

---

## Ngân hàng câu hỏi mở (probe questions)

Chọn tối thiểu 1 câu/nhóm cho test plan; có thể hỏi thêm nếu thời gian cho phép. Giữ giọng
trung lập — không gợi ý sẵn câu trả lời trong câu hỏi.

**Clarity (rõ ràng, dễ hiểu)**
- Bước nào bạn thấy khó hiểu nhất? Vì sao?
- Có lúc nào bạn không chắc mình đang ở bước nào trong quy trình không?
- Thông tin trên màn hình có đủ để bạn ra quyết định không, hay bạn cần thêm gì?

**Error recovery (khắc phục lỗi)**
- Khi bạn bấm nhầm hoặc gặp lỗi, bạn có biết cách quay lại hoặc sửa không?
- Nếu hệ thống báo lỗi, thông báo đó có giúp bạn biết phải làm gì tiếp theo không?
- Có bước nào bạn cảm thấy nếu bấm sai sẽ khó quay lại không?

**Speed (tốc độ, hiệu suất)**
- Bạn thấy quá trình này nhanh hay chậm hơn bạn nghĩ?
- Có bước nào bạn cảm thấy mất thời gian không cần thiết không?
- So với cách bạn thường làm việc này (nếu có), quy trình này nhanh hơn hay chậm hơn?

**Trust (tin tưởng)**
- Bạn có tin thông tin hiển thị (giá, số lượng, trạng thái) là chính xác không? Vì sao?
- Bạn có lo lắng điều gì trong lúc thực hiện task này không (VD: mất tiền, mất dữ liệu)?
- Nếu đây là giao dịch thật, bạn có đủ tự tin để hoàn tất không?

# Usability Testing Seminar
### Tổng quan, Phương pháp, Quy trình & Trải nghiệm Thực tế

---

## 1. Nội dung Seminar

1. **ISO 9241-11** — Effectiveness + Efficiency + Satisfaction.
2. **Types of Test** — Remote, In-person, Moderated, Unmoderated.
3. **Quy trình** — Mục tiêu → Tiêu chí → Script → Pilot → Run.
4. **Metrics** — Completion, Time, Error, SUS, SEQ.
5. **Frameworks** — Nielsen 10 Heuristics & Context of Use.
6. **Đa thiết bị** — Mobile issues: Overflow, Keyboard, Touch.
7. **Công cụ** — Figma, Hotjar, Forms, OBS, BrowserStack.
8. **Báo cáo Issue** — Context + Evidence + Impact + Recommendation.
9. **Ethics & A11y** — Informed Consent, Không dẫn dắt, Inclusive.
10. **Live Testing** — Biến quan sát thành Insight cải tiến sản phẩm.

---

## 2. Ba trụ cột của Usability (ISO 9241-11)

| Trụ cột | Mục tiêu / Ý nghĩa | Câu hỏi đánh giá | Chỉ số tham khảo |
|---|---|---|---|
| **Effectiveness** (Hiệu quả) | Mức độ chính xác và đầy đủ khi hoàn thành mục tiêu. | Người dùng có hoàn thành đúng tác vụ không? | Task completion rate, success rate, số lỗi, độ chính xác |
| **Efficiency** (Hiệu suất) | Nguồn lực cần bỏ ra so với kết quả đạt được. | Mất bao lâu, bao nhiêu bước hoặc bao nhiêu nỗ lực? | Time on task, số click, số lần cần trợ giúp |
| **Satisfaction** (Sự hài lòng) | Phản ứng thể chất, nhận thức, cảm xúc đáp ứng kỳ vọng. | Trải nghiệm có dễ chịu, đáng tin cậy không? | SUS, satisfaction rating, phản hồi định tính |

> Ba mục tiêu có liên quan nhưng không thay thế nhau. Đánh giá đầy đủ cần xem xét cả ba.

---

## 3. Usability Testing là gì?

**Định nghĩa:** Phương pháp nghiên cứu trong đó người tham gia (participant) thực hiện tác vụ (tasks) trên sản phẩm, người điều phối (facilitator) quan sát hành vi & thu thập dữ liệu.

**Ba thành phần cốt lõi:** Facilitator + Tasks + Participant.

**Mục tiêu chính:**
- Phát hiện điểm gây nhầm lẫn, lỗi thao tác, trở ngại trong user flow.
- Đo lường effectiveness, efficiency, satisfaction.
- Kiểm chứng giả định thiết kế trước khi triển khai quy mô lớn.

**Phạm vi:** Có thể áp dụng từ paper prototype đến hệ thống đang vận hành.

---

## 4. Phân biệt Usability Testing với Testing khác

| Loại Testing | Mục tiêu chính | Khác với Usability Testing |
|---|---|---|
| **Functional Testing** | Xác minh chức năng đúng requirement (Pass/Fail) | Chức năng "pass" logic vẫn có thể khó tìm, khó hiểu, khó dùng. |
| **UAT** (User Acceptance) | Xác nhận hệ thống đáp ứng business needs | UAT hỏi "có chấp nhận không?", usability tìm vấn đề tương tác sâu. |
| **Accessibility Testing** | Người khuyết tật có tiếp cận tương đương được không? | Tập trung vào disability và rào cản; có giao nhau nhưng không đồng nhất. |
| **UI Testing** | Giao diện hiển thị đúng đặc tả/thiết kế? | "Đúng thiết kế" ≠ dễ hiểu hay phù hợp mental model của user. |
| **A/B Testing** | So sánh 2 biến thể trên metric định trước | Cho biết cái nào tốt hơn, nhưng thường không giải thích đầy đủ vì sao. |

---

## 5. Bốn nhóm Usability Testing cơ bản

- **Remote Testing** — Participant thực hiện từ xa trên thiết bị cá nhân. Tiết kiệm chi phí, dễ mở rộng, hành vi tự nhiên.
- **In-Person Testing** — Thực hiện tại địa điểm vật lý. Dễ quan sát ngôn ngữ cơ thể, môi trường được kiểm soát cao.
- **Moderated Testing** — Có facilitator hướng dẫn, hỏi thêm real-time. Phù hợp cho flow phức tạp, thu insight rất sâu.
- **Unmoderated Testing** — Participant tự hoàn thành. Linh hoạt, nhanh, không có moderator bias, lý tưởng cho Agile.

### So sánh: Remote vs. In-Person Testing

| | Remote Testing | In-Person Testing |
|---|---|---|
| **Định nghĩa** | Participant làm từ xa, trên thiết bị và môi trường cá nhân. | Participant đến địa điểm vật lý có facilitator quan sát trực tiếp. |
| **Ưu điểm** | Phạm vi rộng (không giới hạn địa lý), linh hoạt lịch trình, tiết kiệm chi phí, dễ scale mẫu lớn. | Quan sát được toàn bộ ngôn ngữ cơ thể, phản ứng tinh tế; kiểm soát hoàn toàn môi trường và thiết bị. |
| **Nhược điểm** | Khó quan sát cử chỉ, ngôn ngữ cơ thể; khó probing sâu khi có lỗi mạng/kỹ thuật. | Rất tốn kém, giới hạn địa lý, cần nhiều phối hợp logistics. |
| **Phương pháp** | Remote moderated, Unmoderated remote, Diary study, Card sorting. | Focus group, 1:1 Interview, Guerrilla testing. |

### So sánh: Moderated vs. Unmoderated Testing

| | Moderated Testing | Unmoderated Testing |
|---|---|---|
| **Định nghĩa** | Facilitator chủ động hướng dẫn, đặt câu hỏi probing real-time. | Participant tự thực hiện task qua tool, không có facilitator. |
| **Ưu điểm** | Insight sâu, hiểu rõ "tại sao", giải quyết ngay khi user kẹt, xây dựng empathy tuyệt vời. | Nhanh, linh hoạt, loại bỏ moderator bias, dân chủ hóa UX research, dễ chạy số lượng lớn. |
| **Nhược điểm** | Khó mở rộng (tốn thời gian 1:1), có nguy cơ moderator bias (dẫn dắt vô tình). | Không thể probing real-time, user kẹt là bỏ cuộc, chỉ làm theo kịch bản cố định. |
| **Phù hợp cho** | Flow phức tạp, prototype chưa hoàn thiện, khám phá vấn đề mới. | Prototype ổn định, đo lường metric định lượng, nhịp độ Agile nhanh. |

---

## 6. Quy trình thực hiện (6 bước)

1. **Xác định mục tiêu** — Gắn mục tiêu với tác vụ thực tế. Định nghĩa Target Audience đại diện.
2. **Tiêu chí đánh giá** — Đặt benchmark & metric (Completion rate, Time, Error rate) trước khi test.
3. **Tuyển Participant** — Chọn 3–5 người/nhóm qua screener forms đúng profile.
4. **Viết kịch bản** — Informed Consent → Task List → Questions trung lập → Debrief.
5. **Pilot Test** — Chạy thử 1 lần với 1 người để fix kịch bản/công cụ bị lỗi.
6. **Phân tích & Báo cáo** — Tìm pattern, rút ra issue, đề xuất cải tiến và Iterate lặp lại.

---

## 7. Minh họa với Lumiere Cinema (Tình huống chung)

Nhóm chọn kiểm tra **luồng mua vé xem phim khi chưa đăng nhập**, vì đây là một luồng chính của Lumiere Cinema.

**Người dùng minh họa:** Mai, 20 tuổi (Sinh viên). Đã từng đặt vé trên app khác nhưng chưa dùng Lumiere. Thực hiện bài test trên điện thoại.

**Tình huống:** Tối thứ Sáu, Mai muốn đi xem phim cùng một người bạn. Mai cần chọn một phim đang chiếu, chọn rạp và suất buổi tối, mua 2 vé, chọn 2 ghế cạnh nhau, thêm 1 phần bắp nước, nhập thông tin liên hệ, chọn cách thanh toán và lấy vé QR.

*Ghi chú: Tên phim, rạp, suất chiếu đổi theo dữ liệu thật ngày test. Thanh toán thử nghiệm (không dùng tiền thật).*

### Bước 1: Xác định mục tiêu

**Nhóm muốn biết:** Mai có tự mua xong 2 vé và lấy mã QR hay không?

Các câu hỏi cần chú ý:
- Mai chọn 2 vé nhưng mới chọn 1 ghế. Tự nhận ra & chọn thêm → Giao diện hỗ trợ tốt.
- Mai có biết phải chọn rạp trước rồi mới chọn suất? Không hiểu cảnh báo/Cần hướng dẫn → Nhóm cần ghi lại.
- Mai có hiểu số vé phải bằng số ghế đã chọn?
- Mai có phân biệt được ghế thường, VIP, ghế đôi, ghế đã đặt?
- Mai có biết bước chọn đồ ăn có thể bỏ qua không?
- Mai có nhập đúng tên, email, sđt khi chưa đăng nhập?
- Mai có hiểu nút COMPLETE hoàn tất đơn & tạo vé?
- Khi mã QR xuất hiện, Mai có biết cách tải vé xuống?

**Mục tiêu ngắn gọn của buổi kiểm thử:** Người mới có thể tự mua đúng 2 vé, chọn 2 ghế cạnh nhau và lấy QR mà không cần người hướng dẫn chỉ cách bấm.

### Bước 2: Tiêu chí đánh giá

**Cách đánh giá trong tình huống của Mai**

| Điều cần xem | Cách ghi nhận | Mức mong muốn |
|---|---|---|
| Hoàn thành | Mai nhận được QR đúng phim, đúng suất, đúng 2 vé và 2 ghế | Ít nhất 4/5 người làm được |
| Thời gian | Tính từ lúc bắt đầu chọn phim đến khi QR xuất hiện | Không quá 8 phút |
| Lỗi nghiêm trọng | Chọn sai suất, sai số vé, không thể đi tiếp hoặc không nhận được vé | Không có lỗi nghiêm trọng |
| Cần trợ giúp | Đếm số lần người hướng dẫn phải chỉ Mai bấm ở đâu | Không cần trợ giúp |
| Mức độ dễ dùng | Sau khi xong, người dùng chấm từ 1 đến 7 | Từ 5/7 trở lên |

**Phiếu quan sát đơn giản**

| Chặng | Mai làm gì? | Có dừng lại/làm sai không? | Mai nói gì? |
|---|---|---|---|
| Chọn rạp và suất | | | |
| Chọn vé và ghế | | | |
| Chọn đồ ăn | ...các bước tiếp theo... | | |

### Bước 3: Tuyển người tham gia

Nhóm tuyển 5 người có hoàn cảnh gần với Mai: từ 18 tuổi trở lên, có nhu cầu xem phim, đã dùng app khác nhưng chưa biết rõ Lumiere Cinema, không phải thành viên phát triển/kiểm thử dự án.

- **Mai (Người dùng mới)** — Mai chưa biết trước cách hệ thống hoạt động, phản ứng tự nhiên nhất với giao diện.
- **Nam (Thành viên viết tính năng)** — Thường dùng điện thoại đặt dịch vụ. Nam đã biết nút nào dẫn đến bước nào nên kết quả sẽ dễ hơn người dùng thật. *(Ví dụ về người KHÔNG nên chọn — vì đã quá quen thuộc với hệ thống.)*

**Câu hỏi chọn người (screener):**
1. 6 tháng qua, đặt vé xem phim online bao nhiêu lần?
2. Thường đặt bằng điện thoại hay máy tính?
3. Đã từng dùng Lumiere Cinema chưa?
4. Có tham gia làm dự án này không?
5. Có đồng ý ghi màn hình/ghi âm buổi kiểm thử không?

### Bước 4: Viết kịch bản kiểm thử

| Phần | Nội dung mẫu |
|---|---|
| **Mở đầu** | "Hôm nay chúng tôi kiểm tra SP, không kiểm tra bạn. Không có đúng sai. Hãy nói điều bạn nghĩ. Ghi màn hình/âm thanh để xem chỗ khó hiểu." |
| **Giao nhiệm vụ** | "Tối T6 đi xem phim cùng bạn. Chọn 1 phim, rạp & suất tối, mua 2 vé, 2 ghế, 1 bắp nước. Tiếp tục đến khi nhận QR." (Không chỉ nút) |
| **Hỏi trong lúc quan sát** | "Bạn đang nghĩ gì?" · Bước nào dễ/khó nhất? · "Bạn nghĩ nút này đi đâu?" · Hiểu số ghế = số vé? · Biết nút COMPLETE làm gì? |
| **Hỏi sau hoàn thành** | "Bạn sẽ làm gì tiếp?" · Chấm điểm (1–7)? |

### Bước 5: Pilot Test

Trước buổi chính, nhóm mời 1 người có đặc điểm gần giống Mai làm thử toàn bộ kịch bản (người này không nằm trong nhóm 5 người chính).

**Minh họa bằng tình huống:**
- Minh hỏi: "Thanh toán trừ tiền thật không?" → Nhóm kiểm tra: phim được chọn có lịch chiếu thật trong data.
- Không tìm được suất tối do dữ liệu thiếu → Suất chiếu còn ít nhất 2 ghế cạnh nhau.
- Tưởng SEATINGS là quay lại chọn ghế → Rạp còn phần bắp nước để chọn.

**Nhóm kiểm tra thêm:** Email và SĐT thử có thể nhập được; lựa chọn MOMO, ZALOPAY, VNPAY hiển thị; sau khi bấm COMPLETE, hệ thống tạo QR; ghi màn hình, micro, đồng hồ đo thời gian hoạt động.

### Bước 6: Phân tích, báo cáo và kiểm thử lại

**Mỗi vấn đề cần trả lời 4 câu đơn giản:**

| Điều quan sát được (Giả định) | Ảnh hưởng | Mức độ | Cách sửa đề xuất |
|---|---|---|---|
| 3/5 người dừng ở nút SEATINGS vì không biết đi đâu | Ngại bấm hoặc tưởng phải chọn ghế lại | Vừa | Đổi thành TIẾP TỤC hoặc tên bước kế tiếp |
| 2/5 người chọn 2 vé nhưng 1 ghế; cảnh báo tiếng Anh làm khó hiểu | Không thể sang bước tiếp theo | Cao | Báo rõ tiếng Việt: "Bạn đã chọn 2 vé, vui lòng chọn đủ 2 ghế" |
| 2/5 nghĩ bấm COMPLETE mở cổng thanh toán, nhưng tạo vé ngay | Không chắc mình đã trả tiền hay chưa | Cao | Thêm màn hình xác nhận, nói rõ là thanh toán thử nghiệm |
| 1/5 người thấy QR nhưng không để ý nút DOWNLOAD | Rời trang mà chưa lưu vé | Thấp | Đổi thành "Tải vé về điện thoại" và báo khi tải xong |

---

## 8. Tám phương pháp thu thập dữ liệu

| Phương pháp | Mô tả & Ưu điểm | Hạn chế |
|---|---|---|
| 1. Think-Aloud | User nói ra suy nghĩ. Hiểu lỗi từ đâu, tốn ít chi phí. | User thường không quen tự nói. |
| 2. Observation | Quan sát hành vi thực. Ghi nhận toàn bộ quy trình. | Dễ bị ảnh hưởng bởi môi trường ngoài. |
| 3. User Interview | Phỏng vấn sau test. Hiểu sâu cách nghĩ ở nhiều thời điểm. | User có thể quên chi tiết. |
| 4. Survey | Khảo sát cảm xúc (CSAT, SEQ, SUS). Nhanh, dễ mở rộng. | Dễ sai lệch nếu câu hỏi tồi. |
| 5. Screen Recording | Quay màn hình. Lưu chính xác click, cuộn chuột. | Chỉ thấy "như thế nào", không "tại sao". |
| 6. Heatmap | Bản đồ click/cuộn. Trực quan vùng tập trung chú ý. | Không giải thích được lý do hành động. |
| 7. Card Sorting | User gom nhóm thông tin. Hiểu Mental Model. | Chỉ tạo ý tưởng, không chính xác tuyệt đối. |
| 8. Tree Testing | Tìm mục tiêu trong cây text. Xác minh cấu trúc IA. | Không phản ánh thiết kế/UI thực tế. |

---

## 9. Các Metric Hành vi (Behavioral Metrics)

- **Task Completion Rate** (Tỷ lệ hoàn thành) — Tỷ lệ người dùng hoàn thành task thành công / tổng số người. Ngưỡng tối thiểu thường là 78%. Với hệ thống rủi ro cao cần đạt 95–99%.
- **Time on Task** (Thời gian hoàn thành) — Thời gian cần để hoàn tất 1 task. Không theo phân phối chuẩn. Dùng Geometric Mean (mẫu <25) hoặc Median (mẫu ≥25). Thường càng nhỏ càng tốt.
- **Error Rate** (Tỷ lệ lỗi) — Bao gồm Slip (lỗi vô tình, thao tác nhầm) và Mistake (lỗi do hiểu sai mental model). Tính theo tổng lỗi/cơ hội hoặc số người mắc lỗi.
- **Số lần nhấn khu vực quan trọng (AOI)** — Xác định vùng người dùng thực sự nhấn vào. Hỗ trợ tốt nhất để phát hiện lỗi tương tác, flow ẩn.

## 10. Các Metric Thái độ (Attitudinal Metrics)

| Metric | Cách đo lường | Ý nghĩa |
|---|---|---|
| **CSAT** (Customer Satisfaction) | Câu hỏi hài lòng tổng quát/cụ thể sau task/session. | Thấu hiểu cảm nhận người dùng về nội dung, chức năng. |
| **SEQ** (Single Ease Question) | "Tác vụ này khó hay dễ?" (Thang 1–7, hỏi ngay sau task). | Xác định điểm yếu cục bộ của từng task. |
| **SUS** (System Usability Scale) | 10 câu hỏi chuẩn, thang Likert 1–5 → Quy đổi điểm 0–100. | Đánh giá tổng thể độ khả dụng của toàn hệ thống. |
| **NPS** (Net Promoter Score) | "Bạn có giới thiệu sản phẩm?" (% Promoter − % Detractor). | Tiềm năng giữ chân người dùng và lòng trung thành. |

**Thang điểm SUS tham khảo:** >85 (A — Tuyệt vời), 73–85 (B — Tốt), 52–72 (C — Trung bình), <51 (D/F — Kém, cần thiết kế lại).

---

## 11. Đánh giá mức độ nghiêm trọng

| Mức | Phân loại | Ý nghĩa & Hành động |
|---|---|---|
| 0 | Không phải lỗi | Không đủ bằng chứng để coi là usability issue. |
| 1 | Cosmetic (Thẩm mỹ) | Bất tiện rất nhỏ. Sửa khi còn thời gian. |
| 2 | Minor (Nhỏ) | Có gây bất tiện nhưng user vẫn tự vượt qua được. Ưu tiên thấp. |
| 3 | Major (Nghiêm trọng) | Làm chậm đáng kể, mắc lỗi nhiều, thất bại task. Cần ưu tiên cao. |
| 4 | Catastrophe (Thảm họa) | Chặn task quan trọng, mất dữ liệu, không thể phục hồi. Phải sửa trước release. |

---

## 12. Nielsen's 10 Usability Heuristics

| # | Heuristic | Ví dụ áp dụng |
|---|---|---|
| 1 | Visibility of system status | Progress bar khi tải file; Báo "Đã lưu". |
| 2 | Match between system & real world | Dùng từ "Giỏ hàng" thay cho "Bảng DB". |
| 3 | User control and freedom | Có tính năng Undo, Cancel; lối thoát rõ ràng. |
| 4 | Consistency and standards | Icon thùng rác luôn là "Xóa" ở mọi nơi. |
| 5 | Error prevention | Disable nút Submit nếu form chưa hợp lệ. |
| 6 | Recognition rather than recall | Gợi ý lịch sử tìm kiếm, có label cạnh icon. |
| 7 | Flexibility and efficiency of use | Keyboard shortcuts, tính năng Autofill. |
| 8 | Aesthetic and minimalist design | Loại bỏ CTA, hình ảnh thừa làm rối mắt. |
| 9 | Help recognize & recover from errors | Báo "Mật khẩu cần 8 ký tự" thay vì "Error 400". |
| 10 | Help and documentation | Tooltip hướng dẫn cạnh trường nhập phức tạp. |

---

## 13. ISO 9241-11 & Context of Use

> "Task completion rate 90%" chỉ có ý nghĩa khi đi kèm mô tả chi tiết người tham gia, task, thiết bị và điều kiện test!

**4 thành phần của Context of Use:**
- **Users** — Đặc điểm, năng lực, kinh nghiệm.
- **Goals & Tasks** — Kết quả cần đạt.
- **Resources** — Thiết bị, phần mềm, hỗ trợ.
- **Environment** — Môi trường vật lý, xã hội, kỹ thuật.

## 14. Các khái niệm liên quan

- **Learnability** (Khả năng học hỏi) — Người dùng mới có thể hiểu và bắt đầu nhanh không? Đo lường qua first-attempt success rate, learning curve.
- **Memorability** (Khả năng ghi nhớ) — Quay lại sau một thời gian dài có nhớ cách dùng không? So sánh success/time giữa các lần sử dụng cách xa nhau.
- **Error prevention** (Phòng ngừa lỗi) — Phân biệt Slip (mục tiêu đúng, thao tác nhầm do UI) và Mistake (hiểu sai mental model, hệ thống cần cải thiện label/mapping).
- **User satisfaction** (Sự hài lòng) — Task success cao chưa chắc satisfaction cao (họ làm được nhưng bực bội). Phải đối chiếu Self-reported data vs Behavioral data.

---

## 15. Tại sao cần test đa thiết bị?

Một flow dễ dùng trên desktop có thể gây lỗi nghiêm trọng trên mobile:
- Bàn phím ảo (virtual keyboard) che khuất input.
- Touch targets (nút bấm) quá nhỏ để chạm chính xác.
- Layout bị tràn viewport (overflow) tạo scroll ngang.

Cần kiểm tra các biến: thiết bị, độ phân giải, input method, browser, OS, tốc độ mạng.

### So sánh Desktop / Mobile / Tablet

| Khía cạnh | Desktop | Mobile | Tablet |
|---|---|---|---|
| Input Method | Mouse + keyboard, có hover state. | Touch, thường 1 tay, không có hover. | Touch, có thể dùng stylus/keyboard. |
| Không gian | Rộng, nhiều cột, mật độ cao. | Hẹp, ưu tiên nội dung chính. | Trung gian (vùng chạm vẫn phải lớn). |
| Navigation | Menu ngang, sidebar lớn. | Bottom nav, hamburger menu. | Sidebar hoặc split view. |
| Rủi ro Usability | Quá nhiều thông tin, rối mắt. | Nút nhỏ, keyboard che form, scroll dài. | Layout "lửng" — bị làm như desktop thu nhỏ. |

### 4 lỗi Mobile thường gặp

- **Touch target quá nhỏ** — Ngón tay không chính xác bằng con trỏ chuột. Khuyến nghị: tối thiểu 48px, có đủ khoảng cách đệm (spacing) giữa các target để tránh bấm nhầm.
- **Font size khó đọc** — Chữ quá nhỏ, độ tương phản thấp (contrast), đoạn văn quá dài gây tăng cognitive load khi đi ngoài trời.
- **Keyboard che nội dung** — Virtual keyboard bật lên che mất ô input đang gõ, nút Submit, hoặc thông báo lỗi (Error message).
- **Layout overflow** — Nội dung tràn viewport tạo horizontal scroll ngang, làm mất UI quan trọng (bảng biểu, nút bấm dài).

---

## 16. Tools hỗ trợ Usability Testing

| Mục tiêu | Tool gợi ý | Lưu ý quan trọng |
|---|---|---|
| Cross-browser/device | BrowserStack | Phát hiện lỗi môi trường kỹ thuật, KHÔNG thay thế user research thật. |
| Survey sau task | Google Forms | Dùng câu hỏi trung lập, có thang đo rõ ràng. |
| Ghi hình phiên test | Loom, OBS | Bắt buộc xin consent, bảo vệ quyền riêng tư & che data nhạy cảm. |
| Unmoderated test | Maze, Useberry | Cần Pilot test kỹ lưỡng trước khi gửi để tránh user hiểu sai task. |
| Behavior analytics | Hotjar, Clarity | Cho thấy "làm gì" qua heatmap, phải kết hợp Qualitative để biết "vì sao". |
| Prototype testing | Figma | Ghi rõ độ chân thực (fidelity) cho participant. |
| Quản lý Issue | Jira, Notion | Mỗi ticket cần evidence, severity, context đầy đủ. |

### BrowserStack: Cloud Testing đa thiết bị

**Nền tảng Cloud Testing:** Cho phép test website, web app và mobile app trên các thiết bị, trình duyệt và OS thật (Real devices).

**Ứng dụng trong Usability:**
- Kiểm tra responsive layout trên nhiều kích thước.
- So sánh hành vi giữa Chrome, Safari, Firefox, Edge.
- Kiểm tra input, scroll, keyboard và gesture.
- Bằng chứng trực quan: Ghi lại screenshot hoặc video để bổ sung bằng chứng cho Issue Report.

> Lưu ý: BrowserStack KHÔNG thay thế người dùng thật. Nó chỉ dùng để kiểm chứng kỹ thuật và giảm rủi ro trước phiên test chính thức.

### Workflow tích hợp BrowserStack

1. **Chọn thiết bị** — Dựa trên dữ liệu Analytics hoặc nhóm người dùng mục tiêu.
2. **Smoke Test** — Đảm bảo các flow chính không vỡ layout hay lỗi kỹ thuật.
3. **User Testing** — Thực hiện test thực tế với người dùng trên một vài thiết bị đại diện.
4. **Kiểm chứng** — Dùng BrowserStack check xem issue là do thiết kế chung hay do OS cụ thể.
5. **Báo cáo** — Ghi nhận issue kèm device, browser, viewport và bằng chứng hình ảnh.

---

## 17. Issue Report là gì?

**Định nghĩa:** Là bản ghi có cấu trúc về vấn đề khiến người dùng khó hoàn thành task, mắc lỗi hoặc bỏ cuộc.

**Tránh nói chung chung:** Không chỉ nhận xét "form khó dùng" hay "giao diện chưa đẹp".

**Yêu cầu bắt buộc:** Phải có **Context** (ngữ cảnh), **Evidence** (bằng chứng), **Impact** (tác động), **Recommendation** (đề xuất sửa).

**Mục đích:** Biến dữ liệu quan sát thành Finding cụ thể, actionable cho Developer & Designer.

### Cấu trúc Issue Report

| Thành phần | Nội dung / Câu hỏi gợi ý |
|---|---|
| 1. Title | Tên issue ngắn gọn. Vấn đề chính là gì? |
| 2. Context | Xảy ra ở task nào, màn hình nào, thiết bị/trình duyệt nào? |
| 3. Problem Description | Người dùng đã bị kẹt ở đâu? Làm gì sai? |
| 4. Evidence | Screenshot, video timestamp, quote lời user, metric. |
| 5. Violated Heuristic | Thiết kế đang trái nguyên tắc nào? (Nielsen, Mobile...). |
| 6. Impact & Severity | Làm chậm, mắc lỗi hay bỏ cuộc? Mức độ Sev (1–4)? |
| 7. Recommendation | Nên thay đổi cụ thể gì để fix vấn đề? |

### Công thức mô tả vấn đề

> "Khi [context], user [hành vi quan sát được], dẫn đến [ảnh hưởng]."

**Ví dụ CHƯA TỐT:**
"Trang checkout khó dùng. Người dùng không thấy nút. Nên làm giao diện đẹp hơn."
*Lý do fail:* Không có task, không biết dùng thiết bị gì, không evidence, impact mơ hồ, recommendation không actionable (thế nào là "đẹp hơn"?).

**Ví dụ TỐT:**
- **Title:** CTA "Tiếp tục" bị sót trên Mobile.
- **Context:** Task checkout, iPhone 13 Safari.
- **Problem:** 3/5 user không thấy nút do bị list sản phẩm che lấp.
- **Evidence:** Video P02 01:32; P04: "Em tưởng tới đây là hết".
- **Severity & Rec:** Sev 3. Recommendation: Đặt CTA sticky ở footer.

### Viết Recommendation hiệu quả

| Cách viết chung chung (Yếu) | Cách viết cụ thể, Actionable (Tốt) |
|---|---|
| "Làm nút rõ hơn." | "Đổi label CTA thành 'Tiếp tục thanh toán', đặt vào sticky footer trên mobile, tăng contrast nền." |
| "Sửa thông báo lỗi." | "Hiển thị lỗi ngay dưới trường Mật khẩu đỏ rực, nêu rõ: ít nhất 8 ký tự và có 1 chữ số." |
| "Thiết kế lại menu cho dễ dùng." | "Đưa mục 'Lịch sử đơn hàng' lên cấp 1 trong tài khoản (vì user tìm mục này nhiều nhất)." |

---

## 18. Usability vs. Accessibility

| | Usability | Accessibility |
|---|---|---|
| **Trọng tâm** | Dễ dùng, hiệu quả, ít lỗi, hài lòng. | Sự tiếp cận tương đương cho mọi nhóm (bao gồm người khuyết tật). |
| **Câu hỏi** | "Người dùng có hoàn thành task một cách trơn tru, dễ dàng không?" | "Có bị loại khỏi trải nghiệm vì các rào cản thiết kế/kỹ thuật không?" |
| **Đánh giá** | User Testing, Observation, Metrics (Time, Success rate), Survey (SUS). | WCAG Guidelines, Keyboard test, Screen reader test, Color Contrast. |

> Khác nhau nhưng giao nhau rất nhiều. Sản phẩm không accessible thường cũng KHÔNG usable cho mọi người!

### Các nhóm rào cản thường gặp (Accessibility)

| Nhóm hạn chế | Ví dụ vấn đề thiết kế gây rào cản |
|---|---|
| Thị lực (Visual) | Chữ quá nhỏ, tương phản thấp, dùng màu là tín hiệu duy nhất (báo lỗi), thiếu thẻ Alt text cho ảnh. |
| Vận động (Motor) | Nút bấm quá nhỏ, flow bắt buộc phải kéo thả chuột (drag/drop), hệ thống không hỗ trợ điều hướng Keyboard. |
| Nhận thức (Cognitive) | Ngôn ngữ chuyên ngành phức tạp, quá nhiều lựa chọn CTA, flow steps không rõ ràng, thông báo lỗi khó hiểu. |
| Thính lực (Auditory) | Video onboarding/hướng dẫn không có Caption/Subtitles hoặc Transcript. |
| Tạm thời / Bối cảnh | Tay đang xách đồ (dùng 1 tay), đi ngoài trời nắng gắt (chói), dùng trong môi trường cực ồn ào. |

---

## 19. Đạo đức trong User Testing (Ethics Checklist)

- **Tự nguyện** — Participant có quyền đồng ý hoặc từ chối tham gia bất cứ lúc nào.
- **Minh bạch** — Nói rõ mục đích, thời lượng, các loại dữ liệu sẽ thu thập (âm thanh/video).
- **Không gây hại** — Tránh task gây căng thẳng tâm lý quá mức hoặc rủi ro tài chính.
- **Tôn trọng** — Không phán xét khi user mắc lỗi. Lỗi nằm ở Thiết kế, không phải ở User!
- **Bảo mật** — Chỉ thu thập dữ liệu cần thiết, ẩn danh P01, P02. Che data nhạy cảm.
- **Quyền rút lui** — Participant có thể dừng phiên test bất kỳ lúc nào không cần lý do.

### Informed Consent & Quyền riêng tư

**Cần có trong Consent Form:**
- Mục đích của phiên test.
- Hoạt động cụ thể user sẽ làm.
- Thời lượng dự kiến.
- Loại dữ liệu thu thập (Note, survey, video, voice, screen).
- Cách sử dụng dữ liệu & Quyền từ chối.

**Khi quay phim/ghi âm:**
- Bắt buộc xin phép rõ ràng trước khi bấm Record.
- Yêu cầu đóng các Tab nhạy cảm trước khi share screen.
- Chỉ dùng tài khoản test & dữ liệu giả (Dummy data).
- Tạm dừng record nếu user phải nhập data thật nhạy cảm.
- Che/Mask dữ liệu mật khẩu, tài khoản trước khi share báo cáo.

---

## 20. Live Usability Testing

**Giới thiệu sản phẩm:** Web app demo của nhóm đã được deploy trên Vercel.

**Cách thức tham gia:** Quét QR Code hoặc truy cập Link trên điện thoại/laptop cá nhân.

**Bối cảnh:** Sản phẩm phục vụ đối tượng XYZ, giúp giải quyết bài toán ABC.

**Tài khoản kiểm thử** (trường hợp đăng ký không thành công):
- Email: `cust<num>@cust.vn` (trong đó `<num>` là số từ 1 đến 10)
- Mật khẩu: `Abc123!!`
- Link: https://lumierecinema-testing-demo-ui.vercel.app/

### Mini Exercise

Các bạn hãy truy cập Moodle để tải file bài tập và file đặc tả trước khi bắt đầu.

### Hướng dẫn trước khi bắt đầu (Informed Consent live)

| Bước | Nội dung thông báo cho Participant |
|---|---|
| Mục đích | "Đánh giá trải nghiệm demo, đối chiếu số liệu tại lớp & pre-test ngoài." |
| Hoạt động | "Anh/chị thực hiện 1–2 tác vụ ngắn, sau đó điền feedback Form." |
| Thời lượng | "Chỉ khoảng 5–7 phút cho toàn bộ phiên test." |
| Dữ liệu | "Chỉ thu thập câu trả lời Form ẩn danh, KHÔNG ghi hình, KHÔNG thu data cá nhân." |
| Quyền rút lui | "Hoàn toàn tự nguyện, anh/chị có thể dừng tham gia bất kỳ lúc nào." |

### Giao Task

> "Bạn muốn tìm hiểu về [Chủ đề X]. Hãy sử dụng sản phẩm để tìm thông tin đó và hoàn thành [Hành động Y]."

Chỉ nêu **mục tiêu** cuối cùng. User tự tìm cách. Thời gian thực hiện: 2–4 phút.

### Thu thập Feedback

Quét QR để điền Form Phản Hồi (2–3 phút).

---

## Q&A

Cảm ơn thầy cô và các bạn đã chú ý lắng nghe.

# Kế hoạch usability test — U-01

- Ngày: 2026-07-27
- Website: http://localhost:5173
- Flow: U-01 — Tìm kiếm sản phẩm → Xem chi tiết → Thêm giỏ hàng → Áp mã giảm giá → Checkout
- FR liên quan: FR-05 (tìm kiếm & danh sách sản phẩm), FR-06 (xem chi tiết sản phẩm), FR-07 (giỏ hàng), FR-09 (mã giảm giá), FR-08 (thanh toán)
- Timebox: **3 phút/người** *(điều chỉnh sau pilot — xem mục "Điều chỉnh sau pilot")*
- Người điều phối: nlhakhoa23@clc.fitus.edu.vn
- Thiết bị/trình duyệt test chính: Laptop Windows 11, Chrome 126, cửa sổ 1440×900
- Số phiên: 7 người chính (P01–P07) + 1 pilot (P00 — đã chạy)
- Hình thức: Moderated, in-person, think-aloud
- Phiên bản kịch bản: **v2 (sau pilot)** — áp dụng thống nhất cho cả P01–P07

---

## Mục tiêu

Ba câu hỏi kiểm chứng được, mỗi câu trả lời được bằng số liệu trong session log:

1. **Người dùng mới có tự hoàn tất đơn hàng có áp mã giảm giá trong 3 phút mà không cần moderator can thiệp không?**
   → đo bằng `Outcome` (`SUCCESS_UNASSISTED` vs các giá trị còn lại) và số `intervention`.
2. **Người dùng có tự tìm ra chỗ nhập mã giảm giá không, hay đi tìm ở trang Giỏ hàng trước?**
   → đo bằng số `wrong turn` vào trang Giỏ hàng sau khi đã được giao nhiệm vụ có mã, và `hesitation ≥ 5s` tại màn hình Giỏ hàng/Checkout.
3. **Trước khi bấm xác nhận thanh toán, người dùng có đối chiếu lại số tiền cuối cùng không?**
   → đo bằng quan sát hành vi (có quay lại nhìn/đọc to số tiền trước khi bấm) + câu hỏi mở nhóm Trust.

_Vì sao chọn 3 câu này:_ câu 1 đo hiệu quả tổng thể (effectiveness), câu 2 nhắm vào một điểm nghi
ngờ cụ thể của thiết kế — ô nhập mã giảm giá nằm ở **trang Checkout** chứ không nằm ở trang Giỏ
hàng, trong khi tên flow và thói quen từ Shopee/Lazada khiến người dùng dễ tìm ở Giỏ hàng trước.
Câu 3 nhắm vào sự tin tưởng vào con số cuối cùng — màn hình Checkout cho phép **sửa trực tiếp ô
"Tổng tiền thanh toán"**, nên việc người dùng có kiểm chứng lại hay không là một tín hiệu đáng đo.

---

## Task scenario

> Bạn đang muốn mua một món phụ kiện công nghệ **dưới 10 triệu đồng** để tự thưởng cho mình.
> Bạn vừa nhận được mã giảm giá **VIP100** từ chương trình khuyến mãi của EShop.
> Hãy tìm một sản phẩm phù hợp với ngân sách, xem kỹ thông tin sản phẩm trước khi quyết định, rồi
> hoàn tất việc đặt hàng có sử dụng mã giảm giá đó.

**Vì sao kịch bản dừng ở đây:** kịch bản nêu _mục tiêu_ (mua phụ kiện, có ngân sách, có mã giảm
giá) và để người tham gia tự tìm đường. Không có câu nào chỉ ra phải bấm nút nào, vào trang nào,
hay nhập mã ở đâu — nếu chỉ ra thì chính câu hỏi mục tiêu số 2 sẽ không còn đo được gì.

**Ràng buộc tạo ra điểm quyết định thật:** với ngân sách dưới 10 triệu, danh mục hiện có **2 sản
phẩm hợp lệ** (Tai nghe AirPods Pro 2 — 6.000.000 ₫ và Bàn phím cơ Keychron Q1 — 4.000.000 ₫) và
3 sản phẩm vượt ngân sách (28–45 triệu). Người tham gia phải thật sự lọc, không có đường đi duy nhất.

---

## Điều kiện

- **Bắt đầu:** trình duyệt đã mở `http://localhost:5173`, trang chủ đã tải xong, **đã đăng nhập sẵn**
  bằng tài khoản test, giỏ hàng rỗng, ô tìm kiếm trống, chưa cuộn trang.
- **Thành công:** màn hình hiển thị **"Thanh toán thành công!"**, và trước khi bấm xác nhận đã quan
  sát được mã giảm giá áp dụng thành công ở bước Checkout (xuất hiện dòng `Tiết kiệm: 100.000 ₫`).
- **Thất bại:** bỏ cuộc, hết timebox 3 phút, hoặc bị kẹt không phục hồi và không đến được trạng
  thái thành công.
- **Deviation:**
  - Nếu mã `VIP100` báo đã đạt giới hạn số lần dùng → **dừng đồng hồ**, khởi động lại backend để
    reseed dữ liệu, cho người tham gia thử lại, ghi lại là deviation (xem checklist trước phiên).
  - Nếu người tham gia **tự ý thử một mã khác** (`SAVE10`, `BIGBUY`, `EXPIRED`…) → **không ngăn cản**,
    ghi lại nguyên văn mã đã nhập, phản hồi hệ thống và phản ứng của họ. Đây là dữ liệu quan sát
    hợp lệ, không tính là deviation.
  - Nếu ảnh sản phẩm không tải được (ảnh trỏ ra domain ngoài `placehold.co`, phụ thuộc mạng) → ghi
    deviation và cho phiên tiếp tục.

### Vì sao đăng nhập sẵn trước khi tính giờ

Trang Giỏ hàng chặn thao tác thanh toán nếu chưa đăng nhập (hiện `alert` rồi chuyển sang trang
Đăng nhập). Flow U-01 **không bao gồm** FR-01/FR-02, nên nếu để người tham gia tự đăng nhập thì:
(a) timebox 3 phút bị tiêu vào phần ngoài phạm vi, (b) các phiên không còn so sánh được với nhau
vì người có tài khoản sẵn và người phải đăng ký sẽ mất thời gian rất khác nhau. Vì vậy đăng nhập
sẵn là một phần của **start state chuẩn hoá**, không phải sự trợ giúp.

Tài khoản dùng cho mọi phiên: `test@eshop.com` / `Test1234!` (tài khoản seed sẵn của SUT).

### Vì sao kịch bản dùng mã VIP100 chứ không phải SAVE10

Đã kiểm chứng trực tiếp qua API `POST /api/apply-coupon` trước khi viết kế hoạch này:

| Mã        | Loại                                                         | Kết quả với đơn 30.000.000 ₫                                                          | Dùng được trong kịch bản? |
| --------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------- | ------------------------- |
| `VIP100`  | fixed 100.000 ₫, đơn tối thiểu 300.000 ₫, tối đa 2 lần/người | giảm đúng 100.000 ₫ → còn 29.900.000 ₫                                                | ✅ **Dùng mã này**        |
| `BIGBUY`  | fixed 50.000 ₫, đơn tối thiểu 500.000 ₫, tối đa 1 lần/người  | giảm đúng 50.000 ₫                                                                    | Dự phòng                  |
| `SAVE10`  | percent 10%, đơn tối thiểu 300.000 ₫                         | **tổng tiền tăng lên 300.000.000 ₫** trong khi vẫn báo "Áp dụng thành công! Giảm 10%" | ❌ **Không dùng**         |
| `EXPIRED` | percent 20%, đã hết hạn                                      | bị từ chối đúng: "Mã giảm giá đã hết hạn"                                             | ❌ Không dùng             |

`SAVE10` bị lỗi tính toán nghiêm trọng ở backend. Nếu đưa mã này vào kịch bản, cả 7 phiên sẽ bị
một lỗi **chức năng** chi phối và nghiên cứu sẽ không còn đo được **usability của flow** nữa. Lỗi
này cần được ghi nhận riêng thành bug report chức năng, không nhập chung vào nghiên cứu usability.

> **Ranh giới quan trọng khi chấm "Thành công":** điều kiện thành công là _áp được mã và tới màn
> hình xác nhận_, **không** phải _số tiền giảm đúng_. Tính đúng/sai của số tiền là kiểm thử chức
> năng; nếu đặt nó làm tiêu chí thành công thì mọi phiên đều "thất bại" vì lỗi backend chứ không
> phải vì vấn đề usability.

---

## Công cụ đánh giá (Instrument)

**Thang đo chuẩn: SUS (System Usability Scale)** — 10 item, thang Likert 1–5
(1 = Hoàn toàn không đồng ý, 5 = Hoàn toàn đồng ý). Thực hiện **ngay sau khi kết thúc task, trước
các câu hỏi mở**. Người tham gia thuộc nhóm không chuyên IT nên SUS phù hợp: dễ đọc, dễ trả lời,
dễ quy đổi ra một con số so sánh được.

Nội dung 10 item (lấy nguyên văn từ `instruments_reference.md`):

| #   | Nội dung item                                                            | Điểm (1–5) |
| --- | ------------------------------------------------------------------------ | ---------- |
| 1   | Tôi nghĩ tôi sẽ muốn dùng hệ thống này thường xuyên.                     |            |
| 2   | Tôi thấy hệ thống này phức tạp một cách không cần thiết.                 |            |
| 3   | Tôi thấy hệ thống này dễ sử dụng.                                        |            |
| 4   | Tôi nghĩ mình cần người rành kỹ thuật hỗ trợ mới dùng được hệ thống này. |            |
| 5   | Tôi thấy các chức năng trong hệ thống này được tích hợp tốt với nhau.    |            |
| 6   | Tôi thấy hệ thống này có quá nhiều điểm thiếu nhất quán.                 |            |
| 7   | Tôi nghĩ hầu hết mọi người sẽ học cách dùng hệ thống này rất nhanh.      |            |
| 8   | Tôi thấy hệ thống này rất cồng kềnh, bất tiện khi dùng.                  |            |
| 9   | Tôi cảm thấy rất tự tin khi dùng hệ thống này.                           |            |
| 10  | Tôi cần học nhiều thứ trước khi có thể bắt đầu dùng hệ thống này.        |            |

**Công thức tính điểm** (chỉ áp dụng ở Phase 3, không quy đổi tại chỗ để tránh sai số cộng dồn):

- Item lẻ (1, 3, 5, 7, 9): điểm đóng góp = (giá trị người dùng chọn) − 1
- Item chẵn (2, 4, 6, 8, 10): điểm đóng góp = 5 − (giá trị người dùng chọn)
- Tổng 10 điểm đóng góp (0–40) × 2.5 = điểm SUS cuối cùng (0–100)

**Thang xếp loại:** > 85 = A (Tuyệt vời) · 73–85 = B (Tốt) · 52–72 = C (Trung bình) · < 51 = D/F (Kém, cần thiết kế lại)

### Câu hỏi mở (probe questions)

Hỏi **sau** khi điền SUS. Giọng trung lập — không có câu nào gợi sẵn câu trả lời hay ám chỉ rằng
có vấn đề tồn tại. Mỗi nhóm có 2 câu; nếu hết giờ, hỏi ít nhất câu đầu của mỗi nhóm.

| Nhóm               | Câu hỏi                                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| **Clarity**        | 1. Ở bước nhập mã giảm giá, bạn tìm thấy chỗ nhập mã bằng cách nào?                                                        |
|                    | 2. Khi xem trang thông tin chi tiết của sản phẩm, những gì hiển thị ở đó có đủ để bạn quyết định mua chưa?                 |
| **Error recovery** | 1. Nếu lúc nãy bạn muốn đổi sang một sản phẩm khác sau khi đã thêm vào giỏ, bạn sẽ làm thế nào?                            |
|                    | 2. Trong lúc thao tác, có lúc nào bạn nghĩ mình vừa làm sai một bước không? Lúc đó bạn đã làm gì tiếp theo?                |
| **Speed**          | 1. Từ lúc bắt đầu tìm sản phẩm đến lúc đặt xong, bạn thấy mất nhiều thời gian hơn hay ít hơn so với bạn hình dung ban đầu? |
|                    | 2. Có bước nào bạn thấy mình phải lặp lại thao tác nhiều lần không?                                                        |
| **Trust**          | 1. Số tiền cuối cùng hiển thị trước khi bấm xác nhận — bạn có đối chiếu lại với giá sản phẩm không? Vì sao?                |
|                    | 2. Nếu đây là tiền thật của bạn, bạn có bấm "Xác Nhận Thanh Toán" ở màn hình đó không?                                     |

---

## Checklist trước phiên

**Chuẩn bị hệ thống (làm lại trước mỗi phiên, không phải một lần cho cả 7 phiên):**

- [ ] **Khởi động lại backend để reseed dữ liệu.** `initDatabase()` trong `backend/database.js`
      chạy `DROP TABLE` rồi seed lại mỗi lần khởi động, nên restart sẽ xoá sạch bảng `coupon_usage`.
      **Bắt buộc** vì `VIP100` giới hạn 2 lần/người mà cả 7 phiên đều dùng chung một tài khoản
      `test@eshop.com` — không reset thì từ phiên thứ 3 trở đi mã sẽ bị từ chối.
- [ ] Kiểm tra frontend `http://localhost:5173` tải được và backend `http://localhost:3000` phản hồi.
- [ ] Thử áp `VIP100` một lần để chắc chắn mã còn hiệu lực, **rồi restart backend lần nữa** để xoá
      lượt dùng thử này.
- [ ] Đăng nhập sẵn `test@eshop.com` / `Test1234!`.
- [ ] Đưa trình duyệt về start state: trang chủ, giỏ hàng rỗng, ô tìm kiếm trống, cửa sổ 1440×900.
- [ ] Kiểm tra ảnh sản phẩm tải được (phụ thuộc mạng ngoài — `placehold.co`).

**Chuẩn bị phiên:**

- [ ] Có đồng thuận tham gia và đồng thuận ghi màn hình/ghi âm (ghi rõ hình thức: ký hay bằng lời).
- [ ] Phần mềm ghi màn hình đã chạy thử và có tiếng.
- [ ] Đồng hồ bấm giờ sẵn sàng; quy ước rõ thời điểm bắt đầu tính giờ (ngay sau khi đọc xong kịch bản).
- [ ] Phiếu SUS in sẵn hoặc mở sẵn form.
- [ ] Dùng mã P01–P07 (và P00 cho pilot); không ghi dữ liệu cá nhân ngoài mức cần thiết.
- [ ] **Không tập trước flow** cho người tham gia; không cho họ xem người khác làm.
- [ ] Đóng các tab nhạy cảm trên máy trước khi ghi màn hình.

---

## Kịch bản mở đầu (moderator đọc cho người tham gia)

> "Cảm ơn bạn đã dành thời gian tham gia hôm nay.
>
> Trước khi bắt đầu, mình muốn nói rõ một điều quan trọng: **hôm nay mình kiểm tra sản phẩm, không
> phải kiểm tra bạn.** Không có câu trả lời đúng hay sai, và bạn cũng không cần cố gắng làm cho
> đúng. Nếu bạn thấy chỗ nào khó hiểu hay bị kẹt, thì đó chính là thông tin mình cần — nó cho thấy
> sản phẩm đang có vấn đề, chứ không phải bạn làm sai.
>
> Trong lúc thao tác, bạn hãy **nói ra thành lời những gì bạn đang nghĩ**: bạn đang tìm gì, bạn
> đang định bấm vào đâu, vì sao bạn chọn như vậy, chỗ nào làm bạn phân vân. Nghe hơi lạ lúc đầu
> nhưng bạn cứ nói tự nhiên, nghĩ gì nói nấy.
>
> Mình sẽ ngồi quan sát và hạn chế trả lời trong lúc bạn làm, không phải vì mình không muốn giúp,
> mà vì mình cần thấy trải nghiệm thật của bạn khi không có ai hướng dẫn. Nếu bạn kẹt hẳn thì mình
> sẽ vào hỗ trợ.
>
> Buổi này kéo dài khoảng 3 phút cho phần thao tác, sau đó mình xin bạn khoảng 5 phút để điền một
> bảng khảo sát ngắn và trả lời vài câu hỏi.
>
> **Mình xin phép được ghi lại màn hình và ghi âm giọng nói trong buổi hôm nay** — chỉ dùng cho
> mục đích phân tích của bài tập môn học, không chia sẻ ra ngoài, và trong báo cáo bạn sẽ chỉ được
> ghi bằng mã (ví dụ P01) chứ không ghi tên. Bạn có đồng ý không?
>
> Bạn có thể dừng lại hoặc rút khỏi buổi test bất cứ lúc nào mà không cần nêu lý do.
>
> Bạn có câu hỏi gì trước khi mình bắt đầu không?"

**Chỉ bắt đầu sau khi nhận được đồng ý rõ ràng cho việc ghi hình/ghi âm.**

---

## Cách giao task scenario

1. Bật ghi màn hình **trước** khi đọc kịch bản.
2. Đọc **nguyên văn** đoạn task scenario ở mục trên — đọc chậm, có thể đọc lại **y hệt** lần thứ hai
   nếu người tham gia yêu cầu.
3. **Không giải thích thêm, không diễn giải lại bằng từ khác, không gợi ý bước nào.** Nếu người
   tham gia hỏi "mình phải bấm vào đâu?" hoặc "mã giảm giá nhập ở chỗ nào?", trả lời trung lập:
   > "Bạn cứ làm theo cách bạn nghĩ là hợp lý nhé."
4. Đưa mã `VIP100` dưới dạng **văn bản viết sẵn** (mẩu giấy hoặc dán vào ô ghi chú) để người tham
   gia không phải nhớ, và để mọi phiên nhận cùng một thông tin đầu vào.
5. **Bắt đầu bấm giờ ngay sau khi đọc xong** kịch bản.
6. Trong lúc quan sát, chỉ dùng các câu nhắc trung lập:
   - "Bạn đang nghĩ gì vậy?"
   - "Bạn đang định làm gì tiếp theo?"
   - "Bạn có thể nói to suy nghĩ của bạn được không?"
7. **Chỉ can thiệp khi người tham gia kẹt hẳn** (không thao tác gì trong **~30 giây** và tự nói rằng
   không biết làm gì tiếp). Khi can thiệp, ghi lại **nguyên văn câu đã nói**, trạng thái màn hình
   ngay trước đó, và kết quả sau can thiệp — mỗi lần như vậy tính là 1 `intervention` và phiên
   không còn được tính `SUCCESS_UNASSISTED`.
   *(Ngưỡng rút từ 60s xuống 30s sau pilot — xem mục "Điều chỉnh sau pilot".)*

---

## Điều chỉnh sau pilot

Phiên pilot **P00 đã chạy**. Nguồn: [`sessions/P00-pilot.md`](sessions/P00-pilot.md).
Kịch bản chuyển từ **v1 → v2**; v2 là bản dùng cho toàn bộ P01–P07.

| # | Hạng mục | v1 (trước pilot) | v2 (sau pilot) | Căn cứ từ pilot |
| --- | --- | --- | --- | --- |
| 1 | Timebox mỗi phiên | 10 phút | **3 phút** | B1: người pilot hoàn thành trong **1 phút 11 giây**. B2: 10 phút bị đánh giá "quá dài". |
| 2 | Ngưỡng can thiệp của moderator | ~60 giây kẹt | **~30 giây kẹt** | E2: với task chỉ dài ~1 phút, chờ 60 giây là gần bằng toàn bộ thời lượng task nên không còn ý nghĩa. |

**Các hạng mục đã kiểm tra và giữ nguyên** (pilot không phát hiện vấn đề): kịch bản không lộ bước
(A2), không có từ ngữ gây khó hiểu (A4), cách đưa mã `VIP100` tự nhiên (A5), ghi màn hình/ghi âm
đạt (C1), đồng hồ bấm giờ dùng được (C2), mã `VIP100` còn hiệu lực tới bước checkout (C3), quy
trình restart backend reseed đúng (C4), ảnh sản phẩm tải đủ (C5), start state khôi phục được (C6),
không có item SUS nào phải hỏi lại nghĩa (D1), thang 1–5 không bị hiểu ngược (D2), không có câu
hỏi dẫn dắt (D4), moderator không lỡ gợi ý (E1), một người vừa quan sát vừa ghi timeline vẫn kịp (E3).

### Kiểm chứng công cụ SUS bằng dữ liệu pilot

Điểm thô của P00: `1, 1, 5, 1, 3, 3, 4, 1, 3, 1` → áp công thức ở mục Instrument:

- Item lẻ (1,3,5,7,9) = 1,5,3,4,3 → đóng góp (x−1): 0+4+2+3+2 = **11**
- Item chẵn (2,4,6,8,10) = 1,1,3,1,1 → đóng góp (5−x): 4+4+2+4+4 = **18**
- Tổng 29 × 2.5 = **SUS 72.5 → xếp loại C (Trung bình)**

Con số này chỉ dùng để xác nhận **công thức và phiếu SUS chạy đúng**. Theo quy định ở Step 5 của
skill, **P00 không được đưa vào số liệu tổng hợp Phase 3**.

### Hai điểm còn mở — cần chốt trước khi chạy P01

1. **Ngân sách trong kịch bản: 10 triệu hay 50 triệu?**
   Test plan (mục Task scenario) ghi **"dưới 10 triệu"**, nhưng dòng A3 trong file pilot lại ghi
   **"dưới 50 triệu"**. Đây là khác biệt có ảnh hưởng thật: với mốc 10 triệu chỉ có **2/5 sản phẩm**
   hợp lệ (AirPods 6 triệu, Keychron 4 triệu) nên người tham gia buộc phải lọc; với mốc 50 triệu thì
   **cả 5/5 sản phẩm** đều hợp lệ và bước lọc biến mất — đúng như A3 đã ghi nhận là ràng buộc
   *không* tạo ra lựa chọn thật. Hiện test plan vẫn giữ **10 triệu**; nếu pilot thực tế chạy bằng
   50 triệu thì phải sửa lại đây cho khớp trước khi chạy P01.
2. **Câu Clarity 1 chưa moi được thông tin cần.**
   Người pilot trả lời `"Nhập vào ô"` — đó là mô tả *thao tác*, không trả lời được *làm cách nào
   tìm ra chỗ nhập*, trong khi đây chính là dữ liệu cho **mục tiêu số 2**. Đề xuất thêm một câu hỏi
   đuôi trung lập khi gặp câu trả lời kiểu này:
   > "Trước khi tìm thấy ô đó, bạn có nhìn qua chỗ nào khác không?"

---

## Liên kết

- Danh sách người tham gia: [`recruitment-tracker.md`](recruitment-tracker.md)
- Kết quả pilot: [`sessions/P00-pilot.md`](sessions/P00-pilot.md)
- Nhật ký 7 phiên chính: `sessions/P01.md` … `sessions/P07.md`
- Định nghĩa Outcome/Error/Wrong turn/Hesitation/Intervention: nhúng sẵn trong mỗi file phiên,
  áp dụng thống nhất cho cả 8 phiên.

---

## Trạng thái tài liệu

- **Phase 1 — Plan:** hoàn tất, đã cập nhật theo kết quả pilot (kịch bản v2).
- **Pilot P00:** đã chạy, đã chốt thay đổi.
- **Phase 2 — Conduct:** chưa chạy. 7 file `sessions/P01.md`–`P07.md` đang ở dạng template rỗng.
- **Phase 3 — Analyse:** chưa bắt đầu; chỉ thực hiện sau khi cả 7 phiên đã có dữ liệu thật.

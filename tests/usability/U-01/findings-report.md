# Báo cáo usability testing — U-01

> Tổng hợp từ 7 session log thật (P01–P07) + 1 pilot (P00, không tính vào số liệu tổng hợp), đúng
> theo Phase 3 của `usability-evaluation-builder`. Mọi finding dưới đây trỏ về ít nhất một session
> cụ thể — không có finding nào suy diễn từ dữ liệu chưa quan sát được.

## Phạm vi và phương pháp

- Website: http://localhost:5173
- Flow: U-01 — Tìm kiếm sản phẩm → Xem chi tiết → Thêm giỏ hàng → Áp mã giảm giá → Checkout
- FR liên quan: FR-05, FR-06, FR-07, FR-09, FR-08
- Ngày test: 29/07/2026 (pilot) và 30/07–02/08/2026 (P01–P07)
- Mẫu: 7 người tham gia thật (P01–P07) + 1 pilot P00 (không tính vào số liệu tổng hợp)
- Phương pháp: moderated, in-person, think-aloud, timebox 3 phút/người (10 phút cho pilot và P01
  trước khi rút ngắn sau pilot)
- Thang đo: SUS (System Usability Scale), 10 item, thực hiện ngay sau task
- Deviation/giới hạn:
  - Thiết bị/trình duyệt không đồng nhất giữa các phiên: P01–P04 và P06 chạy trên Windows (Edge/
    không xác định trình duyệt với P06), P05 và P07 chạy trên macOS Chrome — test-plan không bắt
    buộc một thiết bị chuẩn hoá, mỗi người dùng thiết bị quen thuộc của họ. Sự khác biệt trình
    duyệt là biến số chưa kiểm soát khi so sánh thời gian giữa các phiên.
  - Timebox đổi từ 10 phút (pilot, P01) xuống 3 phút (P02–P07) sau khi pilot cho thấy task chỉ mất
    ~1 phút thực tế — P01 không hoàn toàn so sánh được với P02–P07 về mặt áp lực thời gian.
  - Backend nghi ngờ chưa được reseed đầy đủ giữa một số phiên (xem giới hạn ở mục Kết luận).

## Kết quả tổng quan

| Participant | Outcome | Thời gian (s) | Error | Wrong turn | Hesitation | Intervention | SUS |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| P01 | SUCCESS_UNASSISTED | 71 | 0 | 0 | 0 | 0 | 40.0 |
| P02 | SUCCESS_UNASSISTED | 66 | 0 | 0 | 0 | 0 | 67.5 |
| P03 | SUCCESS_UNASSISTED | 57 | 0 | 1 | 1 | 0 | 87.5 |
| P04 | SUCCESS_UNASSISTED | 136 | 0 | 0 | 0 | 0 | 60.0 |
| P05 | SUCCESS_UNASSISTED | 57 | 0 | 0 | 0 | 0 | 82.5 |
| P06 | SUCCESS_UNASSISTED | 48 | 1 | 0 | 0 | 0 | 62.5 |
| P07 | SUCCESS_UNASSISTED | 72 | 0 | 0 | 0 | 0 | 47.5 |

- **Tỷ lệ hoàn thành không trợ giúp:** 7/7 = **100%**
- **Tỷ lệ hoàn thành có trợ giúp:** 7/7 = **100%** (không có `SUCCESS_ASSISTED`, `FAIL`, hay
  `ABANDONED` nào — 0 intervention ở toàn bộ 7 phiên)
- **Median thời gian hoàn thành:** **66 giây** (dải 48–136s; dùng median thay vì trung bình cộng vì
  mẫu nhỏ và không phân phối chuẩn — P04 ở 136s là ngoại lệ kéo lệch nếu dùng trung bình cộng)
- **Điểm SUS trung bình:** **63,93 / 100** — **Điểm SUS median: 62,5 / 100**, xếp loại **C (Trung
  bình)** theo thang tham chiếu (>85 A · 73–85 B · 52–72 C · <51 D/F)
- **Phân bố xếp loại SUS từng người:** P01 D/F (40) · P07 D/F (47,5) · P04 C (60) · P02 C (67,5) ·
  P06 C (62,5) · P05 B (82,5) · P03 A (87,5) — **phân tán rất rộng**, không có sự đồng thuận về
  chất lượng trải nghiệm giữa 7 người, đáng chú ý hơn cả bản thân con số trung bình

## Findings

### F-01 — Phản hồi khi bấm "Thêm vào giỏ hàng" yếu hoặc biến mất quá nhanh, khiến người dùng nghi ngờ đã thêm thành công hay chưa

- Flow: U-01 (bước FR-07)
- FR liên quan: FR-07
- Frequency: **5/7** (P01, P02, P03, P04, P06)
- Bằng chứng:
  - P01 (00:12): bấm nút 2 lần, "lần đầu nhấn không đổi"; probe Error recovery Q2: *"Nút thêm vào
    giỏ hàng ở trang danh sách không có phản hồi --&gt; Thêm nhiều lần"*
  - P02 (00:12–00:21, video): nhãn nút giữ nguyên "Thêm vào giỏ hàng" suốt ~9 giây dù đã bấm, chỉ
    đổi thành "Đã thêm" sau nhiều lần bấm
  - P03: probe Error recovery Q2: *"tôi bấm 1 lần không được, tôi bấm thử 2 lần... thì được"*
  - P04 (01:00, video): nhãn "Đã thêm" tự động **biến mất sau ~2 giây** (hành vi `setTimeout` có
    chủ đích trong code) trong khi việc thêm **đã thành công thật**; quote: *"À phải bấm 1-2 lần
    hả, nó hiện chữ đã thêm nhưng nếu mình không nhìn là không biết được luôn, cũng không có hiện
    số trên nút giỏ hàng luôn"*
  - P06: probe Error recovery Q1: *"nó không hề có thông báo tôi đã thêm giỏ hàng thành công nên
    tôi không thể biết được là tôi đã thêm đồ vào giỏ hàng được hay chưa"*
- Tác động đến task: Không gây `FAIL` ở phiên nào (mọi người cuối cùng đều hoàn tất), nhưng gây
  thao tác thừa (bấm lại, mở giỏ hàng để xác minh) ở đa số phiên, và là tiền đề trực tiếp dẫn tới
  F-02 (giỏ hàng bị nhân đôi)
- Severity: **3 — Major** (làm chậm đáng kể, gây thao tác lặp ở hơn 70% số phiên, và là nguyên
  nhân gốc của một finding Major khác)
- Lý do severity: Tần suất cao (5/7), có bằng chứng video trực tiếp (không chỉ tự thuật), và hệ quả
  dây chuyền sang lỗi nghiêm trọng hơn (F-02) làm tăng mức độ nghiêm trọng thực tế so với một lỗi
  feedback đơn thuần
- Nguyên nhân khả dĩ: Xem `BUG-PRODDETAIL-001` (lần bấm đầu không có tác dụng) và
  `BUG-PRODDETAIL-009` (phản hồi mờ nhạt, tự tắt sau 2s, không có badge đếm ở giỏ hàng) — đã ghi
  nhận ở Task 1
- Đề xuất: (1) Bỏ cơ chế `clickCount` khiến lần bấm đầu bị bỏ qua; (2) giữ trạng thái "Đã thêm" cho
  tới khi người dùng điều hướng đi thay vì tự tắt sau 2 giây; (3) thêm badge số lượng trên biểu
  tượng giỏ hàng ở header để xác nhận tức thời không cần mở trang Giỏ hàng
- Tiêu chí xác minh: Re-test 7 người mới — tỷ lệ phiên phải bấm ≥2 lần hoặc phải mở Giỏ hàng để xác
  minh giảm xuống dưới 1/7

### F-02 — Giỏ hàng không gộp số lượng khi thêm cùng sản phẩm nhiều lần, tạo dòng trùng lặp làm sai tổng tiền

- Flow: U-01 (bước FR-07)
- FR liên quan: FR-07
- Frequency: **3/7** (P01, P06, P07) — trong đó **2/7 có bằng chứng video trực tiếp** (P01, P07),
  **1/7 chỉ có tự thuật qua probe** (P06 — video của P06 không quan sát được chính xác thao tác
  này, xem ghi chú "cần xác minh" trong `P06.md`)
- Bằng chứng:
  - P01 (00:40, video + quote): giỏ hàng hiện AirPods Pro 2 thành **nhiều dòng riêng biệt**; quote:
    *"Ủa sao nó không gom lại cho chị mà nó thành nhiều mã vậy"*
  - P06: probe Error recovery Q2: *"tôi đã bấm 2 lần vào nút thêm vào giỏ. Thì sau khi mở giỏ hàng
    lên thì tôi thấy nó có 2 món hàng bị trùng thì tôi đã xóa đi 1 món hàng"*
  - P07 (00:36 và 00:51, video — **tái hiện độc lập 2 lần trong cùng một phiên**): thêm Samsung
    Galaxy S24 Ultra SL 3 tạo **2 dòng trùng** (168.000.000 ₫ thay vì 84.000.000 ₫); lần đầu người
    tham gia tự phát hiện và xoá bớt 1 dòng, nhưng lần thứ hai (khi quay lại thêm sản phẩm đó lần
    nữa) lỗi **tái diễn y hệt** và **không được phát hiện lại** — phiên kết thúc bằng đơn hàng thật
    trị giá 167.900.000 ₫, gần gấp đôi số tiền người tham gia thực sự định trả (84.000.000 ₫)
- Tác động đến task: Ở P07, hậu quả là một **đơn hàng thật với số tiền sai gần gấp đôi ý định ban
  đầu**, không bị chặn lại ở bất kỳ bước nào của flow (kể cả bước Checkout xem lại đơn hàng)
- Severity: **4 — Catastrophe** (khi không được người dùng tự phát hiện, lỗi này dẫn thẳng tới một
  giao dịch tiền thật sai lệch nghiêm trọng mà hệ thống không có cơ chế nào ngăn hoặc cảnh báo)
- Lý do severity: Dù frequency (3/7) thấp hơn F-01, hậu quả tài chính thực tế đã xảy ra thật trong
  1/7 phiên (P07) — đây là mức độ nghiêm trọng cao nhất quan sát được trong toàn bộ nghiên cứu, và
  bằng chứng video xác nhận đây là lỗi **tái diễn có hệ thống**, không phải sự cố ngẫu nhiên
- Nguyên nhân khả dĩ: `BUG-PRODDETAIL-003` — `CartContext.jsx` luôn `push` một phần tử giỏ hàng mới
  mỗi lần gọi `addToCart`, không kiểm tra sản phẩm đã tồn tại trong giỏ để cộng dồn số lượng
- Đề xuất: Sửa `addToCart` để kiểm tra `product.id` đã có trong giỏ hay chưa — nếu có, cộng dồn
  `quantity` vào dòng hiện hữu thay vì tạo phần tử mới. Đây là **ưu tiên sửa cao nhất** trong toàn
  bộ nghiên cứu vì đã gây thiệt hại tài chính thật trong dữ liệu thu thập được
- Tiêu chí xác minh: Thêm cùng một sản phẩm 2 lần liên tiếp (có hoặc không rời trang giữa hai lần)
  → giỏ hàng phải luôn hiện đúng **1 dòng** với số lượng cộng dồn, không có trường hợp nào tạo dòng
  thứ hai

### F-03 — Trang chi tiết sản phẩm thiếu thông tin (đặc biệt là ảnh thật) khiến người dùng thiếu tự tin khi quyết định mua

- Flow: U-01 (bước FR-06)
- FR liên quan: FR-06
- Frequency: **7/7** — tần suất cao nhất trong toàn bộ nghiên cứu, mọi người tham gia đều có nhận
  xét tiêu cực hoặc dè dặt về mức độ đầy đủ thông tin
- Bằng chứng (nguyên văn trả lời probe Clarity Q2 — "những gì hiển thị có đủ để quyết định mua
  chưa"):
  - P01: *"Chưa, ít thông tin, chỉ có giá"*
  - P02: *"Phân vân"*
  - P03: *"Chưa thấy được hình ảnh nhưng thôi biết dược các mặt hàng này nổi tiếng nên yên tâm
    mua"* — chấp nhận được nhờ tin vào thương hiệu, không phải nhờ thông tin trên trang
  - P04: *"Không đủ, rất là thiếu thông tin trầm trọng... Thiếu thumbnail, hình minh họa sản phẩm,
    thiếu độ tin cậy để mua sản phẩm"* — kèm quote thời gian thực ở Timeline: *"Ở đây có cái không
    uy tín là không có ảnh, chỉ có tên sản phẩm với giá tiền thôi"*
  - P05: *"Thiếu ảnh, nhưng về cơ bản là đủ các thông tin tôi cần biết"*
  - P06: không đánh giá trực tiếp đủ/thiếu nhưng phàn nàn *"thiết kế ô hiển thị sản phẩm khá là đơn
    điệu"*
  - P07: *"Chưa, thiếu ảnh, không có ai review, thông tin mô tả không có ý nghĩa"*
- Tác động đến task: Không chặn hoàn thành task ở phiên nào (7/7 vẫn `SUCCESS_UNASSISTED`), nhưng
  là nguồn than phiền nhất quán nhất — cho thấy đây là vấn đề **niềm tin/chuyển đổi** (conversion)
  hơn là vấn đề khả năng thao tác
- Severity: **2 — Minor** (người dùng luôn tự vượt qua được, nhưng tần suất 7/7 cho thấy đây là
  điểm yếu mang tính hệ thống của thiết kế, không phải cá biệt)
- Lý do severity: Task vẫn hoàn thành 100%, nên không thể xếp Major/Catastrophe theo đúng định
  nghĩa (không làm chậm đáng kể hay đe doạ thất bại task); nhưng tần suất tuyệt đối (7/7) là lý do
  để không hạ xuống Cosmetic
- Nguyên nhân khả dĩ: SUT dùng ảnh placeholder dạng chữ (`placehold.co`) thay vì ảnh sản phẩm thật,
  và mô tả sản phẩm chỉ có 1 dòng ngắn — đây là đặc điểm dữ liệu demo của SUT, một phần chồng lấn
  với `BUG-PRODDETAIL-010` (ảnh vỡ nét khi phóng to) và `BUG-PRODDETAIL-011` (thiếu tồn kho, sản
  phẩm liên quan), nhưng **bản thân việc không có ảnh thật không có bug report riêng** ở Task 1 —
  đáng bổ sung
- Đề xuất: Thêm ảnh sản phẩm thật (không phải placeholder chữ), mở rộng mô tả sản phẩm, và cân nhắc
  thêm chỉ báo tồn kho/đánh giá — đúng như đề xuất đã có ở `BUG-PRODDETAIL-011`
- Tiêu chí xác minh: Re-test với ảnh + mô tả thật — tỷ lệ probe Clarity Q2 trả lời "đủ thông tin"
  không kèm điều kiện (như "nhưng thiếu ảnh") tăng lên ≥ 6/7

### F-04 — Gần một nửa số người tham gia không tin tưởng đủ để xác nhận thanh toán nếu là tiền thật

- Flow: U-01 (bước FR-08)
- FR liên quan: FR-08
- Frequency: **3/7 từ chối rõ ràng** (P01, P04, P07); 3/7 đồng ý — 1/7 né tránh không trả lời rõ
  ràng (P02)
- Bằng chứng (nguyên văn trả lời probe Trust Q2):
  - P01: *"Không"*
  - P02: *"Tui không có tiền"* (không xác nhận Có/Không rõ ràng)
  - P03: *"Có, tôi vẫn bấm xác nhận"*
  - P04: *"Đương nhiên là không rồi, vì nếu có mình sẽ lên shopee, tiktok hoặc ra ngoài mua với
    những món đồ công nghệ mắc tiền"*
  - P05: *"Có"*
  - P06: *"Nếu như đây là web thật thì oke thôi"* (đồng ý có điều kiện — phân biệt được đây là bản
    demo)
  - P07: *"Không"*
- Tác động đến task: Không ảnh hưởng tới việc hoàn thành task trong phiên test (môi trường không có
  rủi ro tài chính thật), nhưng là tín hiệu attitudinal quan trọng cho khả năng chuyển đổi thật nếu
  đây là sản phẩm thương mại
- Severity: **1 — Cosmetic đến Minor** theo thang hành vi (không cản trở task nào trong nghiên cứu
  này), nhưng đáng được đọc cùng F-02 và F-03 — 2 trong 3 người từ chối tin tưởng (P04, P07) đều là
  những người gặp trực tiếp lỗi nghiêm trọng (P07 gặp F-02, P04 gặp F-01 rõ nhất) trong chính phiên
  của họ, gợi ý mối liên hệ nhân quả giữa trải nghiệm lỗi và mức độ tin tưởng — **cần nghe audio để
  xác nhận**, đây chỉ là quan sát tương quan từ dữ liệu văn bản
- Lý do severity: Không đo được bằng metric hành vi trong phạm vi nghiên cứu này, chỉ dựa trên tự
  thuật — giữ severity thấp theo đúng nguyên tắc không thổi phồng dựa trên suy diễn
- Nguyên nhân khả dĩ: Kết hợp của các bug đã biết (giá sai định dạng — `BUG-PRODDETAIL-008`; thiếu
  ảnh — F-03; phản hồi mờ nhạt — F-01) làm giảm cảm giác "sản phẩm chuyên nghiệp, đáng tin"
  ở tổng thể, hơn là một nguyên nhân đơn lẻ
  - Ghi chú: Trust Q1 ("có đối chiếu lại số tiền không") được **6/7 trả lời Có** (P02–P07); riêng
    **P01 trả lời "Không, mình nghĩ nó đúng"** — người duy nhất không kiểm tra lại, nhưng cũng là
    người trả lời "Không" ở Trust Q2 (từ chối tin tưởng nếu tiền thật), cho thấy sự thiếu tin tưởng
    của họ không xuất phát từ việc tự phát hiện sai sót mà từ cảm giác chung chung. Ngược lại, ở
    P07 — người có kiểm tra lại (Có) — việc đối chiếu này **vẫn không** phát hiện ra lỗi nhân đôi
    giỏ hàng (F-02) dù họ tự nhận có kiểm tra kỹ; cho thấy bản thân hành vi trust-check không đủ để
    bắt lỗi nếu giao diện không hiển thị đúng ngay từ đầu
- Đề xuất: Không đề xuất sửa kỹ thuật riêng cho finding này — theo dõi lại sau khi F-01/F-02/F-03
  được khắc phục, vì nhiều khả năng đây là hệ quả tổng hợp chứ không phải vấn đề độc lập
- Tiêu chí xác minh: Re-test sau khi sửa F-01–F-03 — tỷ lệ từ chối rõ ràng ở Trust Q2 giảm xuống
  dưới 2/7

## Thang đánh giá mức độ nghiêm trọng (usability finding — khác severity của bug report GUI)

| Mức | Phân loại | Ý nghĩa & Hành động |
| --- | --- | --- |
| 0 | Không phải lỗi | Không đủ bằng chứng để coi là usability issue |
| 1 | Cosmetic | Bất tiện rất nhỏ, sửa khi còn thời gian |
| 2 | Minor | Gây bất tiện nhưng user tự vượt qua được, ưu tiên thấp |
| 3 | Major | Làm chậm đáng kể, mắc lỗi nhiều, task có nguy cơ thất bại |
| 4 | Catastrophe | Chặn hoàn toàn việc hoàn thành task |

**Xếp hạng ưu tiên sửa theo severity:** F-02 (4 — Catastrophe) > F-01 (3 — Major) > F-03 (2 — Minor)
> F-04 (1 — Cosmetic/Minor).

## Liên kết bug report (Task 1)

| Finding | Bug report liên quan | Ghi chú |
| --- | --- | --- |
| F-01 | `BUG-PRODDETAIL-001`, `BUG-PRODDETAIL-009` | Đã ghi nhận từ Task 1; Task 2 bổ sung bằng chứng từ 5 người dùng thật độc lập |
| F-02 | `BUG-PRODDETAIL-003` | Đã ghi nhận từ Task 1; Task 2 nâng mức độ nghiêm trọng đã biết — chứng minh hậu quả tài chính thật (167,9 triệu ₫) qua video P07, tái hiện 2 lần độc lập |
| F-03 | `BUG-PRODDETAIL-010`, `BUG-PRODDETAIL-011` (chồng lấn một phần) | Chưa có bug report chuyên biệt cho "thiếu ảnh sản phẩm thật" — đáng cân nhắc bổ sung `BUG-PRODDETAIL-014` nếu muốn tách riêng khỏi lỗi vỡ nét ảnh |
| F-04 | Không có bug kỹ thuật tương ứng | Đây là finding attitudinal thuần tuý, không phải defect |

## Kết quả BrowserStack / Cross-Platform

Xem `../../cross-platform/platform-matrix.md` — Task 3 chạy trên Chrome/Firefox/Safari iOS, độc lập
với 7 phiên usability này (Task 3 dùng checklist Task 1, không phải flow U-01).

## Kết luận và giới hạn

Vấn đề nghiêm trọng nhất là **F-02** (giỏ hàng nhân đôi thay vì gộp số lượng): tuy chỉ 3/7 phiên có
bằng chứng, nó đã gây ra một giao dịch tiền thật sai gần gấp đôi ý định trong phiên P07, tái hiện
được 2 lần độc lập trên video — đây là lỗi bắt buộc phải sửa trước khi cân nhắc release, không phải
vấn đề usability thông thường. **F-01** (phản hồi thêm-giỏ-hàng yếu, 5/7) là nguyên nhân gốc rễ liên
quan và nên sửa cùng lúc. **F-03** (thiếu ảnh/thông tin sản phẩm, 7/7) tuy không chặn task nhưng có
tần suất tuyệt đối, đáng ưu tiên ở vòng cải tiến tiếp theo. Điểm SUS trung bình 63,93 (xếp loại C)
với **độ phân tán rất lớn** giữa các cá nhân (40 đến 87,5) cho thấy trải nghiệm không nhất quán —
đáng chú ý hơn bản thân con số trung bình.

**Giới hạn của mẫu:** 7 người + 1 pilot, một flow duy nhất (U-01), thu thập trong khoảng 29/07–
02/08/2026. Thiết bị/trình duyệt không đồng nhất (5 phiên Windows, 2 phiên macOS) nên chênh lệch
thời gian giữa các phiên không thể quy hoàn toàn cho yếu tố usability. Toàn bộ phần lời nói
think-aloud (audio) **chưa được trích** — timeline mỗi phiên dựng từ khung hình video, cột "Quote
nguyên văn" trong phần lớn dòng để trống; các kết luận về nguyên nhân tâm lý (đặc biệt F-04) cần
nghe lại audio để xác nhận thay vì chỉ dựa vào suy luận từ hành vi quan sát được. Không nên khái
quát hoá số liệu này (đặc biệt SUS trung bình) cho toàn bộ người dùng SUT ngoài phạm vi 7 người đã
test.

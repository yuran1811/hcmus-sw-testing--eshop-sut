# Findings report — U-01

> Phase 3 — tổng hợp từ session P01–P07 (`Survey-23127152.xlsx`).  
> Aggregate số liệu: [aggregate-results.md](./aggregate-results.md).  
> Pilot P00: không có phiếu → không dùng làm bằng chứng.

## Phạm vi và phương pháp

- Website: http://localhost:5173
- Flow: **U-01** — Login → Profile → cập nhật hồ sơ
- FR: FR-02, FR-04
- Ngày phiên (theo survey): chủ yếu **2026-08-02**
- Mẫu: **7** người thật (P01–P07); pilot **không** có dữ liệu
- Phương pháp: moderated / sau phiên điền SUS + probes
- Thang đo: SUS
- Deviation/giới hạn: không có recording timestamp chi tiết; outcome suy từ probes + tiêu chí success của test-plan; P00 thiếu

## Kết quả tổng quan

| Participant | Outcome | Thời gian (s) | Error | Wrong turn | Hesitation | Intervention | SUS |
|-------------|---------|---------------|-------|------------|------------|--------------|-----|
| P01 | FAIL | ~120 | ≥2 | 0 | n/a | 0 | 67.5 |
| P02 | SUCCESS_UNASSISTED | n/a | ≥1 | 0 | n/a | 0 | 67.5 |
| P03 | FAIL | n/a | ≥1 | 0 | n/a | 0 | 72.5 |
| P04 | FAIL | n/a | ≥2 | ≥1 | ≥1 | 0 | 40.0 |
| P05 | SUCCESS_UNASSISTED | n/a | 0 | 0 | 0 | 0 | 97.5 |
| P06 | FAIL | n/a | ≥1 | ≥1 | ≥1 | 0 | 50.0 |
| P07 | FAIL | n/a | ≥1 | 0 | n/a | 0 | 47.5 |

- Tỷ lệ hoàn thành không trợ giúp: **2/7 (28.6%)**
- Tỷ lệ hoàn thành có/không trợ giúp: **2/7 (28.6%)**
- Median thời gian success: **không đủ đo**
- SUS mean / median: **63.2 / 67.5**

## Findings

### F-01 — Validation SĐT từ chối số người dùng cho là hợp lệ và chặn lưu hồ sơ

- Flow: U-01
- FR liên quan: FR-04
- Frequency: **6/7** (P01, P02, P03, P04, P06, P07 — P05 không nêu)
- Bằng chứng:
  - P01: *“luôn báo lỗi … mặc dù tôi nhập đúng số và đủ 10 chữ số”*; thử ±1 chữ số / bỏ trống SĐT vẫn lỗi
  - P04: *“nhập đủ 9-10 số cũng không cập nhật được”*
  - P06: *“mặc dù đã chuẩn quy định nhưng không thể lưu”*
  - P07: *“liên tục lỗi dù nhập đúng input”*
  - P02 Extra: *“cần fix bug update số điện thoại”*
  - P03 Trust: *“cập nhật không thành công nên chưa được lưu”*
- Tác động đến task: **5/7 FAIL** không đạt success state; Trust sụt
- Severity: **4 — Catastrophe**
- Lý do severity: Chặn hoàn tất mục tiêu cập nhật hồ sơ ở đa số phiên
- Nguyên nhân khả dĩ: Regex `/^[1-9][0-9]{8,9}$/` + message “9-10 chữ số” + placeholder gợi ý `0912…` (số 0 đầu) mâu thuẫn kỳ vọng VN — khớp GUI bug **BUG-PROFILE-003**
- Đề xuất: (1) Chấp nhận SĐT VN bắt đầu `0`, 10–11 số theo FR-04; (2) Đồng bộ placeholder / helper text / message lỗi với rule thật; (3) Cho phép lưu địa chỉ khi SĐT không đổi nếu field không dirty
- Tiêu chí xác minh: Re-test U-01 với SĐT dạng `09xxxxxxxx` — ≥6/7 đạt `SUCCESS_UNASSISTED` không alert false-reject
- Bug liên quan: `BUG-PROFILE-003`

### F-02 — Không có CTA “Hồ sơ” rõ; phải hover “Chào, …” mới vào Profile

- Flow: U-01
- FR liên quan: FR-04 (điểm vào quản lý hồ sơ)
- Frequency: **2/7** (P04, P06)
- Bằng chứng:
  - P04: *“không hiện nút icon avatar… Phải hover vào mới thấy có thể bấm vào ‘Chào, Test User’”*
  - P06: *“Không tìm thấy nút có label Hồ sơ rõ ràng”*
- Tác động đến task: Wrong turn / hesitation trước khi tới form; làm chậm và tăng cảm giác khó dùng (P04 SUS 40)
- Severity: **3 — Major**
- Lý do severity: Không chặn 100% mẫu nhưng làm task có nguy cơ fail / chậm đáng kể ở người không “đoán” được hover target
- Nguyên nhân khả dĩ: Entry Profile ẩn trong greeting text, thiếu label hành động (“Hồ sơ” / icon avatar)
- Đề xuất: Thêm link/nút rõ **“Hồ sơ”** (hoặc avatar) trên header; giữ shortcut greeting nếu muốn
- Tiêu chí xác minh: Re-test — hesitation/wrong-turn tìm Profile = 0/7; thời gian tới `/profile` giảm rõ

### F-03 — SĐT cho nhập chữ / chỉ báo lỗi lúc bấm Cập nhật

- Flow: U-01
- FR liên quan: FR-04
- Frequency: **1/7** nêu rõ (P07); liên quan trải nghiệm error của nhóm F-01
- Bằng chứng: P07 — *“số điện thoại nhập text được. chỉ check khi bấm cập nhật”*
- Tác động đến task: Người dùng chỉ biết sai sau submit → lặp thử, giảm Trust
- Severity: **2 — Minor**
- Lý do severity: Không tự chặn task nếu rule đúng, nhưng làm recovery chậm và dễ hiểu nhầm
- Nguyên nhân khả dĩ: `input type="text"` + validate on submit only
- Đề xuất: `inputMode="tel"` / mask số; validate on blur + helper text rule ngay dưới field
- Tiêu chí xác minh: Nhập chữ cái bị chặn hoặc báo inline trước submit; P07-style quote không còn xuất hiện

### F-04 — Sau Cập nhật, người dùng không tin hồ sơ đã lưu (thiếu tín hiệu tin cậy)

- Flow: U-01
- FR liên quan: FR-04
- Frequency: **5/7** (P01, P03, P04, P06, P07)
- Bằng chứng:
  - P01: *“Tôi chưa cập nhật hồ sơ được…”* / Trust (b) *“Không vì hệ thống có lỗi”*
  - P03: *“không, nhìn quá rủi ro”*
  - P04: so sánh muốn dùng Shopee/TikTok thay vì hệ thống này
  - P06: *“Không, hệ thống không cho lưu”*
  - P07: *“không… vì k có chính sách về quyền riêng tư”*
- Tác động đến task: Dù một phần là hệ quả F-01, Trust thấp làm objective #3 của test-plan thất bại
- Severity: **3 — Major** (gắn với F-01; riêng privacy copy = phụ)
- Lý do severity: Objective Trust của nghiên cứu không đạt ở đa số phiên
- Nguyên nhân khả dĩ: Fail lưu + feedback chủ yếu `alert()` (BUG-PROFILE-004) + không có privacy notice
- Đề xuất: Toast/inline success bền trên form; hiển thị giá trị đã lưu; link ngắn chính sách privacycho SĐT/địa chỉ
- Tiêu chí xác minh: Probe Trust (a) ≥5/7 trả lời tin đã lưu kèm tín hiệu UI cụ thể (không chỉ “alert”)

### F-05 — Cảm nhận thiếu nhất quán / cồng kềnh trên một phần mẫu

- Flow: U-01
- FR liên quan: FR-02, FR-04 (UX tổng thể)
- Frequency: tín hiệu thang đo — SUS item 6 ≥4 ở **P02, P03, P04, P07** (4/7); item 8 ≥4 ở P04, P06
- Bằng chứng: điểm SUS thô (không phải quote dài); khớp checklist Login (label lẫn ngôn ngữ, tiêu đề “Đăng Ký”, v.v.)
- Tác động đến task: Gián tiếp — làm giảm willingness (SUS-1 thấp ở nhiều phiên fail)
- Severity: **2 — Minor**
- Lý do severity: Không một mình chặn task; củng cố ma sát khi đã có F-01/F-02
- Nguyên nhân khả dĩ: Inconsistency copy VI/EN + pattern UI lệch giữa Login/Profile
- Đề xuất: Thống nhất copy tiếng Việt, label hành động; xử lý các BUG-LOGIN đã mở trong Task 1
- Tiêu chí xác minh: SUS item 6 mean giảm; không còn ≥4 ở quá nửa mẫu khi re-test

## Thang severity (usability)

| Mức | Ý nghĩa |
|-----|---------|
| 0 | Không đủ bằng chứng |
| 1 | Cosmetic |
| 2 | Minor — tự vượt được |
| 3 | Major — chậm / lặp lỗi, task rủi ro |
| 4 | Catastrophe — chặn hoàn thành task |

## Kết luận và giới hạn

Vấn đề nghiêm trọng nhất là **F-01 (validation SĐT)**: 5/7 phiên **FAIL**, SUS median chỉ **67.5** dù một phần người dùng vẫn thấy “dễ học”. Discoverability Profile (**F-02**) làm nặng thêm ma sát. **Không nên** coi flow Login→Profile→cập nhật là sẵn sàng release cho người dùng thật cho đến khi F-01 được sửa và re-test.

Giới hạn: mẫu 7 người, 1 flow, không có phiếu pilot P00, thiếu đo thời gian chính xác / recording timestamp; không khái quát hoá ngoài ngữ cảnh EShop demo HW03.

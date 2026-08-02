# Báo cáo usability evaluation — U-001

**MSSV:** 23127115  
**Phiên bản:** 1.0 — 02/08/2026
**Luồng:** Đăng ký → Đăng nhập → Xem sản phẩm → Thêm giỏ hàng → Checkout  
**Bản test:** `https://23127115-testing-hw3.vercel.app/`

## Mục lục

- [1. Executive summary](#1-executive-summary)
- [2. Method](#2-method)
- [3. Participants](#3-participants)
- [4. Quantitative results](#4-quantitative-results)
- [5. Findings](#5-findings)
- [6. Recommendations](#6-recommendations)
- [7. Bug reports](#7-bug-reports)
- [8. Traceability](#8-traceability)
- [9. Limitations and protocol deviations](#9-limitations-and-protocol-deviations)
- [10. Conclusions against evaluation goals](#10-conclusions-against-evaluation-goals)
- [11. Finalization checklist](#11-finalization-checklist)

## 1. Executive summary

- **Independent completion:** 0/7 (0%).
- **Completed with help:** 7/7 (100%); mỗi phiên cần đúng một M2 để vượt lỗi đăng ký.
- **Not completed:** 0/7 sau khi dùng recovery account.
- **SUS:** mean 43.2; median 40.0; min 2.5; max 72.5; range 70.0. Mean thấp hơn benchmark mô tả 68 là 24.8 điểm.
- **Time-on-task:** mean 5m04s; median 5m09s; min 3m49s; max 6m54s.
- **Observed friction:** 51 errors (mean 7.3/session) và 7 hesitations (mean 1.0/session).
- **Blocker findings:** F01 (đăng ký từ chối mật khẩu hợp lệ, 7/7) và F05 (tổng thanh toán sửa được và được backend tin cậy, 5/7).
- **Major findings:** F02, F03, F04, F06, F07, F08, F09 và F10.
- **Minor findings:** F11 và F12.

Kết quả không đạt mốc EG-01 là ít nhất 6/7 participant hoàn thành độc lập. Dù tất cả participant đi đến trang xác nhận sau recovery, dữ liệu không cho phép kết luận luồng end-to-end có thể tự hoàn thành: bước đăng ký đã chặn cả 7 người.

## 2. Method

- Phương pháp: moderated think-aloud, một pilot riêng và 7 phiên chính thức.
- Kịch bản: goal-oriented; participant tự chọn sản phẩm và route tự nhiên.
- Timebox: 15 phút; M2 chỉ dùng khi participant bị kẹt hoàn toàn và không xóa thất bại trước đó.
- Instrument: SUS 10 câu và 4 câu hỏi mở về clarity, error recovery, speed và trust.
- Evidence: screen/audio recording đã có consent, timestamp trong từng session note, dữ liệu liên hệ đã che.
- Synthesis: trích vấn đề theo từng phiên, nhóm theo nguyên nhân trải nghiệm, sau đó xếp severity theo ảnh hưởng đến hoàn thành, số người gặp và khả năng workaround.

## 3. Participants

| ID  | Online-shopping experience              | Session date | Valid session? |
| --- | --------------------------------------- | ------------ | -------------- |
| P01 | ≥1 lần trong 6 tháng gần đây (screened) | 01/08/2026   | Có             |
| P02 | ≥1 lần trong 6 tháng gần đây (screened) | 01/08/2026   | Có             |
| P03 | ≥1 lần trong 6 tháng gần đây (screened) | 01/08/2026   | Có             |
| P04 | ≥1 lần trong 6 tháng gần đây (screened) | 01/08/2026   | Có             |
| P05 | ≥1 lần trong 6 tháng gần đây (screened) | 01/08/2026   | Có             |
| P06 | ≥1 lần trong 6 tháng gần đây (screened) | 02/08/2026   | Có             |
| P07 | ≥1 lần trong 6 tháng gần đây (screened) | 02/08/2026   | Có             |

## 4. Quantitative results

| ID  | Completion          | Time  | M2  | Errors | Hesitations | SUS  |
| --- | ------------------- | ----- | --- | ------ | ----------- | ---- |
| P01 | Completed with help | 5m09s | 1   | 7      | 1           | 57.5 |
| P02 | Completed with help | 6m54s | 1   | 9      | 2           | 27.5 |
| P03 | Completed with help | 3m49s | 1   | 6      | 1           | 32.5 |
| P04 | Completed with help | 4m30s | 1   | 9      | 1           | 2.5  |
| P05 | Completed with help | 5m41s | 1   | 9      | 0           | 70.0 |
| P06 | Completed with help | 4m15s | 1   | 7      | 1           | 40.0 |
| P07 | Completed with help | 5m12s | 1   | 4      | 1           | 72.5 |

| Metric       | Mean  | Median | Min   | Max   | Range |
| ------------ | ----- | ------ | ----- | ----- | ----- |
| SUS          | 43.2  | 40.0   | 2.5   | 72.5  | 70.0  |
| Time-on-task | 5m04s | 5m09s  | 3m49s | 6m54s | 3m05s |

SUS là điểm quy đổi, không phải phần trăm. Raw responses được giữ nguyên trong `instrument.md` và từng session note. Kiểm tra lại số học: P01 = `23 × 2.5 = 57.5`, P04 = `1 × 2.5 = 2.5`; tổng 302.5/7 = 43.2.

### SUS per-item breakdown

Contribution mean nằm trong 0–4; thấp hơn nghĩa là item kéo điểm SUS xuống mạnh hơn.

| Item | Raw mean | Contribution mean | Interpretation                             |
| ---- | -------- | ----------------- | ------------------------------------------ |
| Q1   | 1.86     | 0.86              | Ý định sử dụng thường xuyên thấp           |
| Q2   | 2.43     | 2.57              | Mức phức tạp cảm nhận trung bình           |
| Q3   | 3.00     | 2.00              | Dễ sử dụng ở mức trung tính                |
| Q4   | 3.57     | 1.43              | Nhu cầu hỗ trợ tương đối cao               |
| Q5   | 2.57     | 1.57              | Tích hợp chức năng bị đánh giá thấp        |
| Q6   | 4.29     | 0.71              | Không nhất quán là driver thấp nhất        |
| Q7   | 2.86     | 1.86              | Khả năng học nhanh ở mức thấp-trung bình   |
| Q8   | 2.71     | 2.29              | Độ khó cảm nhận không phải driver xấu nhất |
| Q9   | 2.86     | 1.86              | Tự tin sử dụng ở mức thấp-trung bình       |
| Q10  | 2.86     | 2.14              | Nhu cầu học trước ở mức trung bình         |

Sensitivity check giả định (hypothetical, không phải quyết định chính thức — P06 đã được xác nhận là phiên hợp lệ): nếu loại P06 thì mean 43.8, median 45.0, min 2.5, max 72.5; kết luận vẫn không đổi.

## 5. Findings

| ID  | Finding                                                           | Sessions (n/7)                | Severity | Evidence example                                    | Recommendation                                                                         | Bug/Issue                                                                                                                                                                          |
| --- | ----------------------------------------------------------------- | ----------------------------- | -------- | --------------------------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F01 | Đăng ký từ chối mật khẩu đáp ứng tiêu chí hiển thị                | P01–P07 (7/7)                 | Blocker  | P07 01:41: "@ không tính là ký tự đặc biệt hả ta"   | Dùng đúng allow-list FR-01, hiển thị trạng thái từng rule và thêm test cho `Test1234!` | [BUG-AUTH-F01](../../../bug-reports/usability/U-001/BUG-AUTH-F01/BUG-AUTH-F01.md)                                                                                                  |
| F02 | Mật khẩu đăng nhập hiển thị plain-text                            | P01, P02, P04, P05, P06 (5/7) | Major    | P06 02:22: "hiện luôn mật khẩu… không được an toàn" | Dùng `type="password"`, hỗ trợ show/hide có kiểm soát                                  | [BUG-AUTH-F02](../../../bug-reports/usability/U-001/BUG-AUTH-F02/BUG-AUTH-F02.md)                                                                                                  |
| F03 | Form đăng nhập dùng tiêu đề/nhãn gây nhầm với đăng ký             | P01, P03, P05 (3/7)           | Major    | P05 03:21: "trang đăng nhập sao ghi đăng ký"        | Đồng bộ tiêu đề "Đăng nhập", nhãn "Email", CTA tiếng Việt                              | [BUG-AUTH-F03](../../../bug-reports/usability/U-001/BUG-AUTH-F03/BUG-AUTH-F03.md)                                                                                                  |
| F04 | Thêm sản phẩm từ Home thiếu feedback rõ ràng, dẫn đến bấm lặp     | P01–P06 (6/7)                 | Major    | P03 00:51: "ấn không hiển thị ra gì"                | Toast hoặc cart badge cập nhật ngay; chặn double-submit                                | [BUG-HOME-GUI-IA03-022](../../../bug-reports/gui/home/BUG-HOME-GUI-IA03-022/BUG-HOME-GUI-IA03-022.md)                                                                              |
| F05 | Tổng tiền checkout có thể sửa và giá trị client được chấp nhận    | P01, P02, P03, P05, P06 (5/7) | Blocker  | P06 03:56: "sao tổng tiền có thể chỉnh sửa"         | Chỉ hiển thị read-only; backend tính lại từ product/quantity authoritative             | [BUG-CHECKOUT-F05](../../../bug-reports/usability/U-001/BUG-CHECKOUT-F05/BUG-CHECKOUT-F05.md)                                                                                      |
| F06 | Giỏ hàng không được xóa sau checkout thành công                   | P02, P04 (2/7)                | Major    | P02 05:13: "giỏ hàng còn nằm đây luôn"              | Clear cart sau response thành công và đồng bộ server/client                            | [BUG-CHECKOUT-F06](../../../bug-reports/usability/U-001/BUG-CHECKOUT-F06/BUG-CHECKOUT-F06.md)                                                                                      |
| F07 | Số lượng 0 hoặc âm vẫn được thêm vào giỏ                          | P05, P07 (2/7)                | Major    | P07 04:18: "0 mà tại sao lại bỏ vào giỏ hàng được"  | `min=1`, validation client/server, disable Add khi invalid                             | [BUG-CART-F07](../../../bug-reports/usability/U-001/BUG-CART-F07/BUG-CART-F07.md)                                                                                                  |
| F08 | Guest cart bị mất trong auth/recovery                             | P02 (1/7)                     | Major    | P02 03:34: "ủa giỏ hàng của tôi đâu"                | Persist cart và merge rõ ràng sau login                                                | [BUG-CART-F08](../../../bug-reports/usability/U-001/BUG-CART-F08/BUG-CART-F08.md)                                                                                                  |
| F09 | Cùng sản phẩm tạo nhiều dòng thay vì tăng số lượng                | P02, P03 (2/7)                | Major    | P02 00:44: "bill của tôi lên tới 1 tỷ"              | Merge theo product ID và cập nhật quantity                                             | [BUG-CART-F09](../../../bug-reports/usability/U-001/BUG-CART-F09/BUG-CART-F09.md)                                                                                                  |
| F10 | Tải sản phẩm chậm/thiếu ảnh nhưng không có trạng thái chờ rõ ràng | P03, P04, P06 (3/7)           | Major    | P03 00:21: "lâu vậy"                                | Loading skeleton, image fallback, timeout/error state                                  | [IA04-031](../../../bug-reports/gui/home/BUG-HOME-GUI-IA04-031/BUG-HOME-GUI-IA04-031.md), [IA04-044](../../../bug-reports/gui/home/BUG-HOME-GUI-IA04-044/BUG-HOME-GUI-IA04-044.md) |
| F11 | Checkout/shipping/order follow-up chưa rõ                         | P04 (1/7)                     | Minor    | P04 03:53–04:07                                     | Tổ chức shipping trước confirm và chỉ rõ cách theo dõi đơn                             | Chưa tách bug; cần kiểm tra lại flow                                                                                                                                               |
| F12 | Ít phương thức thanh toán                                         | P07 (1/7)                     | Minor    | P07 05:18                                           | Xác nhận product scope trước khi coi là defect                                         | Không phải bug theo FR hiện tại                                                                                                                                                    |

F01–F07, F09 và F10 là systemic vì xuất hiện ở ít nhất 2 participant. F08 chỉ xuất hiện ở P02 nhưng được giữ Major vì participant mất toàn bộ cart và source cho thấy cart không có persistence; exact sequence vẫn phải được chạy lại. F11–F12 được giữ để bảo toàn dữ liệu nhưng chưa nâng thành bug vì bằng chứng một phiên và/hoặc chưa có requirement tương ứng.

## 6. Recommendations

1. **P0:** sửa đăng ký và tính tiền authoritative ở backend trước mọi retest usability.
2. **P1:** che mật khẩu, sửa nhãn auth, validate quantity, clear cart sau checkout và tạo feedback add-to-cart.
3. **P2:** merge cart item, persist/merge guest cart, bổ sung loading/error/image fallback.
4. Sau khi fix, retest tối thiểu F01 và F05 bằng test chức năng; sau đó chạy lại luồng với người dùng mới để đo independent completion và SUS.

## 7. Bug reports

- 8 bug usability mới nằm trong `tests/bug-reports/usability/U-001/`, cùng canonical root với bug của Task 1.
- F04 và F10 liên kết tới 3 bug Home đã tồn tại để tránh duplicate.
- Tất cả bug đã chuyển sang status `New`; `5_evidence/bug_index.md` là index/evidence manifest.

## 8. Traceability

- Plan/prep: `1_plan-prep/`.
- Session guide và instrument: `2_session-guide/`.
- Raw notes: `3_sessions/P01.md` … `3_sessions/P07.md`.
- Score calculations, findings và rationale: báo cáo này.
- Bug index: `5_evidence/bug_index.md`.
- Canonical usability bugs: `tests/bug-reports/usability/U-001/`.

## 9. Limitations and protocol deviations

- `n=7` là mẫu nhỏ, thuận tiện; không dùng để suy rộng thống kê.
- Think-aloud và moderator prompts có thể thay đổi hành vi/thời gian.
- Recovery account cho phép quan sát phần sau nhưng khiến task không còn independent.
- P01–P06 có background IT-related (sinh viên); mẫu chưa đại diện tốt cho nhóm non-IT.

## 10. Conclusions against evaluation goals

- **EG-01 — Không đạt:** 0/7 hoàn thành độc lập; target là ít nhất 6/7.
- **EG-02 — Đạt mục tiêu chẩn đoán:** đăng ký là chặng duy nhất fail 7/7; các cụm friction tiếp theo là add-to-cart feedback, auth UI và checkout integrity.
- **EG-03 — Không đạt benchmark mô tả:** SUS mean 43.2, thấp hơn 68. Per-item cho thấy điểm yếu nhất ở perceived consistency (Q6), willingness to reuse (Q1), need for support (Q4) và integration (Q5).

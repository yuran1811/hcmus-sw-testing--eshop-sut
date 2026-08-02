# Ma trận truy vết & Test Summary — HW03 (GUI + Usability)

> Tổng hợp Requirement ↔ Checklist Item ↔ Kết quả ↔ GitHub Issue cho màn hình **Product Detail**
> (Task 1), flow **U-01** (Task 2) và ma trận **cross-platform** (Task 3).
> Cập nhật: 2026-08-03.

**Khác biệt so với ma trận HW02:** HW02 truy vết `Requirement ↔ Test Case` cho 4 feature độc lập.
HW03 chỉ có **một** màn hình và **một** flow, nên trục truy vết đổi thành
`Requirement ↔ Checklist Item ↔ Bug ↔ Issue`. Bổ sung thêm hai bảng mà HW02 không có: truy vết
**usability finding** (Task 2) và truy vết **defect theo nền tảng** (Task 3).

Checklist gốc không gắn nhãn FR. Cột Requirement dưới đây lấy từ trường **"Requirement liên quan"**
đã ghi sẵn trong 13 file bug report, không phải suy diễn khi lập bảng này.

---

## 1. Test Summary Report

| Chỉ số | Giá trị |
| :--- | ---: |
| Số màn hình đã test (GUI checklist) | 1 — Product Detail |
| Số flow đã test (usability) | 1 — U-01 |
| Checklist item **thiết kế** | **73** |
| Checklist item **đã thực thi** | **73** |
| **Passed** | **33** |
| **Failed** | **40** |
| Chưa thực thi | 0 |
| Số bug tìm được | **13** |
| Số GitHub Issue đã tạo | **13** (#157–#169) |
| Số người tham gia usability | **7** + 1 pilot |
| Số usability finding | 4 |
| Số nền tảng cross-platform | 3 (Blink / Gecko / WebKit) |
| Video demo Agent Skills | Xem `README.md` |

### Checklist theo Interface Aspect

| Aspect | Categories | Designed | Executed | Passed | Failed | Not executed | Bugs Found |
| :--- | :--- | ---: | ---: | ---: | ---: | ---: | ---: |
| IA-01 — General UI standards | VIS, RES, COM | 25 | 25 | 20 | 5 | 0 | 3 |
| IA-02 — Forms | VAL, FUN | 17 | 17 | 3 | 14 | 0 | 3 |
| IA-03 — Navigation | NAV | 10 | 10 | 4 | 6 | 0 | 3 |
| IA-04 — Feedback / state | FDB, USB, ACC | 21 | 21 | 6 | 15 | 0 | 4 |
| **Tổng cộng** | | **73** | **73** | **33** | **40** | **0** | **13** |

> Cột "Bugs Found" đếm số bug **lần đầu xuất hiện** ở aspect đó. Một bug có thể được nhiều item
> thuộc nhiều aspect cùng chứng minh (ví dụ `BUG-PRODDETAIL-001` do FUN-01/02/03 ở IA-02 **và**
> FDB-04, USB-04 ở IA-04 cùng phát hiện) — nên tổng cột này bằng 13 chứ không phải phép cộng bug
> của từng dòng.

### Bug theo mức độ nghiêm trọng (Severity)

| Severity | IA-01 | IA-02 | IA-03 | IA-04 | Total |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Blocker | 0 | 0 | 0 | 0 | **0** |
| Critical | 0 | 2 | 0 | 1 | **3** |
| Major | 1 | 1 | 2 | 1 | **5** |
| Minor | 2 | 0 | 1 | 2 | **5** |
| **Total** | **3** | **3** | **3** | **4** | **13** |

---

## 2. Ma trận truy vết — Task 1 (GUI Checklist)

| Requirement | Business Rule / Constraint | Checklist Item IDs | Result | Bug Issue | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| FR-05 | Giá hiển thị đơn vị `₫`, phân tách hàng nghìn theo chuẩn Việt Nam | VIS-02, COM-04 | **Failed** | [#163](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/163) | Open |
| FR-05 | Ảnh sản phẩm đúng tỷ lệ, không phóng to vỡ nét | VIS-01, VIS-04 | **Failed** | [#165](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/165) | Open |
| FR-06 | Hiển thị đầy đủ ảnh lớn, tên, giá, mô tả đúng bố cục | VIS-03, VIS-05, VIS-06, VIS-07, VIS-08 | Passed | | Closed |
| FR-06 | Giữ được bố cục ở các trạng thái đặc biệt (ảnh lỗi, mô tả dài, dark mode OS, RTL) | VIS-09, VIS-11, VIS-12, VIS-13, VIS-14 | Passed | | Closed |
| FR-06 | Tiêu đề tab phản ánh tên sản phẩm đang xem | VIS-10 | **Failed** | [#165](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/165) | Open |
| FR-06 | Hiển thị đủ thông tin để ra quyết định mua (tồn kho, danh mục, sản phẩm liên quan) | USB-02, USB-03, USB-05 | **Failed** | [#166](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/166) | Open |
| FR-06 | Thông tin sắp xếp theo thứ tự dễ quét | USB-01 | Passed | | Closed |
| FR-06 | Layout đáp ứng ở 1440×900, 768×1024, 390×844 và khi zoom | RES-01 → RES-07 | Passed | | Closed |
| FR-06 | Hiển thị nhất quán giữa Chrome và Firefox, dấu tiếng Việt không lỗi font | COM-01, COM-03 | Passed | | Closed |
| FR-06, FR-07 | Ô Số lượng điều chỉnh được bằng thao tác tương đương trên mọi nền tảng | COM-02 | Passed (P1, P2) · **Failed (P3)** | [#169](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/169) | Open |
| FR-06 | Ô Số lượng chỉ nhận số nguyên dương, tối thiểu 1 | VAL-01 → VAL-10 | **Failed** | [#158](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/158) | Open |
| FR-06 | Nút "Thêm vào giỏ hàng" có tác dụng ngay từ lần bấm đầu tiên | FUN-01, FUN-02, FUN-03, FDB-04, USB-04 | **Failed** | [#157](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/157) | Open |
| FR-07 | Thêm cùng một sản phẩm sẽ tăng số lượng, không tạo dòng mới | FUN-04 | **Failed** | [#159](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/159) | Open |
| FR-06 | Số lượng nhập vào được chuyển đúng sang giỏ hàng | FUN-05, FUN-06, FUN-07 | Passed | | Closed |
| FR-06 | Điều hướng từ danh sách vào chi tiết và ngược lại hoạt động đúng | NAV-01, NAV-02, NAV-04, NAV-05 | Passed | | Closed |
| FR-06 | Giữ vị trí cuộn khi bấm Back về danh sách | NAV-03 | **Failed** | [#167](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/167) | Open |
| FR-06, FR-05 | ID sản phẩm không tồn tại → thông báo thân thiện + lối quay lại danh sách | NAV-06, NAV-07, NAV-08, FDB-03 | **Failed** | [#160](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/160) | Open |
| FR-07 | Giỏ hàng giữ được sản phẩm đã thêm sau khi tải lại trang | NAV-09 | **Failed** | [#161](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/161) | Open |
| FR-06, FR-01 | Giữ ngữ cảnh trang sau khi đăng nhập | NAV-10 | **Failed** | [#167](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/167) | Open |
| FR-06 | Có chỉ báo đang tải và trạng thái lỗi khi API thất bại | FDB-01, FDB-02 | **Failed** | [#168](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/168) | Open |
| FR-06 | Sau khi thêm vào giỏ có phản hồi trực quan (toast/badge), nút bị vô hiệu khi xử lý | FDB-05, FDB-06, FDB-07 | **Failed** | [#164](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/164) | Open |
| FR-06 | Dùng được với công nghệ trợ giúp — nhãn liên kết ô nhập, `lang` đúng, `aria-live`, vùng chạm ≥44 px | ACC-01, ACC-06, ACC-07, ACC-08 | **Failed** | [#162](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/162) | Open |
| FR-06 | Điều hướng được bằng bàn phím, có viền focus, tương phản đạt chuẩn | ACC-02, ACC-03, ACC-04, ACC-05, ACC-09 | Passed | | Closed |

**Đối chiếu tổng:** 4 + 15 + 7 + 3 + 10 + 7 + 10 + 8 + 9 = **73 item** — khớp số item trong
`tests/checklist/product-detail/checklist_product-detail.md`. Trong đó **33 Passed / 40 Failed**.

---

## 3. Ma trận truy vết — Task 2 (Usability Findings)

| Finding | Mô tả | Frequency | Severity | Requirement | Bug liên quan | Issue |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- |
| **F-02** | Giỏ hàng không gộp số lượng, tạo dòng trùng làm sai tổng tiền | 3/7 | **4 — Catastrophe** | FR-07 | `BUG-PRODDETAIL-003` | [#159](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/159) |
| **F-01** | Phản hồi khi bấm "Thêm vào giỏ hàng" yếu hoặc biến mất quá nhanh | 5/7 | **3 — Major** | FR-06 | `BUG-PRODDETAIL-001`, `BUG-PRODDETAIL-009` | [#157](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/157), [#164](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/164) |
| **F-03** | Trang chi tiết thiếu thông tin (đặc biệt ảnh thật) → thiếu tự tin khi mua | **7/7** | 2 — Minor | FR-06 | `BUG-PRODDETAIL-011` | [#166](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/166) |
| **F-04** | Không đủ tin tưởng để xác nhận thanh toán nếu là tiền thật | 3/7 từ chối | 1 — Cosmetic | FR-08 | — (vấn đề niềm tin, chưa quy về defect đơn lẻ) | — |

**Điểm hội tụ đáng ghi nhận:** cả 3 finding có thể quy về defect (F-01, F-02, F-03) đều trỏ tới bug
**đã được checklist Task 1 tìm ra trước**. Hai phương pháp độc lập — kiểm thử theo checklist và
quan sát người dùng thật — hội tụ về cùng tập defect. Đây là tín hiệu checklist bám đúng rủi ro
thực tế chứ không chỉ liệt kê cho đủ số lượng.

**Chỉ số ISO 9241-11:**

| Chỉ số | Giá trị |
| :--- | :--- |
| Effectiveness — tỷ lệ hoàn thành | **7/7 = 100 %** (`SUCCESS_UNASSISTED`, 0 intervention) |
| Efficiency — thời gian hoàn thành | Median **66 s** (dải 48–136 s) |
| Satisfaction — SUS | Mean **63,93** · Median **62,5** → xếp loại **C** |
| Độ phân tán SUS | 40,0 → 87,5 |

---

## 4. Ma trận truy vết — Task 3 (Cross-Platform)

| Checklist Item | P1 Chrome | P2 Firefox | P3 Safari iOS | Fail trên | Phân loại | Bug | Issue |
| :--- | :---: | :---: | :---: | :---: | :--- | :--- | :--- |
| COM-02 | Passed | Passed | **Failed** | **1/3** | **Cross-platform defect thật** | `BUG-PRODDETAIL-013` | [#169](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/169) |
| VIS-02 | **Failed** | **Failed** | Passed | 2/3 | Cross-platform defect | `BUG-PRODDETAIL-008` | [#163](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/163) |
| COM-04 | **Failed** | **Failed** | **Failed** | 3/3 | Defect chung của ứng dụng | `BUG-PRODDETAIL-008` | [#163](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/163) |
| VIS-01 | **Failed** | **Failed** | **Failed** | 3/3 | Defect chung của ứng dụng | `BUG-PRODDETAIL-010` | [#165](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/165) |

**Độ phủ theo nền tảng:**

| Nền tảng | Passed | Failed | Blocked | Not Run | N/A | Pass rate |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: |
| P1 — Chrome 126 / Windows 11 | 11 | 3 | 1 | 3 | 2 | **78,6 %** |
| P2 — Firefox 128 / Windows 11 | 10 | 3 | 1 | 4 | 2 | **76,9 %** |
| P3 — Safari / iOS (thiết bị thật) | 11 | 3 | 1 | 4 | 1 | **78,6 %** |

`VIS-02` chỉ "Passed" trên P3 vì chiếc iPhone đang để ngôn ngữ tiếng Việt — đúng do **trùng locale
ngẫu nhiên**, không phải do ứng dụng kiểm soát định dạng. Khi đổi máy đó sang tiếng Anh, giá lập tức
hiển thị sai. Vì vậy `COM-04` (kiểm tra chính việc đổi locale) fail trên cả 3/3.

---

## 5. Báo cáo Độ bao phủ (Coverage Status)

✅ **Đạt:** Cả 4 interface aspect bắt buộc (IA-01 → IA-04) đều được phủ bởi ít nhất 10 checklist
item; toàn bộ 73 item đã được thực thi (0 item còn `Not Run`); mọi item `Failed` đều truy được về
một bug report và một GitHub Issue.

**Ba khoảng trống còn tồn tại — ghi ra thay vì bỏ qua:**

| Khoảng trống | Ảnh hưởng | Xử lý |
| :--- | :--- | :--- |
| `VIS-09` (ảnh sản phẩm lỗi tải) để **Blocked** trên cả 3 nền tảng ở Task 3 | Không xác minh được hành vi khi ảnh 404 trên từng engine | Cần sửa code hoặc chặn domain qua DevTools; đã ghi lý do trực tiếp trong ô của `platform-matrix.md` |
| 39/73 item nhóm `VAL`/`FUN`/`NAV`/`FDB`/`USB` **không** chạy lại ở Task 3 | Không phải khoảng trống thật — các item này chạy cùng một đoạn JavaScript nên đổi engine không sinh phát hiện mới | Quyết định lọc có chủ đích, lý do ghi ở §3.2 báo cáo chính |
| Cột "Quote nguyên văn" trong timeline 7 phiên còn trống | Thiếu dẫn chứng lời nói kèm mốc thời gian | Video trích được hình nhưng không trích tiếng; cần nghe lại và điền tay |

**Một điểm cần lưu ý khi đọc bảng §2:** `COM-02` là item duy nhất có kết quả **khác nhau giữa hai
task** — Passed ở Task 1 (chạy trên Chrome/Firefox desktop, nơi spinner hiển thị bình thường) nhưng
Failed ở Task 3 (Safari iOS không render spinner). Đây chính là loại defect mà cross-platform
testing sinh ra để bắt, và cũng là lý do bảng §2 ghi cả hai kết quả thay vì chọn một.

# HW03 – GUI and Usability Testing on EShop

**Mã số sinh viên:** 23127211.  
**Họ và tên:** Nguyễn Lê Hồ Anh Khoa.  
**Mã bài tập:** HW03-AI.  
**Ngày nộp:** 03/08/2026.

---

## Phạm vi đã chọn

| Task                              | Đối tượng                                    | Chi tiết                                                |
| :-------------------------------- | :------------------------------------------- | :------------------------------------------------------ |
| **Task 1** — GUI Checklist        | Màn hình **Product Detail** (`/product/:id`) | 73 item phủ 4 interface aspect IA-01 → IA-04            |
| **Task 2** — Usability Evaluation | Flow **U-01**                                | Tìm kiếm → Chi tiết → Giỏ hàng → Mã giảm giá → Checkout |
| **Task 3** — Cross-Platform       | Chrome 126 · Firefox 128 · Safari iOS        | Phủ trọn 3 engine Blink / Gecko / WebKit                |
| **Task 4** — Agent Skills         | 3 skill mới + 2 tái sử dụng                  | Xem `.agents/skills/`                                   |

---

## Test Summary Report

**Tổng quan:** 1 màn hình · 1 flow · 3 nền tảng · 73 checklist item thiết kế · 73/73 đã thực thi · 13 bug · 7 người tham gia usability.

### Chi tiết theo Interface Aspect

| Aspect                       | Categories    | Designed | Executed | Passed | Failed | Not yet executed | Bugs Found |
| :--------------------------- | :------------ | :------: | :------: | :----: | :----: | :--------------: | :--------: |
| IA-01 — General UI standards | VIS, RES, COM |    25    |    25    |   20   |   5    |        0         |     3      |
| IA-02 — Forms                | VAL, FUN      |    17    |    17    |   3    |   14   |        0         |     3      |
| IA-03 — Navigation           | NAV           |    10    |    10    |   4    |   6    |        0         |     3      |
| IA-04 — Feedback / state     | FDB, USB, ACC |    21    |    21    |   6    |   15   |        0         |     4      |
| —                            | **Tổng cộng** |  **73**  |  **73**  | **33** | **40** |      **0**       |   **13**   |

### Bug theo mức độ nghiêm trọng (Severity)

| Severity  | IA-01 | IA-02 | IA-03 | IA-04 | Total  |
| :-------- | :---: | :---: | :---: | :---: | :----: |
| Blocker   |   0   |   0   |   0   |   0   | **0**  |
| Critical  |   0   |   2   |   0   |   1   | **3**  |
| Major     |   1   |   1   |   2   |   1   | **5**  |
| Minor     |   2   |   0   |   1   |   2   | **5**  |
| **Total** | **3** | **3** | **3** | **4** | **13** |

### Usability (Task 2)

| Chỉ số                          | Giá trị                                             |
| :------------------------------ | :-------------------------------------------------- |
| Số người tham gia               | **7** chính thức (P01–P07) + 1 pilot (P00)          |
| Tỷ lệ hoàn thành không trợ giúp | **7/7 = 100 %** (0 lần moderator can thiệp)         |
| Thời gian hoàn thành (median)   | **66 giây** (dải 48–136 s)                          |
| Điểm SUS                        | Mean **63,93** · Median **62,5** → xếp loại **C**   |
| Độ phân tán SUS                 | 40,0 → 87,5                                         |
| Số finding                      | **4** — 1 Catastrophe, 1 Major, 1 Minor, 1 Cosmetic |
| Bản ghi màn hình                | 7/7 phiên                                           |

Finding nghiêm trọng nhất — **F-02 (Severity 4)**: giỏ hàng không gộp số lượng khi thêm cùng sản
phẩm nhiều lần. Ở phiên P07 lỗi tái hiện **2 lần độc lập trong cùng một phiên**, lần thứ hai không
được phát hiện, dẫn tới đơn hàng **167.900.000 ₫** — gần gấp đôi số tiền người dùng định trả.

### Cross-Platform (Task 3)

| Nền tảng                     | Engine | Passed | Failed | Blocked | Not Run | N/A |  Pass rate |
| :--------------------------- | :----- | -----: | -----: | ------: | ------: | --: | ---------: |
| Chrome 126 — Windows 11      | Blink  |     11 |      3 |       1 |       3 |   2 | **78,6 %** |
| Firefox 128 — Windows 11     | Gecko  |     10 |      3 |       1 |       4 |   2 | **76,9 %** |
| Safari — iOS (thiết bị thật) | WebKit |     11 |      3 |       1 |       4 |   1 | **78,6 %** |

Lọc từ 73 item xuống **20 item nhạy nền tảng**; 39 item logic nghiệp vụ được loại có chủ đích vì
chạy cùng một đoạn JavaScript nên đổi engine không sinh phát hiện mới. Task 3 phát hiện **1 bug
mới** (`BUG-PRODDETAIL-013`) và nâng bằng chứng cho `BUG-PRODDETAIL-008` từ "mô phỏng locale" lên
"quan sát trên thiết bị thật".

### GitHub Issues

Toàn bộ **13 bug** đều đã lên GitHub Issues (**#157 – #169**), mỗi issue gắn đủ nhãn `type:bug`,
`module:product`, `found-by:test-case`, `severity:*`, `priority:*`. Ảnh chụp: `./github-issues.png`.

> **Lưu ý:** dãy số issue **không liên tục theo thứ tự Bug ID**. `BUG-PRODDETAIL-004` là **#168**
> (bị bỏ sót ở lượt tạo đầu, thêm sau) chứ không phải #160. Bảng đối chiếu đầy đủ nằm ở §1.4 của
> `main-report.md`.

_Chi tiết từng checklist item, bug và phiên usability — xem `./tests/`; ma trận truy vết đầy đủ ở
`./tests/test-summary/traceability-matrix.md`; phân tích hoàn chỉnh trong `main-report.pdf`._

---

## Bảng tự đánh giá điểm

| Số Thứ Tự. | Tiêu chí                                                  | Điểm tối đa | Điểm tự đánh giá |
| :--------: | :-------------------------------------------------------- | :---------: | :--------------: |
|     1      | Task 1 — GUI Checklist (thiết kế + thực thi + bug report) |     30      |        30        |
|     2      | Task 2 — Usability Evaluation                             |     40      |        40        |
|     3      | Task 3 — Cross-Browser / Cross-Platform Testing           |     20      |        20        |
|     4      | Agent Skills                                              |     10      |        10        |
|            | **Tổng cộng**                                             |   **100**   |     **100**      |

---

## Demo Agent Skill

Bộ skill được thiết kế theo nguyên tắc **chia nhỏ công việc thành các pass có điểm dừng kiểm soát
của con người**, thay vì giao AI một prompt hộp đen duy nhất. Cả 3 skill mới đều có mục
_"Boundary — read first"_ quy định rõ những gì skill **từ chối** tự sinh — vì bằng chứng bịa ra thì
vô dụng đúng lúc cần nhất.

| Skill                            | Vai trò                                                                    | Mới / Tái sử dụng   |
| :------------------------------- | :------------------------------------------------------------------------- | :------------------ |
| `gui-checklist-builder`          | 4 pass scoped theo IA-01→04, mỗi pass kèm critical review ghi lý do bỏ sót | **Mới (HW03)**      |
| `usability-evaluation-builder`   | Dựng bộ tài liệu 3 phase: plan → session log → findings report             | **Mới (HW03)**      |
| `cross-platform-testing-tracker` | Chọn nền tảng, lọc item nhạy nền tảng, dựng ma trận, chèn watermark        | **Mới (HW03)**      |
| `bug-reporting`                  | Chuẩn hoá defect thành format khớp GitHub Issue template                   | Tái sử dụng từ HW02 |
| `ai-audit-logger`                | Ghi log prompt + output nguyên văn vào AI Audit Report                     | Tái sử dụng từ HW02 |

**Video demo:** [Agent Skills for HW03](https://youtu.be/glvfBrHn1Vk)

---

## Cấu trúc thư mục nộp

```
23127211/
├── README.MD                              # File này
├── main-report.md / .pdf                  # Báo cáo chính
├── github-issues.png                      # Ảnh chụp 13 issue #157–#169
├── git-log.md / .pdf                      # Git commit log
├── Appendix_A/
│   ├── ai audit report.md / .pdf          # Log prompt + output nguyên văn
│   └── ai critique.md / .pdf              # Phân tích điểm yếu của AI
├── .agents/skills/                        # 3 skill mới + 4 skill tái sử dụng
├── .claude/                               # settings.json — cấu hình môi trường
└── tests/
    ├── checklist/product-detail/          # 73 item, pass log, critical review
    ├── bug-reports/
    │   ├── product-detail/                # BUG-PRODDETAIL-001 → 013
    │   └── screenshots/                   # 23 ảnh, chỉ cho item Failed
    ├── usability/U-01/
    │   ├── test-plan.md                   # Phase 1
    │   ├── recruitment-tracker.md         # 7 người + pilot, SĐT đã che
    │   ├── sessions/                      # P00–P07: session log + bản ghi màn hình
    │   └── findings-report.md             # Phase 3: 4 finding có severity
    ├── cross-platform/
    │   ├── platform-matrix.md             # 20 item × 3 nền tảng
    │   └── screenshots-watermarked/       # 50 ảnh (chrome/ firefox/ safari/)
    ├── test-runs/                         # Kết quả chạy sprint 1 & 2
    └── test-summary/
        └── traceability-matrix.md         # Requirement ↔ Item ↔ Bug ↔ Issue
```

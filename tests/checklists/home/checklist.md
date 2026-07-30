# GUI Checklist — Trang Chủ (Home Screen)

**Hệ thống:** EShop SUT  
**URL:** `http://localhost:5173`  
**Màn hình / Flow:** Trang Chủ — Header, Thanh tìm kiếm, Danh sách sản phẩm, Footer  
**Người kiểm thử:** Mạch Quốc Tấn  
**Ngày kiểm thử:** 30/07/2026  
**Phiên bản SUT:** v1.0.0

---

> **Quy tắc trạng thái:**
>
> - `Passed` — item hoạt động đúng theo đặc tả
> - `Failed` — item không đáp ứng đặc tả; thêm ghi chú cụ thể và mã bug (`BUG-0XX`)
> - `N/A` — không áp dụng cho màn hình này (giải thích lý do)
> - `Blocked` — chưa thể kiểm thử (nêu lý do)

---

## IA-01 — Tiêu Chuẩn Giao Diện Chung (General UI Standards)

> **Heuristic seeds:** Nielsen's Consistency & Standards, Aesthetic & Minimalist Design, platform conventions, brand consistency.

| #   | ID                | Mô tả Checklist Item                                                                             | Heuristic Nguồn           | Trạng Thái | Ghi Chú / Bug Ref |
| --- | ----------------- | ------------------------------------------------------------------------------------------------ | ------------------------- | ---------- | ----------------- |
| 1   | HOME-GUI-IA01-001 | Logo ở header có kích thước và vị trí nhất quán; click logo điều hướng về Trang Chủ              | Nielsen #4 Consistency    |            |                   |
| 2   | HOME-GUI-IA01-002 | Các nút hành động tích cực (Đăng nhập, Đăng ký) dùng màu xanh dương nhất quán theo FR-21         | FR-21 Color consistency   |            |                   |
| 3   | HOME-GUI-IA01-003 | Contrast màu text/nền đạt tỷ lệ tối thiểu 4.5:1 cho text thường (WCAG AA)                        | WCAG 2.1 SC 1.4.3         |            |                   |
| 4   | HOME-GUI-IA01-004 | Phân cấp typography rõ ràng: tiêu đề trang (h1) lớn hơn tiêu đề card (h2/h3) lớn hơn body text   | Nielsen #8 Aesthetic      |            |                   |
| 5   | HOME-GUI-IA01-005 | Spacing/padding giữa các product card trong grid đồng đều (không có card bị lệch lạc)            | FR-21 Spacing consistency |            |                   |
| 6   | HOME-GUI-IA01-006 | Icon giỏ hàng trong header cùng kiểu icon-set với các icon khác trên trang (không trộn style)    | Nielsen #4 Consistency    |            |                   |
| 7   | HOME-GUI-IA01-007 | Font chữ nhất quán trong toàn trang Chủ (không trộn nhiều font không liên quan)                  | Nielsen #4 Consistency    |            |                   |
| 8   | HOME-GUI-IA01-008 | Product card có kích thước, border-radius và shadow đồng đều trong toàn bộ grid                  | Nielsen #4 Consistency    |            |                   |
| 9   | HOME-GUI-IA01-009 | Tất cả nhãn (label), placeholder và thông báo trong trang dùng tiếng Việt nhất quán (FR-21)      | FR-21 Language            |            |                   |
| 10  | HOME-GUI-IA01-010 | Ký hiệu tiền tệ `₫` và định dạng phân cách hàng nghìn nhất quán trên tất cả giá sản phẩm (FR-21) | FR-21 Currency format     |            |                   |
| 11  | HOME-GUI-IA01-011 | Footer hiển thị thông tin phù hợp, không có text placeholder (Lorem Ipsum, "Coming soon"…)       | Nielsen #8 Aesthetic      |            |                   |
| 12  | HOME-GUI-IA01-012 | Không có element bị overflow/clip ngoài viewport khi xem ở độ phân giải 1280×720                 | Platform convention       |            |                   |

---

## IA-02 — Biểu Mẫu (Forms)

> **Phạm vi IA-02 trên Trang Chủ:** Thanh tìm kiếm là form duy nhất.  
> **Heuristic seeds:** field-level validation, label/placeholder clarity, error specificity, input constraints, keyboard accessibility.

| #   | ID                | Mô tả Checklist Item                                                                             | Heuristic Nguồn                    | Trạng Thái | Ghi Chú / Bug Ref |
| --- | ----------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------- | ---------- | ----------------- |
| 13  | HOME-GUI-IA02-013 | Thanh tìm kiếm có placeholder text mô tả rõ hành động (VD: "Tìm kiếm sản phẩm...")               | Label/Placeholder clarity          |            |                   |
| 14  | HOME-GUI-IA02-014 | Nút tìm kiếm (icon kính lúp / nút "Tìm") đặt cạnh input, hiển thị rõ ràng và không bị ẩn         | Nielsen #6 Recognition over Recall |            |                   |
| 15  | HOME-GUI-IA02-015 | Nhấn Enter trong ô tìm kiếm kích hoạt tìm kiếm (keyboard submit)                                 | FR-21 Tab Order                    |            |                   |
| 16  | HOME-GUI-IA02-016 | Từ khóa tìm kiếm có chứa ký tự HTML (VD: `<b>test</b>`) được hiển thị an toàn, không render HTML | SEC-04, FR-05                      |            |                   |
| 17  | HOME-GUI-IA02-017 | Thanh tìm kiếm có outline/border rõ ràng khi được focus (focus indicator hiển thị)               | WCAG 2.1 SC 2.4.7                  |            |                   |
| 18  | HOME-GUI-IA02-018 | Khi xóa toàn bộ nội dung thanh tìm kiếm, danh sách sản phẩm reset về trạng thái toàn bộ ban đầu  | FR-05                              |            |                   |
| 19  | HOME-GUI-IA02-019 | Thanh tìm kiếm có thể điều hướng đến và kích hoạt chỉ bằng bàn phím (Tab + Enter)                | FR-21 Tab Order                    |            |                   |
| 20  | HOME-GUI-IA02-020 | Ô tìm kiếm không bị clip/overflow trên viewport mobile (≤ 375px)                                 | Platform convention                |            |                   |

---

## IA-03 — Điều Hướng (Navigation)

> **Heuristic seeds:** active state in menus, breadcrumb/back-nav, number of clicks to key actions, consistent placement of nav, deep-link/browser back-button.

| #   | ID                | Mô tả Checklist Item                                                                                   | Heuristic Nguồn             | Trạng Thái | Ghi Chú / Bug Ref |
| --- | ----------------- | ------------------------------------------------------------------------------------------------------ | --------------------------- | ---------- | ----------------- |
| 21  | HOME-GUI-IA03-021 | Navbar highlight (active state) rõ ràng cho mục "Trang Chủ" khi đang ở trang này (FR-23)               | FR-23 Navigation            |            |                   |
| 22  | HOME-GUI-IA03-022 | Link "Giỏ hàng" trong header hiển thị badge số lượng sản phẩm trong giỏ (FR-23)                        | FR-23 Cart badge            |            |                   |
| 23  | HOME-GUI-IA03-023 | Nút Đăng xuất có nhãn đúng là "Đăng xuất" (không phải "Logout", "Thoát") khi đã đăng nhập (FR-23)      | FR-23 Navigation            |            |                   |
| 24  | HOME-GUI-IA03-024 | Trang Chủ có đúng **1 thẻ `<h1>`** trong DOM (không nhiều hơn, không ít hơn) (FR-05, FR-21)            | FR-05, FR-21                |            |                   |
| 25  | HOME-GUI-IA03-025 | Click logo đưa người dùng về Trang Chủ từ bất kỳ trang nào                                             | Nielsen #1 Visibility       |            |                   |
| 26  | HOME-GUI-IA03-026 | Sau khi đăng nhập, navbar cập nhật hiển thị tên người dùng / avatar (không còn hiện nút Đăng nhập)     | FR-02                       |            |                   |
| 27  | HOME-GUI-IA03-027 | Mỗi product card có thể click và điều hướng đến trang chi tiết sản phẩm đúng                           | FR-06                       |            |                   |
| 28  | HOME-GUI-IA03-028 | Nhấn nút Back của trình duyệt sau khi vào chi tiết sản phẩm quay lại đúng Trang Chủ (không loop/error) | Deep-link / back-button     |            |                   |
| 29  | HOME-GUI-IA03-029 | Footer có các link điều hướng hoạt động đúng (không có broken link 404)                                | Nielsen #5 Error Prevention |            |                   |
| 30  | HOME-GUI-IA03-030 | Từ Trang Chủ, người dùng có thể đến giỏ hàng trong ≤ 2 clicks                                          | IA depth / click efficiency |            |                   |

---

## IA-04 — Phản Hồi & Trạng Thái (Feedback / State)

> **Heuristic seeds:** loading states, empty states, toast/error visibility, disabled vs enabled states, optimistic UI vs server confirmation.

| #   | ID                | Mô tả Checklist Item                                                                                           | Heuristic Nguồn                        | Trạng Thái | Ghi Chú / Bug Ref |
| --- | ----------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ---------- | ----------------- |
| 31  | HOME-GUI-IA04-031 | Khi đang tải danh sách sản phẩm, trang hiển thị loading state (spinner hoặc skeleton card) (FR-05)             | FR-05, Nielsen #1 Visibility           |            |                   |
| 32  | HOME-GUI-IA04-032 | Khi không có kết quả tìm kiếm, trang hiển thị empty state với icon/hình minh họa và message thân thiện (FR-05) | FR-05, FR-24                           |            |                   |
| 33  | HOME-GUI-IA04-033 | Khi tìm kiếm thành công, danh sách sản phẩm cập nhật đúng các sản phẩm phù hợp từ khóa                         | FR-05                                  |            |                   |
| 34  | HOME-GUI-IA04-034 | Mỗi ảnh sản phẩm có thuộc tính `alt` mô tả nội dung ảnh (không rỗng, không là `""`) (FR-05, FR-24)             | FR-05, FR-24, WCAG                     |            |                   |
| 35  | HOME-GUI-IA04-035 | Giá sản phẩm hiển thị đúng định dạng: có ký hiệu `₫` và dấu phân cách hàng nghìn (FR-05)                       | FR-05, FR-21                           |            |                   |
| 36  | HOME-GUI-IA04-036 | Tên sản phẩm dài không bị overflow ra ngoài card (có truncate với ellipsis hoặc wrap phù hợp)                  | Nielsen #8 Aesthetic                   |            |                   |
| 37  | HOME-GUI-IA04-037 | Ảnh sản phẩm không bị biến dạng tỷ lệ (distort) — aspect ratio được bảo toàn (FR-05)                           | FR-05                                  |            |                   |
| 38  | HOME-GUI-IA04-038 | Khi hover trên product card, có phản hồi trực quan (shadow nổi, màu đổi, hoặc scale nhẹ)                       | Nielsen #1 Visibility                  |            |                   |
| 39  | HOME-GUI-IA04-039 | Từ khóa tìm kiếm chứa `<script>alert(1)</script>` không thực thi JavaScript (XSS prevention)                   | SEC-04, FR-05                          |            |                   |
| 40  | HOME-GUI-IA04-040 | Khi header là sticky, nội dung page scroll phía dưới không bị che khuất bởi header                             | Platform convention                    |            |                   |
| 41  | HOME-GUI-IA04-041 | Khi mạng chậm/lỗi (offline), trang hiển thị thông báo lỗi thay vì màn hình trắng                               | Nielsen #9 Help users recognize errors |            |                   |

---

## Mục Items Bổ Sung — Đánh Giá Độc Lập Của Sinh Viên

> **Nguồn:** Sinh viên tự bổ sung sau khi thực hiện Step 6 (Gap Analysis).  
> Các item này **không** được AI gợi ý — sinh viên tự phát hiện và điền vào đây để thực thi kiểm thử.

| #   | ID | Mô tả Checklist Item | Heuristic Nguồn | Trạng Trạng Thái | Ghi Chú / Bug Ref |
| --- | -- | -------------------- | --------------- | ---------------- | ----------------- |
| 42  |    | _(Sinh viên tự điền)_ | Student-added   |                  |                   |
| 43  |    | _(Sinh viên tự điền)_ | Student-added   |                  |                   |
| 44  |    | _(Sinh viên tự điền)_ | Student-added   |                  |                   |
| 45  |    | _(Sinh viên tự điền)_ | Student-added   |                  |                   |

---

## Phân Tích Gap AI & Items Bổ Sung (Step 6 — Mandatory Human Review)

> **Lưu ý quan trọng:** Các đánh giá về gap của AI và giải thích lý do bỏ sót được ghi nhận tại file riêng biệt:
> Xem chi tiết và điền tại: [ai_gap_analysis.md](./ai_gap_analysis.md)

---

## Tóm tắt Kết quả

| IA Aspect            | Số Item | Passed | Failed | N/A | Blocked |
| -------------------- | ------- | ------ | ------ | --- | ------- |
| IA-01 General UI     | 12      |        |        |     |         |
| IA-02 Forms          | 8       |        |        |     |         |
| IA-03 Navigation     | 10      |        |        |     |         |
| IA-04 Feedback/State | 11      |        |        |     |         |
| Student-added        |        |        |        |     |         |
| **TỔNG**             | **41**  |        |        |     |         |

---

## Hướng Dẫn Thực Thi (Step 7)

1. Mở `http://localhost:5173` trong trình duyệt.
2. Kiểm tra từng item trong bảng trên, đánh dấu `Passed` / `Failed` / `N/A`.
3. Với mỗi item `Failed`: chụp màn hình và lưu vào `tests/checklists/home/screenshots/` theo convention `IA0X_itemNN_failed.png`.
4. Tạo bug file theo hướng dẫn skill `bug-report-github` và điền `BUG-0XX` vào cột Ghi Chú.
5. Item chỉ được đổi từ `Failed` → `Passed` sau khi retest và bug tương ứng được đóng.

---

_Checklist được tạo theo hướng dẫn skill `gui-checklist-ai` — Phiên bản: 1.0 — Ngày tạo: 2026-07-30_

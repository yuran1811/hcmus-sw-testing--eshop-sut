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

| #   | ID                | Mô tả Checklist Item                                                                             | Heuristic Nguồn           | Trạng Thái | Ghi Chú / Bug Ref     |
| --- | ----------------- | ------------------------------------------------------------------------------------------------ | ------------------------- | ---------- | --------------------- |
| 1   | HOME-GUI-IA01-001 | Logo ở header có kích thước và vị trí nhất quán; click logo điều hướng về Trang Chủ              | Nielsen #4 Consistency    | Passed     |                       |
| 2   | HOME-GUI-IA01-002 | Các nút hành động tích cực (Đăng nhập, Đăng ký) dùng màu xanh dương nhất quán theo FR-21         | FR-21 Color consistency   | Passed     |                       |
| 3   | HOME-GUI-IA01-003 | Contrast màu text/nền đạt tỷ lệ tối thiểu 4.5:1 cho text thường (WCAG AA)                        | WCAG 2.1 SC 1.4.3         | Passed     |                       |
| 4   | HOME-GUI-IA01-004 | Phân cấp typography rõ ràng: tiêu đề trang (h1) lớn hơn tiêu đề card (h2/h3) lớn hơn body text   | Nielsen #8 Aesthetic      | Passed     |                       |
| 5   | HOME-GUI-IA01-005 | Spacing/padding giữa các product card trong grid đồng đều (không có card bị lệch lạc)            | FR-21 Spacing consistency | Passed     |                       |
| 6   | HOME-GUI-IA01-006 | Icon giỏ hàng trong header cùng kiểu icon-set với các icon khác trên trang (không trộn style)    | Nielsen #4 Consistency    | Passed     |                       |
| 7   | HOME-GUI-IA01-007 | Font chữ nhất quán trong toàn trang Chủ (không trộn nhiều font không liên quan)                  | Nielsen #4 Consistency    | Passed     |                       |
| 8   | HOME-GUI-IA01-008 | Product card có kích thước, border-radius và shadow đồng đều trong toàn bộ grid                  | Nielsen #4 Consistency    | Passed     |                       |
| 9   | HOME-GUI-IA01-009 | Tất cả nhãn (label), placeholder và thông báo trong trang dùng tiếng Việt nhất quán (FR-21)      | FR-21 Language            | Passed     |                       |
| 10  | HOME-GUI-IA01-010 | Ký hiệu tiền tệ `₫` và định dạng phân cách hàng nghìn nhất quán trên tất cả giá sản phẩm (FR-21) | FR-21 Currency format     | Failed     | BUG-HOME-GUI-IA01-010 |
| 11  | HOME-GUI-IA01-011 | Footer hiển thị thông tin phù hợp, không có text placeholder (Lorem Ipsum, "Coming soon"…)       | Nielsen #8 Aesthetic      | Passed     |                       |
| 12  | HOME-GUI-IA01-012 | Không có element bị overflow/clip ngoài viewport khi xem ở độ phân giải 1280×720                 | Platform convention       | Passed     |                       |

---

## IA-02 — Biểu Mẫu (Forms)

> **Phạm vi IA-02 trên Trang Chủ:** Thanh tìm kiếm là form duy nhất.  
> **Heuristic seeds:** field-level validation, label/placeholder clarity, error specificity, input constraints, keyboard accessibility.

| #   | ID                | Mô tả Checklist Item                                                                             | Heuristic Nguồn                    | Trạng Thái | Ghi Chú / Bug Ref     |
| --- | ----------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------- | ---------- | --------------------- |
| 13  | HOME-GUI-IA02-013 | Thanh tìm kiếm có placeholder text mô tả rõ hành động (VD: "Tìm kiếm sản phẩm...")               | Label/Placeholder clarity          | Failed     | BUG-HOME-GUI-IA02-013 |
| 14  | HOME-GUI-IA02-014 | Nút tìm kiếm (icon kính lúp / nút "Tìm") đặt cạnh input, hiển thị rõ ràng và không bị ẩn         | Nielsen #6 Recognition over Recall | Passed     |                       |
| 15  | HOME-GUI-IA02-015 | Nhấn Enter trong ô tìm kiếm kích hoạt tìm kiếm (keyboard submit)                                 | FR-21 Tab Order                    | Passed     |                       |
| 16  | HOME-GUI-IA02-016 | Từ khóa tìm kiếm có chứa ký tự HTML (VD: `<b>test</b>`) được hiển thị an toàn, không render HTML | SEC-04, FR-05                      | Failed     | BUG-HOME-GUI-IA02-016 |
| 17  | HOME-GUI-IA02-017 | Thanh tìm kiếm có outline/border rõ ràng khi được focus (focus indicator hiển thị)               | WCAG 2.1 SC 2.4.7                  | Passed     |                       |
| 18  | HOME-GUI-IA02-018 | Khi xóa toàn bộ nội dung thanh tìm kiếm, danh sách sản phẩm reset về trạng thái toàn bộ ban đầu  | FR-05                              | Failed     | BUG-HOME-GUI-IA02-018 |
| 19  | HOME-GUI-IA02-019 | Thanh tìm kiếm có thể điều hướng đến và kích hoạt chỉ bằng bàn phím (Tab + Enter)                | FR-21 Tab Order                    | Passed     |                       |
| 20  | HOME-GUI-IA02-020 | Ô tìm kiếm không bị clip/overflow trên viewport mobile (≤ 375px)                                 | Platform convention                | Passed     |                       |

---

## IA-03 — Điều Hướng (Navigation)

> **Heuristic seeds:** active state in menus, breadcrumb/back-nav, number of clicks to key actions, consistent placement of nav, deep-link/browser back-button.

| #   | ID                | Mô tả Checklist Item                                                                                   | Heuristic Nguồn             | Trạng Thái | Ghi Chú / Bug Ref     |
| --- | ----------------- | ------------------------------------------------------------------------------------------------------ | --------------------------- | ---------- | --------------------- |
| 21  | HOME-GUI-IA03-021 | Navbar highlight (active state) rõ ràng cho mục "Trang Chủ" khi đang ở trang này (FR-23)               | FR-23 Navigation            | Failed     | BUG-HOME-GUI-IA03-021 |
| 22  | HOME-GUI-IA03-022 | Link "Giỏ hàng" trong header hiển thị badge số lượng sản phẩm trong giỏ (FR-23)                        | FR-23 Cart badge            | Failed     | BUG-HOME-GUI-IA03-022 |
| 23  | HOME-GUI-IA03-023 | Nút Đăng xuất có nhãn đúng là "Đăng xuất" (không phải "Logout", "Thoát") khi đã đăng nhập (FR-23)      | FR-23 Navigation            | Failed     | BUG-HOME-GUI-IA03-023 |
| 24  | HOME-GUI-IA03-024 | Trang Chủ có đúng **1 thẻ `<h1>`** trong DOM (không nhiều hơn, không ít hơn) (FR-05, FR-21)            | FR-05, FR-21                | Failed     | BUG-HOME-GUI-IA03-024 |
| 25  | HOME-GUI-IA03-025 | Click logo đưa người dùng về Trang Chủ từ bất kỳ trang nào                                             | Nielsen #1 Visibility       | Passed     |                       |
| 26  | HOME-GUI-IA03-026 | Sau khi đăng nhập, navbar cập nhật hiển thị tên người dùng / avatar (không còn hiện nút Đăng nhập)     | FR-02                       | Passed     |                       |
| 27  | HOME-GUI-IA03-027 | Mỗi product card có thể click và điều hướng đến trang chi tiết sản phẩm đúng                           | FR-06                       | Passed     |                       |
| 28  | HOME-GUI-IA03-028 | Nhấn nút Back của trình duyệt sau khi vào chi tiết sản phẩm quay lại đúng Trang Chủ (không loop/error) | Deep-link / back-button     | Passed     |                       |
| 29  | HOME-GUI-IA03-029 | Footer có các link điều hướng hoạt động đúng (không có broken link 404)                                | Nielsen #5 Error Prevention | Failed     | BUG-HOME-GUI-IA03-029 |
| 30  | HOME-GUI-IA03-030 | Từ Trang Chủ, người dùng có thể đến giỏ hàng trong ≤ 2 clicks                                          | IA depth / click efficiency | Passed     |                       |

---

## IA-04 — Phản Hồi & Trạng Thái (Feedback / State)

> **Heuristic seeds:** loading states, empty states, toast/error visibility, disabled vs enabled states, optimistic UI vs server confirmation.

| #   | ID                | Mô tả Checklist Item                                                                                           | Heuristic Nguồn                        | Trạng Thái | Ghi Chú / Bug Ref     |
| --- | ----------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ---------- | --------------------- |
| 31  | HOME-GUI-IA04-031 | Khi đang tải danh sách sản phẩm, trang hiển thị loading state (spinner hoặc skeleton card) (FR-05)             | FR-05, Nielsen #1 Visibility           | Failed     | BUG-HOME-GUI-IA04-031 |
| 32  | HOME-GUI-IA04-032 | Khi không có kết quả tìm kiếm, trang hiển thị empty state với icon/hình minh họa và message thân thiện (FR-05) | FR-05, FR-24                           | Failed     | BUG-HOME-GUI-IA04-032 |
| 33  | HOME-GUI-IA04-033 | Khi tìm kiếm thành công, danh sách sản phẩm cập nhật đúng các sản phẩm phù hợp từ khóa                         | FR-05                                  | Passed     |                       |
| 34  | HOME-GUI-IA04-034 | Mỗi ảnh sản phẩm có thuộc tính `alt` mô tả nội dung ảnh (không rỗng, không là `""`) (FR-05, FR-24)             | FR-05, FR-24, WCAG                     | Failed     | BUG-HOME-GUI-IA04-034 |
| 35  | HOME-GUI-IA04-035 | Giá sản phẩm hiển thị đúng định dạng: có ký hiệu `₫` và dấu phân cách hàng nghìn (FR-05)                       | FR-05, FR-21                           | Failed     | BUG-HOME-GUI-IA04-035 |
| 36  | HOME-GUI-IA04-036 | Tên sản phẩm dài không bị overflow ra ngoài card (có truncate với ellipsis hoặc wrap phù hợp)                  | Nielsen #8 Aesthetic                   | Passed     |                       |
| 37  | HOME-GUI-IA04-037 | Ảnh sản phẩm không bị biến dạng tỷ lệ (distort) — aspect ratio được bảo toàn (FR-05)                           | FR-05                                  | Passed     |                       |
| 38  | HOME-GUI-IA04-038 | Khi hover trên product card, có phản hồi trực quan (shadow nổi, màu đổi, hoặc scale nhẹ)                       | Nielsen #1 Visibility                  | Failed     | BUG-HOME-GUI-IA04-038 |
| 39  | HOME-GUI-IA04-039 | Từ khóa tìm kiếm chứa `<script>alert(1)</script>` không thực thi JavaScript (XSS prevention)                   | SEC-04, FR-05                          | Passed     |                       |
| 40  | HOME-GUI-IA04-040 | Khi header là sticky, nội dung page scroll phía dưới không bị che khuất bởi header                             | Platform convention                    | Passed     |                       |
| 41  | HOME-GUI-IA04-041 | Khi mạng chậm/lỗi (offline), trang hiển thị thông báo lỗi thay vì màn hình trắng                               | Nielsen #9 Help users recognize errors | Failed     | BUG-HOME-GUI-IA04-041 |

---

## Mục Items Bổ Sung — Đánh Giá Độc Lập Của Sinh Viên

> **Nguồn:** Sinh viên tự bổ sung sau khi thực hiện Step 6 (Gap Analysis).  
> Các item này **không** được AI gợi ý — sinh viên tự phát hiện và điền vào đây để thực thi kiểm thử.

| #   | ID                | Mô tả Checklist Item                                                                                                                                                    | Heuristic Nguồn | Trạng Trạng Thái | Ghi Chú / Bug Ref     |
| --- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ---------------- | --------------------- |
| 42  | HOME-GUI-IA02-042 | Các control trên Home phải có tên truy cập rõ ràng cho screen reader, đặc biệt là ô tìm kiếm, link Giỏ hàng, Đăng nhập, Đăng ký và các nút trong product card.          | Student-added   | Passed           |                       |
| 43  | HOME-GUI-IA02-043 | Người dùng chỉ dùng bàn phím phải đi được hết Home theo thứ tự hợp lý, từ header đến search rồi tới các action trong từng product card, không bị nhảy focus bất thường. | Student-added   | Passed           |                       |
| 44  | HOME-GUI-IA04-044 | Khi API sản phẩm chậm hoặc lỗi, Home phải cho người dùng thấy trạng thái chờ hoặc lỗi rõ ràng, không để họ nhìn vào một vùng trống khó hiểu.                            | Student-added   | Failed           | BUG-HOME-GUI-IA04-044 |
| 45  | HOME-GUI-IA01-045 | Ở màn hình hẹp, cụm search và các nút hành động của sản phẩm phải vẫn gọn, đủ khoảng chạm và không làm vỡ nhịp đọc của card.                                            | Student-added   | Passed           |                       |
| 46  | HOME-GUI-IA03-046 | Logo, Giỏ hàng, Đăng nhập, Đăng ký và liên kết Xem chi tiết phải đưa người dùng tới đúng trang mà nhãn đang nói tới, không được trỏ sai đích.                           | Student-added   | Passed           |                       |
| 47  | HOME-GUI-IA03-047 | Các trang người dùng đi tới từ Home như Giỏ hàng, Đăng nhập, Đăng ký và Chi tiết sản phẩm không được là trang cụt; phải có lối đi rõ ràng để quay lại hoặc tiếp tục.    | Student-added   | Passed           |                       |
| 48  | HOME-GUI-IA03-048 | Khi truy cập một đường dẫn không tồn tại trong web app, hệ thống phải hiển thị trang 404 thân thiện và có đường quay về Trang Chủ hoặc ô tìm kiếm.                      | Student-added   | Failed           | BUG-HOME-GUI-IA03-048 |
| 49  | HOME-GUI-IA01-049 | Các liên kết và nút trên Home phải có trạng thái hover/visited/active dễ phân biệt, nhất là những link điều hướng ở header và link Xem chi tiết.                        | Student-added   | Failed           | BUG-HOME-GUI-IA01-049 |
| 50  | HOME-GUI-IA04-050 | Nếu ảnh sản phẩm không tải được, card vẫn phải giữ bố cục đọc được và tên/giá sản phẩm vẫn nhìn rõ, không làm vỡ toàn bộ trang.                                         | Student-added   | Passed           |                       |
| 51  | HOME-GUI-IA02-051 | Ô tìm kiếm phải xử lý được từ khóa chữ, số và ký tự đặc biệt hợp lệ mà không làm vỡ layout hay render lỗi trên trang.                                                   | Student-added   | Passed           |                       |
| 52  | HOME-GUI-IA01-052 | Tiêu đề tab trình duyệt của Home phải rõ ràng, không giữ mặc định kiểu scaffold như `frontend-web`, để người dùng nhận diện đúng trang đang mở.                         | Student-added   | Failed           | BUG-HOME-GUI-IA01-052 |
| 53  | HOME-GUI-IA02-053 | Ô tìm kiếm phải xử lý ổn định khoảng trắng đầu/cuối và chuỗi chữ-số-ký tự đặc biệt hợp lệ mà không làm sai kết quả hoặc vỡ layout.                                      | Student-added   | Failed           | BUG-HOME-GUI-IA02-053 |
| 54  | HOME-GUI-IA01-054 | Thuộc tính `lang` của tài liệu HTML phải phản ánh đúng ngôn ngữ hiển thị của trang Home, không để mặc định `en` khi giao diện đang là tiếng Việt.                       | Student-added   | Failed           | BUG-HOME-GUI-IA01-054 |

---

## Phân Tích Gap AI & Items Bổ Sung (Step 6 — Mandatory Human Review)

> **Lưu ý quan trọng:** Các đánh giá về gap của AI và giải thích lý do bỏ sót được ghi nhận tại file riêng biệt:
> Xem chi tiết và điền tại: [ai_gap_analysis.md](./ai_gap_analysis.md)

---

## Tóm tắt Kết quả

| IA Aspect            | Số Item | Passed | Failed | N/A   | Blocked |
| -------------------- | ------- | ------ | ------ | ----- | ------- |
| IA-01 General UI     | 12      | 8      | 4      | 0     | 0       |
| IA-02 Forms          | 8       | 4      | 4      | 0     | 0       |
| IA-03 Navigation     | 10      | 4      | 6      | 0     | 0       |
| IA-04 Feedback/State | 11      | 5      | 6      | 0     | 0       |
| Student-added        | 13      | 7      | 6      | 0     | 0       |
| **TỔNG**             | **54**  | **34** | **21** | **0** | **0**   |

---

## Hướng Dẫn Thực Thi (Step 7)

1. Mở `http://localhost:5173` trong trình duyệt.
2. Đối chiếu từng item trong bảng với hành vi thực tế trên trang Home và cập nhật đúng trạng thái `Passed` / `Failed` / `N/A` / `Blocked`.
3. Với mỗi item `Failed`, tạo 1 bug report riêng trong `tests/bug-reports/home/BUG-HOME-.../` theo skill `bug-report-github`.
4. Evidence ảnh trong bug report phải được đổi tên theo bug ID, ví dụ `BUG-HOME-GUI-IA04-034_01.png`, và file `.md` phải nhúng đúng ảnh đó.
5. Nội dung tái hiện lỗi cần ghi rõ ngay trong `Steps to reproduce`; không tách riêng `Test data` nếu thông tin đó chỉ dùng để tái hiện bug.
6. Chỉ cập nhật `BUG-...` vào cột Ghi Chú khi bug report đã được tạo xong và evidence đã khớp.
7. Item chỉ được đổi từ `Failed` sang `Passed` sau khi retest xác nhận lỗi đã hết hoặc hành vi đã đúng theo checklist.

---

_Checklist được tạo theo hướng dẫn skill `gui-checklist-ai` — Phiên bản: 1.0 — Ngày tạo: 2026-07-30_

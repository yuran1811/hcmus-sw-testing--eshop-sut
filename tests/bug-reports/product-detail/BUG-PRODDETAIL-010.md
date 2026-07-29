# BUG-PRODDETAIL-010: Nhóm lỗi hiển thị — ảnh bị phóng to vỡ nét, khoảng trắng thừa lớn giữa mô tả và ô số lượng, tiêu đề tab để mặc định

## Found by Test Case

PRODDETAIL-VIS-01, PRODDETAIL-VIS-04, PRODDETAIL-VIS-10 (GUI Checklist — Product Detail)

## Requirement liên quan

FR-06 (Xem chi tiết sản phẩm — hiển thị ảnh lớn, tên, giá, mô tả), FR-05 (ảnh sản phẩm phải có tỷ lệ chuẩn)

## Severity / Priority

Minor / P3

## Environment

- Browser: Chromium (Playwright MCP), viewport 1440×900
- OS: Windows 11
- URL: http://localhost:5173/product/1
- Build: nhánh `hw3/23127211`, commit `ff96609`

## Steps to reproduce

**Kịch bản 1 — Ảnh vỡ nét (VIS-01):**

1. Mở `http://localhost:5173/product/1` ở 1440×900
2. So sánh kích thước gốc của file ảnh (`naturalWidth × naturalHeight`) với kích thước render trên màn hình
3. Phóng to vùng ảnh và quan sát độ sắc nét của chữ trên ảnh

**Kịch bản 2 — Khoảng trắng thừa (VIS-04):**

1. Ở cùng trang, đo khoảng trắng dọc giữa đáy đoạn mô tả ("Điện thoại cao cấp của Apple" — chỉ 1 dòng) và nhãn "Số lượng:"

**Kịch bản 3 — Tiêu đề tab (VIS-10):**

1. Đọc tiêu đề tab trình duyệt khi đang ở trang chi tiết sản phẩm

## Expected result

- VIS-01: Ảnh hiển thị sắc nét, không bị vỡ hạt hay nhoè do bị phóng to vượt kích thước gốc
- VIS-04: Khoảng cách dọc nằm trong khoảng đồng nhất với các khối khác trên trang; không xuất hiện vùng trắng lớn bất thường giữa hai khối
- VIS-10: Tiêu đề tab chứa tên sản phẩm đang xem, không phải chuỗi mặc định của dự án

## Actual result

**VIS-01 — Ảnh bị phóng to 152%.** Ảnh gốc có `naturalWidth × naturalHeight = 300 × 300` px nhưng được render ở **455 × 455** px do class `w-full h-auto` trong cột chiếm nửa card. Tỉ lệ phóng ≈ 1,52× khiến chữ "iPhone 15" trên ảnh nhoè thấy rõ trong ảnh chụp màn hình. Ở viewport 767 px lỗi còn nặng hơn: ảnh render **670 × 670** px, tức phóng 2,23×.

**VIS-04 — Khoảng trắng thừa ~200 px.** Thẻ mô tả có class `flex-grow`:

```html
<p class="text-gray-700 mb-6 flex-grow">Điện thoại cao cấp của Apple</p>
```

Trong flex column, `flex-grow` khiến thẻ này giãn ra chiếm hết chiều cao còn dư của cột — đo được **225 px** dù chỉ chứa 1 dòng chữ cao ~24 px. Kết quả là một vùng trắng khoảng 200 px nằm giữa mô tả và khối "Số lượng", trong khi các khối khác trên trang chỉ cách nhau 16–32 px. Lỗi lộ rõ nhất với sản phẩm có mô tả ngắn (toàn bộ 5 sản phẩm trong dữ liệu seed đều có mô tả 1 dòng).

**VIS-10 — Tiêu đề tab mặc định.** `document.title` = `frontend-web` (chuỗi mặc định của Vite) trên **mọi** sản phẩm, không hề chứa tên sản phẩm đang xem. Ảnh hưởng tới việc phân biệt tab, bookmark và SEO.

## Evidence

- Screenshot (ảnh nhoè + vùng trắng thừa giữa mô tả và "Số lượng:"): ![BUG-PRODDETAIL-010-visual](../screenshots/BUG-PRODDETAIL-010-whitespace-and-upscaled-image.png)

## Notes

Ba lỗi đều thuần hiển thị, không ảnh hưởng chức năng, nên xếp P3. Hướng sửa: (1) dùng ảnh nguồn ≥ 600 px hoặc giới hạn `max-width: 300px` cho ảnh; (2) bỏ `flex-grow` khỏi thẻ mô tả; (3) set `document.title` theo tên sản phẩm trong `useEffect`.

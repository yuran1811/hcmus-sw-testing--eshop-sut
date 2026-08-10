# TC-PLAS-006: Kiểm tra trạng thái tải dữ liệu (Loading State)

## Requirement ID

FR-05

## Module / Test type / Technique

Product List & Search / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Cơ sở dữ liệu EShop đã có sản phẩm.
- Kết nối API `GET /api/products` bị làm chậm (ví dụ: dùng tính năng Network Throttling - Fast/Slow 3G trong Chrome DevTools, hoặc thêm độ trễ ở Backend).

## Test data

| Field  | Value      |
| ------ | ---------- |
| search | "" (Trống) |

## Test steps

1. Mở Chrome Developer Tools, chuyển sang tab Network và cấu hình throttling là `Slow 3G`.
2. Truy cập trang chủ EShop (`http://localhost:5173`).
3. Quan sát giao diện ngay khi trang bắt đầu tải dữ liệu.
4. Chờ cho đến khi dữ liệu tải xong và quan sát sự thay đổi giao diện.

## Expected result

- Trong lúc dữ liệu đang được tải, giao diện hiển thị rõ ràng chỉ báo đang tải (ví dụ: spinner quay, thanh tiến trình, hoặc dòng chữ "Loading..." / "Đang tải...").
- Sau khi tải xong, chỉ báo loading biến mất hoàn toàn và danh sách sản phẩm hiển thị đầy đủ.
- Chỉ tồn tại đúng 1 thẻ `<h1>` duy nhất trên trang.

## EC / Partition Covered

EC10 (API đang loading) + EC7 (DB có sản phẩm) + OC4 (đúng 1 thẻ `<h1>`)

## Status / Related bugs

Fail / BUG-PLAS-006

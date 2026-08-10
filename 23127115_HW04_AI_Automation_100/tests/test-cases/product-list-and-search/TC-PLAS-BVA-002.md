# TC-PLAS-BVA-002: Tìm kiếm tại biên độ bền tham chiếu 255 ký tự

## Requirement ID

FR-05

## Module / Test type / Technique

Product List & Search / Robustness / 3-Point Reference Analysis (`R = 255`)

## Preconditions

- Cơ sở dữ liệu EShop đã có các sản phẩm (ví dụ: iPhone 15 Pro Max, MacBook Pro M3, Tai nghe AirPods Pro 2).
- Người dùng đang ở trang chủ EShop.

## Test data

| Field  | Value                                                                                                                                                                                                                                                             |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| search | "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" |

## Test steps

1. Truy cập trang chủ EShop (`http://localhost:5173`).
2. Nhập từ khóa dài đúng 255 ký tự vào thanh tìm kiếm.
3. Bấm nút Tìm kiếm (hoặc nhấn Enter).
4. Quan sát phản hồi của hệ thống và lưới sản phẩm.
5. Kiểm tra phần hiển thị từ khóa, chiều rộng trang và thanh cuộn ngang ở viewport desktop/mobile.

## Expected result

- Ô tìm kiếm nhận đủ 255 ký tự.
- Hệ thống gửi yêu cầu API thành công, không gặp lỗi Server Error (500) hay lỗi client.
- Lưới sản phẩm hiển thị thông báo không tìm thấy sản phẩm nào (empty state).
- Chuỗi dài được wrap/truncate bằng CSS phù hợp; không tràn viewport, không tạo thanh cuộn ngang và không đẩy vỡ lưới/header.
- Chỉ có đúng 1 thẻ `<h1>` duy nhất trên trang.

## BVA Coverage

Độ dài từ khóa tìm kiếm: mốc độ bền `R = 255`, điểm `R`. FR-05 không quy định độ dài tối đa; đây là 3-point robustness reference, không phải BVA tuân thủ đặc tả.

## Status / Related bugs

Fail / BUG-PLAS-007

# TC-PLAS-BVA-002: Tìm kiếm với từ khóa có độ dài tối đa cho phép (255 ký tự)

## Requirement ID

FR-05

## Module / Test type / Technique

Product List & Search / Functional / Boundary Value Analysis (3-Point + 2-Point BVA)

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

## Expected result

- Ô tìm kiếm nhận đủ 255 ký tự.
- Hệ thống gửi yêu cầu API thành công, không gặp lỗi Server Error (500) hay lỗi client.
- Lưới sản phẩm hiển thị thông báo không tìm thấy sản phẩm nào (empty state).
- Chỉ có đúng 1 thẻ `<h1>` duy nhất trên trang.

## BVA Coverage

Độ dài từ khóa tìm kiếm: Max length boundary (B = 255), điểm kiểm thử B. Kỹ thuật áp dụng: 3-Point + 2-Point BVA.

## Status / Related bugs

Not Run / None

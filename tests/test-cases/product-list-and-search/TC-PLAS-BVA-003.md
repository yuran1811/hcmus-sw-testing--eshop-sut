# TC-PLAS-BVA-003: Tìm kiếm với từ khóa vượt quá độ dài tối đa cho phép (256 ký tự)

## Requirement ID

FR-05

## Module / Test type / Technique

Product List & Search / Functional / Boundary Value Analysis (3-Point + 2-Point BVA)

## Preconditions

- Cơ sở dữ liệu EShop đã có các sản phẩm (ví dụ: iPhone 15 Pro Max, MacBook Pro M3, Tai nghe AirPods Pro 2).
- Người dùng đang ở trang chủ EShop.

## Test data

| Field  | Value                                                                                                                                                                                                                                                              |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| search | "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" |

## Test steps

1. Truy cập trang chủ EShop (`http://localhost:5173`).
2. Nhập từ khóa dài đúng 256 ký tự vào thanh tìm kiếm.
3. Bấm nút Tìm kiếm (hoặc nhấn Enter).
4. Quan sát phản hồi của hệ thống (kiểm tra xem hệ thống có tự động cắt chuỗi, giới hạn nhập, hoặc báo lỗi không).

## Expected result

- Hệ thống xử lý an toàn: Hoặc thanh tìm kiếm giới hạn độ dài ở mức 255 ký tự (không cho phép gõ ký tự thứ 256), hoặc hệ thống gửi đi và tự động cắt chuỗi về 255 ký tự, hoặc trả về lỗi validation hợp lệ (HTTP 400).
- Hệ thống không bị crash (không lỗi HTTP 500).

## BVA Coverage

Độ dài từ khóa tìm kiếm: Max length boundary (B = 255), điểm kiểm thử B + 1 = 256 ký tự. Kỹ thuật áp dụng: 3-Point + 2-Point BVA.

## Status / Related bugs

Fail / BUG-PLAS-007

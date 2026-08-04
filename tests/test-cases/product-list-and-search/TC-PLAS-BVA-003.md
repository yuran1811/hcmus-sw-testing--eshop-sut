# TC-PLAS-BVA-003: Tìm kiếm ngay trên biên độ bền tham chiếu 255 ký tự

## Requirement ID

FR-05

## Module / Test type / Technique

Product List & Search / Robustness / 3-Point Reference Analysis (`R = 255`)

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
5. Kiểm tra phần hiển thị từ khóa, chiều rộng trang và thanh cuộn ngang ở viewport desktop/mobile.

## Expected result

- Vì FR-05 không đặt giới hạn tối đa, hệ thống ưu tiên nhận và xử lý đủ 256 ký tự; nếu sản phẩm không khớp thì hiển thị empty state phù hợp.
- Chỉ chấp nhận cắt/chặn ở 255 khi giới hạn đó được tài liệu hóa và giao diện thông báo rõ ràng; không được cắt âm thầm.
- Hệ thống không bị crash (không lỗi HTTP 500).
- Dù xử lý theo policy nào, chuỗi không làm tràn viewport, kéo dài trang theo chiều ngang hoặc phá vỡ lưới/header.

## BVA Coverage

Độ dài từ khóa tìm kiếm: mốc độ bền `R = 255`, điểm `R + 1 = 256`. Đây là 3-point robustness reference, không phải giới hạn/BVA chính thức trong SRS.

## Status / Related bugs

Fail / BUG-PLAS-007

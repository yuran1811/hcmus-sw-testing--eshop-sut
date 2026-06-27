# TC-CART-MOBILE-022: Kiểm tra định dạng tiền tệ, màu sắc nút bấm và nhãn hiển thị Tổng cộng (Lỗi nhãn)

## Requirement ID

FR-20, FR-07, FR-21

## Module / Test type / Technique

Mobile Cart / GUI / Ad-hoc

## Preconditions

- Backend đang chạy tại `http://localhost:3000`
- Ứng dụng Expo Mobile đang chạy và kết nối với backend.
- Người dùng đã đăng nhập với tài khoản `test@eshop.com`.
- Giỏ hàng đang có sẵn sản phẩm "Sản phẩm A" với số lượng là 1 (giá 100,000 ₫).

## Test Data

Không có.

## Test Steps

1. Mở ứng dụng mobile EShop và vào màn hình Giỏ hàng.
2. Kiểm tra định dạng hiển thị giá sản phẩm, thành tiền và tổng tiền.
3. Kiểm tra nhãn mô tả tổng số tiền.
4. Kiểm tra màu sắc các nút bấm hành động tích cực ("Tiến hành thanh toán") và hành động nguy hiểm/xóa ("Xóa").

## Expected Result

- Định dạng tiền tệ: Hiển thị đúng phân cách hàng nghìn và có ký hiệu `₫` phía sau (ví dụ: `100.000 ₫`).
- Màu sắc nút bấm (FR-21): Nút "Tiến hành thanh toán" có màu xanh dương; nút "Xóa" có chữ/màu đỏ.
- Nhãn hiển thị tổng tiền (FR-07): Phải hiển thị chính xác là **"Tổng cộng"** (không được hiển thị là "Tổng tạm tính").
- Kết quả thực tế (Lỗi phát hiện): Nhãn hiển thị tổng tiền đang là **"Tổng tạm tính: 100.000 ₫"**, vi phạm nghiêm trọng yêu cầu FR-07.

## Status / Related Bugs

Not Run / None

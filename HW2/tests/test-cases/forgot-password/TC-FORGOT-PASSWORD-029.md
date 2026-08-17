# TC-FORGOT-PASSWORD-029: Kiểm tra tính ngẫu nhiên của mã OTP khi yêu cầu gửi liên tiếp (OTP Randomness)

## Requirement ID

FR-03

## Module / Test type / Technique

forgot-password / Functional / Equivalence Partitioning (Output Uniqueness)

## Preconditions

- Địa chỉ email `test@eshop.com` đã được đăng ký và kích hoạt trên hệ thống.

## Test data

| Parameter | Value |
| --- | --- |
| email | test@eshop.com |

## Test steps

1. Truy cập trang chủ EShop tại `http://localhost:5173`.
2. Đi tới trang đăng nhập, chọn "Quên mật khẩu?" để vào giao diện Bước 1.
3. Nhập email `test@eshop.com` và nhấn nút "Gửi mã OTP".
4. Ghi lại mã OTP lần 1 được hiển thị trực tiếp trên giao diện di động/web (môi trường demo).
5. Nhấp vào nút "Quay lại đăng nhập", sau đó chọn lại "Quên mật khẩu?" để quay lại Bước 1.
6. Nhập lại địa chỉ email `test@eshop.com` và nhấn nút "Gửi mã OTP" lần thứ 2.
7. Ghi lại mã OTP lần 2 được hiển thị trên giao diện và thực hiện so sánh hai mã thu được.

## Expected result

- Hệ thống gửi mã OTP thành công trong cả hai lần yêu cầu.
- Mã OTP lần 2 được sinh ra phải hoàn toàn khác biệt với mã OTP lần 1 (ví dụ: lần 1 sinh ra `382910`, lần 2 sinh ra `749201`), chứng minh mã OTP được sinh ngẫu nhiên thực sự theo đúng đặc tả FR-03.

## Status / Related bugs

Not Run / None

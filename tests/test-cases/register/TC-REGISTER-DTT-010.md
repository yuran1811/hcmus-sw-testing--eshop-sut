# TC-REGISTER-DTT-010: Email KHÔNG hợp lệ, mật khẩu mạnh, xác nhận KHÔNG khớp

## Requirement ID

FR-01

## Module / Test type / Technique

Register / Functional / Decision Table Testing

## Conditions

| Điều kiện | Giá trị |
|-----------|---------|
| C1: Email hợp lệ | F |
| C2: Email duy nhất | – (don't care) |
| C3: Mật khẩu mạnh | T |
| C4: Xác nhận khớp | F |

## Preconditions

- Ứng dụng đang chạy, trang Register có thể truy cập

## Test data

| Trường | Giá trị |
|--------|---------|
| Name | Nguyen Van J |
| Email | user@.com |
| Password | Abc@123456 |
| Confirm Password | Xyz@999999 |

## Test steps

1. Mở trang `/register`
2. Nhập Name: `Nguyen Van J`
3. Nhập Email: `user@.com` (domain không hợp lệ)
4. Nhập Password: `Abc@123456`
5. Nhập Confirm Password: `Xyz@999999`
6. Bấm nút Register

## Expected result

- **E2:** Hiển thị lỗi "Email không đúng định dạng"
- **E5:** Hiển thị lỗi "Xác nhận mật khẩu không khớp"
- Không tạo tài khoản, không redirect

## Status / Related bugs

Fail / BUG-01, BUG-03, BUG-04

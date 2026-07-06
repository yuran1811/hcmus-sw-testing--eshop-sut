# TC-REGISTER-DTT-009: Email KHÔNG hợp lệ, mật khẩu mạnh, xác nhận khớp

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
| C4: Xác nhận khớp | T |

## Preconditions

- Ứng dụng đang chạy, trang Register có thể truy cập

## Test data

| Trường | Giá trị |
|--------|---------|
| Name | Nguyen Van I |
| Email | notanemail |
| Password | Abc@123456 |
| Confirm Password | Abc@123456 |

## Test steps

1. Mở trang `/register`
2. Nhập Name: `Nguyen Van I`
3. Nhập Email: `notanemail` (không có ký tự `@` và domain)
4. Nhập Password: `Abc@123456`
5. Nhập Confirm Password: `Abc@123456`
6. Bấm nút Register

## Expected result

- **E2:** Hiển thị lỗi "Email không đúng định dạng"
- Không thực hiện truy vấn DB kiểm tra tính duy nhất
- Không tạo tài khoản, không redirect

## Status / Related bugs

Fail / BUG-01, BUG-03

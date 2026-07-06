# TC-REGISTER-DTT-002: Email hợp lệ, duy nhất, mật khẩu mạnh, xác nhận KHÔNG khớp

## Requirement ID

FR-01

## Module / Test type / Technique

Register / Functional / Decision Table Testing

## Conditions

| Điều kiện | Giá trị |
|-----------|---------|
| C1: Email hợp lệ | T |
| C2: Email duy nhất | T |
| C3: Mật khẩu mạnh | T |
| C4: Xác nhận khớp | F |

## Preconditions

- Ứng dụng đang chạy, trang Register có thể truy cập
- Email `newuser02@example.com` chưa tồn tại trong DB

## Test data

| Trường | Giá trị |
|--------|---------|
| Name | Nguyen Van B |
| Email | newuser02@example.com |
| Password | Abc@123456 |
| Confirm Password | Abc@1234567 |

## Test steps

1. Mở trang `/register`
2. Nhập Name: `Nguyen Van B`
3. Nhập Email: `newuser02@example.com`
4. Nhập Password: `Abc@123456`
5. Nhập Confirm Password: `Abc@1234567` (khác với password)
6. Bấm nút Register

## Expected result

- **E5:** Hiển thị lỗi "Xác nhận mật khẩu không khớp"
- Không tạo tài khoản, không redirect

## Status / Related bugs

Fail / BUG-03, BUG-04

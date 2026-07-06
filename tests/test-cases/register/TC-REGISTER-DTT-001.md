# TC-REGISTER-DTT-001: Đăng ký thành công (Happy Path)

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
| C4: Xác nhận khớp | T |

## Preconditions

- Ứng dụng đang chạy, trang Register có thể truy cập
- Email `newuser01@example.com` chưa tồn tại trong DB

## Test data

| Trường | Giá trị |
|--------|---------|
| Name | Nguyen Van A |
| Email | newuser01@example.com |
| Password | Abc@123456 |
| Confirm Password | Abc@123456 |

## Test steps

1. Mở trang `/register`
2. Nhập Name: `Nguyen Van A`
3. Nhập Email: `newuser01@example.com`
4. Nhập Password: `Abc@123456`
5. Nhập Confirm Password: `Abc@123456`
6. Bấm nút Register

## Expected result

- **E1:** Đăng ký thành công, tài khoản được tạo trong DB
- Hệ thống redirect sang trang Login

## Status / Related bugs

Fail / BUG-03

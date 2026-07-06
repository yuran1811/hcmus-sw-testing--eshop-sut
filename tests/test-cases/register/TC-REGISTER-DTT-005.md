# TC-REGISTER-DTT-005: Email hợp lệ, ĐÃ TỒN TẠI, mật khẩu mạnh, xác nhận khớp

## Requirement ID

FR-01

## Module / Test type / Technique

Register / Functional / Decision Table Testing

## Conditions

| Điều kiện | Giá trị |
|-----------|---------|
| C1: Email hợp lệ | T |
| C2: Email duy nhất | F |
| C3: Mật khẩu mạnh | T |
| C4: Xác nhận khớp | T |

## Preconditions

- Ứng dụng đang chạy, trang Register có thể truy cập
- Email `existing@example.com` **đã tồn tại** trong DB

## Test data

| Trường | Giá trị |
|--------|---------|
| Name | Nguyen Van E |
| Email | existing@example.com |
| Password | Abc@123456 |
| Confirm Password | Abc@123456 |

## Test steps

1. Mở trang `/register`
2. Nhập Name: `Nguyen Van E`
3. Nhập Email: `existing@example.com` (email đã đăng ký)
4. Nhập Password: `Abc@123456`
5. Nhập Confirm Password: `Abc@123456`
6. Bấm nút Register

## Expected result

- **E3:** Hiển thị lỗi "Email đã được sử dụng"
- Không tạo tài khoản trùng, không redirect

## Status / Related bugs

Fail / BUG-02, BUG-03

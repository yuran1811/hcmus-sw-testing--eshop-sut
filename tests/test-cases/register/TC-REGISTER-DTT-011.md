# TC-REGISTER-DTT-011: Email KHÔNG hợp lệ, mật khẩu YẾU, xác nhận khớp

## Requirement ID

FR-01

## Module / Test type / Technique

Register / Functional / Decision Table Testing

## Conditions

| Điều kiện | Giá trị |
|-----------|---------|
| C1: Email hợp lệ | F |
| C2: Email duy nhất | – (don't care) |
| C3: Mật khẩu mạnh | F |
| C4: Xác nhận khớp | T |

## Preconditions

- Ứng dụng đang chạy, trang Register có thể truy cập

## Test data

| Trường | Giá trị |
|--------|---------|
| Name | Nguyen Van K |
| Email | @nodomain |
| Password | abc123 |
| Confirm Password | abc123 |

## Test steps

1. Mở trang `/register`
2. Nhập Name: `Nguyen Van K`
3. Nhập Email: `@nodomain` (thiếu local part)
4. Nhập Password: `abc123`
5. Nhập Confirm Password: `abc123`
6. Bấm nút Register

## Expected result

- **E2:** Hiển thị lỗi "Email không đúng định dạng"
- **E4:** Hiển thị lỗi "Mật khẩu quá yếu"
- Không tạo tài khoản, không redirect

## Status / Related bugs

Fail / BUG-01, BUG-03

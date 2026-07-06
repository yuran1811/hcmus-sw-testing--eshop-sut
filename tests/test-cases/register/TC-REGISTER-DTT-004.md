# TC-REGISTER-DTT-004: Email hợp lệ, duy nhất, mật khẩu YẾU, xác nhận KHÔNG khớp

## Requirement ID

FR-01

## Module / Test type / Technique

Register / Functional / Decision Table Testing

## Conditions

| Điều kiện | Giá trị |
|-----------|---------|
| C1: Email hợp lệ | T |
| C2: Email duy nhất | T |
| C3: Mật khẩu mạnh | F |
| C4: Xác nhận khớp | F |

## Preconditions

- Ứng dụng đang chạy, trang Register có thể truy cập
- Email `newuser04@example.com` chưa tồn tại trong DB

## Test data

| Trường | Giá trị |
|--------|---------|
| Name | Nguyen Van D |
| Email | newuser04@example.com |
| Password | abc123 |
| Confirm Password | xyz456 |

## Test steps

1. Mở trang `/register`
2. Nhập Name: `Nguyen Van D`
3. Nhập Email: `newuser04@example.com`
4. Nhập Password: `abc123`
5. Nhập Confirm Password: `xyz456`
6. Bấm nút Register

## Expected result

- **E4:** Hiển thị lỗi "Mật khẩu quá yếu"
- **E5:** Hiển thị lỗi "Xác nhận mật khẩu không khớp"
- Không tạo tài khoản, không redirect

## Status / Related bugs

Fail / BUG-03, BUG-04

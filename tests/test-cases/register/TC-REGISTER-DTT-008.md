# TC-REGISTER-DTT-008: Email hợp lệ, ĐÃ TỒN TẠI, mật khẩu YẾU, xác nhận KHÔNG khớp

## Requirement ID

FR-01

## Module / Test type / Technique

Register / Functional / Decision Table Testing

## Conditions

| Điều kiện | Giá trị |
|-----------|---------|
| C1: Email hợp lệ | T |
| C2: Email duy nhất | F |
| C3: Mật khẩu mạnh | F |
| C4: Xác nhận khớp | F |

## Preconditions

- Ứng dụng đang chạy, trang Register có thể truy cập
- Email `existing@example.com` **đã tồn tại** trong DB

## Test data

| Trường | Giá trị |
|--------|---------|
| Name | Nguyen Van H |
| Email | existing@example.com |
| Password | abc123 |
| Confirm Password | xyz789 |

## Test steps

1. Mở trang `/register`
2. Nhập Name: `Nguyen Van H`
3. Nhập Email: `existing@example.com`
4. Nhập Password: `abc123`
5. Nhập Confirm Password: `xyz789`
6. Bấm nút Register

## Expected result

- **E3:** Hiển thị lỗi "Email đã được sử dụng"
- **E4:** Hiển thị lỗi "Mật khẩu quá yếu"
- **E5:** Hiển thị lỗi "Xác nhận mật khẩu không khớp"
- Không tạo tài khoản, không redirect

## Status / Related bugs

Fail / BUG-02, BUG-03, BUG-04

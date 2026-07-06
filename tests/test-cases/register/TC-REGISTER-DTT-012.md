# TC-REGISTER-DTT-012: Email KHÔNG hợp lệ, mật khẩu YẾU, xác nhận KHÔNG khớp

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
| C4: Xác nhận khớp | F |

## Preconditions

- Ứng dụng đang chạy, trang Register có thể truy cập

## Test data

| Trường | Giá trị |
|--------|---------|
| Name | Nguyen Van L |
| Email | invalidemail |
| Password | abc123 |
| Confirm Password | xyz789 |

## Test steps

1. Mở trang `/register`
2. Nhập Name: `Nguyen Van L`
3. Nhập Email: `invalidemail`
4. Nhập Password: `abc123`
5. Nhập Confirm Password: `xyz789`
6. Bấm nút Register

## Expected result

- **E2:** Hiển thị lỗi "Email không đúng định dạng"
- **E4:** Hiển thị lỗi "Mật khẩu quá yếu"
- **E5:** Hiển thị lỗi "Xác nhận mật khẩu không khớp"
- Không tạo tài khoản, không redirect

## Status / Related bugs

Fail / BUG-01, BUG-03, BUG-04

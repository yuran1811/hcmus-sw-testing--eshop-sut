# TC-REGISTER-DTT-003: Email hợp lệ, duy nhất, mật khẩu YẾU, xác nhận khớp

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
| C4: Xác nhận khớp | T |

## Preconditions

- Ứng dụng đang chạy, trang Register có thể truy cập
- Email `newuser03@example.com` chưa tồn tại trong DB

## Test data

| Trường | Giá trị |
|--------|---------|
| Name | Nguyen Van C |
| Email | newuser03@example.com |
| Password | abc123 |
| Confirm Password | abc123 |

## Test steps

1. Mở trang `/register`
2. Nhập Name: `Nguyen Van C`
3. Nhập Email: `newuser03@example.com`
4. Nhập Password: `abc123` (thiếu chữ hoa và ký tự đặc biệt)
5. Nhập Confirm Password: `abc123`
6. Bấm nút Register

## Expected result

- **E4:** Hiển thị lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
- Không tạo tài khoản, không redirect

## Status / Related bugs

Pass / BUG-03 (kết quả đúng nhưng implementation sai — "abc123" bị từ chối vì thiếu whitespace, không phải vì thiếu ký tự đặc biệt)

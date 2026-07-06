# BUG-03: Password regex sai — yêu cầu dấu cách thay vì ký tự đặc biệt

## Thông tin chung

| Trường | Giá trị |
|--------|---------|
| Bug ID | BUG-03 |
| Feature | FR-01 — Account Register |
| Severity | High |
| Status | Open |
| Ngày phát hiện | 2026-06-29 |
| Phát hiện bởi | Playwright DTT — TC-REGISTER-DTT-001 |

## Mô tả

Regex kiểm tra mật khẩu mạnh sử dụng `(?=.*\s)` (yêu cầu whitespace) thay vì `(?=.*[@$!%*?&])` (yêu cầu ký tự đặc biệt). Thông báo lỗi hiển thị đúng ("KÝ TỰ ĐẶC BIỆT") nhưng logic kiểm tra hoàn toàn sai.

**Hậu quả trực tiếp:**
- Mật khẩu `Abc@12345` (đúng spec, có ký tự đặc biệt `@`) → bị từ chối là "yếu"
- Mật khẩu `Abc 12345` (sai spec, có dấu cách) → được chấp nhận là "mạnh"
- Bug này che khuất BUG-01 và BUG-02 trong nhiều test cases vì validation password chạy trước và block form submit

## Steps to Reproduce

1. Mở `http://localhost:5173/register`
2. Nhập Name: `Test User`
3. Nhập Email: `test@example.com`
4. Nhập Password: `Abc@12345`
5. Bấm **Đăng Ký**

## Expected Result

Password `Abc@12345` (≥8 ký tự, có hoa `A`, thường `bc`, số `12345`, ký tự đặc biệt `@`) được chấp nhận là mạnh.

## Actual Result

Hiển thị lỗi: *"Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT."*

## Root Cause

```javascript
// frontend-web/src/pages/Register.jsx : 15
const flawedStrongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\s)[A-Za-z\d\s]{8,}$/;
//                                    ^^^^                ^^^^^
//                      lookahead yêu cầu whitespace (\s)
//                      character class [A-Za-z\d\s] không cho phép @$!%*?&
```

## Fix đề xuất

```javascript
// frontend-web/src/pages/Register.jsx : 15
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
```

## Related TC

- TC-REGISTER-DTT-001 (TC chính phát hiện bug — C3=T bị từ chối sai)
- TC-REGISTER-DTT-002, 005, 006, 009, 010 (bug này che khuất các lỗi khác)

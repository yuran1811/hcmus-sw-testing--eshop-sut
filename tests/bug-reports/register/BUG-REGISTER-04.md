# BUG-04: Trường xác nhận mật khẩu hoàn toàn thiếu

## Thông tin chung

| Trường | Giá trị |
|--------|---------|
| Bug ID | BUG-04 |
| Feature | FR-01 — Account Register |
| Severity | High |
| Status | Open |
| Ngày phát hiện | 2026-06-29 |
| Phát hiện bởi | Playwright DTT — TC-REGISTER-DTT-002, TC-REGISTER-DTT-004 |

## Mô tả

Form đăng ký không có trường "Xác nhận mật khẩu". Không có state `confirmPassword`, không có input field tương ứng, và không có logic so sánh hai trường password. Người dùng không được yêu cầu nhập lại mật khẩu để xác nhận, làm tăng nguy cơ tạo tài khoản với mật khẩu bị nhập nhầm.

## Steps to Reproduce

1. Mở `http://localhost:5173/register`
2. Quan sát form — chỉ có 3 field: **Họ Tên**, **Email**, **Mật khẩu**
3. Trường "Xác nhận mật khẩu" không tồn tại

## Expected Result

Form có field "Xác nhận mật khẩu". Khi submit nếu hai trường password không khớp, hiển thị lỗi: *"Xác nhận mật khẩu không khớp"*.

## Actual Result

Không có field xác nhận. Form submit ngay khi điền đủ 3 field. Điều kiện E5 không thể được kiểm tra.

## Root Cause

```jsx
// frontend-web/src/pages/Register.jsx : 6–9
// State confirmPassword không tồn tại:
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
// ← thiếu: const [confirmPassword, setConfirmPassword] = useState('');

// frontend-web/src/pages/Register.jsx : 69
// Dòng trống — field bị bỏ qua trong JSX:
            
<button type="submit" ...>  // ← field confirm không có ở đây
```

## Fix đề xuất

```jsx
// 1. Thêm state:
const [confirmPassword, setConfirmPassword] = useState('');

// 2. Thêm validation trong handleSubmit (trước khi gọi API):
if (password !== confirmPassword) {
  setError('Xác nhận mật khẩu không khớp.');
  return;
}

// 3. Thêm input field trong JSX:
<div>
  <label className="block text-gray-700 mb-2">Xác nhận mật khẩu</label>
  <input
    type="password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="w-full border p-2 rounded"
    required
  />
</div>
```

## Related TC

- TC-REGISTER-DTT-002 (C4=F — cần kiểm tra E5)
- TC-REGISTER-DTT-004 (C3=F, C4=F — cần kiểm tra E4+E5)
- TC-REGISTER-DTT-006 (C2=F, C4=F)
- TC-REGISTER-DTT-008 (C2=F, C3=F, C4=F)
- TC-REGISTER-DTT-010 (C1=F, C4=F)
- TC-REGISTER-DTT-012 (C1=F, C3=F, C4=F)

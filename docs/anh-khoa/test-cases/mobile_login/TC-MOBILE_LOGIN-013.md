# TC-MOBILE_LOGIN-013: Bộ đếm sai / trạng thái khóa dùng chung giữa Web và Mobile

**Requirement ID:** FR-20
**Test Type:** Integration / Domain Testing

### 1. Preconditions

- Tồn tại tài khoản `test@eshop.com` / `Test1234!`.
- Tài khoản không bị khóa, bộ đếm sai = 0 (trước khi bắt đầu).
- Có sẵn cả client Web và app Mobile trỏ về cùng backend.

### 2. Test Data (Inputs)

- Bước gây khóa (trên Web): 3 lần đăng nhập sai liên tiếp với Email `test@eshop.com` + Mật khẩu `WrongPass1!`.
- Bước kiểm (trên Mobile): Email `test@eshop.com` + Mật khẩu `Test1234!` (ĐÚNG).

### 3. Test Steps

1. Trên **Web**: đăng nhập sai 3 lần liên tiếp với tài khoản `test@eshop.com` để kích hoạt khóa.
2. Ngay sau đó, trên **Mobile**: nhập đúng Email và Mật khẩu, bấm "Đăng nhập".

### 4. Expected Result

- Trên Mobile, đăng nhập **vẫn bị từ chối** vì tài khoản đang bị khóa (dù nhập đúng thông tin) — xác nhận bộ đếm sai/trạng thái khóa được quản lý tại backend và **dùng chung cho mọi client**.
- _Đối xứng:_ thực hiện ngược lại (gây khóa trên Mobile → kiểm trên Web) cũng cho kết quả tương tự.

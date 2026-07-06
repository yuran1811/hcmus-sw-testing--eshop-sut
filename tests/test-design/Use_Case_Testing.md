# Use Case Testing — Test Design Documentation

## Feature: FR-04 — Quản lý hồ sơ cá nhân (User Profile Management)

### 1. Đặc tả Use Case chuẩn hóa (8 Fields)

## Use Case: Cập nhật hồ sơ cá nhân

- **Primary Actor**: Người dùng đã đăng nhập (Logged-in User)
- **Level**: Sea level (User-goal level)
- **Precondition**: Người dùng đã đăng nhập vào hệ thống và sở hữu JWT Token hợp lệ.
- **Minimal Guarantees**: Thông tin vai trò (`role`) và địa chỉ `email` của người dùng không bị thay đổi bất hợp pháp; dữ liệu người dùng được giữ nguyên toàn vẹn dù request thất bại.
- **Success Guarantees**: Các thông tin `name`, `phone` (đúng 10-11 số bắt đầu bằng 0), và `shipping_address` được cập nhật thành công trong CSDL và phản hồi cho người dùng.

### Main Success Scenario

1. Người dùng truy cập trang quản lý hồ sơ cá nhân → Hệ thống tải và hiển thị thông tin hồ sơ hiện tại.
2. Người dùng nhập thông tin cập nhật hợp lệ: Họ tên mới, Số điện thoại hợp lệ (bắt đầu bằng `0`, từ 10–11 chữ số), Địa chỉ giao hàng mới.
3. Người dùng nhấn nút "Lưu thay đổi" → Hệ thống kiểm tra dữ liệu và cập nhật vào CSDL.
4. Hệ thống hiển thị thông báo "Cập nhật hồ sơ thành công" và phản hồi thông tin mới.
5. Use case kết thúc thành công, đạt Success Guarantees.

### Extensions

- **1a. Người dùng chưa đăng nhập / Token không hợp lệ**:
  1. Hệ thống từ chối truy cập, trả về HTTP `401 Unauthorized` hoặc `403 Forbidden`.
  2. Use case kết thúc thất bại, đạt Minimal Guarantees.
- **3a. Số điện thoại không hợp lệ (không bắt đầu bằng 0, dưới 10 số hoặc trên 11 số)**:
  1. Hệ thống từ chối cập nhật và hiển thị thông báo lỗi về định dạng Số điện thoại.
  2. Use case kết thúc thất bại, đạt Minimal Guarantees (thông tin cũ không bị thay đổi).
- **3b. Cố tình gửi request thay đổi Email**:
  1. Hệ thống bỏ qua/từ chối thuộc tính `email` trong request body.
  2. Use case kết thúc, giữ nguyên Email ban đầu (đạt Minimal Guarantees).
- **3c. Cố tình gửi request tự nâng quyền `role` thành `admin`**:
  1. Hệ thống từ chối hoặc bỏ qua thuộc tính `role` từ client.
  2. Use case kết thúc, giữ nguyên thuộc tính `role = 'user'` (đạt Minimal Guarantees).

---

### 2. Danh sách Test Cases tổng hợp

| Test Case ID        | Loạt Bao phủ (Coverage) | Kịch bản / Extension            | Trạng thái mong đợi                                        | File Test Case                                                     |
| ------------------- | ----------------------- | ------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------ |
| `TC-PROFILE-UCT-01` | Main Success Scenario   | Basic Happy Path                | Thành công, đối chiếu **Success Guarantees**               | [TC-PROFILE-UCT-01.md](../test-cases/profile/TC-PROFILE-UCT-01.md) |
| `TC-PROFILE-UCT-02` | Extension 3a            | SĐT ít hơn 10 chữ số            | Thất bại, đối chiếu **Minimal Guarantees**                 | [TC-PROFILE-UCT-02.md](../test-cases/profile/TC-PROFILE-UCT-02.md) |
| `TC-PROFILE-UCT-03` | Extension 3a            | SĐT không bắt đầu bằng số 0     | Thất bại, đối chiếu **Minimal Guarantees**                 | [TC-PROFILE-UCT-03.md](../test-cases/profile/TC-PROFILE-UCT-03.md) |
| `TC-PROFILE-UCT-04` | Extension 3a            | SĐT dài hơn 11 chữ số           | Thất bại, đối chiếu **Minimal Guarantees**                 | [TC-PROFILE-UCT-04.md](../test-cases/profile/TC-PROFILE-UCT-04.md) |
| `TC-PROFILE-UCT-05` | Extension 3b            | Cố tình thay đổi Email          | Thất bại/Bỏ qua, Email giữ nguyên (**Minimal Guarantees**) | [TC-PROFILE-UCT-05.md](../test-cases/profile/TC-PROFILE-UCT-05.md) |
| `TC-PROFILE-UCT-06` | Extension 3c            | Cố tình nâng `role` thành admin | Thất bại/Bỏ qua, Role giữ nguyên (**Minimal Guarantees**)  | [TC-PROFILE-UCT-06.md](../test-cases/profile/TC-PROFILE-UCT-06.md) |
| `TC-PROFILE-UCT-07` | Extension 1a            | Chưa đăng nhập / Token sai      | Thất bại, trả về HTTP 401/403 (**Minimal Guarantees**)     | [TC-PROFILE-UCT-07.md](../test-cases/profile/TC-PROFILE-UCT-07.md) |

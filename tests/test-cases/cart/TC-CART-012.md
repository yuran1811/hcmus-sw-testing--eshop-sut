# TC-CART-012: Bấm "Tiến hành thanh toán" khi chưa đăng nhập → chặn và điều hướng sang Đăng nhập

**Requirement ID:** FR-07
**Test Type:** Functional / Domain Testing

### 1. Preconditions

- Người dùng **chưa đăng nhập** (header hiển thị "Đăng nhập" / "Đăng ký").
- Giỏ hàng đang có 1 dòng: "Sản phẩm A" (Đơn giá 100,000 ₫), Số lượng = 1; Tổng cộng = 100,000 ₫.

### 2. Test Data (Inputs)

- Trạng thái phiên: `khách vãng lai (chưa đăng nhập)`
- Hành động: Bấm nút "Tiến hành thanh toán" trên trang Giỏ hàng

### 3. Test Steps

1. Mở trang Giỏ hàng.
2. Bấm nút "Tiến hành thanh toán".
3. Quan sát thông báo, URL đích, và trạng thái giỏ hàng sau khi điều hướng.

### 4. Expected Result

- Hệ thống **không** cho vào trang Thanh toán; người dùng được điều hướng sang trang Đăng nhập (`/login`).
- Có thông báo rõ ràng cho biết cần đăng nhập trước khi thanh toán.
- Giỏ hàng **được giữ nguyên** sau khi điều hướng: quay lại trang Giỏ hàng vẫn thấy đúng 1 dòng "Sản phẩm A", Số lượng = 1, Tổng cộng = 100,000 ₫ (không bị xóa, không bị nhân đôi).
- Truy cập thẳng URL `/checkout` khi chưa đăng nhập cũng phải bị chặn tương tự (không hiển thị được form thanh toán).

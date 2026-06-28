# TC-CART-006: Tổng cộng = tổng Thành tiền nhiều dòng; nhãn đúng "Tổng cộng"

**Requirement ID:** FR-07
**Test Type:** Domain Testing

### 1. Preconditions

- Giỏ hàng rỗng trước khi bắt đầu.
- "Sản phẩm A" có Đơn giá 100,000 ₫; "Sản phẩm B" có Đơn giá 50,000 ₫.

### 2. Test Data (Inputs)

- Dòng 1: `Sản phẩm A`, Số lượng 1 → Thành tiền 100,000 ₫
- Dòng 2: `Sản phẩm B`, Số lượng 2 → Thành tiền 100,000 ₫

### 3. Test Steps

1. Thêm "Sản phẩm A" (Số lượng 1) và "Sản phẩm B" (Số lượng 2) vào giỏ.
2. Mở trang Giỏ hàng.
3. Đối chiếu Thành tiền từng dòng và giá trị Tổng cộng.

### 4. Expected Result

- Thành tiền dòng A = 100,000 ₫, dòng B = 50,000 × 2 = 100,000 ₫.
- Tổng cộng = 100,000 + 100,000 = 200,000 ₫ (đúng tổng các dòng).
- Nhãn tổng tiền hiển thị chính xác là **"Tổng cộng"** (không phải "Tổng tạm tính").
- Tiền hiển thị dùng ký hiệu `₫` với định dạng phân cách hàng nghìn.

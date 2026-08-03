# TC-CART-005: Bấm "-" khi Số lượng = 1 → chặn vượt biên dưới (không cho xuống 0)

**Requirement ID:** FR-07
**Test Type:** Domain Testing

### 1. Preconditions

- Giỏ hàng đang có "Sản phẩm A" (Đơn giá 100,000 ₫) với Số lượng = 1.

### 2. Test Data (Inputs)

- Dòng sản phẩm: `Sản phẩm A`
- Hành động: Bấm nút "-" khi Số lượng đang là 1 (cố đưa xuống 0)

### 3. Test Steps

1. Mở trang Giỏ hàng.
2. Tại dòng "Sản phẩm A" (Số lượng = 1), bấm nút "-".

### 4. Expected Result

- Theo spec (Expected Outcomes – Failure), hệ thống **phải chặn** việc giảm xuống dưới 1: Số lượng không được xuống 0 hoặc số âm, giữ ở giá trị tối thiểu 1.
- Thành tiền và Tổng cộng giữ nguyên = 100,000 ₫.
- _Ghi chú:_ Spec yêu cầu rõ ràng là phải chặn (không cho ≤ 0); chỉ riêng **cơ chế** thực hiện (vô hiệu hóa nút "-" hay chuyển thành xóa dòng kèm xác nhận) là chưa được spec quy định — cần xác minh trên UI thật. Nếu hệ thống cho Số lượng = 0 hoặc âm thì đó là điểm không tuân thủ spec.

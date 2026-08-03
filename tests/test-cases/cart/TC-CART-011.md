# TC-CART-011: Thêm vào giỏ với Số lượng không hợp lệ (0 / âm / rỗng) → phải bị chặn

**Requirement ID:** FR-07
**Test Type:** Boundary Value Analysis

### 1. Preconditions

- Giỏ hàng rỗng trước mỗi bộ dữ liệu.
- "Sản phẩm A" có Đơn giá 100,000 ₫.
- Ô "Số lượng" trên trang chi tiết sản phẩm cho phép nhập tay.

### 2. Test Data (Inputs)

| Bộ | Số lượng nhập | Phân lớp                  |
| -- | ------------- | ------------------------- |
| D1 | `0`           | Biên dưới không hợp lệ    |
| D2 | `-1`          | Ngoài miền (số âm)        |
| D3 | (để trống)    | Ngoài miền (không có giá trị) |
| D4 | `1`           | Biên dưới hợp lệ (đối chứng) |

- Sản phẩm: `Sản phẩm A` (Đơn giá 100,000 ₫)

### 3. Test Steps

1. Mở trang chi tiết "Sản phẩm A".
2. Xóa giá trị mặc định trong ô "Số lượng" và nhập giá trị theo bộ dữ liệu.
3. Bấm "Thêm vào giỏ hàng".
4. Mở trang Giỏ hàng và quan sát.

### 4. Expected Result

- **D1, D2, D3:** hệ thống **phải chặn** thao tác thêm vào giỏ — Số lượng hợp lệ tối thiểu là 1 (cùng ràng buộc biên dưới đã kiểm ở TC-CART-005). Không có dòng nào được tạo trong giỏ; giỏ vẫn hiển thị empty state.
- **D4:** thêm thành công đúng 1 dòng, Số lượng = 1, Thành tiền = 100,000 ₫, Tổng cộng = 100,000 ₫.
- Trong mọi trường hợp, các cột Đơn giá / Thành tiền / Tổng cộng **không được** hiển thị `NaN`, chuỗi rỗng, hay số âm.
- _Ghi chú:_ Spec quy định Số lượng tối thiểu là 1; **cơ chế** chặn (disable nút, thông báo lỗi cạnh ô nhập, hay tự chuẩn hóa về 1) chưa được spec quy định — cần xác minh trên UI thật. Nếu hệ thống vẫn tạo dòng với Số lượng ≤ 0 hoặc hiển thị `NaN` thì đó là điểm không tuân thủ spec.

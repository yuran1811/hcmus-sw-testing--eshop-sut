# TC-CART-013: Giỏ hàng phải được giữ nguyên sau khi tải lại trang (F5)

**Requirement ID:** FR-07
**Test Type:** Functional / Domain Testing (State Persistence)

### 1. Preconditions

- Giỏ hàng rỗng trước khi bắt đầu.
- "Sản phẩm A" có Đơn giá 100,000 ₫; "Sản phẩm B" có Đơn giá 50,000 ₫.
- Người dùng ở trạng thái khách vãng lai (chưa đăng nhập) — giỏ hàng vẫn phải hoạt động.

### 2. Test Data (Inputs)

- Dòng 1: `Sản phẩm A`, Số lượng 1 → Thành tiền 100,000 ₫
- Dòng 2: `Sản phẩm B`, Số lượng 2 → Thành tiền 100,000 ₫
- Hành động: Tải lại trang Giỏ hàng (F5 / reload)

### 3. Test Steps

1. Thêm "Sản phẩm A" (Số lượng 1) và "Sản phẩm B" (Số lượng 2) vào giỏ.
2. Mở trang Giỏ hàng, ghi nhận số dòng, Số lượng từng dòng và Tổng cộng (= 200,000 ₫).
3. Tải lại trang bằng F5 (reload trình duyệt, không phải điều hướng nội bộ trong SPA).
4. Quan sát lại trang Giỏ hàng.
5. Điều hướng sang trang chủ rồi quay lại `/cart` và quan sát một lần nữa.

### 4. Expected Result

- Sau khi F5, giỏ hàng **giữ nguyên** đúng 2 dòng: "Sản phẩm A" (Số lượng 1) và "Sản phẩm B" (Số lượng 2).
- Thành tiền từng dòng và Tổng cộng không đổi: 100,000 ₫ + 100,000 ₫ = **200,000 ₫**.
- Trang **không** rơi về empty state ("Giỏ hàng của bạn đang trống").
- Sau khi rời trang Giỏ hàng và quay lại, nội dung giỏ vẫn nguyên vẹn (không mất, không nhân đôi dòng).
- _Ghi chú:_ Spec yêu cầu giỏ hàng là trạng thái bền vững của phiên mua sắm; **cơ chế** lưu trữ (localStorage / sessionStorage / lưu phía server theo tài khoản) chưa được spec quy định — cần xác minh trên hệ thống thật. Nếu giỏ hàng bị xóa sạch sau khi tải lại trang thì đó là điểm không tuân thủ spec, mức độ nghiêm trọng cao vì người dùng mất toàn bộ giỏ chỉ với một thao tác refresh.

# FR-07: Giỏ hàng (Shopping Cart)

- **Module:** `CART`
- **Requirement ID:** `FR-07`

## Input Fields / State Variables

| Field                                    | Data Type                | Constraints                                                                                                               | Notes                                                                                                                                 |
| ---------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Số lượng (Quantity)                      | Integer                  | Số nguyên dương, tối thiểu là 1 (kế thừa ràng buộc nhập số lượng ở FR-06); điều chỉnh qua nút +/- trên từng dòng sản phẩm | README không nêu rõ giới hạn tối đa hoặc hành vi khi bấm nút "-" lúc Số lượng = 1 (chặn nút hay xóa dòng) — cần xác minh trên UI thật |
| Sản phẩm (Product reference)             | Reference (`product_id`) | Mỗi sản phẩm chỉ xuất hiện đúng 1 dòng trong giỏ                                                                          | Thêm sản phẩm đã có trong giỏ → tăng Số lượng của dòng hiện tại, không tạo dòng mới                                                   |
| Đơn giá (Unit Price)                     | Number (₫)               | Chỉ hiển thị (read-only), lấy từ dữ liệu sản phẩm                                                                         | Không phải trường do người dùng chỉnh sửa                                                                                             |
| Thành tiền (Subtotal, theo dòng)         | Number (₫)               | Read-only; tính tự động = Đơn giá × Số lượng                                                                              | Phải cập nhật ngay khi Số lượng thay đổi                                                                                              |
| Tổng cộng (Total, toàn giỏ)              | Number (₫)               | Read-only; tính tự động = tổng Thành tiền của tất cả các dòng                                                             | Nhãn hiển thị phải chính xác là **"Tổng cộng"**, không phải "Tổng tạm tính"                                                           |
| Nút Xóa sản phẩm (Remove action)         | Action                   | Bắt buộc hiển thị dialog xác nhận trước khi xóa khỏi giỏ                                                                  | -                                                                                                                                     |
| Nút Tiếp tục mua sắm (Continue Shopping) | Action / Navigation      | Điều hướng về trang chủ                                                                                                   | -                                                                                                                                     |

## Business Rules

- Mỗi sản phẩm chỉ xuất hiện đúng 1 dòng trong giỏ; thêm trùng sản phẩm chỉ tăng Số lượng của dòng hiện có, không tạo dòng mới.
- Số lượng mỗi dòng phải là số nguyên dương, tối thiểu là 1; điều chỉnh thông qua nút +/-.
- Thành tiền của mỗi dòng = Đơn giá × Số lượng, tự động cập nhật ngay khi Số lượng thay đổi.
- Tổng cộng = tổng Thành tiền của tất cả các dòng trong giỏ; nhãn hiển thị phải đúng là "Tổng cộng".
- Hành động Xóa sản phẩm khỏi giỏ bắt buộc phải có dialog xác nhận trước khi thực hiện; không xóa ngay khi bấm nút.
- Nút Tiếp tục mua sắm phải điều hướng người dùng quay về trang chủ.
- Khi giỏ hàng không còn sản phẩm nào (rỗng), trang phải hiển thị hình minh họa (illustration/icon) kèm thông báo rõ ràng, thân thiện.

## Expected Outcomes

- _Success:_
  - Thêm sản phẩm chưa có trong giỏ → tạo dòng mới cho sản phẩm đó.
  - Thêm sản phẩm đã có trong giỏ → tăng Số lượng của dòng hiện tại; Thành tiền và Tổng cộng cập nhật tương ứng.
  - Bấm nút + hoặc - → Số lượng tăng/giảm 1 đơn vị; Thành tiền và Tổng cộng cập nhật theo thời gian thực.
  - Bấm Xóa sản phẩm và xác nhận trong dialog → dòng sản phẩm bị xóa khỏi giỏ; Tổng cộng cập nhật lại.
  - Bấm Tiếp tục mua sắm → điều hướng về trang chủ.
  - Giỏ hàng rỗng → hiển thị hình minh họa và thông báo giỏ hàng trống.
- _Failure:_
  - Bấm Xóa sản phẩm nhưng hủy (cancel) dialog xác nhận → dòng sản phẩm không bị xóa, giỏ hàng giữ nguyên.
  - Bấm nút "-" khi Số lượng đang là 1 → hệ thống phải chặn việc giảm xuống dưới 1 (không cho Số lượng ≤ 0).

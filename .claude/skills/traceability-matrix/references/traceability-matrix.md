# Ma trận truy vết (Traceability Matrix) — EShop

> Tổng hợp Requirement ↔ Domain Test Cases ↔ BVA Test Cases cho 4 feature: FR-01 (Đăng ký), FR-07 (Giỏ hàng), FR-15 (Quản lý Sản phẩm), FR-20 (Đăng nhập Mobile).
> Cập nhật: 2026-06-27 (v2 — đã bổ sung 4 test case lấp lỗ hổng coverage).

## 1. Ma trận truy vết (Traceability Matrix)

| Requirement ID | Business Rule / Constraint                                       | Test Case IDs                                                                                  | Result  | Bug Issue | Status |
| :------------- | :--------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- | :------ | :-------- | :----- |
| FR-01          | Họ Tên bắt buộc (không rỗng)                                     | TC-REGISTER-002                                                                                | Not Run |           | Open   |
| FR-01          | Email bắt buộc                                                   | TC-REGISTER-005                                                                                | Not Run |           | Open   |
| FR-01          | Email đúng định dạng `user@domain.com`                           | TC-REGISTER-003                                                                                | Not Run |           | Open   |
| FR-01          | Email duy nhất (không trùng)                                     | TC-REGISTER-004                                                                                | Not Run |           | Open   |
| FR-01          | Mật khẩu bắt buộc                                                | TC-REGISTER-012                                                                                | Not Run |           | Open   |
| FR-01          | Xác nhận mật khẩu bắt buộc                                       | TC-REGISTER-014                                                                                | Not Run |           | Open   |
| FR-01          | Mật khẩu tối thiểu 8 ký tự                                       | TC-REGISTER-001, TC-REGISTER-006                                                               | Not Run |           | Open   |
| FR-01          | Mật khẩu có ≥1 chữ hoa                                           | TC-REGISTER-007, TC-REGISTER-001                                                               | Not Run |           | Open   |
| FR-01          | Mật khẩu có ≥1 chữ thường                                        | TC-REGISTER-008, TC-REGISTER-015                                                               | Not Run |           | Open   |
| FR-01          | Mật khẩu có ≥1 chữ số                                            | TC-REGISTER-009, TC-REGISTER-016                                                               | Not Run |           | Open   |
| FR-01          | Mật khẩu có ≥1 ký tự đặc biệt thuộc `@ $ ! % * ? &`              | TC-REGISTER-010, TC-REGISTER-011                                                               | Not Run |           | Open   |
| FR-01          | Xác nhận mật khẩu phải khớp với Mật khẩu                         | TC-REGISTER-013                                                                                | Not Run |           | Open   |
| FR-01          | Đăng ký thành công → chuyển sang trang Đăng nhập                 | TC-REGISTER-001                                                                                | Not Run |           | Open   |
| FR-01          | SEC-01: Mật khẩu không lưu plaintext (phải hash)                 | TC-REGISTER-017                                                                                | Not Run |           | Open   |
| FR-07          | Mỗi sản phẩm đúng 1 dòng; thêm trùng → tăng Số lượng             | TC-CART-001, TC-CART-002                                                                       | Not Run |           | Open   |
| FR-07          | Số lượng nguyên dương, tối thiểu 1, chỉnh bằng nút +/-           | TC-CART-003, TC-CART-004, TC-CART-005                                                          | Not Run |           | Open   |
| FR-07          | Thành tiền = Đơn giá × Số lượng, cập nhật ngay                   | TC-CART-003, TC-CART-004, TC-CART-006                                                          | Not Run |           | Open   |
| FR-07          | Tổng cộng = Σ Thành tiền; nhãn đúng "Tổng cộng"                  | TC-CART-006                                                                                    | Not Run |           | Open   |
| FR-07          | Xóa sản phẩm phải có dialog xác nhận                             | TC-CART-007, TC-CART-008                                                                       | Not Run |           | Open   |
| FR-07          | Nút Tiếp tục mua sắm → về trang chủ                              | TC-CART-010                                                                                    | Not Run |           | Open   |
| FR-07          | Giỏ rỗng → hình minh họa + thông báo                             | TC-CART-009                                                                                    | Not Run |           | Open   |
| FR-15          | Chỉ Admin (JWT + `role='admin'`) mới Thêm/Sửa/Xóa                | TC-PRODUCT-013, TC-PRODUCT-014                                                                 | Not Run |           | Open   |
| FR-15          | Tên sản phẩm bắt buộc, tối đa 255 ký tự                          | TC-PRODUCT-002, TC-PRODUCT-003, TC-PRODUCT-005, TC-PRODUCT-006                                 | Not Run |           | Open   |
| FR-15          | Giá bắt buộc, phải là số dương (> 0)                             | TC-PRODUCT-004, TC-PRODUCT-007, TC-PRODUCT-008, TC-PRODUCT-009, TC-PRODUCT-010, TC-PRODUCT-016 | Not Run |           | Open   |
| FR-15          | Danh mục bắt buộc, phải tồn tại trong hệ thống                   | TC-PRODUCT-011, TC-PRODUCT-012                                                                 | Not Run |           | Open   |
| FR-15          | Thao tác Thêm (Create) sản phẩm hợp lệ                           | TC-PRODUCT-001                                                                                 | Not Run |           | Open   |
| FR-15          | Thao tác Sửa (Update) — chỉ sản phẩm đó thay đổi                 | TC-PRODUCT-015                                                                                 | Not Run |           | Open   |
| FR-15          | Thao tác Xem (Read/List) sản phẩm                                | TC-PRODUCT-017                                                                                 | Not Run |           | Open   |
| FR-15          | Thao tác Xóa (Delete) sản phẩm → loại khỏi danh sách             | TC-PRODUCT-018                                                                                 | Not Run |           | Open   |
| FR-20          | Đăng nhập thành công → JWT + lưu client + header `Authorization` | TC-MOBILE_LOGIN-001                                                                            | Not Run |           | Open   |
| FR-20          | Email và Mật khẩu bắt buộc                                       | TC-MOBILE_LOGIN-002, TC-MOBILE_LOGIN-004                                                       | Not Run |           | Open   |
| FR-20          | Email đúng định dạng                                             | TC-MOBILE_LOGIN-003                                                                            | Not Run |           | Open   |
| FR-20          | Sai thông tin → lỗi chung chung, không lộ nguyên nhân            | TC-MOBILE_LOGIN-005, TC-MOBILE_LOGIN-006                                                       | Not Run |           | Open   |
| FR-20          | Mỗi lần sai → bộ đếm tăng đúng 1 đơn vị                          | TC-MOBILE_LOGIN-007                                                                            | Not Run |           | Open   |
| FR-20          | Sai ≥ 3 lần liên tiếp → khóa 30 giây                             | TC-MOBILE_LOGIN-008, TC-MOBILE_LOGIN-009, TC-MOBILE_LOGIN-012                                  | Not Run |           | Open   |
| FR-20          | Đang khóa → từ chối dù nhập đúng                                 | TC-MOBILE_LOGIN-010                                                                            | Not Run |           | Open   |
| FR-20          | Hết 30 giây → đăng nhập lại được                                 | TC-MOBILE_LOGIN-011                                                                            | Not Run |           | Open   |
| FR-20          | Bộ đếm/khóa dùng chung mọi client (Web ↔ Mobile)                 | TC-MOBILE_LOGIN-013                                                                            | Not Run |           | Open   |

## 2. Báo cáo Độ bao phủ (Coverage Status)

✅ **Passed:** Toàn bộ các luật nghiệp vụ của 4 feature (FR-01, FR-07, FR-15, FR-20) đều đã được bao phủ bởi ít nhất một Test Case.

**4 lỗ hổng ở phiên bản trước (v1) đã được lấp bằng các test case bổ sung:**

| Luật từng thiếu                              | Test Case bổ sung   | Loại                                 |
| :------------------------------------------- | :------------------ | :----------------------------------- |
| FR-01 — SEC-01: Mật khẩu không lưu plaintext | TC-REGISTER-017     | Security / White-box (kiểm tra CSDL) |
| FR-15 — Xem (Read/List) sản phẩm             | TC-PRODUCT-017      | Functional                           |
| FR-15 — Xóa (Delete) sản phẩm                | TC-PRODUCT-018      | Functional                           |
| FR-20 — Bộ đếm/khóa dùng chung Web ↔ Mobile  | TC-MOBILE_LOGIN-013 | Integration                          |

_Ghi chú:_ 4 ca này là functional/security/integration nên **không phát sinh giá trị biên mới** → BVA không bổ sung; chỉ áp dụng Domain Testing (kiểm thao tác hợp lệ + bất biến).

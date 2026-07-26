## Bước 1: Kết quả chạy Playwright E2E

**Lệnh thực thi:** `pnpm exec playwright test --reporter=list`
**Thư mục:** `tests/e2e/`
**Tổng số test:** 59 (phân bổ: 4 project — web :5173, admin :5174, api :3000, mobile :8081)

### Kết quả tổng hợp

| Trạng thái     | Số lượng   |
| -------------- | ---------- |
| ✅ Passed      | 22         |
| ❌ Failed      | 26         |
| Thời gian chạy | ~35.7 giây |

### Danh sách test PASSED (22)

| Test Case                   | Mô tả                                             |
| --------------------------- | ------------------------------------------------- |
| TC-CART-001                 | Thêm sản phẩm chưa có trong giỏ → tạo dòng mới    |
| TC-CART-010                 | Bấm "Tiếp tục mua sắm" → điều hướng về trang chủ  |
| TC-LOGIN-001                | Đăng nhập thành công với thông tin hợp lệ         |
| TC-REGISTER-002             | Họ Tên để trống → chặn submit                     |
| TC-REGISTER-003             | Email sai định dạng → bị từ chối                  |
| TC-REGISTER-005             | Email để trống → chặn submit                      |
| TC-REGISTER-006             | Mật khẩu ít hơn 8 ký tự → bị chặn                 |
| TC-REGISTER-007             | Mật khẩu thiếu chữ hoa → bị chặn                  |
| TC-REGISTER-008             | Mật khẩu thiếu chữ thường → bị chặn               |
| TC-REGISTER-009             | Mật khẩu thiếu chữ số → bị chặn                   |
| TC-REGISTER-010             | Mật khẩu không có ký tự đặc biệt → bị chặn        |
| TC-REGISTER-011             | Ký tự đặc biệt ngoài tập (#) → bị chặn            |
| TC-REGISTER-012             | Mật khẩu để trống → chặn submit                   |
| TC-PRODUCT-001              | Thêm sản phẩm với dữ liệu hợp lệ → tạo thành công |
| TC-PRODUCT-002 [BVA]        | Tên sản phẩm đúng 255 ký tự (biên trên hợp lệ)    |
| TC-PRODUCT-003 [BVA]        | Tên sản phẩm 1 ký tự (biên dưới hợp lệ)           |
| TC-PRODUCT-004 [BVA]        | Giá là số dương nhỏ nhất = 1 (biên dưới hợp lệ)   |
| TC-PRODUCT-005              | Tên sản phẩm để trống → chặn submit               |
| TC-PRODUCT-016 [BVA]        | Giá là số thực dương nhỏ nhất 0.01                |
| TC-MOBILE_LOGIN-001         | Đăng nhập mobile thành công                       |
| (và 2 test product-ui khác) | TC-PRODUCT-012, TC-PRODUCT-013 dạng isolation     |

### Danh sách test FAILED (26) và phân loại

#### Nhóm A: Lỗi Test Script (KHÔNG phải bug ứng dụng)

Các test case dưới đây thất bại do locator `.filter({ hasText: 'Sản phẩm A' })` quá rộng, resolves sang nhiều phần tử (strict mode violation). Đây là vấn đề của test script, không phải SUT.

| Test Case   | Lỗi                                              |
| ----------- | ------------------------------------------------ |
| TC-CART-002 | `strict mode violation: resolved to 5 elements`  |
| TC-CART-005 | `strict mode violation: resolved to 18 elements` |
| TC-CART-006 | `strict mode violation: resolved to 14 elements` |
| TC-CART-007 | `strict mode violation: resolved to 14 elements` |
| TC-CART-008 | `strict mode violation: resolved to 16 elements` |
| TC-CART-009 | `strict mode violation: resolved to 14 elements` |

**Đề xuất self-healing:** Thay locator `.filter({ hasText: 'Sản phẩm A' })` bằng `.filter({ hasText: /^Sản phẩm A$/ })` để match exact text, hoặc dùng `nth(0)`.

#### Nhóm B: Bug Ứng dụng thực sự (18 test cases → 10 bug độc lập)

| Test Case(s)                   | Bug ID           | Mô tả lỗi                                                                              |
| ------------------------------ | ---------------- | -------------------------------------------------------------------------------------- |
| TC-REGISTER-001, 015, 016, 017 | BUG-REGISTER-001 | `expect(page).toHaveURL(expected) failed` — không redirect sau đăng ký                 |
| TC-REGISTER-004                | BUG-REGISTER-002 | `expect(locator).toContainText(expected) failed` — cho phép email trùng lặp            |
| TC-REGISTER-013, 014           | BUG-REGISTER-003 | `TimeoutError / custom assertion` — thiếu field "Xác nhận mật khẩu"                    |
| TC-CART-003, 004               | BUG-CART-001     | `TimeoutError: Timeout 5000ms` — nút +/- số lượng không phản hồi                       |
| TC-PRODUCT-006                 | BUG-PRODUCT-001  | `Spec yêu cầu reject khi Tên > 255 ký tự` — không validate độ dài tên                  |
| TC-PRODUCT-007, 008, 009, 010  | BUG-PRODUCT-002  | `Spec yêu cầu reject khi Giá = 0/âm/trống/không hợp lệ` — thiếu validate giá           |
| TC-PRODUCT-015                 | BUG-PRODUCT-003  | `Sản phẩm Y không liên quan phải giữ nguyên tên` — lỗi cô lập khi sửa sản phẩm         |
| TC-PRODUCT-011, 012            | BUG-PRODUCT-004  | `Spec yêu cầu reject khi category_id rỗng/không tồn tại` — API không validate category |
| TC-PRODUCT-013, 014            | BUG-PRODUCT-005  | `phải trả 401/403` — API thiếu authentication/authorization                            |
| TC-MOBILE_LOGIN-002            | BUG-MOBILE-001   | `element(s) not found` — không hiển thị lỗi khi email trống                            |

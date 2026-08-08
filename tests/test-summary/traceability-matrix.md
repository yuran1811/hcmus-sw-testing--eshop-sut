# Ma trận truy vết (Traceability Matrix) — EShop HW04

> Requirement ↔ Test Case ↔ Kết quả chạy thật ↔ Bug cho 3 feature đã chọn (HW04): FR-01 (Đăng ký — Pool A), FR-07/FR-08 (Giỏ hàng — Pool B), FR-15/FR-12 (Quản lý Sản phẩm Admin — Pool C).
> Kết quả (`Result`) lấy từ lượt chạy thật `npx playwright test` trên cả 3 browser (Chromium/Firefox/WebKit), server thật (backend :3000, frontend-web :5173, frontend-admin :5174), ngày 2026-08-08, nhánh `hw04/23127211` commit `3d2a86d`. Report HTML đầy đủ tại `tests/e2e/reports/html/<feature>-<browser>/index.html`. Chi tiết từng bug xem `tests/bug-reports/<module>/BUG-<MODULE>-<NNN>.md`.

## 1. Ma trận truy vết (Traceability Matrix)

### FR-01 — Đăng ký tài khoản

| Requirement ID | Business Rule / Constraint | Test Case IDs | Result | Bug Issue | Status |
| :-------------- | :--------------------------- | :--------------- | :------ | :---------- | :------ |
| FR-01 | Họ Tên bắt buộc (không rỗng) | TC-REGISTER-002 | Pass | | Closed |
| FR-01 | Email bắt buộc (không rỗng) | TC-REGISTER-005 | Pass | | Closed |
| FR-01 | Mật khẩu bắt buộc (không rỗng) | TC-REGISTER-012 | Pass | | Closed |
| FR-01 | Email phải đúng định dạng `user@domain.com` | TC-REGISTER-003 | Fail | BUG-REGISTER-003 | Open |
| FR-01 | Email phải duy nhất trong hệ thống | TC-REGISTER-004 | Fail | BUG-REGISTER-004 | Open |
| FR-01 | Mật khẩu < 8 ký tự phải bị từ chối (biên dưới không hợp lệ) | TC-REGISTER-006 | Pass | | Closed |
| FR-01 | Mật khẩu đúng 8 ký tự + đủ hoa/thường/số/ký tự đặc biệt phải được CHẤP NHẬN (biên dưới hợp lệ) | TC-REGISTER-001 | Fail | BUG-REGISTER-001 | Open |
| FR-01 | Mật khẩu thiếu chữ hoa / chữ thường / chữ số phải bị từ chối | TC-REGISTER-007, TC-REGISTER-008, TC-REGISTER-009 | Pass | | Closed |
| FR-01 | Mật khẩu có đúng 1 chữ thường / 1 chữ số phải được CHẤP NHẬN (BVA on-point biên đếm) | TC-REGISTER-015, TC-REGISTER-016 | Fail | BUG-REGISTER-001 | Open |
| FR-01 | Mật khẩu phải có ≥1 ký tự đặc biệt thuộc tập `@$!%*?&`; ký tự đặc biệt ngoài tập phải bị từ chối | TC-REGISTER-010, TC-REGISTER-011 | Pass | | Closed |
| FR-01 | Phải có trường Xác nhận mật khẩu, từ chối nếu không khớp hoặc để trống | TC-REGISTER-013, TC-REGISTER-014 | Fail | BUG-REGISTER-002 | Open |
| FR-01 | Đăng ký thành công → chuyển hướng sang trang Đăng nhập | TC-REGISTER-001, TC-REGISTER-015, TC-REGISTER-016 | Fail | BUG-REGISTER-001 | Open |
| FR-01 (SEC-01) | Mật khẩu phải được băm (hash), không lưu plaintext trong CSDL | TC-REGISTER-017 | Fail | BUG-REGISTER-005 | Open |

**Tổng FR-01:** 17/17 test case đã map (13 dòng rule). 9 Pass / 8 Fail (đúng theo kết quả chạy thật trên cả 3 browser). 5 bug.

### FR-07 / FR-08 / FR-06 — Giỏ hàng & Thanh toán

| Requirement ID | Business Rule / Constraint | Test Case IDs | Result | Bug Issue | Status |
| :-------------- | :--------------------------- | :--------------- | :------ | :---------- | :------ |
| FR-07 | Thêm sản phẩm chưa có trong giỏ → tạo đúng 1 dòng mới, đủ 5 cột (Sản phẩm, Đơn giá, Số lượng, Thành tiền, Thao tác) | TC-CART-001 | Fail | BUG-CART-001, BUG-CART-005 | Open |
| FR-07 | Thêm lại sản phẩm đã có trong giỏ → tăng số lượng, không tạo dòng mới | TC-CART-002 | Fail | BUG-CART-002 | Open |
| FR-07 | Cột Số lượng phải có nút +/- để chỉnh trực tiếp trên giỏ hàng | TC-CART-003, TC-CART-004, TC-CART-005 | Fail | BUG-CART-003 | Open |
| FR-07 | Thành tiền = Đơn giá × Số lượng; Tổng cộng = Σ Thành tiền, nhãn đúng "Tổng cộng" | TC-CART-006 | Fail | BUG-CART-005 | Open |
| FR-07 | Nút Xóa sản phẩm phải có dialog xác nhận trước khi thực hiện | TC-CART-007, TC-CART-008 | Fail | BUG-CART-004 | Open |
| FR-07 | Giỏ hàng trống phải có hình minh hoạ + thông báo rõ ràng | TC-CART-009 | Fail | BUG-CART-006 (FR-24) | Open |
| FR-07 | Nút "Tiếp tục mua sắm" điều hướng về trang chủ | TC-CART-010 | Pass | | Closed |
| FR-06 | Ô Số lượng chỉ nhận số nguyên dương, tối thiểu 1 | TC-CART-011 | Fail | BUG-CART-008 | Open |
| FR-08 | Chỉ người dùng đã đăng nhập mới thanh toán được; chặn kể cả khi truy cập thẳng URL `/checkout` | TC-CART-012 | Fail | BUG-CART-010 | Open |
| FR-07 | Giỏ hàng phải được giữ nguyên sau khi tải lại trang (F5) | TC-CART-013 | Fail | BUG-CART-009 | Open |
| FR-07 | Nhãn nút "quay lại mua sắm" phải nhất quán ("Tiếp tục mua sắm") ở mọi trạng thái giỏ hàng | _(không có TC riêng — phát hiện qua khảo sát Playwright MCP khi rà soát TC-CART-010)_ | Fail | BUG-CART-007 | Open |

**Tổng FR-07/08/06:** 13/13 test case đã map (10 dòng rule) + 1 rule phát hiện thêm ngoài 13 TC gốc. 1 Pass / 12 Fail. 10 bug.

### FR-15 / FR-12 — Quản lý Sản phẩm (Admin) & Kiểm soát truy cập

| Requirement ID | Business Rule / Constraint | Test Case IDs | Result | Bug Issue | Status |
| :-------------- | :--------------------------- | :--------------- | :------ | :---------- | :------ |
| FR-15 | Admin có thể Thêm sản phẩm với dữ liệu hợp lệ (tên, giá dương, biên hợp lệ 1/255 ký tự, giá 0.01) | TC-PRODUCT-001, TC-PRODUCT-002, TC-PRODUCT-003, TC-PRODUCT-004, TC-PRODUCT-016 | Pass | | Closed |
| FR-15 | Tên sản phẩm bắt buộc (không rỗng) | TC-PRODUCT-005 | Pass | | Closed |
| FR-15 | Tên sản phẩm vượt quá 255 ký tự phải bị từ chối (biên trên không hợp lệ) | TC-PRODUCT-006 | Fail | BUG-PRODUCT-004 | Open |
| FR-15 | Giá = 0 / âm / trống / không phải số phải bị từ chối | TC-PRODUCT-007, TC-PRODUCT-008, TC-PRODUCT-009, TC-PRODUCT-010 | Fail | BUG-PRODUCT-003 | Open |
| FR-15 | Danh mục bắt buộc, phải chọn từ danh sách có sẵn (không tồn tại phải bị từ chối) | TC-PRODUCT-011, TC-PRODUCT-012 | Fail | BUG-PRODUCT-005 | Open |
| FR-15 | Khi Sửa 1 sản phẩm, chỉ sản phẩm đó bị thay đổi — các sản phẩm khác giữ nguyên | TC-PRODUCT-015 | Fail (flaky — xem ghi chú BUG) | BUG-PRODUCT-006 | Open |
| FR-15 / FR-21 | Xem (Read/List) sản phẩm hiển thị đúng dữ liệu, giá có dấu phân cách hàng nghìn | TC-PRODUCT-017 | Fail | BUG-PRODUCT-007 | Open |
| FR-15 | Xóa sản phẩm → loại khỏi danh sách, không ảnh hưởng sản phẩm khác | TC-PRODUCT-018 | Pass | | Closed |
| FR-12 / SEC-02 | API có tính ảnh hưởng dữ liệu (`POST /api/products`) phải yêu cầu JWT hợp lệ | TC-PRODUCT-013 | Fail | BUG-PRODUCT-001 | Open |
| FR-12 / SEC-03 | API quản trị phải yêu cầu `role = 'admin'` trong Token, không chỉ JWT hợp lệ | TC-PRODUCT-014 | Fail | BUG-PRODUCT-002 | Open |

**Tổng FR-15/FR-12:** 18/18 test case đã map (10 dòng rule). 7-8 Pass / 10-11 Fail tuỳ browser (xem ghi chú flaky ở TC-PRODUCT-015 trong `tests/test-runs/sprint-1-test-run.md`). 7 bug.

## 2. Báo cáo Độ bao phủ (Coverage Status)

✅ **Passed:** Toàn bộ business rule của 3 feature đã chọn cho HW04 (FR-01, FR-07/FR-08/FR-06, FR-15/FR-12) đều đã được bao phủ bởi ít nhất một Test Case, và cả 48/48 test case (17 + 13 + 18) đều đã được thực thi thật (không còn "Not Run").

**Điểm bổ sung ngoài phạm vi 48 test case gốc:**

- Rule "nhãn nút quay lại mua sắm phải nhất quán" (FR-07) được phát hiện qua khảo sát thủ công bằng Playwright MCP trong lúc rà soát lại TC-CART-010, không có Test Case ID riêng trong bộ 13 case gốc — đã ghi nhận là BUG-CART-007 và đề xuất bổ sung 1 test case mới trong tương lai (xem Notes của bug đó).

**Ngoài phạm vi ma trận này (không thuộc 3 feature được chọn cho HW04, không automate):** FR-02, FR-03, FR-04, FR-05, FR-06 (một phần), FR-09, FR-10, FR-11, FR-13, FR-14, FR-16 → FR-20 (Pool D — Mobile, loại trừ theo đề bài HW04 mục 5), FR-21 (một phần, ngoài các chỗ đã kiểm kèm trong FR-07/FR-15).

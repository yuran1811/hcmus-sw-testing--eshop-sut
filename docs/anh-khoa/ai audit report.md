**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Sonnet 4.6)
- **Thời gian:** 2026-06-26
- **Nội dung prompt:**
  > Hãy đóng vai QA analyst expert, sử dụng skill @.agents/skills/requirement-analysis/SKILL.md để phân tích chức năng FR-01: Đăng ký tài khoản dựa trên mô tả trong file @README.md
  >
  > Ghi kết quả vào file @docs/anh-khoa/feature-specs/FR-01 Đăng ký tài khoản.md
  >
  > Sau đó nhớ lưu lại lịch sử prompt và cả requirement spec bằng skill @.agents/skills/ai-audit-logger/SKILL.md
- **AI output:**
  > # FR-01: Đăng ký tài khoản
  >
  > - **Module:** `REGISTER`
  > - **Requirement ID:** `FR-01`
  >
  > ## Input Fields
  >
  > | Field                                | Data Type             | Constraints                                                                                                                         | Notes                                                                                             |
  > | ------------------------------------ | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
  > | Họ Tên (Full Name)                   | String                | Bắt buộc, không được để trống                                                                                                       | README không nêu giới hạn độ dài cụ thể cho trường này                                            |
  > | Email                                | String (email format) | Bắt buộc; đúng định dạng `user@domain.com`; phải duy nhất trong toàn hệ thống                                                       | Nên dùng `type="email"` để có HTML5 format validation (theo FR-22)                                |
  > | Mật khẩu (Password)                  | String                | Bắt buộc; tối thiểu 8 ký tự; phải chứa đồng thời ≥1 chữ hoa, ≥1 chữ thường, ≥1 chữ số, ≥1 ký tự đặc biệt trong nhóm `@ $ ! % * ? &` | Trường phải dùng `type="password"` (không hiển thị rõ — theo FR-22); không lưu plaintext (SEC-01) |
  > | Xác nhận mật khẩu (Confirm Password) | String                | Bắt buộc; phải khớp chính xác với giá trị của trường Mật khẩu                                                                       | Hệ thống phải từ chối đăng ký nếu hai trường không khớp                                           |
  >
  > ## Business Rules
  >
  > - Cả 4 trường (Họ Tên, Email, Mật khẩu, Xác nhận mật khẩu) đều là trường bắt buộc.
  > - Email phải là duy nhất trong toàn hệ thống — hệ thống từ chối đăng ký nếu email đã được sử dụng.
  > - Mật khẩu phải thỏa mãn **đồng thời** cả 4 điều kiện độ phức tạp (không phải đạt 1 trong 4): độ dài ≥ 8 ký tự, có ≥1 chữ hoa, ≥1 chữ thường, ≥1 chữ số, ≥1 ký tự đặc biệt (`@`, `$`, `!`, `%`, `*`, `?`, `&`).
  > - Trường Xác nhận mật khẩu phải khớp 100% với trường Mật khẩu; nếu không khớp, hệ thống từ chối submit và không tạo tài khoản.
  > - Sau khi đăng ký thành công, người dùng được chuyển hướng (redirect) sang trang Đăng nhập (không tự động đăng nhập vào hệ thống).
  > - Theo SEC-01, mật khẩu không được lưu dưới dạng plaintext trong CSDL — phải được hash trước khi lưu.
  >
  > ## Expected Outcomes
  >
  > - _Success:_ Họ Tên, Email hợp lệ và chưa tồn tại, Mật khẩu thỏa đủ 4 điều kiện độ phức tạp, Xác nhận mật khẩu khớp với Mật khẩu → tài khoản được tạo thành công → chuyển hướng đến trang Đăng nhập.
  > - _Failure:_
  >   - Bỏ trống bất kỳ trường nào trong 4 trường → lỗi "trường bắt buộc".
  >   - Email sai định dạng (không đúng `user@domain.com`) → lỗi định dạng email.
  >   - Email đã được đăng ký trước đó → lỗi "email đã tồn tại" (không tạo tài khoản trùng).
  >   - Mật khẩu < 8 ký tự hoặc thiếu chữ hoa/chữ thường/chữ số/ký tự đặc biệt → lỗi định dạng mật khẩu.
  >   - Xác nhận mật khẩu không khớp với Mật khẩu → lỗi "mật khẩu xác nhận không khớp", không tạo tài khoản.

---

**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Sonnet 4.6)
- **Thời gian:** 2026-06-26
- **Nội dung prompt:**
  > Hãy đóng vai QA analyst expert, sử dụng skill @.agents/skills/requirement-analysis/SKILL.md để phân tích chức năng FR-07: Giỏ hàng (Shopping Cart) dựa trên mô tả trong file @README.md
  >
  > Ghi kết quả vào file @docs/anh-khoa/feature-specs/FR-07 Giỏ hàng.md
  >
  > Sau đó nhớ lưu lại lịch sử prompt và cả requirement spec bằng skill @.agents/skills/ai-audit-logger/SKILL.md
- **AI output:**
  > # FR-07: Giỏ hàng (Shopping Cart)
  >
  > - **Module:** `CART`
  > - **Requirement ID:** `FR-07`
  >
  > ## Input Fields / State Variables
  >
  > | Field                                       | Data Type               | Constraints                                                                                                                    | Notes                                                                                                                          |
  > | -------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
  > | Số lượng (Quantity)                          | Integer                  | Số nguyên dương, tối thiểu là 1 (kế thừa ràng buộc nhập số lượng ở FR-06); điều chỉnh qua nút +/- trên từng dòng sản phẩm        | README không nêu rõ giới hạn tối đa hoặc hành vi khi bấm nút "-" lúc Số lượng = 1 (chặn nút hay xóa dòng) — cần xác minh trên UI thật |
  > | Sản phẩm (Product reference)                 | Reference (`product_id`) | Mỗi sản phẩm chỉ xuất hiện đúng 1 dòng trong giỏ                                                                                  | Thêm sản phẩm đã có trong giỏ → tăng Số lượng của dòng hiện tại, không tạo dòng mới                                              |
  > | Đơn giá (Unit Price)                         | Number (₫)               | Chỉ hiển thị (read-only), lấy từ dữ liệu sản phẩm                                                                                 | Không phải trường do người dùng chỉnh sửa                                                                                        |
  > | Thành tiền (Subtotal, theo dòng)             | Number (₫)               | Read-only; tính tự động = Đơn giá × Số lượng                                                                                     | Phải cập nhật ngay khi Số lượng thay đổi                                                                                          |
  > | Tổng cộng (Total, toàn giỏ)                  | Number (₫)               | Read-only; tính tự động = tổng Thành tiền của tất cả các dòng                                                                    | Nhãn hiển thị phải chính xác là **"Tổng cộng"**, không phải "Tổng tạm tính"                                                       |
  > | Nút Xóa sản phẩm (Remove action)             | Action                   | Bắt buộc hiển thị dialog xác nhận trước khi xóa khỏi giỏ                                                                          | -                                                                                                                                  |
  > | Nút Tiếp tục mua sắm (Continue Shopping)     | Action / Navigation      | Điều hướng về trang chủ                                                                                                           | -                                                                                                                                  |
  >
  > ## Business Rules
  >
  > - Mỗi sản phẩm chỉ xuất hiện đúng 1 dòng trong giỏ; thêm trùng sản phẩm chỉ tăng Số lượng của dòng hiện có, không tạo dòng mới.
  > - Số lượng mỗi dòng phải là số nguyên dương, tối thiểu là 1; điều chỉnh thông qua nút +/-.
  > - Thành tiền của mỗi dòng = Đơn giá × Số lượng, tự động cập nhật ngay khi Số lượng thay đổi.
  > - Tổng cộng = tổng Thành tiền của tất cả các dòng trong giỏ; nhãn hiển thị phải đúng là "Tổng cộng".
  > - Hành động Xóa sản phẩm khỏi giỏ bắt buộc phải có dialog xác nhận trước khi thực hiện; không xóa ngay khi bấm nút.
  > - Nút Tiếp tục mua sắm phải điều hướng người dùng quay về trang chủ.
  > - Khi giỏ hàng không còn sản phẩm nào (rỗng), trang phải hiển thị hình minh họa (illustration/icon) kèm thông báo rõ ràng, thân thiện.
  >
  > ## Expected Outcomes
  >
  > - _Success:_
  >   - Thêm sản phẩm chưa có trong giỏ → tạo dòng mới cho sản phẩm đó.
  >   - Thêm sản phẩm đã có trong giỏ → tăng Số lượng của dòng hiện tại; Thành tiền và Tổng cộng cập nhật tương ứng.
  >   - Bấm nút + hoặc - → Số lượng tăng/giảm 1 đơn vị; Thành tiền và Tổng cộng cập nhật theo thời gian thực.
  >   - Bấm Xóa sản phẩm và xác nhận trong dialog → dòng sản phẩm bị xóa khỏi giỏ; Tổng cộng cập nhật lại.
  >   - Bấm Tiếp tục mua sắm → điều hướng về trang chủ.
  >   - Giỏ hàng rỗng → hiển thị hình minh họa và thông báo giỏ hàng trống.
  > - _Failure:_
  >   - Bấm Xóa sản phẩm nhưng hủy (cancel) dialog xác nhận → dòng sản phẩm không bị xóa, giỏ hàng giữ nguyên.
  >   - Bấm nút "-" khi Số lượng đang là 1 → hệ thống phải chặn việc giảm xuống dưới 1 (không cho Số lượng ≤ 0).

---

**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Sonnet 4.6)
- **Thời gian:** 2026-06-26
- **Nội dung prompt:**
  > Hãy đóng vai QA analyst expert, sử dụng skill @.agents/skills/requirement-analysis/SKILL.md để phân tích chức năng FR-15 Quản lý Sản phẩm dựa trên mô tả trong file @README.md
  >
  > Ghi kết quả vào file @docs/anh-khoa/feature-specs/FR-15 Quản lý Sản phẩm.md
  >
  > Sau đó nhớ lưu lại lịch sử prompt và cả requirement spec bằng skill @.agents/skills/ai-audit-logger/SKILL.md
- **AI output:**
  > # FR-15: Quản lý Sản phẩm (Product CRUD)
  >
  > - **Module:** `PRODUCT`
  > - **Requirement ID:** `FR-15`
  >
  > ## Input Fields
  >
  > | Field                         | Data Type                | Constraints                                                                                  | Notes                                                                                                |
  > | ------------------------------ | -------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
  > | Tên sản phẩm (Product Name)   | String                    | Bắt buộc, không được để trống; tối đa 255 ký tự                                                | -                                                                                                       |
  > | Giá (Price)                   | Number (₫)                | Bắt buộc; phải là số dương (> 0)                                                                | Giá = 0 hoặc âm là không hợp lệ                                                                        |
  > | Danh mục (Category)           | Reference (`category_id`) | Bắt buộc; phải chọn từ danh sách danh mục có sẵn trong hệ thống (xem FR-14)                     | Không cho phép gán danh mục không tồn tại                                                              |
  > | Mô tả (Description)           | String                    | README không nêu ràng buộc bắt buộc/độ dài cụ thể cho FR-15                                     | Trường này xuất hiện ở trang chi tiết sản phẩm (FR-06) và trong header CSV import (FR-16)              |
  > | Ảnh (Image URL)                | String (URL)               | README không nêu ràng buộc bắt buộc/định dạng cụ thể cho FR-15                                  | Theo FR-05/FR-06/FR-24, ảnh hiển thị trên UI cần có thuộc tính `alt` mô tả (yêu cầu UI, không phải ràng buộc nhập liệu) |
  >
  > ## Business Rules
  >
  > - Chỉ Admin (JWT hợp lệ và `role = 'admin'`) mới được thực hiện Thêm / Sửa / Xóa sản phẩm — các API `POST/PUT/DELETE /api/products` đều phải kiểm tra điều kiện này (theo FR-12, SEC-03).
  > - Tên sản phẩm là bắt buộc và không được vượt quá 255 ký tự.
  > - Giá là bắt buộc và phải là số dương (> 0); giá trị 0 hoặc số âm đều không hợp lệ.
  > - Danh mục là bắt buộc và phải được chọn từ danh sách danh mục đã tồn tại trong hệ thống.
  > - Admin có đầy đủ 4 thao tác trên sản phẩm: Thêm (Create), Xem (Read/List), Sửa (Update), Xóa (Delete).
  > - Khi Sửa (Update) một sản phẩm, chỉ đúng sản phẩm đó bị thay đổi — các sản phẩm khác trong hệ thống phải giữ nguyên, không bị ảnh hưởng.
  >
  > ## Expected Outcomes
  >
  > - _Success:_
  >   - Thêm sản phẩm với Tên, Giá, Danh mục hợp lệ → sản phẩm mới được tạo và xuất hiện trong danh sách sản phẩm.
  >   - Sửa sản phẩm với dữ liệu hợp lệ → chỉ sản phẩm đó được cập nhật; các sản phẩm khác không thay đổi.
  >   - Xóa sản phẩm → sản phẩm bị loại khỏi danh sách.
  >   - Xem danh sách / chi tiết sản phẩm → hiển thị đúng dữ liệu hiện có của sản phẩm.
  > - _Failure:_
  >   - Tên sản phẩm để trống hoặc vượt quá 255 ký tự → lỗi validate, không lưu sản phẩm.
  >   - Giá để trống, bằng 0, hoặc là số âm → lỗi "giá phải là số dương", không lưu sản phẩm.
  >   - Không chọn Danh mục hoặc chọn danh mục không tồn tại → lỗi validate, không lưu sản phẩm.
  >   - Gọi API Thêm/Sửa/Xóa sản phẩm mà không có token hợp lệ, hoặc token không có `role = 'admin'` → lỗi 401/403, không thực hiện thao tác.

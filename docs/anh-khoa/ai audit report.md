**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Sonnet 4.6)
- **Thời gian:** 2026-06-26 16:45:50
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

- **Đánh giá:** VALID
- **Suy luận:**
  - Khớp vởi mô tả trong README.MD
  - Đúng format yêu cầu
  - Không tìm thấy ảo giác
- **Sửa:** Không cần sửa

---

**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Sonnet 4.6)
- **Thời gian:** 2026-06-26 17:01:11
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
  > | Field                                    | Data Type                | Constraints                                                                                                               | Notes                                                                                                                                 |
  > | ---------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
  > | Số lượng (Quantity)                      | Integer                  | Số nguyên dương, tối thiểu là 1 (kế thừa ràng buộc nhập số lượng ở FR-06); điều chỉnh qua nút +/- trên từng dòng sản phẩm | README không nêu rõ giới hạn tối đa hoặc hành vi khi bấm nút "-" lúc Số lượng = 1 (chặn nút hay xóa dòng) — cần xác minh trên UI thật |
  > | Sản phẩm (Product reference)             | Reference (`product_id`) | Mỗi sản phẩm chỉ xuất hiện đúng 1 dòng trong giỏ                                                                          | Thêm sản phẩm đã có trong giỏ → tăng Số lượng của dòng hiện tại, không tạo dòng mới                                                   |
  > | Đơn giá (Unit Price)                     | Number (₫)               | Chỉ hiển thị (read-only), lấy từ dữ liệu sản phẩm                                                                         | Không phải trường do người dùng chỉnh sửa                                                                                             |
  > | Thành tiền (Subtotal, theo dòng)         | Number (₫)               | Read-only; tính tự động = Đơn giá × Số lượng                                                                              | Phải cập nhật ngay khi Số lượng thay đổi                                                                                              |
  > | Tổng cộng (Total, toàn giỏ)              | Number (₫)               | Read-only; tính tự động = tổng Thành tiền của tất cả các dòng                                                             | Nhãn hiển thị phải chính xác là **"Tổng cộng"**, không phải "Tổng tạm tính"                                                           |
  > | Nút Xóa sản phẩm (Remove action)         | Action                   | Bắt buộc hiển thị dialog xác nhận trước khi xóa khỏi giỏ                                                                  | -                                                                                                                                     |
  > | Nút Tiếp tục mua sắm (Continue Shopping) | Action / Navigation      | Điều hướng về trang chủ                                                                                                   | -                                                                                                                                     |
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

- **Đánh giá:** VALID
- **Suy luận:**
  - Khớp vởi mô tả trong README.MD
  - Đúng format yêu cầu
  - Không tìm thấy ảo giác
- **Sửa:** Không cần sửa

---

**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Sonnet 4.6)
- **Thời gian:** 2026-06-26 17:20:31
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
  > | Field                       | Data Type                 | Constraints                                                                 | Notes                                                                                                                   |
  > | --------------------------- | ------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
  > | Tên sản phẩm (Product Name) | String                    | Bắt buộc, không được để trống; tối đa 255 ký tự                             | -                                                                                                                       |
  > | Giá (Price)                 | Number (₫)                | Bắt buộc; phải là số dương (> 0)                                            | Giá = 0 hoặc âm là không hợp lệ                                                                                         |
  > | Danh mục (Category)         | Reference (`category_id`) | Bắt buộc; phải chọn từ danh sách danh mục có sẵn trong hệ thống (xem FR-14) | Không cho phép gán danh mục không tồn tại                                                                               |
  > | Mô tả (Description)         | String                    | README không nêu ràng buộc bắt buộc/độ dài cụ thể cho FR-15                 | Trường này xuất hiện ở trang chi tiết sản phẩm (FR-06) và trong header CSV import (FR-16)                               |
  > | Ảnh (Image URL)             | String (URL)              | README không nêu ràng buộc bắt buộc/định dạng cụ thể cho FR-15              | Theo FR-05/FR-06/FR-24, ảnh hiển thị trên UI cần có thuộc tính `alt` mô tả (yêu cầu UI, không phải ràng buộc nhập liệu) |
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

- **Đánh giá:** INCOMPLETE
- **Suy luận:**
  - 3 ràng buộc chính không sai
  - Tuy nhiên, output tự thêm 2 trường Mô tả và Ảnh vào bảng Input Fields dù FR-15 không hề liệt kê ràng buộc nào cho 2 trường này — chỉ suy ra từ FR-06 (trang chi tiết) và FR-16 (header CSV). Việc này làm loãng bảng: mục tiêu của bảng Input Fields là phục vụ Boundary Value Analysis, nhưng 2 trường này "không có ràng buộc cụ thể" thì không có biên (boundary) nào để thiết kế test — đưa vào bảng chính dễ gây hiểu nhầm là chúng cũng cần BVA như 3 trường kia
- **Sửa:**
  - Tách Mô tả và Ảnh ra khỏi bảng Input Fields chính, đưa vào một mục riêng (Trường khác).
  - Giữ nguyên phần 3 ràng buộc chính và toàn bộ Business Rules/Expected Outcomes vì đã chính xác.

---

**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Sonnet 4.6)
- **Thời gian:** 2026-06-26 17:35:39
- **Nội dung prompt:**
  > Hãy đóng vai QA analyst expert, sử dụng skill @.agents/skills/requirement-analysis/SKILL.md để phân tích chức năng FR-20 Đăng nhập trên mobile dựa trên mô tả trong file @README.md
  >
  > Ghi kết quả vào file @docs/anh-khoa/feature-specs/FR-20 Đăng nhập trên mobile.md
  >
  > Sau đó nhớ lưu lại lịch sử prompt và cả requirement spec bằng skill @.agents/skills/ai-audit-logger/SKILL.md
- **AI output:**

  > # FR-20: Đăng nhập trên Mobile (Mobile Login)
  >
  > - **Module:** `MOBILE_LOGIN`
  > - **Requirement ID:** `FR-20`
  >
  > > **Nguồn tham chiếu:** README chỉ nêu FR-20 (Tính năng Mobile) ở mức "phải có đầy đủ chức năng Đăng nhập" và dùng chung backend API với Web. Các quy tắc chi tiết của chức năng Đăng nhập (bộ đếm sai, khóa tài khoản, JWT...) được kế thừa từ FR-02, vì Mobile và Web gọi cùng một API backend nên phải tuân theo cùng logic nghiệp vụ.
  >
  > ## Input Fields
  >
  > | Field               | Data Type             | Constraints                                | Notes                                                                                                                                                                                                |
  > | ------------------- | --------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  > | Email               | String (email format) | Bắt buộc; phải đúng định dạng email hợp lệ | FR-22 yêu cầu trường email dùng `type="email"` — đây là thuộc tính HTML chỉ áp dụng cho Web; trên Mobile cần triển khai validate định dạng tương đương (ví dụ: bàn phím kiểu email + kiểm tra regex) |
  > | Mật khẩu (Password) | String                | Bắt buộc                                   | Trường phải ẩn ký tự nhập trên Mobile (tương đương `type="password"` trên Web — theo FR-22)                                                                                                          |
  >
  > ## Business Rules
  >
  > - Mobile phải có đầy đủ chức năng Đăng nhập như trên Web và dùng chung backend API (theo FR-20).
  > - Sau mỗi lần đăng nhập sai, hệ thống tăng bộ đếm đăng nhập sai lên đúng 1 đơn vị (kế thừa từ FR-02).
  > - Nếu đăng nhập sai từ 3 lần liên tiếp trở lên, tài khoản bị tạm khóa 30 giây (môi trường demo); hệ thống trả về thông báo lỗi phù hợp, không để lộ chi tiết nguyên nhân (sai email hay sai mật khẩu).
  > - Đăng nhập thành công trả về JWT Token; token phải được lưu trữ phía client (Mobile) và gửi kèm tất cả các request có xác thực qua header `Authorization: Bearer <token>`.
  > - Bộ đếm đăng nhập sai và trạng thái khóa được quản lý tại backend, dùng chung cho mọi client — hành vi khóa tài khoản giống nhau dù đăng nhập từ Web hay Mobile.
  >
  > ## Expected Outcomes
  >
  > - _Success:_ Email và Mật khẩu hợp lệ, khớp với tài khoản đã đăng ký, tài khoản không bị khóa → đăng nhập thành công, nhận JWT Token, chuyển vào màn hình chính của app.
  > - _Failure:_
  >   - Bỏ trống Email hoặc Mật khẩu → lỗi "trường bắt buộc".
  >   - Email sai định dạng → lỗi định dạng email.
  >   - Email hoặc mật khẩu không đúng → lỗi đăng nhập (không nêu rõ trường nào sai), bộ đếm sai tăng thêm 1.
  >   - Đăng nhập sai từ lần thứ 3 liên tiếp → tài khoản bị tạm khóa 30 giây, hệ thống trả về thông báo lỗi phù hợp (không lộ nguyên nhân khóa).
  >   - Đăng nhập trong lúc tài khoản đang bị khóa → bị từ chối dù nhập đúng Email/Mật khẩu, kèm thông báo lỗi phù hợp.

- **Đánh giá:** INCOMPLETE

- **Suy luận:** Output chèn thuật ngữ triển khai cụ thể của React Native (secureTextEntry, "bàn phím kiểu email"/keyboardType) — những thứ này không xuất hiện trong README. Skill yêu cầu phân tích dựa trên mô tả được cung cấp, không phải suy đoán giải pháp kỹ thuật của framework.

- **Sửa:** Bỏ các tên thuộc tính/API framework, chỉ giữ yêu cầu nghiệp vụ trung lập nền tảng — ví dụ đổi Notes của trường Mật khẩu thành "Phải ẩn ký tự khi nhập (tương đương type="password" trên Web — theo FR-22)" và bỏ câu liên quan secureTextEntry; trường Email bỏ gợi ý "bàn phím kiểu email", chỉ giữ "cần validate đúng định dạng email tương đương yêu cầu HTML5 trên Web".

---

**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Opus 4.8)
- **Thời gian:** 2026-06-27 00:46:57
- **Nội dung prompt:**
  > Sử dụng skill @.agents/skills/domain-testing/SKILL.md để thiết kế test case cho tính năng FR-01: Đăng ký tài khoản
  >
  > Sử dụng phân tích yêu cầu từ @docs/anh-khoa/feature-specs/FR-01 Đăng ký tài khoản.md
  >
  > Sau khi hoàn thành, dùng skill @.agents/skills/ai-audit-logger/SKILL.md để lưu lại lịch sử nhé
- **AI output:**

  > ## 1. Giải thích cách áp dụng kỹ thuật
  >
  > Áp dụng Domain Testing cho FR-01 với 4 biến: Họ Tên, Email, Mật khẩu, Xác nhận mật khẩu. Mỗi biến được chia thành Valid Equivalence Classes (VEC) và Invalid Equivalence Classes (IEC), xét đồng thời giới hạn kiểu dữ liệu (rỗng/null, độ dài cực biên, loại ký tự) lẫn ràng buộc nghiệp vụ (định dạng email, tính duy nhất, 4 điều kiện độ phức tạp mật khẩu, ràng buộc tập ký tự đặc biệt).
  >
  > Biến Mật khẩu là phức tạp nhất: ngoài 4 điều kiện độ phức tạp phải thỏa đồng thời, đặc tả còn giới hạn ký tự đặc biệt hợp lệ trong đúng tập `@ $ ! % * ? &`. Do đó tôi tách thêm một IEC riêng cho "có ký tự đặc biệt nhưng nằm ngoài tập cho phép" (vd `#`) — về mặt logic đây là trường hợp không có ký tự đặc biệt hợp lệ, là một biên dễ bị implementation làm sai (regex nới lỏng nhận mọi ký tự đặc biệt). Áp dụng Single Fault Assumption, mỗi IEC của Mật khẩu được kiểm riêng lẻ trong khi mọi điều kiện còn lại giữ hợp lệ, để tránh một lỗi che lấp lỗi khác.
  >
  > Về ràng buộc liên biến: Xác nhận mật khẩu không có miền giá trị độc lập — VEC của nó là "khớp chính xác giá trị hiện tại của Mật khẩu", IEC là "khác giá trị Mật khẩu" hoặc rỗng. Vì vậy khi kiểm tra một IEC của Mật khẩu, tôi luôn đặt Xác nhận mật khẩu bằng đúng giá trị Mật khẩu để cô lập đúng lỗi cần kiểm. Email cũng ràng buộc với trạng thái hệ thống: IEC "đã tồn tại" được kiểm bằng tài khoản mặc định `test@eshop.com` có sẵn theo README. Các VEC được gộp vào một test case dương duy nhất (TC-REGISTER-001, dùng mật khẩu đúng 8 ký tự để đồng thời chạm biên dưới hợp lệ của độ dài); mỗi IEC kiểm riêng từ TC-REGISTER-002 đến 014.
  >
  > ## 2. Bảng phân lớp tương đương (Partition)
  >
  > | Variable          | Valid Classes                                                                             | Invalid Classes                                                                                                                                                           |
  > | ----------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  > | Họ Tên            | V1: Chuỗi không rỗng                                                                      | I1: Rỗng                                                                                                                                                                  |
  > | Email             | V2: Đúng định dạng `user@domain.com` và chưa tồn tại                                      | I2: Sai định dạng · I3: Đúng định dạng nhưng đã tồn tại (trùng) · I4: Rỗng                                                                                                |
  > | Mật khẩu          | V3: ≥8 ký tự, đủ ≥1 hoa + ≥1 thường + ≥1 số + ≥1 ký tự đặc biệt thuộc tập `@ $ ! % * ? &` | I5: <8 ký tự · I6: Thiếu chữ hoa · I7: Thiếu chữ thường · I8: Thiếu chữ số · I9: Không có ký tự đặc biệt · I10: Có ký tự đặc biệt ngoài tập cho phép (vd `#`) · I11: Rỗng |
  > | Xác nhận mật khẩu | V4: Khớp chính xác với Mật khẩu                                                           | I12: Không khớp · I13: Rỗng                                                                                                                                               |
  >
  > **File:** `tests/test-cases/register/TC-REGISTER-001.md`
  >
  > ```markdown
  > # TC-REGISTER-001: Đăng ký thành công với dữ liệu hợp lệ (mật khẩu chạm biên dưới 8 ký tự)
  >
  > **Requirement ID:** FR-01
  > **Test Type:** Domain Testing
  >
  > ### 1. Preconditions
  >
  > - Người dùng đang ở trang Đăng ký (Register), chưa đăng nhập.
  > - Email `nguyenvana01@gmail.com` chưa tồn tại trong hệ thống.
  >
  > ### 2. Test Data (Inputs)
  >
  > - Họ Tên: `Nguyễn Văn A`
  > - Email: `nguyenvana01@gmail.com`
  > - Mật khẩu: `Abcd123!` (đúng 8 ký tự — biên dưới hợp lệ; đủ hoa/thường/số/ký tự đặc biệt thuộc tập cho phép)
  > - Xác nhận mật khẩu: `Abcd123!`
  >
  > ### 3. Test Steps
  >
  > 1. Mở trang Đăng ký.
  > 2. Nhập đầy đủ 4 trường theo Test Data ở trên.
  > 3. Bấm nút "Đăng ký".
  >
  > ### 4. Expected Result
  >
  > - Hệ thống tạo tài khoản mới thành công.
  > - Hệ thống chuyển hướng người dùng sang trang Đăng nhập.
  > ```
  >
  > **File:** `tests/test-cases/register/TC-REGISTER-002.md` — Họ Tên để trống → lỗi "Họ Tên là trường bắt buộc", không tạo tài khoản.
  >
  > **File:** `tests/test-cases/register/TC-REGISTER-003.md` — Email sai định dạng (`nguyenvana03@`) → lỗi định dạng email, không tạo tài khoản.
  >
  > **File:** `tests/test-cases/register/TC-REGISTER-004.md` — Email trùng (`test@eshop.com` đã tồn tại) → lỗi "Email đã tồn tại", không tạo tài khoản trùng.
  >
  > **File:** `tests/test-cases/register/TC-REGISTER-005.md` — Email để trống → lỗi "Email là trường bắt buộc", không tạo tài khoản.
  >
  > **File:** `tests/test-cases/register/TC-REGISTER-006.md` — Mật khẩu 7 ký tự (`Aa1!aa2`, chỉ vi phạm độ dài) → lỗi định dạng mật khẩu (tối thiểu 8 ký tự).
  >
  > **File:** `tests/test-cases/register/TC-REGISTER-007.md` — Mật khẩu thiếu chữ hoa (`abcd123!`) → lỗi định dạng mật khẩu.
  >
  > **File:** `tests/test-cases/register/TC-REGISTER-008.md` — Mật khẩu thiếu chữ thường (`ABCD123!`) → lỗi định dạng mật khẩu.
  >
  > **File:** `tests/test-cases/register/TC-REGISTER-009.md` — Mật khẩu thiếu chữ số (`Abcdefg!`) → lỗi định dạng mật khẩu.
  >
  > **File:** `tests/test-cases/register/TC-REGISTER-010.md` — Mật khẩu không có ký tự đặc biệt (`Abcd1234`) → lỗi định dạng mật khẩu.
  >
  > **File:** `tests/test-cases/register/TC-REGISTER-011.md` — Mật khẩu có ký tự đặc biệt ngoài tập cho phép (`Abcd1234#`, `#` không thuộc `@ $ ! % * ? &`) → theo đặc tả phải bị coi là không có ký tự đặc biệt hợp lệ → lỗi định dạng mật khẩu; nếu hệ thống chấp nhận thì đó là điểm không tuân thủ đặc tả.
  >
  > **File:** `tests/test-cases/register/TC-REGISTER-012.md` — Mật khẩu để trống → lỗi "Mật khẩu là trường bắt buộc", không tạo tài khoản.
  >
  > **File:** `tests/test-cases/register/TC-REGISTER-013.md` — Xác nhận mật khẩu không khớp (`Abcd123!` vs `Abcd123@`) → lỗi "Mật khẩu xác nhận không khớp", không tạo tài khoản.
  >
  > **File:** `tests/test-cases/register/TC-REGISTER-014.md` — Xác nhận mật khẩu để trống → lỗi "Xác nhận mật khẩu là trường bắt buộc", không tạo tài khoản.
  >
  > _(Mỗi file 002–014 tuân theo đúng template Preconditions / Test Data / Test Steps / Expected Result như TC-REGISTER-001; ở đây tóm tắt phần khác biệt cốt lõi để tránh lặp.)_

- **Đánh giá:** VALID

- **Suy luận:** AI suy luận tốt, bao phủ các trường hợp trong ràng buộc, có giải thích rõ cách áp dụng domain testing trong tính năng này

- **Sửa:** Không cần sửa

---

**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Opus 4.8)
- **Thời gian:** 2026-06-27 01:17:30
- **Nội dung prompt:**
  > Sử dụng skill @.agents/skills/domain-testing/SKILL.md để thiết kế test case cho tính năng FR-07 Giỏ hàng
  >
  > Sử dụng phân tích yêu cầu từ @docs/anh-khoa/feature-specs/FR-07 Giỏ hàng.md
  >
  > Sau khi hoàn thành, dùng skill @.agents/skills/ai-audit-logger/SKILL.md để lưu lại lịch sử nhé
- **AI output:**

  > ## 1. Giải thích cách áp dụng kỹ thuật
  >
  > FR-07 chủ yếu là tính năng hành vi/trạng thái, nên tôi áp dụng Domain Testing theo hai hướng. Thứ nhất, với biến số định lượng duy nhất là Số lượng (Quantity) — kiểu Integer, ràng buộc nghiệp vụ tối thiểu = 1, chỉ điều chỉnh qua nút +/- (không nhập trực tiếp) — tôi xác định VEC là miền `≥1` và IEC là nỗ lực đưa giá trị xuống `<1`. Vì cơ chế nhập là nút +/-, biên dưới được kiểm bằng hai ca đối nhau: giảm từ 2→1 (hợp lệ, chạm đúng biên dưới) và bấm "-" tại 1 (cố vượt biên xuống 0 — phải bị chặn). Đây là điểm boundary cốt lõi và là IEC bắt buộc không được bỏ.
  >
  > Thứ hai, với các biến trạng thái rời rạc, tôi phân vùng theo từng cặp lớp tương đương: hành vi Thêm sản phẩm (sản phẩm chưa có → tạo dòng mới · đã có → tăng số lượng dòng cũ, bất biến "mỗi sản phẩm đúng 1 dòng"); hộp thoại Xóa (xác nhận → xóa · hủy → giữ nguyên); trạng thái giỏ (có hàng → hiển thị bảng · rỗng → empty state). Ràng buộc liên biến quan trọng: Thành tiền = Đơn giá × Số lượng và Tổng cộng = Σ Thành tiền là các giá trị dẫn xuất — chúng phụ thuộc trực tiếp vào Số lượng, nên mỗi khi Số lượng đổi, các test case đều kiểm đồng thời sự cập nhật của Thành tiền/Tổng cộng để bắt lỗi tính toán.
  >
  > ## 2. Bảng phân lớp tương đương (Partition)
  >
  > | Variable               | Valid Classes                                                                                                     | Invalid Classes                                     |
  > | ---------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
  > | Số lượng (qua nút +/-) | V: `≥1` (tăng bằng "+"; giảm bằng "-" khi đang `>1`)                                                              | I: cố đưa về `0`/âm (bấm "-" khi Số lượng = 1)      |
  > | Hành vi Thêm sản phẩm  | V1: sản phẩm chưa có trong giỏ → tạo dòng mới · V2: sản phẩm đã có → tăng Số lượng dòng cũ (không tạo dòng trùng) | — (phân vùng hành vi, không có lớp dữ liệu invalid) |
  > | Hộp thoại Xóa sản phẩm | V1: Xác nhận → xóa dòng · V2: Hủy → giữ nguyên dòng                                                               | —                                                   |
  > | Trạng thái giỏ hàng    | V1: có ≥1 sản phẩm → hiển thị bảng + "Tổng cộng" · V2: rỗng → empty state (hình minh họa + thông báo)             | —                                                   |
  >
  > **File:** `tests/test-cases/cart/TC-CART-001.md`
  >
  > ```markdown
  > # TC-CART-001: Thêm sản phẩm chưa có trong giỏ → tạo dòng mới
  >
  > **Requirement ID:** FR-07
  > **Test Type:** Domain Testing
  >
  > ### 1. Preconditions
  >
  > - Giỏ hàng hiện chưa chứa "Sản phẩm A".
  > - "Sản phẩm A" có Đơn giá 100,000 ₫.
  >
  > ### 2. Test Data (Inputs)
  >
  > - Sản phẩm: `Sản phẩm A` (Đơn giá 100,000 ₫)
  > - Hành động: Thêm vào giỏ với Số lượng 1
  >
  > ### 3. Test Steps
  >
  > 1. Mở trang chi tiết "Sản phẩm A".
  > 2. Bấm "Thêm vào giỏ hàng".
  > 3. Mở trang Giỏ hàng.
  >
  > ### 4. Expected Result
  >
  > - Giỏ hàng có đúng 1 dòng mới cho "Sản phẩm A", Số lượng = 1.
  > - Hiển thị đủ các cột: Sản phẩm, Đơn giá, Số lượng (kèm nút +/-), Thành tiền, Thao tác.
  > - Thành tiền dòng = 100,000 ₫; Tổng cộng = 100,000 ₫.
  > ```
  >
  > **File:** `tests/test-cases/cart/TC-CART-002.md` — Thêm lại "Sản phẩm A" đã có trong giỏ → vẫn đúng 1 dòng, Số lượng tăng 1→2, Thành tiền & Tổng cộng = 200,000 ₫ (không tạo dòng trùng).
  >
  > **File:** `tests/test-cases/cart/TC-CART-003.md` — Bấm "+" tại dòng Số lượng=1 → tăng đúng 1 đơn vị (→2); Thành tiền (200,000 ₫) và Tổng cộng cập nhật theo thời gian thực.
  >
  > **File:** `tests/test-cases/cart/TC-CART-004.md` — Bấm "-" khi Số lượng=2 → giảm về 1 (biên dưới hợp lệ); Thành tiền/Tổng cộng cập nhật = 100,000 ₫; dòng vẫn tồn tại.
  >
  > **File:** `tests/test-cases/cart/TC-CART-005.md` — (IEC biên) Bấm "-" khi Số lượng=1 → hệ thống chặn, không cho xuống 0/âm, giữ tối thiểu 1; nếu cho phép ≤0 thì là điểm không tuân thủ ràng buộc "tối thiểu là 1".
  >
  > **File:** `tests/test-cases/cart/TC-CART-006.md` — Giỏ 2 dòng (A: 1×100,000; B: 2×50,000) → Tổng cộng = 200,000 ₫ (đúng tổng các dòng); nhãn đúng "Tổng cộng" (không phải "Tổng tạm tính"); dùng ký hiệu ₫ + phân cách hàng nghìn.
  >
  > **File:** `tests/test-cases/cart/TC-CART-007.md` — Xóa "Sản phẩm A" và bấm Xác nhận trên dialog (dialog bắt buộc hiện trước) → dòng bị xóa, còn lại B, Tổng cộng cập nhật = 50,000 ₫.
  >
  > **File:** `tests/test-cases/cart/TC-CART-008.md` — Xóa "Sản phẩm A" nhưng bấm Hủy dialog → dòng KHÔNG bị xóa, giỏ giữ nguyên 2 dòng, Tổng cộng giữ 150,000 ₫.
  >
  > **File:** `tests/test-cases/cart/TC-CART-009.md` — Xóa dòng cuối cùng → giỏ rỗng → hiển thị empty state (hình minh họa + thông báo thân thiện), không còn bảng/giá trị Tổng cộng dạng số.
  >
  > **File:** `tests/test-cases/cart/TC-CART-010.md` — Bấm "Tiếp tục mua sắm" → điều hướng về trang chủ.
  >
  > _(Mỗi file 002–010 tuân theo đúng template Preconditions / Test Data / Test Steps / Expected Result như TC-CART-001; ở đây tóm tắt phần khác biệt cốt lõi để tránh lặp.)_

- **Đánh giá:** VALID

- **Suy luận:** AI suy luận tốt, bao phủ các trường hợp trong ràng buộc, có giải thích rõ cách áp dụng domain testing trong tính năng này

- **Sửa:** Không cần sửa

---

**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Opus 4.8)
- **Thời gian:** 2026-06-27 10:08:55
- **Nội dung prompt:**
  > Sử dụng skill @.agents/skills/domain-testing/SKILL.md để thiết kế test case cho tính năng FR-15 Quản lý Sản phẩm
  >
  > Sử dụng phân tích yêu cầu từ @docs/anh-khoa/feature-specs/FR-15 Quản lý Sản phẩm.md
  >
  > Sau khi hoàn thành, dùng skill @.agents/skills/ai-audit-logger/SKILL.md để lưu lại lịch sử nhé
- **AI output:**

  > ## 1. Giải thích cách áp dụng kỹ thuật
  >
  > Áp dụng Domain Testing cho FR-15, tôi phân tích 3 trường nhập liệu của form Thêm/Sửa sản phẩm — Tên sản phẩm, Giá, Danh mục — cùng một biến trạng thái xuyên suốt là Quyền truy cập (Authorization). Mỗi biến được chia VEC/IEC dựa trên cả giới hạn kiểu dữ liệu (rỗng/null, độ dài cực biên, giá trị không phải số) lẫn ràng buộc nghiệp vụ. Tôi chú trọng phân tích biên: Tên có biên trên 255 (hợp lệ) / 256 (không hợp lệ) và biên dưới 1 ký tự (hợp lệ) / rỗng (không hợp lệ); Giá có biên 0 (không hợp lệ) so với giá trị dương nhỏ nhất (hợp lệ), kèm các IEC số âm, rỗng và không-phải-số.
  >
  > Về ràng buộc liên biến: Quyền truy cập đóng vai trò "cổng" — mọi thao tác Thêm/Sửa/Xóa chỉ thực hiện được khi JWT hợp lệ và `role = 'admin'` (FR-12, SEC-03). Vì vậy khi kiểm IEC của từng trường nhập liệu, tôi luôn đặt actor = Admin hợp lệ để lỗi quy đúng về trường đang kiểm; ngược lại, khi kiểm IEC của Quyền, tôi đặt mọi trường ở giá trị hợp lệ để cô lập lỗi phân quyền — đúng Single Fault Assumption. Các VEC được gộp vào ca tạo thành công (TC-PRODUCT-001) và các ca biên hợp lệ (002–004); mỗi IEC kiểm riêng lẻ (005–014); riêng TC-PRODUCT-015 kiểm bất biến nghiệp vụ "Sửa chỉ ảnh hưởng đúng sản phẩm đó".
  >
  > ## 2. Bảng phân lớp tương đương (Partition)
  >
  > | Variable              | Valid Classes                                               | Invalid Classes                                               |
  > | --------------------- | ----------------------------------------------------------- | ------------------------------------------------------------- |
  > | Tên sản phẩm          | V: chuỗi 1–255 ký tự (biên: 1 và 255)                       | I1: rỗng (0 ký tự) · I2: > 255 ký tự (256)                    |
  > | Giá                   | V: số dương `> 0` (biên dưới: giá trị dương nhỏ nhất, vd 1) | I3: `= 0` · I4: số âm (`< 0`) · I5: rỗng · I6: không phải số  |
  > | Danh mục              | V: `category_id` tồn tại trong hệ thống                     | I7: không chọn (rỗng) · I8: `category_id` không tồn tại       |
  > | Quyền (Authorization) | V: JWT hợp lệ + `role = 'admin'`                            | I9: không có token · I10: token hợp lệ nhưng `role ≠ 'admin'` |
  >
  > **File:** `tests/test-cases/product/TC-PRODUCT-001.md`
  >
  > ```markdown
  > # TC-PRODUCT-001: Admin thêm sản phẩm với dữ liệu hợp lệ → tạo thành công
  >
  > **Requirement ID:** FR-15
  > **Test Type:** Domain Testing
  >
  > ### 1. Preconditions
  >
  > - Đã đăng nhập bằng tài khoản Admin (JWT hợp lệ, `role = 'admin'`).
  > - Tồn tại sẵn danh mục hợp lệ "Thời trang" trong hệ thống.
  >
  > ### 2. Test Data (Inputs)
  >
  > - Tên sản phẩm: `Áo thun nam` (hợp lệ, 1–255 ký tự)
  > - Giá: `150000` (số dương)
  > - Danh mục: `Thời trang` (tồn tại)
  >
  > ### 3. Test Steps
  >
  > 1. Mở màn hình Thêm sản phẩm (Web Admin).
  > 2. Nhập Tên, Giá và chọn Danh mục theo Test Data.
  > 3. Bấm "Lưu".
  >
  > ### 4. Expected Result
  >
  > - Sản phẩm mới được tạo thành công.
  > - Sản phẩm xuất hiện trong danh sách sản phẩm với đúng Tên, Giá, Danh mục đã nhập.
  > ```
  >
  > **File:** `tests/test-cases/product/TC-PRODUCT-002.md` — (VEC biên) Tên đúng 255 ký tự (biên trên), Giá/Danh mục hợp lệ, Admin → tạo thành công.
  >
  > **File:** `tests/test-cases/product/TC-PRODUCT-003.md` — (VEC biên) Tên 1 ký tự (biên dưới), còn lại hợp lệ → tạo thành công.
  >
  > **File:** `tests/test-cases/product/TC-PRODUCT-004.md` — (VEC biên) Giá = 1 (số dương nhỏ nhất, ngay trên biên 0), còn lại hợp lệ → tạo thành công.
  >
  > **File:** `tests/test-cases/product/TC-PRODUCT-005.md` — (IEC) Tên để trống → lỗi "Tên sản phẩm là bắt buộc", không lưu.
  >
  > **File:** `tests/test-cases/product/TC-PRODUCT-006.md` — (IEC biên) Tên 256 ký tự (>255) → lỗi validate độ dài, không lưu.
  >
  > **File:** `tests/test-cases/product/TC-PRODUCT-007.md` — (IEC biên) Giá = 0 → lỗi "Giá phải là số dương", không lưu.
  >
  > **File:** `tests/test-cases/product/TC-PRODUCT-008.md` — (IEC) Giá = -1000 (âm) → lỗi "Giá phải là số dương", không lưu.
  >
  > **File:** `tests/test-cases/product/TC-PRODUCT-009.md` — (IEC) Giá để trống → lỗi "Giá là bắt buộc", không lưu.
  >
  > **File:** `tests/test-cases/product/TC-PRODUCT-010.md` — (IEC kiểu dữ liệu) Giá = `abc` (không phải số) → lỗi định dạng Giá, không lưu.
  >
  > **File:** `tests/test-cases/product/TC-PRODUCT-011.md` — (IEC) Không chọn Danh mục → lỗi "Danh mục là bắt buộc", không lưu.
  >
  > **File:** `tests/test-cases/product/TC-PRODUCT-012.md` — (IEC) `category_id = 999999` không tồn tại → lỗi "Danh mục không hợp lệ", không lưu.
  >
  > **File:** `tests/test-cases/product/TC-PRODUCT-013.md` — (IEC quyền) Không có token (mọi trường hợp lệ) → `401 Unauthorized`, không tạo sản phẩm.
  >
  > **File:** `tests/test-cases/product/TC-PRODUCT-014.md` — (IEC quyền) Token hợp lệ nhưng `role = 'user'` → `403 Forbidden`, không tạo sản phẩm.
  >
  > **File:** `tests/test-cases/product/TC-PRODUCT-015.md` — (Bất biến nghiệp vụ) Sửa "Sản phẩm X" với dữ liệu hợp lệ → chỉ X được cập nhật; "Sản phẩm Y" và các sản phẩm khác giữ nguyên.
  >
  > _(Mỗi file 002–015 tuân theo đúng template Preconditions / Test Data / Test Steps / Expected Result như TC-PRODUCT-001; ở đây tóm tắt phần khác biệt cốt lõi để tránh lặp.)_

- **Đánh giá:** VALID

- **Suy luận:** AI suy luận tốt, bao phủ các trường hợp trong ràng buộc, có giải thích rõ cách áp dụng domain testing trong tính năng này

- **Sửa:** Không cần sửa

---

**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Opus 4.8)
- **Thời gian:** 2026-06-27 10:43:36
- **Nội dung prompt:**
  > Sử dụng skill @.agents/skills/domain-testing/SKILL.md để thiết kế test case cho tính năng FR-20 Đăng nhập trên mobile
  >
  > Sử dụng phân tích yêu cầu từ @docs/anh-khoa/feature-specs/FR-20 Đăng nhập trên mobile.md
  >
  > Sau khi hoàn thành, dùng skill @.agents/skills/ai-audit-logger/SKILL.md để lưu lại lịch sử nhé
- **AI output:**

  > ## 1. Giải thích cách áp dụng kỹ thuật
  >
  > Áp dụng Domain Testing cho FR-20, tôi xác định 2 biến nhập liệu — Email, Mật khẩu — và một biến trạng thái quan trọng là bộ đếm đăng nhập sai / trạng thái khóa tài khoản (kế thừa FR-02, quản lý tại backend dùng chung Web/Mobile). Email có VEC là "đúng định dạng + đã đăng ký", IEC gồm rỗng và sai định dạng; trường hợp "đúng định dạng nhưng chưa đăng ký" được xếp vào nhóm sai thông tin đăng nhập. Mật khẩu có VEC "đúng mật khẩu của tài khoản", IEC gồm rỗng và sai mật khẩu.
  >
  > Về ràng buộc liên biến: Email và Mật khẩu được đánh giá cùng nhau như một cặp thông tin đăng nhập — khi sai, hệ thống chỉ trả lỗi chung chung, không lộ trường nào sai (FR-02). Biến trạng thái khóa là cổng phủ quyết: khi tài khoản đang khóa, đăng nhập bị từ chối bất kể Email/Mật khẩu đúng hay sai. Tôi chú trọng phân tích biên của state machine: bộ đếm tăng đúng 1 mỗi lần sai; biên là 2 lần sai (chưa khóa) so với 3 lần sai liên tiếp (kích hoạt khóa 30 giây), và biên thời gian khóa (sau 30 giây hết khóa). Áp dụng Single Fault Assumption: khi kiểm IEC một trường, trường còn lại và trạng thái đều để hợp lệ; khi kiểm state machine, dùng đúng cặp thông tin đăng nhập để cô lập đúng hành vi khóa.
  >
  > ## 2. Bảng phân lớp tương đương (Partition)
  >
  > | Variable                     | Valid Classes                                                 | Invalid Classes                                                                                  |
  > | ---------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
  > | Email                        | V: đúng định dạng và đã đăng ký (vd `test@eshop.com`)         | I1: rỗng · I2: sai định dạng · I3: đúng định dạng nhưng chưa đăng ký (→ sai thông tin đăng nhập) |
  > | Mật khẩu                     | V: đúng mật khẩu của tài khoản                                | I4: rỗng · I5: sai mật khẩu                                                                      |
  > | Trạng thái khóa / bộ đếm sai | V: chưa khóa, bộ đếm `< 3` (biên dưới: 2 lần sai vẫn cho thử) | I6: bộ đếm `≥ 3` → tài khoản đang bị khóa 30 giây                                                |
  >
  > **File:** `tests/test-cases/mobile_login/TC-MOBILE_LOGIN-001.md`
  >
  > ```markdown
  > # TC-MOBILE_LOGIN-001: Đăng nhập thành công với thông tin hợp lệ
  >
  > **Requirement ID:** FR-20
  > **Test Type:** Domain Testing
  >
  > ### 1. Preconditions
  >
  > - App Mobile đang ở màn hình Đăng nhập.
  > - Tồn tại tài khoản hợp lệ `test@eshop.com` / `Test1234!` (tài khoản test mặc định theo README).
  > - Tài khoản không bị khóa (bộ đếm sai = 0).
  >
  > ### 2. Test Data (Inputs)
  >
  > - Email: `test@eshop.com` (đúng định dạng, đã đăng ký)
  > - Mật khẩu: `Test1234!` (đúng mật khẩu)
  >
  > ### 3. Test Steps
  >
  > 1. Mở màn hình Đăng nhập trên app.
  > 2. Nhập Email và Mật khẩu hợp lệ.
  > 3. Bấm "Đăng nhập".
  >
  > ### 4. Expected Result
  >
  > - Đăng nhập thành công; hệ thống trả về JWT Token và lưu phía client.
  > - App chuyển vào màn hình chính.
  > - Các request có xác thực sau đó gửi kèm header `Authorization: Bearer <token>`.
  > ```
  >
  > **File:** `tests/test-cases/mobile_login/TC-MOBILE_LOGIN-002.md` — (IEC) Email để trống (mật khẩu hợp lệ) → lỗi "Email là trường bắt buộc", không gửi yêu cầu.
  >
  > **File:** `tests/test-cases/mobile_login/TC-MOBILE_LOGIN-003.md` — (IEC) Email sai định dạng (`test@`) → lỗi định dạng email (validate bằng logic ứng dụng).
  >
  > **File:** `tests/test-cases/mobile_login/TC-MOBILE_LOGIN-004.md` — (IEC) Mật khẩu để trống (email hợp lệ) → lỗi "Mật khẩu là trường bắt buộc", không gửi yêu cầu.
  >
  > **File:** `tests/test-cases/mobile_login/TC-MOBILE_LOGIN-005.md` — (IEC thông tin đăng nhập) Email đúng định dạng nhưng chưa đăng ký → lỗi đăng nhập chung chung (không lộ trường nào sai), bộ đếm sai +1.
  >
  > **File:** `tests/test-cases/mobile_login/TC-MOBILE_LOGIN-006.md` — (IEC thông tin đăng nhập) Email đã đăng ký + sai mật khẩu → lỗi đăng nhập chung chung, bộ đếm sai +1.
  >
  > **File:** `tests/test-cases/mobile_login/TC-MOBILE_LOGIN-007.md` — (State) Sai 1 lần → bộ đếm = 1 (tăng đúng 1 đơn vị, không nhảy vọt), chưa khóa.
  >
  > **File:** `tests/test-cases/mobile_login/TC-MOBILE_LOGIN-008.md` — (State biên dưới) Sai 2 lần liên tiếp → chưa khóa; lần thứ 3 nhập đúng → đăng nhập thành công, bộ đếm reset.
  >
  > **File:** `tests/test-cases/mobile_login/TC-MOBILE_LOGIN-009.md` — (State biên kích hoạt) Sai 3 lần liên tiếp → tài khoản bị khóa 30 giây, thông báo lỗi không lộ nguyên nhân.
  >
  > **File:** `tests/test-cases/mobile_login/TC-MOBILE_LOGIN-010.md` — (State phủ quyết) Đăng nhập khi đang khóa, dù nhập ĐÚNG Email/Mật khẩu → vẫn bị từ chối, thông báo phù hợp.
  >
  > **File:** `tests/test-cases/mobile_login/TC-MOBILE_LOGIN-011.md` — (State biên thời gian) Sau 30 giây hết khóa → đăng nhập đúng lại thành công, nhận JWT.
  >
  > _(Mỗi file 002–011 tuân theo đúng template Preconditions / Test Data / Test Steps / Expected Result như TC-MOBILE_LOGIN-001; ở đây tóm tắt phần khác biệt cốt lõi để tránh lặp.)_

- **Đánh giá:** VALID

- **Suy luận:** AI suy luận tốt, bao phủ các trường hợp trong ràng buộc, có giải thích rõ cách áp dụng domain testing trong tính năng này

- **Sửa:** Không cần sửa

---

**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Opus 4.8)
- **Thời gian:** 2026-06-27 12:06:36
- **Nội dung prompt:**
  > Tiếp tục đóng vai Boundary Value Analysis Expert, sử dụng @.agents/skills/boundary-value-analysis/SKILL.md để phân tích các giá trị biên dựa trên thông tin từ đặc tả @docs/anh-khoa/feature-specs/FR-01 Đăng ký tài khoản.md
  >
  > Yêu cầu thực thi:
  > - Chỉ lọc ra các biến có giới hạn biên định lượng (ví dụ: độ dài chuỗi, số lượng, khoảng giá trị).
  > - Xác định rõ các điểm On, Off, In, Out (tùy theo loại biên: 2 giá trị hoặc 3 giá trị) cho từng ranh giới và giải thích lý do lựa chọn một cách ngắn gọn.
  > - Sinh bảng Test Case bổ sung cho các điểm biên này. Các test case này không được trùng lặp với các test case đã sinh ở phần Domain Testing.
  > - Chạy kèm @.agents/skills/ai-audit-logger/SKILL.md ở cuối cùng để xuất log nguyên văn (không tóm tắt) toàn bộ quá trình phân tích BVA này.
- **AI output:**

  > ## 1. Lọc biến & xác định bước nhảy (increment)
  >
  > Trong FR-01, **chỉ có Mật khẩu** chứa ràng buộc biên định lượng. Các biến còn lại bị **loại khỏi BVA**:
  > - **Họ Tên:** README không nêu giới hạn độ dài → không có biên số học.
  > - **Email:** ràng buộc *định dạng*, không phải độ dài → không phải biên định lượng.
  > - **Xác nhận mật khẩu:** ràng buộc *khớp*, không định lượng.
  >
  > Mật khẩu có 2 nhóm biên định lượng, đều là **số nguyên → bước nhảy = 1**:
  > - **Độ dài chuỗi:** Min = 8 (đặc tả **không** có Max).
  > - **Số lượng mỗi loại ký tự bắt buộc** (hoa / thường / số / đặc biệt): Min = 1 mỗi loại.
  >
  > ## 2. Xác định điểm biên & đối chiếu trùng lặp
  >
  > Đây là biên **một phía** (chỉ có cận dưới) nên tôi dùng cặp **On / Off** (2 giá trị) cho mỗi biên. Điểm **In** xa (vd độ dài 9, hay >1 ký tự mỗi loại) là lớp tương đương hợp lệ tổng quát → **bỏ theo quy tắc khử trùng lặp** của skill.
  >
  > ### BVA Points definition
  >
  > | Variable | Boundary Type | Target Value | Trạng thái (đối chiếu Domain Testing) |
  > |---|---|---|---|
  > | Mật khẩu — độ dài | Off (Min−1) | 7 ký tự (invalid) | Đã cover — TC-REGISTER-006 |
  > | Mật khẩu — độ dài | On (Min) | 8 ký tự (valid) | Đã cover — TC-REGISTER-001 |
  > | Mật khẩu — số chữ hoa | Off | 0 (invalid) | Đã cover — TC-REGISTER-007 |
  > | Mật khẩu — số chữ hoa | On | 1 (valid) | Đã cover — TC-REGISTER-001 (đúng 1 chữ hoa `A`) |
  > | Mật khẩu — số chữ thường | Off | 0 (invalid) | Đã cover — TC-REGISTER-008 |
  > | Mật khẩu — số chữ thường | On | 1 (valid) | CHƯA cover (TC-001 dùng 3 chữ thường) |
  > | Mật khẩu — số chữ số | Off | 0 (invalid) | Đã cover — TC-REGISTER-009 |
  > | Mật khẩu — số chữ số | On | 1 (valid) | CHƯA cover (TC-001 dùng 3 chữ số) |
  > | Mật khẩu — số ký tự đặc biệt | Off | 0 (invalid) | Đã cover — TC-REGISTER-010 |
  > | Mật khẩu — số ký tự đặc biệt | On | 1 (valid) | Đã cover — TC-REGISTER-001 (đúng 1 ký tự `!`) |
  >
  > **Kết luận đối chiếu:** Biên độ dài (7/8) và phần lớn biên đếm ký tự đã được Domain Testing cover. Chỉ còn **2 điểm On chưa được cô lập**: *số chữ thường = 1* và *số chữ số = 1* — vì TC-REGISTER-001 dùng tới 3 chữ thường và 3 chữ số nên không nằm **đúng trên biên**. Hai điểm này nếu implementation lỡ yêu cầu ≥2 thì TC-001 không bắt được → đáng bổ sung.
  >
  > ## 3. BVA Test Cases (bổ sung, không trùng Domain Testing)
  >
  > | Test Case ID | Requirement ID | Target Boundary | Test Data (Inputs) | Test Steps | Expected Result |
  > |---|---|---|---|---|---|
  > | TC-REGISTER-015 | FR-01 | Số chữ thường = 1 (On) | Họ Tên `Nguyễn Văn A`; Email `bva.lower@gmail.com` (mới); Mật khẩu `ABCD12a!` (8 ký tự: 4 hoa, 1 thường `a`, 2 số, 1 đặc biệt); Xác nhận `ABCD12a!` | 1. Mở trang Đăng ký. 2. Nhập dữ liệu theo Test Data. 3. Bấm "Đăng ký". | Đăng ký thành công (mật khẩu thỏa "≥1 chữ thường" tại đúng giá trị biên 1) → chuyển sang trang Đăng nhập. |
  > | TC-REGISTER-016 | FR-01 | Số chữ số = 1 (On) | Họ Tên `Nguyễn Văn A`; Email `bva.digit@gmail.com` (mới); Mật khẩu `ABCDab1!` (8 ký tự: 4 hoa, 2 thường, 1 số `1`, 1 đặc biệt); Xác nhận `ABCDab1!` | 1. Mở trang Đăng ký. 2. Nhập dữ liệu theo Test Data. 3. Bấm "Đăng ký". | Đăng ký thành công (mật khẩu thỏa "≥1 chữ số" tại đúng giá trị biên 1) → chuyển sang trang Đăng nhập. |
  >
  > ### Nội dung file test case bổ sung
  >
  > **File:** `tests/test-cases/register/TC-REGISTER-015.md`
  >
  > ```markdown
  > # TC-REGISTER-015: BVA — Mật khẩu có đúng 1 chữ thường (On-point biên đếm chữ thường)
  >
  > **Requirement ID:** FR-01
  > **Test Type:** Boundary Value Analysis
  >
  > ### 1. Preconditions
  > - Người dùng đang ở trang Đăng ký, chưa đăng nhập.
  > - Email `bva.lower@gmail.com` chưa tồn tại trong hệ thống.
  >
  > ### 2. Test Data (Inputs)
  > - Họ Tên: `Nguyễn Văn A`
  > - Email: `bva.lower@gmail.com`
  > - Mật khẩu: `ABCD12a!` (8 ký tự: 4 chữ hoa, đúng 1 chữ thường `a`, 2 chữ số, 1 ký tự đặc biệt)
  > - Xác nhận mật khẩu: `ABCD12a!`
  >
  > ### 3. Test Steps
  > 1. Mở trang Đăng ký.
  > 2. Nhập đầy đủ 4 trường theo Test Data.
  > 3. Bấm "Đăng ký".
  >
  > ### 4. Expected Result
  > - Đăng ký thành công: mật khẩu thỏa ràng buộc "≥ 1 chữ thường" ngay tại giá trị biên dưới (đúng 1).
  > - Hệ thống chuyển hướng sang trang Đăng nhập.
  > - Mục tiêu BVA: phát hiện lỗi nếu implementation lỡ yêu cầu ≥ 2 chữ thường (Domain Testing TC-REGISTER-001 dùng 3 chữ thường nên không bắt được lỗi này).
  > ```
  >
  > **File:** `tests/test-cases/register/TC-REGISTER-016.md`
  >
  > ```markdown
  > # TC-REGISTER-016: BVA — Mật khẩu có đúng 1 chữ số (On-point biên đếm chữ số)
  >
  > **Requirement ID:** FR-01
  > **Test Type:** Boundary Value Analysis
  >
  > ### 1. Preconditions
  > - Người dùng đang ở trang Đăng ký, chưa đăng nhập.
  > - Email `bva.digit@gmail.com` chưa tồn tại trong hệ thống.
  >
  > ### 2. Test Data (Inputs)
  > - Họ Tên: `Nguyễn Văn A`
  > - Email: `bva.digit@gmail.com`
  > - Mật khẩu: `ABCDab1!` (8 ký tự: 4 chữ hoa, 2 chữ thường, đúng 1 chữ số `1`, 1 ký tự đặc biệt)
  > - Xác nhận mật khẩu: `ABCDab1!`
  >
  > ### 3. Test Steps
  > 1. Mở trang Đăng ký.
  > 2. Nhập đầy đủ 4 trường theo Test Data.
  > 3. Bấm "Đăng ký".
  >
  > ### 4. Expected Result
  > - Đăng ký thành công: mật khẩu thỏa ràng buộc "≥ 1 chữ số" ngay tại giá trị biên dưới (đúng 1).
  > - Hệ thống chuyển hướng sang trang Đăng nhập.
  > - Mục tiêu BVA: phát hiện lỗi nếu implementation lỡ yêu cầu ≥ 2 chữ số (Domain Testing TC-REGISTER-001 dùng 3 chữ số nên không bắt được lỗi này).
  > ```

- **Đánh giá:** VALID

- **Suy luận:** Lọc đúng (chỉ Mật khẩu có biên định lượng); sinh 2 ca On chưa cô lập (chữ thường=1, chữ số=1), không trùng Domain Testing, giữ Single Fault Assumption.

- **Sửa:** Không cần sửa

---

**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Opus 4.8)
- **Thời gian:** 2026-06-27 12:14:24
- **Nội dung prompt:**
  > Tiếp tục đóng vai Boundary Value Analysis Expert, sử dụng @.agents/skills/boundary-value-analysis/SKILL.md để phân tích các giá trị biên dựa trên thông tin từ đặc tả @docs/anh-khoa/feature-specs/FR-07 Giỏ hàng.md
  >
  > Yêu cầu thực thi:
  > - Chỉ lọc ra các biến có giới hạn biên định lượng (ví dụ: độ dài chuỗi, số lượng, khoảng giá trị).
  > - Xác định rõ các điểm On, Off, In, Out (tùy theo loại biên: 2 giá trị hoặc 3 giá trị) cho từng ranh giới và giải thích lý do lựa chọn một cách ngắn gọn.
  > - Sinh bảng Test Case bổ sung cho các điểm biên này. Các test case này không được trùng lặp với các test case đã sinh ở phần Domain Testing.
  > - Chạy kèm @.agents/skills/ai-audit-logger/SKILL.md ở cuối cùng để xuất log nguyên văn (không tóm tắt) toàn bộ quá trình phân tích BVA này.
- **AI output:**

  > ## 1. Lọc biến & xác định bước nhảy (increment)
  >
  > FR-07 chỉ có **một** biến mang biên định lượng: **Số lượng (Quantity)**.
  >
  > | Biến | Có biên định lượng? | Lý do |
  > |---|---|---|
  > | **Số lượng (Quantity)** | Có | Integer, tối thiểu = 1; điều chỉnh qua nút +/- (bước nhảy = 1) |
  > | Đơn giá / Thành tiền / Tổng cộng | Không | Read-only, là giá trị dẫn xuất/hiển thị, không phải input có biên do người dùng nhập |
  > | Sản phẩm (số dòng/sản phẩm) | Không | Là bất biến "đúng 1 dòng" (đẳng thức), không phải khoảng min–max để BVA |
  > | Nút Xóa / Tiếp tục mua sắm | Không | Hành động, không định lượng |
  >
  > → **Số lượng:** Min = 1, bước nhảy = 1, đặc tả KHÔNG định nghĩa Max.
  >
  > ## 2. Xác định điểm biên & đối chiếu trùng lặp
  >
  > Biên một phía (chỉ có cận dưới) → dùng cặp On / Off (2 giá trị). Điểm In (Số lượng = 2) là lớp tương đương hợp lệ tổng quát → bỏ theo quy tắc khử trùng lặp.
  >
  > ### BVA Points definition
  >
  > | Variable | Boundary Type | Target Value | Trạng thái (đối chiếu Domain Testing) |
  > |---|---|---|---|
  > | Số lượng | Off (Min−1) | 0 (cố giảm xuống dưới 1) | Đã cover — TC-CART-005 (bấm "-" tại 1 → chặn, không cho về 0) |
  > | Số lượng | On (Min) | 1 (giá trị tối thiểu hợp lệ) | Đã cover — TC-CART-004 (giảm 2→1) và TC-CART-001 (thêm với SL=1) |
  > | Số lượng | Max / Max+1 | (không xác định) | Đặc tả không định nghĩa Max → không có giá trị biên trên để kiểm |
  >
  > ## 3. BVA Test Cases (bổ sung)
  >
  > **Không có test case bổ sung nào được sinh.**
  >
  > Lý do (trung thực theo đúng quy tắc dedup của skill):
  >
  > - Biến định lượng duy nhất là Số lượng, biên một phía (Min=1). Cả hai điểm biên — On=1 và Off=0 — đã được Domain Testing kiểm và còn được dán nhãn biên rõ ràng (TC-CART-004 "biên dưới hợp lệ", TC-CART-005 "chặn vượt biên dưới"). Sinh thêm sẽ trùng lặp → vi phạm yêu cầu.
  > - Không có biên trên (Max) trong đặc tả → không có giá trị biên hợp lệ để tạo ca Max/Max+1. Sinh một con số Max tự nghĩ ra sẽ là bịa biên không có trong spec, nên tôi không làm.
  >
  > ### Quan sát & khuyến nghị (không phải test case)
  >
  > - Spec gap: Số lượng không có giới hạn trên. Đây là rủi ro tiềm ẩn (người dùng có thể đặt số lượng cực lớn → ảnh hưởng tồn kho/tính tiền/tràn số). Khuyến nghị team bổ sung ràng buộc Max (ví dụ theo tồn kho). Khi Max được định nghĩa, mới phát sinh thêm 2 ca BVA mới: Max (On) và Max+1 (Off).

- **Đánh giá:** VALID

- **Suy luận:** Lọc đúng (chỉ Số lượng); kết luận 0 ca bổ sung là trung thực vì On=1/Off=0 đã được Domain Testing cover; không bịa biên Max khi spec không định nghĩa.

- **Sửa:** Không cần sửa

---

**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Opus 4.8)
- **Thời gian:** 2026-06-27 12:19:42
- **Nội dung prompt:**
  > Tiếp tục đóng vai Boundary Value Analysis Expert, sử dụng @.agents/skills/boundary-value-analysis/SKILL.md để phân tích các giá trị biên dựa trên thông tin từ đặc tả @docs/anh-khoa/feature-specs/FR-15 Quản lý Sản phẩm.md
  >
  > Yêu cầu thực thi:
  > - Chỉ lọc ra các biến có giới hạn biên định lượng (ví dụ: độ dài chuỗi, số lượng, khoảng giá trị).
  > - Xác định rõ các điểm On, Off, In, Out (tùy theo loại biên: 2 giá trị hoặc 3 giá trị) cho từng ranh giới và giải thích lý do lựa chọn một cách ngắn gọn.
  > - Sinh bảng Test Case bổ sung cho các điểm biên này. Các test case này không được trùng lặp với các test case đã sinh ở phần Domain Testing.
  > - Chạy kèm @.agents/skills/ai-audit-logger/SKILL.md ở cuối cùng để xuất log nguyên văn (không tóm tắt) toàn bộ quá trình phân tích BVA này.
- **AI output:**

  > ## 1. Lọc biến & xác định bước nhảy (increment)
  >
  > | Biến | Có biên định lượng? | Bước nhảy & ranh giới |
  > |---|---|---|
  > | **Tên sản phẩm** | Có (độ dài chuỗi) | Increment = 1 (đếm ký tự); ranh giới: Min = 1 (không rỗng), Max = 255 |
  > | **Giá** | Có (khoảng giá trị) | Ranh giới dưới tại 0 (`> 0`); không có Max. Increment mơ hồ → xem mục dưới |
  > | Danh mục | Không | Tham chiếu (tồn tại/không), không định lượng |
  > | Quyền (Authorization) | Không | Phân quyền, không định lượng |
  >
  > Phân tích bước nhảy của Giá (điểm mấu chốt): đặc tả chỉ ghi "số dương (`> 0`)", không nói Giá là số nguyên. Theo nguyên tắc BVA (`1` cho số nguyên, `0.01` cho số thực), vì đặc tả không ràng buộc số nguyên nên tôi xét theo hướng số thực, increment = 0.01 để kiểm biên chặt hơn. Khi đó On của Giá = 0.01 (giá trị dương nhỏ nhất), khác với giá trị `1` mà Domain Testing đã dùng.
  >
  > ## 2. Xác định điểm biên & đối chiếu trùng lặp
  >
  > ### BVA Points definition
  >
  > | Variable | Boundary Type | Target Value | Trạng thái (đối chiếu Domain Testing) |
  > |---|---|---|---|
  > | Tên — cận dưới | Off (Min−1) | 0 ký tự (rỗng) | Đã cover — TC-PRODUCT-005 |
  > | Tên — cận dưới | On (Min) | 1 ký tự | Đã cover — TC-PRODUCT-003 |
  > | Tên — cận trên | On (Max) | 255 ký tự | Đã cover — TC-PRODUCT-002 |
  > | Tên — cận trên | Off (Max+1) | 256 ký tự | Đã cover — TC-PRODUCT-006 |
  > | Giá — cận dưới | Off | 0 | Đã cover — TC-PRODUCT-007 |
  > | Giá — cận dưới (số nguyên) | On | 1 | Đã cover — TC-PRODUCT-004 |
  > | Giá — cận dưới (số thực) | On | 0.01 | CHƯA cover (TC-004 dùng `1`, không kiểm khoảng `0 < giá < 1`) |
  > | Giá — cận trên | Max / Max+1 | (không xác định) | Đặc tả không định nghĩa Max → không có biên trên để kiểm |
  >
  > Kết luận đối chiếu: Toàn bộ biên của Tên (0/1/255/256) và biên dưới Giá theo số nguyên (0/1) đã được Domain Testing cover đầy đủ. Chỉ còn 1 điểm On chưa cover: Giá = 0.01 — điểm biên dưới khi xét Giá là số thực. Domain Testing dùng `1` nên không phát hiện được trường hợp hệ thống lỡ chặn các giá trị `0 < giá < 1` (vd ép Giá phải ≥ 1 hoặc phải là số nguyên).
  >
  > ## 3. BVA Test Cases (bổ sung, không trùng Domain Testing)
  >
  > | Test Case ID | Requirement ID | Target Boundary | Test Data (Inputs) | Test Steps | Expected Result |
  > |---|---|---|---|---|---|
  > | TC-PRODUCT-016 | FR-15 | Giá = 0.01 (On, số thực) | Admin; Tên `Áo thun nam` (hợp lệ); Giá `0.01`; Danh mục `Thời trang` (tồn tại) | 1. Mở màn hình Thêm sản phẩm. 2. Nhập Giá = 0.01, Tên & Danh mục hợp lệ. 3. Bấm "Lưu". | Theo đặc tả (`> 0`), `0.01` là hợp lệ → tạo sản phẩm thành công. Probe: nếu hệ thống từ chối/làm tròn về 0 → cần làm rõ đặc tả có ngầm định Giá là số nguyên ₫ hay không (điểm chưa rõ trong README). |
  >
  > ### Nội dung file test case bổ sung
  >
  > **File:** `tests/test-cases/product/TC-PRODUCT-016.md`
  >
  > ```markdown
  > # TC-PRODUCT-016: BVA — Giá là số thực dương nhỏ nhất (0.01) tại biên dưới `> 0`
  >
  > **Requirement ID:** FR-15
  > **Test Type:** Boundary Value Analysis
  >
  > ### 1. Preconditions
  > - Đã đăng nhập bằng tài khoản Admin (JWT hợp lệ, `role = 'admin'`).
  > - Tồn tại danh mục hợp lệ "Thời trang".
  >
  > ### 2. Test Data (Inputs)
  > - Tên sản phẩm: `Áo thun nam` (hợp lệ)
  > - Giá: `0.01` (số thực dương nhỏ nhất với bước nhảy 0.01 — ngay trên biên 0)
  > - Danh mục: `Thời trang` (tồn tại)
  >
  > ### 3. Test Steps
  > 1. Mở màn hình Thêm sản phẩm (Web Admin).
  > 2. Nhập Giá = `0.01`, Tên và Danh mục hợp lệ.
  > 3. Bấm "Lưu".
  >
  > ### 4. Expected Result
  > - Theo đặc tả FR-15 ("Giá phải là số dương `> 0`"), giá trị `0.01` thỏa điều kiện → sản phẩm được tạo thành công.
  > - Mục tiêu BVA: kiểm khoảng `0 < giá < 1` mà Domain Testing chưa chạm (TC-PRODUCT-004 dùng `1`). Nếu hệ thống từ chối hoặc làm tròn `0.01` về 0:
  >   - Đó là điểm không tuân thủ đặc tả (đặc tả không ràng buộc Giá phải là số nguyên), hoặc
  >   - Cho thấy đặc tả còn mơ hồ — cần làm rõ Giá có ngầm định là số nguyên ₫ hay không.
  > ```
  >
  > ### Quan sát & khuyến nghị (không phải test case)
  >
  > - Spec gap 1: Giá không có giới hạn trên (Max) → không có biên trên để kiểm; tiềm ẩn rủi ro nhập giá cực lớn. Khuyến nghị định nghĩa Max hợp lý.
  > - Spec gap 2: Đặc tả không nói rõ Giá là số nguyên hay số thực → tạo mơ hồ về increment (1 hay 0.01). TC-PRODUCT-016 chính là ca để làm rõ điểm này trên hệ thống thật.

- **Đánh giá:** VALID

- **Suy luận:** Lọc đúng (Tên, Giá); phát hiện mơ hồ increment của Giá (nguyên vs thực) → sinh ca 0.01 probe khoảng `0 < giá < 1` mà TC-PRODUCT-004 (dùng 1) bỏ sót, không trùng lặp.

- **Sửa:** Không cần sửa

---

**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Opus 4.8)
- **Thời gian:** 2026-06-27 12:27:16
- **Nội dung prompt:**
  > Tiếp tục đóng vai Boundary Value Analysis Expert, sử dụng @.agents/skills/boundary-value-analysis/SKILL.md để phân tích các giá trị biên dựa trên thông tin từ đặc tả @docs/anh-khoa/feature-specs/FR-20 Đăng nhập trên mobile.md
  >
  > Yêu cầu thực thi:
  > - Chỉ lọc ra các biến có giới hạn biên định lượng (ví dụ: độ dài chuỗi, số lượng, khoảng giá trị).
  > - Xác định rõ các điểm On, Off, In, Out (tùy theo loại biên: 2 giá trị hoặc 3 giá trị) cho từng ranh giới và giải thích lý do lựa chọn một cách ngắn gọn.
  > - Sinh bảng Test Case bổ sung cho các điểm biên này. Các test case này không được trùng lặp với các test case đã sinh ở phần Domain Testing.
  > - Chạy kèm @.agents/skills/ai-audit-logger/SKILL.md ở cuối cùng để xuất log nguyên văn (không tóm tắt) toàn bộ quá trình phân tích BVA này.
- **AI output:**

  > ## 1. Lọc biến & xác định bước nhảy (increment)
  >
  > Đặc thù của login: 2 trường nhập (Email, Mật khẩu) không có biên định lượng — biên định lượng nằm ở state machine khóa tài khoản.
  >
  > | Biến | Có biên định lượng? | Bước nhảy & ranh giới |
  > |---|---|---|
  > | Email | Không | Ràng buộc định dạng, không phải độ dài |
  > | Mật khẩu | Không | Login chỉ xác thực; không có ràng buộc độ dài/độ phức tạp ở FR-20 (khác FR-01) |
  > | **Bộ đếm đăng nhập sai** | Có (đếm) | Increment = 1; ngưỡng khóa = 3 lần liên tiếp |
  > | **Thời gian khóa** | Có (khoảng thời gian) | Mốc = 30 giây; increment = 1 giây (môi trường demo) |
  >
  > ## 2. Xác định điểm biên & đối chiếu trùng lặp
  >
  > Cả 2 biên đều một phía, dùng cặp On / Off (2 giá trị). Điểm In/Out xa (vd sai 5 lần, hay chờ 60 giây) là lớp tương đương tổng quát → bỏ theo quy tắc dedup.
  >
  > ### BVA Points definition
  >
  > | Variable | Boundary Type | Target Value | Trạng thái (đối chiếu Domain Testing) |
  > |---|---|---|---|
  > | Bộ đếm sai | Off (Threshold−1) | 2 lần sai → chưa khóa | Đã cover — TC-MOBILE_LOGIN-008 |
  > | Bộ đếm sai | On (Threshold) | 3 lần sai → khóa | Đã cover — TC-MOBILE_LOGIN-009 |
  > | Thời gian khóa | On (tại mốc mở khóa) | t = 30s → mở khóa, đăng nhập đúng thành công | Đã cover — TC-MOBILE_LOGIN-011 |
  > | Thời gian khóa | Off (ngay trước mốc) | t = 29s → vẫn còn khóa | CHƯA cover (TC-010 chỉ kiểm "đang khóa" ngay sau lần sai thứ 3, t≈0; chưa kiểm sát mốc 30s) |
  >
  > Kết luận đối chiếu: Biên bộ đếm sai (2 Off / 3 On) đã được Domain Testing cover trọn vẹn. Biên thời gian khóa mới chỉ cover phía On (sau 30s → mở khóa, TC-011) và "đang khóa ở t≈0" (TC-010). Chưa cover điểm Off sát mốc — tức t = 29s vẫn phải còn khóa. Đây là điểm biên quan trọng để bắt lỗi khóa hết hạn quá sớm (vd implementation lỡ đặt 25s): TC-010 (t≈0) và TC-011 (t≥30) đều không phát hiện được lỗi này.
  >
  > ## 3. BVA Test Cases (bổ sung, không trùng Domain Testing)
  >
  > | Test Case ID | Requirement ID | Target Boundary | Test Data (Inputs) | Test Steps | Expected Result |
  > |---|---|---|---|---|---|
  > | TC-MOBILE_LOGIN-012 | FR-20 | Thời gian khóa: Off = 29s (vẫn khóa) | Email `test@eshop.com` + Mật khẩu `Test1234!` (ĐÚNG), thử lúc t≈29s sau khi khóa | 1. Gây khóa bằng 3 lần sai liên tiếp. 2. Chờ ~29 giây (vẫn trong cửa sổ khóa 30s). 3. Nhập đúng Email + Mật khẩu, bấm "Đăng nhập". | Vẫn bị từ chối vì khóa chưa hết (mới 29/30s), kèm thông báo phù hợp không lộ nguyên nhân. Probe: nếu đăng nhập được ở t=29s → khóa hết hạn sớm hơn 30s (không tuân thủ "tạm khóa 30 giây"). |
  >
  > ### Nội dung file test case bổ sung
  >
  > **File:** `tests/test-cases/mobile_login/TC-MOBILE_LOGIN-012.md`
  >
  > ```markdown
  > # TC-MOBILE_LOGIN-012: BVA — Vẫn còn khóa tại t = 29 giây (Off-point biên thời gian khóa 30s)
  >
  > **Requirement ID:** FR-20
  > **Test Type:** Boundary Value Analysis
  >
  > ### 1. Preconditions
  > - App Mobile đang ở màn hình Đăng nhập.
  > - Tồn tại tài khoản `test@eshop.com` / `Test1234!`.
  > - Tài khoản chưa bị khóa, bộ đếm sai = 0 (trước khi bắt đầu).
  >
  > ### 2. Test Data (Inputs)
  > - Bước gây khóa: 3 lần sai liên tiếp với Email `test@eshop.com` + Mật khẩu `WrongPass1!`.
  > - Bước kiểm biên: Email `test@eshop.com` + Mật khẩu `Test1234!` (ĐÚNG), thực hiện tại thời điểm t ≈ 29 giây sau khi tài khoản bị khóa.
  >
  > ### 3. Test Steps
  > 1. Đăng nhập sai 3 lần liên tiếp để kích hoạt khóa 30 giây.
  > 2. Chờ khoảng 29 giây (vẫn nằm trong cửa sổ khóa, ngay trước mốc 30s).
  > 3. Nhập đúng Email và Mật khẩu, bấm "Đăng nhập".
  >
  > ### 4. Expected Result
  > - Đăng nhập vẫn bị từ chối vì thời gian khóa chưa hết (mới qua 29/30 giây), kèm thông báo lỗi phù hợp, không lộ chi tiết nguyên nhân.
  > - Mục tiêu BVA: kiểm điểm Off sát mốc mở khóa mà Domain Testing chưa chạm (TC-010 kiểm ở t≈0, TC-011 kiểm ở t≥30). Nếu đăng nhập thành công tại t=29s → khóa đã hết hạn sớm hơn 30 giây → không tuân thủ ràng buộc "tạm khóa 30 giây".
  > ```
  >
  > ### Quan sát & khuyến nghị (không phải test case)
  >
  > - Biên bộ đếm sai (ngưỡng 3) đã được Domain Testing phủ trọn (Off=2, On=3) nên BVA không sinh thêm cho biến này.
  > - Đóng góp mới của BVA nằm ở biên thời gian khóa: bổ sung điểm Off (t=29s vẫn khóa) để bắt lỗi khóa hết hạn sớm — rủi ro mà cả TC-010 lẫn TC-011 đều bỏ sót.

- **Đánh giá:** VALID

- **Suy luận:** Lọc đúng — biên nằm ở state machine (đếm sai = 3, khóa = 30s); ca t=29s (vẫn khóa) bắt lỗi khóa hết hạn sớm mà TC-010/011 bỏ sót.

- **Sửa:** Không cần sửa

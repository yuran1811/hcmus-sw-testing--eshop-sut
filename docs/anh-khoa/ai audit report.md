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

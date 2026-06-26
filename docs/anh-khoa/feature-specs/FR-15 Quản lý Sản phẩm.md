# FR-15: Quản lý Sản phẩm (Product CRUD)

- **Module:** `PRODUCT`
- **Requirement ID:** `FR-15`

## Input Fields

| Field                         | Data Type                | Constraints                                                                                  | Notes                                                                                                |
| ------------------------------ | -------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Tên sản phẩm (Product Name)   | String                    | Bắt buộc, không được để trống; tối đa 255 ký tự                                                | -                                                                                                       |
| Giá (Price)                   | Number (₫)                | Bắt buộc; phải là số dương (> 0)                                                                | Giá = 0 hoặc âm là không hợp lệ                                                                        |
| Danh mục (Category)           | Reference (`category_id`) | Bắt buộc; phải chọn từ danh sách danh mục có sẵn trong hệ thống (xem FR-14)                     | Không cho phép gán danh mục không tồn tại                                                              |
| Mô tả (Description)           | String                    | README không nêu ràng buộc bắt buộc/độ dài cụ thể cho FR-15                                     | Trường này xuất hiện ở trang chi tiết sản phẩm (FR-06) và trong header CSV import (FR-16)              |
| Ảnh (Image URL)                | String (URL)               | README không nêu ràng buộc bắt buộc/định dạng cụ thể cho FR-15                                  | Theo FR-05/FR-06/FR-24, ảnh hiển thị trên UI cần có thuộc tính `alt` mô tả (yêu cầu UI, không phải ràng buộc nhập liệu) |

## Business Rules

- Chỉ Admin (JWT hợp lệ và `role = 'admin'`) mới được thực hiện Thêm / Sửa / Xóa sản phẩm — các API `POST/PUT/DELETE /api/products` đều phải kiểm tra điều kiện này (theo FR-12, SEC-03).
- Tên sản phẩm là bắt buộc và không được vượt quá 255 ký tự.
- Giá là bắt buộc và phải là số dương (> 0); giá trị 0 hoặc số âm đều không hợp lệ.
- Danh mục là bắt buộc và phải được chọn từ danh sách danh mục đã tồn tại trong hệ thống.
- Admin có đầy đủ 4 thao tác trên sản phẩm: Thêm (Create), Xem (Read/List), Sửa (Update), Xóa (Delete).
- Khi Sửa (Update) một sản phẩm, chỉ đúng sản phẩm đó bị thay đổi — các sản phẩm khác trong hệ thống phải giữ nguyên, không bị ảnh hưởng.

## Expected Outcomes

- _Success:_
  - Thêm sản phẩm với Tên, Giá, Danh mục hợp lệ → sản phẩm mới được tạo và xuất hiện trong danh sách sản phẩm.
  - Sửa sản phẩm với dữ liệu hợp lệ → chỉ sản phẩm đó được cập nhật; các sản phẩm khác không thay đổi.
  - Xóa sản phẩm → sản phẩm bị loại khỏi danh sách.
  - Xem danh sách / chi tiết sản phẩm → hiển thị đúng dữ liệu hiện có của sản phẩm.
- _Failure:_
  - Tên sản phẩm để trống hoặc vượt quá 255 ký tự → lỗi validate, không lưu sản phẩm.
  - Giá để trống, bằng 0, hoặc là số âm → lỗi "giá phải là số dương", không lưu sản phẩm.
  - Không chọn Danh mục hoặc chọn danh mục không tồn tại → lỗi validate, không lưu sản phẩm.
  - Gọi API Thêm/Sửa/Xóa sản phẩm mà không có token hợp lệ, hoặc token không có `role = 'admin'` → lỗi 401/403, không thực hiện thao tác.

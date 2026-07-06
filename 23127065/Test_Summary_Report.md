# Báo cáo tổng hợp nhóm — Test Design Techniques (EP, BVA, DT, PT, ST, UC)

> Bản tổng hợp toàn bộ kết quả kiểm thử từ 5 thành viên nhóm: Ngô Nguyễn Thế Khoa (23127065), Mạch Quốc Tấn (23127115), Ân Tiến Nguyên An (23127148), Nguyễn Tuấn Anh (23127152), và Nguyễn Lê Hồ Anh Khoa (23127211).

## Thông tin chung

| Trường            | Nội dung                                                                                                                                             |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tên nhóm          | Nhóm 3                                                                                                                                               |
| Bài tập / Feature | EShop SUT — Kiểm thử hệ thống & Thiết kế Test Case (EP, BVA, DT, PT, ST, UC)                                                                         |
| Thành viên        | Ngô Nguyễn Thế Khoa (23127065), Mạch Quốc Tấn (23127115), Ân Tiến Nguyên An (23127148), Nguyễn Tuấn Anh (23127152), Nguyễn Lê Hồ Anh Khoa (23127211) |
| Ngày tổng hợp     | 06/07/2026                                                                                                                                           |

---

## 1. Tổng số Test Case (TCs) nhóm đã tạo

| Kỹ thuật | Tổng TCs nhóm | Ngô Nguyễn Thế Khoa (23127065) | Mạch Quốc Tấn (23127115) | Ân Tiến Nguyên An (23127148) | Nguyễn Tuấn Anh (23127152) | Nguyễn Lê Hồ Anh Khoa (23127211) |
| :------- | :-----------: | :----------------------------: | :----------------------: | :--------------------------: | :------------------------: | :------------------------------: |
| EP       |    **243**    |               66               |            35            |              35              |             54             |                53                |
| BVA      |    **109**    |               17               |            12            |              42              |             34             |                4                 |
| DT       |    **23**     |               0                |            4             |              0               |             12             |                7                 |
| PT       |    **17**     |               0                |            9             |              0               |             0              |                8                 |
| ST       |    **54**     |               8                |            10            |              15              |             10             |                11                |
| UC       |    **28**     |               6                |            7             |              5               |             6              |                4                 |
| **Tổng** |    **474**    |             **97**             |          **77**          |            **97**            |          **116**           |              **87**              |

---

## 2. Coverage của TCs

### 2.1 Theo Feature / Requirement

| Feature / Requirement                                                 |   EP    |   BVA   |   DT   |   PT   |   ST   |   UC   | Tổng TCs |
| :-------------------------------------------------------------------- | :-----: | :-----: | :----: | :----: | :----: | :----: | :------: |
| **FR-01: Đăng ký tài khoản (Register & Mobile Register)**             |   27    |    4    |   12   |   0    |   0    |   0    |  **43**  |
| **FR-02: Đăng nhập & Khóa tài khoản (Login & Auth)**                  |   17    |   12    |   0    |   0    |   10   |   0    |  **39**  |
| **FR-03: Quên / Đặt lại mật khẩu (Forgot/Reset Password)**            |   15    |    9    |   0    |   0    |   10   |   0    |  **34**  |
| **FR-04: Hồ sơ người dùng (User Profile)**                            |    0    |    0    |   0    |   0    |   0    |   7    |  **7**   |
| **FR-05: Xem & Tìm kiếm sản phẩm (PLAS)**                             |    7    |    5    |   0    |   0    |   0    |   0    |  **12**  |
| **FR-06: Chi tiết sản phẩm (Product Detail)**                         |   13    |    2    |   0    |   0    |   0    |   0    |  **15**  |
| **FR-07: Giỏ hàng (Shopping Cart)**                                   |   10    |    0    |   0    |   0    |   0    |   6    |  **16**  |
| **FR-08: Thanh toán (Checkout)**                                      |    4    |    3    |   4    |   9    |   11   |   0    |  **31**  |
| **FR-09 & FR-17: Quản lý & Áp dụng Mã giảm giá (Coupon)**             |   33    |   11    |   7    |   8    |   8    |   6    |  **73**  |
| **FR-10: Quản lý Trạng thái đơn hàng (Order State Machine)**          |   11    |    8    |   0    |   0    |   15   |   0    |  **34**  |
| **FR-11: Lịch sử đơn hàng (Order History)**                           |   13    |   12    |   0    |   0    |   0    |   0    |  **25**  |
| **FR-12 & FR-19: Quản lý người dùng (User Management)**               |    3    |    7    |   0    |   0    |   0    |   0    |  **10**  |
| **FR-13: Tổng quan hệ thống (Admin Dashboard)**                       |    0    |    0    |   0    |   0    |   0    |   4    |  **4**   |
| **FR-14: Quản lý danh mục (Category Management)**                     |   11    |    2    |   0    |   0    |   0    |   0    |  **13**  |
| **FR-15: Quản lý sản phẩm Admin (Product Management)**                |   17    |    1    |   0    |   0    |   0    |   0    |  **18**  |
| **FR-16: Import sản phẩm CSV**                                        |    0    |    0    |   0    |   0    |   0    |   5    |  **5**   |
| **FR-18: Admin Quản lý đơn hàng (Admin Order Mgmt)**                  |   11    |    8    |   0    |   0    |   0    |   0    |  **19**  |
| **FR-20: Các tính năng trên Mobile (Cart, Checkout, Login, History)** |   51    |   23    |   0    |   0    |   0    |   0    |  **74**  |
| **Tổng**                                                              | **243** | **109** | **23** | **17** | **54** | **28** | **474**  |

### 2.2 Theo Test Design Technique

| Kỹ thuật | Số TCs  | Tỷ lệ % trên tổng TCs nhóm |
| :------- | :-----: | :------------------------: |
| EP       |   243   |           51.27%           |
| BVA      |   109   |           23.00%           |
| DT       |   23    |           4.85%            |
| PT       |   17    |           3.59%            |
| ST       |   54    |           11.39%           |
| UC       |   28    |           5.91%            |
| **Tổng** | **474** |          **100%**          |

---

## 3. Status của TCs (Passed / Failed)

| Kỹ thuật      | Tổng TCs | Passed  | Failed  | Blocked / Inconclusive | Tỷ lệ Passed % |
| :------------ | :------: | :-----: | :-----: | :--------------------: | :------------: |
| EP            |   243    |   122   |   119   |           2            |     50.21%     |
| BVA           |   109    |   64    |   43    |           2            |     58.72%     |
| DT            |    23    |    9    |   13    |           1            |     39.13%     |
| PT            |    17    |   12    |    5    |           0            |     70.59%     |
| ST            |    54    |   33    |   20    |           1            |     61.11%     |
| UC            |    28    |   10    |   18    |           0            |     35.71%     |
| **Tổng nhóm** | **474**  | **250** | **218** |         **6**          |   **52.74%**   |

---

## 4. Tổng số Bugs nhóm đã tìm được

| Kỹ thuật                       | Tổng Bugs theo kỹ thuật | Ngô Nguyễn Thế Khoa | Mạch Quốc Tấn | Ân Tiến Nguyên An | Nguyễn Tuấn Anh | Nguyễn Lê Hồ Anh Khoa |
| :----------------------------- | :---------------------: | :-----------------: | :-----------: | :---------------: | :-------------: | :-------------------: |
| EP                             |           87            |         22          |      21       |        13         |        8        |          23           |
| BVA                            |           29            |          3          |       5       |        16         |        4        |           1           |
| DT                             |            7            |          0          |       2       |         0         |        5        |           0           |
| PT                             |            3            |          0          |       3       |         0         |        0        |           0           |
| ST                             |           13            |          2          |       3       |         2         |        3        |           3           |
| UC                             |           15            |          4          |       2       |         4         |        5        |           0           |
| **Tổng (Distinct per member)** |         **132**         |       **28**        |    **29**     |      **28**       |     **21**      |        **26**         |

---

## 5. Coverage của Bugs

### 5.1 Theo Feature / Requirement

| Feature / Requirement                                                 | Số lượng Bugs | Tỷ lệ %  |
| :-------------------------------------------------------------------- | :-----------: | :------: |
| **FR-01: Đăng ký tài khoản (Register & Mobile Register)**             |      20       |  15.63%  |
| **FR-02: Đăng nhập & Khóa tài khoản (Login & Auth)**                  |       7       |  5.47%   |
| **FR-03: Quên / Đặt lại mật khẩu (Forgot/Reset Password)**            |      10       |  7.81%   |
| **FR-04: Hồ sơ người dùng (User Profile)**                            |       2       |  1.56%   |
| **FR-05: Xem & Tìm kiếm sản phẩm (PLAS)**                             |       7       |  5.47%   |
| **FR-06: Chi tiết sản phẩm (Product Detail)**                         |       5       |  3.91%   |
| **FR-07: Giỏ hàng (Shopping Cart)**                                   |      10       |  7.81%   |
| **FR-08: Thanh toán (Checkout)**                                      |       7       |  5.47%   |
| **FR-09 & FR-17: Quản lý & Áp dụng Mã giảm giá (Coupon)**             |      14       |  10.94%  |
| **FR-10: Trạng thái đơn hàng (Order State Machine)**                  |       4       |  3.13%   |
| **FR-11: Lịch sử đơn hàng (Order History)**                           |       6       |  4.69%   |
| **FR-12 & FR-19: Quản lý người dùng (User Management)**               |       3       |  2.34%   |
| **FR-14: Quản lý danh mục (Category Management)**                     |       5       |  3.91%   |
| **FR-15: Quản lý sản phẩm Admin (Product Management)**                |       5       |  3.91%   |
| **FR-16: Import sản phẩm CSV**                                        |       4       |  3.13%   |
| **FR-18: Admin Quản lý đơn hàng (Admin Order Mgmt)**                  |       2       |  1.56%   |
| **FR-20: Các tính năng trên Mobile (Cart, Checkout, Login, History)** |      12       |  9.38%   |
| **TỔNG**                                                              |    **128**    | **100%** |

### 5.2 Theo Severity

| Severity               | Số lượng Bugs | Tỷ lệ %  |
| :--------------------- | :-----------: | :------: |
| **Blocker / Critical** |      18       |  14.06%  |
| **High / Major**       |      62       |  48.44%  |
| **Medium**             |      32       |  25.00%  |
| **Low / Minor**        |      16       |  12.50%  |
| **TỔNG**               |    **128**    | **100%** |

---

## 6. Nhận xét / Kết luận

- **Kỹ thuật tạo nhiều TCs nhất**: **Equivalence Partitioning (EP)** với **243 TCs** (chiếm 51.27% tổng số ca kiểm thử của nhóm).
- **Kỹ thuật tìm nhiều Bugs nhất**: **Equivalence Partitioning (EP)** (87 lượt phát hiện bug), tiếp theo là **Boundary Value Analysis (BVA)** (29 lượt phát hiện bug tại các ngưỡng biên).
- **Feature có tỷ lệ Failed cao nhất**:
  - **FR-05 Xem & Tìm kiếm sản phẩm**: 100% ca kiểm thử thất bại (do lỗi hiển thị, vỡ giao diện 256 ký tự và thiếu empty state).
  - **FR-01 Đăng ký tài khoản**: Tỷ lệ thất bại > 75% (do thiếu validation mật khẩu/email và thiếu trường xác nhận mật khẩu).
  - **FR-08 Thanh toán**: Tỷ lệ thất bại ~70% (giỏ hàng không tự xóa sau thanh toán, chấp nhận tổng tiền từ client).
- **Đề xuất cải thiện**:
  1. **Bổ sung Server-side Validation**: Bắt buộc kiểm tra độ dài, định dạng email/mật khẩu/SĐT và tính lại tổng tiền tại Backend thay vì chỉ tin tưởng dữ liệu từ Client gửi lên.
  2. **Vá các lỗ hổng bảo mật nghiêm trọng**: Xử lý lỗi Privilege Escalation (FR-04), IDOR (FR-11, FR-18), Stored XSS (FR-18), và thiết lập ràng buộc Khóa ngoại (Foreign Key Constraints) trong cơ sở dữ liệu khi xóa danh mục/người dùng (FR-14, FR-19).
  3. **Đồng bộ hóa Logic Nghiệp vụ & Trạng thái**: Sửa công thức tính giảm giá coupon (FR-09), bộ đếm sai tài khoản (FR-02, FR-20), và tự động làm rỗng giỏ hàng sau khi đặt hàng thành công (FR-08).

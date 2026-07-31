# Test Summary Report

This report summarizes the GUI test execution results for HW03 (GUI Usability & Checklist Testing on EShop SUT).

---

## 📊 Summary Information

| Metric                                | Value                                  | Metric             | Value                                                                  |
| :------------------------------------ | :------------------------------------- | :----------------- | :--------------------------------------------------------------------- |
| **Project Name**                      | EShop SUT - HW03 GUI Usability Testing | **Reviewer**       | Dr. Lam Quang Vu / Dr. Tran Duy Hoang / MSc. Tran Thi Bich Hanh / MSc. |
| Truong Phuoc Loc / MSc. Ho Tuan Thanh |
| **Creator**                           | Nguyen An / 23127148                   | **Approver**       | TAs                                                                    |
| **Date**                              | 2026/07/30                             | **Test Coverage**  | 100%                                                                   |
| **Successful Test Coverage**          | 57.8%                                  | **Execution Mode** | Playwright Chromium (Headed)                                           |

---

## 📋 Detailed Execution Results

| No  |              Requirement ID              | Requirement name                         | Tested | Passed | Failed | Blocked | Skipped | Not Yet Tested | Total  | Tested Coverage |
| :-: | :--------------------------------------: | :--------------------------------------- | :----: | :----: | :----: | :-----: | :-----: | :------------: | :----: | :-------------: |
|  1  |    FR-03, FR-21, FR-22, FR-23, FR-24     | Quên Mật Khẩu (`/forgot-password`)       |   27   |   16   |   11   |    0    |    0    |       0        |   27   |      100%       |
|  2  | FR-10, FR-18, FR-21, FR-22, FR-23, FR-24 | Quản lý Đơn hàng Admin (`/admin/orders`) |   18   |   10   |   8    |    0    |    0    |       0        |   18   |      100%       |
|     |                **Total**                 |                                          | **45** | **26** | **19** |  **0**  |  **0**  |     **0**      | **45** |    **100%**     |

---

## 🔍 Interface Analysis (IA) Breakdown

| Nhóm Tiêu Chí IA           | Mô tả                                                                            | Tổng số | Đạt (Pass) | Không đạt (Fail) | Tỷ lệ Đạt (%) |
| :------------------------- | :------------------------------------------------------------------------------- | :-----: | :--------: | :--------------: | :-----------: |
| **IA-01 General UI**       | Tiêu chuẩn giao diện chung (HTML tags, định dạng tiền tệ, ngôn ngữ, layout)      |   12    |     8      |        4         |     66.7%     |
| **IA-02 Forms**            | Tiêu chuẩn biểu mẫu (Type attribute, nhãn bắt buộc, regex, error placement)      |   12    |     2      |        10        |     16.7%     |
| **IA-03 Navigation**       | Điều hướng & liên kết (Highlight tab, back button, logo link, URL routing)       |    9    |     8      |        1         |     88.9%     |
| **IA-04 Feedback & State** | Phản hồi & Trạng thái (OTP display, loading spinner, empty state, state machine) |   12    |     8      |        4         |     66.7%     |
| **TỔNG CỘNG**              |                                                                                  | **45**  |   **26**   |      **19**      |   **57.8%**   |

---

## 🐞 Defect Summary Table

Toàn bộ 19 mục kiểm tra thất bại được phân nhóm thành **12 Báo cáo lỗi chi tiết (Bug Reports)**:

| Bug ID           | Màn hình      | Tên lỗi (Short Description)                                                             | Mức độ Severity | Độ ưu tiên Priority | Test Case ID                                                     | Evidence Link                                                 |
| :--------------- | :------------ | :-------------------------------------------------------------------------------------- | :-------------: | :-----------------: | :--------------------------------------------------------------- | :------------------------------------------------------------ |
| `BUG-ORDERS-001` | Admin Orders  | Lỗ hổng Stored XSS trong địa chỉ giao hàng dùng `dangerouslySetInnerHTML`               |  **Critical**   |       **P0**        | `GUI-ORDERS-IA01-05`                                             | [GUI-ORDERS-IA01-05.png](../Evidences/GUI-ORDERS-IA01-05.png) |
| `BUG-ORDERS-002` | Admin Orders  | Đơn hàng Đã hủy vẫn hiển thị nút "Đánh dấu Đã giao" vi phạm State Machine               |  **Critical**   |       **P0**        | `GUI-ORDERS-IA02-02`, `GUI-ORDERS-IA04-04`                       | [GUI-ORDERS-IA04-04.png](../Evidences/GUI-ORDERS-IA04-04.png) |
| `BUG-FORGOT-003` | Quên Mật Khẩu | Bước 2 thiếu ô nhập "Xác nhận mật khẩu mới" và thiếu chỉ báo tiến trình                 |    **Major**    |       **P1**        | `GUI-FORGOT-IA02-04`, `GUI-FORGOT-IA02-05`, `GUI-FORGOT-IA02-08` | [GUI-FORGOT-IA02-05.png](../Evidences/GUI-FORGOT-IA02-05.png) |
| `BUG-FORGOT-005` | Quên Mật Khẩu | Regex xác thực mật khẩu bị lỗi logic (yêu cầu khoảng trắng `\s` thay vì ký tự đặc biệt) |  **Critical**   |       **P1**        | `GUI-FORGOT-IA02-10`                                             | [GUI-FORGOT-IA02-10.png](../Evidences/GUI-FORGOT-IA02-10.png) |
| `BUG-ORDERS-005` | Admin Orders  | Thay đổi trạng thái đơn hàng thực thi ngay thiếu modal xác nhận và dùng `alert()`       |    **Major**    |       **P1**        | `GUI-ORDERS-IA04-05`, `GUI-ORDERS-IA04-07`                       | [GUI-ORDERS-IA04-05.png](../Evidences/GUI-ORDERS-IA04-05.png) |
| `BUG-FORGOT-007` | Quên Mật Khẩu | Thông báo lỗi xác thực và submit phụ thuộc native `window.alert()`                      |    **Major**    |       **P2**        | `GUI-FORGOT-IA02-07`, `GUI-FORGOT-IA04-04`                       | [GUI-FORGOT-IA04-04.png](../Evidences/GUI-FORGOT-IA04-04.png) |
| `BUG-FORGOT-001` | Quên Mật Khẩu | Thiếu thẻ tiêu đề `<h1>` chuẩn SEO và trợ năng trên trang Quên Mật Khẩu                 |    **Minor**    |       **P2**        | `GUI-FORGOT-IA01-01`                                             | [GUI-FORGOT-IA01-01.png](../Evidences/GUI-FORGOT-IA01-01.png) |
| `BUG-FORGOT-002` | Quên Mật Khẩu | Ô nhập email dùng `type="text"` và thiếu dấu sao `*` cho trường bắt buộc                |    **Minor**    |       **P2**        | `GUI-FORGOT-IA02-01`, `GUI-FORGOT-IA02-02`                       | [GUI-FORGOT-IA02-01.png](../Evidences/GUI-FORGOT-IA02-01.png) |
| `BUG-ORDERS-003` | Admin Orders  | Làm mới trang reset tab về Dashboard do không lưu trạng thái trên URL                   |    **Minor**    |       **P2**        | `GUI-ORDERS-IA03-04`                                             | [GUI-ORDERS-IA03-04.png](../Evidences/GUI-ORDERS-IA03-04.png) |
| `BUG-ORDERS-004` | Admin Orders  | Thiếu Loading Spinner khi gọi API bất đồng bộ và thiếu Empty State                      |    **Minor**    |       **P2**        | `GUI-ORDERS-IA04-01`, `GUI-ORDERS-IA04-02`                       | [GUI-ORDERS-IA04-01.png](../Evidences/GUI-ORDERS-IA04-01.png) |
| `BUG-FORGOT-004` | Quên Mật Khẩu | Nhãn OTP ở Bước 2 ghi sai số chữ số ("Mã OTP (4 số)" thay vì "6 số")                    |    **Minor**    |       **P3**        | `GUI-FORGOT-IA02-06`                                             | [GUI-FORGOT-IA02-06.png](../Evidences/GUI-FORGOT-IA02-06.png) |
| `BUG-FORGOT-006` | Quên Mật Khẩu | Thẻ `<label>` thiếu thuộc tính `htmlFor` liên kết tới ô nhập input                      |   **Trivial**   |       **P3**        | `GUI-FORGOT-IA02-09`                                             | [GUI-FORGOT-IA02-09.png](../Evidences/GUI-FORGOT-IA02-09.png) |

---

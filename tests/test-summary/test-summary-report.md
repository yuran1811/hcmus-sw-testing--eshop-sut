# Test Summary Report — W05 EShop SUT Testing

## 1. Thông tin chung

- **Họ và tên:** Mạch Quốc Tấn
- **Mã số sinh viên:** 23127115
- **Môn học:** Kiểm thử phần mềm (Software Testing)
- **Hệ thống kiểm thử (SUT):** EShop (https://github.com/ttbhanh/eshop-sut)

## 2. Tổng quan kết quả thực thi (Execution Summary)

| Chỉ số                          | Số lượng | Tỷ lệ |
| :------------------------------ | :------- | :---- |
| **Tổng số Test Cases thiết kế** | 17       | 100%  |
| **Tổng số Test Cases đã chạy**  | 17       | 100%  |
| **Số lượng Pass**               | 6        | 35.3% |
| **Số lượng Fail**               | 10       | 58.8% |
| **Số lượng Blocked**            | 1        | 5.9%  |

## 3. Thống kê theo tính năng (Feature-wise Summary)

| Tính năng                      | Yêu cầu | Kỹ thuật kiểm thử        | Tổng TC | Pass | Fail | Blocked | Tỷ lệ Pass |
| :----------------------------- | :------ | :----------------------- | :------ | :--- | :--- | :------ | :--------- |
| **Đăng nhập & Khóa tài khoản** | FR-02   | State Transition Testing | 10      | 3    | 6    | 1       | 30.0%      |
| **Quản lý hồ sơ cá nhân**      | FR-04   | Use Case Testing         | 7       | 3    | 4    | 0       | 42.9%      |

## 4. Thống kê Bugs phát hiện (Bug Summary)

| Bug ID                                                       | Phân hệ | Mức độ nghiêm trọng | Tóm tắt lỗi                                                                   | Status |
| :----------------------------------------------------------- | :------ | :------------------ | :---------------------------------------------------------------------------- | :----- |
| [BUG-AUTH-001](../bug-reports/auth/BUG-AUTH-001.md)          | auth    | Major               | Bộ đếm sai bị tăng 2 đơn vị thay vì 1 đơn vị mỗi lần nhập sai                 | Open   |
| [BUG-AUTH-002](../bug-reports/auth/BUG-AUTH-002.md)          | auth    | Major               | Thời gian tạm khóa tài khoản là 180 giây (3 phút) thay vì 30 giây             | Open   |
| [BUG-AUTH-003](../bug-reports/auth/BUG-AUTH-003.md)          | auth    | Major               | Tài khoản bị khóa sớm ngay từ lần đăng nhập sai thứ 2                         | Open   |
| [BUG-PROFILE-001](../bug-reports/profile/BUG-PROFILE-001.md) | profile | Critical            | Lỗ hổng Privilege Escalation cho phép user tự nâng quyền `role` thành `admin` | Open   |
| [BUG-PROFILE-002](../bug-reports/profile/BUG-PROFILE-002.md) | profile | Major               | Thiếu server-side validation cho định dạng và độ dài số điện thoại            | Open   |

## 5. Danh sách tài liệu liên quan

- **[Ma trận truy vết (Traceability Matrix)](./traceability-matrix.md)**
- **Báo cáo kết quả kiểm thử (Test Runs):**
  - [AUTH Test Run](../test-runs/AUTH-test-run.md)
  - [PROFILE Test Run](../test-runs/PROFILE-test-run.md)
- **Báo cáo thiết kế kỹ thuật (Test Design Reports):**
  - [State Transition Testing Report](../test-design/State_Transition_Testing.md)
  - [Use Case Testing Report](../test-design/Use_Case_Testing.md)
- **Báo cáo lỗi (Bug Reports):**
  - [Thư mục Bug Reports Authentication](../bug-reports/auth/)
  - [Thư mục Bug Reports Profile](../bug-reports/profile/)

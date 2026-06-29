# HW02 – Domain Testing on EShop

**Mã số sinh viên:** 23127211.  
**Họ và tên:** Nguyễn Lê Hồ Anh Khoa.  
**Mã bài tập:** HW02-AI.  
**Ngày nộp:** 29/06/2026.

---

## Tổng hợp Bug

**Tổng quan:** 4 feature (Pool A/B/C/D) · 58 test case thiết kế · 58/58 đã thực thi · 23 bug tìm được.

### Chi tiết theo Module

| Pool | Feature (Module)                             | TC Designed | TC Executed | Passed | Failed | Not yet executed | Bugs Found |
| :--: | :------------------------------------------- | :---------: | :---------: | :----: | :----: | :--------------: | :--------: |
|  A   | FR-01 — Đăng ký tài khoản (Register)         |     17      |     17      |   3    |   14   |        0         |     10     |
|  B   | FR-07 — Giỏ hàng (Cart)                      |     10      |     10      |   3    |   7    |        0         |     5      |
|  C   | FR-15 — Quản lý Sản phẩm (Product)           |     18      |     18      |   8    |   10   |        0         |     5      |
|  D   | FR-20 — Đăng nhập trên Mobile (Mobile Login) |     13      |     13      |   5    |   8    |        0         |     3      |
|  —   | **Tổng cộng**                                |   **58**    |   **58**    | **19** | **39** |      **0**       |   **23**   |

### Bug theo mức độ nghiêm trọng (Severity)

| Severity  | Register | Cart  | Product | Mobile | Total  |
| :-------- | :------: | :---: | :-----: | :----: | :----: |
| Blocker   |    0     |   0   |    1    |   0    |   1    |
| Critical  |    2     |   1   |    2    |   1    |   6    |
| Major     |    2     |   2   |    2    |   2    |   8    |
| Minor     |    6     |   2   |    0    |   0    |   8    |
| **Total** |  **10**  | **5** |  **5**  | **3**  | **23** |

_Chi tiết từng test case và bug — xem `./test-cases/`, `./bug-reports/`, và phân tích đầy đủ trong `main-report.pdf`._

---

## Bảng tự đánh giá điểm

| Số Thứ Tự. | Tiêu chí                               | Điểm tối đa | Điểm tự đánh giá |
| :--------: | :------------------------------------- | :---------: | :--------------: |
|     1      | Tính năng FR-01: Đăng ký tài khoản     |     25      |        25        |
|     2      | Tính năng FR-07: Giỏ hàng              |     25      |        25        |
|     3      | Tính năng FR-15: Quản lý Sản phẩm      |     25      |        25        |
|     4      | Tính năng FR-20: Đăng nhập trên Mobile |     15      |        15        |
|     5      | Agent Skills                           |     10      |        10        |
|            | **Tổng cộng**                          |   **100**   |     **100**      |

---

## Demo Agent Skill

Các Agent Skill được thiết kế để tự động hóa quy trình phân tích yêu cầu, sinh test case, thực thi Playwright và báo cáo lỗi.
Video tổng quan về bộ Agents Skills: [URL](https://youtu.be/q3ha0ljcGwI)
Video chạy demo với FR-05: [URL](https://youtu.be/KKeDyzNQCtk)

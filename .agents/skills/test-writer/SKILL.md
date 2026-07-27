---
name: test-writer
description: Design GUI checklists and functional test case files for EShop SUT based on FR specifications, UI standards (IA-01..04), and boundary/equivalence partitioning techniques.
---

# Test Writer Skill

Skill này dùng để thiết kế **GUI Checklist** và **Test Case chức năng (Markdown)** cho ứng dụng EShop SUT từ yêu cầu đặc tả (Requirement Specs / `README.md`).

## 1. Hướng dẫn Tạo GUI Checklist (Task 1)

Khi được yêu cầu tạo GUI Checklist cho một màn hình hoặc phân hệ:
1. Đọc kĩ đặc tả yêu cầu trong `README.md` tương ứng với mã FR (ví dụ: `FR-07` Giỏ hàng, `FR-17` Coupon Admin).
2. Phân loại checklist thành 4 khía cạnh giao diện (Interface Aspects - IA):
   - **IA-01:** General UI standards (Tiêu chuẩn UI chung: thẻ `<h1>`, ngôn ngữ tiếng Việt, định dạng tiền `₫`, màu sắc nút hành động).
   - **IA-02:** Forms (Tiêu chuẩn form: trường bắt buộc `*`, kiểu input `email`/`password`/`number`, thông báo lỗi phía TRÊN nút submit).
   - **IA-03:** Navigation (Điều hướng: highlight tab/navbar, breadcrumb, badge giỏ hàng, tab order).
   - **IA-04:** Feedback & State (Phản hồi & Trạng thái: toast/badge khi thêm giỏ, confirmation dialog khi xóa, empty state minh họa).
3. Đưa vào các hạng mục kiểm tra mà AI thường bỏ sót:
   - Ràng buộc biên (BVA): Số phần trăm > 100%, số âm, số 0.
   - Chọn ngày quá hạn trong quá khứ (`expired_at`).
   - Kiểm tra an toàn XSS (`<script>alert(1)</script>`).
   - Quyền truy cập Admin (Access Control - JWT role `admin`).
4. Định dạng đầu ra: Bảng Markdown có đủ các cột: `ID | Pri | Hạng mục / Cách kiểm tra | Kết quả mong đợi | Status | Bug/ghi chú`.

---

## 2. Hướng dẫn Tạo Functional Test Cases

Khi tạo các file test case riêng lẻ (ví dụ: `TC-CART-001.md`, `TC-COUPON-001.md`):
1. Đặt file trong thư mục `tests/test-cases/<module>/`.
2. Áp dụng cấu trúc chuẩn:
   - Header: `# TC-<MODULE>-<XXX>: <Tên ngắn gọn>`
   - `## Requirement ID`: Mã FR liên quan
   - `## Module / Test type / Technique`: Phân hệ / Loại test / Kỹ thuật thiết kế (Equivalence Partitioning, Boundary Value Analysis, Error Guessing)
   - `## Preconditions`: Điều kiện tiên quyết
   - `## Test data`: Bảng dữ liệu đầu vào
   - `## Test steps`: Đánh số các bước chi tiết
   - `## Expected result`: Kết quả mong đợi gạch đầu dòng
   - `## Status / Related bugs`: Trạng thái ban đầu `Not Run / None`

---

## 3. Tham chiếu Quy chuẩn Context7 & Best Practices

- Ưu tiên sử dụng **locators hướng người dùng** (Role, Label, Text, Accessible Name) theo tài liệu Playwright: [Playwright Locators](https://playwright.dev/docs/locators).
- Đảm bảo kiểm tra tính nhất quán ngôn ngữ tiếng Việt và nhãn tiền tệ `₫` phân cách hàng nghìn.

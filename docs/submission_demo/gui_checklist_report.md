# Báo cáo GUI Checklist – HW03

**MSSV:** 23127115
**Màn hình/luồng được kiểm thử:** <tên màn hình, ví dụ: "Trang Thanh toán (Checkout)">
**Ngày thực hiện:** <dd/mm/yyyy>

## 1. Phạm vi kiểm thử

- Màn hình chính: <...>
- Chức năng liên quan (FR): <FR-0X>
- Lý do chọn màn hình này: <...>

## 2. Quá trình xây dựng checklist với AI (tóm tắt)

> Chi tiết đầy đủ từng prompt nằm trong `ai_audit_and_critique.md`. Phần này chỉ tóm tắt cách tiếp cận.

- Bước 1: Sinh checklist IA-01 (Chuẩn UI chung) – AI đề xuất X mục.
- Bước 2: Sinh checklist IA-02 (Forms) – AI đề xuất X mục.
- Bước 3: Sinh checklist IA-03 (Navigation) – AI đề xuất X mục.
- Bước 4: Sinh checklist IA-04 (Feedback/State) – AI đề xuất X mục.
- Bước 5: Gộp, loại trùng lặp → còn lại **N mục**.

## 3. Các mục AI bỏ sót (bắt buộc — tự phân tích)

| #   | Khía cạnh bị bỏ sót                       | Lý do bỏ sót (do prompt / do giới hạn model / do đặc thù giao diện) | Mục đã bổ sung                |
| --- | ----------------------------------------- | ------------------------------------------------------------------- | ----------------------------- |
| 1   | Accessibility (vd: alt-text, focus order) | <...>                                                               | <mã mục trong checklist.xlsx> |
| 2   | Dark mode                                 | <...>                                                               | <...>                         |
| 3   | <...>                                     | <...>                                                               | <...>                         |

## 4. Kết quả thực thi checklist (tóm tắt)

> Bảng đầy đủ nằm trong `checklist_and_test_summary.xlsx`, sheet "Checklist".

- Tổng số mục: <N> (yêu cầu >40)
- Passed: <N>
- Failed: <N>
- Tỉ lệ pass: <%>

## 5. Danh sách lỗi phát hiện (liên kết GitHub Issues)

| Bug ID  | Mục checklist # | Mô tả ngắn | Mức độ | GitHub Issue                                        | Ảnh chụp                  |
| ------- | --------------- | ---------- | ------ | --------------------------------------------------- | ------------------------- |
| BUG-001 | #12 (IA-02)     | <...>      | Major  | [#3](https://github.com/ttbhanh/eshop-sut/issues/3) | `screenshots/BUG-001.png` |
| BUG-002 | #27 (IA-04)     | <...>      | Minor  | [#4](...)                                           | `screenshots/BUG-002.png` |

> Chi tiết đầy đủ từng bug (repro steps, expected/actual) nằm trong `bug_reports.md`.

## 6. Nhận xét tổng quan

<Nhận xét ngắn về chất lượng UI của màn hình/luồng đã test, xu hướng lỗi, khía cạnh yếu nhất.>

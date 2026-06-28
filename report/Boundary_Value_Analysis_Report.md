# Boundary Value Analysis Report — HW02

## Feature: Xem danh sách & Tìm kiếm sản phẩm (FR-05)

### BVA Step 1: Identify Boundary Points — Xem danh sách & Tìm kiếm sản phẩm

| #   | Variable                | Boundary Description    | Boundary Value (B) | Valid Side                           | Invalid Side                        |
| --- | ----------------------- | ----------------------- | -----------------: | ------------------------------------ | ----------------------------------- |
| 1   | Độ dài từ khóa tìm kiếm | Minimum length boundary |                  0 | B (0 ký tự) = valid                  | B-1 (không khả thi / null)          |
| 2   | Độ dài từ khóa tìm kiếm | Maximum length boundary |                255 | B (255 ký tự) = valid                | B+1 (256 ký tự) = invalid/truncated |
| 3   | Số sản phẩm trong CSDL  | Minimum count boundary  |                  0 | B (0 sản phẩm) = valid (empty state) | B-1 (không khả thi)                 |

---

### BVA Step 2: 3-Point BVA Scenarios — Xem danh sách & Tìm kiếm sản phẩm

Nominal values for other variables: `Product Count` = 3, `search` = `"MacBook Pro M3"`.

| #   | Boundary                  | Test Point | Variable Tested | Test Value         | Other Variables | Expected Result                             |
| --- | ------------------------- | ---------- | --------------- | ------------------ | --------------- | ------------------------------------------- |
| 1   | Độ dài tìm kiếm Min = 0   | B-1        | search          | N/A (Null/Omitted) | Count = 3       | Accept (Hiển thị tất cả 3 sản phẩm)         |
| 2   | Độ dài tìm kiếm Min = 0   | B          | search          | `""` (0 ký tự)     | Count = 3       | Accept (Hiển thị tất cả 3 sản phẩm)         |
| 3   | Độ dài tìm kiếm Min = 0   | B+1        | search          | `"M"` (1 ký tự)    | Count = 3       | Accept (Hiển thị các sản phẩm khớp chữ "m") |
| 4   | Độ dài tìm kiếm Max = 255 | B-1        | search          | `"A" * 254`        | Count = 3       | Accept (Hiển thị empty state)               |
| 5   | Độ dài tìm kiếm Max = 255 | B          | search          | `"A" * 255`        | Count = 3       | Accept (Hiển thị empty state)               |
| 6   | Độ dài tìm kiếm Max = 255 | B+1        | search          | `"A" * 256`        | Count = 3       | Giới hạn hoặc cắt về 255 ký tự / Báo lỗi    |
| 7   | Số sản phẩm DB Min = 0    | B-1        | Product Count   | N/A (Không âm)     | search = `""`   | N/A                                         |
| 8   | Số sản phẩm DB Min = 0    | B          | Product Count   | 0                  | search = `""`   | Accept (Hiển thị empty state)               |
| 9   | Số sản phẩm DB Min = 0    | B+1        | Product Count   | 1                  | search = `""`   | Accept (Hiển thị đúng 1 sản phẩm)           |

---

### BVA Step 3: 2-Point BVA Scenarios — Xem danh sách & Tìm kiếm sản phẩm

Nominal values for other variables: `Product Count` = 3, `search` = `"MacBook Pro M3"`.

| #   | Boundary                  | Test Point | Variable Tested | Test Value         | Other Variables | Expected Result                     |
| --- | ------------------------- | ---------- | --------------- | ------------------ | --------------- | ----------------------------------- |
| 1   | Độ dài tìm kiếm Min = 0   | B (valid)  | search          | `""` (0 ký tự)     | Count = 3       | Accept (Hiển thị tất cả 3 sản phẩm) |
| 2   | Độ dài tìm kiếm Min = 0   | B-1 (invalid)| search          | N/A (Null/Omitted) | Count = 3       | Accept (Hiển thị tất cả 3 sản phẩm) |
| 3   | Độ dài tìm kiếm Max = 255 | B (valid)  | search          | `"A" * 255`        | Count = 3       | Accept (Hiển thị empty state)       |
| 4   | Độ dài tìm kiếm Max = 255 | B+1 (invalid)| search          | `"A" * 256`        | Count = 3       | Giới hạn hoặc báo lỗi               |
| 5   | Số sản phẩm DB Min = 0    | B (valid)  | Product Count   | 0                  | search = `""`   | Accept (Hiển thị empty state)       |
| 6   | Số sản phẩm DB Min = 0    | B-1 (invalid)| Product Count   | N/A                | search = `""`   | N/A                                 |

---

### BVA Step 4: Consolidate BVA Test Cases — Xem danh sách & Tìm kiếm sản phẩm

#### Overlap Between 3-Point and 2-Point

| 3-Point Scenario #     | 2-Point Scenario #          | Variable      | Test Value    | Overlap Reason                                                     |
| ---------------------- | --------------------------- | ------------- | ------------- | ------------------------------------------------------------------ |
| #2 (B at min length)   | #1 (B valid min length)     | search        | `""`          | Trùng giá trị thử nghiệm và cùng mong đợi hiển thị tất cả sản phẩm |
| #1 (B-1 at min length) | #2 (B-1 invalid min length) | search        | N/A (Omitted) | Cùng mong đợi hiển thị tất cả sản phẩm                             |
| #5 (B at max length)   | #3 (B valid max length)     | search        | `"A" * 255`   | Trùng giá trị thử nghiệm và kết quả (Empty State)                  |
| #6 (B+1 at max length) | #4 (B+1 invalid max length) | search        | `"A" * 256`   | Trùng giá trị thử nghiệm và cách hệ thống xử lý giới hạn           |
| #8 (B at min DB count) | #5 (B valid min DB count)   | Product Count | 0             | Trùng điều kiện số lượng sản phẩm trong DB bằng 0                  |

#### Overlap with Domain Testing TCs

| BVA Scenario #          | DT Test Case                                                                                                                                      | Variable | Test Value    | Overlap Reason                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- | ---------------------------------------------------------------- |
| 3-Point #2 / 2-Point #1 | [TC-PLAS-001](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-001.md) | search   | `""`          | Trùng dữ liệu kiểm thử xem tất cả sản phẩm                       |
| 3-Point #1 / 2-Point #2 | [TC-PLAS-001](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-001.md) | search   | N/A (Omitted) | Bản chất giống với truyền query trống hoặc bỏ qua tham số search |

Các kịch bản BVA còn lại không trùng lắp sẽ được chuyển thành các Test Case BVA mới.

#### Final BVA Test Case Summary

| #   | TC ID                                                                                                                                                     | Description                                                      | Technique(s)      | Boundary            | Expected                                      |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------- | ------------------- | --------------------------------------------- |
| 1   | [TC-PLAS-BVA-001](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-BVA-001.md) | Tìm kiếm với từ khóa có độ dài tối thiểu + 1 (1 ký tự)           | 3-Point           | Min length, B + 1   | Hiển thị sản phẩm chứa chữ khớp ("MacBook Pro M3")  |
| 2   | [TC-PLAS-BVA-002](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-BVA-002.md) | Tìm kiếm với từ khóa có độ dài tối đa cho phép (255 ký tự)       | 3-Point + 2-Point | Max length, B       | Không crash, hiển thị empty state             |
| 3   | [TC-PLAS-BVA-003](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-BVA-003.md) | Tìm kiếm với từ khóa vượt quá độ dài tối đa cho phép (256 ký tự) | 3-Point + 2-Point | Max length, B + 1   | Không crash, tự động cắt chuỗi hoặc chặn nhập |
| 4   | [TC-PLAS-BVA-004](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-BVA-004.md) | Kiểm tra hiển thị khi cơ sở dữ liệu trống (0 sản phẩm)           | 3-Point + 2-Point | Min DB count, B     | Hiển thị thông báo empty state                |
| 5   | [TC-PLAS-BVA-005](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-BVA-005.md) | Kiểm tra hiển thị khi cơ sở dữ liệu có đúng 1 sản phẩm           | 3-Point           | Min DB count, B + 1 | Hiển thị lưới chứa đúng 1 thẻ sản phẩm        |

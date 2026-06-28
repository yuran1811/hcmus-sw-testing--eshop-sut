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

| #   | Boundary                  | Test Point    | Variable Tested | Test Value         | Other Variables | Expected Result                     |
| --- | ------------------------- | ------------- | --------------- | ------------------ | --------------- | ----------------------------------- |
| 1   | Độ dài tìm kiếm Min = 0   | B (valid)     | search          | `""` (0 ký tự)     | Count = 3       | Accept (Hiển thị tất cả 3 sản phẩm) |
| 2   | Độ dài tìm kiếm Min = 0   | B-1 (invalid) | search          | N/A (Null/Omitted) | Count = 3       | Accept (Hiển thị tất cả 3 sản phẩm) |
| 3   | Độ dài tìm kiếm Max = 255 | B (valid)     | search          | `"A" * 255`        | Count = 3       | Accept (Hiển thị empty state)       |
| 4   | Độ dài tìm kiếm Max = 255 | B+1 (invalid) | search          | `"A" * 256`        | Count = 3       | Giới hạn hoặc báo lỗi               |
| 5   | Số sản phẩm DB Min = 0    | B (valid)     | Product Count   | 0                  | search = `""`   | Accept (Hiển thị empty state)       |
| 6   | Số sản phẩm DB Min = 0    | B-1 (invalid) | Product Count   | N/A                | search = `""`   | N/A                                 |

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

| #   | TC ID                                                                                                                                                     | Description                                                      | Technique(s)      | Boundary            | Expected                                           |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------- | ------------------- | -------------------------------------------------- |
| 1   | [TC-PLAS-BVA-001](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-BVA-001.md) | Tìm kiếm với từ khóa có độ dài tối thiểu + 1 (1 ký tự)           | 3-Point           | Min length, B + 1   | Hiển thị sản phẩm chứa chữ khớp ("MacBook Pro M3") |
| 2   | [TC-PLAS-BVA-002](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-BVA-002.md) | Tìm kiếm với từ khóa có độ dài tối đa cho phép (255 ký tự)       | 3-Point + 2-Point | Max length, B       | Không crash, hiển thị empty state                  |
| 3   | [TC-PLAS-BVA-003](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-BVA-003.md) | Tìm kiếm với từ khóa vượt quá độ dài tối đa cho phép (256 ký tự) | 3-Point + 2-Point | Max length, B + 1   | Không crash, tự động cắt chuỗi hoặc chặn nhập      |
| 4   | [TC-PLAS-BVA-004](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-BVA-004.md) | Kiểm tra hiển thị khi cơ sở dữ liệu trống (0 sản phẩm)           | 3-Point + 2-Point | Min DB count, B     | Hiển thị thông báo empty state                     |
| 5   | [TC-PLAS-BVA-005](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-BVA-005.md) | Kiểm tra hiển thị khi cơ sở dữ liệu có đúng 1 sản phẩm           | 3-Point           | Min DB count, B + 1 | Hiển thị lưới chứa đúng 1 thẻ sản phẩm             |

---

## Feature: Thanh toán (FR-08)

### BVA Step 1: Identify Boundary Points — Thanh toán

| #   | Variable                   | Boundary Description          | Boundary Value (B) | Valid Side             | Invalid Side                       |
| --- | -------------------------- | ----------------------------- | -----------------: | ---------------------- | ---------------------------------- |
| 1   | Số sản phẩm trong giỏ hàng | Số lượng sản phẩm tối thiểu   |                  1 | B (1 sản phẩm) = valid | B-1 (0 sản phẩm) = invalid         |
| 2   | Lệch dưới `total_amount`   | Lệch dưới so với giá trị thực |              $T_s$ | B ($T_s$) = valid      | B-1 ($T_s - 1$) = invalid mismatch |
| 3   | Lệch trên `total_amount`   | Lệch trên so với giá trị thực |              $T_s$ | B ($T_s$) = valid      | B+1 ($T_s + 1$) = invalid mismatch |
| 4   | Độ dài `shipping_address`  | Số ký tự tối thiểu            |                  1 | B (1 ký tự) = valid    | B-1 (0 ký tự/rỗng) = invalid       |

---

### BVA Step 2: 3-Point BVA Scenarios — Thanh toán

Nominal values for other variables: `Authorization` = Valid Token, `Cart State` = 1 AirPods Pro 2 + 1 Keychron Q1 (Server Total = 10.000.000 ₫), `total_amount` = `10000000`, `shipping_address` = `"123 Le Loi, TP.HCM"`.

| #   | Boundary               | Test Point | Variable Tested  | Test Value       | Other Variables         | Expected Result          |
| --- | ---------------------- | ---------- | ---------------- | ---------------- | ----------------------- | ------------------------ |
| 1   | Số sản phẩm Min = 1    | B-1        | Cart Item count  | 0                | total_amount = 0        | Reject (400 Bad Request) |
| 2   | Số sản phẩm Min = 1    | B          | Cart Item count  | 1 (giá 4M)       | total_amount = 4000000  | Accept (200 OK)          |
| 3   | Số sản phẩm Min = 1    | B+1        | Cart Item count  | 2 (giá 10M)      | total_amount = 10000000 | Accept (200 OK)          |
| 4   | Lệch dưới total_amount | B-1        | total_amount     | 9999999          | Cart Total = 10000000   | Reject (400 Bad Request) |
| 5   | Lệch dưới total_amount | B          | total_amount     | 10000000         | Cart Total = 10000000   | Accept (200 OK)          |
| 6   | Lệch dưới total_amount | B+1        | total_amount     | 10000001         | Cart Total = 10000000   | Reject (400 Bad Request) |
| 7   | Địa chỉ Min length = 1 | B-1        | shipping_address | `""` (0 ký tự)   | all nominal             | Reject (400 Bad Request) |
| 8   | Địa chỉ Min length = 1 | B          | shipping_address | `"A"` (1 ký tự)  | all nominal             | Accept (200 OK)          |
| 9   | Địa chỉ Min length = 1 | B+1        | shipping_address | `"AB"` (2 ký tự) | all nominal             | Accept (200 OK)          |

---

### BVA Step 3: 2-Point BVA Scenarios — Thanh toán

Nominal values for other variables: `Authorization` = Valid Token, `Cart State` = 1 AirPods Pro 2 + 1 Keychron Q1 (Server Total = 10.000.000 ₫), `total_amount` = `10000000`, `shipping_address` = `"123 Le Loi, TP.HCM"`.

| #   | Boundary               | Test Point    | Variable Tested  | Test Value      | Other Variables        | Expected Result          |
| --- | ---------------------- | ------------- | ---------------- | --------------- | ---------------------- | ------------------------ |
| 1   | Số sản phẩm Min = 1    | B (valid)     | Cart Item count  | 1 (giá 4M)      | total_amount = 4000000 | Accept (200 OK)          |
| 2   | Số sản phẩm Min = 1    | B-1 (invalid) | Cart Item count  | 0               | total_amount = 0       | Reject (400 Bad Request) |
| 3   | Lệch dưới total_amount | B (valid)     | total_amount     | 10000000        | Cart Total = 10000000  | Accept (200 OK)          |
| 4   | Lệch dưới total_amount | B-1 (invalid) | total_amount     | 9999999         | Cart Total = 10000000  | Reject (400 Bad Request) |
| 5   | Lệch trên total_amount | B (valid)     | total_amount     | 10000000        | Cart Total = 10000000  | Accept (200 OK)          |
| 6   | Lệch trên total_amount | B+1 (invalid) | total_amount     | 10000001        | Cart Total = 10000000  | Reject (400 Bad Request) |
| 7   | Địa chỉ Min length = 1 | B (valid)     | shipping_address | `"A"` (1 ký tự) | all nominal            | Accept (200 OK)          |
| 8   | Địa chỉ Min length = 1 | B-1 (invalid) | shipping_address | `""` (0 ký tự)  | all nominal            | Reject (400 Bad Request) |

---

### BVA Step 4: Consolidate BVA Test Cases — Thanh toán

#### Overlap Between 3-Point and 2-Point

| 3-Point Scenario #      | 2-Point Scenario #           | Variable         | Test Value | Overlap Reason                                   |
| ----------------------- | ---------------------------- | ---------------- | ---------- | ------------------------------------------------ |
| #2 (B at min count)     | #1 (B valid at min count)    | Cart Item count  | 1          | Trùng giá trị thử nghiệm biên cực tiểu hợp lệ    |
| #1 (B-1 at min count)   | #2 (B-1 invalid min count)   | Cart Item count  | 0          | Trùng trường hợp giỏ hàng trống                  |
| #4 (B-1 at lower total) | #4 (B-1 invalid lower total) | total_amount     | 9999999    | Trùng giá trị thử nghiệm lệch dưới               |
| #5 (B at lower total)   | #3 (B valid lower total)     | total_amount     | 10000000   | Trùng trường hợp khớp giá hợp lệ                 |
| #6 (B+1 at lower total) | #6 (B+1 invalid total)       | total_amount     | 10000001   | Trùng giá trị thử nghiệm lệch trên               |
| #7 (B-1 at min address) | #8 (B-1 invalid min address) | shipping_address | `""`       | Trùng trường hợp địa chỉ rỗng                    |
| #8 (B at min address)   | #7 (B valid min address)     | shipping_address | `"A"`      | Trùng giá trị thử nghiệm độ dài địa chỉ cực tiểu |

#### Overlap with Domain Testing TCs

| BVA Scenario #          | DT Test Case                                                                                                                               | Variable         | Test Value | Overlap Reason                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- | ---------- | ------------------------------------------------------ |
| 3-Point #1 / 2-Point #2 | [TC-CHECKOUT-003](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/checkout/TC-CHECKOUT-003.md) | Cart Item count  | 0          | Đã được bao phủ trong ca kiểm thử giỏ hàng trống       |
| 3-Point #5 / 2-Point #3 | [TC-CHECKOUT-001](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/checkout/TC-CHECKOUT-001.md) | total_amount     | 10000000   | Đã được bao phủ bởi ca kiểm thử thành công luồng chính |
| 3-Point #7 / 2-Point #8 | [TC-CHECKOUT-005](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/checkout/TC-CHECKOUT-005.md) | shipping_address | `""`       | Đã được bao phủ bởi ca kiểm thử địa chỉ trống          |

Các kịch bản BVA còn lại không trùng lắp sẽ được chuyển thành các Test Case BVA mới.

#### Final BVA Test Case Summary

| #   | TC ID                                                                                                                                              | Description                                                                | Technique(s)      | Boundary                     | Expected                            |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------- | ---------------------------- | ----------------------------------- |
| 1   | [TC-CHECKOUT-BVA-001](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/checkout/TC-CHECKOUT-BVA-001.md) | Thanh toán đơn hàng thành công khi giỏ hàng có đúng 1 sản phẩm             | 3-Point + 2-Point | Giỏ hàng = 1 sản phẩm (B)    | Pass - Đơn hàng được tạo thành công |
| 2   | [TC-CHECKOUT-BVA-002](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/checkout/TC-CHECKOUT-BVA-002.md) | Thanh toán đơn hàng thất bại khi tổng tiền client gửi ít hơn máy chủ 1đ    | 3-Point + 2-Point | total_amount = T - 1 (B-1)   | Fail - Trả về mã lỗi 400            |
| 3   | [TC-CHECKOUT-BVA-003](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/checkout/TC-CHECKOUT-BVA-003.md) | Thanh toán đơn hàng thất bại khi tổng tiền client gửi nhiều hơn máy chủ 1đ | 3-Point + 2-Point | total_amount = T + 1 (B+1)   | Fail - Trả về mã lỗi 400            |
| 4   | [TC-CHECKOUT-BVA-004](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/checkout/TC-CHECKOUT-BVA-004.md) | Thanh toán đơn hàng thành công khi địa chỉ giao hàng chỉ có đúng 1 ký tự   | 3-Point + 2-Point | Độ dài địa chỉ = 1 ký tự (B) | Pass - Đơn hàng được tạo thành công |

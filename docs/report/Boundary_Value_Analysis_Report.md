# Boundary Value Analysis Report — HW04

## Feature: Xem danh sách & Tìm kiếm sản phẩm (FR-05)

### BVA Step 1: Identify Boundary Points — Xem danh sách & Tìm kiếm sản phẩm

| #   | Variable                | Boundary Description    | Boundary Value (B) | Valid Side                           | Invalid Side                        |
| --- | ----------------------- | ----------------------- | -----------------: | ------------------------------------ | ----------------------------------- |
| 1   | Độ dài từ khóa tìm kiếm | Minimum length boundary |                  0 | B (0 ký tự hoặc omitted) = valid     | B-1 không khả thi                   |
| 2   | Độ dài từ khóa tìm kiếm | Robustness reference    |                255 | 254/255/256 đều thuộc miền SRS       | Không có phía invalid được đặc tả    |
| 3   | Số sản phẩm trong CSDL  | Minimum count boundary  |                  0 | B (0 sản phẩm) = valid (empty state) | B-1 (không khả thi)                 |
| 4   | Giá hiển thị             | Ngưỡng phân cách nghìn  |               1000 | 999/1000/1001 đều là giá trị hợp lệ  | N/A — đây là biên thay đổi định dạng |

> FR-05 không quy định độ dài tối đa của `search`. Mốc 255 chỉ là **biên độ bền tham chiếu**, do đó ca 256 ký tự không được coi là invalid và hệ thống không được cắt âm thầm. Biên giá 1000 xuất phát trực tiếp từ yêu cầu định dạng phân cách hàng nghìn.

---

### BVA Step 2: 3-Point BVA Scenarios — Xem danh sách & Tìm kiếm sản phẩm

Nominal values for other variables: `Product Count` = 3 (trong đó có fixture tên chính xác `M`), `search` = `"MacBook Pro M3"`.

| #   | Boundary                  | Test Point | Variable Tested | Test Value         | Other Variables | Expected Result                             |
| --- | ------------------------- | ---------- | --------------- | ------------------ | --------------- | ------------------------------------------- |
| 1   | Độ dài tìm kiếm Min = 0   | B-1        | search          | N/A (không có độ dài -1) | Count = 3  | N/A; omitted tương đương B, không phải B-1  |
| 2   | Độ dài tìm kiếm Min = 0   | B          | search          | `""` (0 ký tự)     | Count = 3       | Accept (Hiển thị tất cả 3 sản phẩm)         |
| 3   | Độ dài tìm kiếm Min = 0   | B+1        | search          | `"M"` (1 ký tự)    | Count = 3       | Accept (Hiển thị fixture exact-name `M`)     |
| 4   | Độ dài tham chiếu R = 255 | R-1        | search          | `"A" * 254`        | Count = 3       | Empty state; không crash/tràn layout        |
| 5   | Độ dài tham chiếu R = 255 | R          | search          | `"A" * 255`        | Count = 3       | Empty state; không crash/tràn layout        |
| 6   | Độ dài tham chiếu R = 255 | R+1        | search          | `"A" * 256`        | Count = 3       | Xử lý đủ; không cắt âm thầm/crash/tràn layout |
| 7   | Số sản phẩm DB Min = 0    | B-1        | Product Count   | N/A (Không âm)     | search = `""`   | N/A                                         |
| 8   | Số sản phẩm DB Min = 0    | B          | Product Count   | 0                  | search = `""`   | Accept (Hiển thị empty state)               |
| 9   | Số sản phẩm DB Min = 0    | B+1        | Product Count   | 1                  | search = `""`   | Accept (Hiển thị đúng 1 sản phẩm)           |
| 10  | Số sản phẩm DB Min = 0    | B+2        | Product Count   | 2                  | search = `""`   | Accept (Hiển thị đúng 2 sản phẩm trong grid)|
| 11  | Ngưỡng giá = 1000         | B-1        | Product Price   | 999                | Count = 1       | Hiển thị `999 ₫`                            |
| 12  | Ngưỡng giá = 1000         | B          | Product Price   | 1000               | Count = 1       | Hiển thị `1.000 ₫`                          |
| 13  | Ngưỡng giá = 1000         | B+1        | Product Price   | 1001               | Count = 1       | Hiển thị `1.001 ₫`                          |

---

### BVA Step 3: 2-Point BVA Scenarios — Xem danh sách & Tìm kiếm sản phẩm

Nominal values for other variables: `Product Count` = 3 (trong đó có fixture tên chính xác `M`), `search` = `"MacBook Pro M3"`.

| #   | Boundary                  | Test Point    | Variable Tested | Test Value         | Other Variables | Expected Result                     |
| --- | ------------------------- | ------------- | --------------- | ------------------ | --------------- | ----------------------------------- |
| 1   | Độ dài tham chiếu R = 255 | R              | search          | `"A" * 255`        | Count = 3       | Accept (Hiển thị empty state)       |
| 2   | Độ dài tham chiếu R = 255 | R+1            | search          | `"A" * 256`        | Count = 3       | Accept đủ chuỗi, không crash        |
| 3   | Ngưỡng giá = 1000         | B-1           | Product Price   | 999                | Count = 1       | Hiển thị `999 ₫`                    |
| 4   | Ngưỡng giá = 1000         | B             | Product Price   | 1000               | Count = 1       | Hiển thị `1.000 ₫`                  |

> Với `search.length` và Product Count có natural minimum 0, điểm -1 bất khả thi nên không có cặp 2-Point executable qua biên; các điểm B/B+1 chỉ thuộc one-sided 3-Point. Cặp 255/256 ở trên là robustness reference, còn 999/1000 là cặp 2-Point thật tại ngưỡng thay đổi format.

---

### BVA Step 4: Consolidate BVA Test Cases — Xem danh sách & Tìm kiếm sản phẩm

#### Overlap Between 3-Point and 2-Point

| 3-Point Scenario #     | 2-Point Scenario #          | Variable      | Test Value    | Overlap Reason                                                     |
| ---------------------- | --------------------------- | ------------- | ------------- | ------------------------------------------------------------------ |
| #5 (R at reference)    | #1 (R at reference)         | search        | `"A" * 255`   | Trùng giá trị robustness và kết quả (Empty State)                  |
| #6 (R+1 reference)     | #2 (R+1 reference)          | search        | `"A" * 256`   | Trùng điểm ngay trên mốc tham chiếu; cả hai vẫn thuộc miền SRS     |
| #11 (B-1 price)        | #3 (B-1 price)              | Product Price | 999           | Trùng điểm ngay dưới ngưỡng định dạng                              |
| #12 (B price)          | #4 (B price)                | Product Price | 1000          | Trùng điểm tại ngưỡng định dạng                                    |

#### Overlap with Domain Testing TCs

| BVA Scenario #          | DT Test Case                                                                                                                                      | Variable | Test Value    | Overlap Reason                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- | ---------------------------------------------------------------- |
| 3-Point B at natural min | [TC-PLAS-001](../../tests/test-cases/product-list-and-search/TC-PLAS-001.md) | search   | `""`          | Trùng dữ liệu kiểm thử xem tất cả sản phẩm; không phải cặp 2-Point |
| Omitted (EC2, quy về B) | [TC-PLAS-001](../../tests/test-cases/product-list-and-search/TC-PLAS-001.md) | search   | Omitted       | Bỏ tham số tương đương độ dài 0; không được gán nhầm thành B-1   |
| Price B-1                | [TC-PLAS-017](../../tests/test-cases/product-list-and-search/TC-PLAS-017.md) | price    | `999`         | Chồng phủ có chủ đích: Domain kiểm định format output, BVA-006 kiểm định điểm quanh ngưỡng |
| Price B                  | [TC-PLAS-017](../../tests/test-cases/product-list-and-search/TC-PLAS-017.md) | price    | `1000`        | Chồng phủ có chủ đích: Domain kiểm định format output, BVA-007 kiểm định đúng ngưỡng       |

Các kịch bản BVA còn lại không trùng lắp sẽ được chuyển thành các Test Case BVA mới.

#### Final BVA Test Case Summary

| #   | TC ID                                                                                                                                                     | Description                                                      | Technique(s)      | Boundary            | Expected                                           |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------- | ------------------- | -------------------------------------------------- |
| 1   | [TC-PLAS-BVA-001](../../tests/test-cases/product-list-and-search/TC-PLAS-BVA-001.md) | Tìm kiếm với từ khóa có độ dài tối thiểu + 1 (1 ký tự)           | 3-Point           | Min length, B + 1   | Hiển thị fixture có exact-name `M`                   |
| 2   | [TC-PLAS-BVA-002](../../tests/test-cases/product-list-and-search/TC-PLAS-BVA-002.md) | Tìm kiếm tại biên độ bền tham chiếu 255 ký tự                    | 3-point robustness reference | Reference, R        | Empty state, không crash/tràn layout         |
| 3   | [TC-PLAS-BVA-003](../../tests/test-cases/product-list-and-search/TC-PLAS-BVA-003.md) | Tìm kiếm ngay trên biên độ bền tham chiếu (256 ký tự)            | 3-point robustness reference | Reference, R + 1    | Không cắt âm thầm/crash/tràn layout          |
| 4   | [TC-PLAS-BVA-004](../../tests/test-cases/product-list-and-search/TC-PLAS-BVA-004.md) | Kiểm tra hiển thị khi cơ sở dữ liệu trống (0 sản phẩm)           | One-sided 3-Point  | Min DB count, B     | Hiển thị thông báo empty state                     |
| 5   | [TC-PLAS-BVA-005](../../tests/test-cases/product-list-and-search/TC-PLAS-BVA-005.md) | Kiểm tra hiển thị khi cơ sở dữ liệu có đúng 1 sản phẩm           | 3-Point           | Min DB count, B + 1 | Hiển thị lưới chứa đúng 1 thẻ sản phẩm             |
| 6   | [TC-PLAS-BVA-006](../../tests/test-cases/product-list-and-search/TC-PLAS-BVA-006.md) | Giá 999 ngay dưới ngưỡng phân cách                               | 3-Point + 2-Point | Price, B-1          | `999 ₫`                                            |
| 7   | [TC-PLAS-BVA-007](../../tests/test-cases/product-list-and-search/TC-PLAS-BVA-007.md) | Giá 1000 tại ngưỡng phân cách                                    | 3-Point + 2-Point | Price, B            | `1.000 ₫`                                          |
| 8   | [TC-PLAS-BVA-008](../../tests/test-cases/product-list-and-search/TC-PLAS-BVA-008.md) | Giá 1001 ngay trên ngưỡng phân cách                              | 3-Point           | Price, B+1          | `1.001 ₫`                                          |
| 9   | [TC-PLAS-BVA-009](../../tests/test-cases/product-list-and-search/TC-PLAS-BVA-009.md) | Danh sách có đúng hai sản phẩm                                   | Near-boundary extension | Count, B+2   | Hai thẻ trong grid                                 |
| 10  | [TC-PLAS-BVA-010](../../tests/test-cases/product-list-and-search/TC-PLAS-BVA-010.md) | Độ dài 254 ngay dưới mốc tham chiếu                              | 3-point robustness reference | Reference, R-1 | Không crash, empty state                    |

---

## Feature: Thanh toán (FR-08)

### BVA Step 1: Identify Boundary Points — Thanh toán

| #   | Variable                   | Boundary Description          | Boundary Value (B) | Valid Side             | Invalid Side                       |
| --- | -------------------------- | ----------------------------- | -----------------: | ---------------------- | ---------------------------------- |
| 1   | Số sản phẩm trong giỏ hàng | Số lượng sản phẩm tối thiểu   |                  1 | B (1 sản phẩm) = valid | B-1 (0 sản phẩm) = invalid         |
| 2   | Lệch dưới `total_amount`   | Lệch dưới so với giá trị thực |              $T_s$ | B ($T_s$) = valid      | B-1 ($T_s - 1$) = invalid mismatch |
| 3   | Lệch trên `total_amount`   | Lệch trên so với giá trị thực |              $T_s$ | B ($T_s$) = valid      | B+1 ($T_s + 1$) = invalid mismatch |
| 4   | Độ dài `shipping_address`  | Mốc non-empty tham chiếu      |              R = 1 | R/R+1 = non-empty      | R-1 = empty; policy chưa có trong README |
| 5   | Độ dài `shipping_address`  | Robustness reference          |            R = 500 | 499/500/501 đều chưa bị SRS cấm | Không có phía invalid được đặc tả |

> `shipping_address` xuất hiện trong API specification §4.3 nhưng README không quy định bắt buộc, min hoặc max. Vì vậy 1 và 500 chỉ là **mốc tham chiếu để đặc tả hóa/kiểm tra độ bền**, không phải ràng buộc nghiệp vụ. Với `total_amount`, biên ±1 kiểm tra dữ liệu client bị sửa; backend có thể từ chối request hoặc bỏ qua giá client và dùng tổng tự tính. Oracle cốt lõi là không bao giờ persist giá client sai.

---

### BVA Step 2: 3-Point BVA Scenarios — Thanh toán

Nominal values for other variables: `Authorization` = Valid Token, `Cart State` = 1 AirPods Pro 2 + 1 Keychron Q1 (Server Total = 10.000.000 ₫), `total_amount` = `10000000`.

| #   | Boundary               | Test Point | Variable Tested | Test Value  | Other Variables         | Expected Result          |
| --- | ---------------------- | ---------- | --------------- | ----------- | ----------------------- | ------------------------ |
| 1   | Số sản phẩm Min = 1    | B-1        | Cart Item count | 0           | total_amount = 0        | Reject (400 Bad Request) |
| 2   | Số sản phẩm Min = 1    | B          | Cart Item count | 1 (giá 4M)  | total_amount = 4000000  | Accept (200 OK)          |
| 3   | Số sản phẩm Min = 1    | B+1        | Cart Item count | 2 (giá 10M) | total_amount = 10000000 | Accept (200 OK)          |
| 4   | Lệch dưới total_amount | B-1        | total_amount    | 9999999     | Cart Total = 10000000   | Reject/no mutation hoặc accept với server total |
| 5   | Lệch dưới total_amount | B          | total_amount    | 10000000    | Cart Total = 10000000   | Accept (200 OK)          |
| 6   | Lệch trên total_amount | B+1        | total_amount    | 10000001    | Cart Total = 10000000   | Reject/no mutation hoặc accept với server total |
| 7   | Address non-empty R = 1 | R-1       | address length  | 0 (`""`)    | all nominal             | Theo policy; không 5xx/partial state |
| 8   | Address non-empty R = 1 | R         | address length  | 1 (`"A"`)   | all nominal             | Accept+preserve hoặc reject 400; không 5xx/partial state |
| 9   | Address non-empty R = 1 | R+1       | address length  | 2 (`"An"`)  | all nominal             | Accept+preserve hoặc reject 400; không 5xx/partial state |
| 10  | Address reference R=500 | R-1       | address length  | 499          | all nominal             | Không silent truncation/5xx          |
| 11  | Address reference R=500 | R         | address length  | 500          | all nominal             | Không silent truncation/5xx          |
| 12  | Address reference R=500 | R+1       | address length  | 501          | all nominal             | Không silent truncation/5xx          |

---

### BVA Step 3: 2-Point BVA Scenarios — Thanh toán

Nominal values for other variables: `Authorization` = Valid Token, `Cart State` = 1 AirPods Pro 2 + 1 Keychron Q1 (Server Total = 10.000.000 ₫), `total_amount` = `10000000`.

| #   | Boundary               | Test Point    | Variable Tested | Test Value | Other Variables        | Expected Result          |
| --- | ---------------------- | ------------- | --------------- | ---------- | ---------------------- | ------------------------ |
| 1   | Số sản phẩm Min = 1    | B (valid)     | Cart Item count | 1 (giá 4M) | total_amount = 4000000 | Accept (200 OK)          |
| 2   | Số sản phẩm Min = 1    | B-1 (invalid) | Cart Item count | 0          | total_amount = 0       | Reject (400 Bad Request) |
| 3   | Lệch dưới total_amount | B (valid)     | total_amount    | 10000000   | Cart Total = 10000000  | Accept (200 OK)          |
| 4   | Lệch dưới total_amount | B-1 (mismatch) | total_amount    | 9999999    | Cart Total = 10000000  | Reject hoặc use server total |
| 5   | Lệch trên total_amount | B (valid)     | total_amount    | 10000000   | Cart Total = 10000000  | Accept (200 OK)          |
| 6   | Lệch trên total_amount | B+1 (mismatch) | total_amount    | 10000001   | Cart Total = 10000000  | Reject hoặc use server total |
| 7   | Address non-empty R=1  | R-1            | address length | 0            | all nominal            | Deterministic, no 5xx     |
| 8   | Address non-empty R=1  | R              | address length | 1            | all nominal            | Controlled policy, no 5xx/partial state |
| 9   | Address reference R=500| R              | address length | 500          | all nominal            | No truncation/5xx         |
| 10  | Address reference R=500| R+1            | address length | 501          | all nominal            | No truncation/5xx         |

---

### BVA Step 4: Consolidate BVA Test Cases — Thanh toán

#### Overlap Between 3-Point and 2-Point

| 3-Point Scenario #      | 2-Point Scenario #           | Variable        | Test Value | Overlap Reason                                |
| ----------------------- | ---------------------------- | --------------- | ---------- | --------------------------------------------- |
| #2 (B at min count)     | #1 (B valid at min count)    | Cart Item count | 1          | Trùng giá trị thử nghiệm biên cực tiểu hợp lệ |
| #1 (B-1 at min count)   | #2 (B-1 invalid min count)   | Cart Item count | 0          | Trùng trường hợp giỏ hàng trống               |
| #4 (B-1 at lower total) | #4 (B-1 invalid lower total) | total_amount    | 9999999    | Trùng giá trị thử nghiệm lệch dưới            |
| #5 (B at lower total)   | #3 (B valid lower total)     | total_amount    | 10000000   | Trùng trường hợp khớp giá hợp lệ              |
| #6 (B+1 at lower total) | #6 (B+1 invalid total)       | total_amount    | 10000001   | Trùng giá trị thử nghiệm lệch trên            |
| #7 (address B-1)        | #7 (address B-1)             | address length  | 0          | Trùng điểm empty quanh mốc non-empty           |
| #8 (address B)          | #8 (address B)               | address length  | 1          | Trùng điểm non-empty nhỏ nhất tham chiếu        |
| #11 (reference B)       | #9 (reference B)             | address length  | 500        | Trùng mốc robustness                            |
| #12 (reference B+1)     | #10 (reference B+1)          | address length  | 501        | Trùng điểm ngay trên mốc robustness             |

#### Overlap with Domain Testing TCs

| BVA Scenario #          | DT Test Case                                                                                                                               | Variable        | Test Value | Overlap Reason                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------- | ---------- | ------------------------------------------------------ |
| 3-Point #1 / 2-Point #2 | [TC-CHECKOUT-003](../../tests/test-cases/checkout/TC-CHECKOUT-003.md) | Cart Item count | 0          | Đã được bao phủ trong ca kiểm thử giỏ hàng trống       |
| 3-Point #5 / 2-Point #3 | [TC-CHECKOUT-001](../../tests/test-cases/checkout/TC-CHECKOUT-001.md) | total_amount    | 10000000   | Đã được bao phủ bởi ca kiểm thử thành công luồng chính |
| Address B-1             | [TC-CHECKOUT-009](../../tests/test-cases/checkout/TC-CHECKOUT-009.md) | address length | whitespace | Cùng miền address trống hiệu dụng; BVA-004 dùng empty literal |

Các kịch bản BVA còn lại không trùng lắp sẽ được chuyển thành các Test Case BVA mới.

#### Final BVA Test Case Summary

| #   | TC ID                                                                                                                                              | Description                                                                | Technique(s)      | Boundary                   | Expected                            |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------- | -------------------------- | ----------------------------------- |
| 1   | [TC-CHECKOUT-BVA-001](../../tests/test-cases/checkout/TC-CHECKOUT-BVA-001.md) | Thanh toán đơn hàng thành công khi giỏ hàng có đúng 1 sản phẩm             | 3-Point + 2-Point | Giỏ hàng = 1 sản phẩm (B)  | Pass - Đơn hàng được tạo thành công |
| 2   | [TC-CHECKOUT-BVA-002](../../tests/test-cases/checkout/TC-CHECKOUT-BVA-002.md) | Xử lý an toàn khi total client thấp hơn server 1đ                          | 3-Point + 2-Point | total_amount = T - 1 (B-1) | Reject hoặc persist server total     |
| 3   | [TC-CHECKOUT-BVA-003](../../tests/test-cases/checkout/TC-CHECKOUT-BVA-003.md) | Xử lý an toàn khi total client cao hơn server 1đ                           | 3-Point + 2-Point | total_amount = T + 1 (B+1) | Reject hoặc persist server total     |
| 4   | [TC-CHECKOUT-BVA-004](../../tests/test-cases/checkout/TC-CHECKOUT-BVA-004.md) | Address dài 0 tại dưới mốc non-empty                                   | Length characterization | Address, R-1 | Hành vi policy rõ, không 5xx/partial state |
| 5   | [TC-CHECKOUT-BVA-005](../../tests/test-cases/checkout/TC-CHECKOUT-BVA-005.md) | Address dài đúng 1 ký tự                                                | Length characterization | Address, R   | Accept+preserve hoặc reject 400; no 5xx/partial state |
| 6   | [TC-CHECKOUT-BVA-006](../../tests/test-cases/checkout/TC-CHECKOUT-BVA-006.md) | Address dài 2 ký tự                                                     | Length characterization | Address, R+1 | Accept+preserve hoặc reject 400; no 5xx/partial state |
| 7   | [TC-CHECKOUT-BVA-007](../../tests/test-cases/checkout/TC-CHECKOUT-BVA-007.md) | Address dài 499/500/501 quanh mốc robustness                            | 3-point robustness reference | R=500 | Không silent truncation/5xx/partial state   |

---

## Feature: Quản lý Danh mục (FR-14)

### BVA Step 1: Identify Boundary Points

| #   | Variable            | Boundary Description | Boundary Value (B) | Valid Side          | Invalid Side            |
| --- | ------------------- | -------------------- | -----------------: | ------------------- | ----------------------- |
| 1   | Tên danh mục sau trim | Chiều dài hiệu dụng tối thiểu |             1 | B (1 ký tự) = valid | B-1 (0 ký tự) = invalid |
| 2   | `category_id`        | Mốc fixture AUTOINCREMENT (không phải biên FR-14) | R = 1 | R/R+1 xóa được khi record tồn tại | R-1 = 0 kiểm tra phản hồi/no mutation |
| 3   | Số lượng danh mục    | Số phần tử nhỏ nhất của tập   | 0 | B/B+1/B+2 hợp lệ | B-1 = -1 bất khả thi |

> FR-14 không quy định min/max cho `category_id`; vì vậy 0/1/2 chỉ là chuỗi **identifier reference** `R-1/R/R+1` dựa trên fixture SQLite, không được tính là BVA nghiệp vụ. Test setup phải bảo đảm ID 1, 2 tồn tại; miền “ID có tồn tại hay không” quyết định oracle. Số lượng danh mục 0/1 mới là biên tự nhiên của tập hợp.

### BVA Step 2: 3-Point BVA Scenarios

Nominal values: Token = JWT Admin

| #   | Boundary     | Test Point | Variable Tested | Test Value | Other Variables | Expected Result  |
| --- | ------------ | ---------- | --------------- | ---------- | --------------- | ---------------- |
| 1   | name Min = 1 | B-1        | name            | ""         | all nominal     | Reject (400)     |
| 2   | name Min = 1 | B          | name            | "A"        | all nominal     | Accept (201/200) |
| 3   | name Min = 1 | B+1        | name            | "AB"       | all nominal     | Accept (201/200) |
| 4   | ID reference = 1 | R-1    | category_id     | 0          | admin; fixture ID 1/2 tồn tại | Reject 400/404 hoặc documented no-op; no mutation |
| 5   | ID reference = 1 | R      | category_id     | 1          | category 1 tồn tại, không có SP | Delete success |
| 6   | ID reference = 1 | R+1    | category_id     | 2          | category 2 tồn tại, không có SP | Delete success |
| 7   | Count Min = 0| B-1        | Category Count  | -1         | N/A             | Bất khả thi |
| 8   | Count Min = 0| B          | Category Count  | 0          | admin token     | HTTP 200 + empty list/state |
| 9   | Count Min = 0| B+1        | Category Count  | 1          | admin token     | HTTP 200 + đúng 1 row |
| 10  | Count Min = 0| Near (B+2) | Category Count  | 2          | admin token     | Điểm mở rộng: HTTP 200 + đúng 2 rows |

### BVA Step 3: 2-Point BVA Scenarios

Nominal values: Token = JWT Admin

| #   | Boundary     | Test Point    | Variable Tested | Test Value | Other Variables | Expected Result  |
| --- | ------------ | ------------- | --------------- | ---------- | --------------- | ---------------- |
| 1   | name Min = 1 | B (valid)     | name            | "A"        | all nominal     | Accept (201/200) |
| 2   | name Min = 1 | B-1 (invalid) | name            | ""         | all nominal     | Reject (400)     |
| 3   | ID reference = 1 | R (valid if exists) | category_id | 1       | fixture ID 1 tồn tại | Delete success |
| 4   | ID reference = 1 | R-1        | category_id     | 0          | admin token     | Controlled response, no mutation |

> Category Count có natural minimum 0 nên B-1 = -1 bất khả thi; B=0 và B+1=1 là one-sided 3-Point observations, không phải cặp 2-Point executable.

### BVA Step 4: Consolidate BVA Test Cases

#### Overlap Between 3-Point and 2-Point

| 3-Point Scenario # | 2-Point Scenario # | Variable | Test Value | Overlap Reason                   |
| ------------------ | ------------------ | -------- | ---------- | -------------------------------- |
| #2 (B at min)      | #1 (B valid)       | name     | "A"        | Same value, same expected result |
| #1 (B-1 at min)    | #2 (B-1 invalid)   | name     | ""         | Same value, same expected result |
| #5 (ID R)          | #3 (ID R)          | category_id | 1       | Cùng mốc ID có tồn tại |
| #4 (ID R-1)        | #4 (ID R-1)        | category_id | 0       | Cùng điểm ngay dưới mốc implementation-derived |

#### Overlap with Domain Testing TCs

| BVA Scenario #  | DT Test Case    | Variable | Test Value | Overlap Reason                                 |
| --------------- | --------------- | -------- | ---------- | ---------------------------------------------- |
| #1 (B-1 at min) | TC-CATEGORY-002 | name     | ""         | Same test data and expected result (Name rỗng) |
| Count multiple  | [TC-CATEGORY-004](../../tests/test-cases/category/TC-CATEGORY-004.md) | Count | >= 2 fixture | Phủ lớp EC21 nhưng không thay thế điểm chính xác Count=2 |
| ID reference R  | [TC-CATEGORY-005](../../tests/test-cases/category/TC-CATEGORY-005.md) | category_id | existing ID (ví dụ 1) | Chồng phủ xóa record tồn tại; BVA-004 cố định fixture R=1, BVA-005 bổ sung R+1 và kiểm tra không xóa nhầm ID 1 |

#### Final BVA Test Case Summary

| #   | TC ID                                                                                                                                              | Description       | Technique(s)      | Boundary | Expected |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ----------------- | -------- | -------- |
| 1   | [TC-CATEGORY-BVA-001](../../tests/test-cases/category/TC-CATEGORY-BVA-001.md) | Name đúng 1 ký tự | 3-Point + 2-Point | Min, B   | Accept   |
| 2   | [TC-CATEGORY-BVA-002](../../tests/test-cases/category/TC-CATEGORY-BVA-002.md) | Name 2 ký tự      | 3-Point only      | Min, B+1 | Accept   |
| 3   | [TC-CATEGORY-BVA-003](../../tests/test-cases/category/TC-CATEGORY-BVA-003.md) | category_id = 0 | Identifier reference | ID, R-1 | Controlled response, no mutation |
| 4   | [TC-CATEGORY-BVA-004](../../tests/test-cases/category/TC-CATEGORY-BVA-004.md) | category_id = 1 | Identifier reference | ID, R | Delete success |
| 5   | [TC-CATEGORY-BVA-005](../../tests/test-cases/category/TC-CATEGORY-BVA-005.md) | category_id = 2 | Identifier reference | ID, R+1 | Delete success |
| 6   | [TC-CATEGORY-BVA-006](../../tests/test-cases/category/TC-CATEGORY-BVA-006.md) | Danh sách có 0 danh mục | One-sided 3-Point | Count Min, B | Empty state có minh họa/message |
| 7   | [TC-CATEGORY-BVA-007](../../tests/test-cases/category/TC-CATEGORY-BVA-007.md) | Danh sách có 1 danh mục | 3-Point | Count Min, B+1 | One row |
| 8   | [TC-CATEGORY-BVA-008](../../tests/test-cases/category/TC-CATEGORY-BVA-008.md) | Danh sách có đúng 2 danh mục | Near-boundary extension | Count, B+2 | Two rows |

---

## Feature: Đăng ký Mobile (FR-01 / FR-20)

### BVA Step 1: Identify Boundary Points

| #   | Variable                     | Boundary Description                  | Boundary Value (B) | Valid Side                 | Invalid Side                    | Source |
| --- | ---------------------------- | ------------------------------------- | -----------------: | -------------------------- | ------------------------------- | ------ |
| 1   | Độ dài Password              | Chiều dài tối thiểu                   |                  8 | B/B+1 = valid nếu đủ thành phần | B-1 = invalid               | FR-01 |
| 2   | Độ dài hiệu dụng Full Name   | Giá trị bắt buộc sau trim             |                  1 | B/B+1 = valid              | B-1 (0 ký tự) = invalid         | FR-01 + miền chuỗi bắt buộc |
| 3   | Độ dài local-part Email      | Tối thiểu để có dạng `user@domain.com`|                  1 | B/B+1 = valid nếu cấu trúc còn lại đúng | B-1 = invalid | Biên cấu trúc suy ra từ FR-01 |
| 4   | Chênh lệch độ dài Confirm    | Robustness reference quanh equality  |              R = 0 | R=0 chỉ là điều kiện cần; nội dung giống mới valid | R-1/R+1 chắc chắn mismatch | Reference, không phải biên số của SRS |

> README không quy định độ dài tối đa cho Full Name hoặc Email, vì vậy báo cáo không dựng biên max giả định. Biên Email chỉ kiểm tra cấu trúc local-part. Confirm Password là điều kiện quan hệ/categorical: ba giá trị chênh lệch `-1/0/+1` chỉ là **robustness representatives**, không phải BVA chuẩn; cùng độ dài nhưng khác nội dung vẫn phải reject.

### BVA Step 2: 3-Point BVA Scenarios

| #   | Boundary                | Test Point | Variable Tested | Test Value                    | Other Variables | Expected Result |
| --- | ----------------------- | ---------- | --------------- | ----------------------------- | --------------- | --------------- |
| 1   | Password Min = 8        | B-1        | password        | `Aa1!aaa` (7)                 | all nominal     | Reject          |
| 2   | Password Min = 8        | B          | password        | `Test123!` (8)                | confirm khớp    | Accept          |
| 3   | Password Min = 8        | B+1        | password        | `Test1234!` (9)               | confirm khớp    | Accept          |
| 4   | Full Name Min = 1       | B-1        | Full Name       | `""` (0)                     | all nominal     | Reject          |
| 5   | Full Name Min = 1       | B          | Full Name       | `"A"` (1)                    | all nominal     | Accept          |
| 6   | Full Name Min = 1       | B+1        | Full Name       | `"An"` (2)                   | all nominal     | Accept          |
| 7   | Email local-part Min = 1| B-1        | Email           | `@example.com` (0)            | all nominal     | Reject          |
| 8   | Email local-part Min = 1| B          | Email           | `a@example.com` (1)           | all nominal     | Accept          |
| 9   | Email local-part Min = 1| B+1        | Email           | `ab@example.com` (2)          | all nominal     | Accept          |
| 10  | Confirm delta ref = 0   | R-1        | Confirm Pwd     | `Test123` so với `Test123!`   | all nominal     | Reject          |
| 11  | Confirm delta ref = 0   | R          | Confirm Pwd     | `Test123!` = password         | all nominal     | Accept vì nội dung cũng khớp |
| 12  | Confirm delta ref = 0   | R+1        | Confirm Pwd     | `Test123!!` so với `Test123!` | all nominal     | Reject          |

### BVA Step 3: 2-Point BVA Scenarios

| #   | Boundary                 | Test Point    | Variable Tested | Test Value       | Other Variables | Expected Result |
| --- | ------------------------ | ------------- | --------------- | ---------------- | --------------- | --------------- |
| 1   | Password Min = 8         | B (valid)     | password        | 8 chars          | confirm khớp    | Accept          |
| 2   | Password Min = 8         | B-1 (invalid) | password        | 7 chars          | all nominal     | Reject          |
| 3   | Full Name Min = 1        | B (valid)     | Full Name       | `"A"`           | all nominal     | Accept          |
| 4   | Full Name Min = 1        | B-1 (invalid) | Full Name       | `""`            | all nominal     | Reject          |
| 5   | Email local-part Min = 1 | B (valid)     | Email           | `a@example.com`  | all nominal     | Accept          |
| 6   | Email local-part Min = 1 | B-1 (invalid) | Email           | `@example.com`   | all nominal     | Reject          |
| 7   | Confirm delta ref = 0    | R, exact-match | Confirm Pwd    | delta = 0, khớp  | all nominal     | Accept          |
| 8   | Confirm delta ref = 0    | R-1            | Confirm Pwd    | delta = -1       | all nominal     | Reject          |

### BVA Step 4: Consolidate BVA Test Cases

#### Overlap Between 3-Point and 2-Point

| 3-Point Scenario # | 2-Point Scenario # | Variable | Test Value | Overlap Reason                   |
| ------------------ | ------------------ | -------- | ---------- | -------------------------------- |
| #2 (B at min)      | #1 (B valid)       | password | 8 chars    | Same value, same expected result |
| #1 (B-1 at min)    | #2 (B-1 invalid)   | password | 7 chars    | Same value, same expected result |
| #5 (Name B)        | #3 (Name B)        | Full Name | 1 char     | Cùng điểm min hợp lệ             |
| #4 (Name B-1)      | #4 (Name B-1)      | Full Name | 0 char     | Cùng điểm ngay dưới min          |
| #8 (Email B)       | #5 (Email B)       | Email     | local = 1  | Cùng cấu trúc min hợp lệ         |
| #7 (Email B-1)     | #6 (Email B-1)     | Email     | local = 0  | Cùng cấu trúc thiếu local-part   |
| #11 (Confirm R)    | #7 (Confirm R)     | Confirm   | delta = 0  | Cùng trường hợp nội dung khớp chính xác |
| #10 (Confirm R-1)  | #8 (Confirm R-1)   | Confirm   | delta = -1 | Cùng representative ngắn hơn 1          |

#### Overlap with Domain Testing TCs

| BVA Scenario #  | DT Test Case           | Variable | Test Value | Overlap Reason                                 |
| --------------- | ---------------------- | -------- | ---------- | ---------------------------------------------- |
| #1 (B-1 at min) | TC-MOBILE-REGISTER-007 | password | 7 chars    | Same test data and expected result (< 8 chars) |
| Name B-1        | TC-MOBILE-REGISTER-002 | Full Name | 0 chars    | Đã phủ trường bắt buộc bị bỏ trống               |
| Email B-1       | TC-MOBILE-REGISTER-016 | Email     | local = 0  | Đã phủ email thiếu local-part                     |
| Confirm R, exact-match | TC-MOBILE-REGISTER-001 | Confirm | delta = 0 | Luồng hợp lệ có cả độ dài và nội dung khớp         |
| Confirm R, khác nội dung | TC-MOBILE-REGISTER-013 | Confirm | delta = 0 | Chứng minh độ dài bằng nhau chưa đủ                 |

#### Final BVA Test Case Summary

| #   | TC ID                                                                                                                                                                   | Description   | Technique(s)      | Boundary | Expected |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------------- | -------- | -------- |
| 1   | [TC-MOBILE-REGISTER-BVA-001](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-BVA-001.md) | Độ dài đúng 8 | 3-Point + 2-Point | Min, B   | Accept   |
| 2   | [TC-MOBILE-REGISTER-BVA-002](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-BVA-002.md) | Độ dài đúng 9 | 3-Point only      | Min, B+1 | Accept   |
| 3   | [TC-MOBILE-REGISTER-BVA-003](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-BVA-003.md) | Full Name đúng 1 ký tự | 3-Point + 2-Point | Name Min, B | Accept |
| 4   | [TC-MOBILE-REGISTER-BVA-004](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-BVA-004.md) | Full Name 2 ký tự | 3-Point | Name Min, B+1 | Accept |
| 5   | [TC-MOBILE-REGISTER-BVA-005](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-BVA-005.md) | Email có local-part 1 ký tự | 3-Point + 2-Point | Email local Min, B | Accept |
| 6   | [TC-MOBILE-REGISTER-BVA-006](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-BVA-006.md) | Email có local-part 2 ký tự | 3-Point | Email local Min, B+1 | Accept |
| 7   | [TC-MOBILE-REGISTER-BVA-007](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-BVA-007.md) | Confirm ngắn hơn password 1 ký tự | Relative-length robustness | Confirm, R-1 | Reject |
| 8   | [TC-MOBILE-REGISTER-BVA-008](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-BVA-008.md) | Confirm dài hơn password 1 ký tự | Relative-length robustness | Confirm, R+1 | Reject |

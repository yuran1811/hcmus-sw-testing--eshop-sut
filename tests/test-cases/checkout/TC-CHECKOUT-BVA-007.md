# TC-CHECKOUT-BVA-007: Địa chỉ dài 499/500/501 ký tự quanh mốc robustness 500

## Requirement ID

FR-08 / API Specification 4.3 (Robustness reference; no SRS maximum)

## Module / Test type / Technique

Checkout API / Robustness / Boundary Value Analysis (3-point reference)

## Preconditions

- Người dùng đã đăng nhập và có Token JWT hợp lệ.
- Trước mỗi iteration, khôi phục giỏ phía máy chủ về đúng 1 Keychron Q1 giá 4.000.000 ₫.
- Có công cụ tạo/đếm chuỗi chính xác và có thể đối chiếu `length` trong DB.

## Test data

Mốc `R = 500` được lấy từ representative value cũ để đo robustness/storage, **không phải maximum do SRS quy định**.

| Iteration | Test point | Generated value      | Exact length |
| --------- | ---------- | -------------------- | ------------ |
| A         | `R - 1`    | `"A"` lặp 499 lần   | 499          |
| B         | `R`        | `"A"` lặp 500 lần   | 500          |
| C         | `R + 1`    | `"A"` lặp 501 lần   | 501          |

Mỗi request có `total_amount = 4000000` và `shipping_address` bằng chuỗi của iteration tương ứng.

## Test steps

1. Tạo chuỗi và xác nhận length trước khi gửi từng iteration.
2. Gửi `POST /api/checkout` bằng Token hợp lệ.
3. Ghi nhận status, response time, order count, length/hash địa chỉ trong DB và trạng thái giỏ.
4. Khôi phục Preconditions rồi chạy iteration tiếp theo.
5. So sánh ba kết quả quanh mốc 500.

## Expected result

- Vì SRS/API không công bố max length, không được ghi `500` là biên hợp lệ/không hợp lệ bắt buộc.
- Cả ba điểm phải được xử lý có kiểm soát: không `500`, crash, treo, silent truncation hoặc dữ liệu dở dang.
- Nếu chấp nhận, chuỗi lưu phải có đúng length/hash ban đầu và order/cart nhất quán; nếu từ chối theo giới hạn triển khai, trả `400` rõ ràng, không tạo đơn/không xóa giỏ và giới hạn đó phải được đề xuất bổ sung vào SRS.

## BVA Coverage

- Robustness reference points `R - 1 = 499`, `R = 500`, `R + 1 = 501`.
- Gộp ba iteration trong một test case vì không tồn tại max boundary chuẩn để biện minh ba ca độc lập.

## Status / Related bugs

Not Run / N/A

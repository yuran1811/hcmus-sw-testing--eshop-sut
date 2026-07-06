# Phân tích & Thiết kế Test Case - Pairwise Testing

## FR-08: Thanh toán (Checkout)

### Bước 1: Trích xuất Parameters & Values

Dựa vào spec của FR-08, ta có thể xác định các tham số đầu vào (parameters) có ảnh hưởng độc lập đến chức năng thanh toán:

| Parameter                               | Values                                      | Giải thích                                            |
| --------------------------------------- | ------------------------------------------- | ----------------------------------------------------- |
| P1: Trạng thái Login                    | `Guest`, `User`                             | Đã đăng nhập hay chưa                                 |
| P2: Sản phẩm trong giỏ                  | `0`, `1`, `>1`                              | Số lượng mặt hàng trong giỏ                           |
| P3: Giá trị `total_amount` (Client gửi) | `Valid`, `Invalid_Positive`, `Invalid_Zero` | Gửi đúng giá, sai giá (lớn hơn 0), hoặc sai giá (≤ 0) |

- `Valid`: Client tính đúng và gửi lên đúng bằng giá thực tế.
- `Invalid_Positive`: Client thao túng gửi lên giá sai (VD: 1 VND).
- `Invalid_Zero`: Client thao túng gửi lên giá 0 hoặc số âm.

### Bước 2: Tính toán & Thống kê Combinatorial

- **Full combinatorial (Vét cạn)**: 2 (P1) × 3 (P2) × 3 (P3) = **18 test cases**.
- **Pairwise testing**: Chỉ cần tối thiểu **9 test cases** để cover 100% các cặp.
- **Tỷ lệ tiết kiệm**: Tiết kiệm được 9 test cases (**giảm 50%**) so với test vét cạn.

### Bước 3: Sinh Test Cases (Greedy All-Pairs)

Các test cases được sinh ra để đảm bảo mọi cặp giá trị đều xuất hiện ít nhất một lần.
Lưu ý: Mặc dù `P1=Guest` hoặc `P2=0` sẽ dẫn đến việc hệ thống chặn sớm (early return), nhưng ta vẫn ghép cặp để kiểm thử xem hệ thống có bị bypass ở các edge cases thao túng payload hay không.

| TC ID               | P1: Login | P2: Giỏ hàng | P3: `total_amount` | Kết quả mong đợi (Tóm tắt)                     |
| ------------------- | --------- | ------------ | ------------------ | ---------------------------------------------- |
| TC-CHECKOUT-PWS-001 | Guest     | 0            | Valid              | Bị chặn, yêu cầu đăng nhập                     |
| TC-CHECKOUT-PWS-002 | Guest     | 1            | Invalid_Positive   | Bị chặn, yêu cầu đăng nhập                     |
| TC-CHECKOUT-PWS-003 | Guest     | >1           | Invalid_Zero       | Bị chặn, yêu cầu đăng nhập                     |
| TC-CHECKOUT-PWS-004 | User      | 1            | Valid              | Thanh toán thành công, xóa giỏ hàng            |
| TC-CHECKOUT-PWS-005 | User      | 0            | Invalid_Positive   | Báo lỗi giỏ hàng trống                         |
| TC-CHECKOUT-PWS-006 | User      | >1           | Invalid_Positive   | Backend tự tính lại giá trị đúng và thanh toán |
| TC-CHECKOUT-PWS-007 | Guest     | 0            | Invalid_Zero       | Bị chặn, yêu cầu đăng nhập                     |
| TC-CHECKOUT-PWS-008 | User      | 1            | Invalid_Zero       | Backend tự tính lại giá trị đúng và thanh toán |
| TC-CHECKOUT-PWS-009 | User      | >1           | Valid              | Thanh toán thành công, xóa giỏ hàng            |

_(Ghi chú: Đối với các TC có P1=Guest, việc kiểm thử với tham số P3 giả mạo thường yêu cầu gọi trực tiếp qua API thay vì UI)._

### Bước 4: Bảng Coverage Matrix

Đánh giá các cặp (Pairs) đã được cover bởi test case nào:

**P1 × P2**

| P1 \ P2 | 0            | 1            | >1           |
| ------- | ------------ | ------------ | ------------ |
| Guest   | TC001, TC007 | TC002        | TC003        |
| User    | TC005        | TC004, TC008 | TC006, TC009 |

**P1 × P3**

| P1 \ P3 | Valid        | Invalid_Positive | Invalid_Zero |
| ------- | ------------ | ---------------- | ------------ |
| Guest   | TC001        | TC002            | TC003, TC007 |
| User    | TC004, TC009 | TC005, TC006     | TC008        |

**P2 × P3**

| P2 \ P3 | Valid | Invalid_Positive | Invalid_Zero |
| ------- | ----- | ---------------- | ------------ |
| 0       | TC001 | TC005            | TC007        |
| 1       | TC004 | TC002            | TC008        |
| >1      | TC009 | TC006            | TC003        |

Tất cả các ô đều có ít nhất 1 TC. **Coverage đạt 100% cho Pairwise.**

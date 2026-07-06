# Phân tích & Thiết kế Test Case - Decision Table Testing

## FR-08: Thanh toán (Checkout)

### Bước 1: Phân tích yêu cầu (Conditions & Actions)

**Conditions (điều kiện):**

- C1: Người dùng đã đăng nhập? (Y / N)
- C2: Giỏ hàng có sản phẩm? (Y / N)
- C3: Client cố tình gửi `total_amount` sai lệch lên backend? (Y / N)

**Actions (kết quả):**

- A1: Yêu cầu đăng nhập / Chặn thanh toán
- A2: Báo lỗi không thể thanh toán (giỏ hàng trống)
- A3: Cho phép thanh toán, hiển thị đầy đủ danh sách sản phẩm đặt mua
- A4: Backend tự động tính lại tổng tiền thanh toán (không chấp nhận giá trị do client gửi)
- A5: Thanh toán thành công, xóa giỏ hàng

### Bước 2: Xây dựng Bảng Đầy Đủ (Full Decision Table)

Với 3 điều kiện nhị phân, ta có tổng cộng $2^3 = 8$ rules.

| Conditions / Actions                              | R1  | R2  | R3  | R4  | R5  | R6  | R7  | R8  |
| ------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- |
| C1: Đã đăng nhập                                  | Y   | Y   | Y   | Y   | N   | N   | N   | N   |
| C2: Giỏ hàng có sản phẩm                          | Y   | Y   | N   | N   | Y   | Y   | N   | N   |
| C3: Gửi `total_amount` sai lệch                   | Y   | N   | Y   | N   | Y   | N   | Y   | N   |
| **A1: Chặn thanh toán / Yêu cầu đăng nhập**       |     |     |     |     | ✓   | ✓   | ✓   | ✓   |
| **A2: Báo lỗi không thể thanh toán (giỏ trống)**  |     |     | ✓   | ✓   |     |     |     |     |
| **A3: Cho phép thanh toán & hiển thị danh sách**  | ✓   | ✓   |     |     |     |     |     |     |
| **A4: Backend tự tính tổng tiền (bỏ qua client)** | ✓   | ✓   |     |     |     |     |     |     |
| **A5: Thanh toán thành công, xóa giỏ hàng**       | ✓   | ✓   |     |     |     |     |     |     |

**Giải thích ký hiệu:**

- `Y`: Điều kiện đúng
- `N`: Điều kiện sai
- `✓`: Hành động tương ứng được thực thi
- Khoảng trắng: Hành động không được thực thi

**Giải thích yêu cầu:**

- Nếu `C1 = N` (Chưa đăng nhập): Hệ thống luôn chặn ở bước đầu (A1), không quan tâm giỏ hàng có hay không (R5 đến R8).
- Nếu `C1 = Y` nhưng `C2 = N` (Đã đăng nhập nhưng giỏ trống): Báo lỗi giỏ hàng trống (A2) cho R3 và R4.
- Nếu `C1 = Y` và `C2 = Y` (Đăng nhập và có hàng): Tiến hành thanh toán bình thường. Dù client gửi đúng (R2) hay gửi sai `total_amount` (R1), backend vẫn tự động tính lại giá trị (A4) và thanh toán thành công (A5).

### Bước 3: Xây dựng Bảng Rút Gọn (Collapsed Decision Table)

Từ bảng đầy đủ, ta gộp các rules có cùng kết quả và điều kiện không ảnh hưởng.

| Conditions / Actions                              | Rule 1 | Rule 2 | Rule 3 | Rule 4 |
| ------------------------------------------------- | ------ | ------ | ------ | ------ |
| C1: Đã đăng nhập                                  | N      | Y      | Y      | Y      |
| C2: Giỏ hàng có sản phẩm                          | -      | N      | Y      | Y      |
| C3: Client gửi `total_amount` sai lệch            | -      | -      | N      | Y      |
| **A1: Chặn thanh toán / Yêu cầu đăng nhập**       | ✓      |        |        |        |
| **A2: Báo lỗi không thể thanh toán (giỏ trống)**  |        | ✓      |        |        |
| **A3: Cho phép thanh toán & hiển thị danh sách**  |        |        | ✓      | ✓      |
| **A4: Backend tự tính tổng tiền (bỏ qua client)** |        |        | ✓      | ✓      |
| **A5: Thanh toán thành công, xóa giỏ hàng**       |        |        | ✓      | ✓      |

_(Ký hiệu `-`: Không quan tâm / Don't care)_

### Tổng kết Test Cases

Từ bảng rút gọn, **4 test cases** đã được tạo ra (TC-CHECKOUT-DTT-001 đến 004). Chúng bao phủ (coverage) hoàn toàn các kịch bản: chưa đăng nhập, đăng nhập nhưng giỏ hàng trống, thanh toán bình thường hợp lệ, và thanh toán khi bị thao túng giá trị từ phía client (test tính toàn vẹn dữ liệu).

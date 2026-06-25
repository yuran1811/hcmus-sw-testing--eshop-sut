# BÁO CÁO THIẾT KẾ TEST CASE: CHỨC NĂNG TÍNH TIỀN PHÒNG KHÁCH SẠN (HW02)

Báo cáo này trình bày chi tiết việc áp dụng kỹ thuật **Phân hoạch tương đương (Equivalence Partitioning - EP)** và **Phân tích giá trị biên (Boundary Value Analysis - BVA)** để thiết kế các ca kiểm thử (Test Cases) cho chức năng tính tiền phòng khách sạn. Quy trình thiết kế tuân thủ nghiêm ngặt **Nguyên tắc cô lập lỗi (Error Isolation)** và **Rút gọn Test Cases (Test Case Reduction)** như đã học.

---

## 1. Mô tả Bài toán & Tham số Đầu vào/Đầu ra

### 1.1. Công thức tính tiền phòng
$$\text{Tiền phòng} = (\text{Số ngày} \times (\text{Đơn giá phòng} + \text{Phụ thu}) + \text{Tiền dịch vụ}) \times (100\% - \%\text{Giảm giá})$$

Trong đó:
*   **Số ngày** = Ngày ra – Ngày vào. Nếu Ngày vào và Ngày ra cùng chung một ngày thì tính Số ngày là 1 ngày. (Hợp lệ: $\ge 1$).
*   **Đơn giá phòng**: Đơn giá cho tối đa 2 người tùy theo Loại phòng:
    *   Loại A: 450.000 đồng/ngày.
    *   Loại B: 350.000 đồng/ngày.
    *   Loại C: 250.000 đồng/ngày.
*   **Phụ thu**: Nếu số lượng người $> 2$, phụ thu 10% đơn giá phòng cho mỗi người thêm. Số lượng người tối đa cho phép là 4 người.
    *   $\text{Số người} \le 2 \implies \text{Phụ thu} = 0$
    *   $\text{Số người} = 3 \implies \text{Phụ thu} = 1 \times 10\% \times \text{Đơn giá phòng}$
    *   $\text{Số người} = 4 \implies \text{Phụ thu} = 2 \times 10\% \times \text{Đơn giá phòng}$
    *   $\text{Số người} > 4 \implies$ Không hợp lệ (Vượt quá dung lượng tối đa).
*   **Tiền dịch vụ**: Tổng tiền dịch vụ khách hàng sử dụng ($\ge 0$).
*   **Tổng tiền trước giảm giá (X)**:
    $$X = \text{Số ngày} \times (\text{Đơn giá phòng} + \text{Phụ thu}) + \text{Tiền dịch vụ}$$
*   **%Giảm giá**:
    *   Nếu $X \ge 4.000.000$ đồng $\implies$ Giảm giá 20%
    *   Nếu $2.000.000 \le X < 4.000.000$ đồng $\implies$ Giảm giá 10%
    *   Nếu $X < 2.000.000$ đồng $\implies$ Giảm giá 0%

---

## SECTION 1: PHÂN HOẠCH TƯƠNG ĐƯƠNG (EQUIVALENCE PARTITIONING - EP)

Bước này chia miền giá trị của các tham số đầu vào và đầu ra/biến trung gian thành các phân hoạch tương đương hợp lệ (Valid Partitions) và không hợp lệ (Invalid Partitions). Tại mỗi phân hoạch, một **Giá trị đại diện** được chọn để đại diện cho toàn bộ phân hoạch.

### Bảng phân hoạch tương đương cho tham số đầu vào

| Tham số | Kiểu dữ liệu | Phân hoạch tương đương hợp lệ (Valid Partitions) | Giá trị đại diện | Phân hoạch tương đương không hợp lệ (Invalid Partitions) | Giá trị đại diện |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **RoomType** *(Loại phòng)* | String / Ký tự | - `EP-IN-ROOM-1`: Loại 'A' (Đơn giá: 450k)<br>- `EP-IN-ROOM-2`: Loại 'B' (Đơn giá: 350k)<br>- `EP-IN-ROOM-3`: Loại 'C' (Đơn giá: 250k) | 'A'<br>'B'<br>'C' | - `EP-IN-ROOM-4-INV`: Khác 'A', 'B', 'C' (Ví dụ: 'D', trống, số, ký tự đặc biệt) | 'D' |
| **NumDays** *(Số ngày)* | Số nguyên | - `EP-IN-DAYS-1`: Số ngày $\ge 1$ | 5 | - `EP-IN-DAYS-2-INV`: Số ngày $< 1$ (Ví dụ: 0, số âm) | 0 |
| **NumPeople** *(Số người)* | Số nguyên | - `EP-IN-PEOPLE-1`: $1 \le \text{Số người} \le 2$ (Phụ thu 0%)<br>- `EP-IN-PEOPLE-2`: $\text{Số người} = 3$ (Phụ thu 10% đơn giá)<br>- `EP-IN-PEOPLE-3`: $\text{Số người} = 4$ (Phụ thu 20% đơn giá) | 2<br>3<br>4 | - `EP-IN-PEOPLE-4-INV`: $\text{Số người} < 1$<br>- `EP-IN-PEOPLE-5-INV`: $\text{Số người} > 4$ (Quá tải) | 0<br>5 |
| **ServiceFee** *(Tiền dịch vụ)* | Số thực/Số nguyên | - `EP-IN-SERVICE-1`: Tiền dịch vụ $\ge 0$ | 500.000đ | - `EP-IN-SERVICE-2-INV`: Tiền dịch vụ $< 0$ | -100.000đ |

### Bảng phân hoạch tương đương cho đầu ra / biến trung gian (PreDiscountAmount)

Biến trung gian quyết định giảm giá: $X = \text{Số ngày} \times (\text{Đơn giá phòng} + \text{Phụ thu}) + \text{Tiền dịch vụ}$

| Đối tượng đầu ra | Phân hoạch tương đương hợp lệ | Giá trị đại diện | Phân hoạch tương đương không hợp lệ |
| :--- | :--- | :--- | :--- |
| **Discount Rate** *(Mức giảm giá)* | - `EP-OUT-DISC-1`: $X < 2.000.000$ (Giảm giá 0%)<br>- `EP-OUT-DISC-2`: $2.000.000 \le X < 4.000.000$ (Giảm giá 10%)<br>- `EP-OUT-DISC-3`: $X \ge 4.000.000$ (Giảm giá 20%) | 1.400.000đ<br>3.000.000đ<br>5.000.000đ | N/A (Được tính toán tự động dựa trên đầu vào hợp lệ, không có phân hoạch không hợp lệ độc lập) |

---

## SECTION 2: PHÂN TÍCH GIÁ TRỊ BIÊN (BOUNDARY VALUE ANALYSIS - BVA)

Phân tích giá trị biên tập trung vào các điểm chuyển đổi giữa các phân hoạch tương đương. Chúng ta kết hợp cả hai kỹ thuật **2-Point BVA** và **3-Point BVA** tùy thuộc vào bản chất của từng biên.

### 2.1. Cơ sở chọn lựa kỹ thuật Biên (2-Point vs 3-Point BVA)
*   **Chọn 2-Point BVA (Kiểm tra 2 điểm: Biên $B$ và điểm không hợp lệ kề biên $B \pm 1$):**
    *   Áp dụng cho các biên chuyển tiếp đơn giản hợp lệ/không hợp lệ của tham số đầu vào độc lập, cụ thể là **NumDays** (biên dưới 1) và **ServiceFee** (biên dưới 0). Với các biên này, hệ thống chỉ cần kiểm tra khả năng chặn biên (đúng/sai) đơn giản.
*   **Chọn 3-Point BVA (Kiểm tra 3 điểm: Biên $B$, điểm dưới biên $B-1$, điểm trên biên $B+1$):**
    *   Áp dụng cho các giới hạn dung lượng/tải trọng nghiêm ngặt như **NumPeople** ($1 \le \text{Số người} \le 4$). Việc kiểm tra 3 điểm cận biên giúp phát hiện lỗi lệch 1 đơn vị (off-by-one) cực kỳ phổ biến trong các biểu thức điều kiện loại trừ hoặc bao gồm phần tử.
    *   Áp dụng cho các **Ngưỡng giảm giá phức tạp (Discount Thresholds)** tại $2.000.000$đ và $4.000.000$đ. Đây là các điểm chuyển đổi logic nghiệp vụ quan trọng ảnh hưởng trực tiếp đến kết quả tính toán tài chính.

### 2.2. Bảng giá trị biên chi tiết

| Tham số / Đối tượng | Kỹ thuật biên | Điểm biên | Giá trị biên cần test | Loại điểm | Trạng thái dự kiến | Mã BVA ID |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **NumDays** *(Số ngày)* | 2-Point BVA | Biên dưới: 1 | - **1**<br>- **0** | Hợp lệ (B)<br>Không hợp lệ (B-1) | Hợp lệ<br>Báo lỗi | `BVA-DAYS-1`<br>`BVA-DAYS-2-INV` |
| **NumPeople** *(Số người)* | 3-Point BVA | Biên dưới: 1<br><br><br>Biên trên: 4 | - **0**<br>- **1**<br>- **2**<br>- **3**<br>- **4**<br>- **5** | Không hợp lệ (B-1)<br>Hợp lệ (B)<br>Hợp lệ (B+1)<br>Hợp lệ (B-1)<br>Hợp lệ (B)<br>Không hợp lệ (B+1) | Báo lỗi<br>Hợp lệ (Phụ thu 0)<br>Hợp lệ (Phụ thu 0)<br>Hợp lệ (Phụ thu 10%)<br>Hợp lệ (Phụ thu 20%)<br>Báo lỗi | `BVA-PEOPLE-1-INV`<br>`BVA-PEOPLE-2`<br>`BVA-PEOPLE-3`<br>`BVA-PEOPLE-4`<br>`BVA-PEOPLE-5`<br>`BVA-PEOPLE-6-INV` |
| **ServiceFee** *(Dịch vụ)* | 2-Point BVA | Biên dưới: 0 | - **0**<br>- **-1** | Hợp lệ (B)<br>Không hợp lệ (B-1) | Hợp lệ<br>Báo lỗi | `BVA-SERVICE-1`<br>`BVA-SERVICE-2-INV` |
| **PreDiscountAmount** *(Tiền trước giảm)* | 3-Point BVA | Ngưỡng 1: 2.000.000đ<br><br><br>Ngưỡng 2: 4.000.000đ | - **1.999.999đ**<br>- **2.000.000đ**<br>- **2.000.001đ**<br>- **3.999.999đ**<br>- **4.000.000đ**<br>- **4.000.001đ** | Dưới ngưỡng T1<br>Tại ngưỡng T1<br>Trên ngưỡng T1<br>Dưới ngưỡng T2<br>Tại ngưỡng T2<br>Trên ngưỡng T2 | Giảm giá 0%<br>Giảm giá 10%<br>Giảm giá 10%<br>Giảm giá 10%<br>Giảm giá 20%<br>Giảm giá 20% | `BVA-DISC-1`<br>`BVA-DISC-2`<br>`BVA-DISC-3`<br>`BVA-DISC-4`<br>`BVA-DISC-5`<br>`BVA-DISC-6` |

---

## SECTION 3: DERIVATION & REDUCTION (XÂY DỰNG & RÚT GỌN TEST CASES)

### 3.1. Quy trình áp dụng Nguyên tắc Cô lập Lỗi (Error Isolation)
Để đảm bảo bất kỳ lỗi nào xuất hiện đều có thể được khoanh vùng ngay lập tức, chúng ta xác định **Bộ giá trị cơ sở hợp lệ (Baseline Valid Values)**. Khi kiểm thử một phân hoạch hoặc biên cụ thể của một tham số, tham số đó sẽ thay đổi giá trị tương ứng trong khi **tất cả các tham số khác được giữ cố định tại các giá trị cơ sở hợp lệ**.

*   **Bộ giá trị cơ sở (Baseline):**
    *   `RoomType` = 'A' (Đơn giá: 450.000đ)
    *   `NumDays` = 2
    *   `NumPeople` = 2 (Phụ thu: 0)
    *   `ServiceFee` = 500.000đ
    *   *Tiền trước giảm giá cơ sở:* $2 \times 450.000 + 500.000 = 1.400.000$đ (Giảm giá 0%).

### 3.2. Danh sách Test Cases ban đầu được thiết kế (20 TCs)

1.  **TC-ROOM-001** (RoomType): RoomType = 'A', các tham số khác giữ Baseline. (Tiền trước giảm giá = 1.400.000đ, Giảm giá 0%).
2.  **TC-ROOM-002** (RoomType): RoomType = 'B', các tham số khác giữ Baseline. (Tiền trước giảm giá = 1.200.000đ, Giảm giá 0%).
3.  **TC-ROOM-003** (RoomType): RoomType = 'C', các tham số khác giữ Baseline. (Tiền trước giảm giá = 1.000.000đ, Giảm giá 0%).
4.  **TC-ROOM-004** (RoomType): RoomType = 'D' (Không hợp lệ), các tham số khác giữ Baseline. $\implies$ Kỳ vọng: Báo lỗi.
5.  **TC-DAYS-001** (NumDays BVA): NumDays = 1, các tham số khác giữ Baseline. (Tiền trước giảm giá = 950.000đ, Giảm giá 0%).
6.  **TC-DAYS-002** (NumDays BVA): NumDays = 0 (Không hợp lệ), các tham số khác giữ Baseline. $\implies$ Kỳ vọng: Báo lỗi.
7.  **TC-PEOPLE-001** (NumPeople BVA): NumPeople = 0 (Không hợp lệ), các tham số khác giữ Baseline. $\implies$ Kỳ vọng: Báo lỗi.
8.  **TC-PEOPLE-002** (NumPeople BVA): NumPeople = 1 (Hợp lệ biên dưới), các tham số khác giữ Baseline. (Tiền trước giảm giá = 1.400.000đ, Giảm giá 0%).
9.  **TC-PEOPLE-003** (NumPeople BVA): NumPeople = 2 (Hợp lệ biên dưới + 1), các tham số khác giữ Baseline. (Tiền trước giảm giá = 1.400.000đ, Giảm giá 0%).
10. **TC-PEOPLE-004** (NumPeople BVA): NumPeople = 3 (Hợp lệ biên trên - 1, Phụ thu 10%), các tham số khác giữ Baseline. (Tiền trước giảm giá = 1.490.000đ, Giảm giá 0%).
11. **TC-PEOPLE-005** (NumPeople BVA): NumPeople = 4 (Hợp lệ biên trên, Phụ thu 20%), các tham số khác giữ Baseline. (Tiền trước giảm giá = 1.580.000đ, Giảm giá 0%).
12. **TC-PEOPLE-006** (NumPeople BVA): NumPeople = 5 (Không hợp lệ biên trên + 1), các tham số khác giữ Baseline. $\implies$ Kỳ vọng: Báo lỗi.
13. **TC-SERVICE-001** (ServiceFee BVA): ServiceFee = 0 (Hợp lệ biên dưới), các tham số khác giữ Baseline. (Tiền trước giảm giá = 900.000đ, Giảm giá 0%).
14. **TC-SERVICE-002** (ServiceFee BVA): ServiceFee = -1 (Không hợp lệ biên dưới - 1), các tham số khác giữ Baseline. $\implies$ Kỳ vọng: Báo lỗi.
15. **TC-DISC-001** (PreDiscount BVA): ServiceFee = 1.099.999đ sao cho tiền trước giảm giá là 1.999.999đ (Ngưỡng T1 - 1, Giảm 0%).
16. **TC-DISC-002** (PreDiscount BVA): ServiceFee = 1.100.000đ sao cho tiền trước giảm giá là 2.000.000đ (Ngưỡng T1, Giảm 10%).
17. **TC-DISC-003** (PreDiscount BVA): ServiceFee = 1.100.001đ sao cho tiền trước giảm giá là 2.000.001đ (Ngưỡng T1 + 1, Giảm 10%).
18. **TC-DISC-004** (PreDiscount BVA): ServiceFee = 3.099.999đ sao cho tiền trước giảm giá là 3.999.999đ (Ngưỡng T2 - 1, Giảm 10%).
19. **TC-DISC-005** (PreDiscount BVA): ServiceFee = 3.100.000đ sao cho tiền trước giảm giá là 4.000.000đ (Ngưỡng T2, Giảm 20%).
20. **TC-DISC-006** (PreDiscount BVA): ServiceFee = 3.100.001đ sao cho tiền trước giảm giá là 4.000.001đ (Ngưỡng T2 + 1, Giảm 20%).

### 3.3. Quy trình Rút gọn Test Cases (Test Case Reduction)
Theo quy tắc: **"Hai Test Cases trùng nhau nếu tất cả các tham số đầu vào và kết quả đầu ra mong đợi giống hệt nhau. Khi đó, chỉ giữ lại 1 Test Case để tối ưu hóa công sức thực thi."**

Dựa vào danh sách trên, ta tiến hành phân tích sự trùng lặp:
*   **TC-ROOM-001** có dữ liệu: `RoomType` = 'A', `NumDays` = 2, `NumPeople` = 2, `ServiceFee` = 500.000đ. Kết quả expected: 1.400.000đ.
*   **TC-PEOPLE-003** có dữ liệu: `RoomType` = 'A', `NumDays` = 2, `NumPeople` = 2, `ServiceFee` = 500.000đ. Kết quả expected: 1.400.000đ.

**Kết luận:** Hai Test Cases này hoàn toàn trùng khớp về cả input và output mong đợi.
**Quyết định rút gọn:** Loại bỏ `TC-PEOPLE-003`, chỉ giữ lại một ca kiểm thử duy nhất đại diện và đánh mã định danh mới trong bộ ca kiểm thử chính thức là **TC-HOTEL-001**. Ca kiểm thử này sẽ gộp và phủ cả hai mục tiêu kiểm thử: phân hoạch phòng loại A (`EP-IN-ROOM-1`) và biên số người hợp lệ kề dưới (`BVA-PEOPLE-3`).

Sau khi rút gọn và đánh mã số đồng bộ theo định dạng `TC-HOTEL-[NUMBER]`, tổng số lượng ca kiểm thử chính thức là **19 Test Cases**.

---

## 4. Danh sách Test Cases Chính thức & Ma trận phủ (Traceability Matrix)

Dưới đây là bảng ánh xạ toàn bộ 19 ca kiểm thử chính thức đến các mã phân hoạch tương đương (EP ID) và mã giá trị biên (BVA ID) tương ứng.

| Mã Test Case | Tên Ca Kiểm Thử | Đầu vào (RoomType, NumDays, NumPeople, ServiceFee) | Kết quả kỳ vọng (Expected Output) | Mã EP / BVA được phủ |
| :--- | :--- | :--- | :--- | :--- |
| **TC-HOTEL-001** | Tính tiền phòng loại A với số người hợp lệ (2 người), không phụ thu | ('A', 2, 2, 500.000đ) | 1.400.000đ | `EP-IN-ROOM-1`, `BVA-PEOPLE-3`, `EP-IN-DAYS-1`, `EP-IN-SERVICE-1`, `EP-OUT-DISC-1` |
| **TC-HOTEL-002** | Tính tiền phòng loại B với số người hợp lệ (2 người), không phụ thu | ('B', 2, 2, 500.000đ) | 1.200.000đ | `EP-IN-ROOM-2` |
| **TC-HOTEL-003** | Tính tiền phòng loại C với số người hợp lệ (2 người), không phụ thu | ('C', 2, 2, 500.000đ) | 1.000.000đ | `EP-IN-ROOM-3` |
| **TC-HOTEL-004** | Tính tiền phòng với loại phòng không hợp lệ | ('D', 2, 2, 500.000đ) | Báo lỗi: "Loại phòng không hợp lệ" | `EP-IN-ROOM-4-INV` |
| **TC-HOTEL-005** | Tính tiền phòng với Số ngày ở nhỏ nhất hợp lệ (1 ngày) | ('A', 1, 2, 500.000đ) | 950.000đ | `BVA-DAYS-1` |
| **TC-HOTEL-006** | Tính tiền phòng với Số ngày ở bằng 0 | ('A', 0, 2, 500.000đ) | Báo lỗi: "Số ngày ở phải lớn hơn hoặc bằng 1" | `BVA-DAYS-2-INV`, `EP-IN-DAYS-2-INV` |
| **TC-HOTEL-007** | Tính tiền phòng với Số người bằng 0 | ('A', 2, 0, 500.000đ) | Báo lỗi: "Số lượng người phải từ 1 đến 4" | `BVA-PEOPLE-1-INV`, `EP-IN-PEOPLE-4-INV` |
| **TC-HOTEL-008** | Tính tiền phòng với Số người bằng 1 (Biên hợp lệ dưới) | ('A', 2, 1, 500.000đ) | 1.400.000đ | `BVA-PEOPLE-2`, `EP-IN-PEOPLE-1` |
| **TC-HOTEL-009** | Tính tiền phòng với Số người bằng 3 (Phụ thu 1 người 10%) | ('A', 2, 3, 500.000đ) | 1.490.000đ | `BVA-PEOPLE-4`, `EP-IN-PEOPLE-2` |
| **TC-HOTEL-010** | Tính tiền phòng với Số người bằng 4 (Biên hợp lệ trên, Phụ thu 2 người 10%) | ('A', 2, 4, 500.000đ) | 1.580.000đ | `BVA-PEOPLE-5`, `EP-IN-PEOPLE-3` |
| **TC-HOTEL-011** | Tính tiền phòng với Số người bằng 5 | ('A', 2, 5, 500.000đ) | Báo lỗi: "Số lượng người tối đa cho phép là 4 người" | `BVA-PEOPLE-6-INV`, `EP-IN-PEOPLE-5-INV` |
| **TC-HOTEL-012** | Tính tiền phòng với Tiền dịch vụ bằng 0 | ('A', 2, 2, 0đ) | 900.000đ | `BVA-SERVICE-1` |
| **TC-HOTEL-013** | Tính tiền phòng với Tiền dịch vụ bằng -1 | ('A', 2, 2, -1đ) | Báo lỗi: "Tiền dịch vụ không được âm" | `BVA-SERVICE-2-INV`, `EP-IN-SERVICE-2-INV` |
| **TC-HOTEL-014** | Kiểm tra ngưỡng giảm giá 0% (Tiền trước giảm = 1.999.999đ) | ('A', 2, 2, 1.099.999đ) | 1.999.999đ | `BVA-DISC-1` |
| **TC-HOTEL-015** | Kiểm tra ngưỡng giảm giá 10% (Tiền trước giảm = 2.000.000đ) | ('A', 2, 2, 1.100.000đ) | 1.800.000đ | `BVA-DISC-2`, `EP-OUT-DISC-2` |
| **TC-HOTEL-016** | Kiểm tra ngưỡng giảm giá 10% (Tiền trước giảm = 2.000.001đ) | ('A', 2, 2, 1.100.001đ) | 1.800.000,9đ (hoặc làm tròn: 1.800.001đ) | `BVA-DISC-3` |
| **TC-HOTEL-017** | Kiểm tra ngưỡng giảm giá 10% (Tiền trước giảm = 3.999.999đ) | ('A', 2, 2, 3.099.999đ) | 3.599.999,1đ (hoặc làm tròn: 3.599.999đ) | `BVA-DISC-4` |
| **TC-HOTEL-018** | Kiểm tra ngưỡng giảm giá 20% (Tiền trước giảm = 4.000.000đ) | ('A', 2, 2, 3.100.000đ) | 3.200.000đ | `BVA-DISC-5`, `EP-OUT-DISC-3` |
| **TC-HOTEL-019** | Kiểm tra ngưỡng giảm giá 20% (Tiền trước giảm = 4.000.001đ) | ('A', 2, 2, 3.100.001đ) | 3.200.000,8đ (hoặc làm tròn: 3.200.001đ) | `BVA-DISC-6` |

---

## 5. Kế hoạch xác minh (Verification Plan)

### 5.1. Xác minh thủ công
*   Người kiểm thử (hoặc giảng viên chấm bài) có thể trực tiếp mở các tệp ca kiểm thử tại đường dẫn: `tests/test-cases/hotel/TC-HOTEL-*.md` để kiểm tra chi tiết các bước thực hiện và dữ liệu đầu vào.
*   Cấu trúc của các tệp kiểm thử tuân thủ hoàn toàn biểu mẫu tiêu chuẩn, bao gồm các mục rõ ràng: Requirement ID, Preconditions, Test Data, Test Steps, Expected Result, và Status/Related bugs.

### 5.2. Các tệp kiểm thử đã tạo
Tất cả 19 ca kiểm thử đã được lưu thành công trên máy tính tại thư mục cục bộ của dự án. Người dùng có thể nhấn vào các liên kết sau để truy cập nhanh:
1.  [TC-HOTEL-001.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/hotel/TC-HOTEL-001.md) - Tính tiền loại A hợp lệ (Baseline)
2.  [TC-HOTEL-002.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/hotel/TC-HOTEL-002.md) - Tính tiền loại B hợp lệ
3.  [TC-HOTEL-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/hotel/TC-HOTEL-003.md) - Tính tiền loại C hợp lệ
4.  [TC-HOTEL-004.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/hotel/TC-HOTEL-004.md) - Loại phòng không hợp lệ
5.  [TC-HOTEL-005.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/hotel/TC-HOTEL-005.md) - Biên số ngày hợp lệ (1 ngày)
6.  [TC-HOTEL-006.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/hotel/TC-HOTEL-006.md) - Số ngày bằng 0 (Invalid)
7.  [TC-HOTEL-007.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/hotel/TC-HOTEL-007.md) - Số người bằng 0 (Invalid)
8.  [TC-HOTEL-008.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/hotel/TC-HOTEL-008.md) - Số người bằng 1 (Biên dưới)
9.  [TC-HOTEL-009.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/hotel/TC-HOTEL-009.md) - Số người bằng 3 (Phụ thu 10%)
10. [TC-HOTEL-010.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/hotel/TC-HOTEL-010.md) - Số người bằng 4 (Biên trên)
11. [TC-HOTEL-011.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/hotel/TC-HOTEL-011.md) - Số người bằng 5 (Invalid)
12. [TC-HOTEL-012.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/hotel/TC-HOTEL-012.md) - Tiền dịch vụ bằng 0 (Biên dưới)
13. [TC-HOTEL-013.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/hotel/TC-HOTEL-013.md) - Tiền dịch vụ âm (Invalid)
14. [TC-HOTEL-014.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/hotel/TC-HOTEL-014.md) - Giảm giá ngưỡng 2tr (1.999.999đ - 0% discount)
15. [TC-HOTEL-015.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/hotel/TC-HOTEL-015.md) - Giảm giá ngưỡng 2tr (2.000.000đ - 10% discount)
16. [TC-HOTEL-016.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/hotel/TC-HOTEL-016.md) - Giảm giá ngưỡng 2tr (2.000.001đ - 10% discount)
17. [TC-HOTEL-017.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/hotel/TC-HOTEL-017.md) - Giảm giá ngưỡng 4tr (3.999.999đ - 10% discount)
18. [TC-HOTEL-018.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/hotel/TC-HOTEL-018.md) - Giảm giá ngưỡng 4tr (4.000.000đ - 20% discount)
19. [TC-HOTEL-019.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/hotel/TC-HOTEL-019.md) - Giảm giá ngưỡng 4tr (4.000.001đ - 20% discount)

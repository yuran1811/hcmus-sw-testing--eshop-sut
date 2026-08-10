# Kỹ thuật thiết kế test case (theo ISTQB Foundation Level Syllabus)

Mục tiêu của bước này: trước khi đụng vào AI hay Playwright, hãy tạo ra một **bảng test
case** có căn cứ kỹ thuật rõ ràng cho tính năng bạn chọn. Đây chính là bằng chứng cho
thấy bạn "dẫn dắt AI theo từng bước của kỹ thuật đã học" chứ không phải yêu cầu AI tự
bịa ra test case.

ISTQB phân loại các kỹ thuật specification-based (black-box) chính như sau:
Equivalence Partitioning (EP), Boundary Value Analysis (BVA), Decision Table Testing, và
State Transition Testing. Cả bốn đều dựa trên đặc tả (specification), không cần biết
code bên trong — rất phù hợp để kiểm thử qua giao diện web như EShop.

## 1. Equivalence Partitioning (EP) — Phân vùng tương đương

**Ý tưởng:** chia miền dữ liệu đầu vào thành các "vùng" (partition) mà mọi giá trị trong
cùng một vùng được hệ thống xử lý giống hệt nhau. Chỉ cần test **một đại diện** mỗi vùng
là đủ, vì lý thuyết cho rằng nếu một giá trị trong vùng phát hiện lỗi, các giá trị khác
cùng vùng cũng sẽ phát hiện lỗi tương tự.

**Ví dụ áp dụng — FR-02 Đăng nhập:**
| Vùng | Mô tả | Giá trị đại diện | Kết quả mong đợi |
|---|---|---|---|
| Email hợp lệ + mật khẩu đúng | Vùng hợp lệ | `user@eshop.vn` / đúng mật khẩu | Đăng nhập thành công |
| Email hợp lệ + mật khẩu sai | Vùng không hợp lệ | `user@eshop.vn` / sai mật khẩu | Báo lỗi "sai thông tin đăng nhập" |
| Email không đúng định dạng | Vùng không hợp lệ | `user@@eshop` | Báo lỗi validate định dạng |
| Email không tồn tại | Vùng không hợp lệ | `khongtontai@eshop.vn` | Báo lỗi tài khoản không tồn tại |
| Email/mật khẩu bỏ trống | Vùng không hợp lệ | `""` | Báo lỗi bắt buộc nhập |

## 2. Boundary Value Analysis (BVA) — Phân tích giá trị biên

**Ý tưởng:** lỗi thường nằm ở *ranh giới* của một vùng tương đương (ví dụ giới hạn min/max
bị lệch 1 đơn vị — "off-by-one"), nên BVA test chính xác tại và sát cạnh biên. ISTQB có
hai biến thể: **2-value BVA** (chỉ test giá trị biên và giá trị ngay ngoài biên) và
**3-value BVA** (test giá trị dưới biên, tại biên, và trên biên).

**Ví dụ áp dụng — FR-02 Khóa tài khoản sau N lần đăng nhập sai (giả sử N = 5):**
| Test | Số lần đăng nhập sai | Kết quả mong đợi |
|---|---|---|
| Biên dưới | 4 lần | Vẫn còn 1 lần thử, tài khoản chưa khóa |
| Tại biên | 5 lần | Tài khoản bị khóa ngay sau lần thứ 5 |
| Biên trên | 6 lần (thử tiếp sau khi đã khóa) | Bị chặn dù nhập đúng mật khẩu |

**Ví dụ áp dụng — FR-07 Giỏ hàng (số lượng sản phẩm, giả sử tồn kho = 10):**
| Test | Số lượng đặt | Kết quả mong đợi |
|---|---|---|
| Biên dưới | 0 hoặc số âm | Từ chối / disable nút thêm |
| Giá trị nhỏ nhất hợp lệ | 1 | Thêm vào giỏ thành công |
| Tại biên tồn kho | 10 | Thêm thành công, hiển thị "hết hàng" cho lần sau |
| Vượt biên | 11 | Báo lỗi "vượt quá số lượng tồn kho" |

## 3. Decision Table Testing — Bảng quyết định

**Ý tưởng:** dùng khi kết quả phụ thuộc vào **tổ hợp nhiều điều kiện** (business rule
phức tạp) — liệt kê mọi tổ hợp điều kiện (cause) và hành động/kết quả tương ứng (effect).
Độ phủ tối thiểu: ít nhất một test case cho mỗi luật (rule/column) trong bảng; có thể rút
gọn các cột không thể xảy ra hoặc không ảnh hưởng tới kết quả.

**Ví dụ áp dụng — FR-09 Áp dụng mã giảm giá khi thanh toán:**
| Điều kiện | R1 | R2 | R3 | R4 |
|---|---|---|---|---|
| Mã giảm giá tồn tại? | Có | Có | Có | Không |
| Mã còn hạn sử dụng? | Có | Không | Có | – |
| Giá trị đơn hàng ≥ mức tối thiểu? | Có | – | Không | – |
| **Kết quả: áp dụng giảm giá** | ✅ Áp dụng | ❌ Báo hết hạn | ❌ Báo chưa đủ điều kiện | ❌ Báo mã không hợp lệ |

Mỗi cột R1–R4 ở trên chính là một test case.

**Ví dụ áp dụng — FR-12 Kiểm soát truy cập (phân quyền admin/user):**
| Điều kiện | R1 | R2 | R3 | R4 |
|---|---|---|---|---|
| Đã đăng nhập? | Có | Có | Không | Không |
| Vai trò = Admin? | Có | Không | – | – |
| **Kết quả: truy cập trang /admin** | ✅ Cho phép | ❌ 403 Forbidden | ❌ Redirect đăng nhập | ❌ Redirect đăng nhập |

## 4. State Transition Testing — Kiểm thử chuyển trạng thái

**Ý tưởng:** dùng cho các đối tượng có "vòng đời" với nhiều trạng thái và luật chuyển đổi
— test cả **chuyển trạng thái hợp lệ và không hợp lệ**. Biến thể nâng cao "N-switch
testing" kiểm tra chuỗi N+1 lần chuyển trạng thái liên tiếp.

**Ví dụ áp dụng — FR-10 Máy trạng thái đơn hàng (Order state machine):**

```
Pending → Confirmed → Shipping → Delivered
   │                                  ▲
   └──────────► Cancelled ────────────┘ (không hợp lệ nếu đã Delivered)
```

| Test | Trạng thái hiện tại | Hành động | Kết quả mong đợi |
|---|---|---|---|
| Chuyển hợp lệ | Pending | Xác nhận (Confirm) | → Confirmed |
| Chuyển hợp lệ | Confirmed | Giao hàng (Ship) | → Shipping |
| Chuyển hợp lệ | Shipping | Đã giao (Deliver) | → Delivered |
| Chuyển hợp lệ | Pending | Hủy (Cancel) | → Cancelled |
| Chuyển **không hợp lệ** | Delivered | Hủy (Cancel) | Từ chối, báo lỗi trạng thái không cho phép |
| Chuyển **không hợp lệ** | Cancelled | Giao hàng (Ship) | Từ chối |
| N-switch (chuỗi 2 bước) | Pending | Confirm → Ship | Cả hai bước phải thành công tuần tự |

## 5. Error Guessing (kỹ thuật dựa trên kinh nghiệm — bổ sung)

Không nằm trong 4 kỹ thuật specification-based ở trên, nhưng ISTQB xếp vào nhóm
experience-based và rất hữu ích để bổ sung các case AI hay bỏ sót: SQL injection cơ bản
trong ô tìm kiếm, dán nhiều khoảng trắng vào ô input, double-click nút submit, refresh
giữa lúc thanh toán, mất kết nối mạng giữa chừng, v.v.

## Cách tổng hợp thành ≥ 12 test case / tính năng

Gợi ý phân bổ để vừa đủ 12 case vừa đa dạng kỹ thuật (đề bài chấp nhận mọi tổ hợp
positive/negative/edge, miễn đạt tối thiểu 12):

| Kỹ thuật | Số case gợi ý |
|---|---|
| Equivalence Partitioning | 3–4 (1 positive + 2–3 negative) |
| Boundary Value Analysis | 3–4 |
| Decision Table (nếu tính năng có luật tổ hợp) | 2–4 |
| State Transition (nếu tính năng có vòng đời) | 2–3 |
| Error Guessing | 1–2 |

## Mẫu bảng test case (dùng làm input cho Bước 2 — AI sinh script)

| ID | Kỹ thuật | Tiền điều kiện | Các bước | Dữ liệu test | Kết quả mong đợi | Loại (positive/negative/edge) |
|---|---|---|---|---|---|---|
| TC-01 | EP | Đã có tài khoản | Nhập email/mật khẩu đúng → Đăng nhập | `user1@eshop.vn` / `Passw0rd!` | Vào trang chủ, hiển thị tên user | positive |
| TC-02 | EP | — | Nhập sai mật khẩu → Đăng nhập | `user1@eshop.vn` / `wrong` | Báo lỗi sai thông tin | negative |
| ... | | | | | | |

> Bảng này chính là nguồn để tạo file `data/<feature>.json` hoặc `.csv` ở Bước 3 — mỗi
> dòng dữ liệu test ánh xạ thẳng sang một phần tử trong mảng JSON/CSV, không gõ tay lại.

## Nguồn tham khảo lý thuyết
- ISTQB Foundation Level Syllabus, chương 4 "Test Analysis and Design" — mục 4.2 Black-Box Test Techniques (Equivalence Partitioning, Boundary Value Analysis, Decision Table Testing, State Transition Testing).

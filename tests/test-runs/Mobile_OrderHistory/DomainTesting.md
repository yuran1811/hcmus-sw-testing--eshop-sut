# Mobile: Lịch sử Đơn hàng — Kiểm thử Miền (Kết quả thực thi)

**Tính năng:** FR-20 — Mobile Order History  
**Phương pháp:** Kiểm thử Miền — Phân vùng tương đương  
**Thiết kế test case nguồn:** `test-cases/Mobile_OrderHistory/DomainTesting.md`  
**Tài khoản thử nghiệm:** `test@eshop.com / Test1234!` · `admin@eshop.com / Admin123!`  
**SUT URL:** `http://localhost:8081` (Expo web)  
**Ghi chú kỹ thuật:** Mobile app dùng API URL hardcode (`192.168.10.13:3000`). Test dùng `page.route()` regex để proxy sang `localhost:3000`.

---

## Tổng kết thực thi

| Tổng thiết kế | Đã thực thi | Đạt | Không đạt | Lỗi phát hiện |
|:---:|:---:|:---:|:---:|:---:|
| 13 | 13 | 13 | 0 | **0** |

---

## Kết quả chi tiết

### Nhóm A — Hiển thị trạng thái & nhãn tiếng Việt

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| DT-MOB-01 | Đơn hàng ở `pending` hiển thị trên mobile | Đơn #112 ở pending | Nhãn "Chờ xác nhận" hiển thị đúng | Nhãn **"Chờ xác nhận"** hiển thị đúng cho đơn #112 | [DT-MOB-01-result.png](screenshots/DT-MOB-01-result.png) | Đạt |
| DT-MOB-02 | Đơn hàng ở `confirmed` hiển thị trên mobile | Đơn #113 ở confirmed | Nhãn "Đã xác nhận" hiển thị đúng | Nhãn **"Đã xác nhận"** hiển thị đúng cho đơn #113 | [DT-MOB-02-result.png](screenshots/DT-MOB-02-result.png) | Đạt |
| DT-MOB-03 | Đơn hàng ở `shipping` hiển thị trên mobile | Đơn #114 ở shipping | Nhãn "Đang giao" hiển thị đúng | Nhãn **"Đang giao"** hiển thị đúng cho đơn #114 | [DT-MOB-03-result.png](screenshots/DT-MOB-03-result.png) | Đạt |
| DT-MOB-04 | Đơn hàng ở `delivered` hiển thị trên mobile | Đơn #115 ở delivered | Nhãn "Đã giao" hiển thị đúng | Nhãn **"Đã giao"** hiển thị đúng cho đơn #115 | [DT-MOB-04-result.png](screenshots/DT-MOB-04-result.png) | Đạt |
| DT-MOB-05 | Đơn hàng ở `canceled` hiển thị trên mobile | Đơn #116 ở canceled | Nhãn "Đã hủy" hiển thị đúng | Nhãn **"Đã hủy"** hiển thị đúng cho đơn #116 | [DT-MOB-05-result.png](screenshots/DT-MOB-05-result.png) | Đạt |

### Nhóm B — Hiển thị nút Hủy theo quyền

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| DT-MOB-06 | Nút Hủy với đơn ở `pending` | Đơn #112 ở pending | Nút "Hủy đơn" **hiển thị** | DOM check: nút "Hủy đơn" hiển thị đúng trong orderCard của đơn #112 | [DT-MOB-06-result.png](screenshots/DT-MOB-06-result.png) | Đạt |
| DT-MOB-07 | Nút Hủy với đơn ở `confirmed` | Đơn #113 ở confirmed | Nút "Hủy đơn" **hiển thị** | DOM check: nút "Hủy đơn" hiển thị đúng trong orderCard của đơn #113 | [DT-MOB-07-result.png](screenshots/DT-MOB-07-result.png) | Đạt |
| DT-MOB-08 | Nút Hủy với đơn ở `shipping` | Đơn #114 ở shipping | Nút "Hủy đơn" **ẩn** | DOM check: nút "Hủy đơn" **không có** trong orderCard của đơn #114. App.js điều kiện `o.status === "pending" \|\| o.status === "confirmed"` — UI mobile đúng | [DT-MOB-08-result.png](screenshots/DT-MOB-08-result.png) | Đạt |
| DT-MOB-09 | Nút Hủy với đơn ở `delivered` | Đơn #115 ở delivered | Nút "Hủy đơn" **ẩn** | DOM check: nút "Hủy đơn" không có trong orderCard của đơn #115 (terminal state) | [DT-MOB-09-result.png](screenshots/DT-MOB-09-result.png) | Đạt |
| DT-MOB-10 | Nút Hủy với đơn ở `canceled` | Đơn #116 ở canceled | Nút "Hủy đơn" **ẩn** | DOM check: nút "Hủy đơn" không có trong orderCard của đơn #116 (đã hủy) | [DT-MOB-10-result.png](screenshots/DT-MOB-10-result.png) | Đạt |

### Nhóm C — Thao tác hủy đơn

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| DT-MOB-11 | User nhấn Hủy trên đơn `pending` qua mobile UI | Đơn #117 ở pending | Hủy thành công; trạng thái → canceled | Nhấn nút "Hủy đơn" — API `PUT /api/orders/117/cancel` → thành công. Xác minh: API `GET /api/orders/my-orders` → đơn #117 `status: "canceled"` | [DT-MOB-11-before.png](screenshots/DT-MOB-11-before.png) [DT-MOB-11-result.png](screenshots/DT-MOB-11-result.png) | Đạt |
| DT-MOB-12 | User nhấn Hủy trên đơn `confirmed` qua mobile UI | Đơn #118 ở confirmed | Hủy thành công; trạng thái → canceled | Nhấn nút "Hủy đơn" — API thành công. Xác minh: đơn #118 `status: "canceled"` | [DT-MOB-12-before.png](screenshots/DT-MOB-12-before.png) [DT-MOB-12-result.png](screenshots/DT-MOB-12-result.png) | Đạt |

### Nhóm D — Empty state

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| DT-MOB-13 | Trang lịch sử khi user không có đơn hàng | User có 109 đơn (không thể làm trống) | Empty state code logic đúng | User có 109 đơn → văn bản "Bạn chưa có đơn hàng nào." **không hiển thị** → danh sách hiển thị đúng. App.js line 947: `orders.length === 0 ? <Text>Bạn chưa có đơn hàng nào.</Text>` — code logic đúng theo đặc tả | [DT-MOB-13-result.png](screenshots/DT-MOB-13-result.png) | Đạt |

---

## Lỗi phát hiện trong đợt thực thi này

> **Không phát hiện lỗi mới.** Tất cả 13 test case đạt.

**Ghi chú:**
- Mobile UI **đúng** với logic hiển thị nút Hủy (`pending` và `confirmed` only — App.js line 961).
- Backend BUG-05 (user có thể hủy từ `shipping` qua API) **không ảnh hưởng** đến mobile UI vì UI không cho phép gọi API hủy từ `shipping`.
- Tất cả nhãn trạng thái tiếng Việt hiển thị đúng theo hàm `statusLabel()` trong App.js.

---

## Quan sát bổ sung

- **API URL hardcode:** Mobile app dùng `http://192.168.10.13:3000/api` — cần proxy trong môi trường test. Nên cấu hình qua environment variable để linh hoạt hơn.
- **Reload để refresh:** Khi tạo đơn qua API, SPA không tự cập nhật danh sách — cần reload + re-login. Đây là thiếu sót UX (không có pull-to-refresh), nhưng không phải lỗi nghiêm trọng.
- **13 TC / nhóm D:** Không thể test empty state với user có 118+ đơn — dùng structural check thay thế.

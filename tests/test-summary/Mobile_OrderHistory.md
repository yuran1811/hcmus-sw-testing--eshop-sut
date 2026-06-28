# Mobile: Lịch sử Đơn hàng — Tóm tắt Kiểm thử

**Tính năng:** FR-20 — Mobile Order History  
**Phân hệ:** Pool D — Mobile (Expo React Native Web)  

---

## Tóm tắt kết quả

| Phương pháp | Thiết kế | Thực thi | Đạt | Không đạt | Tỉ lệ |
|------------|---------|---------|-----|-----------|-------|
| Domain Testing | 13 | 13 | 13 | 0 | 100% |
| BVA | 6 | 6 | 6 | 0 | 100% |
| **Tổng** | **19** | **19** | **19** | **0** | **100%** |

---

## Lỗi phát hiện

> **Không phát hiện lỗi mới trong phân hệ Mobile.**

---

## Đánh giá tổng thể

### Điểm mạnh

- **Nhãn trạng thái tiếng Việt:** Tất cả 5 trạng thái hiển thị đúng nhãn tiếng Việt rõ ràng — hàm `statusLabel()` trong App.js hoạt động đúng.
- **Logic hiển thị nút Hủy:** Mobile UI **đúng** — chỉ hiển thị nút "Hủy đơn" cho `pending` và `confirmed`. Biên B1 được thực thi nghiêm ngặt trong code UI (App.js line 961).
- **Empty state:** Code logic phân nhánh đúng `orders.length === 0` → thông báo thân thiện.
- **Thao tác hủy:** Nhấn nút Hủy trên mobile gọi API thành công và cập nhật trạng thái.

### Điểm cần lưu ý (không phải lỗi nghiêm trọng)

| # | Mô tả | Ảnh hưởng |
|---|-------|----------|
| 1 | API URL hardcode (`192.168.10.13:3000`) — không linh hoạt cho môi trường test khác | Low |
| 2 | Không có pull-to-refresh — orders chỉ fetch khi login, không cập nhật realtime | Low |
| 3 | BUG-05 (backend cho phép user hủy từ `shipping`) không bị chặn nếu gọi API trực tiếp | Đã ghi nhận ở BUG-05.md |

### Quan hệ với các lỗi đã phát hiện

| Lỗi | Liên quan mobile? | Ghi chú |
|-----|------------------|---------|
| BUG-05 (user hủy từ shipping) | Gián tiếp | Mobile UI KHÔNG cho phép — biên B1 đúng trong UI. Nhưng attacker vẫn gọi API trực tiếp được |
| BUG-06 (admin không hủy từ shipping) | Không | Chỉ ảnh hưởng admin panel |
| BUG-07 (user token vào admin API) | Không | Chỉ ảnh hưởng admin API |
| BUG-08 (XSS trong admin panel) | Không | Chỉ ảnh hưởng admin panel |

---

## Kết luận

Mobile app FR-20 **hoạt động đúng theo đặc tả** — tất cả nhãn tiếng Việt, logic hiển thị nút hủy, và thao tác hủy đơn đều đúng. Phân hệ mobile không phát sinh lỗi mới. Các lỗi phát hiện trong toàn dự án (BUG-05 đến BUG-08) đều nằm ở tầng backend hoặc admin panel, không ảnh hưởng trực tiếp đến mobile UI.

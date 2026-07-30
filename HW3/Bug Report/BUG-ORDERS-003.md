# [BUG][Admin Orders] Thiếu hộp thoại xác nhận khi chuyển trạng thái đơn hàng và báo lỗi bằng window.alert

## Found by Test Case

- GUI-ORDERS-IA04-05, GUI-ORDERS-IA04-07

## Requirement liên quan

- FR-10, FR-24

## Severity / Priority

- **Severity**: Major
- **Priority**: P1

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5174 (tab Orders)
- Build/Commit: 9b1ecea

## Steps to reproduce

1. Tại danh sách đơn hàng Admin, nhấn bất kỳ nút chuyển trạng thái nào (ví dụ: "Xác nhận", "Giao hàng", "Hủy")
2. Thử thực hiện khi ngắt kết nối API

## Expected result

- Hiển thị hộp thoại xác nhận (Confirm dialog/modal) trước khi cập nhật; hiển thị thông báo lỗi trên UI khi API thất bại

## Actual result

- Hành động cập nhật trạng thái thực thi ngay lập tức mà không hỏi xác nhận; khi API lỗi hệ thống bật popup alert gốc

## Evidence

- Screenshot: ![Screenshot](../../Evidences/GUI-ORDERS-IA04-05.png)

---

## GitHub Issue Draft

```markdown
**Title**: [BUG][Admin Orders] Thiếu hộp thoại xác nhận khi chuyển trạng thái đơn hàng và báo lỗi bằng window.alert

**Description**:
### Preconditions
- SUT application running on local environment.
- Google Chrome browser.

### Steps to Reproduce
1. Tại danh sách đơn hàng Admin, nhấn bất kỳ nút chuyển trạng thái nào (ví dụ: "Xác nhận", "Giao hàng", "Hủy")
2. Thử thực hiện khi ngắt kết nối API

### Expected Behavior
Hiển thị hộp thoại xác nhận (Confirm dialog/modal) trước khi cập nhật; hiển thị thông báo lỗi trên UI khi API thất bại

### Actual Behavior
Hành động cập nhật trạng thái thực thi ngay lập tức mà không hỏi xác nhận; khi API lỗi hệ thống bật popup alert gốc

### Evidence
![Screenshot](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/blob/main/HW3/Evidences/GUI-ORDERS-IA04-05.png?raw=true)
```

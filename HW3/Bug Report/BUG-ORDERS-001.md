# [BUG][Admin Orders] Lỗ hổng XSS do chèn địa chỉ giao hàng bằng dangerouslySetInnerHTML

## Found by Test Case

- GUI-ORDERS-IA01-05

## Requirement liên quan

- FR-18, SEC-04

## Severity / Priority

- **Severity**: Critical
- **Priority**: P0

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5174 (tab Orders)
- Build/Commit: 9b1ecea

## Steps to reproduce

1. Đăng nhập Admin tại http://localhost:5174
2. Chuyển sang tab "Đơn hàng"
3. Tạo đơn hàng có chứa thẻ HTML/Script trong địa chỉ (ví dụ: "<b>Address</b><script>alert(1)</script>")
4. Quan sát cột Địa chỉ trong bảng quản lý đơn hàng

## Expected result

- Địa chỉ được escape và hiển thị dưới dạng chuỗi văn bản thuần (plain text)

## Actual result

- Cột địa chỉ thực thi/render thô các thẻ HTML (dữ liệu in đậm, chạy mã script) do React component sử dụng dangerouslySetInnerHTML={{ __html: o.shipping_address }}

## Evidence

- Screenshot: ![Screenshot](../../Evidences/GUI-ORDERS-IA01-05.png)

---

## GitHub Issue Draft

```markdown
**Title**: [BUG][Admin Orders] Lỗ hổng XSS do chèn địa chỉ giao hàng bằng dangerouslySetInnerHTML

**Description**:
### Preconditions
- SUT application running on local environment.
- Google Chrome browser.

### Steps to Reproduce
1. Đăng nhập Admin tại http://localhost:5174
2. Chuyển sang tab "Đơn hàng"
3. Tạo đơn hàng có chứa thẻ HTML/Script trong địa chỉ (ví dụ: "<b>Address</b><script>alert(1)</script>")
4. Quan sát cột Địa chỉ trong bảng quản lý đơn hàng

### Expected Behavior
Địa chỉ được escape và hiển thị dưới dạng chuỗi văn bản thuần (plain text)

### Actual Behavior
Cột địa chỉ thực thi/render thô các thẻ HTML (dữ liệu in đậm, chạy mã script) do React component sử dụng dangerouslySetInnerHTML={{ __html: o.shipping_address }}

### Evidence
![Screenshot](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/blob/main/HW3/Evidences/GUI-ORDERS-IA01-05.png?raw=true)
```

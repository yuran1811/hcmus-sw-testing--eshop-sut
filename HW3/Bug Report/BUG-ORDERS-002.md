# [BUG][Admin Orders] Thiếu chỉ báo loading và container trạng thái rỗng khi danh sách đơn rỗng

## Found by Test Case

- GUI-ORDERS-IA04-01, GUI-ORDERS-IA04-02

## Requirement liên quan

- FR-24

## Severity / Priority

- **Severity**: Minor
- **Priority**: P2

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5174 (tab Orders)
- Build/Commit: 9b1ecea

## Steps to reproduce

1. Đăng nhập Admin và chuyển sang tab "Đơn hàng"
2. Quan sát màn hình trong quá trình tải dữ liệu từ API và trường hợp cơ sở dữ liệu chưa có đơn hàng nào

## Expected result

- Hiển thị spinner loading khi đang tải API; hiển thị banner "Chưa có đơn hàng nào" khi danh sách trống

## Actual result

- Bảng gián đoạn hiển thị ngay tbody rỗng mà không có spinner hoặc thông báo trạng thái rỗng

## Evidence

- Screenshot: ![Screenshot](../../Evidences/GUI-ORDERS-IA04-01.png)

---

## GitHub Issue Draft

```markdown
**Title**: [BUG][Admin Orders] Thiếu chỉ báo loading và container trạng thái rỗng khi danh sách đơn rỗng

**Description**:
### Preconditions
- SUT application running on local environment.
- Google Chrome browser.

### Steps to Reproduce
1. Đăng nhập Admin và chuyển sang tab "Đơn hàng"
2. Quan sát màn hình trong quá trình tải dữ liệu từ API và trường hợp cơ sở dữ liệu chưa có đơn hàng nào

### Expected Behavior
Hiển thị spinner loading khi đang tải API; hiển thị banner "Chưa có đơn hàng nào" khi danh sách trống

### Actual Behavior
Bảng gián đoạn hiển thị ngay tbody rỗng mà không có spinner hoặc thông báo trạng thái rỗng

### Evidence
![Screenshot](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/blob/main/HW3/Evidences/GUI-ORDERS-IA04-01.png?raw=true)
```

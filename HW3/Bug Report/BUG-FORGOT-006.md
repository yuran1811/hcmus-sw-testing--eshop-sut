# [BUG][Forgot Password] Regex kiểm tra mật khẩu bắt buộc khoảng trắng thay vì ký tự đặc biệt

## Found by Test Case

- GUI-FORGOT-IA02-10

## Requirement liên quan

- FR-01, FR-03

## Severity / Priority

- **Severity**: Critical
- **Priority**: P0

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/forgot-password
- Build/Commit: 9b1ecea

## Steps to reproduce

1. Nhập email hợp lệ để sang Bước 2
2. Nhập mã OTP đúng và nhập Mật khẩu mới chuẩn bảo mật chứa ký tự đặc biệt "Test1234!"
3. Nhấn "Đặt lại mật khẩu"

## Expected result

- Hệ thống chấp nhận mật khẩu chứa ký tự đặc biệt và thực hiện đổi mật khẩu

## Actual result

- Hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT" do Regex trong source code bắt buộc chứa ký tự khoảng trắng (\s) thay vì ký tự đặc biệt

## Evidence

- Screenshot: ![Screenshot](../../Evidences/GUI-FORGOT-IA02-10.png)

---

## GitHub Issue Draft

```markdown
**Title**: [BUG][Forgot Password] Regex kiểm tra mật khẩu bắt buộc khoảng trắng thay vì ký tự đặc biệt

**Description**:
### Preconditions
- SUT application running on local environment.
- Google Chrome browser.

### Steps to Reproduce
1. Nhập email hợp lệ để sang Bước 2
2. Nhập mã OTP đúng và nhập Mật khẩu mới chuẩn bảo mật chứa ký tự đặc biệt "Test1234!"
3. Nhấn "Đặt lại mật khẩu"

### Expected Behavior
Hệ thống chấp nhận mật khẩu chứa ký tự đặc biệt và thực hiện đổi mật khẩu

### Actual Behavior
Hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT" do Regex trong source code bắt buộc chứa ký tự khoảng trắng (\s) thay vì ký tự đặc biệt

### Evidence
![Screenshot](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/blob/main/HW3/Evidences/GUI-FORGOT-IA02-10.png?raw=true)
```

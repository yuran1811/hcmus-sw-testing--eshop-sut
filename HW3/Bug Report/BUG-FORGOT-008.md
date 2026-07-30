# [BUG][Forgot Password] Không chuyển hướng về trang Login sau khi đổi mật khẩu thành công

## Found by Test Case

- GUI-FORGOT-IA04-03, GUI-FORGOT-IA04-05

## Requirement liên quan

- FR-03, FR-24

## Severity / Priority

- **Severity**: Major
- **Priority**: P1

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/forgot-password
- Build/Commit: 9b1ecea

## Steps to reproduce

1. Tại Bước 2, nhập OTP đúng và mật khẩu mới hợp lệ (chứa khoảng trắng theo regex)
2. Nhấn nút "Đặt lại mật khẩu"

## Expected result

- Bật alert báo thành công và lập tức chuyển hướng người dùng về trang Đăng nhập (/login)

## Actual result

- Người dùng vẫn ở nguyên tại trang /forgot-password, các ô nhập mật khẩu và mã OTP vẫn giữ nguyên không bị xóa

## Evidence

- Screenshot: ![Screenshot](../../Evidences/GUI-FORGOT-IA04-03.png)

---

## GitHub Issue Draft

```markdown
**Title**: [BUG][Forgot Password] Không chuyển hướng về trang Login sau khi đổi mật khẩu thành công

**Description**:
### Preconditions
- SUT application running on local environment.
- Google Chrome browser.

### Steps to Reproduce
1. Tại Bước 2, nhập OTP đúng và mật khẩu mới hợp lệ (chứa khoảng trắng theo regex)
2. Nhấn nút "Đặt lại mật khẩu"

### Expected Behavior
Bật alert báo thành công và lập tức chuyển hướng người dùng về trang Đăng nhập (/login)

### Actual Behavior
Người dùng vẫn ở nguyên tại trang /forgot-password, các ô nhập mật khẩu và mã OTP vẫn giữ nguyên không bị xóa

### Evidence
![Screenshot](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/blob/main/HW3/Evidences/GUI-FORGOT-IA04-03.png?raw=true)
```

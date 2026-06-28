# BUG-MOBILE-003: Thời gian khóa tài khoản là 180 giây thay vì 30 giây theo spec

## Found by Test Case

TC-MOBILE_LOGIN-009, TC-MOBILE_LOGIN-011

## Requirement liên quan

FR-20 / FR-02 (Tài khoản bị khóa **30 giây** sau khi sai từ 3 lần liên tiếp)

## Severity / Priority

Major / P2

## Environment

- Browser: Chromium (Desktop Chrome, giả lập mobile web)
- OS: Windows 11
- URL: http://localhost:8081 (frontend-mobile — Expo Web) + API http://localhost:3000
- Build: nhánh `anh-khoa`, commit `a7b11fd`

## Steps to reproduce

**Kịch bản A — TC-MOBILE_LOGIN-009 (Kiểm thời gian khóa thực tế):**
1. Reset trạng thái tài khoản `test@eshop.com`
2. Đăng nhập sai 3 lần liên tiếp (kích hoạt khóa)
3. Đọc giá trị `locked_until` từ database
4. Tính khoảng cách giữa `locked_until` và `Date.now() + 30 giây`

**Kịch bản B — TC-MOBILE_LOGIN-011 (Thử đăng nhập đúng sau 30 giây):**
1. Kích hoạt khóa bằng 3 lần sai liên tiếp
2. Chờ **30 giây** (đúng thời gian spec)
3. Đăng nhập lại với thông tin đúng

## Expected result

- Kịch bản A: `|locked_until - (now + 30s)| < 5000ms` (thời gian khóa xấp xỉ 30 giây)
- Kịch bản B: Đăng nhập thành công sau 30 giây, hiển thị "Chào, ..."

## Actual result

- Kịch bản A: Sai lệch **149,860ms ≈ 150 giây** so với expected → thời gian khóa thực tế là **~180 giây (3 phút)**, không phải 30 giây
- Kịch bản B: Sau 30 giây vẫn **không đăng nhập được** (vì tài khoản còn bị khóa thêm ~150 giây nữa), phần tử "Chào," không xuất hiện

```
TC-009: Expected < 5000 — Received: 149860
TC-011: expect(loggedInHeader).toBeVisible() — element(s) not found (sau chờ 30s)
```

## Evidence

- Screenshot TC-009: `![BUG-MOBILE-003-lock-duration](../screenshots/BUG-MOBILE-003-lock-duration-180s.png)`
- Screenshot TC-011: `![BUG-MOBILE-003-still-locked](../screenshots/BUG-MOBILE-003-still-locked-30s.png)`
- Playwright log: `expect(received).toBeLessThan(5000) — Received: 149860`

## Notes

Do **BUG-MOBILE-002** (bộ đếm +2/lần), tài khoản thực tế bị khóa sau **2 lần sai** thay vì 3 lần. Thêm vào đó, thời gian khóa là 180 giây thay vì 30 giây. Hai lỗi này kết hợp tạo ra trải nghiệm người dùng rất tệ: khóa sớm hơn (2 thay vì 3 lần sai) và khóa lâu hơn (180s thay vì 30s).

TC-MOBILE_LOGIN-012 (BVA: vẫn còn khóa tại t=29s) PASS, nhưng đây là **false positive** — test pass vì khóa 180s chưa hết tại t=29s, không phải vì hệ thống hoạt động đúng theo spec 30s.

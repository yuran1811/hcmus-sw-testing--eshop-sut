# BUG-LOGIN-005: Cơ chế khóa tài khoản sai lệch đặc tả — bộ đếm tăng +2 mỗi lần sai và khóa 180 giây thay vì 30 giây

> **GitHub Issue:** [#284](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/284) — đã tạo ngày 2026-08-15, label: `type:bug`, `status:new`, `priority:P1`, `severity:critical`, `module:login`, `found-by:code-review`, `hw05-perf-testing`

## Found by Test Case

Phát hiện độc lập khi **đọc `backend/server.js` để thiết kế phần xử lý account lockout cho test plan hiệu năng HW05** (`performance-testing/23127211_Review_Notes.md` mục #3). Hai issue gốc (#88, #89) được phát hiện qua kiểm thử module Mobile.

## Requirement liên quan

FR-02 (Đăng nhập & Khóa tài khoản)

## Severity / Priority

Critical / P1 (theo issue #88) — giữ nguyên mức đã đánh giá ở issue gốc.

## Environment

- Backend: Node.js v20.20.2 + Express + SQLite
- OS: Ubuntu 22.04.5 LTS (WSL2)
- URL: `http://localhost:3000`
- Build: nhánh `hw05/23127211`, commit `7f0d46c`
- Mã nguồn liên quan: `backend/server.js:54-58`

## Steps to reproduce

1. Khởi động backend, đảm bảo tài khoản `test@eshop.com` chưa bị khóa:

   ```sql
   UPDATE users SET login_attempts = 0, locked_until = NULL WHERE email = 'test@eshop.com';
   ```

2. Gọi API đăng nhập với **mật khẩu sai**, đúng **2 lần**:

   ```bash
   curl -s -X POST http://localhost:3000/api/login \
     -H 'Content-Type: application/json' \
     -d '{"email":"test@eshop.com","password":"WrongPass1!"}'
   ```

3. Gọi lần thứ 3 với **mật khẩu đúng** (`Test1234!`) và quan sát phản hồi.
4. Đo thời gian cho tới khi đăng nhập lại được.

## Expected result

Theo FR-02 trong `README.md`:

- Mỗi lần đăng nhập sai, bộ đếm tăng **đúng 1 đơn vị**.
- Chỉ khi sai **từ 3 lần trở lên** liên tiếp thì tài khoản mới bị tạm khóa.
- Thời gian khóa là **30 giây** (môi trường demo).

## Actual result

- Mỗi lần đăng nhập sai, bộ đếm tăng **2 đơn vị** ⇒ tài khoản bị khóa ngay sau **2 lần sai**, không phải 3.
- Thời gian khóa thực tế là **180 000 ms = 180 giây (3 phút)**, gấp **6 lần** đặc tả.

Trích `backend/server.js:54-58`:

```js
} else {
  const newAttempts = user.login_attempts + 2;          // <-- +2 thay vì +1
  let lockedUntil = null;
  if (newAttempts >= 3) {
    lockedUntil = new Date(Date.now() + 180000).toISOString();  // <-- 180s thay vì 30s
  }
  ...
}
```

## Impact

Ngoài ảnh hưởng tới người dùng cuối đã nêu ở issue #88/#89, bug này còn có **ảnh hưởng riêng tới kiểm thử hiệu năng** chưa được ghi nhận ở hai issue gốc:

1. Với Stress test (400 VU) và Spike test (500 VU) dùng chung một tài khoản, chỉ cần **2** request đăng nhập thất bại (do timeout dưới tải, không phải do sai mật khẩu) là tài khoản bị khóa **3 phút** — dài hơn cả thời lượng bài Spike test (2 phút). Toàn bộ số liệu sau thời điểm đó sẽ phản ánh hành vi của endpoint trả lỗi khóa, **không phải hiệu năng thật**.
2. Vì thời gian khóa (180 s) dài hơn nhiều so với đặc tả (30 s), quy trình reset giữa các lần đo bắt buộc phải thao tác trực tiếp vào database thay vì chỉ chờ hết thời gian khóa.

Biện pháp phòng ngừa đã áp dụng trong HW05: file `users.csv` chỉ chứa mật khẩu **đúng**, kèm assertion phân biệt HTTP 401 (sai mật khẩu) với HTTP 403 (tài khoản bị khóa) để phát hiện sớm nếu lockout bị kích hoạt ngoài ý muốn.

## Evidence

- Trích mã nguồn `backend/server.js:54-58`.
- Quy trình reset lockout: `performance-testing/23127211_Workload_Model.md` §3.
- Phân tích ảnh hưởng tới test plan: `performance-testing/23127211_Review_Notes.md` mục #3.
- Ảnh chụp GitHub Issue #284: `tests/bug-reports/screenshots/issue-284.png` ✅
- Ảnh chụp danh sách 5 issue HW05 (lọc theo `label:hw05-perf-testing`): `tests/bug-reports/screenshots/issues-list-hw05.png` ✅
- Screenshot bổ sung cần sinh viên tự chụp: màn hình terminal 3 lần gọi `POST /api/login` và thời gian khóa 👤

## Notes

- Sai lệch nằm ở backend dùng chung, nên nhãn `module:mobile` ở hai issue gốc (#88, #89) chưa phản ánh đúng phạm vi ảnh hưởng — web, admin và mobile đều gọi chung endpoint `POST /api/login`. Báo cáo này gắn `module:login` để phản ánh đúng.
- Khi sửa, phải sửa **cả hai sai lệch cùng lúc** trong cùng một khối `else` (`backend/server.js:54-58`): đổi `+ 2` thành `+ 1` và đổi `180000` thành `30000`. Sửa một nửa sẽ vẫn còn sai đặc tả.
- Đề nghị người phụ trách triage cân nhắc gộp #88, #89 và issue này thành một hồ sơ duy nhất ở tầng backend sau khi xác nhận.

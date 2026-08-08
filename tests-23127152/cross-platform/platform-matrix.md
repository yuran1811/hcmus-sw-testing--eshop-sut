# Platform Matrix — Login + Profile (HW03 SV 23127152)

> **Trạng thái:** Chrome + Firefox **đã chạy** (2026-08-01, re-capture cửa sổ thật). Safari — chờ test thủ công.  
> **Cách chụp:** mở **Google Chrome** / **Firefox (Playwright Nightly)** headed → `screencapture -l` cửa sổ OS (thấy tab + thanh URL `localhost:5173`) → watermark `23127152@hcmus.edu.vn`.  
> Script: `tests-23127152/test-runs/execute-task3-real.mjs`

- **Platform 1:** Google Chrome (real, macOS) — cửa sổ headed + OS screenshot
- **Platform 2:** Firefox / Nightly (Playwright Firefox build, macOS) — cửa sổ headed + OS screenshot
- **Platform 3:** Safari (macOS) — **Not Run** (SV test thủ công)
- **SUT URL:** http://localhost:5173/
- **Watermark:** `23127152@hcmus.edu.vn`
- **OS:** Darwin 25.5.0

## Kết quả

| ID | Item (tóm tắt) | Chrome | Firefox | Safari |
|----|----------------|--------|---------|--------|
| LOGIN-COM-01 | So sánh bố cục Login Chrome ↔ Firefox | Passed — `chrome_LOGIN-COM-01_comLayout.png` | Passed — `firefox_LOGIN-COM-01_comLayout.png` | Not Run |
| LOGIN-COM-02 | Dấu tiếng Việt trên Login | Passed — `chrome_LOGIN-COM-02_viTextLogin.png` | Passed — `firefox_LOGIN-COM-02_viTextLogin.png` | Not Run |
| LOGIN-VIS-01 | Card form Login căn giữa | Passed — `chrome_LOGIN-VIS-01_loginCard.png` | Passed — `firefox_LOGIN-VIS-01_loginCard.png` | Not Run |
| LOGIN-VIS-02 | Tiêu đề h2 phải là Đăng nhập | Failed — `chrome_LOGIN-VIS-02_loginTitle.png` (h2="Đăng Ký") | Failed — `firefox_LOGIN-VIS-02_loginTitle.png` | Not Run |
| LOGIN-RES-01 | Login desktop không cuộn ngang | Passed — `chrome_LOGIN-RES-01_noHScroll.png` | Passed — `firefox_LOGIN-RES-01_noHScroll.png` | Not Run |
| LOGIN-RES-03 | Login hẹp (~390) không cuộn ngang | Passed — `chrome_LOGIN-RES-03_noHScroll.png` (cửa sổ hẹp) | Passed — `firefox_LOGIN-RES-03_noHScroll.png` (DOM check; FF khó ép resize cửa sổ) | Not Run |
| LOGIN-FUN-03 | Ô mật khẩu type=password | Failed — `chrome_LOGIN-FUN-03_pwdType.png` (type=text) | Failed — `firefox_LOGIN-FUN-03_pwdType.png` | Not Run |
| PROFILE-COM-01 | So sánh bố cục Profile Chrome ↔ Firefox | Passed — `chrome_PROFILE-COM-01_profileLayout.png` | Passed — `firefox_PROFILE-COM-01_profileLayout.png` | Not Run |
| PROFILE-COM-02 | Dấu tiếng Việt trên Profile | Passed — `chrome_PROFILE-COM-02_viTextProfile.png` | Passed — `firefox_PROFILE-COM-02_viTextProfile.png` | Not Run |
| PROFILE-VIS-01 | Bố cục 2 cột Profile | Passed — `chrome_PROFILE-VIS-01_profileLayout.png` | Passed — `firefox_PROFILE-VIS-01_profileLayout.png` | Not Run |
| PROFILE-VIS-02 | Card form hồ sơ | Passed — `chrome_PROFILE-VIS-02_profileFormCard.png` | Passed — `firefox_PROFILE-VIS-02_profileFormCard.png` | Not Run |
| PROFILE-VIS-04 | Email disabled | Passed — `chrome_PROFILE-VIS-04_emailDisabled.png` | Passed — `firefox_PROFILE-VIS-04_emailDisabled.png` | Not Run |
| PROFILE-RES-01 | Profile desktop không cuộn ngang | Passed — `chrome_PROFILE-RES-01_noHScroll.png` | Passed — `firefox_PROFILE-RES-01_noHScroll.png` | Not Run |
| PROFILE-RES-03 | Profile hẹp không cuộn ngang | Passed — `chrome_PROFILE-RES-03_noHScroll.png` | Passed — `firefox_PROFILE-RES-03_noHScroll.png` | Not Run |

## Phân loại defect

| ID | Fail trên | Phân loại |
|----|-----------|-----------|
| LOGIN-VIS-02 | Chrome + Firefox (cả 2) | Defect chung Task 1 — `BUG-LOGIN-001` (không phải lỗi riêng platform) |
| LOGIN-FUN-03 | Chrome + Firefox (cả 2) | Defect chung Task 1 — `BUG-LOGIN-005` (không phải lỗi riêng platform) |

**Không có** defect chỉ fail trên 1/2 platform trong lần chạy này.

## Tóm tắt

| Metric | Chrome | Firefox | Safari |
|--------|--------|---------|--------|
| Items tested | 14 | 14 | 0 |
| Passed | 12 | 12 | — |
| Failed | 2 | 2 | — |
| Pass rate | 12/14 (86%) | 12/14 (86%) | — |

- Bug platform-specific mới: **không**
- Screenshots watermarked: **28** file trong `cross-platform/screenshots/` (cửa sổ browser thật)
- Raw: `screenshots/_raw_real/`
- **Còn lại:** Safari macOS thủ công — điền cột Safari, ảnh `safari_<ID>_*.png` + watermark

## Screenshots

Thư mục: [`screenshots/`](./screenshots/)

# Platform Matrix — Login + Profile (HW03 SV 23127152)

- **Platform 1:** Google Chrome (macOS) — cửa sổ headed + OS screenshot
- **Platform 2:** Firefox / Nightly (macOS) — cửa sổ headed + OS screenshot
- **SUT URL:** http://localhost:5173/
- **Watermark:** `23127152@hcmus.edu.vn`
- **OS:** Darwin 25.5.0
- **Ngày chạy:** 2026-08-01

## Kết quả

| ID | Item (tóm tắt) | Chrome | Firefox |
|----|----------------|--------|---------|
| LOGIN-COM-01 | So sánh bố cục Login | Passed — `chrome_LOGIN-COM-01_comLayout.png` | Passed — `firefox_LOGIN-COM-01_comLayout.png` |
| LOGIN-COM-02 | Dấu tiếng Việt trên Login | Passed — `chrome_LOGIN-COM-02_viTextLogin.png` | Passed — `firefox_LOGIN-COM-02_viTextLogin.png` |
| LOGIN-VIS-01 | Card form Login căn giữa | Passed — `chrome_LOGIN-VIS-01_loginCard.png` | Passed — `firefox_LOGIN-VIS-01_loginCard.png` |
| LOGIN-VIS-02 | Tiêu đề h2 phải là Đăng nhập | Failed — `chrome_LOGIN-VIS-02_loginTitle.png` | Failed — `firefox_LOGIN-VIS-02_loginTitle.png` |
| LOGIN-RES-01 | Login desktop không cuộn ngang | Passed — `chrome_LOGIN-RES-01_noHScroll.png` | Passed — `firefox_LOGIN-RES-01_noHScroll.png` |
| LOGIN-RES-03 | Login hẹp không cuộn ngang | Passed — `chrome_LOGIN-RES-03_noHScroll.png` | Passed — `firefox_LOGIN-RES-03_noHScroll.png` |
| LOGIN-FUN-03 | Ô mật khẩu type=password | Failed — `chrome_LOGIN-FUN-03_pwdType.png` | Failed — `firefox_LOGIN-FUN-03_pwdType.png` |
| PROFILE-COM-01 | So sánh bố cục Profile | Passed — `chrome_PROFILE-COM-01_profileLayout.png` | Passed — `firefox_PROFILE-COM-01_profileLayout.png` |
| PROFILE-COM-02 | Dấu tiếng Việt trên Profile | Passed — `chrome_PROFILE-COM-02_viTextProfile.png` | Passed — `firefox_PROFILE-COM-02_viTextProfile.png` |
| PROFILE-VIS-01 | Bố cục 2 cột Profile | Passed — `chrome_PROFILE-VIS-01_profileLayout.png` | Passed — `firefox_PROFILE-VIS-01_profileLayout.png` |
| PROFILE-VIS-02 | Card form hồ sơ | Passed — `chrome_PROFILE-VIS-02_profileFormCard.png` | Passed — `firefox_PROFILE-VIS-02_profileFormCard.png` |
| PROFILE-VIS-04 | Email disabled | Passed — `chrome_PROFILE-VIS-04_emailDisabled.png` | Passed — `firefox_PROFILE-VIS-04_emailDisabled.png` |
| PROFILE-RES-01 | Profile desktop không cuộn ngang | Passed — `chrome_PROFILE-RES-01_noHScroll.png` | Passed — `firefox_PROFILE-RES-01_noHScroll.png` |
| PROFILE-RES-03 | Profile hẹp không cuộn ngang | Passed — `chrome_PROFILE-RES-03_noHScroll.png` | Passed — `firefox_PROFILE-RES-03_noHScroll.png` |

## Phân loại defect

| ID | Fail trên | Phân loại |
|----|-----------|-----------|
| LOGIN-VIS-02 | Chrome + Firefox | Defect chung Task 1 — `BUG-LOGIN-001` |
| LOGIN-FUN-03 | Chrome + Firefox | Defect chung Task 1 — `BUG-LOGIN-005` |

**Không có** defect chỉ fail trên một trình duyệt trong lần chạy này.

## Tóm tắt

| Metric | Chrome | Firefox |
|--------|--------|---------|
| Items tested | 14 | 14 |
| Passed | 12 | 12 |
| Failed | 2 | 2 |
| Pass rate | 12/14 (86%) | 12/14 (86%) |

Screenshots watermarked: thư mục [`screenshots/`](./screenshots/).

# Android + Expo Go

- **Ngày kiểm thử:** 03/08/2026
- **Phiên bản Expo Go:** 2.31.0
- **Thiết bị / Hệ điều hành:** Android (Samsung Galaxy S9+ / Android 10)
- **URL Local:** N/A (Chạy qua Metro Bundler Expo)
- **Công cụ kiểm thử từ xa / Tunnel:** Metro Bundler
- **Email overlay:** `mqtan23@clc.fitus.edu.vn`

## Lỗi phát hiện (Issues)

Phát hiện 7 lỗi giao diện (được ghi nhận chi tiết tại các báo cáo lỗi GUI của Task 1 hoặc trong checklist):

- [**BUG-HOME-GUI-IA02-013**](../../../bug-reports/gui/home/BUG-HOME-GUI-IA02-013/BUG-HOME-GUI-IA02-013.md): [BUG][Home] Placeholder ô tìm kiếm chưa đủ rõ (chỉ có `Tìm kiếm...` thay vì mô tả rõ hành động)
- [**BUG-HOME-GUI-IA02-018**](../../../bug-reports/gui/home/BUG-HOME-GUI-IA02-018/BUG-HOME-GUI-IA02-018.md): [BUG][Home] Xóa ô tìm kiếm không tự động reset danh sách sản phẩm (yêu cầu người dùng nhấn nút Tìm một lần nữa)
- [**BUG-HOME-GUI-IA03-021**](../../../bug-reports/gui/home/BUG-HOME-GUI-IA03-021/BUG-HOME-GUI-IA03-021.md): [BUG][Home] Navbar không có active state cho Trang Chủ
- [**BUG-HOME-GUI-IA03-029**](../../../bug-reports/gui/home/BUG-HOME-GUI-IA03-029/BUG-HOME-GUI-IA03-029.md): [BUG][Home] Footer không có link điều hướng (chỉ có text bản quyền)
- [**BUG-HOME-GUI-IA04-037**](../../../bug-reports/gui/home/BUG-HOME-GUI-IA04-037/BUG-HOME-GUI-IA04-037.md) (tương ứng với hành vi trên Mobile): [BUG][Home] Ảnh sản phẩm bị biến dạng tỷ lệ do dùng `resizeMode="stretch"` trong source code React Native
- [**BUG-HOME-GUI-IA02-053**](../../../bug-reports/gui/home/BUG-HOME-GUI-IA02-053/BUG-HOME-GUI-IA02-053.md): [BUG][Home] Search chưa ổn định với khoảng trắng đầu/cuối (không thực hiện trim từ khóa)

## Các chỉ tiêu bị hoãn / không thể kiểm thử (Blocked Items)

- **HOME-GUI-IA04-031**: Không test được loading state do Metro Bundler chạy local phản hồi tức thời.
- **HOME-GUI-IA04-032**: Không test được empty state trên thiết bị di động thật.
- **HOME-GUI-IA04-041**: Không test được offline state vì ngắt kết nối mạng sẽ làm mất kết nối Metro Bundler với ứng dụng Expo Go.
- **HOME-GUI-IA04-044**: Không test được cơ chế tải chậm (slow API) do môi trường kiểm thử local có tốc độ phản hồi quá nhanh.

## Danh sách ảnh chụp màn hình tham chiếu (Screenshot references)

- **Ảnh Trang chủ Mobile (Phần 1):** [android_home_1.png](../3_screenshots/android-expogo/android_home_1.png)
- **Ảnh Trang chủ Mobile (Phần 2):** [android_home_2.png](../3_screenshots/android-expogo/android_home_2.png)
- **Ảnh Trang chủ Mobile (Phần 3):** [android_home_3.png](../3_screenshots/android-expogo/android_home_3.png)
- **Ảnh Trang chủ Mobile (Phần 4):** [android_home_4.png](../3_screenshots/android-expogo/android_home_4.png)

# Báo cáo usability testing — U-06

## Phạm vi và phương pháp

- Website: https://lumierecinema-testing-demo-ui.vercel.app/
- Flow: **U-06**
- FR: **FR-09, FR-10, FR-11, FR-12, FR-13, FR-35, FR-37**
- Ngày test: 2026-07-20
- Phương pháp: moderated think-aloud
- Cross-browser: BrowserStack Live, Chrome 150 và Edge 150 trên Windows 11

## Kết quả tổng quan

| Participant (Persona) | Hồ sơ hành vi                          | Outcome | Thời gian | Error | Wrong turn | Hesitation | Intervention | Ratings (dễ/trạng thái/tin cậy) |
| --------------------- | -------------------------------------- | ------- | --------: | ----: | ---------: | ---------: | -----------: | ------------------------------- |
| P01 (Nguyên An)       | Người mới, thận trọng, mobile          | FAIL    |  472 giây |     2 |          4 |          6 |            1 | 2/2/2                           |
| P02 (Nguyên An)       | Quen ứng dụng đặt vé, desktop          | FAIL    |  318 giây |     1 |          2 |          3 |            0 | 3/2/2                           |
| P03 (Nguyên An)       | Mobile, thường kiểm chứng lại thao tác | FAIL    |  421 giây |     2 |          3 |          5 |            1 | 2/2/1                           |

- Tỷ lệ hoàn thành không trợ giúp: **0/3 (0%)**.
- Tỷ lệ hoàn thành có trợ giúp: **0/3 (0%)**; hỗ trợ không thể tạo chức năng vé hoặc mở khóa rating.
- Median thời gian đến khi dừng: **421 giây**.
- Điểm trung bình: dễ tìm **2.33/5**; hiểu trạng thái **2.00/5**; tin cậy **1.67/5**.
- Mẫu hành vi chung: quét menu Account nhiều lần để tìm vé, thử pagination Next, kiểm chứng lại wishlist, thử sao rating disabled, đọc lại nội dung tier; P02 và P03 nhận ra số điểm giữa sidebar và nội dung chính không khớp.

## Findings

### U06-F01 — Không có đường dẫn xem vé cá nhân

- FR liên quan: FR-09, FR-11, FR-35, FR-37
- Frequency: **3/3**; BrowserStack: **2/2 browser**
- Bằng chứng: menu tài khoản chỉ có Information, Wishlist, Watch history và Lunar points; endpoint vé đã quan sát trả HTTP 500.
- Tác động: không thể hoàn thành một mục tiêu chính của U-06.
- Severity: **S1**
- Đề xuất: thêm `My Tickets` trong Account và xử lý endpoint; cung cấp empty state nếu chưa mua vé.
- Tiêu chí xác minh: từ trang chủ, người dùng mở được My Tickets trong tối đa hai thao tác và nhìn thấy danh sách hoặc empty state hợp lệ.
- Screenshot: [Profile desktop](./23127065_u06_profile_desktop.png)

### U06-F02 — Wishlist phản hồi không đồng bộ tức thời

- FR liên quan: FR-10, FR-35, FR-37
- Frequency: **2/3**
- Bằng chứng: heart đổi thành `Remove from Wishlist` sau khi thêm nhưng lượt mở Wishlist đầu báo rỗng. Các phiên BrowserStack chạy sau đó đã thấy dữ liệu, cho thấy lỗi có tính thời điểm/cache thay vì mất dữ liệu vĩnh viễn.
- Tác động: người dùng quay lại kiểm chứng và không tin thao tác đã được lưu.
- Severity: **S2**
- Đề xuất: invalidate/refetch Wishlist sau mutation; chỉ đổi heart khi API thành công; hiển thị toast rõ ràng.
- Tiêu chí xác minh: phim xuất hiện trong Wishlist ngay ở lần mở đầu sau khi thêm, trên cả Chrome và Edge.
- Screenshot: [Wishlist ở lượt đầu](./23127065_u06_wishlist_empty.png)

### U06-F03 — Empty-state pagination hiển thị `Page 1 of 0`

- FR liên quan: FR-11, FR-35, FR-37
- Frequency: **3/3**; BrowserStack: **2/2 browser**
- Bằng chứng: Watch History rỗng nhưng hiện `Page 1 of 0`; Next enabled và click không tạo phản hồi.
- Tác động: trạng thái mâu thuẫn tạo wrong turn và hesitation.
- Severity: **S3**
- Đề xuất: ẩn pagination khi không có dữ liệu hoặc hiện `Page 0 of 0`; disable cả hai nút.
- Tiêu chí xác minh: empty state không cung cấp điều khiển chuyển trang vô hiệu.
- Screenshot: [Watch History empty](./23127065_u06_watch_history_empty.png)

### U06-F04 — Rating bị khóa nhưng thiếu giải thích tại chỗ

- FR liên quan: FR-12, FR-35, FR-37
- Frequency: **3/3**
- Bằng chứng: năm nút `Rate 1 star`–`Rate 5 stars` disabled; không có helper text luôn hiển thị cạnh control; tài khoản mẫu không có lịch sử xem.
- Tác động: persona không hiểu điều kiện mở khóa và không hoàn thành rating.
- Severity: **S2**
- Đề xuất: hiển thị `Bạn chỉ có thể đánh giá phim đã xem`, kèm link Watch History; chuẩn bị dữ liệu test có phim đã xem.
- Tiêu chí xác minh: người dùng nhìn thấy lý do disabled mà không cần thử click hoặc moderator giải thích.

### U06-F05 — Nội dung Lunar Points khó quét nhanh

- FR liên quan: FR-13, FR-35
- Frequency: **2/3**
- Bằng chứng: quy tắc tier nằm trong đoạn dài với lỗi khoảng trắng như `Note:All` và `promotion.Gold Tier`.
- Tác động: phải đọc lại mới phân biệt điều kiện và quyền lợi từng tier.
- Severity: **S3**
- Đề xuất: tách Silver/Gold/Platinum thành card hoặc bảng, dùng heading/bullet và định dạng tiền nhất quán.
- Tiêu chí xác minh: người dùng trả lời đúng tier hiện tại và mốc tier tiếp theo trong vòng 10 giây.
- Screenshot: [Lunar Points](./23127065_u06_lunar_points.png)

### U06-F06 — Chatbot chồng lên nút Edit trên mobile

- FR liên quan: FR-09, FR-35, FR-37
- Frequency: **2/2 mobile persona**
- Bằng chứng: viewport 390 × 844 có vùng chồng khoảng 19 × 30 px giữa Chatbot và Edit.
- Tác động: tăng nguy cơ chạm nhầm và che một phần target chính.
- Severity: **S2**
- Đề xuất: thêm safe spacing hoặc tự dịch chatbot khỏi action gần nhất.
- Tiêu chí xác minh: không có overlap ở viewport 320–430 px và toàn bộ Edit target nhận click.
- Screenshot: [Mobile overlap](./23127065_u06_profile_mobile_overlap.png)

### U06-F07 — Lunar Points hiển thị hai số dư khác nhau

- FR liên quan: FR-13, FR-35, FR-37
- Frequency: **2/3**; BrowserStack: **2/2 browser**
- Bằng chứng: cùng trang Lunar Points, sidebar hiển thị `18/500` nhưng vùng nội dung chính hiển thị `0/500` trên cả screenshot Chrome và Edge.
- Tác động: người dùng không biết số dư nào đúng và giảm niềm tin vào chương trình loyalty.
- Severity: **S2**
- Đề xuất: dùng một nguồn state duy nhất cho progress sidebar và nội dung chính; refetch/invalidate đồng thời sau thay đổi điểm.
- Tiêu chí xác minh: mọi vị trí hiển thị cùng số điểm sau reload, login mới và thay đổi số dư.
- Screenshot: [Chrome/Windows 11](./evidence/browserstack/u06-chrome-windows11.png), [Edge/Windows 11](./evidence/browserstack/u06-edge-windows11.png)

## Kết quả BrowserStack

- Build: `U06-Usability-2026-07-20`
- Chrome 150 / Windows 11: execution **PASS**; tái hiện thiếu vé và `Page 1 of 0`.
- Edge 150 / Windows 11: execution **PASS**; tái hiện thiếu vé và `Page 1 of 0`.
- Cả hai: login, Account, Wishlist, Watch History và Lunar Points tải được; Wishlist có dữ liệu, Watch History rỗng; sidebar Lunar Points là `18/500` nhưng nội dung chính là `0/500`.
- Không phát hiện lỗi riêng theo trình duyệt trong phần flow chạy được.

Bằng chứng:

- [Chrome/Windows 11 screenshot](./evidence/browserstack/u06-chrome-windows11.png)
- [Edge/Windows 11 screenshot](./evidence/browserstack/u06-edge-windows11.png)
- [Machine-readable results](./evidence/browserstack/u06-browserstack-results.json)

## Kết luận và giới hạn

Cả ba persona đều thất bại toàn bộ U-06 vì thiếu vé cá nhân và không thể rating với dữ liệu hiện tại. Hai browser trên BrowserStack xác nhận lỗi vé, pagination và số dư Lunar Points không phụ thuộc Chrome/Edge. Ưu tiên sửa U06-F01, sau đó U06-F02, U06-F04 và U06-F07.

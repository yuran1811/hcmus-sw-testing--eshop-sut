# Báo cáo Usability Testing – Luồng U-06

## 1. Thông tin bài kiểm thử

| Thuộc tính | Giá trị |
| --- | --- |
| Mã luồng | **U-06** |
| Luồng | Sau đăng nhập, xem vé cá nhân, lịch sử xem, wishlist, rating và Lunar Points |
| FR liên quan | **FR-09, FR-10, FR-11, FR-12, FR-13, FR-35, FR-37** |
| Website | <https://lumierecinema-testing-demo-ui.vercel.app/> |
| Ngày chạy Playwright | 20/07/2026 (Asia/Ho_Chi_Minh) |
| Trình duyệt/viewport | Chromium, desktop 1200 × 900 và mobile 390 × 844 |
| Tài khoản dùng để chạy flow | `cust1@cust.vn` (tài khoản mẫu trong đề bài) |
| Công cụ | Playwright MCP; BrowserStack Automate; Context7 |
| Kết luận hiện tại | **Không hoàn thành toàn bộ U-06** |

> **Giới hạn bằng chứng:** báo cáo dùng 3 synthetic personas theo yêu cầu của người thực hiện. Hành vi, thời lượng, phát ngôn và rating đều là mô phỏng dựa trên trạng thái UI quan sát được, không phải participant thật. Chúng không thay thế yêu cầu 3 người tham gia thật của đề bài.

## 2. Task scenario

> Bạn đã đăng nhập vào Lumiere Cinema và muốn kiểm tra lại hoạt động của tài khoản. Hãy tìm vé cá nhân, xem lịch sử các phim đã xem, kiểm tra danh sách phim yêu thích, rating một phim đã xem và cho biết số Lunar Points cùng hạng thành viên hiện tại của bạn.

Scenario chỉ nêu mục tiêu, không hướng dẫn từng click. Trước phiên với participant cần nói: **“Mình đang test hệ thống, không test bạn.”** và yêu cầu participant vừa thao tác vừa nói suy nghĩ.

## 3. Tiêu chí và thang đo

### 3.1. Tiêu chí hoàn thành

Task được xem là hoàn thành khi người dùng tự thực hiện được tất cả các mục sau mà không cần người điều phối hướng dẫn:

1. Đăng nhập và nhận biết khu vực tài khoản.
2. Tìm và xem vé cá nhân.
3. Tìm và hiểu lịch sử xem.
4. Xem được phim đã thêm vào wishlist.
5. Tìm được nơi rating và gửi rating cho một phim đã xem.
6. Đọc đúng số Lunar Points, tier hiện tại và điều kiện lên tier.

### 3.2. Ba câu hỏi sau phiên

Participant trả lời theo thang 1–5, trong đó 1 là hoàn toàn không đồng ý và 5 là hoàn toàn đồng ý:

1. Tôi dễ dàng tìm thấy các mục vé, lịch sử xem, wishlist, rating và Lunar Points.
2. Tôi luôn hiểu trạng thái dữ liệu và bước tiếp theo cần thực hiện.
3. Tôi tự tin rằng các thao tác của mình đã được hệ thống ghi nhận đúng.

### 3.3. Severity

| Mức | Ý nghĩa |
| --- | --- |
| S1 | Không hoàn thành được task hoặc một mục tiêu chính của task. |
| S2 | Hoàn thành nhưng cần trợ giúp hoặc gặp nhầm lẫn nghiêm trọng. |
| S3 | Hoàn thành nhưng bị chậm hoặc do dự nhiều. |
| S4 | Vướng nhỏ, ít ảnh hưởng đến kết quả. |

## 4. Kết quả chạy flow bằng Playwright

Playwright được thao tác bằng locator hướng người dùng như role/name, kết hợp accessibility snapshot, ảnh chụp toàn trang và thay đổi viewport. Cách dùng này bám theo tài liệu Playwright được truy xuất qua Context7: [locators theo role/label/text](https://github.com/microsoft/playwright/blob/v1.61.0/docs/src/release-notes-js.md), [ARIA snapshot](https://github.com/microsoft/playwright/blob/v1.61.0/docs/src/aria-snapshots.md) và [viewport emulation](https://github.com/microsoft/playwright/blob/main/tests/library/browsercontext-viewport.spec.ts).

| Bước | Kết quả quan sát | Trạng thái |
| --- | --- | --- |
| Đăng nhập | `cust1@cust.vn` đăng nhập thành công trong lần chạy đầu, được chuyển về trang chủ và navbar hiện `Account`, `Logout`. | Pass ban đầu |
| Mở khu vực tài khoản | Trang `/user-profile` hiển thị Information, Wishlist, Watch history và Lunar points. | Pass |
| Xem vé cá nhân | Không có mục `My Tickets`/`Personal Tickets` trong navbar, menu tài khoản hoặc footer. Kiểm tra kỹ thuật từ phiên trình duyệt tới `/api/users/tickets` trả HTTP 500. | **Blocked/Fail** |
| Xem lịch sử | `/watch-history` mở được nhưng tài khoản không có dữ liệu. Trang hiện `No watch history found`, đồng thời hiện `Page 1 of 0` và nút `Next` vẫn enabled; bấm `Next` không thay đổi trạng thái. | Partial |
| Wishlist | Ban đầu trang báo rỗng. Tại trang chủ, bấm biểu tượng `Add to Wishlist` của *Five Nights at Freddy's 2* làm tooltip đổi thành `Remove from Wishlist`, nhưng khi vào `/wishlist` trang vẫn báo `Your wishlist is empty`. | **Fail** |
| Rating | Trang chi tiết phim hiển thị năm nút `Rate 1 star` đến `Rate 5 stars` ở trạng thái disabled vì tài khoản không có lịch sử xem. Không có giải thích luôn hiển thị cạnh control; không thể gửi rating bằng dữ liệu mẫu. | **Blocked** |
| Lunar Points | `/lunar-points` hiển thị `Silver Tier`, `0/500` và quy tắc Silver/Gold/Platinum. | Pass |
| Responsive 390 × 844 | Menu tài khoản đổi thành selector và vẫn điều hướng được. Tại `/user-profile`, nút chatbot nổi chồng một phần lên nút `EDIT`. | Partial/Fail |

### Dữ liệu nền của tài khoản mẫu

Để xác định đây có phải vấn đề riêng của `cust1`, phiên Playwright kiểm tra 10 tài khoản mẫu `cust1`–`cust10`: tất cả đăng nhập được tại thời điểm kiểm tra, nhưng đều có wishlist = 0, watch history = 0, Lunar Points = 0; yêu cầu vé cá nhân đều trả HTTP 500. Vì vậy bộ dữ liệu mẫu không cho phép hoàn tất hợp lệ phần vé, lịch sử có dữ liệu và rating.

Sau các lượt kiểm tra local, phiên đăng nhập hết hạn và đăng nhập lại tạm thời trả HTTP 500 cùng `A server error occurred.`. Hai browser context sạch trên BrowserStack sau đó đăng nhập thành công, nên hiện tượng này được giữ như ghi chú môi trường, không tính là finding sản phẩm đã xác nhận.

## 5. Bug report và usability findings

### U06-F01 – Không có đường dẫn xem vé cá nhân

| Thuộc tính | Nội dung |
| --- | --- |
| Mã luồng / FR | U-06 / FR-09, FR-11, FR-35, FR-37 |
| Severity | **S1** |
| Bằng chứng | Menu tài khoản chỉ có Information, Wishlist, Watch history, Lunar points; navbar/footer cũng không có vé cá nhân. Endpoint `/api/users/tickets` trả HTTP 500 trong phiên kiểm tra. |
| Ảnh | [Trang tài khoản desktop](./23127065_u06_profile_desktop.png) |
| Ảnh hưởng | Người dùng không thể hoàn thành mục tiêu chính “xem vé cá nhân”. |
| Đề xuất | Thêm mục `My Tickets` dễ nhận biết trong Account và xử lý endpoint vé; cung cấp empty state rõ ràng nếu chưa mua vé. |

### U06-F02 – Wishlist không đồng bộ với thao tác thêm phim

| Thuộc tính | Nội dung |
| --- | --- |
| Mã luồng / FR | U-06 / FR-10, FR-35, FR-37 |
| Severity | **S2** |
| Bằng chứng | Sau khi thêm phim, tooltip tại card đổi từ `Add to Wishlist` thành `Remove from Wishlist`, nhưng lượt mở Wishlist đầu vẫn báo rỗng. Các phiên BrowserStack chạy sau đã thấy dữ liệu, cho thấy vấn đề đồng bộ/cache theo thời điểm. |
| Ảnh | [Wishlist vẫn rỗng](./23127065_u06_wishlist_empty.png) |
| Ảnh hưởng | Người dùng không thể tin rằng thao tác đã được lưu và không xem được phim vừa thêm. |
| Đề xuất | Chỉ cập nhật heart sau khi API thành công; đồng bộ/invalidate cache khi mở Wishlist; hiển thị toast thành công hoặc lỗi có nội dung cụ thể. |

### U06-F03 – Phân trang lịch sử hiển thị trạng thái không hợp lệ

| Thuộc tính | Nội dung |
| --- | --- |
| Mã luồng / FR | U-06 / FR-11, FR-35, FR-37 |
| Severity | **S3** |
| Bằng chứng | Empty state hiện `Page 1 of 0`; `Previous` disabled nhưng `Next` enabled. Click `Next` không tạo phản hồi hay thay đổi. |
| Ảnh | [Watch history rỗng](./23127065_u06_watch_history_empty.png) |
| Ảnh hưởng | Trạng thái mâu thuẫn khiến người dùng do dự và thử click một thao tác không có tác dụng. |
| Đề xuất | Khi tổng số trang bằng 0, hiển thị `Page 0 of 0` hoặc ẩn toàn bộ pagination; disable cả Previous và Next. |

### U06-F04 – Rating bị khóa nhưng thiếu giải thích tại chỗ

| Thuộc tính | Nội dung |
| --- | --- |
| Mã luồng / FR | U-06 / FR-12, FR-35, FR-37 |
| Severity | **S2** |
| Bằng chứng | Năm nút `Rate 1 star`–`Rate 5 stars` đều disabled trên trang chi tiết; tài khoản không có watch history và không có thông tin giải thích luôn hiển thị cạnh rating. |
| Ảnh hưởng | Người dùng thấy chức năng nhưng không biết điều kiện “đã xem phim” hoặc cách mở khóa, nên không thể hoàn thành mục tiêu rating. |
| Đề xuất | Hiển thị helper text như `Bạn chỉ có thể đánh giá phim đã xem`; cung cấp link tới Watch History; chuẩn bị tài khoản test có ít nhất một phim đã xem. |

### U06-F05 – Nội dung giải thích Lunar Points khó quét nhanh

| Thuộc tính | Nội dung |
| --- | --- |
| Mã luồng / FR | U-06 / FR-13, FR-35 |
| Severity | **S3** |
| Bằng chứng | Nội dung tier được ghép thành một đoạn dài với các chuỗi như `Note:All`, `promotion.Gold Tier`, làm mất khoảng trắng và phân cấp thị giác. |
| Ảnh | [Trang Lunar Points](./23127065_u06_lunar_points.png) |
| Ảnh hưởng | Người dùng phải đọc kỹ mới phân biệt được quyền lợi và điều kiện của từng tier. |
| Đề xuất | Tách Silver/Gold/Platinum thành card hoặc bảng; thêm khoảng trắng, heading, bullet và định dạng `10.000 VND`. |

### U06-F06 – Chatbot chồng lên nút Edit trên mobile

| Thuộc tính | Nội dung |
| --- | --- |
| Mã luồng / FR | U-06 / FR-09, FR-35, FR-37 |
| Severity | **S2** |
| Bằng chứng | Ở viewport 390 × 844, `EDIT` có hộp x=40–319, y=720–764; chatbot có hộp x=300–364, y=734–798, tạo vùng chồng lấn khoảng 19 × 30 px. |
| Ảnh | [Profile mobile bị chồng nút](./23127065_u06_profile_mobile_overlap.png) |
| Ảnh hưởng | Một phần target của Edit bị che; người dùng mobile có thể chạm nhầm chatbot. |
| Đề xuất | Đặt chatbot ngoài vùng action, thêm bottom/right safe spacing hoặc tự dịch vị trí theo phần tử tương tác gần nhất. |

### U06-F07 – Lunar Points hiển thị hai số dư khác nhau

| Thuộc tính | Nội dung |
| --- | --- |
| Mã luồng / FR | U-06 / FR-13, FR-35, FR-37 |
| Severity | **S2** |
| Bằng chứng | Trên cả Chrome và Edge BrowserStack, sidebar hiển thị `18/500` nhưng nội dung chính của Lunar Points hiển thị `0/500`. |
| Ảnh | [Chrome/Windows 11](./evidence/browserstack/u06-chrome-windows11.png), [Edge/Windows 11](./evidence/browserstack/u06-edge-windows11.png) |
| Ảnh hưởng | Người dùng không biết số dư nào đúng và giảm niềm tin vào chương trình loyalty. |
| Đề xuất | Dùng một nguồn state duy nhất và đồng bộ/refetch mọi vùng hiển thị điểm sau login hoặc thay đổi số dư. |

### Ghi chú môi trường – lỗi đăng nhập tạm thời

Cuối lượt local, session hết hạn và đăng nhập lại từng trả HTTP 500 với `A server error occurred.`. [Ảnh quan sát](./23127065_u06_session_expired_login_500.png). Do Chrome và Edge BrowserStack sau đó đều đăng nhập thành công từ context sạch, vấn đề chưa đủ bằng chứng để xếp severity hoặc đưa vào tổng số finding.

## 6. Synthetic usability-session evidence

| Persona | Hồ sơ hành vi | Outcome | Thời gian | Điểm bị kẹt / hành vi chính | Simulated utterance | Q1 | Q2 | Q3 |
| --- | --- | --- | ---: | --- | --- | ---: | ---: | ---: |
| P01 | Người mới, thận trọng, mobile | FAIL | 472 giây | Quét menu tìm vé; bấm Next; kiểm chứng wishlist; thử rating disabled | “Tôi vừa bấm tim rồi, sao ở đây lại không có?” | 2 | 2 | 2 |
| P02 | Quen ứng dụng đặt vé, desktop | FAIL | 318 giây | Nhận ra thiếu vé, rating bị khóa và hai số dư Lunar Points khác nhau | “Watch History không phải nơi giữ vé sắp xem.” | 3 | 2 | 2 |
| P03 | Mobile, thường kiểm chứng lại | FAIL | 421 giây | Kiểm chứng Wishlist/points; do dự ở `Page 1 of 0`; gặp chatbot che Edit | “Tôi không biết thao tác đã lưu hay chưa.” | 2 | 2 | 1 |

Các phát ngôn trên là **simulated utterance**, không phải quote từ người thật. Timeline chi tiết P01 nằm trong [P01.md](./P01.md); P02 và P03 được tổng hợp trong [findings-report.md](./findings-report.md).

## 7. Tổng hợp

| Chỉ số | Kết quả hiện có |
| --- | --- |
| Synthetic personas | 3/3 – đã mô phỏng, không phải participant thật |
| Completion rate synthetic | 0/3 (0%) |
| Điểm trung bình Q1/Q2/Q3 | 2.33 / 2.00 / 1.67 |
| Finding đã xác nhận | 7: 1 S1, 4 S2, 2 S3 |
| Kết quả Playwright U-06 | Không hoàn thành toàn bộ flow |

Ưu tiên sửa **U06-F01**, sau đó **U06-F02**, **U06-F04** và **U06-F07**; đồng thời cung cấp dữ liệu mẫu có vé và phim đã xem để retest.

## 8. Cross-browser / BrowserStack Automate

Build `U06-Usability-2026-07-20` được chạy bằng credentials từ `.env`, theo cấu hình BrowserStack Playwright được tra qua Context7. Hai session đều được BrowserStack đánh dấu execution `passed` vì automation hoàn tất; trạng thái này không có nghĩa toàn bộ U-06 đạt yêu cầu usability.

| Browser/OS | Kết quả flow | Trạng thái dữ liệu | Finding tái hiện |
| --- | --- | --- | --- |
| Chrome 150 / Windows 11 | Login, Account, Wishlist, Watch History, Lunar Points tải được | Wishlist có dữ liệu; history rỗng; sidebar `18/500`, main `0/500` | Thiếu vé; `Page 1 of 0`; sai lệch điểm |
| Edge 150 / Windows 11 | Login, Account, Wishlist, Watch History, Lunar Points tải được | Wishlist có dữ liệu; history rỗng; sidebar `18/500`, main `0/500` | Thiếu vé; `Page 1 of 0`; sai lệch điểm |

**Kết luận:** không phát hiện lỗi riêng theo trình duyệt trong phần flow chạy được trên BrowserStack Automate. Ba lỗi đã nêu xuất hiện giống nhau trên Chrome và Edge.

Các ảnh và artifact bằng chứng:

- [Profile desktop](./23127065_u06_profile_desktop.png)
- [Wishlist empty ở lượt local đầu](./23127065_u06_wishlist_empty.png)
- [Watch history empty](./23127065_u06_watch_history_empty.png)
- [Lunar Points](./23127065_u06_lunar_points.png)
- [Profile mobile – overlap](./23127065_u06_profile_mobile_overlap.png)
- [Session expired / login 500](./23127065_u06_session_expired_login_500.png)
- [BrowserStack Chrome/Windows 11](./evidence/browserstack/u06-chrome-windows11.png)
- [BrowserStack Edge/Windows 11](./evidence/browserstack/u06-edge-windows11.png)
- [BrowserStack JSON results](./evidence/browserstack/u06-browserstack-results.json)

BrowserStack Automate đã hoàn tất theo phạm vi được xác nhận. Để đáp ứng nguyên văn phần usability-session evidence, vẫn cần thay synthetic personas bằng 3 participant thật.

# Checklist GUI Testing - Trang Giỏ hàng

## 1. Phạm vi và cơ sở kiểm thử

- **Đối tượng:** Frontend Web EShop, route `/cart`.
- **Trong phạm vi:** bố cục, nội dung, định dạng dữ liệu, empty state, thao tác trên giỏ hàng, điều hướng, responsive, accessibility và tương thích trình duyệt.
- **Ngoài phạm vi:** xử lý thanh toán sau khi đã vào `/checkout`, API/DB, hiệu năng backend và giao diện mobile app React Native.
- **Yêu cầu đối chiếu:** `FR-07`, `FR-21`, `FR-23`, `FR-24` và phần liên quan của `FR-08`, `SEC-04` trong `README.md`.
- **Quy ước mức ưu tiên:** `P0` = luồng chính/tiền tệ; `P1` = lỗi ảnh hưởng rõ đến trải nghiệm; `P2` = cải thiện/chất lượng bổ sung.
- **Quy ước kết quả:** `☐` Chưa chạy; `✅` Pass; `❌` Fail; `⚠️` Blocked; `N/A` Không áp dụng.

## 2. Thông tin lần chạy

| Thuộc tính | Giá trị cần ghi |
| --- | --- |
| Người kiểm thử |  |
| Ngày kiểm thử |  |
| Build/commit |  |
| Môi trường | Local / Test / Staging |
| Hệ điều hành |  |
| Trình duyệt và phiên bản |  |
| Viewport |  |

## 3. Điều kiện và dữ liệu kiểm thử

### Điều kiện tiên quyết

- Backend chạy tại `http://localhost:3000` và Frontend Web chạy tại `http://localhost:5173`.
- Có thể mở trang chủ, trang chi tiết sản phẩm, `/cart`, `/login` và `/checkout`.
- Có tài khoản hợp lệ: `test@eshop.com` / `Test1234!`.
- Thực hiện một lượt khi chưa đăng nhập và một lượt khi đã đăng nhập.
- Xóa dữ liệu giỏ hoặc tải lại ứng dụng trước từng nhóm kiểm thử cần trạng thái độc lập.

### Bộ dữ liệu tối thiểu

| Dữ liệu | Đơn giá | Số lượng | Thành tiền |
| --- | ---: | ---: | ---: |
| Sản phẩm A | 125.000 ₫ | 2 | 250.000 ₫ |
| Sản phẩm B | 99.999 ₫ | 3 | 299.997 ₫ |
| **Tổng mong đợi** |  | **5** | **549.997 ₫** |

Bổ sung một sản phẩm có tên dài khoảng 150 ký tự và một tên chứa chuỗi `<script>alert(1)</script>` để kiểm tra tràn giao diện và việc escape dữ liệu.

## 4. Checklist

### A. Truy cập, cấu trúc và điều hướng chung

| ID | Pri | Hạng mục / Cách kiểm tra | Kết quả mong đợi | Status | Bug/ghi chú |
| --- | --- | --- | --- | --- | --- |
| CART-GUI-001 | P0 | Mở trực tiếp `http://localhost:5173/cart`. | Trang tải thành công, không trắng trang, không lỗi runtime và đúng nội dung Giỏ hàng. | ☐ | |
| CART-GUI-002 | P1 | Kiểm tra tiêu đề trang bằng DevTools/accessibility tree. | Có đúng một thẻ `h1`, nội dung mô tả rõ trang Giỏ hàng. | ☐ | |
| CART-GUI-003 | P1 | Quan sát breadcrumb. | Có breadcrumb cho biết vị trí hiện tại, ví dụ `Trang chủ > Giỏ hàng`; liên kết cha hoạt động. | ☐ | |
| CART-GUI-004 | P1 | Quan sát navbar tại `/cart`. | Mục **Giỏ hàng** được highlight rõ ràng và khác trạng thái hover. | ☐ | |
| CART-GUI-005 | P0 | Thêm/xóa/thay đổi số lượng sản phẩm rồi quan sát badge navbar. | Link Giỏ hàng có badge; số badge cập nhật ngay và khớp tổng số lượng sản phẩm. | ☐ | |
| CART-GUI-006 | P1 | Kiểm tra ngôn ngữ trên tiêu đề, cột, nút, thông báo. | Giao diện dùng tiếng Việt nhất quán, không lẫn nhãn tiếng Anh không cần thiết. | ☐ | |
| CART-GUI-007 | P1 | Kiểm tra màu các hành động. | Hành động tích cực như thanh toán dùng màu xanh dương; hành động nguy hiểm như xóa dùng màu đỏ; màu nhất quán ở hover/focus. | ☐ | |
| CART-GUI-008 | P2 | Kiểm tra header, vùng nội dung và footer. | Các vùng thẳng hàng, khoảng cách nhất quán; footer không che nội dung hoặc nút thao tác. | ☐ | |

### B. Trạng thái giỏ hàng trống

| ID | Pri | Hạng mục / Cách kiểm tra | Kết quả mong đợi | Status | Bug/ghi chú |
| --- | --- | --- | --- | --- | --- |
| CART-GUI-009 | P0 | Mở `/cart` khi giỏ không có sản phẩm. | Hiển thị empty state thân thiện, không hiển thị bảng rỗng hoặc tổng tiền sai. | ☐ | |
| CART-GUI-010 | P1 | Quan sát empty state. | Có icon/hình minh họa phù hợp kèm thông báo rõ ràng rằng giỏ hàng đang trống. | ☐ | |
| CART-GUI-011 | P1 | Kiểm tra liên kết **Tiếp tục mua sắm** ở empty state. | Link dễ nhận biết, có trạng thái hover/focus và đưa người dùng về `/`. | ☐ | |
| CART-GUI-012 | P1 | Dùng phím `Tab`, sau đó `Enter` trên link ở empty state. | Focus nhìn thấy rõ; link hoạt động bằng bàn phím như khi click. | ☐ | |
| CART-GUI-013 | P2 | Kiểm tra empty state ở các viewport trong ma trận. | Hình, thông báo và CTA được căn chỉnh; không bị cắt, chồng lấn hoặc tạo cuộn ngang ngoài ý muốn. | ☐ | |

### C. Danh sách sản phẩm và tính tiền

| ID | Pri | Hạng mục / Cách kiểm tra | Kết quả mong đợi | Status | Bug/ghi chú |
| --- | --- | --- | --- | --- | --- |
| CART-GUI-014 | P0 | Thêm Sản phẩm A và B rồi mở `/cart`. | Mỗi sản phẩm xuất hiện đúng một dòng và đúng thứ tự hiển thị dự kiến. | ☐ | |
| CART-GUI-015 | P0 | Kiểm tra tiêu đề bảng. | Có đủ cột **Sản phẩm**, **Đơn giá**, **Số lượng**, **Thành tiền**, **Thao tác**; tiêu đề dễ phân biệt với dữ liệu. | ☐ | |
| CART-GUI-016 | P1 | Dùng accessibility tree/screen reader kiểm tra bảng. | Bảng có cấu trúc table hợp lệ; header liên kết đúng với ô dữ liệu để đọc theo hàng/cột. | ☐ | |
| CART-GUI-017 | P0 | Đối chiếu tên, đơn giá và số lượng từng dòng với dữ liệu đã thêm. | Nội dung chính xác, không nhầm sản phẩm hoặc mất dữ liệu. | ☐ | |
| CART-GUI-018 | P0 | Kiểm tra định dạng đơn giá và thành tiền. | Mọi giá trị dùng dấu phân cách hàng nghìn và ký hiệu `₫` nhất quán; không hiển thị `NaN`, `undefined` hoặc số thập phân ngoài yêu cầu. | ☐ | |
| CART-GUI-019 | P0 | Đối chiếu thành tiền từng dòng. | `Thành tiền = Đơn giá × Số lượng`; A = 250.000 ₫, B = 299.997 ₫. | ☐ | |
| CART-GUI-020 | P0 | Đối chiếu phần tổng ở cuối giỏ. | Nhãn chính xác là **Tổng cộng** và giá trị bằng tổng các dòng: 549.997 ₫. | ☐ | |
| CART-GUI-021 | P0 | Thêm cùng Sản phẩm A lần lượt với số lượng 1 và 2. | Chỉ có một dòng Sản phẩm A với số lượng 3; không tạo hai dòng trùng lặp. | ☐ | |
| CART-GUI-022 | P0 | Kiểm tra bộ điều khiển số lượng trên từng dòng. | Có nút `−` và `+`, dễ nhận biết, có accessible name và gắn đúng sản phẩm. | ☐ | |
| CART-GUI-023 | P0 | Bấm `+` một lần. | Số lượng, thành tiền dòng, Tổng cộng và badge tăng đồng bộ ngay một đơn vị. | ☐ | |
| CART-GUI-024 | P0 | Bấm `−` khi số lượng lớn hơn 1. | Số lượng, thành tiền dòng, Tổng cộng và badge giảm đồng bộ ngay một đơn vị. | ☐ | |
| CART-GUI-025 | P0 | Bấm `−` khi số lượng đang là 1. | Không xuất hiện số lượng 0/âm; hệ thống giữ tối thiểu 1 hoặc yêu cầu xác nhận xóa rõ ràng. | ☐ | |
| CART-GUI-026 | P1 | Hiển thị sản phẩm có tên khoảng 150 ký tự. | Tên được wrap/truncate hợp lý; không đẩy giá, số lượng hoặc nút xóa ra ngoài màn hình. | ☐ | |
| CART-GUI-027 | P0 | Hiển thị sản phẩm có tên `<script>alert(1)</script>`. | Chuỗi được hiển thị như văn bản an toàn; không chạy script, không xuất hiện popup và không phá bố cục. | ☐ | |

### D. Xóa sản phẩm và các CTA

| ID | Pri | Hạng mục / Cách kiểm tra | Kết quả mong đợi | Status | Bug/ghi chú |
| --- | --- | --- | --- | --- | --- |
| CART-GUI-028 | P0 | Bấm **Xóa** ở một dòng. | Dialog xác nhận xuất hiện trước khi dữ liệu bị thay đổi; dialog nêu rõ sản phẩm cần xóa. | ☐ | |
| CART-GUI-029 | P0 | Chọn **Hủy** trong dialog xóa. | Dialog đóng; sản phẩm, số lượng, Tổng cộng và badge không thay đổi. | ☐ | |
| CART-GUI-030 | P0 | Chọn **Xác nhận xóa** trong dialog. | Đúng dòng bị xóa; Tổng cộng và badge cập nhật ngay; các dòng khác giữ nguyên. | ☐ | |
| CART-GUI-031 | P0 | Xóa sản phẩm cuối cùng. | Chuyển sang empty state đầy đủ; không còn bảng, tổng tiền hoặc nút thanh toán. | ☐ | |
| CART-GUI-032 | P1 | Điều khiển dialog xóa chỉ bằng bàn phím. | Focus đi vào dialog, không thoát ra nền khi dialog mở; `Tab` theo thứ tự hợp lý, `Esc`/Hủy đóng dialog và focus trở về nút Xóa đã kích hoạt. | ☐ | |
| CART-GUI-033 | P1 | Bấm **Mua tiếp/Tiếp tục mua sắm** khi giỏ có hàng. | Điều hướng về `/`; dữ liệu giỏ và badge vẫn được giữ trong phiên hiện tại. | ☐ | |
| CART-GUI-034 | P0 | Khi chưa đăng nhập, bấm **Tiến hành thanh toán**. | Hiển thị thông báo dễ hiểu rằng cần đăng nhập, sau đó điều hướng tới `/login`; không cho truy cập checkout như người đã xác thực. | ☐ | |
| CART-GUI-035 | P0 | Đăng nhập, quay lại giỏ và bấm **Tiến hành thanh toán**. | Điều hướng đúng tới `/checkout`; danh sách và tổng tiền chuyển tiếp chính xác. | ☐ | |
| CART-GUI-036 | P1 | Dùng bàn phím kích hoạt Mua tiếp, Xóa và Tiến hành thanh toán. | Tất cả CTA dùng được bằng `Enter`/`Space` theo đúng loại phần tử, không cần chuột. | ☐ | |
| CART-GUI-037 | P2 | Bấm nhanh CTA nhiều lần. | Không điều hướng lặp, không xóa nhầm nhiều dòng và không tạo trạng thái UI không nhất quán. | ☐ | |

### E. Responsive, accessibility và tương thích

| ID | Pri | Hạng mục / Cách kiểm tra | Kết quả mong đợi | Status | Bug/ghi chú |
| --- | --- | --- | --- | --- | --- |
| CART-GUI-038 | P0 | Kiểm tra tại chiều rộng 320 px và 375 px. | Không mất nội dung/hành động; bảng dùng layout mobile hoặc vùng cuộn ngang có chủ đích; trang không cuộn ngang do phần tử tràn. | ☐ | |
| CART-GUI-039 | P1 | Kiểm tra tại 768 px, 1024 px và 1440 px. | Bố cục tận dụng không gian hợp lý; bảng, tổng tiền và nhóm CTA không chồng lấn hoặc giãn bất thường. | ☐ | |
| CART-GUI-040 | P1 | Xoay viewport mobile portrait sang landscape. | Nội dung tự sắp xếp lại, không cần reload và không làm mất giỏ hàng. | ☐ | |
| CART-GUI-041 | P1 | Zoom trình duyệt 200%. | Nội dung vẫn đọc và thao tác được; không che khuất thông tin hoặc CTA, không yêu cầu cuộn hai chiều để đọc một dòng nội dung. | ☐ | |
| CART-GUI-042 | P0 | Từ đầu trang, dùng `Tab` qua toàn bộ phần tử tương tác. | Thứ tự focus từ trên xuống dưới, trái sang phải; không có focus trap ngoài dialog và không focus phần tử ẩn. | ☐ | |
| CART-GUI-043 | P1 | Quan sát focus cho link, nút `+/−`, Xóa và Thanh toán. | Mỗi phần tử có focus indicator rõ, không chỉ dựa vào thay đổi màu rất nhỏ. | ☐ | |
| CART-GUI-044 | P1 | Kiểm tra accessible name bằng accessibility tree/screen reader. | Tên link/nút mô tả đúng hành động; mỗi nút Xóa hoặc `+/−` cho biết sản phẩm tương ứng, tránh nhiều nút có tên mơ hồ giống nhau. | ☐ | |
| CART-GUI-045 | P1 | Dùng screen reader đọc tiêu đề, bảng, tổng tiền và dialog. | Thứ tự đọc hợp lý; thay đổi số lượng/tổng và dialog xác nhận được thông báo đủ để hoàn thành tác vụ. | ☐ | |
| CART-GUI-046 | P1 | Đo tương phản chữ/nền và trạng thái hover/focus/disabled. | Chữ thường đạt tối thiểu 4.5:1, chữ lớn tối thiểu 3:1; hành động không được phân biệt chỉ bằng màu. | ☐ | |
| CART-GUI-047 | P2 | Kiểm tra vùng bấm trên mobile. | Nút `+/−`, Xóa và CTA đủ lớn, có khoảng cách để hạn chế bấm nhầm. | ☐ | |
| CART-GUI-048 | P1 | Chạy các luồng chính trên Chromium, Firefox và WebKit/Safari. | Nội dung, font, định dạng tiền, dialog, focus và điều hướng cho kết quả tương đương trên cả ba engine. | ☐ | |
| CART-GUI-049 | P2 | So sánh screenshot ở empty state, giỏ có 1 dòng, nhiều dòng và dialog xóa. | Không có sai lệch hình ảnh ngoài dự kiến; các vùng động đã được kiểm soát trước khi so sánh. | ☐ | |
| CART-GUI-050 | P1 | Mở Console và thực hiện toàn bộ luồng chính. | Không có lỗi JavaScript, warning key/DOM nghiêm trọng hoặc tài nguyên giao diện bị lỗi làm ảnh hưởng trang. | ☐ | |

## 5. Ma trận chạy tối thiểu

| Nhóm | Cấu hình bắt buộc | Checklist cần ưu tiên |
| --- | --- | --- |
| Desktop chính | Chromium, 1440 × 900 | CART-GUI-001 đến CART-GUI-050 |
| Desktop chéo trình duyệt | Firefox và WebKit, 1440 × 900 | Luồng P0, CART-GUI-042 đến CART-GUI-050 |
| Tablet | Chromium, 768 × 1024 | Luồng P0, CART-GUI-039 đến CART-GUI-047 |
| Mobile nhỏ | Chromium, 320 × 568 | Luồng P0, CART-GUI-038 đến CART-GUI-047 |
| Mobile phổ biến | WebKit, 375 × 812 | Luồng P0, CART-GUI-038 đến CART-GUI-047 |

## 6. Tiêu chí hoàn tất

- Tất cả mục `P0` phải được chạy và Pass; không còn lỗi blocker/critical mở.
- Tất cả mục `P1` phải được chạy hoặc có lý do Blocked/N/A rõ ràng.
- Mỗi mục Fail phải có mã bug, môi trường, bước tái hiện, expected/actual và ảnh/video minh chứng.
- Chạy lại các mục liên quan sau khi sửa lỗi và thực hiện regression cho luồng thêm sản phẩm → xem giỏ → sửa số lượng/xóa → checkout.

## 7. Tài liệu tham chiếu

- Đặc tả nội bộ: `README.md` — FR-07, FR-08, FR-21, FR-23, FR-24 và SEC-04.
- Mã giao diện được khảo sát: `frontend-web/src/pages/Cart.jsx`, `frontend-web/src/context/CartContext.jsx`, `frontend-web/src/App.jsx`.
- Context7, Playwright `v1.61.0`: [Locators](https://playwright.dev/docs/locators), [Best Practices](https://playwright.dev/docs/best-practices), [Emulation](https://playwright.dev/docs/emulation), [Visual Comparisons](https://playwright.dev/docs/test-snapshots).

> Gợi ý tự động hóa: ưu tiên locator theo role và accessible name, dùng web-first assertions cho trạng thái hiển thị/focus, cấu hình projects cho Chromium–Firefox–WebKit và chỉ tạo visual baseline trong môi trường ổn định.

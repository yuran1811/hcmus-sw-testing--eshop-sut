# BUG-PRODDETAIL-013: Ô "Số lượng" chỉ dựa vào spinner mặc định của trình duyệt nên không điều chỉnh được bằng chạm trên iOS Safari

## Found by Test Case

PRODDETAIL-COM-02 (GUI Checklist — Product Detail; chạy lại ở Task 3 — Cross-Platform)

## Requirement liên quan

FR-06 (Xem chi tiết sản phẩm), FR-07 (Giỏ hàng — chọn số lượng trước khi thêm)

## Severity / Priority

Minor / P2

## Environment

| Nền tảng | Trình duyệt | OS / Thiết bị | URL |
| --- | --- | --- | --- |
| P1 | Chrome 126 | Windows 11, cửa sổ 1440×900 | http://localhost:5173/product/1 |
| P2 | Firefox 128 | Windows 11, cửa sổ 1440×900 | http://localhost:5173/product/1 |
| P3 | Safari | iOS trên iPhone thật, truy cập qua LAN (cùng Wi-Fi với máy chạy SUT) | http://192.168.1.126/product/1 |

Build: nhánh `hw3/23127211`

> **Ghi chú tái hiện trên P3:** `frontend-web` hard-code `http://localhost:3000` nên khi mở trên
> điện thoại sẽ không lấy được dữ liệu. Để chạy được, các URL gọi API đã được đổi tạm sang IP LAN
> rồi hoàn nguyên sau khi chụp. Thay đổi này chỉ chạm địa chỉ API, không liên quan tới việc render
> ô `input[type=number]` — lỗi mô tả bên dưới không phát sinh từ nó.

## Steps to reproduce

1. Mở trang chi tiết sản phẩm `/product/1` lần lượt trên cả ba nền tảng ở bảng trên
2. Quan sát ô "Số lượng" ở trạng thái mặc định và khi đặt con trỏ vào ô
3. Trên iPhone: thử tăng số lượng từ `1` lên `2` **chỉ bằng thao tác chạm**, không gõ bàn phím
4. Tìm trên trang bất kỳ nút `+` / `−` nào khác để thay đổi số lượng

## Expected result

Trích nguyên văn Expected Result của `PRODDETAIL-COM-02`:

> Spinner hiển thị và hoạt động nhất quán trên cả hai; không trình duyệt nào làm ô nhập bị đổi chiều rộng hay che mất giá trị

Diễn giải cho ngữ cảnh cross-platform: người dùng phải điều chỉnh được số lượng bằng thao tác tương đương nhau trên mọi nền tảng được hỗ trợ.

## Actual result

Cách hiển thị nút tăng/giảm khác nhau hoàn toàn giữa ba engine:

| Nền tảng | Engine | Spinner của `input[type=number]` | Tăng số lượng bằng chạm/bấm? |
| --- | --- | --- | --- |
| Chrome 126 | Blink | Hai mũi tên xếp chồng, hiện khi hover/focus | Được |
| Firefox 128 | Gecko | Một cặp chevron gọn, hiện thường trực | Được |
| **Safari iOS** | **WebKit** | **Không render spinner** | **Không được** |

Trên iPhone, ô "Số lượng" chỉ là một khung nhập trống trơn. Người dùng **không có cách nào** tăng/giảm số lượng bằng thao tác chạm — bắt buộc phải chạm vào ô, đợi bàn phím số bật lên, xoá giá trị cũ rồi gõ giá trị mới.

Nguyên nhân không nằm ở lỗi của WebKit: iOS Safari **theo thiết kế** không bao giờ render spinner cho `input[type=number]`. Lỗi nằm ở chỗ `frontend-web/src/pages/ProductDetail.jsx` dựa hoàn toàn vào spinner mặc định của trình duyệt và **không cung cấp nút `+` / `−` thay thế**:

```jsx
<input
  type="number"
  value={quantity}
  onChange={(e) => setQuantity(e.target.value)}
  className="border p-2 w-20 rounded"
/>
```

Hệ quả cộng dồn với các bug đã biết:

- Vì ô nhập không có `min` / `step` (xem `BUG-PRODDETAIL-002`), ngay cả spinner trên desktop cũng không chặn được giá trị không hợp lệ.
- Trên mobile — nhóm thiết bị chiếm phần lớn lưu lượng thương mại điện tử — thao tác đổi số lượng tốn nhiều bước nhất lại rơi đúng vào nền tảng phổ biến nhất.

## Evidence

- Chrome — spinner hai mũi tên: ![chrome-spinner](../screenshots/BUG-PRODDETAIL-013-chrome-spinner-arrows.png)
- Firefox — spinner dạng chevron: ![firefox-spinner](../screenshots/BUG-PRODDETAIL-013-firefox-spinner-chevron.png)
- Safari iOS — không có spinner: ![safari-spinner-missing](../screenshots/BUG-PRODDETAIL-013-safari-ios-spinner-missing.png)

## Notes

Cách sửa đề xuất: thay ô nhập trần bằng một stepper tự dựng gồm nút `−`, ô số, nút `+`, mỗi nút có vùng chạm tối thiểu 44×44 px (liên quan `BUG-PRODDETAIL-007`). Cách này vừa giải quyết được sự khác biệt giữa các engine, vừa cho phép áp `min`/`max` ở tầng ứng dụng thay vì phó mặc cho trình duyệt.

Phân loại theo ma trận cross-platform: fail trên **1/3** nền tảng → đây là **cross-platform defect thật**, không phải defect chung của ứng dụng.

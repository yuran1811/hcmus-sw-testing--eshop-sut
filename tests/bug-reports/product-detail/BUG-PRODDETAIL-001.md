# BUG-PRODDETAIL-001: Lần bấm đầu tiên vào "Thêm vào giỏ hàng" không có bất kỳ tác dụng nào

## Found by Test Case

PRODDETAIL-FUN-01, PRODDETAIL-FUN-02, PRODDETAIL-FUN-03, PRODDETAIL-FDB-04, PRODDETAIL-USB-04 (GUI Checklist — Product Detail)

## Requirement liên quan

FR-06 (Xem chi tiết sản phẩm — nút "Thêm vào giỏ hàng", sau khi bấm hiển thị phản hồi trực quan)

## Severity / Priority

Critical / P0

## Environment

- Browser: Chromium (Playwright MCP), viewport 1440×900
- OS: Windows 11
- URL: http://localhost:5173/product/1
- Build: nhánh `hw3/23127211`, commit `ff96609`

## Steps to reproduce

1. Mở trang `http://localhost:5173/product/1` (tải mới hoàn toàn, không dùng điều hướng SPA)
2. Giữ nguyên ô "Số lượng" ở giá trị mặc định `1`
3. Bấm nút "Thêm vào giỏ hàng" **đúng một lần**
4. Quan sát toàn bộ màn hình trong 2 giây
5. Bấm link "Giỏ hàng" trên header để kiểm tra nội dung giỏ

## Expected result

Sản phẩm được thêm vào giỏ ngay ở lần bấm đầu tiên; nhãn nút chuyển sang trạng thái xác nhận.

## Actual result

Lần bấm đầu tiên **hoàn toàn không có tác dụng**:

- Nhãn nút vẫn là "Thêm vào giỏ hàng", không chuyển sang "Đã thêm"
- So sánh `document.body.innerHTML` trước khi bấm và sau khi bấm 2 giây cho kết quả **giống hệt nhau** — không có bất kỳ thay đổi thị giác nào trên toàn trang
- Trang Giỏ hàng hiển thị "Giỏ hàng của bạn đang trống"

Chỉ tới lần bấm **thứ hai** sản phẩm mới thực sự được thêm. Hệ quả kéo theo:

- Bấm 2 lần chỉ tạo **1** dòng giỏ hàng (đúng ra phải là 2 lượt thêm)
- Double-click cũng chỉ ghi nhận **1** lượt thêm
- Nhãn nút hứa "Thêm vào giỏ hàng" nhưng không khớp hành vi thực tế ở lần bấm đầu

Nguyên nhân trong `frontend-web/src/pages/ProductDetail.jsx`:

```js
const handleAddToCart = () => {
  if (clickCount === 0) {
    setClickCount(1);
    return; // Không làm gì cả ở lần đầu tiên
  }
  addToCart(product, parseInt(quantity));
  ...
};
```

Vì `clickCount` được reset về `0` sau mỗi lượt thêm thành công (và cũng reset khi component remount do điều hướng), lỗi lặp lại liên tục chứ không chỉ xảy ra một lần trong phiên.

## Evidence

- Screenshot (bấm 1 lần, nút không đổi nhãn): ![BUG-PRODDETAIL-001-first-click](../screenshots/BUG-PRODDETAIL-001-first-click-no-effect.png)
- Screenshot (giỏ hàng vẫn trống sau khi bấm): ![BUG-PRODDETAIL-001-cart-empty](../screenshots/BUG-PRODDETAIL-001-cart-empty-after-click.png)

## Notes

Đây là lỗi nghiêm trọng nhất của màn hình: người dùng bấm nút mua hàng mà không nhận được bất kỳ phản hồi nào sẽ tin rằng hệ thống hỏng và rời trang. Lỗi này đồng thời kéo theo 5 item checklist `Failed` (FUN-01, FUN-02, FUN-03, FDB-04, USB-04).

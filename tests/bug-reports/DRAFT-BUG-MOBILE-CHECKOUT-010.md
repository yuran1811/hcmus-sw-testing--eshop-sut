# [BUG][Mobile Checkout] Hiển thị thông báo lỗi bằng alert() thay vì nhãn văn bản ở phía trên nút đặt hàng khi xảy ra lỗi kết nối mạng

## Found by Test Case
TC-MOBILE-CHECKOUT-018

## Requirement liên quan
FR-22

## Severity / Priority
Minor / P2

## Environment
- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:8081
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce
1. Đăng nhập và đi tới màn hình Checkout di động.
2. Ngắt kết nối mạng của thiết bị (hoặc tắt Wi-Fi).
3. Nhấn nút "Xác Nhận Thanh Toán" để gửi yêu cầu đặt hàng.

## Expected result
- Ứng dụng hiển thị thông báo lỗi bằng tiếng Việt rõ ràng, thân thiện.
- Thông báo lỗi bắt buộc phải hiển thị dạng nhãn văn bản trực tiếp ở phía TRÊN nút hành động đặt hàng theo quy chuẩn thiết kế (FR-22), thay vì dùng Alert chặn tương tác.

## Actual result
- Ứng dụng hiển thị hộp thoại `Alert.alert` chặn tương tác của hệ điều hành với thông báo: "Lỗi khi thanh toán".
- Không có bất kỳ nhãn lỗi dạng văn bản nào được render ngay trên nút bấm.

## Evidence
Đoạn mã xử lý lỗi tại `frontend-mobile/App.js` dòng 417:
```javascript
} catch (error) {
  Alert.alert("Lỗi khi thanh toán", error.message || "Có lỗi xảy ra.");
}
```

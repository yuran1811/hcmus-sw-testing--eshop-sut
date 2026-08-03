# Sample finding shape (EShop usability)

### F-01 — Thông báo lỗi thêm giỏ hàng không rõ ràng khi sản phẩm hết hàng

- Flow: Browse -> Add to cart -> Checkout
- FR: FR-07, IA-04
- Frequency: 3/7
- Bằng chứng: P01, P03, P05 cố thêm sản phẩm đã hết hàng. Hệ thống hiển thị "Error" mà không giải thích lý do. P01 nói: "Lỗi gì vậy? Sao không mua được?"
- Tác động đến task: Gây do dự 10–15 giây, 2/3 participant thử lại nhiều lần trước khi chuyển sản phẩm khác.
- Severity: S3
- Lý do severity: Hoàn thành task nhưng bị chậm đáng kể do thông báo lỗi mơ hồ.
- Nguyên nhân khả dĩ: Backend trả lỗi generic, frontend không phân biệt "hết hàng" vs "lỗi server".
- Đề xuất: Hiển thị rõ "Sản phẩm đã hết hàng" và disable nút Add to Cart khi stock = 0.
- Tiêu chí xác minh: Sản phẩm hết hàng phải hiện trạng thái rõ ràng, nút thêm giỏ bị vô hiệu hóa.

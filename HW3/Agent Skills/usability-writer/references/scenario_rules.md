# Task scenario rules

## Must

- State user **goal** and constraints (budget, coupon code, product type, account info)
- Define **done** (what screen/info proves success)
- Stay inside one E2E flow chosen for HW03 — use EShop FR codes
- Work for non-expert participants (non-IT preferred)
- Use realistic Vietnamese e-commerce context

## Must not

- Step-by-step UI instructions (click X, then Y)
- Spoil the path ("use the green button on the right")
- Require class-only knowledge of admin tools (unless flow is admin and allowed)
- Reference Lumiere Cinema — this is EShop

## EShop example patterns

### Pool A — Auth flow:

> Bạn vừa biết đến EShop và muốn mua sắm trực tuyến. Hãy tạo tài khoản mới, sau đó đăng nhập, cập nhật thông tin cá nhân và đổi mật khẩu của bạn. Bạn hoàn thành khi đã đổi mật khẩu thành công.

### Pool B — Cart & Checkout flow:

> Bạn muốn mua một sản phẩm có giá dưới 500.000đ và thanh toán bằng mã giảm giá. Hãy tìm sản phẩm, thêm vào giỏ hàng, và hoàn tất đến khi thấy thông tin xác nhận đơn hàng.

### Pool A+B — Browse to Checkout:

> Bạn cần tìm một sản phẩm thuộc danh mục [category], xem chi tiết, thêm vào giỏ hàng rồi thanh toán. Bạn hoàn thành khi thấy trang xác nhận đơn hàng.

## Success / fail (define in test-plan)

- Success: all sub-goals complete within timebox
- Fail: abandon, timeout, or cannot recover without moderator intervention
- Assisted success: completed only after moderator intervention (log it with timestamp)

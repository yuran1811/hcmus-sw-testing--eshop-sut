# Blind Spot Catalog — duyệt để tìm case AI bỏ sót

Cách dùng: duyệt lần lượt từng nhóm, đối chiếu với bộ case hiện có. Nhóm nào chưa có case nào → ứng viên cho phần Extend. Chọn 5–8 case có giá trị cao nhất (ưu tiên nhóm 1–4), không cần phủ hết.

Mỗi mục ghi kèm nhóm nguyên nhân gợi ý: **[P]** prompt quality · **[M]** model limitation · **[A]** API characteristic.

---

## 1. Quan hệ sở hữu dữ liệu (IDOR / cross-user)

- [ ] User A đọc resource của user B bằng cách đổi id trên URL — **[P]**
- [ ] User A sửa/xoá resource của user B — **[P]**
- [ ] Đoán id tuần tự quanh id của mình (id ± 1) — **[M]**
- [ ] Thêm item vào giỏ hàng của user khác — **[M]**
- [ ] Xem lịch sử đơn hàng của user khác qua query param `userId` — **[M]**
- [ ] Admin bị hạ quyền vẫn còn token cũ dùng được — **[M]**

Vì sao AI bỏ sót: chữ ký endpoint `GET /orders/{id}` không chứa thông tin ai sở hữu order nào. Muốn sinh case này phải hiểu mô hình dữ liệu, mà mô hình dữ liệu không nằm trong spec endpoint.

## 2. Tác dụng phụ của chuyển trạng thái

- [ ] Huỷ đơn đã trừ kho → tồn kho có được hoàn lại — **[A]**
- [ ] Huỷ đơn đã dùng coupon một-lần → lượt dùng coupon có được trả lại — **[A]**
- [ ] Xoá sản phẩm đang nằm trong đơn hàng đã đặt → đơn cũ còn xem được không — **[A]**
- [ ] Xoá category còn chứa sản phẩm → sản phẩm mồ côi hay bị chặn — **[A]**
- [ ] Khoá tài khoản có huỷ session/token đang hoạt động không — **[M]**
- [ ] Đổi mật khẩu có vô hiệu hoá token cũ không — **[M]**

Vì sao AI bỏ sót: spec mô tả *trạng thái*, không mô tả *hệ quả lan toả*. Đây là kiến thức nghiệp vụ nằm ngoài văn bản.

## 3. Đồng thời, lặp lại, thứ tự

- [ ] Double submit checkout → tạo 2 đơn trùng — **[M]**
- [ ] Hai request đổi trạng thái đơn gửi đồng thời — **[M]**
- [ ] Hai user cùng mua sản phẩm cuối cùng trong kho — **[M]**
- [ ] Dùng cùng coupon một-lần ở 2 request đồng thời — **[M]**
- [ ] Gọi cùng action 2 lần (confirm 2 lần) — idempotency — **[M]**
- [ ] Token reset password dùng lại lần thứ 2 — **[M]**
- [ ] Gọi bước 2 của reset password mà chưa qua bước 1 — **[M]**

Vì sao AI bỏ sót: test case là văn bản tuần tự; mô hình mặc định mỗi request xảy ra cô lập.

## 4. Ràng buộc xuyên endpoint

- [ ] Giá sản phẩm đổi sau khi đã thêm vào giỏ → giỏ dùng giá cũ hay mới — **[A]**
- [ ] Sản phẩm bị ẩn/hết hàng nhưng vẫn còn trong giỏ → checkout được không — **[A]**
- [ ] Coupon bị admin xoá khi user đang ở bước thanh toán — **[A]**
- [ ] Import CSV tạo sản phẩm trùng mã với sản phẩm đang tồn tại — **[A]**
- [ ] Tổng tiền server tính có khớp với tổng tiền hiển thị ở API giỏ hàng không — **[M]**

Vì sao AI bỏ sót: context chỉ chứa một endpoint; ràng buộc nằm ở giao giữa nhiều endpoint.

## 5. Ngữ cảnh vận hành / bản địa hoá

- [ ] Tiếng Việt có dấu trong tên, địa chỉ → lưu và trả về đúng UTF-8 — **[P]**
- [ ] Emoji trong tên sản phẩm / ghi chú đơn hàng — **[M]**
- [ ] Timezone GMT+7: đơn tạo 23:30 hiển thị đúng ngày không — **[M]**
- [ ] Số tiền VNĐ: có bị làm tròn thành số thực không, có phần thập phân không — **[M]**
- [ ] Số điện thoại VN: `0912345678` vs `+84912345678` — **[P]**
- [ ] Mật khẩu dài > 72 byte (giới hạn bcrypt) → có bị cắt âm thầm không — **[M]**
- [ ] Sắp xếp tên tiếng Việt theo alphabet (collation) — **[M]**

## 6. Mass assignment / tin dữ liệu client

- [ ] Gửi `role: "admin"` khi đăng ký — **[P]**
- [ ] Gửi `price: 0` hoặc `total: 0` khi checkout — **[P]**
- [ ] Gửi `status: "delivered"` khi tạo đơn — **[M]**
- [ ] Gửi `id` để ghi đè id sinh tự động — **[M]**
- [ ] Gửi `createdAt` ghi đè metadata — **[M]**
- [ ] Số lượng âm để tạo tổng tiền âm — **[M]**
- [ ] Coupon giảm giá vượt tổng tiền → tổng âm — **[M]**

## 7. Xử lý lỗi và rò rỉ thông tin

- [ ] Message login phân biệt "email không tồn tại" vs "sai mật khẩu" — **[M]**
- [ ] Thời gian phản hồi khác nhau giữa email tồn tại/không (timing attack) — **[M]**
- [ ] Lỗi 500 trả về stack trace / tên bảng — **[M]**
- [ ] Response chứa `passwordHash`, `salt`, hoặc token của user khác — **[P]**
- [ ] Header lộ phiên bản framework — **[M]**

## 8. Đầu vào bất thường ở tầng giao thức

- [ ] Body rỗng cho endpoint yêu cầu body — **[M]**
- [ ] JSON sai cú pháp (thiếu ngoặc) → 400 chứ không 500 — **[M]**
- [ ] Content-Type `text/plain` với body JSON → 415 — **[M]**
- [ ] Body rất lớn (payload 10MB) — **[M]**
- [ ] JSON lồng sâu / mảng cực lớn — **[M]**
- [ ] Field trùng tên trong JSON `{"a":1,"a":2}` — **[M]**
- [ ] Method không hỗ trợ trên endpoint → 405 — **[M]**
- [ ] Query param lặp `?page=1&page=2` — **[M]**

## 9. Phân trang và truy vấn (cho FR-05, FR-11, FR-18)

- [ ] `limit` vượt trần cho phép → tự cap hay lỗi — **[M]**
- [ ] `page` âm hoặc 0 — **[M]**
- [ ] `page` vượt tổng số trang → mảng rỗng, không lỗi — **[M]**
- [ ] `sortBy` với tên cột tuỳ ý (nguy cơ SQLi qua ORDER BY) — **[M]**
- [ ] Ký tự wildcard `%`, `_` trong từ khoá tìm kiếm — **[M]**
- [ ] Từ khoá rỗng / chỉ khoảng trắng — **[M]**
- [ ] Tổng `totalItems` có khớp với số bản ghi thật không — **[M]**

---

## Mẫu ghi lý do bỏ sót (dùng cho báo cáo)

Viết theo cấu trúc: *AI thấy gì → AI không thấy gì → vì sao → nhóm nguyên nhân*.

> TC-B-ORDER-ST-021. AI có bảng trạng thái đơn hàng trong spec nên sinh đủ các case chuyển trạng thái hợp lệ và một phần case không hợp lệ. Nhưng nó không sinh case kiểm tra tồn kho sau khi huỷ đơn, vì `api_specification.md` chỉ định nghĩa trường `status` và các chuyển đổi, hoàn toàn không nhắc tới quan hệ giữa đơn hàng và kho. Thông tin này không có trong ngữ cảnh mà AI được cung cấp, nên đây là giới hạn của đặc tả chứ không phải của prompt. → **API characteristic**

Tránh viết chung chung kiểu "AI không thông minh bằng con người" — không có giá trị đánh giá.

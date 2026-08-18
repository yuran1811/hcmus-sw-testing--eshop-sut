# Audit Rubric — dấu hiệu nhận biết VALID / INVALID / INCOMPLETE

## VALID — đủ 6 điều kiện

1. Kỳ vọng khớp với nguyên văn spec (trích được câu/mục làm bằng chứng)
2. Request cụ thể tới mức copy vào Postman chạy được ngay
3. Precondition đủ để tái lập (hoặc ghi `-` nếu thật sự không cần)
4. Expected response assert được bằng máy, không phải mô tả cảm tính
5. Có `SpecRef` truy vết về FR/SEC hoặc mục spec
6. Không trùng lớp tương đương với case khác

Thiếu 1 trong 6 → INCOMPLETE. Sai điều 1 → INVALID.

---

## INVALID — các dạng thường gặp

### Sai status code kỳ vọng

| Tình huống | Hay bị ghi sai | Đúng thường là |
|---|---|---|
| Tài nguyên trùng (email đã tồn tại) | 400 | **409 Conflict** |
| Chuyển trạng thái không hợp lệ | 400 | **409** (hoặc 400 — kiểm tra spec) |
| Đã đăng nhập nhưng không đủ quyền | 401 | **403** |
| Chưa đăng nhập | 403 | **401** |
| Body đúng cú pháp nhưng sai rule nghiệp vụ | 400 | **422** nếu spec dùng 422 |
| Method không hỗ trợ | 404 | **405** |
| Content-Type sai | 400 | **415** |
| Xoá thành công | 200 kèm body | **204** nếu spec quy định |

Không tự áp chuẩn REST "sách vở" lên spec. Nếu spec của EShop nói dùng 400 cho mọi lỗi thì 400 là đúng — nhãn INVALID chỉ dành cho case **lệch khỏi spec**, không phải lệch khỏi thói quen.

### Kiểm chứng thứ spec không quy định

Case ghi kỳ vọng chắc nịch cho hành vi mà spec im lặng. Ví dụ: "kỳ vọng trả về 429 khi quá 100 request/phút" trong khi spec không hề nói tới rate limit.

Xử lý: đổi thành INVALID, sửa lại thành *câu hỏi cho spec* hoặc gán expected `UNKNOWN` + Note "spec chưa định nghĩa", đừng xoá — đây là spec gap đáng báo cáo.

### Precondition mâu thuẫn hoặc bất khả thi

- "Tài khoản đang bị khoá **và** đăng nhập thành công"
- "Đơn hàng ở trạng thái delivered, thực hiện thanh toán lần đầu"
- Dùng token admin nhưng lại kỳ vọng 403 vì thiếu quyền

### Sai endpoint / method / tên field

AI hay bịa field nghe hợp lý nhưng không có trong spec: `userId` trong khi spec dùng `user_id`, `POST /api/orders/cancel` trong khi spec dùng `PATCH /api/orders/{id}/status`. Đối chiếu từng ký tự với spec.

### Case tự mâu thuẫn giữa các cột

Title nói "từ chối", ExpectedStatus ghi 200. Body gửi thiếu field required nhưng kỳ vọng 201.

### Nhầm lớp tương đương

Ghi là boundary nhưng giá trị nằm giữa miền; ghi là invalid nhưng giá trị thực ra hợp lệ theo spec (vd coi `"Nguyễn Văn A"` là invalid vì có dấu, trong khi spec cho phép UTF-8).

---

## INCOMPLETE — các dạng thường gặp

### Dữ liệu mơ hồ

- `RequestBody`: "dữ liệu hợp lệ", "email sai định dạng", "{...}" → phải thay bằng JSON thật
- Precondition: "có sẵn đơn hàng" → phải ghi rõ trạng thái và chủ sở hữu đơn

### Expected chỉ có status

`ExpectedStatus: 400` mà không nói body chứa gì. Một case 400 vì thiếu field và một case 400 vì sai kiểu dữ liệu phải phân biệt được qua message/error code, nếu không thì test pass cả khi API trả sai lý do.

Bổ sung tối thiểu: error code hoặc field nào được nêu trong message.

### Thiếu assert phủ định

Case security đặc biệt cần assert **cái không được xuất hiện**: body không chứa `passwordHash`, không chứa dữ liệu của user khác, không chứa stack trace. Chỉ assert status là chưa đủ — API có thể trả 200 kèm dữ liệu rò rỉ.

### Thiếu header bắt buộc

Mọi case phải có `X-Student-Id: {StudentID}` theo mục 11 của đề bài. Case thiếu header này → INCOMPLETE.

### Thiếu SpecRef

Không truy vết được về FR/SEC. Bổ sung, và nếu thật sự không map được vào mục nào của spec thì xem lại: có thể case này đang kiểm chứng thứ spec không quy định (→ INVALID).

### Thiếu bước dọn dẹp

Case tạo dữ liệu (POST) mà không nói dữ liệu đó xử lý ra sao sau khi chạy → chạy lại lần 2 sẽ fail vì trùng unique constraint. Bổ sung teardown hoặc dùng dữ liệu động (`{{$timestamp}}` trong email).

---

## Sai lệch hệ thống của test case do LLM sinh

Ghi nhận các mẫu này khi viết mục AI Critique:

| Thiên lệch | Biểu hiện | Vì sao xảy ra |
|---|---|---|
| **Happy-path bias** | Nhiều case 2xx, ít case đường biên xấu | Dữ liệu huấn luyện chủ yếu là ví dụ minh hoạ hạnh phúc |
| **Đối xứng giả** | Sinh đủ 5 case cho mỗi tham số kể cả tham số không đáng | Xu hướng lấp đầy khuôn mẫu |
| **Đường đi hợp lệ** | Chỉ phủ transition hợp lệ, bỏ ô cấm | Spec mô tả luồng đúng, model bám theo mô tả |
| **Thế giới tuần tự** | Không có case đồng thời/race | Test case là văn bản tuần tự |
| **Một endpoint một vũ trụ** | Không có ràng buộc xuyên endpoint | Context chỉ chứa 1 endpoint |
| **Chuẩn hoá quá tay** | Áp chuẩn REST sách vở lên spec thực tế | Kiến thức chung lấn át spec cụ thể |
| **Bịa field hợp lý** | Field nghe đúng nhưng không có trong spec | Điền chỗ trống theo mẫu quen thuộc |
| **Diễn giải lại yêu cầu** | Biến case khó thành case dễ tương tự | Xu hướng hoàn thành nhiệm vụ |

Mục AI Critique nên nêu 2–3 mẫu **quan sát được thật trong bài của mình**, kèm TC_ID cụ thể làm bằng chứng, thay vì liệt kê cả bảng.

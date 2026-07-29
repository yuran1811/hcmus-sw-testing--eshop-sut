# Phiên P00 (Pilot) — U-01

---

## Metadata

- Ngày/giờ: 13:13 ngày 29/07/2026
- Người tham gia: Nguyễn Trần Lan Viên
- Thiết bị, OS, trình duyệt: Windows, trình duyệt Edge
- Đồng thuận: Bằng lời
- Timebox: 10 phút
- Deviation: Không

---

## Kết quả

- Outcome: SUCCESS_UNASSISTED
- Thời lượng (giây): 71
- Số error: 0
- Số wrong turn: 0
- Số hesitation ≥ 5 giây: 0
- Số intervention: 0
- Đạt điều kiện thành công (theo test-plan): Có — màn hình "Thanh toán thành công!" hiển thị;
  trước khi bấm xác nhận đã áp `VIP100` thành công ở bước Checkout

**Định nghĩa dùng để đếm (giữ nhất quán giữa các phiên):**

| Thuật ngữ       | Định nghĩa                                                                                                                                            |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Error           | Hành động cho kết quả trái mục tiêu mà hệ thống không ngăn được (VD: thêm nhầm sản phẩm vượt ngân sách vào giỏ và tiến hành thanh toán)               |
| Wrong turn      | Điều hướng sang màn hình không tiến gần mục tiêu, tự sửa được, chưa đến mức là error (VD: mở trang Giỏ hàng để tìm ô nhập mã giảm giá rồi tự quay ra) |
| Hesitation ≥ 5s | Dừng lại không thao tác từ 5 giây trở lên, có biểu hiện phân vân — ghi lại mốc thời gian                                                              |
| Intervention    | Moderator nói/làm gì đó để giúp người tham gia thoát khỏi bế tắc — ghi nguyên văn, trạng thái trước đó và kết quả                                     |

---

## Timeline quan sát

| Thời gian | Stage/FR | Mục tiêu                       | Hành động quan sát được                                           | Phản hồi hệ thống                                                        | Tác động                                                         | Quote nguyên văn                       |
| --------- | -------- | ------------------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------- | -------------------------------------- |
| 00:00     | FR-05    | Xem toàn bộ sản phẩm đang bán  | Cuộn hết danh sách sản phẩm trên trang chủ, không dùng ô tìm kiếm | Trang chủ hiện 5 sản phẩm                                                | Tiến triển bình thường                                           |                                        |
| 00:06     | FR-06    | Xem kỹ sản phẩm định mua       | Bấm "Xem chi tiết" ở sản phẩm `MacBook Pro M3`                    | Mở trang chi tiết: ảnh, giá, mô tả ngắn                                  | Tiến triển; sau phiên nhận xét thông tin trên trang này "hơi ít" |                                        |
| 00:23     | FR-07    | Thêm sản phẩm vào giỏ          | Bấm "Thêm vào giỏ hàng" `1` lần                                   | Nhãn nút đổi thành "Đã thêm"                                             | Tiến triển                                                       |                                        |
| 00:32     | FR-07    | Kiểm tra giỏ hàng              | Bấm "Giỏ hàng" trên header                                        | Hiện dòng sản phẩm vừa thêm kèm Tổng tạm tính                            | Tiến triển                                                       |                                        |
| 00:43     | FR-08    | Sang bước thanh toán           | Bấm "Tiến hành thanh toán"                                        | Sang trang Checkout; khối "Mã Giảm Giá" hiển thị trong tầm nhìn đầu tiên | Tiến triển, không phải đi tìm                                    | "Ủa sao điều chỉnh được tổng tiền vậy" |
| 00:56     | FR-09    | Áp mã giảm giá                 | Gõ `VIP100` vào ô mã rồi bấm "Áp dụng"                            | "Áp dụng thành công! Giảm 100,000 ₫" kèm dòng Thành tiền                 | Tiến triển                                                       |                                        |
| 01:05     | FR-08    | Kiểm tra số tiền trước khi trả | Nhìn khối "Tổng tiền thanh toán"                                  | Ô tổng tiền cho phép sửa giá trị                                         | Sau phiên cho biết có nhận ra ô này sửa được                     |                                        |
| 01:11     | FR-08    | Hoàn tất đơn hàng              | Bấm "Xác Nhận Thanh Toán"                                         | Hiện màn hình "Thanh toán thành công!"                                   | Đạt trạng thái thành công — kết thúc phiên ở giây thứ 71         |                                        |

_Gợi ý các stage để đối chiếu (không bắt buộc theo thứ tự này — người tham gia tự chọn đường đi):_
`FR-05 tìm/lọc sản phẩm` · `FR-06 xem chi tiết` · `FR-07 thêm & xem giỏ hàng` · `FR-09 áp mã giảm giá` · `FR-08 xác nhận thanh toán`

---

## Can thiệp của moderator

- Không có

---

## Thang đo sau phiên — SUS

Ghi **điểm thô** từng item (1 = Hoàn toàn không đồng ý → 5 = Hoàn toàn đồng ý).
**Không quy đổi tại chỗ** — việc quy đổi thực hiện ở Phase 3 để tránh sai số cộng dồn.

| #   | Nội dung item                                                            | Điểm (1–5) |
| --- | ------------------------------------------------------------------------ | ---------- |
| 1   | Tôi nghĩ tôi sẽ muốn dùng hệ thống này thường xuyên.                     | 1          |
| 2   | Tôi thấy hệ thống này phức tạp một cách không cần thiết.                 | 1          |
| 3   | Tôi thấy hệ thống này dễ sử dụng.                                        | 5          |
| 4   | Tôi nghĩ mình cần người rành kỹ thuật hỗ trợ mới dùng được hệ thống này. | 1          |
| 5   | Tôi thấy các chức năng trong hệ thống này được tích hợp tốt với nhau.    | 3          |
| 6   | Tôi thấy hệ thống này có quá nhiều điểm thiếu nhất quán.                 | 3          |
| 7   | Tôi nghĩ hầu hết mọi người sẽ học cách dùng hệ thống này rất nhanh.      | 4          |
| 8   | Tôi thấy hệ thống này rất cồng kềnh, bất tiện khi dùng.                  | 1          |
| 9   | Tôi cảm thấy rất tự tin khi dùng hệ thống này.                           | 3          |
| 10  | Tôi cần học nhiều thứ trước khi có thể bắt đầu dùng hệ thống này.        | 1          |

---

## Câu hỏi mở (probe questions)

| Nhóm           | Câu hỏi                                                                                                                 | Trả lời                            |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Clarity        | Ở bước nhập mã giảm giá, bạn tìm thấy chỗ nhập mã bằng cách nào?                                                        | Nhập vào ô                         |
| Clarity        | Khi xem trang thông tin chi tiết của sản phẩm, những gì hiển thị ở đó có đủ để bạn quyết định mua chưa?                 | Thông tin hơi ít                   |
| Error recovery | Nếu lúc nãy bạn muốn đổi sang một sản phẩm khác sau khi đã thêm vào giỏ, bạn sẽ làm thế nào?                            | Xóa cái cũ, quay lại, thêm cái mới |
| Error recovery | Trong lúc thao tác, có lúc nào bạn nghĩ mình vừa làm sai một bước không? Lúc đó bạn đã làm gì tiếp theo?                | Không                              |
| Speed          | Từ lúc bắt đầu tìm sản phẩm đến lúc đặt xong, bạn thấy mất nhiều thời gian hơn hay ít hơn so với bạn hình dung ban đầu? | Ít hơn                             |
| Speed          | Có bước nào bạn thấy mình phải lặp lại thao tác nhiều lần không?                                                        | Không                              |
| Trust          | Số tiền cuối cùng hiển thị trước khi bấm xác nhận — bạn có đối chiếu lại với giá sản phẩm không? Vì sao?                | Giá tổng đơn có thể thay đổi được  |
| Trust          | Nếu đây là tiền thật của bạn, bạn có bấm "Xác Nhận Thanh Toán" ở màn hình đó không?                                     | Có                                 |

---

## Tóm tắt của researcher

- Điểm nghẽn chính: Không
- Điều hỗ trợ hoàn thành: Không
- Ghi chú cần xác minh, không phải quan sát trực tiếp: Không

---

# Checklist riêng của pilot — "đã đổi gì sau pilot"

## A. Kịch bản task scenario

| #   | Cần kiểm tra                                                                                                | Phát hiện ở pilot         | Quyết định | Nội dung đã sửa |
| --- | ----------------------------------------------------------------------------------------------------------- | ------------------------- | ---------- | --------------- |
| A1  | Người tham gia có hiểu ngay mục tiêu sau khi nghe đọc 1 lần không?                                          | Có                        | Không      | Không           |
| A2  | Kịch bản có vô tình **gợi ý các bước** (nói lộ chỗ nhập mã, tên nút) không?                                 | Không                     | Không      | Không           |
| A3  | Ràng buộc "dưới 50 triệu" có tạo ra lựa chọn thật không, hay người tham gia chọn ngay không cần cân nhắc?   | Không                     | Không      | Không           |
| A4  | Có từ ngữ nào trong kịch bản gây khó hiểu / phải hỏi lại không?                                             | Không                     | Không      | Không           |
| A5  | Cách đưa mã `VIP100` (viết ra giấy) có tự nhiên không, hay làm người tham gia tưởng phải dùng ngay lập tức? | Tự nhiên, không ảnh hưởng | Không      | Không           |

## B. Timebox và nhịp phiên

| #   | Cần kiểm tra                                                        | Phát hiện ở pilot | Quyết định     | Nội dung đã sửa      |
| --- | ------------------------------------------------------------------- | ----------------- | -------------- | -------------------- |
| B1  | Thời gian thực tế hoàn thành task là bao nhiêu?                     | 1p11s             | Giảm thời gian | Giảm từ 10p xuống 5p |
| B2  | 10 phút là quá dài, quá ngắn, hay vừa?                              | Quá dài           | Giảm thời gian | Giảm từ 10p xuống 5p |
| B3  | Phần SUS + câu hỏi mở mất bao lâu? Tổng buổi có vượt dự kiến không? | Không             | Không          | Không                |

## C. Công cụ và môi trường

| #   | Cần kiểm tra                                                                                                                            | Phát hiện ở pilot | Quyết định | Nội dung đã sửa |
| --- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------- | --------------- |
| C1  | Ghi màn hình có bắt được toàn bộ thao tác không? Có tiếng rõ không?                                                                     | Có                | Không      | Không           |
| C2  | Đồng hồ bấm giờ và cách đánh dấu mốc thời gian có dùng được trong lúc vừa quan sát vừa ghi chú không?                                   | Có                | Không      | Không           |
| C3  | **Mã `VIP100` còn hiệu lực khi tới bước checkout không?** (giới hạn 2 lần/người — nếu báo hết lượt nghĩa là quy trình reseed chưa đúng) | Có                | Không      | Không           |
| C4  | Quy trình restart backend để reseed có thực sự xoá `coupon_usage` không?                                                                | Có                | Không      | Không           |
| C5  | Ảnh sản phẩm (tải từ domain ngoài) có hiện đủ trong suốt phiên không?                                                                   | Có                | Không      | Không           |
| C6  | Start state có được khôi phục đúng và nhanh giữa các phiên không?                                                                       | Có                | Không      | Không           |

## D. SUS và câu hỏi mở

| #   | Cần kiểm tra                                                                           | Phát hiện ở pilot | Quyết định | Nội dung đã sửa |
| --- | -------------------------------------------------------------------------------------- | ----------------- | ---------- | --------------- |
| D1  | Có item SUS nào người tham gia đọc xong phải hỏi lại nghĩa không? (ghi rõ item số mấy) | Không             | Không      | Không           |
| D2  | Người tham gia có hiểu thang 1–5 theo đúng chiều không (không nhầm ngược)?             | Không             | Không      | Không           |
| D3  | Câu hỏi mở nào bị trả lời cụt lủn "không có gì" — cần diễn đạt lại?                    | Không             | Không      | Không           |
| D4  | Có câu hỏi nào vô tình **dẫn dắt** (khiến người tham gia đoán ý moderator) không?      | Không             | Không      | Không           |

## E. Vai trò moderator

| #   | Cần kiểm tra                                                                    | Phát hiện ở pilot | Quyết định     | Nội dung đã sửa     |
| --- | ------------------------------------------------------------------------------- | ----------------- | -------------- | ------------------- |
| E1  | Có lúc nào moderator lỡ gợi ý/xác nhận đúng-sai không?                          | Không             | Không          | Không               |
| E2  | Ngưỡng can thiệp (~60 giây kẹt) có hợp lý không?                                | Không             | Giảm thời gian | Giảm từ 60s --> 30s |
| E3  | Việc vừa quan sát vừa ghi timeline có kịp không, hay cần người ghi chú thứ hai? | Kịp               | Không          | Không               |

---

## Kết luận pilot

- [x] **Đã sửa xong kịch bản/công cụ — sẵn sàng chạy P01–P07**
- [ ] Cần chạy thêm một pilot nữa

**Tổng số thay đổi đã thực hiện sau pilot:** Giảm tổng thời gian từ 10p xuống 5p, giảm ngưỡng 60s xuống 30s

**Ngày chốt phiên bản kịch bản dùng cho P01–P07:** 29/07/2026

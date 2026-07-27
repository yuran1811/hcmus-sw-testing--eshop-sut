# Phiên P00 (Pilot) — U-01

> **Chưa chạy.** Toàn bộ file này là template rỗng. Điền các mục dưới đây **trong hoặc ngay sau**
> phiên pilot thật. Không suy đoán, không điền sẵn nội dung "hợp lý" — mọi dòng phải bắt nguồn từ
> quan sát thực tế (ghi chú tay, video, hoặc bản ghi âm của chính phiên này).

**Mục đích của phiên pilot:** phát hiện lỗi trong **kịch bản và công cụ**, _không_ phải để tạo dữ
liệu cho báo cáo. Kết quả phiên này **không được đưa vào số liệu tổng hợp ở Phase 3** — chỉ ghi
chú trong báo cáo rằng đã chạy pilot và đã sửa những gì.

---

## Metadata

- Ngày/giờ: CHƯA THU THẬP
- Người tham gia: P00 (Pilot) — khớp hồ sơ mục tiêu, **không** thuộc nhóm 7 người chính
- Thiết bị, OS, trình duyệt: CHƯA THU THẬP
- Đồng thuận: CHƯA THU THẬP _(ghi rõ hình thức: đã ký / bằng lời)_
- Timebox: 10 phút
- Deviation: CHƯA THU THẬP

**Xác nhận đã chuẩn bị (đánh dấu tại thời điểm chạy phiên):**

- [ ] Đã restart backend để reseed dữ liệu (xoá `coupon_usage`)
- [ ] Đã đăng nhập sẵn `test@eshop.com`
- [ ] Giỏ hàng rỗng, ô tìm kiếm trống, cửa sổ 1440×900
- [ ] Ghi màn hình + ghi âm đang chạy
- [ ] Mã `VIP100` đã viết sẵn ra giấy/ghi chú

---

## Kết quả

- Outcome: CHƯA THU THẬP _(`SUCCESS_UNASSISTED` | `SUCCESS_ASSISTED` | `FAIL` | `ABANDONED`)_
- Thời lượng (giây): CHƯA THU THẬP
- Số error: CHƯA THU THẬP
- Số wrong turn: CHƯA THU THẬP
- Số hesitation ≥ 5 giây: CHƯA THU THẬP
- Số intervention: CHƯA THU THẬP
- Đạt điều kiện thành công (theo test-plan): CHƯA THU THẬP

**Định nghĩa dùng để đếm (giữ nhất quán giữa các phiên):**

| Thuật ngữ       | Định nghĩa                                                                                                                                            |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Error           | Hành động cho kết quả trái mục tiêu mà hệ thống không ngăn được (VD: thêm nhầm sản phẩm vượt ngân sách vào giỏ và tiến hành thanh toán)               |
| Wrong turn      | Điều hướng sang màn hình không tiến gần mục tiêu, tự sửa được, chưa đến mức là error (VD: mở trang Giỏ hàng để tìm ô nhập mã giảm giá rồi tự quay ra) |
| Hesitation ≥ 5s | Dừng lại không thao tác từ 5 giây trở lên, có biểu hiện phân vân — ghi lại mốc thời gian                                                              |
| Intervention    | Moderator nói/làm gì đó để giúp người tham gia thoát khỏi bế tắc — ghi nguyên văn, trạng thái trước đó và kết quả                                     |

---

## Timeline quan sát

> Một dòng cho mỗi sự kiện đáng chú ý. Cột "Quote nguyên văn" chỉ ghi lời người tham gia **thật sự
> nói ra**, không diễn giải lại.

| Thời gian | Stage/FR | Mục tiêu | Hành động quan sát được | Phản hồi hệ thống | Tác động | Quote nguyên văn |
| --------- | -------- | -------- | ----------------------- | ----------------- | -------- | ---------------- |
|           |          |          |                         |                   |          |                  |
|           |          |          |                         |                   |          |                  |
|           |          |          |                         |                   |          |                  |

_Gợi ý các stage để đối chiếu (không bắt buộc theo thứ tự này — người tham gia tự chọn đường đi):_
`FR-05 tìm/lọc sản phẩm` · `FR-06 xem chi tiết` · `FR-07 thêm & xem giỏ hàng` · `FR-09 áp mã giảm giá` · `FR-08 xác nhận thanh toán`

---

## Can thiệp của moderator

> Ghi nguyên văn lời gợi ý, thời điểm, trạng thái trước gợi ý và kết quả. Nếu không có, ghi `Không có`.

CHƯA THU THẬP

---

## Thang đo sau phiên — SUS

Ghi **điểm thô** từng item (1 = Hoàn toàn không đồng ý → 5 = Hoàn toàn đồng ý).
**Không quy đổi tại chỗ** — việc quy đổi thực hiện ở Phase 3 để tránh sai số cộng dồn.

| #   | Nội dung item                                                            | Điểm (1–5) |
| --- | ------------------------------------------------------------------------ | ---------- |
| 1   | Tôi nghĩ tôi sẽ muốn dùng hệ thống này thường xuyên.                     |            |
| 2   | Tôi thấy hệ thống này phức tạp một cách không cần thiết.                 |            |
| 3   | Tôi thấy hệ thống này dễ sử dụng.                                        |            |
| 4   | Tôi nghĩ mình cần người rành kỹ thuật hỗ trợ mới dùng được hệ thống này. |            |
| 5   | Tôi thấy các chức năng trong hệ thống này được tích hợp tốt với nhau.    |            |
| 6   | Tôi thấy hệ thống này có quá nhiều điểm thiếu nhất quán.                 |            |
| 7   | Tôi nghĩ hầu hết mọi người sẽ học cách dùng hệ thống này rất nhanh.      |            |
| 8   | Tôi thấy hệ thống này rất cồng kềnh, bất tiện khi dùng.                  |            |
| 9   | Tôi cảm thấy rất tự tin khi dùng hệ thống này.                           |            |
| 10  | Tôi cần học nhiều thứ trước khi có thể bắt đầu dùng hệ thống này.        |            |

---

## Câu hỏi mở (probe questions)

| Nhóm           | Câu hỏi                                                                                                                 | Trả lời |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- | ------- |
| Clarity        | Ở bước nhập mã giảm giá, bạn tìm thấy chỗ nhập mã bằng cách nào?                                                        |         |
| Clarity        | Khi xem trang thông tin chi tiết của sản phẩm, những gì hiển thị ở đó có đủ để bạn quyết định mua chưa?                 |         |
| Error recovery | Nếu lúc nãy bạn muốn đổi sang một sản phẩm khác sau khi đã thêm vào giỏ, bạn sẽ làm thế nào?                            |         |
| Error recovery | Trong lúc thao tác, có lúc nào bạn nghĩ mình vừa làm sai một bước không? Lúc đó bạn đã làm gì tiếp theo?                |         |
| Speed          | Từ lúc bắt đầu tìm sản phẩm đến lúc đặt xong, bạn thấy mất nhiều thời gian hơn hay ít hơn so với bạn hình dung ban đầu? |         |
| Speed          | Có bước nào bạn thấy mình phải lặp lại thao tác nhiều lần không?                                                        |         |
| Trust          | Số tiền cuối cùng hiển thị trước khi bấm xác nhận — bạn có đối chiếu lại với giá sản phẩm không? Vì sao?                |         |
| Trust          | Nếu đây là tiền thật của bạn, bạn có bấm "Xác Nhận Thanh Toán" ở màn hình đó không?                                     |         |

---

## Tóm tắt của researcher

- Điểm nghẽn chính: CHƯA THU THẬP
- Điều hỗ trợ hoàn thành: CHƯA THU THẬP
- Ghi chú cần xác minh, không phải quan sát trực tiếp: CHƯA THU THẬP

---

# Checklist riêng của pilot — "đã đổi gì sau pilot"

> Đây là **sản phẩm đầu ra thật sự** của phiên pilot. Mỗi mục: ghi phát hiện → quyết định sửa hay
> giữ → nội dung đã sửa. Nếu không có vấn đề, ghi rõ `Không đổi` kèm lý do — đừng để trống.

## A. Kịch bản task scenario

| #   | Cần kiểm tra                                                                                                | Phát hiện ở pilot | Quyết định    | Nội dung đã sửa |
| --- | ----------------------------------------------------------------------------------------------------------- | ----------------- | ------------- | --------------- |
| A1  | Người tham gia có hiểu ngay mục tiêu sau khi nghe đọc 1 lần không?                                          | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
| A2  | Kịch bản có vô tình **gợi ý các bước** (nói lộ chỗ nhập mã, tên nút) không?                                 | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
| A3  | Ràng buộc "dưới 10 triệu" có tạo ra lựa chọn thật không, hay người tham gia chọn ngay không cần cân nhắc?   | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
| A4  | Có từ ngữ nào trong kịch bản gây khó hiểu / phải hỏi lại không?                                             | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
| A5  | Cách đưa mã `VIP100` (viết ra giấy) có tự nhiên không, hay làm người tham gia tưởng phải dùng ngay lập tức? | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |

## B. Timebox và nhịp phiên

| #   | Cần kiểm tra                                                        | Phát hiện ở pilot | Quyết định    | Nội dung đã sửa |
| --- | ------------------------------------------------------------------- | ----------------- | ------------- | --------------- |
| B1  | Thời gian thực tế hoàn thành task là bao nhiêu?                     | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
| B2  | 10 phút là quá dài, quá ngắn, hay vừa?                              | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
| B3  | Phần SUS + câu hỏi mở mất bao lâu? Tổng buổi có vượt dự kiến không? | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |

## C. Công cụ và môi trường

| #   | Cần kiểm tra                                                                                                                            | Phát hiện ở pilot | Quyết định    | Nội dung đã sửa |
| --- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------- | --------------- |
| C1  | Ghi màn hình có bắt được toàn bộ thao tác không? Có tiếng rõ không?                                                                     | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
| C2  | Đồng hồ bấm giờ và cách đánh dấu mốc thời gian có dùng được trong lúc vừa quan sát vừa ghi chú không?                                   | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
| C3  | **Mã `VIP100` còn hiệu lực khi tới bước checkout không?** (giới hạn 2 lần/người — nếu báo hết lượt nghĩa là quy trình reseed chưa đúng) | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
| C4  | Quy trình restart backend để reseed có thực sự xoá `coupon_usage` không?                                                                | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
| C5  | Ảnh sản phẩm (tải từ domain ngoài) có hiện đủ trong suốt phiên không?                                                                   | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
| C6  | Start state có được khôi phục đúng và nhanh giữa các phiên không?                                                                       | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |

## D. SUS và câu hỏi mở

| #   | Cần kiểm tra                                                                           | Phát hiện ở pilot | Quyết định    | Nội dung đã sửa |
| --- | -------------------------------------------------------------------------------------- | ----------------- | ------------- | --------------- |
| D1  | Có item SUS nào người tham gia đọc xong phải hỏi lại nghĩa không? (ghi rõ item số mấy) | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
| D2  | Người tham gia có hiểu thang 1–5 theo đúng chiều không (không nhầm ngược)?             | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
| D3  | Câu hỏi mở nào bị trả lời cụt lủn "không có gì" — cần diễn đạt lại?                    | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
| D4  | Có câu hỏi nào vô tình **dẫn dắt** (khiến người tham gia đoán ý moderator) không?      | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |

## E. Vai trò moderator

| #   | Cần kiểm tra                                                                    | Phát hiện ở pilot | Quyết định    | Nội dung đã sửa |
| --- | ------------------------------------------------------------------------------- | ----------------- | ------------- | --------------- |
| E1  | Có lúc nào moderator lỡ gợi ý/xác nhận đúng-sai không?                          | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
| E2  | Ngưỡng can thiệp (~60 giây kẹt) có hợp lý không?                                | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
| E3  | Việc vừa quan sát vừa ghi timeline có kịp không, hay cần người ghi chú thứ hai? | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |

---

## Kết luận pilot

- [ ] **Đã sửa xong kịch bản/công cụ — sẵn sàng chạy P01–P07**
- [ ] Cần chạy thêm một pilot nữa (ghi lý do: CHƯA THU THẬP)

**Tổng số thay đổi đã thực hiện sau pilot:** CHƯA THU THẬP

**Ngày chốt phiên bản kịch bản dùng cho P01–P07:** CHƯA THU THẬP

> Sau khi chốt, **không được đổi kịch bản giữa chừng** trong 7 phiên chính — nếu buộc phải đổi,
> ghi rõ đổi từ phiên nào và cân nhắc loại các phiên trước đó khỏi phần tổng hợp định lượng.

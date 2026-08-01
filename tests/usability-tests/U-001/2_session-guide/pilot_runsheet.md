# Pilot session runsheet — U-001

> Phiên pilot chạy riêng, không tính vào P01–P07. Mục đích là kiểm tra scenario, instrument, consent, recovery và timing trước khi mời đủ 7 người thật.

## Trước pilot

[] Bản EShop deploy hoạt động ở `https://23127115-testing-hw3.vercel.app/`.
[] Cửa sổ private/incognito mới đã sẵn sàng.
[] Email demo đã chuẩn bị.
[] Screen recording đã sẵn sàng.
[] Nếu ghi âm, micro hoạt động và participant đã đồng ý.
[] `task_scenario.md` và `instrument.md` đã mở.

## Script mở đầu

> Cảm ơn bạn đã tham gia. Hôm nay mình kiểm tra website EShop, không kiểm tra bạn. Không có thao tác đúng hay sai.
>
> Trong lúc dùng, bạn hãy nói to điều bạn đang nhìn, điều bạn mong đợi và điều bạn đang cân nhắc. Mình sẽ quan sát và không hướng dẫn, trừ khi bạn bị kẹt hoàn toàn.
>
> Đây là website demo. Chỉ dùng dữ liệu trên thẻ thử nghiệm, không dùng thông tin cá nhân thật. Bạn có thể dừng bất kỳ lúc nào.

Sau khi xác nhận consent, bắt đầu recording và đọc nguyên văn phần scenario trong `task_scenario.md`.

## Can thiệp và recovery

| Mức | Hành động                                      | Ghi chú                                     |
| --- | ---------------------------------------------- | ------------------------------------------- |
| M0  | Nhắc think-aloud                               | Chỉ để participant tiếp tục nói ra suy nghĩ |
| M1  | Nhắc lại scenario hoặc hỏi kỳ vọng trung lập   | Không hướng dẫn cụ thể                      |
| M2  | Chỉ dẫn/recovery để phần sau vẫn quan sát được | Phiên đó có thể thành `Completed with help` |

Recovery chỉ dùng để đánh giá phần sau, không biến thất bại trước đó thành pass.

## Sau pilot

| Thành phần | Observation                                                                                                       | Quyết định                                                                                                                                                  | Lý do                                                                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Scenario   | Hoạt động bình thường theo hướng mục tiêu, kích thích người dùng tự thao tác.                                     | Giữ nguyên kịch bản.                                                                                                                                        | Kịch bản phản ánh đúng nhu cầu thực tế và không bị lộ bước cụ thể.                                                                    |
| Data card  | Người dùng hiểu rõ nhiệm vụ tự điền email và tự tạo mật khẩu.                                                     | Giữ nguyên thẻ dữ liệu.                                                                                                                                     | Đảm bảo an toàn thông tin và dễ hiểu cho người dùng.                                                                                  |
| Instrument | Các câu hỏi SUS và câu hỏi mở rõ ràng, người dùng trả lời chính xác cảm xúc khi gặp lỗi.                          | Giữ nguyên bộ công cụ đo lường.                                                                                                                             | Đo lường khách quan được trải nghiệm thực tế bao gồm cả khi gặp lỗi hệ thống.                                                         |
| Timing     | Người dùng mất nhiều thời gian do cố gắng đăng ký nhiều lần với mật khẩu hợp lệ nhưng vẫn lỗi.                    | Đặt giới hạn thời gian (timebox) cho bước đăng ký là tối đa 3 phút hoặc sau 3 lần thử.                                                                      | Tránh người dùng nản lòng quá sớm và dành thời gian đánh giá các bước tiếp theo.                                                      |
| Recording  | Video và audio ghi lại rõ ràng thao tác nhập mật khẩu và thông báo lỗi.                                           | Giữ nguyên thiết lập ghi hình.                                                                                                                              | Đảm bảo thu thập đầy đủ bằng chứng kiểm thử (evidence).                                                                               |
| Recovery   | Chưa có sẵn tài khoản kiểm thử hoạt động được để vượt qua lỗi đăng ký, làm gián đoạn việc test tiếp các bước sau. | Chuẩn bị sẵn tài khoản test: `test@eshop.com` / `Test1234!` cho người dùng đăng nhập khi gặp lỗi. Sau mỗi phiên, khôi phục tài khoản về trạng thái ban đầu. | Giúp người dùng bỏ qua bước đăng ký lỗi để tiếp tục đánh giá phần mua hàng/checkout, đồng thời đảm bảo môi trường sạch cho người sau. |

## Gate trước P01

[x] Scenario vẫn goal-oriented và không lộ bước cụ thể.
[x] Participant hiểu dữ liệu demo và không dùng dữ liệu thật.
[x] SUS giữ nguyên 10 item; 4 câu hỏi mở vẫn trung lập.
[x] Recovery hoạt động được nếu participant bị kẹt. (Chuẩn bị sẵn tài khoản test)
[x] Video và note truy vết được, không lộ PII.

Kết luận sau pilot: `Ready (Sau khi chuẩn bị sẵn tài khoản test cho recovery)`

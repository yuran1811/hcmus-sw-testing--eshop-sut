# Pilot Session Runsheet — Phiên thử nghiệm

> **Mục đích**: Chạy 1 phiên pilot (với 1 người — có thể là bạn bè, nhưng KHÔNG nằm trong 7 người tham gia chính thức) để kiểm tra và tinh chỉnh kịch bản, công cụ đo, và quy trình facilitation trước khi chạy phiên thật.

---

## 1. Trước phiên pilot (Chuẩn bị — 10 phút)

### Thiết bị & môi trường

- [ ] EShop đang chạy ổn định tại `http://localhost:5173`
- [ ] Backend API đang chạy tại `http://localhost:3000`
- [ ] Trình duyệt sạch (xóa cache, xóa cookie, hoặc dùng Incognito/Private)
- [ ] Database đã được reset (không có tài khoản dư thừa, sản phẩm đầy đủ)
- [ ] Phần mềm quay màn hình đã sẵn sàng (OBS, Loom, ShareX, hoặc tương đương)
- [ ] Micro hoạt động (nếu ghi âm think-aloud)
- [ ] Bản in/bản mềm kịch bản nhiệm vụ (`task_scenario.md`) sẵn sàng
- [ ] Bản in/bản mềm bảng SUS (`instrument.md`) sẵn sàng
- [ ] Template ghi chú phiên (xem skill `usability-session-notes`) đã mở

### Kiểm tra nhanh luồng

- [ ] Tự chạy nhanh toàn bộ luồng 1 lần: Đăng ký → Đăng nhập → Xem sản phẩm → Thêm giỏ hàng → Checkout
- [ ] Ghi lại thời gian hoàn thành (ước tính thời gian chuẩn)
- [ ] Xác nhận luồng thanh toán hoạt động đúng từ đầu đến cuối

---

## 2. Bắt đầu phiên pilot (3–5 phút giới thiệu)

### Script giới thiệu (đọc cho người tham gia)

> Cảm ơn bạn đã dành thời gian tham gia hôm nay.
>
> Hôm nay mình muốn nhờ bạn thử sử dụng một trang web mua sắm trực tuyến tên là **EShop**. Đây là bài tập của mình ở trường, và mình đang **kiểm tra trang web** — không phải kiểm tra bạn. Không có câu trả lời đúng hay sai.
>
> Trong quá trình sử dụng, mình muốn nhờ bạn **nói to suy nghĩ của mình** — bạn đang nhìn thấy gì, đang muốn làm gì, đang cảm thấy gì. Ví dụ: "Mình đang tìm nút đăng ký mà không thấy", hoặc "À, chỗ này mình nghĩ là phải bấm vào đây".
>
> Mình sẽ quay lại màn hình [và ghi âm, nếu bạn đồng ý]. Mình sẽ ngồi bên cạnh và quan sát — mình sẽ không gợi ý hay hướng dẫn, trừ khi bạn bị kẹt hoàn toàn.
>
> Bạn có câu hỏi gì trước khi mình bắt đầu không?

### Checklist giới thiệu

- [ ] Đã giải thích "test sản phẩm, không test bạn"
- [ ] Đã giải thích think-aloud và cho ví dụ
- [ ] Đã xin phép quay màn hình (và ghi âm nếu có)
- [ ] Đã hỏi người tham gia có thắc mắc gì không
- [ ] Đã bắt đầu quay màn hình

---

## 3. Giao nhiệm vụ (1 phút)

- Đưa bản in/bản mềm kịch bản nhiệm vụ cho người tham gia đọc
- Hoặc đọc to kịch bản (xem `task_scenario.md`)
- Hỏi: "Bạn hiểu nhiệm vụ rồi chứ? Bạn có thể bắt đầu khi nào bạn sẵn sàng."
- **BẮT ĐẦU ĐẾM THỜI GIAN** khi người tham gia bắt đầu thao tác

---

## 4. Quan sát & ghi chú (10–20 phút)

### Nguyên tắc quan sát

| Nên làm                                   | Không nên làm                            |
| ----------------------------------------- | ---------------------------------------- |
| Ghi chú thời điểm do dự (timestamp)       | Gợi ý "bạn thử bấm nút kia xem"          |
| Ghi chú nguyên văn phát biểu think-aloud  | Giải thích cho người dùng cách dùng      |
| Hỏi "Bạn đang nghĩ gì?" nếu im lặng > 30s | Bộc lộ cảm xúc (thở dài, cười, nhíu mày) |
| Can thiệp nếu kẹt > 2 phút                | Can thiệp sớm khi họ chỉ đang thử sai    |

### Template ghi chú nhanh (dùng trong phiên)

```
[MM:SS] Bước: _______________
        Hành động: _______________
        Think-aloud: "_______________"
        Vấn đề: ☐ Do dự  ☐ Lỗi  ☐ Bực bội  ☐ Cần can thiệp
        Ghi chú: _______________
```

> **Lưu ý**: Sau phiên, chuyển ghi chú sang template đầy đủ của skill `usability-session-notes`

---

## 5. Kết thúc phiên (5–7 phút)

1. **Dừng đếm thời gian**. Ghi lại tổng thời gian hoàn thành.
2. Đưa bảng **SUS** cho người tham gia điền (xem `instrument.md` — Phần A)
3. Hỏi **4 câu hỏi mở** (xem `instrument.md` — Phần B):
   - OQ-01: Clarity (có lúc nào không biết làm gì tiếp?)
   - OQ-02: Error recovery (gặp lỗi, có tự sửa được?)
   - OQ-03: Speed (bước nào mất nhiều thời gian hơn cần thiết?)
   - OQ-04: Trust (có điều gì khiến bạn nghi ngờ trang web?)
4. **Cảm ơn** người tham gia
5. **Dừng quay màn hình**

---

## 6. Sau phiên pilot — Checklist rà soát & tinh chỉnh

Trả lời các câu hỏi sau ngay sau phiên pilot. Nếu có câu trả lời "Có", cần chỉnh sửa trước khi chạy 7 phiên thật.

| #    | Câu hỏi rà soát                                                                                   | Trả lời        | Hành động cần làm                                               |
| ---- | ------------------------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------- |
| R-01 | Kịch bản nhiệm vụ có bị lộ bước cụ thể không? (người dùng nói "à, kịch bản bảo mình bấm vào đây") | ☐ Có / ☐ Không | Nếu Có: sửa lại `task_scenario.md`                              |
| R-02 | Kịch bản có từ ngữ gây nhầm lẫn không? (người dùng hỏi "ý bạn là gì?")                            | ☐ Có / ☐ Không | Nếu Có: đơn giản hóa ngôn ngữ                                   |
| R-03 | Thời gian hoàn thành có nằm trong 10–20 phút không?                                               | ☐ Có / ☐ Không | Nếu quá dài: xem xét rút gọn luồng                              |
| R-04 | Có câu hỏi SUS nào người tham gia không hiểu không?                                               | ☐ Có / ☐ Không | Nếu Có: thêm ghi chú giải thích (KHÔNG sửa nội dung SUS)        |
| R-05 | Có câu hỏi mở nào dẫn dắt câu trả lời không?                                                      | ☐ Có / ☐ Không | Nếu Có: sửa lại câu hỏi trong `instrument.md`                   |
| R-06 | Phần mềm quay màn hình hoạt động ổn định không?                                                   | ☐ Có / ☐ Không | Nếu Không: đổi phần mềm hoặc kiểm tra cài đặt                   |
| R-07 | Template ghi chú có đủ cột/trường cần thiết không?                                                | ☐ Có / ☐ Không | Nếu Không: bổ sung trường                                       |
| R-08 | EShop có bị lỗi kỹ thuật nào trong phiên không?                                                   | ☐ Có / ☐ Không | Nếu Có: ghi lại, reset DB nếu cần, kiểm tra lại trước phiên sau |

### Ghi chú tinh chỉnh sau pilot

```
Ngày chạy pilot: _______________
Người tham gia pilot: _______________ (KHÔNG nằm trong 7 người chính thức)
Thời gian hoàn thành: _______________ phút
Hoàn thành toàn bộ luồng? ☐ Có / ☐ Không (kẹt ở bước: _______________)

Thay đổi đã thực hiện sau pilot:
1. _______________
2. _______________
3. _______________
```

---

## Handoff

Sau khi pilot hoàn tất và kịch bản/công cụ đo đã được tinh chỉnh:

- Tiến hành 7 phiên thật, sử dụng skill `usability-session-notes` (Phần A) để ghi chú theo template chuẩn
- Commit sau mỗi phiên: `git commit -m "usability session P1"`, `P2`, ..., `P7`
- Sau 7 phiên, dùng `usability-session-notes` (Phần B) để tổng hợp và phân tích

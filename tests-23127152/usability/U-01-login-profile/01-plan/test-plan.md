# Kế hoạch usability test — U-01

- Ngày lập kế hoạch: 2026-08-01
- Website: http://localhost:5173
- Flow: **U-01 — Đăng nhập → mở Profile → cập nhật hồ sơ cá nhân**
- FR liên quan: FR-02 (Login), FR-04 (Personal profile management)
- Timebox: **5 phút/người** (điều chỉnh sau pilot nếu cần)
- Người điều phối: SV 23127152 (điền tên đầy đủ khi chạy phiên)
- Thiết bị/trình duyệt test chính: Laptop, Chrome mới nhất, cửa sổ **1440×900**
- Số phiên: 7 người chính (P01–P07) + 1 pilot (P00)
- Hình thức: Moderated, think-aloud (trực tiếp hoặc gọi kèm share màn hình)
- Phiên bản kịch bản: **v1** (chốt v2 sau pilot)

---

## Mục tiêu

Ba câu hỏi đo được từ session log:

1. **Người dùng mới có tự đăng nhập bằng tài khoản được cung cấp và tới được màn hình hồ sơ trong timebox mà không cần moderator can thiệp không?**  
   → `Outcome` (`SUCCESS_UNASSISTED` vs còn lại) + số `intervention` trước khi vào `/profile`.

2. **Người dùng có tìm ra chỗ cập nhật số điện thoại / địa chỉ giao hàng trên Profile, hay bị kẹt / nhầm sang trang khác?**  
   → số `wrong turn` (vd. vào Giỏ hàng, Đăng ký) + `hesitation ≥ 5s` trên header/form.

3. **Trước khi kết thúc, người dùng có tin rằng hồ sơ đã được lưu thành công không — và tín hiệu nào họ dựa vào?**  
   → quan sát phản ứng với `alert` / thiếu toast + câu hỏi mở nhóm **Trust**.

_Vì sao chọn 3 câu này:_ (1) đo effectiveness của FR-02→FR-04; (2) nhắm điểm nghi ngờ từ GUI checklist — guest Profile không có CTA, label Login lẫn “Username/Sign In/Đăng Ký”; (3) feedback chỉ qua `alert()` nên độ tin cậy cảm nhận là tín hiệu quan trọng.

---

## Task scenario

> Bạn vừa nhận tài khoản mua sắm trên **EShop** để chuẩn bị đặt hàng giao tận nơi.  
> Trước khi mua, bạn cần **đăng nhập** và **cập nhật số điện thoại cùng địa chỉ giao hàng** trên hồ sơ của mình cho đúng.  
> Hãy dùng thông tin tài khoản được người điều phối cung cấp, hoàn tất việc cập nhật hồ sơ đến khi bạn chắc chắn hệ thống đã ghi nhận thành công.

**Thông tin tài khoản** (đưa **sau** khi đọc xong kịch bản, trước khi bấm giờ — viết sẵn trên phiếu riêng, không nhét vào kịch bản bước-bấm):

| Trường | Giá trị |
|--------|---------|
| Email / đăng nhập | `test@eshop.com` |
| Mật khẩu | `Test1234!` |

**Gợi ý số điện thoại hợp lệ với SUT hiện tại** (chỉ đưa nếu pilot cho thấy người tham gia kẹt vì placeholder `0912…` mâu thuẫn regex — ghi deviation nếu phải gợi ý):

- Hệ thống hiện chỉ chấp nhận 9–10 chữ số **không** bắt đầu bằng `0` (ví dụ `9123456789`).  
- **Không** đọc câu này trong kịch bản v1; để người dùng tự khám phá. Nếu ≥3/7 phiên fail chỉ vì SĐT, cân nhắc thêm dòng này vào v2.

**Vì sao kịch bản dừng ở đây:** nêu mục tiêu + ràng buộc (cần SĐT + địa chỉ trước khi mua), **không** chỉ đường bấm Đăng nhập / Profile / Cập nhật.

---

## Điều kiện

- **Bắt đầu:** trình duyệt mở `http://localhost:5173/` (trang chủ), **chưa đăng nhập**, giỏ hàng không quan trọng, chưa mở `/login` hay `/profile`. Đồng hồ bắt đầu ngay sau khi người tham gia xác nhận đã hiểu kịch bản + đã nhận phiếu tài khoản.
- **Thành công:** đã đăng nhập; đã mở Profile; đã submit cập nhật với SĐT + địa chỉ; quan sát được xác nhận thành công từ hệ thống (`alert("Cập nhật thành công!")` hoặc tương đương rõ ràng); form phản ánh dữ liệu vừa nhập.
- **Thất bại:** bỏ cuộc; hết 5 phút; hoặc kẹt không phục hồi, không đạt trạng thái thành công.
- **Deviation:**
  - Tài khoản bị lockout (FR-02) → **dừng đồng hồ**, restart backend để reseed / chờ hết khóa, ghi deviation, cho thử lại từ start state.
  - Ảnh/CDN ngoài lỗi → ghi deviation, tiếp tục.
  - Người tham gia tự đăng ký tài khoản mới thay vì dùng tài khoản cấp → **không ngăn**, ghi lại; nếu không hoàn tất cập nhật vẫn theo tiêu chí thành công ở trên với tài khoản họ dùng.

---

## Công cụ đánh giá

Xem [instruments.md](./instruments.md):

- Thang **SUS** (10 item) — ngay sau task, trước probes.
- Probe questions: Clarity · Error recovery · Speed · Trust (mỗi nhóm ≥ 1 câu).

---

## Kịch bản mở đầu (moderator đọc)

> Cảm ơn bạn đã tham gia. Hôm nay mình **kiểm tra sản phẩm, không kiểm tra bạn**. Không có đáp án đúng/sai.  
> Trong lúc làm, hãy **nói to suy nghĩ** của bạn. Mình sẽ hạn chế gợi ý; chỉ hỗ trợ nếu bạn kẹt hoàn toàn.  
> Phần thao tác khoảng **5 phút**, sau đó điền bảng ngắn (SUS) và trả lời vài câu hỏi.  
> Bạn đồng ý ghi màn hình (và ghi âm nếu có) chứ?

---

## Checklist trước phiên

**Hệ thống (làm lại trước mỗi phiên):**

- [ ] `./scripts/run.sh` — frontend `5173`, backend `3000` sống
- [ ] Đăng xuất / xóa `localStorage.token` → start state chưa login
- [ ] Thử login seed một lần rồi **logout** lại (đảm bảo mật khẩu còn dùng được, không bị lock)
- [ ] Nếu phiên trước gây lockout → restart backend để reseed
- [ ] Cửa sổ 1440×900, đóng tab thừa

**Phiên:**

- [ ] Đồng thuận ghi hình (ký / bằng lời) — ghi vào recruitment tracker
- [ ] Mã P00 / P01–P07; không ghi PII thừa vào session log
- [ ] Phiếu SUS + probes ([instruments.md](./instruments.md))
- [ ] Phiếu tài khoản test (tách khỏi kịch bản)
- [ ] Đồng hồ + phần mềm ghi màn hình đã thử
- [ ] **Không** tập trước flow cho người tham gia

---

## Liên kết

| Artefact | Path |
|----------|------|
| Instruments | [instruments.md](./instruments.md) |
| Survey sheets (P00–P07) | [survey-sheets-P00-P07.xlsx](./survey-sheets-P00-P07.xlsx) |
| Recruitment | [recruitment-tracker.md](./recruitment-tracker.md) |
| Pilot | [../02-conduct/pilot/P00.md](../02-conduct/pilot/P00.md) |
| Sessions | [../02-conduct/participants/](../02-conduct/participants/) |
| Evidence | [../02-conduct/evidence/](../02-conduct/evidence/) |
| Aggregate | [../03-analyse/aggregate-results.md](../03-analyse/aggregate-results.md) |
| Findings | [../03-analyse/findings-report.md](../03-analyse/findings-report.md) |

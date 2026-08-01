# Usability Tests

Thư mục này chứa toàn bộ các kịch bản, tài liệu chuẩn bị, ghi chép phiên chạy thực tế và báo cáo đánh giá trải nghiệm người dùng (Usability Testing) cho EShop SUT.

Các đợt đánh giá được tổ chức theo từng thư mục định dạng `U-XYZ` (ví dụ: `U-001`, `U-002`,...) tương ứng với các luồng nghiệp vụ hoặc đợt kiểm thử khác nhau.

## Môi trường thử nghiệm (SUT)

Sử dụng bản deploy công khai của hệ thống để chia sẻ trực tiếp với người tham gia:

- URL: `https://23127115-testing-hw3.vercel.app/`

---

## Cấu trúc chuẩn của một đợt đánh giá (`U-XYZ`)

Mỗi thư mục `U-XYZ` sẽ tuân thủ cấu trúc tài liệu hóa tiêu chuẩn sau để đảm bảo tính nhất quán và khả năng truy vết lỗi (traceability):

| Đường dẫn / File                 | Vai trò & Mục đích                                                                             |
| :------------------------------- | :--------------------------------------------------------------------------------------------- |
| **`1_plan-prep/`**               | **Giai đoạn Chuẩn bị & Lập kế hoạch**                                                          |
| `evaluation_goals.md`            | Xác định mục tiêu trải nghiệm, chỉ số đo lường (SUS/UEQ-S) và tiêu chí thành công.             |
| `task_scenario.md`               | Kịch bản nhiệm vụ hướng mục tiêu (goal-oriented scenarios) dành cho người tham gia.            |
| `recruiting_screen.md`           | Tiêu chí tuyển chọn, bộ câu hỏi sàng lọc ứng viên và consent checklist.                        |
| **`2_session-guide/`**           | **Tài liệu Hướng dẫn Phiên chạy**                                                              |
| `instrument.md`                  | Công cụ đo lường gồm bảng hỏi định lượng (SUS/UEQ-S) và các câu hỏi phỏng vấn mở rộng.         |
| `pilot_runsheet.md`              | Protocol hướng dẫn điều phối viên, kịch bản phục hồi lỗi (recovery) và post-pilot gate.        |
| **`3_sessions/`**                | **Nhật ký Phiên thử nghiệm**                                                                   |
| `P01.md` ... `P07.md`            | Biên bản ghi chép chi tiết của từng người tham gia (observations, think-aloud, SUS scores).    |
| **`4_reports-synthesis/`**       | **Tổng hợp & Báo cáo**                                                                         |
| `usability_evaluation_report.md` | Báo cáo tổng hợp kết quả, tính toán điểm số trung bình và phân tích các phát hiện.             |
| **`5_evidence/`**                | **Bằng chứng & Truy vết**                                                                      |
| `bug_index.md`                   | Chỉ mục liệt kê các lỗi trải nghiệm phát hiện được, có liên kết tới bằng chứng hình ảnh/video. |

---

## Danh sách các đợt đánh giá đã/đang thực hiện

### [U-001 (Register → Checkout)](./U-001/)

- **Mục tiêu**: Đánh giá luồng trải nghiệm mua sắm cơ bản khép kín trên bản deploy công khai.
- **Phạm vi**: 1 luồng end-to-end: Đăng ký → Đăng nhập → Tìm kiếm & Xem sản phẩm → Thêm giỏ hàng → Thanh toán (Checkout).
- **Phương pháp**: Moderated think-aloud, đo SUS và 4 câu hỏi mở rộng với 7 phiên kiểm thử chính thức (+ 1 phiên pilot).
- **Trạng thái**: `Phase 1 draft` (đã sẵn sàng kịch bản/pilot, chuẩn bị chạy các phiên thật).

_(Đợt đánh giá `U-002`, `U-XYZ` tiếp theo sẽ được cập nhật tại đây khi được khởi tạo)._

## Công cụ bổ trợ

- [google-form](./google-form): Script hỗ trợ tự động tạo Google Form khảo sát trực tuyến (gồm 10 câu SUS và 4 câu hỏi mở rộng) bằng Google Apps Script CLI (`clasp`).

---

## Ghi chú khi sử dụng & Triển khai

1. **Tính tương tác**: Các ô check-list trong tài liệu được thiết kế dạng `[]` để dễ dàng cập nhật thành `[x]` bằng markdown khi ghi chép trực tiếp.
2. **Khả năng truy vết (Traceability)**: Mọi lỗi trải nghiệm (usability findings) mức độ Nghiêm trọng (Severity) trong báo cáo tổng hợp nên được ánh xạ tương ứng vào `5_evidence/bug_index.md` kèm theo đường dẫn bằng chứng cụ thể trước khi tạo issue trên hệ thống quản lý lỗi.

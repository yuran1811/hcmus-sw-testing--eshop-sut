# Test Case Schema — ràng buộc cột và định dạng xuất

## Header CSV chuẩn (dùng cho file Excel nộp kèm)

```csv
TC_ID,Category,Priority,Title,Precondition,Method,Endpoint,Headers,RequestBody,ExpectedStatus,ExpectedResponse,SpecRef,AuditLabel,AuditReason,Source,Note
```

Giữ nguyên thứ tự cột này giữa cả 3 API để file Excel tổng hợp được, và để skill `api-testcase-auditor` đọc lại được mà không cần map thủ công.

## Ràng buộc từng cột

| Cột | Ràng buộc |
|---|---|
| `TC_ID` | `TC-<POOL>-<FEATURE>-<CAT>-<NNN>`. POOL ∈ {A,B,C}. FEATURE viết hoa không dấu, ≤ 8 ký tự (LOGIN, CART, ORDER, PRODUCT). CAT ∈ {FN, DP, ST, SEC, SCH}. NNN chạy 3 chữ số riêng cho từng CAT. |
| `Category` | Đúng 1 trong 5 giá trị CAT. Một case chỉ thuộc 1 category chính — nếu vừa security vừa state transition, chọn category theo *mục đích kiểm chứng chính* và ghi cái còn lại vào Note. |
| `Priority` | P1 (chặn phát hành: happy path, security, invalid transition), P2 (validation chính), P3 (biên hiếm, cosmetic). |
| `Title` | Bắt đầu bằng động từ, mô tả **hành vi kỳ vọng** chứ không phải thao tác. Tốt: "Từ chối đăng nhập khi tài khoản đang bị khoá". Kém: "Test login". |
| `Precondition` | Trạng thái dữ liệu cụ thể: "tồn tại user `qa1@test.com` đã đăng ký, đơn #1001 ở trạng thái pending". Nếu không cần precondition, ghi `-`. |
| `Headers` | Liệt kê đủ, **luôn có** `X-Student-Id: {StudentID}`. Token viết dạng biến Postman `{{userToken}}`, `{{adminToken}}`. |
| `RequestBody` | JSON cụ thể, một dòng, escape dấu `"` theo chuẩn CSV. Không viết mô tả kiểu "dữ liệu hợp lệ". Nếu không có body, ghi `-`. |
| `ExpectedStatus` | Một số cụ thể. Nếu spec cho phép nhiều giá trị (403 hoặc 404), ghi `403\|404` và giải thích ở Note. |
| `ExpectedResponse` | Điều kiện assert được: tên field phải có, giá trị cụ thể, field phải KHÔNG xuất hiện. Vd: `error.code = "ACCOUNT_LOCKED"; body không chứa passwordHash`. |
| `SpecRef` | `FR-02`, `SEC-04`, hoặc số mục trong `api_specification.md`. Bắt buộc — case không truy vết được về spec là case đáng ngờ. |
| `AuditLabel` | Để trống khi sinh. Skill auditor điền VALID / INVALID / INCOMPLETE. |
| `AuditReason` | Để trống khi sinh. |
| `Source` | `AI` cho case do skill sinh, `HUMAN` cho case sinh viên tự thêm ở bước Extend. Cột này là bằng chứng cho yêu cầu "thêm ít nhất 5 case AI bỏ sót". |
| `Note` | Giả định, câu hỏi mở, liên kết tới case khác. Ghi rõ "spec chưa định nghĩa" nếu kỳ vọng là suy luận. |

## Quy tắc chống trùng lặp

Hai case bị coi là trùng nếu **cùng endpoint + cùng lớp tương đương của cùng tham số + cùng status kỳ vọng**. Trước khi kết thúc, tự rà: nhóm các case theo `(tham số, lớp tương đương)` và loại bản sao. Số lượng đạt 35 bằng cách nhân bản sẽ bị trừ điểm ở tiêu chí chất lượng.

## Bảng tổng kết bắt buộc kèm theo

Sau bảng test case, luôn xuất thêm:

```markdown
### Coverage summary — <API name>

| Category | Số case | Ghi chú |
|---|---|---|
| FN | 3 | |
| DP | 17 | phủ 6/6 tham số |
| ST | 6 | phủ 20/25 ô bảng chuyển trạng thái |
| SEC | 9 | phủ SEC-01..SEC-07 |
| SCH | 5 | phủ status 200/400/401/403/404 |
| **Tổng** | **40** | |

### Traceability — parameter coverage

| Tham số | Valid | Invalid | Boundary | TC_ID |
|---|---|---|---|---|

### Assumptions
1. Spec không nêu độ dài tối đa của field `note` — giả định 500 ký tự, cần xác nhận.
```

Bảng traceability là thứ TA nhìn vào để biết bộ test có hệ thống hay sinh ngẫu nhiên. Đừng bỏ.

## Xuất file

Xuất 2 file cho mỗi API, đặt trong `testcases/`:

- `TC_<API>.md` — bảng Markdown + coverage summary + assumptions (dán vào báo cáo chính)
- `TC_<API>.csv` — đúng header trên (mở bằng Excel, nộp theo yêu cầu mục 14)

Khi ghi CSV, dùng UTF-8 BOM để Excel hiển thị đúng tiếng Việt.

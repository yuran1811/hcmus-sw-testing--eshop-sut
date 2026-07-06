# Conventions — Test Run Reporter

Tài liệu này ghi lại các convention đã được thống nhất trong quá trình test,
để agent có thể tham chiếu khi viết báo cáo.

---

## 1. Bug Report Format

Mỗi bug report là một file Markdown riêng biệt, đặt tại:

```
tests/bug-reports/{module-slug}/BUG-{MODULE}-{NNN}.md
```

### Cấu trúc file

```markdown
---
name: Bug report
about: Create a report to help us improve
title: "[BUG][{Module Name}] {Mô tả ngắn bug bằng tiếng Việt}"
labels: "type: bug, module: {module-slug}, severity: {severity}, priority: {priority}, status: new, found-by: test-case"
assignees: ""
---

## Found by Test Case

{Danh sách TC IDs, phân cách bằng dấu phẩy. VD: TC-PLAS-001, TC-PLAS-002}

## Requirement liên quan

{FR-XX} ({Tên requirement})

## Severity / Priority

{Critical/Major/Minor/Cosmetic} / {P0/P1/P2/P3}

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: http://localhost:5173

## Steps to reproduce

1. {Bước 1}
2. {Bước 2}
   ...

## Expected result

{Mô tả kết quả kỳ vọng}

## Actual result

{Mô tả kết quả thực tế}

## Evidence

- **{TC-ID} ({Mô tả ngắn}):**
  ![Evidence](../screenshots/{TC-ID}.png)
```

### Quy tắc quan trọng

- **KHÔNG** bao gồm block mô tả labels (block bắt đầu bằng `"Mô tả về labels:"`)
- **KHÔNG** bao gồm block giải thích hệ thống labels (block bắt đầu bằng `"**Hệ thống Labels..."`)
- Nội dung viết bằng **tiếng Việt**
- Mỗi lỗi riêng biệt tạo thành **một bug report riêng** (không gộp nhiều lỗi vào 1 file)

---

## 2. Test Case Status Format

Trong file test case (`TC-{MODULE}-{NNN}.md`), section cuối cùng:

```markdown
## Status / Related bugs

{Result} / {Bug IDs hoặc None}
```

Ví dụ:

- `Pass / None`
- `Fail / BUG-PLAS-001, BUG-PLAS-002, BUG-PLAS-003`

---

## 3. Test Run Table Format

Bảng trong `tests/test-runs/sprint-X-test-run.md`:

```markdown
| Test Case ID | Module | Tester | Result | Related Bug | Note |
```

- **Result**: `Pass`, `Fail`, hoặc `Blocked`
- **Related Bug**: Danh sách BUG IDs, phân cách bằng dấu phẩy
- **Note**: Mô tả ngắn gọn vấn đề (tiếng Việt)
- **KHÔNG** dùng hyperlinks trong bảng

---

## 4. Screenshot Naming Convention

Screenshots đặt tại:

```
tests/bug-reports/screenshots/TC-{MODULE}-{NNN}.png
```

- Tên file = Test Case ID + `.png`
- Nếu user lưu screenshot với tên tạm (VD: `image.png`), agent sẽ đổi tên về đúng convention
- Một screenshot có thể dùng chung cho nhiều bug reports nếu chúng xuất phát từ cùng một test case

---

## 5. Bug Trùng Lặp

Khi test case mới phát hiện bug **giống hệt** bug đã được ghi nhận bởi test case trước:

1. **KHÔNG** tạo bug report mới
2. **Thêm** TC ID mới vào `## Found by Test Case` của bug report hiện có
3. **Thêm** evidence screenshot mới vào `## Evidence` của bug report hiện có

---

## 6. Module Slug Mapping

| Module Name           | Slug                    | TC Prefix | BUG Prefix |
| --------------------- | ----------------------- | --------- | ---------- |
| Product List & Search | product-list-and-search | TC-PLAS   | BUG-PLAS   |

_(Bổ sung thêm khi có module mới)_

---

## 7. Misc Conventions

- **Đơn vị tiền tệ**: Luôn dùng ký hiệu `₫`, **KHÔNG** dùng `VND`
- **Tester name mặc định**: `Mạch Quốc Tấn`
- **Ngôn ngữ**: Nội dung test case và bug report viết bằng **tiếng Việt**
- **Frontend URL**: `http://localhost:5173`
- **Backend URL**: `http://localhost:3000`

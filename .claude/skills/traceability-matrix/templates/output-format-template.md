Generate the response entirely in **Vietnamese** (keep column headers in English).

Structure the response exactly as follows:

### 1. Ma trận truy vết (Traceability Matrix)

Generate a Markdown table with these exact columns:
| Requirement ID | Business Rule / Constraint | Test Case IDs | Result | Bug Issue | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [e.g., FR-01] | [Brief description of the rule] | [e.g., TC-REG-001, TC-REG-050] | Not Run | | Open |
_(Note: Always set Result = `Not Run`, Bug Issue = `[để trống]`, Status = `Open` for all rows)._

### 2. Báo cáo Độ bao phủ (Coverage Status)

Output one of the following statuses based on your step 3 analysis:

- ✅ **Passed:** Toàn bộ các luật nghiệp vụ đều đã được bao phủ bởi ít nhất một Test Case.
- ⚠️ **Warning - Thiếu Coverage:** Các luật sau đây CHƯA có Test Case bao phủ:
  - [Liệt kê chi tiết rule bị thiếu và đề xuất loại test case cần viết thêm]

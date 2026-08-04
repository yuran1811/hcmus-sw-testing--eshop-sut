# AI Audit Report — Template tham khảo

> Dùng file này làm mẫu tham khảo nếu bạn muốn điền tay thay vì dùng
> `scripts/render_audit_report.py`. Khuyến nghị vẫn nên dùng script để tránh sai sót/thiếu sót.

## Khai báo (chọn đúng 1 trong 2 câu, giữ nguyên văn)

- Nếu **không** dùng AI: `"I do not use any AI help in this exercise."`
- Nếu **có** dùng AI: `"I use AI tools for the following tasks,"`

## Với mỗi tương tác (lặp lại cho từng lần), ghi đủ 4 mục:

```markdown
### Interaction N
- **Name of the AI tool:** <Claude / ChatGPT / Copilot / Cursor / Gemini ...>
- **Date and time:** <YYYY-MM-DDTHH:MM:SS+07:00>
- **Prompt:**
\`\`\`
<toàn văn prompt bạn đã gõ>
\`\`\`
- **AI output:**
\`\`\`
<toàn văn kết quả AI trả về — có thể rút gọn nếu quá dài, nhưng phải giữ đủ ý chính>
\`\`\`
```

## Gợi ý tổ chức theo tính năng

Nhóm các interaction theo tính năng (FR-xx) hoặc theo giai đoạn (Page Object → Test case
→ Data extraction → Assertion) để người chấm dễ đối chiếu với báo cáo chính và với script
thực tế trong repo.

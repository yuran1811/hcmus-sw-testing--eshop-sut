# Checklist đóng gói nộp bài (Submission Checklist)

## 1. Quy tắc đặt tên file

```
<StudentID>_HW04_AI_Automation_<SelfAssessedGrade>.zip
```
- `SelfAssessedGrade`: số 3 chữ số trong khoảng 000–100.
- Ví dụ: `25127001_HW04_AI_Automation_090.zip`

## 2. Danh sách nội dung bắt buộc trong file `.zip`

- [ ] Báo cáo chính (Markdown + PDF) — gồm quy trình tự động hóa + phần rà soát/gap analysis.
- [ ] Link repository GitHub công khai (script, file dữ liệu, báo cáo HTML).
- [ ] Báo cáo HTML đa trình duyệt (Allure hoặc Playwright HTML reporter) — có "Run by: {StudentID}" + timestamp ISO.
- [ ] Link video demo YouTube (unlisted, ≥5 phút, thuyết minh tiếng Việt, có face-cam hoặc `whoami`/`hostname`).
- [ ] AI Critique (200–300 từ) + AI Audit Report (Markdown + PDF).
- [ ] Nhật ký Git commit (file văn bản, `git log` xuất ra `.txt`).
- [ ] Báo cáo lỗi kèm ảnh chụp màn hình trên GitHub Issues (nếu có bug).
- [ ] `README.md` chứa bảng tự đánh giá + tóm tắt: số tính năng, số test case (tự động hóa/chạy/đạt/không đạt), số lượt chạy trình duyệt, số bug, link video.
- [ ] Tài liệu hỗ trợ khác (nếu có).

## 3. Kiểm tra chéo với ràng buộc chống gian lận (mục 11 đề bài)

- [ ] File HTML report thực sự do bạn chạy ra (không phải AI tạo giả) — mở file, xác nhận
      timestamp khớp với thời điểm bạn chạy thật.
- [ ] Video có giọng nói thật của bạn + face-cam hoặc terminal chạy `whoami` và `hostname`.
- [ ] Repo có ≥8 commit thay đổi file `.spec.js`/`.spec.ts` (hoặc tương đương), trải dài ≥4 ngày.
      Commit chỉ sửa README/PDF **không tính**.

## 4. Lệnh hữu ích

```bash
# Xuất git log ra file text
git log --oneline --date=short --pretty=format:"%h %ad %an %s" > git_commit_log.txt

# Đếm số commit chạm vào file test trong 4 ngày gần nhất (kiểm tra nhanh)
git log --since="4 days ago" --name-only --pretty=format:"COMMIT %h" \
  | grep -E "\.spec\.(js|ts)$" | wc -l
```

Dùng `scripts/package_submission.sh <StudentID> <Grade>` (đi kèm skill này) để tự động
kiểm tra sự hiện diện của các mục ở mục 2 và đóng gói file `.zip` đúng tên.

---
name: api-cicd-reporter
description: Đưa Postman collection vào CI/CD pipeline (GitHub Actions chạy Newman), tạo 2 commit mẫu - một run pass toàn bộ và một run có đúng 1 test fail - rồi viết CI/CD report kèm cấu hình, screenshot và link. LUÔN dùng skill này khi người dùng nhắc tới "CI/CD cho API test", "GitHub Actions Newman", "chạy test API trong pipeline", "commit pass và commit fail", "workflow yml chạy newman", hoặc cần viết báo cáo pipeline cho bài tập API testing.
---

# API CI/CD Reporter

Đưa bộ API test vào pipeline và tạo bằng chứng hai lần chạy theo yêu cầu mục 6 của HW06: một run **tất cả pass**, một run có **đúng một test fail**.

Điểm dễ mất điểm nhất ở phần này: pipeline chạy được nhưng không có SUT thật, dẫn tới toàn bộ test lỗi kết nối chứ không phải fail nghiệp vụ. Vì vậy workflow phải **dựng SUT ngay trong job** trước khi chạy Newman.

## Kiến trúc job

```
job: api-tests
├─ checkout code (SUT + collection)
├─ setup Node
├─ cài dependency của SUT + seed database test
├─ khởi động SUT ở background trên localhost:3000
├─ chờ SUT healthy (wait-on / vòng lặp curl)
├─ cài newman + newman-reporter-htmlextra
├─ newman run (collection + env ci + data file)
├─ upload report HTML/JSON làm artifact
└─ (tuỳ chọn) publish summary vào GitHub Step Summary
```

File workflow mẫu đầy đủ: `assets/newman-ci.yml`. Đọc và điều chỉnh theo cách SUT khởi động thật (npm start / docker compose / dotnet run) — đừng copy nguyên nếu SUT dùng stack khác.

## Hai commit mẫu

Đề bài yêu cầu 2 sample commit. Cách tạo cho sạch sẽ và trung thực:

**Commit A — all pass.** Chạy đầy đủ bộ test đã audit, chỉ gồm những case mà SUT thực sự pass. Nếu SUT có bug thật khiến vài case fail, tách nhóm case đó ra bằng folder riêng hoặc `--folder`, và **nói rõ trong report** rằng nhóm này fail do bug đã ghi nhận trong bug report — đây là cách xử lý trung thực, tốt hơn là sửa expected cho vừa với bug.

**Commit B — đúng một test fail.** Chọn một trong hai cách và ghi rõ cách đã chọn:

| Cách          | Làm gì                                                                                                               | Ưu / nhược                                                  |
| ------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Sửa assertion | Đổi expected của 1 case thành giá trị sai có chủ đích, commit message ghi rõ "demo: intentionally failing assertion" | Đơn giản, dễ giải thích; nhưng là fail giả                  |
| Sửa code SUT  | Đưa vào 1 thay đổi nhỏ làm hỏng 1 hành vi (vd bỏ validate 1 field)                                                   | Sát thực tế hơn, cho thấy pipeline bắt được regression thật |

Cách 2 gây ấn tượng tốt hơn khi oral defense vì nó chứng minh pipeline có tác dụng chặn regression, không chỉ chạy cho có. Nếu chọn cách 2, revert lại ở commit tiếp theo.

Commit message nên tự giải thích:

```
ci: add newman pipeline for HW06 API tests
ci: demo run with all API tests passing
ci: demo run with one intentionally failing test (validate email regression)
revert: restore email validation after CI demo
```

## Bảo mật trong pipeline

- Không commit token/mật khẩu vào file environment. Dùng GitHub Secrets, inject qua `--env-var`.
- `studentId` không nhạy cảm nên có thể để trong env file; nhưng token thì không.
- Nếu repo public (đề bài yêu cầu link repo công khai), rà lại lịch sử commit xem có lỡ commit credential không trước khi nộp.

## Nội dung CI/CD report

Dùng khung ở `references/cicd-report-template.md`. Các mục bắt buộc:

1. Mô tả pipeline: trigger, các bước, cách SUT được dựng trong job
2. Giải thích lựa chọn thiết kế: vì sao dựng SUT trong job thay vì trỏ tới server ngoài; vì sao dùng `continue-on-error` hay không
3. Run A (all pass): link Actions run, screenshot, số liệu pass/fail
4. Run B (one fail): link, screenshot, **đoạn log chỉ ra test nào fail và vì sao**
5. Artifact: link tải HTML report của cả 2 run
6. Nhận xét: pipeline này bắt được loại lỗi nào, không bắt được loại nào

Mục 6 là chỗ ghi điểm — ví dụ: pipeline bắt được regression chức năng và schema, nhưng không bắt được race condition vì Newman chạy tuần tự, cũng không bắt được lỗi hiệu năng vì không có ngưỡng p95.

## Screenshot cần chụp

1. Tab Actions liệt kê cả 2 run (một xanh, một đỏ)
2. Chi tiết run A: bước Newman với summary table toàn pass
3. Chi tiết run B: log đỏ, thấy rõ tên test fail
4. Trang artifact có file report
5. Git commit log tương ứng 2 commit

## Git commit log

Đề bài mục 12 yêu cầu commit riêng cho từng bước (generation, audit, extension, execution) và nộp log dạng text:

```bash
git log --pretty=format:"%h | %ad | %s" --date=format:"%Y-%m-%d %H:%M" > git-commit-log.txt
```

Nếu đã lỡ gộp mọi thứ vào một commit, đừng viết lại lịch sử để giả vờ — ghi chú trung thực trong báo cáo còn hơn bị phát hiện khi TA soi timestamp.

## Tài nguyên kèm theo

- `assets/newman-ci.yml` — workflow GitHub Actions mẫu, có dựng SUT và upload artifact
- `references/cicd-report-template.md` — khung báo cáo CI/CD điền sẵn tiêu đề

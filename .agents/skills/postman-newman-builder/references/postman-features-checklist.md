# Postman Features Checklist

Đề bài yêu cầu "exercise as many Postman features as you reasonably can" và **liệt kê trong báo cáo**. Bảng dưới để đánh dấu và viết mô tả. Chỉ ghi feature đã dùng thật — oral defense có thể hỏi "bạn dùng monitor để làm gì", trả lời không được thì mất điểm hơn là không kê khai.

## Nhóm cốt lõi (nên có đủ)

| Feature | Dùng vào việc gì trong HW06 | ✔ |
|---|---|---|
| **Workspace** | Tạo workspace riêng cho HW06, tách khỏi bài tập khác; chụp màn hình làm bằng chứng | |
| **Collection** | 1 collection cho cả 3 API, chia folder theo API và category | |
| **Folder** | Nhóm FN/DP/ST/SEC/SCH — Newman report hiển thị theo folder, đọc như bản đồ coverage | |
| **Environment** | `local` (baseUrl=localhost:3000) và `ci` (dùng trong GitHub Actions) | |
| **Environment variable** | `baseUrl`, `studentId` — đổi môi trường không phải sửa request | |
| **Collection variable** | `tokenUserA`, `tokenUserB`, `adminToken`, `orderId` sinh khi chạy | |
| **Pre-request script (collection level)** | Gắn `X-Student-Id` cho mọi request + console.log làm bằng chứng | |
| **Tests script** | Toàn bộ assertion pm.test | |
| **JSON Schema validation** | `pm.response.to.have.jsonSchema()` cho nhóm SCH | |
| **Collection Runner** | Chạy toàn bộ collection theo thứ tự | |
| **Data file (CSV/JSON)** | Data-driven cho nhóm DP | |
| **Newman CLI** | Chạy headless, xuất report | |
| **newman-reporter-htmlextra** | Report HTML nộp kèm | |

## Nhóm nâng cao (làm được thì cộng điểm)

| Feature | Dùng vào việc gì | ✔ |
|---|---|---|
| **Authorization tab (Bearer)** | Cấu hình auth ở cấp folder thay vì lặp header từng request | |
| **Variable scope (secret type)** | Đánh dấu mật khẩu/token là secret để không lộ khi export collection | |
| **`pm.sendRequest`** | Gọi request phụ trong test để xác minh trạng thái sau khi hành động bị từ chối | |
| **Dynamic variables** | `{{$timestamp}}`, `{{$randomEmail}}`, `{{$guid}}` để tránh unique constraint khi chạy lại | |
| **Mock server** | Dựng response giả theo spec để thiết kế test trước khi SUT sẵn sàng — nói rõ đây là thiết kế test, không thay thế chạy thật | |
| **Monitor** | Lên lịch chạy collection định kỳ; chụp màn hình kết quả vài lần chạy | |
| **Postman Console** | Bằng chứng header `X-Student-Id` (bắt buộc chụp) | |
| **Example / saved response** | Lưu response mẫu làm tài liệu contract của endpoint | |
| **Documentation** | Sinh docs từ collection, publish link công khai | |
| **Fork / merge collection** | Quản lý phiên bản collection giữa các lần audit | |
| **Postman API / export** | Export `.json` nộp kèm | |
| **Run order / skipRequest** | `postman.setNextRequest()` điều khiển luồng chạy có điều kiện | |

## Mẫu viết trong báo cáo

Đừng liệt kê tên feature suông. Viết dạng *feature → dùng làm gì → bằng chứng*:

> **Pre-request script (cấp collection).** Gắn header `X-Student-Id: 23127xxx` vào mọi request và ghi log ra Postman Console. Điều này đảm bảo không bỏ sót request nào, thay vì phải thêm thủ công cho từng trong số 120 request. Bằng chứng: `screenshots/console-x-student-id.png`.
>
> **Data file CSV.** Nhóm 17 case domain partition của endpoint login được gộp thành 1 request đọc `data/login-dp.csv`, mỗi dòng mang `tcId` và `expectedStatus` nên vẫn truy vết được về bảng test case. Lệnh chạy: `newman run ... -d data/login-dp.csv`. Bằng chứng: `reports/newman-report.html` mục "Iterations".

## Tương đương nếu dùng Karate / RestAssured

Đề bài cho phép thay thế; khi đó liệt kê feature tương đương:

| Postman | Karate | RestAssured |
|---|---|---|
| Collection / folder | Feature file / Scenario Outline | Test class / nested class |
| Environment variable | `karate-config.js` | `RestAssured.baseURI` + properties |
| Pre-request script | `karate.configure('headers', ...)` | `RequestSpecification` dùng chung |
| JSON Schema validation | `match response == schema` | `matchesJsonSchemaInClasspath()` |
| Data file | `Examples:` table / `karate.read('file.csv')` | `@CsvFileSource` (JUnit 5) |
| Newman report | Karate HTML report / Cucumber report | Allure / Surefire report |

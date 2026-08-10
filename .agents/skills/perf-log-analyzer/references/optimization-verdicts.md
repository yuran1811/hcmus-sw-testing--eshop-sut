# Phân loại đề xuất tối ưu: khả thi hay ảo tưởng

Dùng ở giai đoạn 4. Ba nhãn:

| Nhãn | Nghĩa |
|---|---|
| **Khả thi** | Log ủng hộ, áp dụng được với kiến trúc hiện tại |
| **Khả thi nhưng chưa có căn cứ** | Hợp lý về kỹ thuật, nhưng log hiện có không chứng minh đó là nút thắt |
| **Ảo tưởng** | Không áp dụng được với stack hiện tại, hoặc dựa trên thông tin không tồn tại |

Một đề xuất bị xếp "ảo tưởng" không phải vì nó là kỹ thuật tồi, mà vì nó **không giải quyết nút thắt được quan sát** hoặc **không tồn tại trong ngữ cảnh này**. Ghi rõ điểm phân biệt đó trong phần lý giải, nếu không bảng verdict sẽ đọc như một danh sách chê bai.

---

## 1. Thêm database index

| | |
|---|---|
| **Thường là** | Khả thi — nếu có bằng chứng nghẽn ở tầng truy vấn |
| **Bằng chứng ủng hộ** | Endpoint đọc có bộ lọc/tìm kiếm chậm hơn hẳn endpoint đọc đơn giản; response time tăng phi tuyến khi dữ liệu tăng; `EXPLAIN QUERY PLAN` cho thấy full table scan |
| **Khi nào thành ảo tưởng** | Bảng chỉ có vài trăm bản ghi (index không cải thiện gì đáng kể); hoặc endpoint chậm là endpoint ghi (index còn làm ghi chậm hơn); hoặc log không có gì cho thấy nghẽn ở DB |
| **Cách kiểm chứng** | Bật slow query log, chạy `EXPLAIN` trên truy vấn của endpoint chậm nhất, đo lại sau khi thêm index |

Cảnh báo: AI hay đề xuất thêm index cho *mọi* cột xuất hiện trong WHERE. Mỗi index thêm vào làm chậm INSERT/UPDATE và tốn dung lượng — với một hệ thống mà nút thắt nằm ở checkout (đường ghi), đây là đề xuất phản tác dụng.

## 2. Thêm connection pool

| | |
|---|---|
| **Thường là** | Khả thi — **nếu** ứng dụng chưa có sẵn pool |
| **Bằng chứng ủng hộ** | Cột `Connect` tăng mạnh theo tải; response time tăng theo bậc thang rõ rệt khi vượt một ngưỡng VU; lỗi kiểu "too many connections" hoặc cạn ephemeral port |
| **Khi nào thành ảo tưởng** | Framework đã có pool sẵn (hầu hết ORM hiện đại đều có) — lúc này đề xuất đúng phải là *tinh chỉnh kích thước pool*, không phải "thêm pool"; hoặc backend dùng SQLite ở chế độ file cục bộ, nơi khái niệm connection pool có ý nghĩa rất khác so với DB client-server |
| **Cách kiểm chứng** | Kiểm tra cấu hình hiện tại của ORM/driver; theo dõi số connection active ở phía DB trong lúc chạy test |

Điểm mấu chốt để phân loại: **phải đọc mã nguồn hoặc cấu hình để biết pool đã tồn tại hay chưa.** AI không có thông tin đó trừ khi được cung cấp, nên đề xuất này thường thuộc nhóm "chưa có căn cứ" hơn là sai hẳn.

## 3. Bật SQLite WAL mode

| | |
|---|---|
| **Thường là** | Khả thi **nếu** backend thật sự dùng SQLite; ảo tưởng nếu dùng PostgreSQL/MySQL/SQL Server |
| **Bằng chứng ủng hộ** | Backend dùng SQLite; endpoint ghi (add-to-cart, checkout) chậm hơn hẳn endpoint đọc; error rate ở đường ghi tăng vọt dưới tải với lỗi kiểu "database is locked" |
| **Vì sao có tác dụng** | Chế độ rollback journal mặc định khiến writer khoá toàn bộ database, chặn cả reader. WAL cho phép reader và writer chạy song song — đúng vào kiểu tranh chấp mà load test e-commerce tạo ra |
| **Giới hạn cần nêu** | WAL vẫn chỉ cho phép **một** writer tại một thời điểm. Nếu nút thắt là ghi đồng thời thuần tuý thì WAL giúp ít. WAL cũng không hoạt động tốt trên network filesystem |
| **Cách kiểm chứng** | `PRAGMA journal_mode;` để xem chế độ hiện tại; chạy lại soak test sau khi bật và so p95 của riêng nhóm transactional |

Đây là đề xuất kinh điển vừa dễ đúng vừa dễ sai: đúng khi stack là SQLite và nghẽn ở tranh chấp đọc-ghi; ảo tưởng hoàn toàn khi backend dùng DBMS khác. Luôn xác minh stack trước.

## 4. Thêm cache (Redis / in-memory)

| | |
|---|---|
| **Thường là** | Khả thi cho nhóm read-heavy; ít liên quan tới transactional |
| **Bằng chứng ủng hộ** | Endpoint đọc chiếm phần lớn traffic và có p95 cao; cùng một product ID được truy vấn lặp lại nhiều lần |
| **Khi nào thành ảo tưởng** | Test dùng product ID hard-code khiến cache hit gần 100% một cách giả tạo — cải thiện đo được sẽ không tái hiện ở production; hoặc thêm Redis vào một hệ thống lab đơn máy làm tăng độ phức tạp vận hành nhiều hơn lợi ích thu được |
| **Cách kiểm chứng** | Kiểm tra độ phân tán của product ID trong file CSV; đo tỷ lệ cache hit dự kiến trước khi triển khai |

## 5. Tăng số worker / process (cluster mode, PM2, gunicorn workers)

| | |
|---|---|
| **Thường là** | Khả thi nếu ứng dụng đang chạy đơn tiến trình trên máy nhiều nhân |
| **Bằng chứng ủng hộ** | CPU tổng thể thấp (ví dụ 25% trên máy 4 nhân) trong khi response time cao — dấu hiệu chỉ một nhân đang làm việc; throughput chạm trần sớm |
| **Khi nào thành ảo tưởng** | CPU đã gần bão hoà (>80%) — thêm worker chỉ làm tăng context switch; hoặc nút thắt nằm ở I/O/database dùng chung, nơi thêm worker chỉ chuyển hàng đợi sang chỗ khác; hoặc backend dùng SQLite file cục bộ, nơi nhiều process ghi đồng thời làm tranh chấp khoá tệ hơn |
| **Cách kiểm chứng** | Đối chiếu screenshot resource monitor: CPU tổng vs CPU từng nhân |

## 6. Nâng cấp phần cứng / scale out

| | |
|---|---|
| **Thường là** | "Chưa có căn cứ" trong ngữ cảnh lab |
| **Vì sao** | Đúng về nguyên tắc nhưng không kiểm chứng được trong phạm vi bài đo, và né tránh câu hỏi thật là *nút thắt kiến trúc nằm ở đâu*. Scalability testing tồn tại chính là để trả lời "thêm tài nguyên có thực sự làm tăng hiệu năng không" — nếu có điểm nghẽn kiến trúc thì thêm phần cứng không cải thiện gì |
| **Cách kiểm chứng** | Chạy cùng test plan trên hai cấu hình phần cứng khác nhau và so throughput — nếu tăng tài nguyên gấp đôi mà throughput chỉ tăng 10% thì nút thắt là kiến trúc, không phải phần cứng |

## 7. Bật HTTP keep-alive / nén response

| | |
|---|---|
| **Thường là** | Khả thi, chi phí thấp |
| **Bằng chứng ủng hộ** | Cột `Connect` chiếm tỷ lệ đáng kể trong `Latency` (thiếu keep-alive); `elapsed − Latency` lớn kèm `bytes` cao (payload nặng, nén sẽ giúp) |
| **Khi nào thành ảo tưởng** | Test chạy trên localhost — chi phí mạng gần như bằng 0, nén còn tốn CPU thêm mà không tiết kiệm được thời gian truyền |

Lưu ý đặc thù môi trường lab: rất nhiều đề xuất liên quan tới mạng trở thành vô nghĩa khi client và server nằm trên cùng một máy. Luôn kiểm tra topology trước khi phán.

## 8. Đề xuất chỉ nghe hay nhưng không kiểm chứng được

Xếp vào "ảo tưởng" hoặc "chưa có căn cứ" tuỳ mức độ:

- "Tối ưu thuật toán" — không chỉ ra thuật toán nào
- "Áp dụng microservices" — thay đổi kiến trúc toàn diện để giải quyết một nút thắt cục bộ
- "Dùng CDN" — khi SUT chỉ có API JSON, không có tài nguyên tĩnh
- "Bật auto-scaling" — khi hệ thống chạy trên một máy đơn không có hạ tầng orchestration
- "Chuyển sang ngôn ngữ nhanh hơn" — không phải một đề xuất tối ưu, đó là viết lại hệ thống

---

## Mẫu bảng verdict

| # | Đề xuất | Verdict | Bằng chứng | Cách kiểm chứng |
|---|---|---|---|---|
| 1 | Bật SQLite WAL | **Khả thi** | Backend dùng SQLite (`database.js` mở file `.db`). Nhóm transactional có p95 = 1527ms so với nhóm read-heavy 749ms; 21/63 lỗi tập trung ở Add-to-Cart và Checkout — phù hợp với tranh chấp khoá ghi | `PRAGMA journal_mode;` trước và sau, chạy lại soak test, so p95 riêng nhóm transactional |
| 2 | Thêm index cho `products.name` | **Chưa có căn cứ** | Kỹ thuật hợp lệ, nhưng Browse/Search có p95 = 756ms, không phải endpoint chậm nhất. Log client-side không chứa thông tin truy vấn để xác nhận đây là nút thắt | Bật slow query log, chạy `EXPLAIN QUERY PLAN` trên truy vấn search |
| 3 | Thêm connection pool | **Ảo tưởng trong ngữ cảnh này** | SQLite truy cập file cục bộ; khái niệm pool kết nối như với DB client-server không áp dụng trực tiếp. Cột `Connect` cũng chỉ ở mức ~10ms, không tăng theo tải | Kiểm tra cấu hình driver hiện tại; theo dõi `Connect` theo mức VU |
| 4 | Triển khai Redis cache | **Chưa có căn cứ** | Có thể giúp nhóm read-heavy, nhưng test dùng tập product ID hẹp nên tỷ lệ cache hit đo được sẽ cao giả tạo so với thực tế | Mở rộng `products.csv`, đo lại phân bố truy cập trước khi quyết định |

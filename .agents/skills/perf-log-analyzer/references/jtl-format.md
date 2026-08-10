# Định dạng file .jtl và công thức tính tay

## 1. Header CSV mặc định

```
timeStamp,elapsed,label,responseCode,responseMessage,threadName,dataType,
success,failureMessage,bytes,sentBytes,grpThreads,allThreads,URL,
Latency,IdleTime,Connect
```

Nếu file mở ra là XML (`<httpSample ...>`), JMeter đang cấu hình `output_format=xml`. Chuyển sang CSV bằng cách sửa `user.properties`:

```
jmeter.save.saveservice.output_format=csv
```

Không thể chuyển ngược file XML đã có sang CSV, phải chạy lại test.

## 2. Ý nghĩa từng cột

| Cột | Kiểu | Ý nghĩa | Lưu ý |
|---|---|---|---|
| `timeStamp` | epoch **millis** | Thời điểm bắt đầu request | Chia 1000 để ra giây. Nhầm đơn vị → throughput sai 1000 lần |
| `elapsed` | ms | **Response time**: từ lúc gửi tới lúc nhận xong toàn bộ response | Đây là cột dùng để tính p50/p95/p99 |
| `label` | text | Tên sampler hoặc Transaction Controller | Dùng để tách số liệu theo nghiệp vụ |
| `responseCode` | text | Mã HTTP, hoặc mã lỗi non-HTTP | **Không** dùng để tính error rate |
| `responseMessage` | text | Thông điệp kèm mã | |
| `threadName` | text | `<tên thread group> <số thứ tự>` | Đếm distinct để kiểm tra số VU thực tế |
| `dataType` | text | `text` / `bin` / rỗng | |
| `success` | bool | `true`/`false` | **Đây mới là nguồn sự thật về pass/fail** |
| `failureMessage` | text | Lý do assertion fail | Rất hữu ích khi phân tích lỗi |
| `bytes` | số | Dung lượng response | Dùng tính throughput theo KB/s |
| `sentBytes` | số | Dung lượng request | |
| `grpThreads` | số | Thread active trong thread group hiện tại | |
| `allThreads` | số | **Tổng thread active toàn test plan** | Dùng để xác định steady-state |
| `URL` | text | URL đầy đủ | |
| `Latency` | ms | **TTFB** — tới byte đầu tiên | ⊂ elapsed |
| `IdleTime` | ms | Thời gian không hoạt động (think time trừ ra) | Thường 0 |
| `Connect` | ms | Thời gian thiết lập kết nối | ⊂ Latency |

Quan hệ bao hàm: `Connect ≤ Latency ≤ elapsed`.

Diễn giải hữu ích:
- `elapsed − Latency` ≈ thời gian truyền nội dung response (lớn khi payload nặng)
- `Latency − Connect` ≈ thời gian server xử lý request
- `Connect` cao ở tải lớn → cạn connection pool hoặc cạn ephemeral port ở tầng OS

## 3. Vì sao dùng `success` chứ không phải `responseCode`

| Tình huống | responseCode | success |
|---|---|---|
| Response 200 nhưng JSON Assertion fail | 200 | **false** |
| Redirect được follow thành công | 302 hoặc 200 | true |
| Timeout ở tầng client | `Non HTTP response code: java.net.SocketTimeoutException` | false |
| API trả 404 nhưng test plan cố tình chấp nhận | 404 | true (nếu assertion cho phép) |

Tính error rate bằng `responseCode != 200` sẽ vừa bỏ sót assertion fail vừa đếm nhầm redirect hợp lệ.

## 4. Công thức tính tay bằng awk

Khi không chạy được Python. Lưu ý: các lệnh này giả định file có header đúng thứ tự mặc định ở mục 1 — nếu cấu hình lưu khác, kiểm tra lại chỉ số cột trước.

```bash
F=results/load.jtl

# Tổng số sample (trừ dòng header)
awk 'NR>1' $F | wc -l

# Error rate — cột 8 = success
awk -F, 'NR>1 {t++; if ($8=="false") e++} END {printf "errors=%d/%d = %.3f%%\n", e, t, e/t*100}' $F

# Throughput toàn file — cột 1 = timeStamp (millis)
awk -F, 'NR>1 {if(min==""||$1<min)min=$1; if($1>max)max=$1; n++}
         END {printf "%d samples / %.1f s = %.2f RPS\n", n, (max-min)/1000, n/((max-min)/1000)}' $F

# p95 của elapsed (cột 2) — nearest-rank, cùng quy ước JMeter
awk -F, 'NR>1 {print $2}' $F | sort -n | \
  awk '{a[NR]=$1} END {r=int(0.95*NR+0.999999); print "p95 =", a[r], "ms"}'

# p50 / p90 / p99 — đổi hệ số 0.95 thành 0.50 / 0.90 / 0.99

# Mean elapsed
awk -F, 'NR>1 {s+=$2; n++} END {printf "mean = %.2f ms\n", s/n}' $F

# Số VU tối đa quan sát được — cột 13 = allThreads
awk -F, 'NR>1 {if($13>m) m=$13} END {print "peak threads =", m}' $F

# p95 chỉ tính cho một transaction (cột 3 = label)
awk -F, 'NR>1 && $3=="05 - Checkout" {print $2}' $F | sort -n | \
  awk '{a[NR]=$1} END {r=int(0.95*NR+0.999999); print "checkout p95 =", a[r], "ms"}'

# Phân rã lỗi theo label + responseCode
awk -F, 'NR>1 && $8=="false" {print $3" | "$4}' $F | sort | uniq -c | sort -rn

# Throughput theo cửa sổ 10 giây (xem hình dạng tải)
awk -F, 'NR>1 {if(min=="")min=$1; b=int(($1-min)/10000); c[b]++}
         END {for(i=0;i<=b;i++) printf "%3ds-%3ds : %5.1f RPS\n", i*10, (i+1)*10, c[i]/10}' $F
```

## 5. Chênh lệch percentile so với HTML dashboard của JMeter

JMeter dùng **nearest-rank** percentile. Nếu tính bằng `numpy.percentile()` mặc định (linear interpolation) sẽ ra số hơi khác — thường lệch vài ms trên tập lớn, nhiều hơn trên tập nhỏ. Chênh lệch này **không phải lỗi**; điều quan trọng là ghi rõ đang dùng phương pháp nào khi trích dẫn, để người đọc đối chiếu được với dashboard.

Script `analyze_jtl.py` trong skill này dùng nearest-rank để khớp với JMeter.

## 6. Đối chiếu với output của k6

| Chỉ số | JMeter .jtl | k6 |
|---|---|---|
| Response time | `elapsed` | `http_req_duration` |
| TTFB | `Latency` | `http_req_waiting` |
| Connect | `Connect` | `http_req_connecting` |
| Error rate | tỷ lệ `success=false` | `http_req_failed` |
| Throughput | tự tính từ timeStamp | `http_reqs` (rate) |
| VU active | `allThreads` | `vus` |

k6 mặc định coi request là failed dựa trên HTTP status (`4xx`/`5xx`), **không** dựa trên `check()`. Nghĩa là `http_req_failed` của k6 và error rate của JMeter đo hai thứ khác nhau — so sánh trực tiếp hai con số này giữa hai công cụ là sai. Muốn k6 tính cả check fail vào, phải khai báo `thresholds` trên metric `checks`.

## 7. File .jtl quá lớn

Test dài với tải cao sinh file hàng trăm MB. Vài cách xử lý:

```bash
# Xem nhanh kích thước và số dòng
ls -lh $F && wc -l $F

# Trích một khoảng thời gian (theo timestamp millis)
awk -F, 'NR==1 || ($1>=1723276800000 && $1<=1723277100000)' $F > steady_only.jtl

# Nén để nộp bài, vẫn giữ nguyên bản đầy đủ
gzip -k $F
```

Không cắt bớt file gốc khi nộp bài — yêu cầu là raw log **đầy đủ**, không chỉ phần tóm tắt. Nếu cần file nhỏ hơn để phân tích, tạo bản trích riêng và giữ nguyên bản gốc.

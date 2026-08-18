# Diagram Brief — để bạn TỰ VẼ

Đề bài mục 7 và mục 11 quy định: diagram thiết kế test generator phải **tự vẽ**, do bạn ra quyết định thiết kế, **không được AI sinh trực tiếp**. Vì vậy file này chỉ liệt kê các khối cần có và câu hỏi thiết kế bạn phải tự trả lời — hình vẽ cuối cùng là của bạn.

Công cụ gợi ý: draw.io / Excalidraw / Figma / vẽ tay chụp ảnh. Xuất PNG kèm báo cáo.

## Các khối tối thiểu nên có

**Input**
- `api_specification.md`
- Cấu hình: endpoint cần sinh, student ID, môi trường

**Xử lý — 5 khối tuần tự**
1. Contract Parser → tách params / responses / state machine / SEC list
2. Domain Partitioner → sinh lớp tương đương + biên cho từng tham số
3. State Transition Explorer → phủ ma trận trạng thái × hành động
4. Security Case Builder → duyệt SEC-01..07, tra payload bank
5. Schema Case Builder → mỗi response code 1 case

**Khối kiểm soát**
- Deduplicator
- Coverage Checker (vòng lặp quay lại bước 2/4 nếu < 35 case)
- Human-in-the-loop Gate (chỗ hỏi lại người dùng khi spec thiếu thông tin)

**Output**
- `TC_<API>.md`, `TC_<API>.csv`, Coverage report, Assumptions list

**Khối ngoài phạm vi generator (vẽ mờ / nét đứt để thể hiện ranh giới)**
- Auditor → Postman Builder → CI/CD

## Quyết định thiết kế bạn nên tự chọn và ghi chú trên hình

Những điểm này là thứ TA hỏi khi oral defense, nên hãy tự quyết và ghi lý do ngắn ngay cạnh khối:

1. **Tuần tự hay song song?** 5 khối sinh case có thể chạy song song vì độc lập — bạn chọn song song để nhanh, hay tuần tự để dễ debug?
2. **Vòng lặp coverage đặt ở đâu?** Quay lại toàn bộ pipeline, hay chỉ quay lại khối yếu nhất?
3. **Human-in-the-loop chặn hay không chặn?** Khi spec thiếu thông tin: dừng hỏi người dùng (chậm, chính xác) hay ghi assumption rồi chạy tiếp (nhanh, rủi ro)?
4. **Payload bank là dữ liệu tĩnh hay do LLM sinh?** Tĩnh thì lặp lại được và audit được; LLM sinh thì đa dạng hơn nhưng khó tái lập.
5. **Ranh giới giữa phần deterministic và phần LLM.** Khối nào là code thuần (dedup, ID assignment, CSV export), khối nào cần LLM (đọc spec, đặt title, suy luận rule nghiệp vụ)? Vẽ đường phân chia này — đây là điểm cộng lớn, vì nó cho thấy bạn hiểu AI dùng ở đâu là hợp lý.

## Ký hiệu gợi ý

- Hình chữ nhật: bước xử lý
- Hình thoi: điểm quyết định (đủ 35 case chưa? spec có đủ thông tin không?)
- Hình trụ: kho dữ liệu (payload bank, spec)
- Nét đứt: ranh giới hệ thống / khối ngoài phạm vi
- Màu khác: khối do LLM đảm nhiệm vs khối code thuần

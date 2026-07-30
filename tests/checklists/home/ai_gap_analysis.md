# AI Gap Analysis — GUI Checklist Trang Chủ EShop

**Tham chiếu checklist:** [checklist.md](./checklist.md)  
**Tham chiếu yêu cầu:** [README.md](../../../README.md)  
**Ngày thực hiện:** 2026-07-30  
**Người thực hiện review:** Mạch Quốc Tấn

---

## Nhận xét nhanh sau khi đọc lại checklist

Em thấy checklist AI sinh ra khá ổn ở phần bề mặt: có search, có product grid, có điều hướng sang chi tiết, có một vài item về XSS và responsive. Nhưng nếu nhìn kỹ hơn theo đúng README thì vẫn có những thứ nhìn bằng mắt thường dễ bỏ qua nếu chỉ bám vào luồng chức năng chính.

Em chia các gap thành hai nhóm:

1. Những thứ AI đã chạm tới nhưng chưa đi đủ sâu.
2. Những thứ em cho là bị bỏ sót hẳn vì prompt ban đầu kéo AI về phía kiểm tra UI/flow cơ bản, chứ không ép nó nghĩ nhiều đến a11y, keyboard-only và hành vi khi mạng chậm.

---

## Phân Tích Gap Theo Từng Hạng Mục

### 1. Accessibility (Screen reader, ARIA labels, Focus order)

| Trạng Thái                  | Chi Tiết                                                                                                                                                                                                                                                                                                         |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bị bỏ qua một phần**      | Checklist có nhắc đến focus indicator và có một item về tab order cho ô tìm kiếm, nhưng em không thấy item nào kiểm tra đúng nghĩa accessibility tree: `label` có gắn với input chưa, các nút có tên truy cập rõ chưa, card sản phẩm có đọc được bằng screen reader không, và các link/nút có role hợp lệ không. |
| **Hành động cần thực hiện** | Kiểm tra bằng tay với bàn phím và screen reader basics: tab qua toàn bộ header, search, product card actions, kiểm tra tên truy cập của link/nút, xác nhận không có control nào chỉ "trông giống nút" nhưng không có tên rõ ràng cho người dùng trợ năng.                                                        |

**Vì sao em nghĩ AI bỏ sót:** vì prompt và checklist gốc đều tập trung vào thứ nhìn thấy được trên màn hình. AI dễ suy ra từ UI text, nhưng không tự "nhảy" sang cây accessibility nếu em không ép thẳng vào a11y.

### 2. RTL / Internationalisation Layout

| Trạng Thái               | Chi Tiết                                                                                                                                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Loại trừ có chủ đích** | Dựa trên README và SRS, EShop web này là giao diện tiếng Việt, bố cục LTR, không có yêu cầu hỗ trợ RTL hay đa ngôn ngữ. Em không xem đây là gap bị bỏ sót, mà là hạng mục không áp dụng cho màn hình Home hiện tại. |

**Vì sao AI không đưa vào:** vì ngữ cảnh dự án đã đủ rõ để hiểu đây không phải bài toán i18n đa ngôn ngữ. Nếu AI không nhắc đến thì cũng không phải lỗi, mà là nó đã tự loại trừ tương đối đúng.

### 3. Dark Mode

| Trạng Thái    | Chi Tiết                                                                                                                                                                                                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bị bỏ qua** | README và checklist không nói gì về dark mode, nhưng nếu nhìn theo góc GUI checklist thì đây vẫn là một khoảng trống đáng chú ý: không có item nào xác nhận UI có hỗ trợ theme tối, hoặc ít nhất là đảm bảo màu chữ/nền không phụ thuộc cứng vào một theme duy nhất. |

**Vì sao em nghĩ AI bỏ sót:** vì checklist AI thường bám theo trạng thái hiện có của app, mà app đang là light theme mặc định. Nếu em không hỏi thẳng về theme thì AI rất dễ xem dark mode là "ngoài phạm vi".

### 4. Keyboard-Only Navigation (Toàn trang)

| Trạng Thái                  | Chi Tiết                                                                                                                                                                                                                                                                                         |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Bị bỏ qua một phần**      | Checklist có item nhấn Enter trong search, nhưng chưa kiểm tra luồng bàn phím đầy đủ của cả trang: Tab từ logo tới Giỏ hàng, Đăng nhập, Đăng ký, rồi sang ô tìm kiếm, sau đó qua các action trong product card. Cũng chưa thấy item nào nói rõ focus phải đi đúng thứ tự và luôn nhìn thấy được. |
| **Hành động cần thực hiện** | Chạy một vòng tab-only từ đầu đến cuối trang trên Chrome, ghi lại thứ tự focus, kiểm tra Enter/Space có kích hoạt đúng control không, và xem có control nào bị "kẹt" focus hay nhảy lung tung không.                                                                                             |

**Vì sao em nghĩ AI bỏ sót:** prompt ban đầu có nhắc keyboard, nhưng chỉ đủ để AI sinh ra một item Enter trong search. Nó chưa được kéo đủ mạnh để nghĩ thành một kịch bản keyboard-only toàn trang.

### 5. Offline / Slow-Network Behavior

| Trạng Thái    | Chi Tiết                                                                                                                                                                                                                                                                                              |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bị bỏ qua** | Checklist có item loading state và offline error, nhưng em vẫn thấy thiếu một lớp kiểm tra thực tế hơn: khi API chậm hoặc lỗi giữa chừng thì Home có hiển thị trạng thái chờ rõ ràng không, có để người dùng nhìn vào một vùng trắng mà tưởng app bị treo không, và có cách thoát/nhắc thử lại không. |

**Vì sao em nghĩ AI bỏ sót:** vì AI thường viết item theo mẫu "loading/empty/error" khá chung chung. Nó ít tự tách ra thành hành vi cụ thể của màn hình này nếu không có prompt nhấn vào latency, timeout hay retry.

### 6. Responsive / Mobile Breakpoints

| Trạng Thái                       | Chi Tiết                                                                                                                                                                                                                                                                                                                           |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Được xử lý nhưng chưa đủ sâu** | Checklist có nhắc đến overflow trên mobile và không bị clip ở viewport nhỏ. Tuy nhiên em vẫn thấy hơi thiếu một item đi sát hành vi thật hơn, ví dụ: ở màn hình hẹp thì cụm search có bị chật quá không, các nút "Xem chi tiết" / "Thêm vào giỏ" có còn đủ tap target không, và product card có bị dồn button hay vỡ layout không. |

**Vì sao AI chỉ dừng ở mức này:** vì prompt thiên về kiểm tra visual compliance chung, nên AI chọn những câu an toàn kiểu "không overflow". Nó không tự đào sâu tới mức tương tác ngón tay và bố cục nút trên mobile.

### 7. Hạng Mục Khác

| Trạng Thái         | Chi Tiết                                                                                                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cần lưu ý thêm** | Em thấy checklist còn thiếu một item về khả năng đọc hiểu nội dung khi ảnh lỗi load: hiện có alt text, nhưng chưa có kiểm tra fallback khi ảnh thật không tải được. Với một trang sản phẩm, chuyện ảnh lỗi load là khá thực tế. |

---

### 8. Link Integrity, Dead-End và 404 Recovery

| Trạng Thái                  | Chi Tiết                                                                                                                                                                                                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Bị bỏ qua một phần**      | Checklist có test click logo, cart, login, register và xem chi tiết, nhưng em chưa thấy item nào kiểm tra theo nghĩa đầy đủ rằng link đi đúng đúng đích, không tạo dead-end, không để người dùng rơi vào trang cụt, và có trang 404 thân thiện khi đi vào route không tồn tại. |
| **Hành động cần thực hiện** | Kiểm tra từng liên kết nội bộ trên Home xem có trỏ đúng đích không; mở các trang đích như Cart, Login, Register, Product Detail để xem có lối quay lại hoặc tiếp tục không; truy cập thử một route không tồn tại để xác nhận có 404 recovery rõ ràng.                          |

**Vì sao em nghĩ AI bỏ sót:** vì checklist AI thường nhìn link như một hành vi click đơn giản, còn các khái niệm dead-end, orphan page và custom 404 lại thuộc kiểu kiểm thử rộng hơn nên rất dễ bị bỏ quên nếu prompt không nhắc đến.

### 9. Link States, Màu Sắc và Tính Nhất Quán Điều Hướng

| Trạng Thái                  | Chi Tiết                                                                                                                                                                                                                                                       |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bị bỏ qua**               | Checklist hiện có màu nút và một số kiểm tra giao diện chung, nhưng em chưa thấy item nào đụng vào hover/visited/active state của link, nhất là ở header và link Xem chi tiết. Đây là những trạng thái rất dễ làm người dùng không biết mình đã click đâu rồi. |
| **Hành động cần thực hiện** | Soi lại trạng thái hover, visited và active của các link điều hướng chính; kiểm tra màu có đủ phân biệt và có giữ được tính nhất quán giữa các nhóm link/nút hay không.                                                                                        |

**Vì sao em nghĩ AI bỏ sót:** vì khi AI sinh checklist từ màn hình thực, nó hay ưu tiên màu của button hơn là màu của link-state. Các trạng thái kiểu visited/hover thường chỉ lộ ra khi người viết cố tình yêu cầu sâu hơn.

### 10. Ảnh Lỗi Load, Nội Dung Đọc Được và Robustness Khi Nhập Liệu

| Trạng Thái                  | Chi Tiết                                                                                                                                                                                                                          |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bị bỏ qua một phần**      | Checklist đã có alt text, nhưng em vẫn thấy thiếu hai lớp: một là ảnh lỗi load thì card có còn đọc được không; hai là ô tìm kiếm có chịu được chuỗi chữ, số và ký tự đặc biệt hợp lệ mà không làm vỡ layout hay render lỗi không. |
| **Hành động cần thực hiện** | Tắt mạng/giả lập ảnh lỗi để xem card sản phẩm còn dùng được không; nhập thử các chuỗi ký tự bình thường nhưng đa dạng vào search box để kiểm tra form robustness và UI stability.                                                 |

**Vì sao em nghĩ AI bỏ sót:** vì AI dễ dừng ở kiểm tra alt text như một checkbox accessibility đơn giản, trong khi khả năng chịu lỗi của ảnh và dữ liệu nhập lại là hai thứ khác hẳn, nên cần người review chủ động kéo ra.

---

### 11. Browser Tab Title và Mô Tả Trang

| Trạng Thái                  | Chi Tiết                                                                                                                                                                                                                                                                        |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bị bỏ qua**               | Checklist có kiểm tra h1 và tiêu đề trang theo nội dung hiển thị, nhưng em không thấy item nào kiểm tra browser tab title. Với Home hiện tại, tab title đang còn là kiểu scaffold mặc định `frontend-web`, nên người dùng mở nhiều tab sẽ rất khó nhận ra tab nào là trang nào. |
| **Hành động cần thực hiện** | Kiểm tra `document.title` hoặc nhìn trực tiếp trên tab trình duyệt để xác nhận tên trang rõ ràng, đồng bộ với Home, thay vì giữ tên mặc định của project.                                                                                                                       |

**Vì sao em nghĩ AI bỏ sót:** vì AI thường nhìn title là phần ngoài UI chính nên dễ bỏ qua nếu prompt chỉ xoay quanh màn hình render được. Với bài kiểm thử GUI, đây là một khoảng rất dễ lọt qua nếu không chủ động nhắc.

### 12. Các Nhóm Từ Danh Sách Gốc Nhưng Không Áp Dụng Cho Home

| Trạng Thái                  | Chi Tiết                                                                                                                                                                                                                                                                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Loại trừ có chủ đích**    | Những nhóm như `mailto`, external links mở cửa sổ mới, radio/checkbox/listbox, cookie-deletion behavior, privacy policy link, company address/help tooltip cho field phức tạp, và các control upload/list dài không xuất hiện trên Home hiện tại. Em không coi đây là bỏ sót, mà là do màn hình Home không có đối tượng kiểm thử tương ứng. |
| **Hành động cần thực hiện** | Không thêm item giả tạo cho các nhóm này ở Home; chỉ đưa vào checklist khi một màn hình khác thật sự có email link, form nhiều bước, privacy link, hoặc control tương ứng.                                                                                                                                                                  |

**Vì sao AI không đưa vào:** vì AI đang bám theo Home screen cụ thể. Các heuristic này đúng về mặt kiểm thử chung, nhưng trên màn hình hiện tại chúng không có target để kiểm tra nên tốt nhất là ghi rõ N/A thay vì ép nhét vào checklist.

---

### 13. Ngôn Ngữ Tài Liệu HTML (`lang`)

| Trạng Thái                  | Chi Tiết                                                                                                                                                                                                                                                               |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bị bỏ qua**               | Checklist có item về nội dung tiếng Việt nhất quán, nhưng em không thấy item nào kiểm tra thuộc tính `lang` của document. Với Home hiện tại, `index.html` vẫn để `lang="en"` trong khi UI là tiếng Việt, nên đây là một gap rõ ràng về accessibility và i18n nền tảng. |
| **Hành động cần thực hiện** | Kiểm tra `html[lang]` hoặc view source để xác nhận ngôn ngữ tài liệu khớp với giao diện thực tế; nếu trang đang dùng tiếng Việt thì thuộc tính phải phản ánh điều đó để screen reader và công cụ dịch hiểu đúng.                                                       |

**Vì sao em nghĩ AI bỏ sót:** vì AI thường đọc nội dung hiển thị trong trang hơn là metadata của HTML document. Cái này rất dễ bị quên nếu không nhìn trực tiếp vào `index.html`.

---

## Items Hoàn Toàn Do Sinh Viên Tự Bổ Sung

| ID                | Mô Tả Item                                                                                                                                                              | Lý Do AI Bỏ Qua                                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| HOME-GUI-IA02-042 | Các control trên Home phải có tên truy cập rõ ràng cho screen reader, đặc biệt là ô tìm kiếm, link Giỏ hàng, Đăng nhập, Đăng ký và các nút trong product card.          | AI chủ yếu nhìn vào text hiển thị trên UI nên dễ bỏ qua accessibility tree và nhãn truy cập thực tế.                                |
| HOME-GUI-IA02-043 | Người dùng chỉ dùng bàn phím phải đi được hết Home theo thứ tự hợp lý, từ header đến search rồi tới các action trong từng product card, không bị nhảy focus bất thường. | Prompt chỉ chạm đến Enter trong search nên AI dừng ở một kiểm tra keyboard rất hẹp, chưa mở rộng thành keyboard-only flow.          |
| HOME-GUI-IA04-044 | Khi API sản phẩm chậm hoặc lỗi, Home phải cho người dùng thấy trạng thái chờ hoặc lỗi rõ ràng, không để họ nhìn vào một vùng trống khó hiểu.                            | AI hay sinh item loading/error theo công thức chung, nhưng không tự chuyển nó thành một kịch bản cụ thể theo hành vi thật của Home. |
| HOME-GUI-IA01-045 | Ở màn hình hẹp, cụm search và các nút hành động của sản phẩm phải vẫn gọn, đủ khoảng chạm và không làm vỡ nhịp đọc của card.                                            | AI mới dừng ở mức overflow chung, chưa đi đến chi tiết tương tác và tap target trên mobile.                                         |
| HOME-GUI-IA03-046 | Logo, Giỏ hàng, Đăng nhập, Đăng ký và liên kết Xem chi tiết phải đưa người dùng tới đúng trang mà nhãn đang nói tới, không được trỏ sai đích.                           | AI chưa tự mở rộng sang kiểm tra độ chính xác của đích liên kết, chỉ dừng ở việc link có xuất hiện.                                 |
| HOME-GUI-IA03-047 | Các trang người dùng đi tới từ Home như Giỏ hàng, Đăng nhập, Đăng ký và Chi tiết sản phẩm không được là trang cụt; phải có lối đi rõ ràng để quay lại hoặc tiếp tục.    | AI thường xem điều hướng thành click-through một chiều nên dễ bỏ sót dead-end và khả năng quay lại.                                 |
| HOME-GUI-IA03-048 | Khi truy cập một đường dẫn không tồn tại trong web app, hệ thống phải hiển thị trang 404 thân thiện và có đường quay về Trang Chủ hoặc ô tìm kiếm.                      | Prompt gốc không nhắc tới route lỗi, nên AI không tự nghĩ đến 404 recovery.                                                         |
| HOME-GUI-IA01-049 | Các liên kết và nút trên Home phải có trạng thái hover/visited/active dễ phân biệt, nhất là những link điều hướng ở header và link Xem chi tiết.                        | AI hay ưu tiên màu tổng thể, nhưng dễ bỏ qua state color của link vì đó là trạng thái khó thấy nếu không test chủ đích.             |
| HOME-GUI-IA04-050 | Nếu ảnh sản phẩm không tải được, card vẫn phải giữ bố cục đọc được và tên/giá sản phẩm vẫn nhìn rõ, không làm vỡ toàn bộ trang.                                         | AI thường dừng ở alt text nên chưa tách riêng khả năng đọc được khi ảnh lỗi tải.                                                    |
| HOME-GUI-IA02-051 | Ô tìm kiếm phải xử lý được từ khóa chữ, số và ký tự đặc biệt hợp lệ mà không làm vỡ layout hay render lỗi trên trang.                                                   | AI dễ tập trung vào injection/XSS mà bỏ qua robustness của chuỗi nhập bình thường nhưng đa dạng.                                    |
| HOME-GUI-IA01-052 | Tiêu đề tab trình duyệt của Home phải rõ ràng, không giữ mặc định kiểu scaffold như `frontend-web`, để người dùng nhận diện đúng trang đang mở.                         | AI hay nhìn vào h1 và nội dung trong trang hơn là title của tab trình duyệt.                                                        |
| HOME-GUI-IA02-053 | Ô tìm kiếm phải xử lý ổn định khoảng trắng đầu/cuối và chuỗi chữ-số-ký tự đặc biệt hợp lệ mà không làm sai kết quả hoặc vỡ layout.                                      | AI thường ưu tiên XSS/injection hơn là các biến thể nhập liệu bình thường nhưng dễ làm lộ lỗi UX.                                   |
| HOME-GUI-IA01-054 | Thuộc tính `lang` của tài liệu HTML phải phản ánh đúng ngôn ngữ hiển thị của trang Home, không để mặc định `en` khi giao diện đang là tiếng Việt.                       | AI thường xem nội dung hiển thị là đủ, nên hay bỏ qua metadata của document như `lang`.                                             |

---

## Kết Luận Review

- **Tổng items AI sinh:** 41
- **Tổng items sinh viên bổ sung:** 13
- **Tổng items trong checklist:** 54
- **Các gap quan trọng nhất theo em:**
  1. Accessibility chưa đi đủ sâu, nhất là nhãn truy cập và toàn bộ luồng focus bằng bàn phím.
  2. Link integrity, dead-end và 404 recovery là nhóm rất dễ bị quên nếu chỉ nhìn click flow cơ bản.
  3. Hành vi khi mạng chậm/lỗi, ảnh lỗi load, browser tab title và `lang` của document vẫn còn là những chỗ dễ bị bỏ sót nếu chỉ nhìn vào phần hiển thị chính.

---

_Em viết phần review này sau khi đọc lại checklist AI sinh ra và đối chiếu với README._

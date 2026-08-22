const fs = require("fs");
const path = require("path");

const apiRoot = path.resolve(__dirname, "..");
const submissionRoot = path.resolve(apiRoot, "../../..");
const testCaseRoot = path.join(submissionRoot, "tests/test-cases/api");
const reviewPath = path.join(
  submissionRoot,
  "docs/ai-report/Generated_API_Test_Suites_Review_List.md",
);

const suites = {
  FR04_PUT_api_users_me: {
    prefix: "FR04-USRME-",
    fixture:
      "Fixture service đặt lại hai seed user, lưu snapshot hồ sơ và quyền trước mỗi iteration; sau iteration sẽ đối chiếu rồi khôi phục dữ liệu.",
  },
  FR09_POST_api_apply_coupon: {
    prefix: "FR09-APPLY-",
    fixture:
      "Fixture service đặt lại seed user/coupon/coupon_usage và thiết lập use_count, is_active hoặc mốc ngày theo test_id trước mỗi iteration.",
  },
  FR17_POST_api_admin_coupons: {
    prefix: "FR17-ADMINCOUP-",
    fixture:
      "Fixture service đặt lại seed user/coupon, bảo đảm code thử nghiệm chưa tồn tại, lưu snapshot và xóa dữ liệu tạo trong iteration khi hoàn tất.",
  },
};

const statusById = new Map();
const setStatus = (status, ids) => ids.forEach((id) => statusById.set(id, status));

setStatus(200, [
  "FR04-USRME-DP-001",
  "FR04-USRME-DP-002",
  "FR04-USRME-DP-003",
  "FR04-USRME-DP-007",
  "FR04-USRME-DP-008",
  "FR04-USRME-DP-009",
  "FR04-USRME-DP-017",
  "FR04-USRME-DP-020",
  "FR04-USRME-ST-001",
  "FR04-USRME-ST-002",
  "FR04-USRME-ST-003",
  "FR04-USRME-ST-007",
  "FR04-USRME-ST-008",
  "FR04-USRME-SEC-006",
  "FR04-USRME-SEC-007",
  "FR04-USRME-SEC-008",
  "FR04-USRME-SEC-009",
  "FR04-USRME-SC-001",
  "FR04-USRME-SC-002",
]);
setStatus(400, [
  "FR04-USRME-DP-004",
  "FR04-USRME-DP-005",
  "FR04-USRME-DP-006",
  "FR04-USRME-DP-010",
  "FR04-USRME-DP-011",
  "FR04-USRME-DP-012",
  "FR04-USRME-DP-013",
  "FR04-USRME-DP-014",
  "FR04-USRME-DP-015",
  "FR04-USRME-DP-016",
  "FR04-USRME-DP-018",
  "FR04-USRME-DP-019",
  "FR04-USRME-DP-021",
  "FR04-USRME-ST-005",
  "FR04-USRME-ST-006",
  "FR04-USRME-SEC-003",
  "FR04-USRME-SEC-004",
  "FR04-USRME-SEC-005",
  "FR04-USRME-SEC-010",
  "FR04-USRME-SEC-011",
  "FR04-USRME-SEC-014",
  "FR04-USRME-SEC-015",
  "FR04-USRME-SEC-016",
  "FR04-USRME-SC-004",
  "FR04-USRME-SC-005",
]);
setStatus(401, [
  "FR04-USRME-ST-004",
  "FR04-USRME-SEC-001",
  "FR04-USRME-SEC-002",
  "FR04-USRME-SEC-012",
  "FR04-USRME-SEC-013",
  "FR04-USRME-SC-003",
]);
setStatus(415, ["FR04-USRME-DP-022"]);

setStatus(200, [
  "FR09-APPLY-DP-001",
  "FR09-APPLY-DP-002",
  "FR09-APPLY-DP-003",
  "FR09-APPLY-DP-004",
  "FR09-APPLY-DP-018",
  "FR09-APPLY-DP-021",
  "FR09-APPLY-DP-022",
  "FR09-APPLY-SC-001",
  "FR09-APPLY-SC-002",
  "FR09-APPLY-SEC-006",
  "FR09-APPLY-SEC-008",
  "FR09-APPLY-ST-001",
  "FR09-APPLY-ST-003",
  "FR09-APPLY-ST-007",
]);
setStatus(400, [
  "FR09-APPLY-DP-005",
  "FR09-APPLY-DP-006",
  "FR09-APPLY-DP-008",
  "FR09-APPLY-DP-009",
  "FR09-APPLY-DP-010",
  "FR09-APPLY-DP-013",
  "FR09-APPLY-DP-014",
  "FR09-APPLY-DP-015",
  "FR09-APPLY-DP-016",
  "FR09-APPLY-DP-017",
  "FR09-APPLY-DP-019",
  "FR09-APPLY-DP-020",
  "FR09-APPLY-SC-005",
  "FR09-APPLY-SEC-004",
  "FR09-APPLY-SEC-005",
  "FR09-APPLY-SEC-007",
  "FR09-APPLY-SEC-010",
  "FR09-APPLY-SEC-011",
]);
setStatus(401, ["FR09-APPLY-SC-004", "FR09-APPLY-SEC-001", "FR09-APPLY-SEC-002"]);
setStatus(404, [
  "FR09-APPLY-DP-007",
  "FR09-APPLY-DP-011",
  "FR09-APPLY-DP-012",
  "FR09-APPLY-SC-003",
  "FR09-APPLY-SEC-003",
  "FR09-APPLY-ST-005",
  "FR09-APPLY-ST-006",
]);
setStatus(409, ["FR09-APPLY-ST-002", "FR09-APPLY-ST-004"]);
setStatus(200, ["FR09-APPLY-SEC-009", "FR09-APPLY-ST-008"]);

setStatus(201, [
  "FR17-ADMINCOUP-DP-001",
  "FR17-ADMINCOUP-DP-002",
  "FR17-ADMINCOUP-DP-015",
  "FR17-ADMINCOUP-DP-017",
  "FR17-ADMINCOUP-SC-001",
  "FR17-ADMINCOUP-ST-001",
  "FR17-ADMINCOUP-ST-002",
  "FR17-ADMINCOUP-ST-003",
  "FR17-ADMINCOUP-ST-005",
  "FR17-ADMINCOUP-ST-007",
  "FR17-ADMINCOUP-ST-008",
]);
setStatus(400, [
  "FR17-ADMINCOUP-DP-003",
  "FR17-ADMINCOUP-DP-004",
  "FR17-ADMINCOUP-DP-005",
  "FR17-ADMINCOUP-DP-007",
  "FR17-ADMINCOUP-DP-008",
  "FR17-ADMINCOUP-DP-009",
  "FR17-ADMINCOUP-DP-010",
  "FR17-ADMINCOUP-DP-011",
  "FR17-ADMINCOUP-DP-012",
  "FR17-ADMINCOUP-DP-013",
  "FR17-ADMINCOUP-DP-014",
  "FR17-ADMINCOUP-DP-016",
  "FR17-ADMINCOUP-DP-018",
  "FR17-ADMINCOUP-DP-019",
  "FR17-ADMINCOUP-DP-020",
  "FR17-ADMINCOUP-DP-021",
  "FR17-ADMINCOUP-DP-022",
  "FR17-ADMINCOUP-DP-023",
  "FR17-ADMINCOUP-DP-024",
  "FR17-ADMINCOUP-DP-025",
  "FR17-ADMINCOUP-SC-002",
  "FR17-ADMINCOUP-SC-006",
  "FR17-ADMINCOUP-SEC-004",
  "FR17-ADMINCOUP-SEC-005",
  "FR17-ADMINCOUP-SEC-007",
  "FR17-ADMINCOUP-SEC-009",
  "FR17-ADMINCOUP-ST-004",
  "FR17-ADMINCOUP-ST-006",
]);
setStatus(401, ["FR17-ADMINCOUP-SC-004", "FR17-ADMINCOUP-SEC-001", "FR17-ADMINCOUP-SEC-003"]);
setStatus(403, ["FR17-ADMINCOUP-SC-003", "FR17-ADMINCOUP-SEC-002", "FR17-ADMINCOUP-SEC-006"]);
setStatus(409, ["FR17-ADMINCOUP-DP-006", "FR17-ADMINCOUP-SC-005"]);
setStatus(201, ["FR17-ADMINCOUP-SEC-008"]);

const specialSequences = {
  "FR09-APPLY-SEC-009": "fr09_parallel_apply",
  "FR09-APPLY-ST-008": "fr09_expiry_boundary",
  "FR17-ADMINCOUP-SEC-008": "fr17_parallel_create",
  "FR17-ADMINCOUP-ST-002": "fr17_repeat_create",
  "FR17-ADMINCOUP-ST-003": "fr17_create_then_apply",
  "FR17-ADMINCOUP-ST-005": "fr17_delete_recreate",
  "FR17-ADMINCOUP-ST-007": "fr17_coupon_lifecycle",
  "FR17-ADMINCOUP-ST-008": "fr17_delete_recreate",
};

const followUpBodies = {
  "FR04-USRME-ST-003": {
    name: "Lần 2",
    phone: "0922222222",
    shipping_address: "B",
  },
  "FR04-USRME-ST-007": {
    name: "Lần hai",
    phone: "0944444444",
    shipping_address: "B",
  },
  "FR04-USRME-ST-008": {
    name: "Retry profile",
    phone: "0955555555",
    shipping_address: "Retry address",
  },
};

const schemaFor = (id, status) => {
  if (id.startsWith("FR09-") && status === 200) {
    return id.includes("-SC-") ? "coupon_success_exact" : "coupon_success_required";
  }
  if (id.startsWith("FR17-") && status === 201) {
    return id === "FR17-ADMINCOUP-SC-001" ? "coupon_created_exact" : "coupon_created_required";
  }
  if (id.startsWith("FR04-") && status === 200) {
    return id === "FR04-USRME-SC-001" ? "profile_update_exact" : "profile_update_required";
  }
  return id.includes("-SC-") ? "error_exact" : "error_required";
};

const stateFor = (id, status) => {
  if (id.startsWith("FR04-")) {
    return status === 200 ? "profile_matches_effective_request" : "profile_unchanged";
  }
  if (id.startsWith("FR09-")) return "coupon_usage_and_coupon_unchanged";
  if (id === "FR17-ADMINCOUP-SEC-008") return "one_coupon_after_parallel_create";
  if (status === 201) return "one_created_coupon_matches_request";
  return "no_coupon_created_and_seed_unchanged";
};

const formulaFor = (body, status) => {
  if (status !== 200 || !body || typeof body.total_amount !== "number") return null;
  const discounts = { SAVE10: 0.1, BIGBUY: 50000, VIP100: 100000 };
  if (!(body.code in discounts)) return null;
  const discount =
    body.code === "SAVE10" ? body.total_amount * discounts.SAVE10 : discounts[body.code];
  return {
    expected_discount_amount: discount,
    expected_final_amount: body.total_amount - discount,
  };
};

const expectedText = (row) => {
  const status = row.expected_status;
  const basis = row.oracle_basis;
  const schema = row.expected_response_schema;
  if (row.special_sequence === "fr09_parallel_apply") {
    return `Theo ${basis}: hai request đồng thời đều trả HTTP 200 vì endpoint chỉ tính toán; mỗi response đúng công thức SAVE10 và coupon_usage không đổi. Không request nào gây lỗi 5xx hoặc làm vượt giới hạn.`;
  }
  if (row.special_sequence === "fr09_expiry_boundary") {
    return `Theo ${basis}: coupon hết hạn ngày mai trả HTTP 200; coupon hết hạn đúng ngày hiện tại và ngày hôm qua trả HTTP 400. Cả ba response dùng JSON error/success đúng schema và không thay đổi coupon_usage.`;
  }
  if (row.special_sequence === "fr17_parallel_create") {
    return `Theo ${basis}: hai request tạo cùng code chạy đồng thời cho kết quả một HTTP 201 và một HTTP 409; CSDL chỉ có đúng một coupon RACE2026 và không có thay đổi ngoài phạm vi.`;
  }
  if (row.special_sequence === "fr17_repeat_create") {
    return `Theo ${basis}: request đầu trả HTTP 201, request lặp lại cùng code trả HTTP 409; danh sách chỉ có đúng một coupon DUPFLOW.`;
  }
  if (row.special_sequence === "fr17_create_then_apply") {
    return `Theo ${basis}: tạo coupon trả HTTP 201; áp dụng coupon vừa tạo qua FR09 trả HTTP 200 với discount_amount và final_amount đúng công thức; coupon mặc định active và chỉ có một bản ghi.`;
  }
  if (row.special_sequence === "fr17_delete_recreate") {
    return `Theo ${basis}: tạo trả HTTP 201, xóa cứng trả HTTP 204, tạo lại cùng code trả HTTP 201; trạng thái cuối có đúng một coupon khớp request.`;
  }
  if (row.special_sequence === "fr17_coupon_lifecycle") {
    return `Theo ${basis}: tạo coupon trả HTTP 201, áp dụng lần đầu trả HTTP 200, ghi nhận usage thành công, lần áp dụng tiếp theo trả HTTP 409; usage không vượt max_uses_per_user.`;
  }
  if (row.test_id.startsWith("FR04-")) {
    if (status === 200) {
      const follow = row.follow_up_body_json
        ? " Request tiếp theo cũng trả 200 và hồ sơ cuối khớp body cuối cùng."
        : "";
      return `Theo ${basis}: HTTP 200; response khớp schema ${schema}; GET /api/users/me xác nhận các trường được phép khớp request, còn id, email, role và user khác không đổi.${follow}`;
    }
    return `Theo ${basis}: HTTP ${status}; response khớp schema ${schema}; hồ sơ, role, email, password/reset token và user khác không thay đổi.`;
  }
  if (row.test_id.startsWith("FR09-")) {
    if (status === 200) {
      const formula =
        row.expected_discount_amount !== undefined
          ? ` discount_amount = ${row.expected_discount_amount} và final_amount = ${row.expected_final_amount};`
          : " các trường tính tiền khớp fixture và công thức FR-09;";
      return `Theo ${basis}: HTTP 200; response khớp schema ${schema};${formula} coupon và coupon_usage không đổi.`;
    }
    return `Theo ${basis}: HTTP ${status}; response khớp schema ${schema}, không lộ secret/stack trace; coupon và coupon_usage không đổi.`;
  }
  if (status === 201) {
    return `Theo ${basis}: HTTP 201; response khớp schema ${schema}; CSDL có đúng một coupon khớp sáu trường cho phép, mặc định active, không thay đổi user hoặc coupon seed khác.`;
  }
  return `Theo ${basis}: HTTP ${status}; response khớp schema ${schema}, không lộ secret/stack trace; không tạo coupon và không thay đổi dữ liệu seed.`;
};

for (const [suiteName, suite] of Object.entries(suites)) {
  const dataPath = path.join(apiRoot, suiteName, `${suiteName}_data_driven.json`);
  const rows = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  for (const row of rows) {
    if (!statusById.has(row.test_id)) {
      throw new Error(`Missing exact execution status for ${row.test_id}`);
    }

    const previousBody = row.body_json;
    let parsedBody = null;
    try {
      parsedBody = JSON.parse(previousBody);
    } catch {
      // Deliberately non-JSON payloads remain raw.
    }

    if (row.test_id.startsWith("FR09-") && parsedBody && "user_id" in parsedBody) {
      parsedBody.user_id = row.test_id === "FR09-APPLY-SEC-006" ? 1 : 2;
      row.body_json = JSON.stringify(parsedBody);
    }

    row.expected_status = statusById.get(row.test_id);
    row.expected_status_class = row.expected_status < 300 ? "2xx" : "4xx";
    row.oracle_basis = row.test_id.startsWith("FR04-")
      ? "execution contract A-FR04"
      : row.test_id.startsWith("FR09-")
        ? "execution contract A-FR09"
        : "execution contract A-FR17";
    row.expected_response_schema = schemaFor(row.test_id, row.expected_status);
    row.expected_state = stateFor(row.test_id, row.expected_status);
    row.execution_mode = "normal";
    row.main_request_enabled = true;

    if (followUpBodies[row.test_id]) {
      row.execution_mode = "follow_up";
      row.follow_up_body_json = JSON.stringify(followUpBodies[row.test_id]);
      row.follow_up_expected_status = 200;
    }
    if (specialSequences[row.test_id]) {
      row.execution_mode = "special_sequence";
      row.special_sequence = specialSequences[row.test_id];
      row.main_request_enabled = ![
        "fr09_parallel_apply",
        "fr09_expiry_boundary",
        "fr17_parallel_create",
      ].includes(row.special_sequence);
    }

    const formula = formulaFor(parsedBody, row.expected_status);
    if (formula) Object.assign(row, formula);

    const tcPath = path.join(testCaseRoot, suiteName, `${row.test_id}.md`);
    let markdown = fs.readFileSync(tcPath, "utf8");
    if (previousBody !== row.body_json) {
      markdown = markdown.split(previousBody).join(row.body_json);
    }
    if (!markdown.includes(suite.fixture)) {
      markdown = markdown.replace(/\r?\n## Test data/, `\n- ${suite.fixture}\n\n## Test data`);
    }
    const result = expectedText(row);
    markdown = markdown.replace(
      /## Expected result\r?\n[\s\S]*?\r?\n## Status \/ Related bugs/,
      `## Expected result\n\n${result}\n\n## Status / Related bugs`,
    );
    fs.writeFileSync(tcPath, markdown, "utf8");
  }
  fs.writeFileSync(dataPath, `${JSON.stringify(rows, null, 2)}\n`, "utf8");
}

const contract = `<!-- EXECUTION-CONTRACT:START -->
## Hợp đồng thực thi và các giả định đã chốt

Các bảng review ban đầu phản ánh khoảng trống của specification. Để mọi test case có thể cho kết quả Pass/Fail thay vì dừng ở quan sát, bộ test áp dụng các giả định dưới đây. Đây là **oracle kiểm thử**, không phải nội dung được cho là đã tồn tại trong specification; nếu product owner thay đổi contract thì phải cập nhật đồng thời test case, data và collection.

| Mã | Giả định thực thi bắt buộc |
| --- | --- |
| A-COMMON-01 | Success dùng JSON; validation trả 400; thiếu/không hợp lệ JWT trả 401; có JWT nhưng thiếu quyền trả 403; không tìm thấy resource trả 404; xung đột unique/usage trả 409; sai Content-Type trả 415. |
| A-COMMON-02 | Error body chỉ gồm \`error\` là chuỗi không rỗng; không response nào được chứa password, token, secret, SQL detail hoặc stack trace. |
| A-COMMON-03 | Mỗi iteration chạy trên fixture độc lập: reset seed, snapshot trước request, kiểm tra hậu điều kiện và teardown. Kết quả state là một phần bắt buộc của Pass/Fail. |
| A-FR04 | Partial update được hỗ trợ. Nếu được gửi, name phải là chuỗi trim dài 1-255, shipping_address là chuỗi trim dài 1-500, phone khớp \`^0\\d{9,10}$\`. Chỉ ba field này được chấp nhận; field khác bị từ chối 400. Success trả 200 với body chính xác \`{message: string}\`. |
| A-FR09 | JWT là nguồn định danh; \`user_id\` trong body không quyết định ownership. Code phân biệt hoa thường, chỉ gồm \`A-Z0-9_-\`, dài 1-32. total_amount là số nguyên dương. Success trả 200 và chứa đúng \`discount_amount\`, \`final_amount\`; apply-coupon chỉ tính toán, không tăng usage. Limit usage trả 409. |
| A-FR17 | Tạo thành công trả 201 với đúng \`id\` và \`message\`. Chỉ sáu field đặc tả được nhận; kiểu dữ liệu nghiêm ngặt. code duy nhất, 1-32 ký tự \`A-Z0-9_-\`; type thuộc percent/fixed; discount là số dương, percent tối đa 100; min >= 0; ngày ISO hợp lệ; max_uses >= 1. Xóa là hard-delete trả 204 và cho phép tái sử dụng code. Coupon mới mặc định active. |
| A-SPECIAL | Race create phải cho đúng một 201 và một 409; time boundary dùng ba fixture hết hạn ngày mai/hôm nay/hôm qua; retry gửi lại cùng PUT và phải giữ một user duy nhất với state cuối đúng. |

Sau khi áp dụng hợp đồng này, toàn bộ 145 case có exact status, response schema và state oracle để thực thi. Việc bổ sung oracle chỉ làm cho bộ test có thể kết luận Pass/Fail; **không thay đổi nhãn review gốc của AI**. Nhãn INCOMPLETE vẫn phản ánh phần thiếu trong specification tại thời điểm AI sinh test case.

### Mức độ sẵn sàng thực thi

| Suite | Tổng case | Case tuần tự | Case follow-up/sequence | Cơ chế đánh giá |
| --- | ---: | ---: | ---: | --- |
| FR04 | 51 | 48 | 3 | Reset và snapshot user; PUT động; GET hậu điều kiện; kiểm tra immutable field, user khác và dữ liệu nhạy cảm. |
| FR09 | 46 | 44 | 2 | Reset coupon/usage; áp dụng coupon; đối chiếu công thức tiền, bất biến usage và race/time boundary. |
| FR17 | 48 | 42 | 6 | Reset coupon; create/list/apply/delete/recreate; kiểm tra unique, atomicity, quyền admin và vòng đời coupon. |

Runner tạo báo cáo HTML, Newman JSON và file kết quả rút gọn theo từng test_id. Ở chế độ full, kết quả được ghi tự động vào ba file test run; mỗi dòng nhận Pass hoặc Fail cùng assertion thất bại, không có trạng thái trung gian “quan sát”. Smoke và special verification chỉ kiểm tra hạ tầng, không sửa bảng kết quả chính thức.
<!-- EXECUTION-CONTRACT:END -->`;

let review = fs.readFileSync(reviewPath, "utf8");
review = review.replace(
  /<!-- EXECUTION-CONTRACT:START -->[\s\S]*?<!-- EXECUTION-CONTRACT:END -->/,
  () => contract,
);
if (!review.includes("<!-- EXECUTION-CONTRACT:START -->")) {
  review = review.replace(/\r?\n---\r?\n/, () => `\n\n${contract}\n\n---\n`);
}
// Keep the original AI review labels and notes. Execution oracle updates belong
// to test-case/data artifacts and must not rewrite the review classification.
fs.writeFileSync(reviewPath, review, "utf8");

console.log("Finalized exact execution oracles for all 145 API test cases.");

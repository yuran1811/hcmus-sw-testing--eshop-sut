const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const suites = [
  {
    folder: 'FR04_PUT_api_users_me',
    title: 'FR04 — PUT /api/users/me',
    requirement: 'FR-04 — Quản lý hồ sơ cá nhân',
    spec: 'Mục 2.2 trong `api_specification.md`',
    resultFile: 'FR04_PUT_api_users_me_2026-08-22T16-07-51-183Z_results.json',
    reportStem: 'FR04_PUT_api_users_me_2026-08-22T16-07-51-183Z',
    total: 51,
    pass: 0,
    fail: 51,
  },
  {
    folder: 'FR09_POST_api_apply_coupon',
    title: 'FR09 — POST /api/apply-coupon',
    requirement: 'FR-09 — Mã giảm giá',
    spec: 'Mục 5.1 trong `api_specification.md`',
    resultFile: 'FR09_POST_api_apply_coupon_2026-08-22T16-08-24-818Z_results.json',
    reportStem: 'FR09_POST_api_apply_coupon_2026-08-22T16-08-24-818Z',
    total: 46,
    pass: 20,
    fail: 26,
  },
  {
    folder: 'FR17_POST_api_admin_coupons',
    title: 'FR17 — POST /api/admin/coupons',
    requirement: 'FR-17 — Quản lý mã giảm giá',
    spec: 'Mục 6.4 trong `api_specification.md`',
    resultFile: 'FR17_POST_api_admin_coupons_2026-08-22T16-08-46-471Z_results.json',
    reportStem: 'FR17_POST_api_admin_coupons_2026-08-22T16-08-46-471Z',
    total: 48,
    pass: 2,
    fail: 46,
  },
];

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function relatedBugs(id, failures) {
  const joined = failures.join(' ');
  const bugs = [];
  if (id.startsWith('FR04-')) {
    if (/sensitive field/.test(joined)) bugs.push('BUG-USRME-001');
    if (['FR04-USRME-SEC-003', 'FR04-USRME-SC-005'].includes(id)) bugs.push('BUG-USRME-002');
    if (/status is exactly 400|rejected update is atomic/.test(joined) &&
        !['FR04-USRME-DP-022', 'FR04-USRME-SEC-003', 'FR04-USRME-SC-005'].includes(id)) bugs.push('BUG-USRME-003');
    if (id === 'FR04-USRME-DP-022') bugs.push('BUG-USRME-004');
    if (id === 'FR04-USRME-DP-007') bugs.push('BUG-USRME-005');
  }
  if (id.startsWith('FR09-')) {
    if (/status is exactly 401/.test(joined)) bugs.push('BUG-APPLYCOUPON-001');
    const thresholdCases = ['FR09-APPLY-DP-002', 'FR09-APPLY-DP-003', 'FR09-APPLY-DP-004', 'FR09-APPLY-SC-002'];
    if (/discount formula|discount_amount is finite|final amount formula/.test(joined) && !thresholdCases.includes(id)) bugs.push('BUG-APPLYCOUPON-002');
    if (['FR09-APPLY-DP-015', 'FR09-APPLY-DP-017'].includes(id)) bugs.push('BUG-APPLYCOUPON-003');
    if (['FR09-APPLY-ST-002', 'FR09-APPLY-ST-004'].includes(id)) bugs.push('BUG-APPLYCOUPON-004');
    if (thresholdCases.includes(id)) bugs.push('BUG-APPLYCOUPON-005');
  }
  if (id.startsWith('FR17-')) {
    if (['FR17-ADMINCOUP-SEC-002', 'FR17-ADMINCOUP-SEC-006', 'FR17-ADMINCOUP-SC-003'].includes(id)) bugs.push('BUG-ADMINCOUPON-001');
    if (/status is exactly 400|rejected request creates no additional coupon/.test(joined) &&
        !['FR17-ADMINCOUP-SEC-002', 'FR17-ADMINCOUP-SEC-006', 'FR17-ADMINCOUP-SC-003'].includes(id)) bugs.push('BUG-ADMINCOUPON-002');
    if (/status is exactly 201/.test(joined)) bugs.push('BUG-ADMINCOUPON-003');
    if (/status is exactly 409|SQLITE_CONSTRAINT/.test(joined)) bugs.push('BUG-ADMINCOUPON-004');
    if (/status is exactly 401/.test(joined)) bugs.push('BUG-ADMINCOUPON-005');
    if (/discount formula|discount_amount/.test(joined)) bugs.push('BUG-APPLYCOUPON-002');
  }
  return unique(bugs).join(', ') || '—';
}

function shortNote(id, result, failures) {
  if (result === 'Pass') return 'Đạt status, schema và hậu trạng thái mong đợi.';
  const joined = failures.join(' ');
  const notes = [];
  if (['FR09-APPLY-DP-002', 'FR09-APPLY-DP-003', 'FR09-APPLY-DP-004', 'FR09-APPLY-SC-002'].includes(id)) {
    notes.push('Từ chối tổng tiền đúng bằng ngưỡng tối thiểu');
  }
  if (['FR17-ADMINCOUP-SEC-002', 'FR17-ADMINCOUP-SEC-006', 'FR17-ADMINCOUP-SC-003'].includes(id)) {
    notes.push('User thường vẫn tạo được coupon admin');
  }
  if (/status is exactly 415|Content-Type is JSON|body is valid JSON/.test(joined)) notes.push('Content-Type sai gây 500/HTML thay vì lỗi JSON 415');
  if (/status is exactly 401/.test(joined)) notes.push('Token không hợp lệ trả sai status xác thực');
  if (/status is exactly 409/.test(joined)) notes.push('Xung đột trạng thái trả sai status');
  if (/status is exactly 201/.test(joined)) notes.push('Tạo thành công trả 200 thay vì 201');
  if (/status is exactly 400/.test(joined)) notes.push('API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ');
  if (/status is exactly 200/.test(joined) && /minimum|min_order|chưa đủ giá trị tối thiểu/.test(joined)) notes.push('Từ chối giá trị đúng tại biên tối thiểu');
  if (/discount formula|discount_amount is finite|final amount formula/.test(joined) &&
      !['FR09-APPLY-DP-002', 'FR09-APPLY-DP-003', 'FR09-APPLY-DP-004', 'FR09-APPLY-SC-002'].includes(id)) notes.push('Công thức discount/final amount sai');
  if (/SQLITE_CONSTRAINT|stack trace|exposes no secret/.test(joined) && !/sensitive field/.test(joined)) notes.push('Response lộ chi tiết nội bộ');
  if (/authenticated user/.test(joined)) notes.push('Role hoặc danh tính hậu kiểm bị thay đổi');
  if (/state matches oracle|State verification reports pass/.test(joined)) notes.push('Hậu trạng thái không đúng');
  if (/sensitive field/.test(joined)) notes.push('GET hậu kiểm lộ password');
  if (/error schema|success schema/.test(joined)) notes.push('Schema response không đúng');
  if (/Special sequence reports pass/.test(joined)) notes.push('Chuỗi state/concurrency không đạt oracle');
  return unique(notes).slice(0, 3).join('; ') + '.';
}

function escapeCell(text) {
  return String(text).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
}

for (const suite of suites) {
  const dataPath = path.join(root, suite.folder, `${suite.folder}_data_driven.json`);
  const resultsPath = path.join(root, 'reports', suite.resultFile);
  const outputPath = path.join(root, suite.folder, `${suite.folder}_test_run.md`);
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
  const titles = new Map(data.map((row) => [row.test_id, row.title]));
  if (results.length !== suite.total) throw new Error(`${suite.folder}: expected ${suite.total} results, got ${results.length}`);

  const rows = results.map((row) => {
    const bugs = relatedBugs(row.test_id, row.failures || []);
    const note = shortNote(row.test_id, row.result, row.failures || []);
    return `| ${row.test_id} | ${row.result} | ${escapeCell(bugs)} | ${escapeCell(titles.get(row.test_id) || '')} — ${escapeCell(note)} |`;
  });

  const fr04Explanation = suite.folder.startsWith('FR04')
    ? '\n> Cả 51 iteration được Newman đánh dấu Fail vì assertion dùng chung `GET profile exposes no sensitive field` thất bại: endpoint hậu kiểm luôn trả `password`. Một số luồng cập nhật chính vẫn đúng; cột Ghi chú nêu thêm lỗi nghiệp vụ nếu có.\n'
    : '';

  const content = `# Test run: ${suite.title}\n\n` +
    `- **Ngày chạy:** 2026-08-22\n` +
    `- **Requirement:** ${suite.requirement}\n` +
    `- **Đặc tả:** ${suite.spec}\n` +
    `- **Tester:** Mạch Quốc Tấn\n` +
    `- **Kết quả:** ${suite.pass} Pass, ${suite.fail} Fail / ${suite.total} test case\n` +
    `- **Môi trường:** Newman, Node.js 22.20.0, Windows, \`http://127.0.0.1:3100\`, \`X-Student-Id: 23127115\`\n` +
    fr04Explanation +
    `\n## Kết quả chi tiết\n\n` +
    `| Test Case ID | Result | Related Bug | Ghi chú |\n` +
    `| --- | --- | --- | --- |\n` + rows.join('\n') +
    `\n\n## Minh chứng\n\n` +
    `- [Newman HTML report](../reports/${suite.reportStem}.html)\n` +
    `- [Newman JSON report](../reports/${suite.reportStem}.json)\n` +
    `- [Kết quả rút gọn](../reports/${suite.reportStem}_results.json)\n` +
    `- Ảnh tổng hợp: [\`${suite.folder.slice(0, 4)}_newman_full_report.png\`](../images/${suite.folder.slice(0, 4)}_newman_full_report.png)\n\n` +
    `Assertion đầy đủ, request/response và snapshot hậu trạng thái được giữ trong report Newman; bảng trên chỉ trình bày nguyên nhân chính để tránh lặp thông tin.\n`;

  fs.writeFileSync(outputPath, content, 'utf8');
}

console.log('Rewrote 3 concise test-run files.');

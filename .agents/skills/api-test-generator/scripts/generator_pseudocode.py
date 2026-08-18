"""
AI-driven API Test Generator — PSEUDOCODE
Nộp kèm cho HW06 mục 7 (Agent Skill / Create level G9.5).

Đây là pseudocode mô tả THIẾT KẾ, không phải code chạy được.
Mục đích: thể hiện các quyết định thiết kế đằng sau skill `eshop-api-test-generator`.

Diagram tương ứng do sinh viên tự vẽ (xem assets/diagram-brief.md) — theo quy định
mục 11 của đề bài, diagram không được sinh bởi AI.
"""

# ---------------------------------------------------------------------------
# CẤU TRÚC DỮ LIỆU
# ---------------------------------------------------------------------------

Parameter   = (name, location, type, required, constraints, spec_ref)
Partition   = (param_name, class_label, sample_value, expected_status, kind)
                # kind ∈ {VALID, INVALID, BOUNDARY}
Transition  = (from_state, action, to_state_or_error, is_legal, spec_ref)
SecurityReq = (sec_id, description, technique_group)
TestCase    = (tc_id, category, priority, title, precondition, method, endpoint,
               headers, body, expected_status, expected_response, spec_ref,
               source, note)


# ---------------------------------------------------------------------------
# PIPELINE CHÍNH
# ---------------------------------------------------------------------------

def generate_test_suite(spec_text, endpoint_id, student_id):
    contract = parse_contract(spec_text, endpoint_id)      # Bước 1
    if contract.has_gaps():
        assumptions = ask_human(contract.gaps)             # không tự bịa field
        contract = contract.merge(assumptions)

    cases = []
    cases += gen_functional(contract)                      # happy path
    cases += gen_domain_partition(contract)                # Bước 2
    cases += gen_state_transition(contract)                # Bước 3
    cases += gen_security(contract)                        # Bước 4
    cases += gen_schema(contract)                          # Bước 5

    cases = deduplicate(cases)
    cases = assign_ids(cases, pool=contract.pool, feature=contract.feature)
    cases = inject_header(cases, "X-Student-Id", student_id)

    report = coverage_report(cases, contract)
    if report.total < 35:
        cases += expand_weakest_dimension(cases, contract, report)
        # mở rộng theo chiều coverage yếu nhất, KHÔNG nhân bản case

    emit_markdown(cases, report)
    emit_csv(cases)
    return cases, report


# ---------------------------------------------------------------------------
# BƯỚC 1 — PHÂN RÃ CONTRACT
# ---------------------------------------------------------------------------

def parse_contract(spec_text, endpoint_id):
    section   = locate_endpoint_section(spec_text, endpoint_id)
    params    = extract_params(section)          # body + query + path + header
    responses = extract_responses(section)       # status -> schema
    states    = extract_state_machine(spec_text, section.related_FR)
    sec_reqs  = extract_security_section(spec_text)   # SEC-01..SEC-07 nguyên văn
    roles     = extract_roles(spec_text)

    gaps = [p for p in params if p.constraints is EMPTY]
    return Contract(params, responses, states, sec_reqs, roles, gaps, section.FR)


# ---------------------------------------------------------------------------
# BƯỚC 2 — DOMAIN PARTITION
# ---------------------------------------------------------------------------

def gen_domain_partition(contract):
    out = []
    for p in contract.params:
        classes = partition_by_type(p)     # tra bảng theo p.type: string/number/
                                           # email/password/enum/id/date/array
        # bất biến thiết kế: mỗi tham số >= 1 VALID + 2 INVALID + 2 BOUNDARY
        assert count(classes, VALID) >= 1
        assert count(classes, INVALID) >= 2
        assert count(classes, BOUNDARY) >= 2

        for c in classes:
            # nguyên tắc one-at-a-time: chỉ 1 tham số lệch khỏi giá trị hợp lệ,
            # các tham số còn lại giữ giá trị baseline hợp lệ => khi fail biết
            # ngay nguyên nhân
            body = baseline_valid_body(contract)
            body[p.name] = c.sample_value
            out.append(TestCase(category="DP", body=body,
                                expected_status=c.expected_status,
                                spec_ref=p.spec_ref, source="AI", ...))
    return out


# ---------------------------------------------------------------------------
# BƯỚC 3 — STATE TRANSITION
# ---------------------------------------------------------------------------

def gen_state_transition(contract):
    if contract.states is EMPTY:
        return []                          # stateless: ghi lý do vào report

    out = []
    # phủ TOÀN BỘ tích Descartes states x actions, không chỉ đường hợp lệ
    for s in contract.states.all_states:
        for a in contract.states.all_actions:
            t = contract.states.lookup(s, a)
            if t.is_legal:
                out.append(make_case(s, a, expected=200, kind="legal"))
            elif t.is_undefined_in_spec:
                out.append(make_case(s, a, expected=UNKNOWN,
                                     note="spec chưa định nghĩa - cần xác minh"))
            else:
                out.append(make_case(s, a, expected=[400, 409], kind="illegal"))

    # các biến thể quanh state machine mà spec không mô tả trực tiếp
    out += repeat_action_case(contract)        # idempotency: gọi 2 lần
    out += skip_state_case(contract)           # nhảy cóc pending -> delivered
    out += concurrent_action_case(contract)    # 2 request đồng thời
    out += cross_actor_case(contract)          # user làm hành động của admin
    out += side_effect_case(contract)          # huỷ đơn -> hoàn kho/hoàn coupon
    return out


# ---------------------------------------------------------------------------
# BƯỚC 4 — SECURITY
# ---------------------------------------------------------------------------

def gen_security(contract):
    out = []
    for sec in contract.sec_reqs:              # duyệt theo spec, không theo trí nhớ
        group = classify(sec)                  # AUTHN | AUTHZ | IDOR | INJECTION
                                               # | MASS_ASSIGN | RATELIMIT | DISCLOSURE
        for payload in payload_bank[group]:
            if applicable(payload, contract):
                out.append(TestCase(category="SEC", spec_ref=sec.sec_id, ...))

    # bất biến: 401 và 403 luôn là 2 case tách rời
    assert exists(out, expected_status=401) and exists(out, expected_status=403)

    # bất biến: endpoint có tham số id => bắt buộc có case IDOR
    if contract.has_object_id_param():
        assert exists(out, group="IDOR")

    return out


# ---------------------------------------------------------------------------
# BƯỚC 5 — SCHEMA VALIDATION
# ---------------------------------------------------------------------------

def gen_schema(contract):
    out = []
    for status, schema in contract.responses:
        out.append(TestCase(
            category="SCH",
            title=f"Response {status} khớp schema đã khai báo",
            expected_response=[
                "Content-Type = application/json",
                f"body khớp JSON Schema của {status}",
                "không có field ngoài schema",
                "không lộ field nhạy cảm: password, passwordHash, salt, stackTrace",
            ], ...))
    return out


# ---------------------------------------------------------------------------
# KIỂM SOÁT CHẤT LƯỢNG
# ---------------------------------------------------------------------------

def deduplicate(cases):
    # trùng := cùng (endpoint, tham số bị tác động, lớp tương đương, status kỳ vọng)
    seen = {}
    for c in cases:
        key = (c.endpoint, c.mutated_param, c.equivalence_class, c.expected_status)
        if key not in seen:
            seen[key] = c
    return values(seen)


def coverage_report(cases, contract):
    return {
        "by_category":   count_by(cases, "category"),
        "param_matrix":  matrix(contract.params, [VALID, INVALID, BOUNDARY]),
        "state_matrix":  filled_cells / total_cells,
        "sec_matrix":    {sec.sec_id: cases_referencing(sec) for sec in contract.sec_reqs},
        "response_codes": covered_codes / declared_codes,
        "total":         len(cases),
    }


# ---------------------------------------------------------------------------
# ĐIỂM BÀN GIAO SANG SKILL KHÁC
# ---------------------------------------------------------------------------
# generate_test_suite  -> testcases/TC_<API>.csv
#   -> api-testcase-auditor    : điền AuditLabel, AuditReason, thêm case HUMAN
#   -> postman-newman-builder  : dựng collection + chạy Newman
#   -> api-cicd-reporter       : đưa collection vào GitHub Actions

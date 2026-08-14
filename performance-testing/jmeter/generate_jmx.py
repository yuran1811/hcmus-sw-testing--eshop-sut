#!/usr/bin/env python3
"""
Sinh 3 file JMeter test plan (Load/Stress/Spike) cho workflow "Khach moi - mua roi doi y"
(POST /api/login -> GET /api/categories -> GET /api/products/:id -> POST /api/cart
 -> POST /api/checkout -> PUT /api/orders/:id/cancel).

Chay lai duoc: `python3 generate_jmx.py` de tai sinh 3 file .jmx tu dinh nghia trong chinh script nay.
Giu file nay lai trong repo de lam bang chung minh bach ve cach test plan duoc sinh ra (khong sinh XML tay,
tranh loi nesting hashTree) va de tai su dung cho cac endpoint khac trong tuong lai.
"""
import xml.sax.saxutils as sx

STUDENT_ID = "23127211"
DATE = "20260814"

def esc(s):
    return sx.escape(str(s), {'"': "&quot;"})

def el(tag, attrs, props="", children=None):
    """Mot phan tu JMeter luon di kem 1 <hashTree> em (chua cac phan tu con)."""
    children = children or []
    attr_str = "".join(f' {k}="{esc(v)}"' for k, v in attrs.items())
    child_xml = "".join(children)
    return f'<{tag}{attr_str}>{props}</{tag}><hashTree>{child_xml}</hashTree>'

def sp(name, value):
    return f'<stringProp name="{esc(name)}">{esc(value)}</stringProp>'

def bp(name, value):
    v = "true" if value else "false"
    return f'<boolProp name="{esc(name)}">{v}</boolProp>'

def ip(name, value):
    return f'<intProp name="{esc(name)}">{esc(value)}</intProp>'

def long_p(name, value):
    return f'<longProp name="{esc(name)}">{esc(value)}</longProp>'

# ---------------------------------------------------------------------------
# Config elements
# ---------------------------------------------------------------------------

def test_plan(name, children):
    props = (
        sp("TestPlan.comments", "AI-assisted generated, human-reviewed - xem performance-testing/23127211_Review_Notes.md")
        + bp("TestPlan.functional_mode", False)
        + bp("TestPlan.tearDown_on_shutdown", True)
        + bp("TestPlan.serialize_threadgroups", False)
        + '<elementProp name="TestPlan.user_defined_variables" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">'
        + '<collectionProp name="Arguments.arguments">'
        + arg_elem("BASE_URL", "localhost")
        + arg_elem("PORT", "3000")
        + "</collectionProp></elementProp>"
        + sp("TestPlan.user_define_classpath", "")
    )
    return el("TestPlan", {
        "guiclass": "TestPlanGui", "testclass": "TestPlan",
        "testname": name, "enabled": "true",
    }, props, children)

def arg_elem(name, value):
    return (f'<elementProp name="{esc(name)}" elementType="Argument">'
            + sp("Argument.name", name) + sp("Argument.value", value)
            + sp("Argument.metadata", "=") + "</elementProp>")

def http_header_manager(name, headers):
    rows = "".join(
        '<elementProp name="" elementType="Header">'
        + sp("Header.name", k) + sp("Header.value", v) + "</elementProp>"
        for k, v in headers
    )
    props = f'<collectionProp name="HeaderManager.headers">{rows}</collectionProp>'
    return el("HeaderManager", {
        "guiclass": "HeaderPanel", "testclass": "HeaderManager",
        "testname": name, "enabled": "true",
    }, props)

def csv_data_set(name, filename, variable_names):
    props = (
        sp("filename", filename) + sp("fileEncoding", "UTF-8")
        + sp("variableNames", variable_names) + sp("delimiter", ",")
        + bp("quotedData", False) + bp("recycle", True)
        + bp("stopThread", False) + sp("shareMode", "shareMode.all")
        + bp("ignoreFirstLine", True)
    )
    return el("CSVDataSet", {
        "guiclass": "TestBeanGUI", "testclass": "CSVDataSet",
        "testname": name, "enabled": "true",
    }, props)

def uniform_random_timer(name, constant_delay, random_max):
    props = (
        sp("ConstantTimer.delay", constant_delay)
        + sp("RandomTimer.range", random_max)
    )
    return el("UniformRandomTimer", {
        "guiclass": "UniformRandomTimerGui", "testclass": "UniformRandomTimer",
        "testname": name, "enabled": "true",
    }, props)

def transaction_controller(name, children):
    props = bp("TransactionController.includeTimers", False) + bp("TransactionController.parent", False)
    return el("TransactionController", {
        "guiclass": "TransactionControllerGui", "testclass": "TransactionController",
        "testname": name, "enabled": "true",
    }, props, children)

def http_sampler(name, method, path, body_json=None):
    args = ""
    post_body = ""
    if body_json is not None:
        args = (
            '<elementProp name="HTTPsampler.Arguments" elementType="Arguments">'
            + '<collectionProp name="Arguments.arguments">'
            + '<elementProp name="" elementType="HTTPArgument">'
            + bp("HTTPArgument.always_encode", False)
            + sp("Argument.value", body_json)
            + sp("Argument.metadata", "=")
            + "</elementProp></collectionProp></elementProp>"
        )
        post_body = bp("HTTPSampler.postBodyRaw", True)
    props = (
        args
        + sp("HTTPSampler.domain", "${BASE_URL}")
        + sp("HTTPSampler.port", "${PORT}")
        + sp("HTTPSampler.protocol", "http")
        + sp("HTTPSampler.contentEncoding", "UTF-8")
        + sp("HTTPSampler.path", path)
        + sp("HTTPSampler.method", method)
        + bp("HTTPSampler.follow_redirects", True)
        + bp("HTTPSampler.auto_redirects", False)
        + bp("HTTPSampler.use_keepalive", True)
        + bp("HTTPSampler.DO_MULTIPART_POST", False)
        + post_body
        + sp("HTTPSampler.connect_timeout", "5000")
        + sp("HTTPSampler.response_timeout", "10000")
    )
    return props

def http_sampler_elem(name, method, path, body_json=None, children=None):
    return el("HTTPSamplerProxy", {
        "guiclass": "HttpTestSampleGui", "testclass": "HTTPSamplerProxy",
        "testname": name, "enabled": "true",
    }, http_sampler(name, method, path, body_json), children or [])

def response_assertion(name, test_field, patterns, test_type=8):
    # test_type 8 = Equals, 2 = Contains, 16 = Matches (see JMeter Assertion.test_type bitmask)
    pats = "".join(f'<stringProp name="{i}">{esc(p)}</stringProp>' for i, p in enumerate(patterns))
    props = (
        '<collectionProp name="Asserion.test_strings">' + pats + "</collectionProp>"
        + sp("Assertion.custom_message", "")
        + sp("Assertion.test_field", test_field)
        + ip("Assertion.test_type", test_type)
        + bp("Assertion.assume_success", False)
    )
    return el("ResponseAssertion", {
        "guiclass": "AssertionGui", "testclass": "ResponseAssertion",
        "testname": name, "enabled": "true",
    }, props)

def json_extractor(name, ref_name, json_path, default_value="NOT_FOUND"):
    props = (
        sp("JSONPostProcessor.referenceNames", ref_name)
        + sp("JSONPostProcessor.jsonPathExprs", json_path)
        + sp("JSONPostProcessor.match_numbers", "0")
        + sp("JSONPostProcessor.defaultValues", default_value)
    )
    return el("JSONPostProcessor", {
        "guiclass": "JSONPostProcessorGui", "testclass": "JSONPostProcessor",
        "testname": name, "enabled": "true",
    }, props)

def json_assertion(name, json_path, expect_null=False):
    props = (
        sp("JSON_PATH", json_path)
        + bp("JSONVALIDATION", False)
        + bp("EXPECT_NULL", expect_null)
        + bp("INVERT", False)
        + bp("ISREGEX", False)
    )
    return el("JSONPathAssertion", {
        "guiclass": "JSONPathAssertionGui", "testclass": "JSONPathAssertion",
        "testname": name, "enabled": "true",
    }, props)

def thread_group(name, num_threads, ramp_up, duration, startup_delay=0, on_sample_error="continue", children=None):
    props = (
        sp("ThreadGroup.on_sample_error", on_sample_error)
        + '<elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController" testname="Loop Controller" enabled="true">'
        + bp("LoopController.continue_forever", True)
        + ip("LoopController.loops", -1)
        + "</elementProp>"
        + ip("ThreadGroup.num_threads", num_threads)
        + ip("ThreadGroup.ramp_time", ramp_up)
        + long_p("ThreadGroup.start_time", "0")
        + long_p("ThreadGroup.end_time", "0")
        + bp("ThreadGroup.scheduler", True)
        + sp("ThreadGroup.duration", duration)
        + sp("ThreadGroup.delay", startup_delay)
    )
    return el("ThreadGroup", {
        "guiclass": "ThreadGroupGui", "testclass": "ThreadGroup",
        "testname": name, "enabled": "true",
    }, props, children or [])

def result_collector(name, gui_class, test_class, filename=""):
    props = (
        bp("ResultCollector.error_logging", False)
        + '<objProp><name>saveConfig</name><value class="SampleSaveConfiguration">'
        + "<time>true</time><latency>true</latency><timestamp>true</timestamp>"
        + "<success>true</success><label>true</label><code>true</code><message>true</message>"
        + "<threadName>true</threadName><dataType>true</dataType><encoding>false</encoding>"
        + "<assertions>true</assertions><subresults>true</subresults><responseData>false</responseData>"
        + "<samplerData>false</samplerData><xml>false</xml><fieldNames>true</fieldNames>"
        + "<responseHeaders>false</responseHeaders><requestHeaders>false</requestHeaders>"
        + "<responseDataOnError>true</responseDataOnError><saveAssertionResultsFailureMessage>true</saveAssertionResultsFailureMessage>"
        + "<connectTime>true</connectTime><assertionsResultsToSave>0</assertionsResultsToSave>"
        + "<bytes>true</bytes><sentBytes>true</sentBytes><url>true</url><threadCounts>true</threadCounts>"
        + "</value></objProp>"
        + sp("filename", filename)
    )
    return el("ResultCollector", {
        "guiclass": gui_class, "testclass": test_class,
        "testname": name, "enabled": "true",
    }, props)

# ---------------------------------------------------------------------------
# Canonical 6-step workflow (dung chung cho ca 3 kich ban, chi khac think-time)
# ---------------------------------------------------------------------------

def build_workflow(think_times):
    """think_times: dict step -> (constant_ms, random_ms). 0/0 cho Spike."""

    def timer(step):
        c, r = think_times[step]
        return uniform_random_timer(f"Think time - {step}", c, r)

    step1_login = transaction_controller("01 - Login [auth-heavy]", [
        http_sampler_elem(
            "POST /api/login", "POST", "/api/login",
            body_json='{"email":"${email}","password":"${password}"}',
            children=[
                json_extractor("Extract JWT token", "jwt_token", "$.token"),
                response_assertion("Assert login 200", "Assertion.response_code", ["200"], test_type=8),
                json_assertion("Assert token khong rong", "$.token"),
                response_assertion(
                    "Assert khong bi khoa tai khoan (phan biet 401 sai mk vs 403 bi khoa)",
                    "Assertion.response_code", ["403"], test_type=8 | 4,  # EQUALS(8) + NOT(4)
                ),
            ],
        ),
    ])

    step2_categories = transaction_controller("02 - Xem danh muc [read-heavy]", [
        timer("categories"),
        http_sampler_elem(
            "GET /api/categories", "GET", "/api/categories",
            children=[
                response_assertion("Assert categories 200", "Assertion.response_code", ["200"], test_type=8),
            ],
        ),
    ])

    step3_detail = transaction_controller("03 - Xem chi tiet san pham [read-heavy]", [
        timer("product_detail"),
        http_sampler_elem(
            "GET /api/products/${product_id}", "GET", "/api/products/${product_id}",
            children=[
                response_assertion("Assert product detail 200", "Assertion.response_code", ["200"], test_type=8),
                json_assertion("Assert san pham ton tai (co field id)", "$.id"),
            ],
        ),
    ])

    step4_cart = transaction_controller("04 - Them vao gio [transactional]", [
        timer("cart"),
        http_sampler_elem(
            "POST /api/cart", "POST", "/api/cart",
            body_json='{"productId":${product_id},"quantity":1}',
            children=[
                response_assertion("Assert add to cart 200", "Assertion.response_code", ["200"], test_type=8),
            ],
        ),
    ])

    step5_checkout = transaction_controller("05 - Thanh toan [transactional]", [
        timer("checkout"),
        http_sampler_elem(
            "POST /api/checkout", "POST", "/api/checkout",
            body_json='{"total_amount":${price},"shipping_address":"${shipping_address}"}',
            children=[
                json_extractor("Extract orderId (dong, dung cho buoc Cancel)", "order_id", "$.orderId"),
                response_assertion("Assert checkout 200", "Assertion.response_code", ["200"], test_type=8),
                json_assertion("Assert orderId ton tai", "$.orderId"),
            ],
        ),
    ])

    step6_cancel = transaction_controller("06 - Doi y, huy don [transactional]", [
        timer("cancel"),
        http_sampler_elem(
            "PUT /api/orders/${order_id}/cancel", "PUT", "/api/orders/${order_id}/cancel",
            body_json='{}',
            children=[
                response_assertion("Assert cancel 200", "Assertion.response_code", ["200"], test_type=8),
            ],
        ),
    ])

    return [step1_login, step2_categories, step3_detail, step4_cart, step5_checkout, step6_cancel]

def auth_header_manager():
    # Content-Type ap dung cho toan bo request; Authorization chi co gia tri SAU khi Login
    # chay xong (JMeter thay bien ${jwt_token} tai thoi diem gui request, dung thu tu scope).
    return http_header_manager("Headers (Content-Type + Authorization sau Login)", [
        ("Content-Type", "application/json"),
        ("Authorization", "Bearer ${jwt_token}"),
    ])

def content_type_only_header_manager():
    return http_header_manager("Content-Type (truoc Login)", [
        ("Content-Type", "application/json"),
    ])

def data_configs():
    return [
        csv_data_set("CSV - users", "data/users.csv", "email,password"),
        csv_data_set("CSV - products", "data/products.csv", "product_id,keyword,price"),
        csv_data_set("CSV - checkout", "data/checkout.csv", "shipping_address,phone"),
    ]

# ---------------------------------------------------------------------------
# Lap rap 1 Thread Group hoan chinh (bao gom scope header dung thu tu)
# ---------------------------------------------------------------------------

def build_thread_group_body(think_times):
    steps = build_workflow(think_times)
    login_tc = steps[0]
    rest_tc = steps[1:]
    children = data_configs() + [
        content_type_only_header_manager(),
        login_tc,
        auth_header_manager(),
    ] + rest_tc
    return children

THINK_TIMES_NORMAL = {
    "categories": (1000, 1000),      # 1-2s
    "product_detail": (1000, 2000),  # 1-3s
    "cart": (2000, 3000),            # 2-5s
    "checkout": (1000, 1000),        # 1-2s
    "cancel": (2000, 2000),          # 2-4s
}
THINK_TIMES_ZERO = {k: (0, 0) for k in THINK_TIMES_NORMAL}

# ---------------------------------------------------------------------------
# 3 Test plan
# ---------------------------------------------------------------------------

def build_load():
    tg = thread_group(
        "Load - 50 VU baseline", num_threads=50, ramp_up=60, duration=300,
        children=build_thread_group_body(THINK_TIMES_NORMAL) + [
            result_collector("Summary Report", "SummaryReport", "ResultCollector",
                              filename=""),
        ],
    )
    tp = test_plan(f"{STUDENT_ID}_Load_{DATE}", [tg])
    return wrap(tp)

def build_stress():
    # Stress bac thang: 4 Thread Group xep chong bang Scheduler (startup delay cong don),
    # moi group giu nguyen tren cho toi khi test ket thuc de tao hieu ung tich luy tai
    # (xem giai trinh trong performance-testing/23127211_Workload_Model.md muc 2.3).
    stages = [
        ("Stress - Bac 1 (+50 VU, 0->50)",  50,  60, "0",   660),
        ("Stress - Bac 2 (+50 VU, 50->100)", 50, 60, "180", 480),
        ("Stress - Bac 3 (+100 VU, 100->200)", 100, 60, "360", 300),
        ("Stress - Bac 4 (+200 VU, 200->400)", 200, 60, "540", 120),
    ]
    groups = []
    for i, (name, threads, ramp, delay, dur) in enumerate(stages):
        listener = []
        if i == 0:
            # Aggregate Report gan vao Thread Group dau tien, thu thap chung ca 4 bac
            # (JMeter Listener duoi Thread Group nao cung ghi vao chung 1 file -l khi chay CLI).
            listener = [result_collector("Aggregate Report", "StatVisualizer", "ResultCollector",
                                          filename="")]
        tg = thread_group(
            name, num_threads=threads, ramp_up=ramp, duration=dur, startup_delay=delay,
            children=build_thread_group_body(THINK_TIMES_NORMAL) + listener,
        )
        groups.append(tg)
    tp = test_plan(f"{STUDENT_ID}_Stress_{DATE}", groups)
    return wrap(tp)

def build_spike():
    # 2 Thread Group: baseline 50 VU (ramp 30s, giu suot 120s) + burst +450 VU
    # (delay 30s, ramp 1s gan nhu tuc thi, giu 60s) -> tong dat dinh 500 VU tu t=31s den t=90s,
    # sau do burst ket thuc, chi con baseline chay tiep den t=120s mo phong ramp-down.
    base = thread_group(
        "Spike - Baseline 50 VU", num_threads=50, ramp_up=30, duration=120, startup_delay=0,
        children=build_thread_group_body(THINK_TIMES_ZERO) + [
            result_collector("View Results Tree", "ViewResultsFullVisualizer", "ResultCollector",
                              filename=""),
        ],
    )
    burst = thread_group(
        "Spike - Burst +450 VU (dinh 500 VU)", num_threads=450, ramp_up=1, duration=60, startup_delay=30,
        children=build_thread_group_body(THINK_TIMES_ZERO),
    )
    tp = test_plan(f"{STUDENT_ID}_Spike_{DATE}", [base, burst])
    return wrap(tp)

def wrap(test_plan_xml):
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.6.3">\n'
        '<hashTree>\n' + test_plan_xml + '\n</hashTree>\n'
        '</jmeterTestPlan>\n'
    )

if __name__ == "__main__":
    import os
    outdir = os.path.dirname(os.path.abspath(__file__))
    files = {
        f"{STUDENT_ID}_Load_{DATE}.jmx": build_load(),
        f"{STUDENT_ID}_Stress_{DATE}.jmx": build_stress(),
        f"{STUDENT_ID}_Spike_{DATE}.jmx": build_spike(),
    }
    for fname, content in files.items():
        path = os.path.join(outdir, fname)
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Wrote {path} ({len(content)} bytes)")

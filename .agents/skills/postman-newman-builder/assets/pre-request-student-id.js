/**
 * Pre-request script — đặt ở CẤP COLLECTION (tab Scripts > Pre-request)
 * Mục đích: gắn header X-Student-Id cho MỌI request theo yêu cầu mục 11 của đề bài,
 * và ghi log ra Console để chụp màn hình làm bằng chứng cho TA.
 *
 * Đặt ở cấp collection thay vì từng request để không bỏ sót request nào.
 */

// ---- 1. Lấy student ID -----------------------------------------------------
// Ưu tiên environment (để CI override được), fallback về collection variable.
const studentId =
    pm.environment.get("studentId") ||
    pm.collectionVariables.get("studentId");

if (!studentId) {
    // Dừng sớm còn hơn chạy cả suite rồi phát hiện thiếu header khi nộp bài.
    throw new Error(
        "Thiếu biến 'studentId'. Đặt trong Environment (local/ci) trước khi chạy collection."
    );
}

// ---- 2. Gắn header ---------------------------------------------------------
// upsert: xoá header cũ nếu có rồi thêm lại, tránh nhân đôi khi chạy nhiều iteration.
pm.request.headers.upsert({ key: "X-Student-Id", value: studentId });

// ---- 3. Log làm bằng chứng -------------------------------------------------
// Dòng log này chính là thứ cần chụp màn hình (Postman Console / Newman --verbose).
console.log(
    `[X-Student-Id] ${studentId} | ${pm.request.method} ${pm.request.url.toString()} | request="${pm.info.requestName}"`
);

// ---- 4. Header dùng chung --------------------------------------------------
// Chỉ set Content-Type khi request thực sự có body, tránh gửi Content-Type cho GET.
const hasBody = pm.request.body && pm.request.body.mode && pm.request.body.mode !== "none";
if (hasBody && !pm.request.headers.has("Content-Type")) {
    pm.request.headers.upsert({ key: "Content-Type", value: "application/json" });
}

// ---- 5. Đánh dấu thời điểm chạy -------------------------------------------
// Dùng cho case kiểm tra response time và cho case coupon/token hết hạn theo mốc thời gian.
pm.collectionVariables.set("runStartedAt", new Date().toISOString());

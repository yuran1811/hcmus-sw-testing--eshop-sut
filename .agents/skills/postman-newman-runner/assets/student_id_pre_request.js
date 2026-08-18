// Collection-level Pre-request Script
// Paste into: Collection (right-click) > Edit > "Pre-request Script" tab
// Applies to EVERY request in the collection.

const studentId = pm.environment.get("studentId");

if (!studentId) {
    console.error("[X-Student-Id] Environment variable 'studentId' is NOT set — check the active Environment.");
} else {
    pm.request.headers.upsert({
        key: "X-Student-Id",
        value: studentId
    });
    // Printed to the Postman Console as evidence for the required screenshot (section 11 - anti-cheat)
    console.log(`[X-Student-Id] Header set = ${studentId} | Request: ${pm.info.requestName} | URL: ${pm.request.url.toString()}`);
}

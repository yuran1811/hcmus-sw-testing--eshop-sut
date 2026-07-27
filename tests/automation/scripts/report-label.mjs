import fs from "node:fs";

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function ensureVisibleReportLabel(reportIndex, label) {
  if (!fs.existsSync(reportIndex)) return false;
  const source = fs.readFileSync(reportIndex, "utf8");
  if (source.includes(label)) return true;
  const rootMarker = "    <div id='root'></div>";
  if (!source.includes(rootMarker)) return false;
  const banner =
    `    <div id="student-run-label" role="note" ` +
    `style="position:fixed;top:8px;right:16px;z-index:2147483647;` +
    `padding:6px 10px;border:1px solid #0969da;border-radius:6px;` +
    `background:#ffffff;color:#24292f;font:600 13px system-ui,sans-serif">` +
    `${escapeHtml(label)}</div>\n`;
  fs.writeFileSync(reportIndex, source.replace(rootMarker, `${banner}${rootMarker}`));
  return fs.readFileSync(reportIndex, "utf8").includes(label);
}

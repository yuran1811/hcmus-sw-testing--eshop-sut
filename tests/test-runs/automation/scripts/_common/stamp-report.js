const fs = require('fs');
const path = require('path');

const featureName = process.argv[2] || 'EShop Automation';
const reportPath = path.resolve(process.cwd(), 'playwright-report', 'index.html');
const studentId = '23127115';
const studentName = 'Mach Quoc Tan';
const generatedAt = new Date().toISOString();

if (!fs.existsSync(reportPath)) {
  console.error(`Report not found: ${reportPath}`);
  process.exit(1);
}

let html = fs.readFileSync(reportPath, 'utf8');

const markerStart = '<!-- HW04_RUN_BY_BANNER_START -->';
const markerEnd = '<!-- HW04_RUN_BY_BANNER_END -->';
const banner = `${markerStart}
<style>
  #hw04-run-by-banner {
    position: sticky;
    top: 0;
    z-index: 2147483647;
    padding: 10px 16px;
    background: #0f172a;
    color: #ffffff;
    font: 600 14px/1.45 Arial, sans-serif;
    border-bottom: 3px solid #f59e0b;
    letter-spacing: 0.01em;
  }
  #hw04-run-by-banner code {
    color: #fde68a;
    font-weight: 700;
  }
</style>
<div id="hw04-run-by-banner">
  ${featureName} | Run by: <code>${studentId}</code> (${studentName}) | Generated at: <code>${generatedAt}</code>
</div>
${markerEnd}`;

const existingBanner = new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`);
if (existingBanner.test(html)) {
  html = html.replace(existingBanner, banner);
} else if (html.includes('<body>')) {
  html = html.replace('<body>', `<body>\n${banner}`);
} else {
  html = `${banner}\n${html}`;
}

if (!html.includes(`Run by: <code>${studentId}</code>`)) {
  console.error('Failed to stamp Run by banner.');
  process.exit(1);
}

fs.writeFileSync(reportPath, html, 'utf8');
console.log(`Stamped ${reportPath}`);

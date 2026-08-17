const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const studentId = '23127148';
const features = ['FR03', 'FR11', 'FR19'];
const browsers = ['chromium', 'firefox', 'webkit'];

console.log(`Starting Playwright test matrix for Student ID: ${studentId}\n`);

const results = [];
let overallFailed = false;

for (const feature of features) {
  for (const browser of browsers) {
    const reportDir = path.join(__dirname, '..', 'reports', 'html', feature, browser);
    
    // Ensure parent directories exist
    fs.mkdirSync(path.dirname(reportDir), { recursive: true });

    console.log(`\n--------------------------------------------------`);
    console.log(`Running: ${feature} on ${browser}`);
    console.log(`Report Dir: ${reportDir}`);
    console.log(`--------------------------------------------------`);

    const isoTimestamp = new Date().toISOString();
    // Set environment variables for playwright.config.ts
    const env = {
      ...process.env,
      TEST_FEATURE: feature,
      TEST_BROWSER: browser,
      REPORT_DIR: reportDir,
      PLAYWRIGHT_HTML_TITLE: `Run by: ${studentId} | ${feature} | ${browser} | ${isoTimestamp}`,
    };

    // Run playwright command for this specific cell
    const result = spawnSync('npx', ['playwright', 'test', `--project=${browser}`], {
      env,
      stdio: 'inherit',
      shell: true,
      cwd: path.join(__dirname, '..')
    });

    const status = result.status === 0 ? 'PASSED' : 'FAILED';
    if (result.status !== 0) {
      overallFailed = true;
    }

    results.push({
      feature,
      browser,
      status,
      reportPath: path.relative(path.join(__dirname, '..'), reportDir)
    });
  }
}

console.log('\n==================================================');
console.log('TEST MATRIX SUMMARY');
console.log('==================================================');
console.table(results);
console.log('==================================================');

if (overallFailed) {
  console.error('\nAt least one test cell failed.');
  process.exit(1);
} else {
  console.log('\nAll test cells passed successfully.');
  process.exit(0);
}

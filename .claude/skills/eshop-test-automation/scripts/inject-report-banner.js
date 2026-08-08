#!/usr/bin/env node
'use strict';

// Stamps a Playwright HTML report (index.html) with a visible
// "Run by: {studentId} | {ISO timestamp}" banner and matching <title>
// suffix, so the report satisfies the "Run by: {StudentID}" anti-cheat
// requirement. Safe to re-run (skips if already stamped).
//
// Usage: node inject-report-banner.js <reportDir> <studentId>

const fs = require('fs');
const path = require('path');

const [, , reportDir, studentId] = process.argv;

if (!reportDir || !studentId) {
  console.error('Usage: node inject-report-banner.js <reportDir> <studentId>');
  process.exit(1);
}

const indexPath = path.join(reportDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error(`Report not found: ${indexPath}`);
  console.error('Run the Playwright suite with the HTML reporter first.');
  process.exit(1);
}

const bannerId = 'hw-run-by-banner';
let html = fs.readFileSync(indexPath, 'utf8');

if (html.includes(bannerId)) {
  console.log(`Already stamped, skipping: ${indexPath}`);
  process.exit(0);
}

const timestamp = new Date().toISOString();
const banner =
  `<div id="${bannerId}" style="position:sticky;top:0;z-index:99999;` +
  `background:#111827;color:#f9fafb;padding:6px 14px;` +
  `font:13px/1.5 -apple-system,Menlo,monospace;">` +
  `Run by: ${studentId} | ${timestamp}</div>`;

if (!html.includes('<body>')) {
  console.error('Unexpected report format: no <body> tag found.');
  process.exit(1);
}

html = html.replace('<body>', `<body>${banner}`);
html = html.replace(
  /<title>(.*?)<\/title>/,
  `<title>$1 — Run by: ${studentId}</title>`
);

fs.writeFileSync(indexPath, html, 'utf8');
console.log(`Stamped ${indexPath}`);
console.log(`  Run by: ${studentId} | ${timestamp}`);

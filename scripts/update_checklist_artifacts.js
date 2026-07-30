const fs = require('fs');
const path = require('path');

const resultsPath = path.join(__dirname, 'gui_results.json');
const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

const mdPath = path.join(__dirname, '..', 'HW3', 'GUI-Testing', 'CHECKLIST.md');
const csvPath = path.join(__dirname, '..', 'HW3', 'GUI-Testing', 'CHECKLIST.csv');

// --- 1. UPDATE CHECKLIST.MD ---
let mdContent = fs.readFileSync(mdPath, 'utf8');
const mdLines = mdContent.split('\n');

const updatedMdLines = mdLines.map(line => {
  if (!line.startsWith('| GUI-')) return line;
  const parts = line.split('|').map(p => p.trim());

  // parts: ["", "Checklist ID", "Màn hình", "IA", "Phân loại", "Thành phần", "Mục kiểm tra", "Đặc tả / Nguồn", "Kết quả mong đợi", "Nguồn gốc", "Trạng thái", "Kết quả thực tế", "Ghi chú", "Bằng chứng", ""]
  const id = parts[1];
  const res = results[id];
  if (!res) return line;

  parts[10] = res.status;
  parts[11] = res.actual.replace(/\|/g, '\\|');
  parts[12] = res.note.replace(/\|/g, '\\|');
  parts[13] = res.evidence;

  return parts.join(' | ');
});

fs.writeFileSync(mdPath, updatedMdLines.join('\n'), 'utf8');
console.log('✅ Updated HW3/GUI-Testing/CHECKLIST.md');

// --- 2. UPDATE CHECKLIST.CSV WITH UTF-8 BOM ---
let csvRaw = fs.readFileSync(csvPath, 'utf8');
const hasBOM = csvRaw.startsWith('\uFEFF');
if (hasBOM) csvRaw = csvRaw.slice(1);

const csvLines = csvRaw.trim().split('\n');
const header = csvLines[0];

function parseCsvLine(line) {
  const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
  return matches.map(m => m.replace(/^"|"$/g, '').replace(/""/g, '"'));
}

function escapeCsvField(val) {
  if (!val) return '""';
  const escaped = val.replace(/"/g, '""');
  return `"${escaped}"`;
}

const updatedCsvLines = [header];

for (let i = 1; i < csvLines.length; i++) {
  const line = csvLines[i].trim();
  if (!line) continue;
  
  // Parse CSV line
  const regex = /(?:^|,)(?:"([^"]*(?:""[^"]*)*)"|([^,]*))/g;
  const row = [];
  let match;
  while ((match = regex.exec(line)) !== null) {
    if (match.index === regex.lastIndex) regex.lastIndex++;
    row.push(match[1] !== undefined ? match[1].replace(/""/g, '"') : match[2]);
  }
  
  const id = row[0];
  const res = results[id];
  if (res) {
    row[9] = res.status;
    row[10] = res.actual;
    row[11] = res.note;
    row[12] = res.evidence;
  }

  updatedCsvLines.push(row.map(escapeCsvField).join(','));
}

const csvOutput = '\uFEFF' + updatedCsvLines.join('\n');
fs.writeFileSync(csvPath, csvOutput, 'utf8');
console.log('✅ Updated HW3/GUI-Testing/CHECKLIST.csv with UTF-8 BOM encoding');

#!/usr/bin/env node
'use strict';

// Appends one AI-interaction entry to an AI Audit Report markdown file,
// creating the file with the required header if it doesn't exist yet.
//
// Usage:
//   node append-ai-audit.js --file <path> --tool "<name>" \
//     --prompt "<prompt used>" --output "<summary of AI output>"

const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i];
    if (key.startsWith('--')) {
      args[key.slice(2)] = argv[i + 1];
      i++;
    }
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
const { file, tool, prompt, output } = args;

if (!file || !tool || !prompt || !output) {
  console.error(
    'Usage: node append-ai-audit.js --file <path> --tool "<name>" ' +
      '--prompt "<prompt>" --output "<summary of AI output>"'
  );
  process.exit(1);
}

const timestamp = new Date().toISOString();
const indent = (s) => s.replace(/\n/g, '\n> ');

const entry = `
### Session — ${timestamp}

**AI Tool:** ${tool}
**Date/Time:** ${timestamp}

**Prompt:**
> ${indent(prompt)}

**AI Output:**
${output}

---
`;

const header =
  '# AI Audit Report\n\n' +
  '## Declaration\n\n' +
  '"I use AI tools for the following tasks in this exercise."\n\n' +
  '---\n\n' +
  '## Interaction Log\n';

fs.mkdirSync(path.dirname(file), { recursive: true });
if (!fs.existsSync(file)) {
  fs.writeFileSync(file, header, 'utf8');
}
fs.appendFileSync(file, entry, 'utf8');

console.log(`Appended entry (${timestamp}) to ${file}`);

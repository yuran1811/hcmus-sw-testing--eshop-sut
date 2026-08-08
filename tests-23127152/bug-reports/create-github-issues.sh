#!/usr/bin/env bash
# Create GitHub Issues for HW03 Task 1 bugs (SV 23127152).
# Prerequisite: gh auth login  (token currently invalid in this environment)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
INDEX="tests-23127152/bug-reports/github-issues-index.json"
MAP="tests-23127152/bug-reports/github-issues-created.md"

if ! gh auth status >/dev/null 2>&1; then
  echo "ERROR: gh not authenticated. Run: gh auth login"
  exit 1
fi

echo "# GitHub Issues created — HW03 SV 23127152" > "$MAP"
echo "" >> "$MAP"
echo "| Bug ID | Issue URL |" >> "$MAP"
echo "|--------|-----------|" >> "$MAP"

python3 - <<'PY'
import json, subprocess, os
from pathlib import Path
index = json.loads(Path('tests-23127152/bug-reports/github-issues-index.json').read_text())
map_path = Path('tests-23127152/bug-reports/github-issues-created.md')
for item in index:
    title = item['title']
    if not title.startswith('[BUG]'):
        title = f"[BUG] {title}"
    body_file = item['body']
    labels = ','.join(item['labels'])
    cmd = [
        'gh', 'issue', 'create',
        '--title', title,
        '--body-file', body_file,
        '--label', 'bug',
    ]
    # labels may not all exist — try without extra labels if fail
    print('Creating', item['id'], '...')
    try:
        url = subprocess.check_output(cmd, text=True).strip()
    except subprocess.CalledProcessError:
        # retry without label
        url = subprocess.check_output([
            'gh', 'issue', 'create',
            '--title', title,
            '--body-file', body_file,
        ], text=True).strip()
    # attach screenshot as comment if present
    shot = item.get('screenshot')
    if shot and Path(shot).exists():
        subprocess.run([
            'gh', 'issue', 'comment', url,
            '--body', f'Evidence screenshot:\n\n![{item["id"]}]({Path(shot).as_posix()})'
        ], check=False)
        # Also try uploading via gh if supported — comment with path note
        subprocess.run([
            'gh', 'issue', 'comment', url,
            '--body', f'Local evidence file: `{shot}` (attach manually in GitHub UI if image not rendered).'
        ], check=False)
    with map_path.open('a') as f:
        f.write(f"| {item['id']} | {url} |\n")
    print('  →', url)
print('Done. Map:', map_path)
PY

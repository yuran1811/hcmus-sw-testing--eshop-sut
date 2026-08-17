import os
import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("================ METRICS EXTRACTION ================")

# 1. HW02 (Domain Testing)
hw02_path = 'HW2/main_report.md'
if os.path.exists(hw02_path):
    with open(hw02_path, 'r', encoding='utf-8', errors='ignore') as f:
        hw02_text = f.read()
    
    hw02_bugs = sorted(list(set(re.findall(r'BUG-[A-Z]+-\d+', hw02_text))))
    hw02_tcs = sorted(list(set(re.findall(r'TC-[A-Z-]+-\d+', hw02_text))))
    print(f"\n[HW02] Domain Testing:")
    print(f"  - Total Unique TCs: {len(hw02_tcs)}")
    print(f"  - Total Bugs: {len(hw02_bugs)} -> {hw02_bugs}")

# 2. HW03 (GUI Usability Testing)
hw3_path = 'HW3/Main_Report.md'
if os.path.exists(hw3_path):
    with open(hw3_path, 'r', encoding='utf-8', errors='ignore') as f:
        hw3_text = f.read()
    print(f"\n[HW03] GUI Usability Testing:")
    print(f"  - Report length: {len(hw3_text)} chars")

# 3. HW04 (Automation Testing)
hw4_path = 'HW4/automation_report.md'
if os.path.exists(hw4_path):
    with open(hw4_path, 'r', encoding='utf-8', errors='ignore') as f:
        hw4_text = f.read()
    print(f"\n[HW04] Automation Testing:")
    print(f"  - Report length: {len(hw4_text)} chars")

# 4. HW05 (Performance Testing)
hw5_stats = {
    'load': 'HW5/Task1/results/load/html-report/statistics.json',
    'stress': 'HW5/Task1/results/stress/html-report/statistics.json',
    'spike': 'HW5/Task1/results/spike/html-report/statistics.json',
    'endurance': 'HW5/Task1/results/endurance/html-report/statistics.json',
}
print("\n[HW05] Performance Testing Results:")
for test_type, path in hw5_stats.items():
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        total = data.get('Total', {})
        print(f"  {test_type.upper():10s}: Samples={total.get('sampleCount'):6d}, AvgRT={total.get('meanResTime', 0):8.1f}ms, Min={total.get('minResTime', 0):6.1f}ms, Max={total.get('maxResTime', 0):8.1f}ms, P90={total.get('pct1ResTime', 0):8.1f}ms, P95={total.get('pct2ResTime', 0):8.1f}ms, P99={total.get('pct3ResTime', 0):8.1f}ms, Throughput={total.get('throughput', 0):7.2f} req/s, ErrorRate={total.get('errorPct', 0):.2f}%")
    else:
        print(f"  {test_type.upper():10s}: File not found ({path})")

# 5. Extract all Bug counts and summaries from github_issues.json
with open('Test_Summary_Report/data/github_issues.json', 'r', encoding='utf-8') as f:
    issues = json.load(f)

print(f"\n[GITHUB ISSUES SUMMARY]")
user_issues = [i for i in issues if i.get('user', {}).get('login') == 'yuran1811' or '23127148' in str(i)]
print(f"Total Relevant Issues: {len(user_issues)}")

by_severity = {}
by_module = {}
by_hw = {'HW02 (Manual/Domain)': [], 'HW03 (GUI Usability)': [], 'HW04 (Automation)': [], 'HW05 (Performance)': [], 'Other': []}

for i in user_issues:
    labels = [l['name'].lower() for l in i.get('labels', [])]
    num = i['number']
    title = i['title']
    
    # Severity
    sev = 'Minor / Medium'
    if any('critical' in l or 'p0' in l for l in labels) or 'critical' in title.lower():
        sev = 'Critical (P0)'
    elif any('major' in l or 'p1' in l for l in labels) or 'major' in title.lower():
        sev = 'Major (P1)'
    elif any('minor' in l or 'p2' in l for l in labels) or 'minor' in title.lower():
        sev = 'Minor (P2)'
    elif any('trivial' in l or 'p3' in l for l in labels) or 'trivial' in title.lower():
        sev = 'Trivial (P3)'
    by_severity[sev] = by_severity.get(sev, 0) + 1
    
    # Homework attribution
    if num in [115, 116, 117, 118] or 'domain' in title.lower():
        by_hw['HW02 (Manual/Domain)'].append(i)
    elif 202 <= num <= 214 or 'hw03' in str(labels):
        by_hw['HW03 (GUI Usability)'].append(i)
    elif (237 <= num <= 257) or (265 <= num <= 281) or 'hw04' in str(labels) or 'automation' in title.lower():
        by_hw['HW04 (Automation)'].append(i)
    elif num == 288 or 'hw05' in str(labels) or 'spike' in title.lower() or 'performance' in str(labels):
        by_hw['HW05 (Performance)'].append(i)
    else:
        by_hw['Other'].append(i)

print("\n--- By Severity ---")
for k, v in sorted(by_severity.items()):
    print(f"  {k:20s}: {v}")

print("\n--- By Homework ---")
for k, v in by_hw.items():
    print(f"  {k:25s}: {len(v)} issues")

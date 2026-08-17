import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('Test_Summary_Report/data/github_issues.json', 'r', encoding='utf-8') as f:
    issues = json.load(f)

print(f"Total issues in repository: {len(issues)}")

user_issues = [i for i in issues if i.get('user', {}).get('login') == 'yuran1811' or '23127148' in str(i)]
print(f"Total issues by yuran1811/23127148: {len(user_issues)}")

# Let's inspect all issues by yuran1811
print("\n=== ALL ISSUES BY YURAN1811/23127148 ===")
for i in sorted(user_issues, key=lambda x: x['number']):
    labels = [l['name'] for l in i.get('labels', [])]
    print(f"#{i['number']:3d} | [{i['state']:6s}] | Labels: {', '.join(labels):40s} | {i['title']}")

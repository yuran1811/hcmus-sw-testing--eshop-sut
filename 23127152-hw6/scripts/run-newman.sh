#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HW06_DIR="$(dirname "$SCRIPT_DIR")"

cd "$HW06_DIR"

newman run postman/EShop-HW06.postman_collection.json \
  -e postman/EShop-HW06.postman_environment.json \
  -r cli,htmlextra \
  --reporter-htmlextra-export postman/reports/newman-report.html \
  --env-var "studentId=23127152"

echo "Report saved to postman/reports/newman-report.html"

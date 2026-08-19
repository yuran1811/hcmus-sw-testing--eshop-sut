#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HW06_DIR="$(dirname "$SCRIPT_DIR")"
cd "$HW06_DIR"

ENV_FILE="postman/EShop-HW06.postman_environment.json"
COL_FILE="postman/EShop-HW06.postman_collection.json"
STUDENT_ID="${STUDENT_ID:-23127152}"

mkdir -p postman/reports postman/screenshots

echo "== Full collection → newman-report.html =="
newman run "$COL_FILE" \
  -e "$ENV_FILE" \
  -r cli,htmlextra \
  --reporter-htmlextra-export postman/reports/newman-report.html \
  --env-var "studentId=${STUDENT_ID}" \
  | tee postman/screenshots/newman-full-cli.txt

echo "== Data-driven FR-05 search → newman-report-data-driven.html =="
newman run "$COL_FILE" \
  -e "$ENV_FILE" \
  --folder "Data-Driven — FR-05 Search" \
  -d postman/data/products-search-data.csv \
  -r cli,htmlextra \
  --reporter-htmlextra-export postman/reports/newman-report-data-driven.html \
  --env-var "studentId=${STUDENT_ID}" \
  | tee postman/screenshots/newman-data-driven-cli.txt

echo "Reports:"
echo "  postman/reports/newman-report.html"
echo "  postman/reports/newman-report-data-driven.html"

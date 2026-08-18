#!/usr/bin/env bash
# Run Newman with a collection + environment, exporting an HTML report (htmlextra) + CLI output.
#
# Usage:
#   bash run_newman.sh <collection.json> <environment.json> [data.csv] [output_name]
#
# Requires:
#   npm install -g newman newman-reporter-htmlextra

set -euo pipefail

COLLECTION="${1:?Missing path to collection.json}"
ENVIRONMENT="${2:?Missing path to environment.json}"
DATA_FILE="${3:-}"
OUT_NAME="${4:-newman_report_$(date +%Y%m%d_%H%M%S)}"

mkdir -p reports

CMD=(newman run "$COLLECTION" -e "$ENVIRONMENT" -r cli,htmlextra
     --reporter-htmlextra-export "reports/${OUT_NAME}.html")

if [[ -n "$DATA_FILE" ]]; then
    CMD+=(-d "$DATA_FILE")
fi

echo "Running: ${CMD[*]}"
"${CMD[@]}"

echo ""
echo "✅ HTML report: reports/${OUT_NAME}.html"
echo "Reminders:"
echo "  1. Screenshot the Postman Console (if run via the Postman UI) to prove the X-Student-Id header."
echo "  2. Update the Execution_Status column in the Excel test-case file based on this run."
echo "  3. If any test failed unexpectedly -> use the bug-report-writer skill."

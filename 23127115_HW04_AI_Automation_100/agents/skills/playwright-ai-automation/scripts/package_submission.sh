#!/usr/bin/env bash
# package_submission.sh
#
# Kiểm tra sự hiện diện của các file bắt buộc rồi đóng gói .zip đúng tên quy định:
#   <StudentID>_HW04_AI_Automation_<Grade>.zip
#
# Cách dùng (chạy trong thư mục chứa đầy đủ các file/thư mục cần nộp):
#   ./package_submission.sh <StudentID> <Grade(3 chữ số, 000-100)> [thư-mục-nguồn]
#
# Ví dụ:
#   ./package_submission.sh 25127001 090 ./submission

set -euo pipefail

STUDENT_ID="${1:?Thiếu StudentID}"
GRADE="${2:?Thiếu SelfAssessedGrade (3 chữ số, VD: 090)}"
SRC_DIR="${3:-.}"

if ! [[ "$GRADE" =~ ^[0-9]{3}$ ]]; then
  echo "Lỗi: SelfAssessedGrade phải là số 3 chữ số trong khoảng 000-100 (ví dụ 090)." >&2
  exit 1
fi

ZIP_NAME="${STUDENT_ID}_HW04_AI_Automation_${GRADE}.zip"

echo "== Kiểm tra các thành phần bắt buộc trong: $SRC_DIR =="
MISSING=0
check() {
  local pattern="$1"
  local label="$2"
  if compgen -G "$SRC_DIR/$pattern" > /dev/null; then
    echo "  [OK]      $label"
  else
    echo "  [THIẾU]   $label  (mẫu tìm: $pattern)"
    MISSING=1
  fi
}

check "*report*.md"            "Báo cáo chính (Markdown)"
check "*report*.pdf"           "Báo cáo chính (PDF)"
check "*playwright-report*"    "Báo cáo HTML đa trình duyệt (Playwright/Allure)"
check "*audit*"                "AI Audit Report"
check "*critique*"             "AI Critique"
check "*commit*log*"           "Nhật ký Git commit (text)"
check "README.md"              "README.md với bảng tự đánh giá"
check "*bug*"                  "Báo cáo lỗi (nếu có bug — bỏ qua nếu không có bug)"

if [ "$MISSING" -eq 1 ]; then
  echo ""
  echo "⚠️  Một số thành phần có thể còn thiếu ở trên. Kiểm tra lại trước khi nộp."
  echo "   (Script này chỉ dò tên file theo mẫu, không thay thế việc bạn tự rà soát nội dung.)"
fi

echo ""
echo "== Đóng gói thành: $ZIP_NAME =="
(cd "$SRC_DIR" && zip -r -q "../$ZIP_NAME" . -x "*.git*" "node_modules/*" "test-results/*")
echo "Đã tạo: $(realpath "$ZIP_NAME" 2>/dev/null || echo "$ZIP_NAME")"

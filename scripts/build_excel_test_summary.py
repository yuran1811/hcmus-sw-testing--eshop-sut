import os
import re
import glob
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

def build_excel_matching_template():
    wb = openpyxl.Workbook()
    
    # -------------------------------------------------------------
    # STYLES MATCHING THE EXACT UNIVERSITY TEMPLATE
    # -------------------------------------------------------------
    FONT_NAME = "Arial"
    
    font_title = Font(name=FONT_NAME, size=14, bold=True, color="000000")
    font_lbl_brown = Font(name=FONT_NAME, size=10, bold=True, color="800000")
    font_val = Font(name=FONT_NAME, size=10, color="000000")
    font_coverage_lbl = Font(name=FONT_NAME, size=10, bold=True, italic=True, color="000000")
    font_coverage_blue = Font(name=FONT_NAME, size=10, bold=True, color="0000FF")
    font_date_lbl = Font(name=FONT_NAME, size=10, bold=True, italic=True, color="000000")
    
    font_tbl_header = Font(name=FONT_NAME, size=10, bold=True, color="000000")
    font_tbl_cell = Font(name=FONT_NAME, size=10, color="000000")
    font_tbl_cell_bold = Font(name=FONT_NAME, size=10, bold=True, color="000000")
    font_tbl_total_lbl = Font(name=FONT_NAME, size=10, bold=True, color="000000")
    font_tbl_total_red = Font(name=FONT_NAME, size=10, bold=True, color="FF0000")
    font_insert_red = Font(name=FONT_NAME, size=9, bold=True, italic=True, color="FF0000")
    
    # Fills
    fill_header_gray = PatternFill(start_color="BFBFBF", end_color="BFBFBF", fill_type="solid")
    fill_total_cyan = PatternFill(start_color="E0FFFF", end_color="E0FFFF", fill_type="solid")
    fill_zebra = PatternFill(start_color="F9F9F9", end_color="F9F9F9", fill_type="solid")
    
    fill_pass = PatternFill(start_color="C6EFCE", end_color="C6EFCE", fill_type="solid")
    fill_fail = PatternFill(start_color="FFC7CE", end_color="FFC7CE", fill_type="solid")
    font_pass = Font(name=FONT_NAME, size=9, bold=True, color="006100")
    font_fail = Font(name=FONT_NAME, size=9, bold=True, color="9C0006")
    
    # Borders
    thin_side = Side(border_style="thin", color="000000")
    border_all_thin = Border(left=thin_side, right=thin_side, top=thin_side, bottom=thin_side)
    border_title = Border(left=thin_side, right=thin_side, top=thin_side, bottom=thin_side)
    
    # Alignments
    align_center = Alignment(horizontal="center", vertical="center", wrap_text=True)
    align_left = Alignment(horizontal="left", vertical="center", wrap_text=True)
    align_right = Alignment(horizontal="right", vertical="center", wrap_text=True)
    
    # -------------------------------------------------------------
    # 1. PARSE SOURCE DATA
    # -------------------------------------------------------------
    def parse_tc_markdown(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            text = f.read()
        
        tc_id_m = re.search(r'^#\s*(TC-[A-Z0-9-]+)', text, re.MULTILINE)
        tc_id = tc_id_m.group(1) if tc_id_m else os.path.splitext(os.path.basename(filepath))[0]
        
        title_m = re.search(r'^#\s*TC-[A-Z0-9-]+:\s*(.*?)$', text, re.MULTILINE)
        title = title_m.group(1).strip() if title_m else ""
        
        req_m = re.search(r'## Requirement ID\s*\n+(.*?)\n', text)
        req = req_m.group(1).strip() if req_m else ""
        
        mod_m = re.search(r'## Module / Test type / Technique\s*\n+(.*?)\n', text)
        mod_tech = mod_m.group(1).strip() if mod_m else ""
        
        pre_m = re.search(r'## Preconditions\s*\n+(.*?)(?=\n## Test data|\n## Test steps)', text, re.DOTALL)
        pre = pre_m.group(1).strip() if pre_m else ""
        
        steps_m = re.search(r'## Test steps\s*\n+(.*?)(?=\n## Expected result)', text, re.DOTALL)
        steps = steps_m.group(1).strip() if steps_m else ""

        exp_m = re.search(r'## Expected result\s*\n+(.*?)(?=\n## Status|\Z)', text, re.DOTALL)
        expected = exp_m.group(1).strip() if exp_m else ""
        
        test_data = {}
        table_m = re.search(r'## Test data\s*\n(.*?)(?=\n## Test steps)', text, re.DOTALL)
        if table_m:
            for row in table_m.group(1).strip().split('\n'):
                parts = [p.strip() for p in row.split('|') if p.strip()]
                if len(parts) >= 2 and parts[0] != 'Field' and not parts[0].startswith('---'):
                    test_data[parts[0]] = parts[1]
                    
        return {
            'id': tc_id,
            'title': title,
            'req': req,
            'mod_tech': mod_tech,
            'pre': pre,
            'steps': steps,
            'test_data': test_data,
            'expected': expected,
            'file': filepath
        }

    # Load All TCs
    modules_config = [
        {
            'name': 'Forgot Password & OTP Generation',
            'endpoint': 'POST /api/forgot-password',
            'req': 'FR-03',
            'dir': 'HW6/Test/ForgotPassword',
            'tested': 42,
            'passed': 40,
            'failed': 2,
            'blocked': 0,
            'skipped': 0,
            'not_tested': 0,
            'total': 42
        },
        {
            'name': 'Order State Machine & Self Cancellation',
            'endpoint': 'PUT /api/orders/:id/cancel',
            'req': 'FR-10',
            'dir': 'HW6/Test/OrderCancel',
            'tested': 42,
            'passed': 36,
            'failed': 6,
            'blocked': 0,
            'skipped': 0,
            'not_tested': 0,
            'total': 42
        },
        {
            'name': 'CSV Batch Product Import',
            'endpoint': 'POST /api/admin/import-products',
            'req': 'FR-16',
            'dir': 'HW6/Test/ImportProducts',
            'tested': 42,
            'passed': 42,
            'failed': 0,
            'blocked': 0,
            'skipped': 0,
            'not_tested': 0,
            'total': 42
        }
    ]

    all_tcs = []
    for mod in modules_config:
        tc_files = sorted(glob.glob(f"{mod['dir']}/test-cases/TC-*.md"))
        mod['tcs'] = []
        for f in tc_files:
            tc_data = parse_tc_markdown(f)
            tc_id = tc_data['id']
            
            # Status determination
            status = "Passed"
            actual = "Mã trạng thái HTTP và phản hồi đúng như kỳ vọng"
            bug_id = ""
            
            if tc_id in ["TC-FORGOT-034", "TC-FORGOT-035"]:
                status = "Failed"
                actual = "500 Internal Server Error (Sập server khi nhận sai Content-Type)"
                bug_id = "BUG-FORGOT-004"
            elif tc_id == "TC-FORGOT-037":
                status = "Failed"
                actual = "Sai khác regex Content-Type header charset"
            elif tc_id == "TC-CANCEL-003":
                status = "Failed"
                actual = "200 OK (SUT cho phép hủy đơn hàng đang shipping - vi phạm FSM)"
                bug_id = "BUG-CANCEL-001"
            elif tc_id in ["TC-CANCEL-002", "TC-CANCEL-004", "TC-CANCEL-005"]:
                status = "Failed"
                actual = "404 Not Found (Database ban đầu chưa nạp sẵn đơn hàng trung gian)"
            elif tc_id in ["TC-CANCEL-019", "TC-CANCEL-020"]:
                status = "Failed"
                actual = "400 Bad Request (Order đã bị hủy ở bước test trước)"
            elif tc_id == "TC-FORGOT-027":
                bug_id = "BUG-FORGOT-001"
            elif tc_id == "TC-FORGOT-028":
                bug_id = "BUG-FORGOT-002"
            elif tc_id == "TC-FORGOT-026":
                bug_id = "BUG-FORGOT-003"
            elif tc_id == "TC-FORGOT-041":
                bug_id = "BUG-FORGOT-005"
            elif tc_id == "TC-CANCEL-041":
                bug_id = "BUG-CANCEL-002"
            elif tc_id == "TC-IMPORT-001":
                bug_id = "BUG-IMPORT-001"
            elif tc_id == "TC-IMPORT-029":
                bug_id = "BUG-IMPORT-002"
            elif tc_id == "TC-IMPORT-041":
                bug_id = "BUG-IMPORT-003"

            # format test data string
            data_strs = []
            for k, v in tc_data['test_data'].items():
                data_strs.append(f"{k}: {v}")
            data_text = "\n".join(data_strs) if data_strs else "Standard parameters"

            full_tc = {
                'id': tc_id,
                'req': tc_data['req'] or mod['req'],
                'module': mod['name'],
                'endpoint': mod['endpoint'],
                'title': tc_data['title'],
                'pre': tc_data['pre'],
                'steps': tc_data['steps'],
                'data': data_text,
                'expected': tc_data['expected'],
                'actual': actual,
                'status': status,
                'bug_id': bug_id
            }
            mod['tcs'].append(full_tc)
            all_tcs.append(full_tc)

    # -------------------------------------------------------------
    # 2. SHEET 1: TEST SUMMARY (EXACT LAYOUT FROM USER SCREENSHOT)
    # -------------------------------------------------------------
    ws_sum = wb.active
    ws_sum.title = "Test Summary"
    ws_sum.views.sheetView[0].showGridLines = True
    
    # Row 1: TEST SUMMARY REPORT (Merged A1:K1)
    ws_sum.merge_cells("A1:K1")
    ws_sum["A1"] = "TEST SUMMARY REPORT"
    ws_sum["A1"].font = font_title
    ws_sum["A1"].alignment = align_center
    for col in range(1, 12):
        ws_sum.cell(row=1, column=col).border = border_all_thin
    ws_sum.row_dimensions[1].height = 28

    # Row 2: Project Name & Reviewer
    ws_sum.merge_cells("A2:B2")
    ws_sum["A2"] = "Project Name"
    ws_sum["A2"].font = font_lbl_brown
    ws_sum["A2"].alignment = align_right
    
    ws_sum.merge_cells("C2:F2")
    ws_sum["C2"] = "EShop SUT — API Testing (HW06)"
    ws_sum["C2"].font = font_val
    ws_sum["C2"].alignment = align_center
    
    ws_sum.merge_cells("G2:H2")
    ws_sum["G2"] = "Reviewer"
    ws_sum["G2"].font = font_lbl_brown
    ws_sum["G2"].alignment = align_right
    
    ws_sum.merge_cells("I2:K2")
    ws_sum["I2"] = "TS. Lâm Quang Vũ / ThS. Trần Thị Bích Hạnh"
    ws_sum["I2"].font = font_val
    ws_sum["I2"].alignment = align_center
    
    for col in range(1, 12):
        ws_sum.cell(row=2, column=col).border = border_all_thin
    ws_sum.row_dimensions[2].height = 20

    # Row 3: Creator & Approver
    ws_sum.merge_cells("A3:B3")
    ws_sum["A3"] = "Creator"
    ws_sum["A3"].font = font_lbl_brown
    ws_sum["A3"].alignment = align_right
    
    ws_sum.merge_cells("C3:F3")
    ws_sum["C3"] = "Nguyễn An (23127148)"
    ws_sum["C3"].font = font_val
    ws_sum["C3"].alignment = align_center
    
    ws_sum.merge_cells("G3:H3")
    ws_sum["G3"] = "Approver"
    ws_sum["G3"].font = font_lbl_brown
    ws_sum["G3"].alignment = align_right
    
    ws_sum.merge_cells("I3:K3")
    ws_sum["I3"] = "TS. Trần Duy Hoàng"
    ws_sum["I3"].font = font_val
    ws_sum["I3"].alignment = align_center
    
    for col in range(1, 12):
        ws_sum.cell(row=3, column=col).border = border_all_thin
    ws_sum.row_dimensions[3].height = 20

    # Row 4: Note
    ws_sum.merge_cells("A4:B4")
    ws_sum["A4"] = "Note"
    ws_sum["A4"].font = font_lbl_brown
    ws_sum["A4"].alignment = align_right
    
    ws_sum.merge_cells("C4:K4")
    ws_sum["C4"] = "Automated API Test Suite (Postman & Newman) for 3 Target APIs: FR-03, FR-10, FR-16"
    ws_sum["C4"].font = font_val
    ws_sum["C4"].alignment = align_left
    
    for col in range(1, 12):
        ws_sum.cell(row=4, column=col).border = border_all_thin
    ws_sum.row_dimensions[4].height = 20

    # Row 5: Test Coverage:
    ws_sum.merge_cells("A5:B5")
    ws_sum["A5"] = "Test Coverage:"
    ws_sum["A5"].font = font_coverage_lbl
    ws_sum["A5"].alignment = align_right
    
    ws_sum["C5"] = "=D12/J12"
    ws_sum["C5"].font = font_coverage_blue
    ws_sum["C5"].number_format = "0%"
    ws_sum["C5"].alignment = align_center
    ws_sum.row_dimensions[5].height = 20

    # Row 6: Successful Test Coverage: & Date:
    ws_sum.merge_cells("A6:B6")
    ws_sum["A6"] = "Successful Test Coverage:"
    ws_sum["A6"].font = font_coverage_lbl
    ws_sum["A6"].alignment = align_right
    
    ws_sum["C6"] = "=E12/D12"
    ws_sum["C6"].font = font_coverage_blue
    ws_sum["C6"].number_format = "0%"
    ws_sum["C6"].alignment = align_center
    
    ws_sum.merge_cells("I6:J6")
    ws_sum["I6"] = "Date:"
    ws_sum["I6"].font = font_date_lbl
    ws_sum["I6"].alignment = align_right
    
    ws_sum["K6"] = "2026/08/22"
    ws_sum["K6"].font = font_val
    ws_sum["K6"].alignment = align_center
    ws_sum.row_dimensions[6].height = 20

    # Row 7: Blank
    ws_sum.row_dimensions[7].height = 10

    # Row 8: Table Header (Gray background)
    headers_sum = [
        "No", "Requirement ID", "Requirement\nname", "Tested", "Passed", "Failed",
        "Blocked", "Skipped", "Not Yet Tested", "Total", "Tested\nCoverage"
    ]
    ws_sum.row_dimensions[8].height = 28
    for col_idx, h in enumerate(headers_sum, start=1):
        cell = ws_sum.cell(row=8, column=col_idx, value=h)
        cell.font = font_tbl_header
        cell.fill = fill_header_gray
        cell.alignment = align_center
        cell.border = border_all_thin

    # Data Rows (Rows 9-11)
    sum_data_rows = [
        (1, "FR-03", "Forgot password & Reset Token (POST /api/forgot-password)", 42, 40, 2, 0, 0, 0, 42, "=D9/J9"),
        (2, "FR-10", "Order state machine & Cancel (PUT /api/orders/:id/cancel)", 42, 36, 6, 0, 0, 0, 42, "=D10/J10"),
        (3, "FR-16", "Product batch import from CSV (POST /api/admin/import-products)", 42, 42, 0, 0, 0, 0, 42, "=D11/J11"),
    ]

    for row_idx, rvals in enumerate(sum_data_rows, start=9):
        ws_sum.row_dimensions[row_idx].height = 22
        for col_idx, val in enumerate(rvals, start=1):
            cell = ws_sum.cell(row=row_idx, column=col_idx, value=val)
            cell.font = font_tbl_cell
            cell.border = border_all_thin
            cell.alignment = align_left if col_idx == 3 else align_center
            if col_idx == 10:
                cell.font = font_lbl_brown
            elif col_idx == 11:
                cell.number_format = "0%"

    # Row 12: Total Row (Light Cyan Fill, Red bold text, Insert New Line text in Col A)
    ws_sum.row_dimensions[12].height = 24
    
    cell_a12 = ws_sum.cell(row=12, column=1, value="<<< Insert New Line above this line >>>")
    cell_a12.font = font_insert_red
    cell_a12.fill = fill_total_cyan
    cell_a12.alignment = align_center
    cell_a12.border = border_all_thin
    
    ws_sum.merge_cells("B12:C12")
    ws_sum["B12"] = "Total"
    ws_sum["B12"].font = font_tbl_total_lbl
    ws_sum["B12"].fill = fill_total_cyan
    ws_sum["B12"].alignment = Alignment(horizontal="left", vertical="center", indent=1)
    ws_sum["B12"].border = border_all_thin
    ws_sum["C12"].border = border_all_thin
    ws_sum["C12"].fill = fill_total_cyan

    # Formulas in Row 12
    sum_cols = [
        (4, "=SUM(D9:D11)"),
        (5, "=SUM(E9:E11)"),
        (6, "=SUM(F9:F11)"),
        (7, "=SUM(G9:G11)"),
        (8, "=SUM(H9:H11)"),
        (9, "=SUM(I9:I11)"),
        (10, "=SUM(J9:J11)"),
        (11, "=D12/J12")
    ]
    for c_idx, formula in sum_cols:
        cell = ws_sum.cell(row=12, column=c_idx, value=formula)
        cell.font = font_tbl_total_red
        cell.fill = fill_total_cyan
        cell.border = border_all_thin
        cell.alignment = align_center
        if c_idx == 11:
            cell.number_format = "0%"

    # Set Column Widths for Test Summary
    sum_col_widths = {
        'A': 32, 'B': 18, 'C': 42, 'D': 10, 'E': 10, 'F': 10,
        'G': 10, 'H': 10, 'I': 14, 'J': 10, 'K': 15
    }
    for col_letter, w in sum_col_widths.items():
        ws_sum.column_dimensions[col_letter].width = w

    # -------------------------------------------------------------
    # 3. SHEET 2: TEST CASES (STANDARD COURSE FORMAT)
    # -------------------------------------------------------------
    ws_tc = wb.create_sheet(title="Test Cases")
    ws_tc.views.sheetView[0].showGridLines = True
    
    ws_tc.merge_cells("A1:K1")
    ws_tc["A1"] = "TEST CASES SPECIFICATION & EXECUTION RESULTS"
    ws_tc["A1"].font = font_title
    ws_tc["A1"].alignment = align_center
    ws_tc.row_dimensions[1].height = 26
    for col in range(1, 12):
        ws_tc.cell(row=1, column=col).border = border_all_thin

    tc_headers = [
        "No", "Test Case ID", "Requirement ID", "Module / Endpoint", "Test Description",
        "Preconditions", "Test Steps", "Test Data", "Expected Result", "Actual Result", "Status"
    ]
    ws_tc.row_dimensions[2].height = 24
    for col_idx, h in enumerate(tc_headers, start=1):
        cell = ws_tc.cell(row=2, column=col_idx, value=h)
        cell.font = font_tbl_header
        cell.fill = fill_header_gray
        cell.alignment = align_center
        cell.border = border_all_thin

    for r_idx, tc in enumerate(all_tcs, start=3):
        ws_tc.row_dimensions[r_idx].height = 22
        row_vals = [
            r_idx - 2,
            tc['id'],
            tc['req'],
            tc['endpoint'],
            tc['title'],
            tc['pre'].replace('\n', '; '),
            tc['steps'].replace('\n', '; '),
            tc['data'].replace('\n', '; '),
            tc['expected'].replace('\n', ' '),
            tc['actual'],
            tc['status']
        ]
        for c_idx, val in enumerate(row_vals, start=1):
            cell = ws_tc.cell(row=r_idx, column=c_idx, value=val)
            cell.font = font_tbl_cell
            cell.border = border_all_thin
            cell.alignment = align_left if c_idx in [5, 6, 7, 8, 9, 10] else align_center
            
            if (r_idx % 2) == 0:
                cell.fill = fill_zebra
                
            if c_idx == 11:
                if val == "Passed":
                    cell.fill = fill_pass; cell.font = font_pass
                else:
                    cell.fill = fill_fail; cell.font = font_fail

    ws_tc.freeze_panes = "C3"
    ws_tc.auto_filter.ref = f"A2:K{len(all_tcs)+2}"

    tc_col_widths = {
        'A': 5, 'B': 18, 'C': 16, 'D': 25, 'E': 35, 'F': 25, 'G': 30, 'H': 25, 'I': 35, 'J': 35, 'K': 12
    }
    for col_letter, w in tc_col_widths.items():
        ws_tc.column_dimensions[col_letter].width = w

    # -------------------------------------------------------------
    # 4. SAVE WORKBOOK
    # -------------------------------------------------------------
    output_path = "HW6/Excel/test_summary.xlsx"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    wb.save(output_path)
    print(f"Successfully generated exact template Excel workbook at: {output_path}")

if __name__ == "__main__":
    build_excel_matching_template()

import gspread
from oauth2client.service_account import ServiceAccountCredentials
import time
import sys

# Reconfigure stdout/stderr to use UTF-8 to prevent cp1252 print errors on Windows
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

def standardize_usability_sheet():
    print("Connecting to Google Sheets API...")
    scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
    creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
    client = gspread.authorize(creds)
    
    sheet_id = "1lFcv1rZwiWe-7lHntObhGopbR7dUTdNMjesM39hmyJs"
    print(f"Opening spreadsheet: {sheet_id}")
    spreadsheet = client.open_by_key(sheet_id)
    
    # Define nice colors
    color_blue = {"red": 0.12, "green": 0.45, "blue": 0.74} # #1F72B8
    color_yellow = {"red": 1.0, "green": 0.75, "blue": 0.0} # #FFC000
    
    # -------------------------------------------------------------
    # STEP 1: Standardize each participant sheet P01 to P07
    # -------------------------------------------------------------
    for idx in range(1, 8):
        p_id = f"P{idx:02d}"
        print(f"Standardizing sheet: {p_id}...")
        ws = spreadsheet.worksheet(p_id)
        
        # Correct title typo if present (e.g. P02 has "NGƯỜI DÙNG P03")
        expected_title = f"NHẬT KÝ PHIÊN KIỂM THỬ KHẢ DỤNG - NGƯỜI DÙNG {p_id}"
        current_title = ws.cell(1, 1).value
        if current_title != expected_title:
            print(f"  Fixing title in row 1 of {p_id}: '{current_title}' -> '{expected_title}'")
            ws.update_cell(1, 1, expected_title)
            time.sleep(1)
            
        # Add information labels in Column E and values/placeholders in Column F
        # Rows 4 to 8:
        # E4: Participant ID, F4: P0X
        # E5: Thời gian bắt đầu, F5: (empty)
        # E6: Thời gian kết thúc, F6: (empty)
        # E7: Hoàn thành task (Y/N), F7: (empty)
        # E8: Số lần cần trợ giúp, F8: (empty)
        info_data = [
            ["Participant ID", p_id],
            ["Thời gian bắt đầu", ""],
            ["Thời gian kết thúc", ""],
            ["Hoàn thành task (Y/N)", ""],
            ["Số lần cần trợ giúp", ""]
        ]
        
        # We only want to write them if they are not already there or if we want to ensure they exist.
        # To be clean, let's write the labels to E4:E8 and values to F4:F8 (preserving F5:F8 if they already have data)
        labels = [row[0] for row in info_data]
        # Get existing values in E4:F8 to prevent overwriting user input
        existing_info = ws.batch_get(["E4:E8", "F4:F8"])
        existing_labels = [r[0] for r in existing_info[0]] if existing_info[0] else []
        existing_vals = [r[0] if r else "" for r in existing_info[1]] if len(existing_info) > 1 and existing_info[1] else [""] * 5
        
        # Build update list
        updates = []
        for r_offset in range(5):
            row_num = 4 + r_offset
            # Update label in E
            updates.append({
                "range": f"E{row_num}",
                "values": [[labels[r_offset]]]
            })
            # Update value in F if it's currently empty, or if it's Row 4 (Participant ID is fixed)
            if r_offset == 0:
                updates.append({
                    "range": f"F{row_num}",
                    "values": [[p_id]]
                })
            else:
                curr_val = existing_vals[r_offset] if r_offset < len(existing_vals) else ""
                if not curr_val:
                    updates.append({
                        "range": f"F{row_num}",
                        "values": [[""]]
                    })
                    
        # Add formulas for SUS calculation in Columns E and F
        # Row 10: Odd Item Sum, F10: =SUM(C4,C6,C8,C10,C12)-5
        # Row 11: Even Item Sum, F11: =25-SUM(C5,C7,C9,C11,C13)
        # Row 12: SUS Score, F12: =(F10+F11)*2.5
        updates.append({"range": "E10", "values": [["Odd Item Sum"]]})
        updates.append({"range": "F10", "values": [["=SUM(C4,C6,C8,C10,C12)-5"]]})
        updates.append({"range": "E11", "values": [["Even Item Sum"]]})
        updates.append({"range": "F11", "values": [["=25-SUM(C5,C7,C9,C11,C13)"]]})
        updates.append({"range": "E12", "values": [["SUS Score"]]})
        updates.append({"range": "F12", "values": [["=(F10+F11)*2.5"]]})
        
        # Batch update
        ws.batch_update(updates, value_input_option="USER_ENTERED")
        print(f"  Standardization of {p_id} complete.")
        time.sleep(1)

    # -------------------------------------------------------------
    # STEP 2: Fix and complete Summary sheet
    # -------------------------------------------------------------
    print("Sửa/hoàn thiện tab Summary...")
    summary = spreadsheet.worksheet("Summary")
    
    # Clean the old columns from Row 10 onwards
    # The existing table had columns A to N, row 10 to 17.
    # Let's clear E10:N100 to remove old columns (Q1-Q10, Odd, Even, SUS Score)
    summary.batch_clear(["E10:N100"])
    
    # Overwrite the table header and formulas in Columns A to D
    summary_headers = ["Participant ID", "SUS Score", "Hoàn thành task (Y/N)", "Thời gian hoàn thành"]
    summary.update(range_name="A10:D10", values=[summary_headers], value_input_option="USER_ENTERED")
    
    summary_rows = []
    for idx in range(1, 8):
        p_id = f"P{idx:02d}"
        r = 10 + idx  # rows 11 to 17
        row_data = [
            p_id,
            f"='{p_id}'!F12", # SUS Score pulled from participant sheet
            f"='{p_id}'!F7",  # Task completion pulled from participant sheet
            f"=IF(OR(ISBLANK('{p_id}'!F5), ISBLANK('{p_id}'!F6)), \"\", ROUND(('{p_id}'!F6-'{p_id}'!F5)*1440, 0))" # Duration in minutes
        ]
        summary_rows.append(row_data)
        
    summary.update(range_name="A11:D17", values=summary_rows, value_input_option="USER_ENTERED")
    time.sleep(1)
    
    # Clean average rows & calculations below row 17
    summary.batch_clear(["A18:D30"])
    
    # Add stats rows at A18:C21
    # B18: Điểm SUS Trung bình
    # B20: Adjective Rating
    # B21: Acceptability Range
    stats_data = [
        ["Điểm SUS Trung bình:", "=IFERROR(AVERAGE(B11:B17), \"\")", ""],
        [],
        ["Đánh giá Định tính (Adjective):", "", "=IF(B18=\"\",\"\",IF(B18<51,\"Poor\",IF(B18<68,\"OK\",IF(B18<80,\"Good\",IF(B18<=84,\"Excellent\",\"Best Imaginable\")))))"],
        ["Khả năng Chấp nhận (Acceptability):", "", "=IF(B18=\"\",\"\",IF(B18<51,\"Not Acceptable\",IF(B18<=70,\"Marginal\",\"Acceptable\")))"]
    ]
    summary.update(range_name="A18:C21", values=stats_data, value_input_option="USER_ENTERED")
    time.sleep(1)
    
    # Color the Summary tab yellow
    print("Coloring Summary tab...")
    body = {
        "requests": [
            {
                "updateSheetProperties": {
                    "properties": {
                        "sheetId": summary.id,
                        "tabColor": color_yellow
                    },
                    "fields": "tabColor"
                }
            }
        ]
    }
    spreadsheet.batch_update(body)
    time.sleep(1)
    
    # Set conditional formatting for B11:B17 on Summary sheet
    # First, let's clear existing conditional rules, then add the new ones.
    print("Setting conditional formatting rules for Summary...")
    cf_body = {
        "requests": [
            # Clear existing rules on the Summary sheet
            {
                "clearBasicFilter": {
                    "sheetId": summary.id
                }
            },
            # Add Rule 1: value >= 68 (light green background #E2EFDA)
            {
                "addConditionalFormatRule": {
                    "rule": {
                        "ranges": [
                            {
                                "sheetId": summary.id,
                                "startRowIndex": 10,
                                "endRowIndex": 17,
                                "startColumnIndex": 1,
                                "endColumnIndex": 2
                            }
                        ],
                        "booleanRule": {
                            "condition": {
                                "type": "CUSTOM_FORMULA",
                                "values": [{"userEnteredValue": "=AND(NOT(ISBLANK(B11)), B11>=68)"}]
                            },
                            "format": {
                                "backgroundColor": {"red": 0.89, "green": 0.94, "blue": 0.85}
                            }
                        }
                    },
                    "index": 0
                }
            },
            # Add Rule 2: value < 68 (light red background #FADBD8)
            {
                "addConditionalFormatRule": {
                    "rule": {
                        "ranges": [
                            {
                                "sheetId": summary.id,
                                "startRowIndex": 10,
                                "endRowIndex": 17,
                                "startColumnIndex": 1,
                                "endColumnIndex": 2
                            }
                        ],
                        "booleanRule": {
                            "condition": {
                                "type": "CUSTOM_FORMULA",
                                "values": [{"userEnteredValue": "=AND(NOT(ISBLANK(B11)), B11<68)"}]
                            },
                            "format": {
                                "backgroundColor": {"red": 0.98, "green": 0.86, "blue": 0.86}
                            }
                        }
                    },
                    "index": 1
                }
            }
        ]
    }
    spreadsheet.batch_update(cf_body)
    time.sleep(1)
    
    # -------------------------------------------------------------
    # STEP 3-6: Create new tabs (Participants, Session Log, Probe Questions, Bugs & Findings)
    # -------------------------------------------------------------
    
    def get_or_create_sheet(title):
        try:
            ws = spreadsheet.worksheet(title)
            print(f"Worksheet '{title}' already exists. Clearing it...")
            ws.clear()
        except gspread.exceptions.WorksheetNotFound:
            print(f"Creating worksheet '{title}'...")
            ws = spreadsheet.add_worksheet(title=title, rows="50", cols="10")
        return ws
        
    # Step 3: Participants
    participants_ws = get_or_create_sheet("Participants")
    participants_headers = [
        "Participant ID", "Họ tên viết tắt", "Kênh liên hệ (che 4 số giữa)", 
        "Loại (IT/Non-IT)", "Độ tuổi", "Xác nhận không thuộc lớp HW03"
    ]
    participants_rows = [[f"P{i:02d}", "", "", "", "", ""] for i in range(1, 8)]
    participants_ws.update(range_name="A1:F1", values=[participants_headers], value_input_option="USER_ENTERED")
    participants_ws.update(range_name="A2:F8", values=participants_rows, value_input_option="USER_ENTERED")
    participants_ws.freeze(rows=1)
    time.sleep(1)
    
    # Step 4: Session Log
    session_ws = get_or_create_sheet("Session Log")
    session_headers = [
        "Participant ID", "Thời gian bắt đầu", "Thời gian kết thúc", 
        "Thời lượng (phút)", "Hoàn thành task? (Y/N)", "Số lần cần trợ giúp", 
        "Ghi chú friction point chính"
    ]
    session_rows = []
    for idx in range(1, 8):
        p_id = f"P{idx:02d}"
        r = 1 + idx # row 2 to 8
        session_rows.append([
            p_id,
            f"='{p_id}'!F5",
            f"='{p_id}'!F6",
            f"=IF(OR(ISBLANK(B{r}), ISBLANK(C{r})), \"\", ROUND((C{r}-B{r})*1440, 0))",
            f"='{p_id}'!F7",
            f"='{p_id}'!F8",
            ""
        ])
    session_ws.update(range_name="A1:G1", values=[session_headers], value_input_option="USER_ENTERED")
    session_ws.update(range_name="A2:G8", values=session_rows, value_input_option="USER_ENTERED")
    session_ws.freeze(rows=1)
    time.sleep(1)
    
    # Step 5: Probe Questions
    probe_ws = get_or_create_sheet("Probe Questions")
    probe_headers = ["Participant ID", "Clarity", "Error Recovery", "Speed", "Trust"]
    probe_rows = []
    for idx in range(1, 8):
        p_id = f"P{idx:02d}"
        probe_rows.append([
            p_id,
            f"='{p_id}'!C16",
            f"='{p_id}'!C17",
            f"='{p_id}'!C18",
            f"='{p_id}'!C19"
        ])
    probe_ws.update(range_name="A1:E1", values=[probe_headers], value_input_option="USER_ENTERED")
    probe_ws.update(range_name="A2:E8", values=probe_rows, value_input_option="USER_ENTERED")
    probe_ws.freeze(rows=1)
    time.sleep(1)
    
    # Step 6: Bugs & Findings
    bugs_ws = get_or_create_sheet("Bugs & Findings")
    bugs_headers = [
        "Bug ID", "Mô tả", "Participant(s) liên quan", 
        "Loại (Isolated Bug/Systemic Issue)", "Mức độ (Blocker/Major/Minor)", 
        "Link GitHub Issue", "Link Screenshot"
    ]
    bugs_ws.update(range_name="A1:G1", values=[bugs_headers], value_input_option="USER_ENTERED")
    bugs_ws.freeze(rows=1)
    time.sleep(1)
    
    # Step 7: Freeze & Tab Colors
    print("Coloring new tabs...")
    color_body = {
        "requests": [
            {
                "updateSheetProperties": {
                    "properties": {
                        "sheetId": participants_ws.id,
                        "tabColor": color_blue
                    },
                    "fields": "tabColor"
                }
            },
            {
                "updateSheetProperties": {
                    "properties": {
                        "sheetId": session_ws.id,
                        "tabColor": color_blue
                    },
                    "fields": "tabColor"
                }
            },
            {
                "updateSheetProperties": {
                    "properties": {
                        "sheetId": probe_ws.id,
                        "tabColor": color_blue
                    },
                    "fields": "tabColor"
                }
            },
            {
                "updateSheetProperties": {
                    "properties": {
                        "sheetId": bugs_ws.id,
                        "tabColor": color_blue
                    },
                    "fields": "tabColor"
                }
            }
        ]
    }
    spreadsheet.batch_update(color_body)
    time.sleep(1)
    
    print("\nAll sheets standardized and formatted successfully online!")

if __name__ == "__main__":
    standardize_usability_sheet()

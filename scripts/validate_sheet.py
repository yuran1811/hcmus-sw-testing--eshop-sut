import gspread
from oauth2client.service_account import ServiceAccountCredentials
import sys

# Configure stdout/stderr to UTF-8
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

def validate_sheets():
    scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
    creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
    client = gspread.authorize(creds)
    
    sheet_id = "1lFcv1rZwiWe-7lHntObhGopbR7dUTdNMjesM39hmyJs"
    spreadsheet = client.open_by_key(sheet_id)
    
    worksheets = spreadsheet.worksheets()
    
    with open(r"C:\Users\USER\.gemini\antigravity-ide\scratch\validation_output.txt", "w", encoding="utf-8") as out:
        out.write("================ SPREADSHEET VALIDATION ================\n")
        out.write(f"Spreadsheet Title: {spreadsheet.title}\n")
        out.write(f"Spreadsheet URL: https://docs.google.com/spreadsheets/d/{sheet_id}\n\n")
        
        out.write("Worksheets in order:\n")
        for idx, ws in enumerate(worksheets):
            out.write(f"{idx+1}. {ws.title}\n")
            
        out.write("\nChecking for errors (#REF!, #VALUE!) in all worksheets...\n")
        
        total_errors = 0
        for ws in worksheets:
            out.write(f"\nChecking worksheet: {ws.title}...\n")
            vals = ws.get_all_values()
            ws_errors = 0
            for r_idx, row in enumerate(vals):
                for c_idx, val in enumerate(row):
                    if "#REF!" in val or "#VALUE!" in val:
                        col_letter = chr(ord('A') + c_idx) if c_idx < 26 else f"Col{c_idx+1}"
                        out.write(f"  [ERROR] Found {val} at cell {col_letter}{r_idx+1}\n")
                        ws_errors += 1
                        total_errors += 1
            if ws_errors == 0:
                out.write("  -> No errors found.\n")
            else:
                out.write(f"  -> Found {ws_errors} error(s).\n")
                
        out.write("\n=======================================================\n")
        out.write(f"Validation complete. Total errors found: {total_errors}\n")
        
if __name__ == "__main__":
    validate_sheets()

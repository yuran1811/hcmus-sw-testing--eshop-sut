# Data Generation Scripts

## generate_test_csv

```python
import csv
import random
import string
from pathlib import Path


def generate_test_csv(
    output_file: str,
    num_rows: int,
    id_prefix: str = "perf",
    product_ids: list = None,
    keywords: list = None,
    quantities: list = None,
    password: str = "Test@12345",
    include_coupon: bool = False,
):
    """
    Generate a CSV file of parameterized test data for performance testing.

    Each row represents one unique virtual user identity and one set of
    product parameters. The email format ensures uniqueness and easy cleanup
    in the database via LIKE queries.
    """
    product_ids = product_ids or list(range(1, 11))
    keywords = keywords or ["laptop", "phone", "shirt", "watch", "book"]
    quantities = quantities or [1, 2, 3]

    fieldnames = ["email", "password", "product_id", "keyword", "quantity"]
    if include_coupon:
        fieldnames.append("coupon_code")

    rows = []
    for i in range(1, num_rows + 1):
        row = {
            "email": f"{id_prefix}_{i:04d}@test.com",
            "password": password,
            "product_id": random.choice(product_ids),
            "keyword": random.choice(keywords),
            "quantity": random.choice(quantities),
        }
        if include_coupon:
            row["coupon_code"] = ""
        rows.append(row)

    output_path = Path(output_file)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f"Generated {output_path} with {num_rows} rows.")
    return str(output_path)
```

## register_users

```python
import csv
import time
import requests
from pathlib import Path


def register_users(
    csv_file: str,
    base_url: str,
    endpoint: str = "/api/auth/register",
    name_field: str = None,
    delay_between_requests: float = 0.05,
    max_retries: int = 1,
) -> dict:
    """
    Read credentials from a CSV file and register each account via the REST API.

    Returns a summary dict with success, already_exists, and failed counts.
    """
    results = {"success": 0, "already_exists": 0, "failed": 0, "errors": []}
    url = f"{base_url.rstrip('/')}{endpoint}"

    with open(csv_file, encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    print(f"Registering {len(rows)} accounts at {url} ...")

    for i, row in enumerate(rows, start=1):
        payload = {"email": row["email"], "password": row["password"]}
        if name_field:
            payload["name"] = row.get(name_field, row["email"].split("@")[0])
        else:
            payload["name"] = row["email"].split("@")[0]

        attempt = 0
        while attempt <= max_retries:
            try:
                resp = requests.post(url, json=payload, timeout=10)
                if resp.status_code in (200, 201):
                    results["success"] += 1
                    break
                elif resp.status_code == 409:
                    results["already_exists"] += 1
                    break
                elif resp.status_code >= 500 and attempt < max_retries:
                    attempt += 1
                    time.sleep(1)
                else:
                    results["failed"] += 1
                    results["errors"].append(
                        {"email": row["email"], "status": resp.status_code, "body": resp.text[:200]}
                    )
                    break
            except requests.RequestException as e:
                results["failed"] += 1
                results["errors"].append({"email": row["email"], "error": str(e)})
                break

        if i % 50 == 0:
            print(f"  {i}/{len(rows)} processed — "
                  f"{results['success']} ok, {results['already_exists']} exist, "
                  f"{results['failed']} failed")

        time.sleep(delay_between_requests)

    print(f"\nDone. Success: {results['success']}, Already existed: {results['already_exists']}, "
          f"Failed: {results['failed']}")
    if results["errors"]:
        print("First 5 errors:")
        for e in results["errors"][:5]:
            print(f"  {e}")

    return results
```

## reset_lockout (SQLite)

```python
import sqlite3
from pathlib import Path


def reset_lockout_sqlite(
    db_path: str,
    email_pattern: str = "perf_%@test.com",
    failed_attempts_column: str = "failed_login_attempts",
    locked_until_column: str = "locked_until",
    table: str = "users",
) -> int:
    """
    Reset account lockout fields for all test accounts in a SQLite database.

    Returns the number of rows updated.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute(
        f"""
        UPDATE {table}
        SET {failed_attempts_column} = 0,
            {locked_until_column} = NULL
        WHERE email LIKE ?
        """,
        (email_pattern,),
    )
    updated = cursor.rowcount
    conn.commit()
    conn.close()

    print(f"Reset lockout for {updated} accounts matching '{email_pattern}'.")
    return updated
```

## CLI entry point

```python
# scripts/manage_data.py
import argparse
from generate_data import generate_test_csv
from register_users import register_users
from reset_lockout import reset_lockout_sqlite

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Performance test data management")
    sub = parser.add_subparsers(dest="command")

    gen = sub.add_parser("generate")
    gen.add_argument("--output", default="test_data.csv")
    gen.add_argument("--rows", type=int, default=300)
    gen.add_argument("--prefix", default="perf")

    reg = sub.add_parser("register")
    reg.add_argument("--csv", required=True)
    reg.add_argument("--base-url", required=True)
    reg.add_argument("--endpoint", default="/api/auth/register")

    rst = sub.add_parser("reset-lockout")
    rst.add_argument("--db", required=True)
    rst.add_argument("--pattern", default="perf_%@test.com")

    args = parser.parse_args()

    if args.command == "generate":
        generate_test_csv(args.output, args.rows, args.prefix)
    elif args.command == "register":
        register_users(args.csv, args.base_url, args.endpoint)
    elif args.command == "reset-lockout":
        reset_lockout_sqlite(args.db, args.pattern)
```

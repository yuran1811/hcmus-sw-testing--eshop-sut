# Schema Validation Guide (Postman Tests tab)

## Step 1 — Extract the schema from api_specification.md
For each response (success + the main error codes 400/401/403/404/409), record:
- Expected status code
- List of required fields and their data types
- Optional fields (if any)
- Whether extra fields are allowed (additionalProperties) or not

## Step 2 — Write assertions in Postman (the Tests tab of each request)

### Check status code
```javascript
pm.test("Correct status code", function () {
    pm.response.to.have.status(200);
});
```

### Check schema with JSON Schema (recommended — built-in Postman feature)
```javascript
const schema = {
  "type": "object",
  "required": ["id", "email", "name", "createdAt"],
  "properties": {
    "id": { "type": "string" },
    "email": { "type": "string" },
    "name": { "type": "string" },
    "createdAt": { "type": "string" },
    "role": { "type": "string" }
  },
  "additionalProperties": false
};

pm.test("Response matches schema", function () {
    pm.response.to.have.jsonSchema(schema);
});
```

### Check that no sensitive field leaks (extra check, not part of the strict schema, but required for security coverage)
```javascript
pm.test("No password/token leaked in response", function () {
    const body = pm.response.json();
    pm.expect(JSON.stringify(body)).to.not.include("password");
    pm.expect(JSON.stringify(body)).to.not.include("passwordHash");
});
```

### Check individual field types manually (when you don't want to write a full JSON Schema)
```javascript
const body = pm.response.json();
pm.test("price is a positive number", function () {
    pm.expect(body.price).to.be.a("number");
    pm.expect(body.price).to.be.above(0);
});
```

## Step 3 — Reuse shared schemas
If multiple requests share the same schema (e.g. a Product object appears in both list and detail responses), store the schema in a Collection Variable or a separate file and load it via `pm.collectionVariables.get(...)` to avoid duplication — this is also a good "Postman feature used" bullet point to list in the report.

## Notes when auditing Schema Validation test cases
- Each such test case must map 1-to-1 to a specific response case (not a vague "check the response format is correct").
- Error responses (4xx) still need their own schema (typically `{ "error": string, "message": string }`) — many test suites forget to validate the schema of ERROR responses, only validating success responses.

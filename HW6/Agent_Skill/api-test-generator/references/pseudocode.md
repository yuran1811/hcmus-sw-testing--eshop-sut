# Pseudocode: AI-Driven API Test Generator (HW06 §7 / Bloom-AI G9.5)

This document specifies the algorithmic design and execution logic of the **AI-Driven API Test Generator** for the EShop SUT.

---

## 1. Algorithm Overview

- **Name:** `AI_Driven_API_Test_Generator`
- **Goal:** Automatically transform an arbitrary API specification into an executable, comprehensive Postman test suite ($\ge 35$ test cases per endpoint group) covering all four mandatory HW06 dimensions.
- **Complexity / Scope:** Domain Partitioning (EP/BVA), Finite State Machine Transitions, Security (SEC-01–SEC-07), JSON Schema Validation, Data-Driven Iterations, and E2E Request Chaining.

---

## 2. Pseudocode Specification

```text
ALGORITHM AI_Driven_API_Test_Generator
INPUT:
    api_spec            : Text / OpenAPI / Markdown API Specification
    target_endpoints    : List of Endpoint identifiers to test (from Pool A, B, or C)
    student_id          : String (Student identification for anti-cheat verification)
    base_url            : String (API target server URL, e.g., "http://localhost:3000")
    auth_credentials    : Object { user_email, user_password, admin_email, admin_password }
    state_machine_rules : Optional Matrix of { current_state, event, next_state, is_valid }

OUTPUT:
    postman_collection  : JSON Object (Postman Collection v2.1 Schema)
    postman_environment : JSON Object (Postman Environment file)
    ddt_data_file       : JSON Array (Data-Driven test dataset with >= 8 rows)
    test_case_docs      : Directory containing markdown files (TC-<API>-<NNN>.md)
    coverage_matrix     : Markdown Document summarizing test counts and technique mapping
    audit_checklist     : Markdown Document with confidence levels for human review

BEGIN
    // =========================================================================
    // PHASE 1: SPECIFICATION ANALYSIS & PARAMETER EXTRACTION
    // =========================================================================
    parsed_routes ← ParseApiSpecification(api_spec)
    active_routes ← FilterRoutes(parsed_routes, target_endpoints)

    FOR EACH route IN active_routes DO
        route.method        ← ExtractHttpMethod(route)
        route.path          ← ExtractPath(route)
        route.path_params   ← ExtractPathParameters(route)
        route.query_params  ← ExtractQueryParameters(route)
        route.body_schema   ← ExtractRequestBodySchema(route)
        route.auth_type     ← DetermineAuthenticationType(route) // None | Bearer | Admin
        route.expected_resp ← ExtractResponseShapes(route)       // Status codes + JSON schemas
    END FOR

    // =========================================================================
    // PHASE 2: SYSTEMATIC TEST DESIGN (4 CORE DIMENSIONS)
    // =========================================================================
    test_suite ← EmptyList()

    FOR EACH route IN active_routes DO
        // Dimension A: Domain Partitions (EP & BVA)
        ep_classes  ← GenerateEquivalencePartitions(route.body_schema, route.query_params)
        bva_values  ← GenerateBoundaryValues(route.body_schema, route.query_params)

        FOR EACH valid_partition IN ep_classes.valid DO
            test_suite.Add(CreateTestCase(
                type="Functional",
                technique="Equivalence Partitioning",
                coverage="Domain Partition",
                input_data=valid_partition.payload,
                expected_status=200_OR_201,
                name="Functional: Valid payload returns success"
            ))
        END FOR

        FOR EACH invalid_partition IN ep_classes.invalid DO
            test_suite.Add(CreateTestCase(
                type="Functional",
                technique="Equivalence Partitioning",
                coverage="Domain Partition",
                input_data=invalid_partition.payload,
                expected_status=400_OR_422,
                name=Concat("Functional: Rejects ", invalid_partition.description)
            ))
        END FOR

        FOR EACH boundary IN bva_values DO
            test_suite.Add(CreateTestCase(
                type="Functional",
                technique="Boundary Value Analysis",
                coverage="Domain Partition",
                input_data=boundary.payload,
                expected_status=(boundary.is_valid ? 200 : 400),
                name=Concat("Functional: Boundary value ", boundary.label)
            ))
        END FOR

        // Dimension B: JSON Schema Validation (Contract Testing)
        test_suite.Add(CreateTestCase(
            type="Contract",
            technique="JSON Schema Validation",
            coverage="Schema Validation",
            input_data=GetNominalValidPayload(route),
            expected_schema=route.expected_resp.success_schema,
            name="Contract: Response adheres strictly to JSON Schema definition"
        ))

        // Dimension C: Security Testing (SEC-01 to SEC-07)
        IF route.auth_type != "None" THEN
            // SEC-01: No Token
            test_suite.Add(CreateTestCase(
                type="Security", technique="Authentication Verification",
                coverage="Security", header_auth=NULL, expected_status=401,
                name="Security: Returns 401 Unauthorized when token is missing"
            ))
            // SEC-02: Expired / Tampered Token
            test_suite.Add(CreateTestCase(
                type="Security", technique="Token Integrity Verification",
                coverage="Security", header_auth=GenerateExpiredToken(), expected_status=401_OR_403,
                name="Security: Returns 401/403 when token is expired or malformed"
            ))
        END IF

        IF route.auth_type == "Admin" THEN
            // SEC-03: RBAC Privilege Escalation
            test_suite.Add(CreateTestCase(
                type="Security", technique="Role-Based Access Control",
                coverage="Security", header_auth=GenerateRegularUserToken(), expected_status=403,
                name="Security: Returns 403 Forbidden for non-admin user role"
            ))
        END IF

        // SEC-05 & SEC-06: SQL Injection & XSS Input Sanitization
        test_suite.Add(CreateTestCase(
            type="Security", technique="Input Sanitization (SQLi)",
            coverage="Security", input_data=InjectPayload(route, "' OR '1'='1"),
            expected_status_not=500,
            name="Security: Safely handles SQL Injection payload without 500 crash"
        ))
        test_suite.Add(CreateTestCase(
            type="Security", technique="Input Sanitization (XSS)",
            coverage="Security", input_data=InjectPayload(route, "<script>alert(1)</script>"),
            expected_status_not=500,
            name="Security: Sanitizes XSS script tag payload in response"
        ))

        // SEC-07: Mass Assignment
        test_suite.Add(CreateTestCase(
            type="Security", technique="Mass Assignment Check",
            coverage="Security", input_data=AppendExtraFields(route, { "role": "admin", "is_admin": true }),
            expected_status=200, verify_field_ignored="role",
            name="Security: Ignores unauthorized elevated fields in payload"
        ))

        // Dimension D: State Transitions (If State Machine Defined)
        IF state_machine_rules IS NOT NULL AND route.manages_state THEN
            FOR EACH transition IN state_machine_rules DO
                test_suite.Add(CreateTestCase(
                    type="Functional", technique="State Transition",
                    coverage="State Transitions",
                    initial_state=transition.current_state,
                    trigger_event=transition.event,
                    expected_status=(transition.is_valid ? 200 : 400),
                    expected_next_state=transition.next_state,
                    name=Concat("Functional: State transition from ", transition.current_state, " to ", transition.next_state)
                ))
            END FOR
        END IF
    END FOR

    // Ensure Target Count Requirement (>= 35 Test Cases)
    WHILE Count(test_suite) < 35 DO
        test_suite.Add(GenerateAdditionalCombinatorialCase(active_routes))
    END WHILE

    // =========================================================================
    // PHASE 3: ASSEMBLE POSTMAN ARTIFACTS
    // =========================================================================
    postman_collection ← InitializePostmanCollection(name=Concat(target_endpoints, " Test Suite"))
    
    // Inject Anti-Cheat Pre-request Script at Collection Level
    postman_collection.pre_request_script ← """
        pm.request.headers.add({
            key: 'X-Student-Id',
            value: pm.environment.get('studentId')
        });
    """

    // Organize into Folders by Category
    folders ← CreateFolders([
        "01-Happy-Path", "02-Schema-Validation", "03-Auth-and-RBAC",
        "04-Negative-Validation", "05-Boundary-and-Sanitization",
        "06-Data-Driven", "07-State-Transitions", "08-E2E-Workflow"
    ])

    FOR EACH tc IN test_suite DO
        js_script ← BuildPostmanTestScript(tc)
        request_item ← BuildPostmanRequest(tc, js_script)
        folders[tc.category].Add(request_item)
    END FOR
    postman_collection.items ← folders

    // Build Environment & DDT File
    postman_environment ← BuildEnvironmentJson(base_url, student_id, auth_credentials)
    ddt_data_file        ← BuildDataDrivenDataset(test_suite, min_rows=8)

    // =========================================================================
    // PHASE 4: DOCUMENTATION & COVERAGE EXPORT
    // =========================================================================
    test_case_docs  ← ExportMarkdownTestCases(test_suite) // TC-<API>-<NNN>.md
    coverage_matrix ← GenerateCoverageMatrix(test_suite, dimensions=["Domain", "State", "Security", "Schema"])
    audit_checklist ← GenerateAuditChecklist(test_suite) // Prepared for Human Review

    RETURN {
        collection: postman_collection,
        environment: postman_environment,
        data_file: ddt_data_file,
        docs: test_case_docs,
        matrix: coverage_matrix,
        audit: audit_checklist
    }
END
```

---

## 3. Key Sub-Routines & Helper Functions

1. `GenerateEquivalencePartitions(schema, params)`:
   - Divides inputs into valid partitions, missing required fields, empty values, type mismatches (string vs number), and malformed formats (e.g., regex email mismatch).
2. `GenerateBoundaryValues(schema, params)`:
   - For string lengths and numeric ranges $[min, max]$, calculates test probes at: $\{min-1, min, min+1, max-1, max, max+1\}$.
3. `BuildPostmanTestScript(test_case)`:
   - Emits standardized JavaScript assertions using `pm.test()`, `pm.expect()`, and `pm.response.to.have.jsonSchema()`.
   - Adds appropriate naming prefix: `Functional:`, `Contract:`, or `Security:`.
4. `GenerateAuditChecklist(test_suite)`:
   - Analyzes heuristic ambiguity to assign AI Confidence ratings (`HIGH`, `MEDIUM`, `LOW`) and leaves structured blank fields for student review verdicts (`VALID`, `INVALID`, `INCOMPLETE`).

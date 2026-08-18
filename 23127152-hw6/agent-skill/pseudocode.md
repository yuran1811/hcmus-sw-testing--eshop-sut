# AI-Driven API Test Generator — Design

**Student ID:** 23127152  
**Bloom-AI Level:** G9.5 (Create)

> Diagram phải **tự thiết kế** — không AI-generate. Export PNG vào `diagram.png`.

---

## 1. Overview

<!-- Mô tả: input = API spec, output = test cases + Postman collection -->

## 2. Architecture Diagram

![Architecture](diagram.png)

<!-- Optional Mermaid source in diagram.mmd -->

## 3. Components

| Component | Responsibility |
|-----------|----------------|
| Spec Parser | Parse `api_specification.md` → structured endpoints |
| Partition Generator | Domain partitions per parameter |
| State Machine Analyzer | Extract transitions (FR-10) |
| Security Test Generator | Map SEC-01–07 to test cases |
| Schema Validator Generator | Response shape assertions |
| Human Review Gate | Audit VALID/INVALID/INCOMPLETE |
| Postman Exporter | Generate collection JSON |

## 4. Pseudocode

```
FUNCTION generate_api_tests(api_spec):
    endpoints = PARSE(api_spec)
    test_cases = []

    FOR EACH endpoint IN endpoints:
        test_cases += GENERATE_DOMAIN_PARTITIONS(endpoint.params)
        test_cases += GENERATE_SCHEMA_TESTS(endpoint.response)
        test_cases += GENERATE_SECURITY_TESTS(endpoint, SEC_REQUIREMENTS)

        IF endpoint HAS state_machine:
            test_cases += GENERATE_STATE_TRANSITIONS(endpoint.states)

    test_cases = HUMAN_AUDIT(test_cases)  // VALID / INVALID / INCOMPLETE
    test_cases += MANUAL_EXTEND(test_cases, min_count=5)

    collection = EXPORT_POSTMAN(test_cases)
    RETURN test_cases, collection
```

## 5. Agent Skill Integration (Optional)

<!-- Mô tả skill file, trigger, demo video link -->

**Demo video:** TBD

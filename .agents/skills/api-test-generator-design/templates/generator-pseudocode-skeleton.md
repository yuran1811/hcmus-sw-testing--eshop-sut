# AI-Driven API Test Generator — Pseudocode Worksheet

**Student ID:** 23127152  
**Diagram tool:** {draw.io | Excalidraw | hand Mermaid | …}  
**Diagram file:** `agent-skill/diagram.png`

---

## Components

| Component | Input | Output |
|-----------|-------|--------|
| SpecParser | api_specification.md | endpoints[] |
| DomainPartitionGen | endpoint.params | TCs |
| StateAnalyzer | states / transitions | TCs |
| SecurityGen | SEC-01…07 + endpoint | TCs |
| SchemaGen | response shape | TCs |
| HumanAuditGate | TC list | labeled + corrected TCs |
| ManualExtend | gaps | ≥5 TCs |
| PostmanExporter | final TCs | collection.json |

---

## Pseudocode

```
FUNCTION generate_api_tests(api_spec, sec_requirements):
    endpoints ← SpecParser.parse(api_spec)
    suite ← []

    FOR endpoint IN endpoints:
        suite ← suite + DomainPartitionGen.run(endpoint)
        IF endpoint.has_states:
            suite ← suite + StateAnalyzer.run(endpoint)
        suite ← suite + SecurityGen.run(endpoint, sec_requirements)
        suite ← suite + SchemaGen.run(endpoint)

    suite ← HumanAuditGate.review(suite)   // VALID | INVALID | INCOMPLETE
    suite ← suite + ManualExtend.at_least(suite, 5)

    collection ← PostmanExporter.export(suite, student_id="23127152")
    RETURN suite, collection
```

---

## Optional Agent Skill wiring

```
hw06-api-testing
  └─ api-test-generate → api-test-audit → api-test-extend → api-test-execute
```

---
name: test-planner
description: Analyzes software specifications and requirements to create structured test plans, identify test scenarios, map traceability, and organize test suites.
---

# Test Case Planner Skill

This skill guides the agent in analyzing functional requirements (FRs), user stories, or API specifications of a System Under Test (SUT) to design a comprehensive and structured Test Plan.

## 1. Input Schema

When asked to plan tests for a module or the entire system, the agent expects the following inputs:

```markdown
### Test Planning Input
- **Target Module/System**: [Name of the module, e.g., Shopping Cart, Authentication]
- **Requirements Document**: [Link or content of the functional specifications, e.g., api_specification.md]
- **Scope Limitations**: [Any specific constraints, out-of-scope features, or priorities]
```

---

## 2. Planning Workflow

The agent must follow this systematic workflow to create the test plan:

### Step 1: Requirements Analysis
- Read the provided specifications carefully.
- Identify all functional requirements (FRs) and assign/extract their unique IDs (e.g., `FR-01`, `FR-02`).
- Highlight business rules, data constraints, calculations, and dependencies between features.

### Step 2: Test Scenario Identification
For each functional requirement, identify three categories of test scenarios:
1.  **Happy Path (Positive Scenarios)**: Standard flows where the user inputs valid data and achieves the intended goal.
2.  **Alternative Path (Edge Scenarios)**: Valid flows that are less common (e.g., applying a maximum discount coupon, checking out with an empty cart notification).
3.  **Error Path (Negative Scenarios)**: Flows where invalid inputs, unauthorized actions, or system limits are triggered, verifying that the system handles errors gracefully.

### Step 3: Prioritization
Assign a priority to each scenario:
- **High (P1)**: Core functionalities (e.g., user login, payment processing, adding items to cart).
- **Medium (P2)**: Important but non-blocking features (e.g., profile editing, filtering products, viewing order history).
- **Low (P3)**: Minor or aesthetic features (e.g., sorting products, profile picture upload, UI responsiveness).

### Step 4: Requirement Traceability Matrix (RTM)
Create a matrix to ensure 100% test coverage of all requirements. Every functional requirement must map to at least one test scenario.

---

## 3. Output Artifacts

The agent must generate a **Test Plan Document** (`tests/test-plans/[module-name]_test_plan.md`) containing:

```markdown
# Test Plan: [Module Name]

## 1. Introduction & Objectives
[Brief description of the module and the goal of this test plan]

## 2. In Scope vs. Out of Scope
- **In Scope**: [List of features to be tested]
- **Out of Scope**: [List of features excluded from this testing cycle]

## 3. Requirement Traceability Matrix (RTM)
| Requirement ID | Requirement Description | Planned Test Scenario IDs | Priority |
| --- | --- | --- | --- |
| FR-01 | [Description] | TS-[ID]-001, TS-[ID]-002 | P1 |

## 4. Detailed Test Scenarios
### [Requirement ID]: [Requirement Name]
- **TS-[ID]-001**: [Scenario Description]
  - **Type**: [Positive/Negative]
  - **Description**: [Details of what is being tested]
- **TS-[ID]-002**: ...
```

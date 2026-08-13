# Agent Skills directory

This directory contains custom **Agent Skills** designed to guide AI coding assistants in automating and executing performance testing, document generation, and accountability reporting.

## Directory Structure

Each skill is organized into its own folder containing a `SKILL.md` (which defines the skill instructions and trigger conditions) and optional supporting assets:

```text
skills/
├── <skill-name>/
│   ├── SKILL.md                 # Main instructions & metadata
│   └── references/              # References, code patterns, and templates
```

---

## Available Skills & Triggers

| Skill Name                                                        | Purpose                                                                                | Trigger Conditions                                                                                        |
| :---------------------------------------------------------------- | :------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| **[perf-scope-planner](./perf-scope-planner/SKILL.md)**           | Map API endpoints to test categories and design an E2E workflow.                       | Triggered when defining the performance testing scope, selecting endpoints, or structuring E2E workflows. |
| **[perf-testplan-generator](./perf-testplan-generator/SKILL.md)** | Generate JMeter (JMX) or k6 scripts for Load, Stress, and Spike tests.                 | Triggered when asking to write/generate test plans, configure thread groups, or setup scenarios.          |
| **[perf-data-generator](./perf-data-generator/SKILL.md)**         | Generate parameterized CSV test data and prevent account lockout.                      | Triggered when creating test credentials, generating CSV input, or database seeding.                      |
| **[perf-jtl-analyzer](./perf-jtl-analyzer/SKILL.md)**             | Parse JTL log files, calculate latencies (p90/p95/p99), and review AI recommendations. | Triggered when analyzing raw JMeter JTL outputs, calculating metrics, or verifying AI interpretations.    |
| **[perf-ai-audit-writer](./perf-ai-audit-writer/SKILL.md)**       | Draft AI Audit Logs and Critique reflections for performance testing.                  | Triggered when documenting AI usage for homework submissions.                                             |
| **[ai-audit-report](./ai-audit-report/SKILL.md)**                 | Maintain a running real-time log of AI prompts and responses.                          | Triggered when logging AI prompts, checklists, designs, and usability reviews in real time.               |
| **[doc_generator](./doc_generator/SKILL.md)**                     | Write proposals, reports, charters, and specifications.                                | Triggered when creating or designing reports that require both MD and PDF outputs.                        |
| **[md-to-pdf](./md-to-pdf/SKILL.md)**                             | Export Markdown files into professional PDF documents.                                 | Triggered when requesting to export markdown files into styled PDFs.                                      |

---

## How to Use

AI Agents automatically discover and load these skills on startup based on the description patterns defined in each `SKILL.md`'s frontmatter.

### For Users

You can explicitly instruct your agent to use a specific skill:

> _"Use the `perf-scope-planner` skill to analyze our API and design the test workflow."_

### For Agents

When a matching task is detected, agents must read the corresponding `SKILL.md` first and follow its instructions exactly.

---
name: api-test-generator-design
description: >-
  Designs an AI-driven API test generator for EShop (HW06 G9.5 Create) with a
  self-drawn architecture diagram and pseudocode — optionally as a reusable
  Agent Skill with demo video. Use when designing the HW06 AI test generator,
  G9.5 Create deliverable, or agent-skill diagram/pseudocode.
---

# API Test Generator Design (HW06 · G9.5)

## Overview

Design (and optionally implement) a generator: **API spec → test cases** covering domain, state, security, schema, with a human audit gate.

**Anti-cheat:** diagram must be **self-drawn** (you make design decisions). Any diagramming tool is fine; the diagram itself must **not** be AI-generated. Mermaid source you author manually is OK; do not ask a model to invent the diagram.

## Outputs

| File | Requirement |
|------|-------------|
| `23127152-hw6/agent-skill/diagram.png` | Self-drawn architecture |
| `23127152-hw6/agent-skill/diagram.mmd` | Optional hand-authored Mermaid |
| `23127152-hw6/agent-skill/pseudocode.md` | Design + pseudocode |
| Optional | Reusable skill under `.agents/skills/` + YouTube demo |

## Design requirements

Pipeline must include:

1. Spec parser  
2. Domain partition generator  
3. State-transition analyzer (when states exist)  
4. Security mapper (SEC-01…07)  
5. Schema assertion generator  
6. **Human audit gate** (VALID/INVALID/INCOMPLETE)  
7. Manual extend hook (≥5)  
8. Exporter (Postman / Markdown / Excel)

Align with skills: `api-test-generate` → `api-test-audit` → `api-test-extend` → `api-test-execute`.

## Process

1. Draft component list and data flow (human).
2. Draw diagram → export PNG.
3. Write pseudocode in `pseudocode.md` (seed already present — refine, don’t replace with AI-only text).
4. Optional: implement as Agent Skill wrapping the four technique skills.
5. Optional: record demo generating tests for **one** API (FR-05 recommended).

## Pseudocode skeleton

Keep structure in [templates/generator-pseudocode-skeleton.md](templates/generator-pseudocode-skeleton.md) — this is a **design worksheet**, not a graded report template from HW5.

## Self-review checklist

- [ ] Diagram self-drawn (declare tool used)
- [ ] Human audit gate visible on diagram
- [ ] Pseudocode matches diagram components
- [ ] Maps to HW06 pipeline techniques

## Common mistakes

- AI image of architecture presented as self-drawn
- Generator that skips security or audit
- Diagram of Postman UI instead of generator design

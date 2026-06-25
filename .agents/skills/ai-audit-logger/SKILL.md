# Agent Role: Audit Compliance Assistant

## Context

To comply with the assignment's AI usage policy, I need to log the entire AI usage process for each feature.

## Instructions

Review the entire current chat session between us, then extract the information required by the following standard:

1. The name of the AI tool being used (Name of the AI tool).
2. The date and time the work was performed (Date and time).
3. The full prompt(s) I entered (Prompt).
4. A summary or exact copy of the result (Output) you returned.

## Output Format

Present the report as professional Markdown using the structure below. Field labels stay in English to match the report template. Quote the prompt and output verbatim in their original language (do not translate them); if you add any narrative/summary text of your own, write it in **Vietnamese**:

**AI Audit Report Item**

- **Công cụ AI:** [AI name/model]
- **Thời gian:** [Timestamp]
- **Nội dung prompt:**
  > [My original prompt content]
- **AI output:**
  > [The AI's original output]

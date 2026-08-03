# HW03 — GUI and Usability Testing
### Assignment Requirements (extracted from 2026_HW03_GUI_Usability_En.pdf)

---

## 1. General Information

| Field | Detail |
|---|---|
| Exercise ID | HW03-AI |
| Duration | 10 hours |
| Deadline | See submission link on Moodle |
| Form | Individual assignment |
| Submission | Moodle (report) |
| Lecturers & TAs | Dr. Lam Quang Vu / Dr. Tran Duy Hoang / MSc. Tran Thi Bich Hanh / MSc. Truong Phuoc Loc / MSc. Ho Tuan Thanh |
| Contact | lqvu@fit.hcmus.edu.vn / tdhoang@fit.hcmus.edu.vn / ttbhanh@fit.hcmus.edu.vn / tploc@fit.hcmus.edu.vn / hthanh@fit.hcmus.edu.vn |
| AI Policy | **Open** — a declaration and an attached AI Audit Report are **mandatory** |
| Required Bloom-AI Level | G9.1 → G9.6, depending on the homework (see CLO Mapping) |

---

## 2. Guiding Principles

- **AI-First strategy.** Apply AI to the testing techniques taught in class — not a single generic prompt ("generate a GUI checklist and find usability problems"). Guide the AI through *every step* of the technique as taught; use AI as a disciplined assistant, not a black box.
- **Human review.** Every AI result must be carefully reviewed by the student, who is fully responsible for correctness. Corrections/refinements are expected. Submitting raw, unreviewed AI output is unacceptable.
- **AI Audit Report.** The entire AI-usage process must be logged completely. Students are encouraged to build Agent Skills to automate this logging. If AI is not used, this must be explicitly declared.
- **Documentation.** The whole working process must be documented in a text-based format (e.g., Markdown).
- **Quality over completion.** Graded on quantity *and* quality of deliverables: checklist, usability-evaluation design/analysis, bug reports, screenshots, participant list, referenced links.

---

## 3. Learning Outcomes

- Design and apply a GUI checklist together with a usability evaluation grounded in the SUT's UI requirements.
- Collect and analyse usability feedback from real users.
- Perform cross-browser and cross-platform testing on the SUT's web frontend and mobile app.
- Demonstrate Bloom-AI competencies at levels **G9.3 (Analyse)** and **G9.4 (Collaborate with AI for exploratory testing)**.

---

## 4. System Under Test (SUT)

- **SUT:** EShop — a Vietnamese e-commerce demo application designed for testing practice.
- **Repository:** https://github.com/ttbhanh/eshop-sut

### Feature Pools

**Pool A — Authentication, Categories, and Products**
- FR-01: Account registration
- FR-02: Login and account lockout
- FR-03: Forgot password and password reset (two steps)
- FR-04: Personal profile management
- FR-05: Product listing and search
- FR-06: Product detail view

**Pool B — Shopping Cart and Checkout**
- FR-07: Shopping cart
- FR-08: Checkout
- FR-09: Discount coupons
- FR-10: Order state machine
- FR-11: Order history view (user)

**Pool C — Web Admin**
- FR-12: Access control
- FR-13: Dashboard
- FR-14: Category management (CRUD)
- FR-15: Product management (CRUD)
- FR-16: Product import from CSV
- FR-17: Coupon management (CRUD)
- FR-18: Order management (admin)
- FR-19: User management (admin)

**Pool D — Mobile App**

### Interface Aspects (IA) — for UI-focused checklist (not numbered FRs)
- **IA-01:** General UI standards
- **IA-02:** Forms
- **IA-03:** Navigation
- **IA-04:** Feedback / state

---

## 5. Scope Selection

- **GUI checklist:** choose one or more SUT screens (e.g., Home, Cart, Checkout, Admin Dashboard, Mobile screen). Minimum = 1 screen, but a single screen won't realistically yield 40 meaningful items — covering several screens is strongly encouraged.
- **Usability evaluation:** choose **one** end-to-end flow (e.g., Sign-up → Add to cart → Checkout with a coupon) — this becomes the Task 2 scenario.
- **No duplication within a group:** no two group members may pick the same primary screen (checklist) or the same usability flow.

---

## 6. Requirements (Tasks)

### Task 1 — GUI Checklist (30 pts)

1. Design a checklist of **more than 40 items** covering all four interface aspects: IA-01 (general UI standards), IA-02 (forms), IA-03 (navigation), IA-04 (feedback/state). Review course lectures on GUI checklists first. Use an AI tool to generate an initial set, then review and add your own items.
2. **Critically review AI-generated items** and add items the AI missed — for each added item, explain *why* the AI missed it (e.g., prompt quality, model limitations, characteristics of the chosen interface). Examples AI often overlooks: accessibility, RTL layout, dark mode (not exhaustive).
3. **Execute the checklist** against the SUT — mark each item Passed/Failed. Add a **Notes** column recording the failure reason for each Failed item. Attach screenshots for **Failed items only**.
4. **Report all bugs** both in the Markdown report and on GitHub Issues, with screenshots attached to each issue.

### Task 2 — Usability Evaluation (40 pts)

Moderated usability evaluation of the chosen end-to-end flow, with **7 real participants** (7 sessions, 1 per participant).

**Phase 1 — Plan & prepare**
- Define objectives (what you want to learn — e.g., navigation bottlenecks, confidence completing the flow).
- Write the task scenario as a realistic, goal-oriented task (not step-by-step instructions). Example: *"Find a winter coat under 500,000 ₫ and check out using a discount coupon."*
- Prepare instruments: SUS or UEQ-S (or justified custom scale) + open-ended probe questions covering at minimum clarity, error recovery, speed, trust.
- Recruit 7 real participants matching the target user profile, with verifiable contact (Zalo/email/phone, middle 4 digits masked). **Must be outside the class** — students enrolled in HW03 are not eligible. Non-IT/non-tester participants preferred (not strict).
- Run a **pilot session** with 1 person first; refine before real sessions.

**Phase 2 — Conduct sessions (1 per participant)**
- Set the stage: tell participant you're testing the *product*, ask them to think aloud.
- Observe neutrally: no leading hints; intervene only if completely stuck.
- Capture evidence: screen recording (+ audio with consent), structured notes on friction/errors/hesitation/frustration.
- Close session: SUS/UEQ-S scale, then probe questions.

**Phase 3 — Analyse & report**
- Score SUS/UEQ-S across all 7 participants.
- Synthesise notes: group pain points; separate isolated bugs from systemic design issues.
- Prioritise by severity (blockers vs. minor complaints).
- Report genuine bugs in Markdown report + GitHub Issues (with screenshots).

> ⚠️ TA may randomly call 2 participants to verify. **Impersonation = 0 points for Task 2.**

### Task 3 — Cross-Browser / Cross-Platform (20 pts)

- Test the web frontend across **at least 3 platforms**.
- Preferred: BrowserStack or LambdaTest trial. If unavailable: Sauce Labs, CrossBrowserTesting, or real physical devices (screenshots must clearly show browser/OS/device name + SUT's localhost URL). Student is responsible for obtaining trial access.
- Cover **Chrome, Firefox, and Safari** (or Android Chrome).
- May also test the mobile app via **Expo Go** on a real phone — this **counts as one of the 3 required platforms** (e.g., replacing Safari), not just a bonus.
- **Every screenshot must overlay the username** in the form `StudentID@hcmus.edu.vn`.

### Task 4 — Agent Skill (10 pts)

- Build Agent Skills that apply the GUI-checklist and usability-evaluation activities, reusable on additional screens/flows.
- Submit skills together with **demonstration videos (YouTube links)** showing end-to-end use of the skills on a complete screen or flow.

---

## 7. Allowed Tools and Bloom-AI Level

- Any AI tool of choice (ChatGPT, Claude, Gemini, Copilot, Cursor, etc.) — must be declared in the AI Audit Report.
- A BrowserStack or LambdaTest trial.
- Required Bloom-AI level: **G9.3 (Analyse)** and **G9.4 (Collaborate)**.

---

## 8. AI Audit Report (Mandatory Appendix)

- If no AI used: declare *"I do not use any AI help in this exercise."*
- If AI used: declare *"I use AI tools for the following tasks,"* and for each interaction record:
  - Name of the AI tool
  - Date and time
  - Your prompt
  - The AI output
- Encouraged: build a skill/rule to auto-extract this info after each AI session.

---

## 9. AI Critique (200–300 words, Mandatory)

Write a paragraph addressing:
- Where did the AI get something wrong, biased, or incomplete?
- Why did it fail to catch the issue?
- What principle did you learn about collaborating with AI in this assignment?

---

## 10. Anti-AI-Cheat Constraints

Must **not** be AI-generated or fabricated (TAs verify during grading):
- The list of 7 participants (name + Zalo/phone, middle 4 digits masked). TA may randomly call 2.
- Cross-platform screenshots (must show student ID + full name in the required overlay form).

---

## 11. Git Commit Log

- New commit for each step of the testing procedure (checklist design, checklist execution, bug logging, each usability session, analysis, etc.).
- Provide the commit log as a text-based file.

---

## 12. Oral Defense

- A random **30% of students** may be invited to a **5–7 minute** oral defense during the week following the deadline.

---

## 13. Submission Regulations

**Filename format:**
```
23127211_HW03_AI_GUIUsability_100.zip
```
- `SelfAssessedGrade`: 3-digit number in range [000, 100].
- Example: `25127001_HW03_AI_GUIUsability_090.zip`

**Required contents of the .zip:**
1. Main report (Markdown + PDF) — includes GUI checklist report and usability evaluation report.
2. Bug report, with screenshots on GitHub Issues page.
3. AI Critique and AI Audit Report (Markdown + PDF).
4. Git commit log (text file).
5. Excel checklist (>40 items) and test summary.
6. Usability-session evidence: task scenario, observation notes, SUS/UEQ-S responses, severity-ranked findings, screen recordings (where available), and the table of 7 participants.
7. Cross-browser / cross-platform screenshots.
8. `README.md` with:
   - Self-assessment table (see §14)
   - Test summary report: number of screens/flows tested; checklist items designed/executed/passed/failed; number of bugs; number of participants; demo videos.
9. Any other supporting materials.

**Submission location:** Moodle. Deadline per submission link.

---

## 14. Assessment Template

| No. | Criteria | Grade | Self-Assessed Grade |
|---|---|---|---|
| 1 | Task 1 — GUI Checklist (design + execution + bug report) | 30 | |
| 2 | Task 2 — Usability Evaluation (task scenario + 7 sessions + analysis) | 40 | |
| 3 | Task 3 — Cross-Browser / Cross-Platform (≥ 3 platforms) | 20 | |
| 4 | Agent Skills | 10 | |
| | **Total** | **100** | |

---

## 15. References

- ISTQB Foundation Level Syllabus (latest edition)
- Hardman, P. (2025). *A Post-AI Learning Taxonomy.*
- Fuster Rabella, M. (2025). *OECD Education Working Paper No. 338.*
- Anthropic (2025). *Building Reliable AI Test Agents* — engineering blog.
- DeepEval & Promptfoo documentation — LLM testing frameworks.

---

## 16. Other Regulations

- **Late submission is not permitted.**
- **Missing any required document → 0 points.**
- **Copying between students (including prompts) → 0 points for both parties.**

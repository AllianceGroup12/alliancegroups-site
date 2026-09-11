---
name: conductor-review
description: >-
  Audit completed work against guidelines, specifications, acceptance criteria, and quality standards.
  Use when auditing completed track work, performing code reviews, or generating track verification reports.
---

# 🔍 Conductor Review Skill

The `conductor-review` skill audits work completed under a Conductor track (`conductor/tracks/<track_id>/`). It verifies code diffs against the track specification (`spec.md`), acceptance criteria, project context (`conductor/setup.md`), and repository quality/lint/test standards.

---

## 📋 Execution Protocol

### Step 1: Gather Review Context
1. Load `conductor/setup.md` and the active track's `spec.md` and `plan.md`.
2. Inspect uncommitted or committed changes for the track using `git diff` or `git status`.
3. Verify that all tasks in `plan.md` are marked `- [x]`.

### Step 2: Perform Multi-Dimension Audit

#### Audit Checklist:
1. **Spec Alignment**: Does the implementation meet all functional requirements (FRs) and user stories in `spec.md`?
2. **Acceptance Criteria**: Are all acceptance criteria checkboxes satisfied with verified empirical evidence?
3. **Code Quality & Architecture**: Does the implementation follow patterns in `conductor/setup.md` (no forbidden anti-patterns, clean component boundaries)?
4. **Automated Verification**: Do all unit, integration, and linter suites pass without warnings or errors?
5. **Security & Accessibility**: Are input validations, authentication checks, and a11y standards met?

### Step 3: Generate Audit Report (`conductor/tracks/<track_id>/review.md`)
Create a comprehensive audit document:

```markdown
# 🔍 Conductor Audit Report: <Track Title>

- **Track ID:** `<track_id>`
- **Audit Date:** YYYY-MM-DD
- **Audit Status:** `<PASSED | NEEDS_REMEDIATION>`

---

## 📊 Summary of Findings
- **Spec Compliance:** 100%
- **Test Suite Status:** PASSING (0 errors, 0 failures)
- **Lint / Code Quality:** PASSING

---

## ✅ Verified Requirements & Acceptance Criteria
- [x] FR-1: `<detail>` - Verified via test suite
- [x] AC-1: `<detail>` - Manually & automatically verified

---

## ⚠️ Remediation / Recommendations (If Any)
- Item 1: `<description>`
```

### Step 4: Finalize Track State
If audit passes:
- Update track status in `plan.md` and `spec.md` to `Approved`.
- Offer to prepare commit or merge instructions.
If audit fails:
- Mark required remediation tasks in `plan.md` and solicit fixes via `conductor-implement`.

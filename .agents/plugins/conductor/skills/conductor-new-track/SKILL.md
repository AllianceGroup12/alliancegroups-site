---
name: conductor-new-track
description: >-
  Create feature or bug tracks with specifications and actionable implementation plans.
  Use when initiating a new track, drafting specs, or creating task plans in conductor/tracks/<track_id>/.
---

# 🎼 Conductor New Track Skill

The `conductor-new-track` skill interactively creates a new development track in `conductor/tracks/<track_id>/`. A track consists of a functional specification (`spec.md`) and a phased task breakdown plan (`plan.md`).

---

## 📋 Execution Protocol

### Step 1: Gather Track Intent & Metadata
1. If the user hasn't specified track details, use `ask_question` to gather track intent:
   - Track Name / Slug (e.g. `001-user-auth`, `002-fix-login-modal`)
   - Track Category (`Feature`, `Bug Fix`, `Refactor`, `Performance Optimization`)
   - High-level goals & target components

2. Generate a padded track ID (e.g. `001-feature-name`, `002-bug-name`). Check `conductor/tracks/` to avoid numbering collisions.

### Step 2: Draft Track Specification (`conductor/tracks/<track_id>/spec.md`)
Create `spec.md` with the following structure:

```markdown
# 📄 Track Specification: <Track Title>

- **Track ID:** `<track_id>`
- **Category:** `<Feature | Bug Fix | Refactor>`
- **Status:** `Draft`
- **Created Date:** YYYY-MM-DD

---

## 🎯 1. Executive Summary & Goals
Brief summary of what this track accomplishes and why.

---

## 👤 2. User Stories & Functional Requirements
- **US-1:** As a `<role>`, I want to `<action>` so that `<benefit>`.
- **FR-1:** `<Requirement detail>`
- **FR-2:** `<Requirement detail>`

---

## 📐 3. Technical Design & Affected Components
- **Modified Components:** `[path/to/file1.ext](file:///path/to/file1.ext)`
- **New Components:** `[path/to/newfile.ext](file:///path/to/newfile.ext)`
- **Data Models / API Changes:** `<details>`

---

## ✅ 4. Acceptance Criteria
- [ ] Criteria 1
- [ ] Criteria 2
```

### Step 3: Draft Task Breakdown Plan (`conductor/tracks/<track_id>/plan.md`)
Create `plan.md` with phased, actionable check-item tasks:

```markdown
# 📋 Track Implementation Plan: <Track Title>

- **Track ID:** `<track_id>`
- **Status:** `Pending`

---

## 🚩 Phase 1: Foundation & Pre-requisites
- [ ] Task 1.1: Setup component baseline
- [ ] Task 1.2: Define data structures / types

---

## 🚀 Phase 2: Core Feature / Bug Fix Implementation
- [ ] Task 2.1: Modify core logic in `[path/to/file](file:///path/to/file)`
- [ ] Task 2.2: Add UI rendering and interactive states

---

## 🧪 Phase 3: Verification & Integration
- [ ] Task 3.1: Run unit and integration tests
- [ ] Task 3.2: Verify visual UI and responsiveness

---

## 📝 Phase 4: Review & Documentation
- [ ] Task 4.1: Perform spec audit (`conductor-review`)
- [ ] Task 4.2: Update project documentation
```

### Step 4: Sync with Planning Mode
Create or update the `implementation_plan.md` artifact in the active conversation to summarize the new track for immediate user feedback.

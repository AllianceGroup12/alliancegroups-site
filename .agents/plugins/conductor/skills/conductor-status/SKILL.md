---
name: conductor-status
description: >-
  Display project progress across all active and completed Conductor tracks.
  Use when summarizing track status, viewing project progress, or checking track completion metrics.
---

# 📊 Conductor Status Skill

The `conductor-status` skill aggregates and displays project-wide progress across all Conductor tracks in `conductor/tracks/`. It provides a consolidated dashboard of active, pending, blocked, and completed tracks, task completion percentages, and next steps.

---

## 📋 Execution Protocol

### Step 1: Scan Workspace Tracks
1. Inspect `conductor/setup.md` to confirm project setup baseline.
2. List all track subdirectories in `conductor/tracks/` using `list_dir`.
3. Read `plan.md` and `spec.md` for each track to aggregate metrics:
   - Total tasks
   - Completed tasks (`- [x]`)
   - In-progress tasks (`- [in-progress]`)
   - Pending tasks (`- [ ]`)
   - Blocked tasks (`- [blocked]`)

### Step 2: Compute Metrics & Overall Completion
- Compute completion percentage per track: `(completed / total) * 100`.
- Compute overall project progress metric across all tracks.

### Step 3: Output Conductor Status Dashboard

Render a clean Markdown summary table:

```markdown
# 📊 Conductor Project Progress Dashboard

**Project Baseline:** `[conductor/setup.md](file:///path/to/conductor/setup.md)`
**Total Tracks:** 3 | **Overall Completion:** 68%

---

## 🎼 Track Progress Breakdown

| Track ID | Track Name | Category | Status | Progress | Actionable Next Task |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `001-user-auth` | User Authentication | Feature | `In Progress` | `[██████░░░░] 60%` | Task 2.2: Add OAuth Google login |
| `002-fix-modal` | Fix Login Modal | Bug Fix | `Completed` | `[██████████] 100%` | Audited (`conductor-review`) |
| `003-refactor-db` | Database Refactor | Refactor | `Pending` | `[░░░░░░░░░░] 0%` | Task 1.1: Schema migration draft |

---

## 💡 Quick Actions
- To create a new track: Run `conductor-new-track`
- To resume execution: Run `conductor-implement`
- To audit completed track: Run `conductor-review`
```

### Step 4: User Solicitations
If active in-progress tasks exist, offer the user a choice via `ask_question` to jump straight into implementing the next pending task.

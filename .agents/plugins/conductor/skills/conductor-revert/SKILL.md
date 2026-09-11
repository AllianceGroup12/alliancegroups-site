---
name: conductor-revert
description: >-
  Git-aware rollback of tracks, phases, or specific tasks with safety verifications and uncommitted data protection.
  Use when rolling back changes, discarding track modifications, or reverting to a previous clean state.
---

# ⏪ Conductor Revert Skill

The `conductor-revert` skill provides git-aware, safe rollback mechanisms for Conductor tracks, track phases, or individual tasks. It integrates data loss prevention rules to protect uncommitted developer work before executing git rollback operations.

---

## 📋 Execution Protocol

### Step 1: Data Loss & Working Tree Audit
1. Run `git status --porcelain` to check for uncommitted changes in the workspace.
2. Inspect `git diff` to understand what changes would be impacted.
3. Obey the `accidental-data-loss-prevention` skill rules: NEVER delete or reset uncommitted files without explicit user consent.

### Step 2: Determine Rollback Scope
Prompt the user using `ask_question` to confirm the desired rollback level:

```text
Question: Select the rollback scope for the current track:
Options:
- (Recommended) Roll back uncommitted changes for current in-progress task
- Revert entire active track phase (restore files to phase baseline)
- Complete track rollback (clean up track branch/stash & revert spec/plan to Pending)
```

### Step 3: Execute Rollback Operation

#### Level 1: Single Task Revert
- Revert specific files modified during the task (`git checkout -- <file_paths>`).
- Update task status in `plan.md` from `- [in-progress]` back to `- [ ]`.

#### Level 2: Phase Revert
- Revert files modified across the targeted phase.
- Update phase tasks in `plan.md` back to `- [ ]`.

#### Level 3: Full Track Revert
- Stash or create a backup commit of track work (`git stash save "conductor-backup-<track_id>"`).
- Revert or remove files created under `conductor/tracks/<track_id>/` if explicitly requested.

### Step 4: Verification & Logging
1. Run `git status` to confirm the working tree is in the expected clean state.
2. Log the rollback event in `plan.md` under `### Execution Notes`.
3. Present confirmation to the user.

---
name: conductor-implement
description: >-
  Execute tasks from a track plan with real-time status updates ([ ], [in-progress], [x]), error logging, and verification.
  Use when executing active track tasks in conductor/tracks/<track_id>/plan.md.
---

# ⚙️ Conductor Implement Skill

The `conductor-implement` skill executes tasks defined in an active track plan (`conductor/tracks/<track_id>/plan.md`). It maintains atomic task status transitions, updates status markers in real-time, executes required code modifications, runs automated verification tests, and logs execution notes.

---

## 📋 Execution Protocol

### Step 1: Select Active Track & Task
1. Inspect `conductor/tracks/` to find available tracks.
2. Read the active track's `plan.md`.
3. Locate the next uncompleted task (`- [ ] Task ...`).
4. If multiple pending tasks exist, present options to the user using `ask_question` or proceed sequentially with the recommended task.

### Step 2: Transition Task to In-Progress
Update `plan.md` using `replace_file_content`:
- Change `- [ ] Task description` to `- [in-progress] Task description`.
- Set overall track status to `In Progress` if it was `Pending`.

### Step 3: Execute Code Changes
1. Read relevant source files and schemas using `view_file` or `grep_search`.
2. Apply precise modifications using `replace_file_content` or `multi_replace_file_content`.
3. If new files are required, write them using `write_to_file`.

### Step 4: Verification & Error Recovery
1. Run automated build/test commands using `run_command` (e.g. `npm test`, `dart test`, `pytest`, `cargo test`, `go test`).
2. **If verification passes:**
   - Update `plan.md`: change `- [in-progress] Task description` to `- [x] Task description`.
   - Update `walkthrough.md` artifact with changes made and test output proof.
3. **If verification fails:**
   - Append failure details under `### Execution Notes` in `plan.md`.
   - Investigate error logs silently and apply fixes before retrying.
   - Do NOT mark task as `- [x]` until clean verification is obtained.

### Step 5: Progress Checkpoint & Turn End
- Present a real-time status report of completed and remaining tasks in the active track.
- If all tasks in all phases are `- [x]`, update track status in `plan.md` to `Completed` and suggest running `conductor-review`.

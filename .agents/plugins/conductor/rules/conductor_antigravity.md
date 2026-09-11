# Conductor UX Rules for Google Antigravity

This rule governs the interactive UX, modal usage, file structure, and CLI fallbacks when running Conductor workflows in Google Antigravity.

---

## 🎭 1. Interactive GUI Modals vs. CLI Fallbacks

### Rule 1.1: Prefer Native GUI Modals (`ask_question`) for Decision Points
When soliciting user input for:
- Track type selection (Feature vs Bug vs Refactor)
- Scope clarification and tech stack options
- Selecting which task to execute next in `conductor-implement`
- Confirming rollbacks in `conductor-revert`
- Approving spec audit remediation steps in `conductor-review`

You **MUST** use the `ask_question` tool to present structured, interactive options to the user rather than dumping prose questions into chat.

### Rule 1.2: Option Formatting Guidelines
When constructing `ask_question` options:
- Place the recommended choice first and prefix with `(Recommended)`.
- Format options as direct user responses (e.g., `"Option A: Proceed with sequential task execution"`).
- Do NOT enumerate options manually or add custom "Other" options (the Antigravity UI automatically handles write-ins and option numbering).
- Keep descriptions clear, concise, and actionable.

### Rule 1.3: Non-Interactive & Headless CLI Fallbacks
If `ask_question` is un-invokable (e.g., headless background task, CLI mode, or pre-scripted execution), fallback gracefully to non-blocking console outputs or pick the recommended default path while updating the track status file.

---

## 📁 2. Track Workspace Hierarchy & Persistence

All Conductor track state must be persisted in standard workspace locations:

- **Global Project Context**: `conductor/setup.md`
- **Track Files Directory**: `conductor/tracks/<track_id>/`
  - `spec.md`: Detailed specification, user stories, acceptance criteria, non-functional requirements.
  - `plan.md`: Actionable task list divided into logical phases, using markdown check boxes:
    - `- [ ] Task description` (Pending)
    - `- [in-progress] Task description` (Currently active)
    - `- [x] Task description` (Completed)
    - `- [blocked] Task description` (Blocked by dependency)

---

## 🔄 3. State Management & Real-time Progress Tracking

### Rule 3.1: Atomic Task Updates
Before beginning work on any task in `plan.md`:
1. Mark the target task as `- [in-progress]` in `plan.md`.
2. Perform code modifications using standard file editing tools.
3. Run verification scripts (`run_command` or project build/test runners).
4. Upon successful verification, update the task state to `- [x]`.
5. If verification fails, log failure reason in `plan.md` under a `### Execution Notes` section.

### Rule 3.2: Artifact Integration
Always sync track progress with Antigravity artifacts:
- Use `implementation_plan.md` for overall track proposals during planning phase.
- Use `walkthrough.md` to document completed changes and verification evidence upon track review.

---

## 🛡️ 4. Safety & Data Loss Prevention

### Rule 4.1: Git Safety Checkpoints
Before running any destructive operation in `conductor-revert`:
- Run `git status --porcelain` to verify if uncommitted changes exist.
- Prompt the user via `ask_question` before stash, checkout, or reset operations that would discard uncommitted changes.
- Obey the `accidental-data-loss-prevention` skill guidelines at all times.

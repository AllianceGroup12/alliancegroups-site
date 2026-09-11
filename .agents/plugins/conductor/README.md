# Conductor Plugin for Google Antigravity (v0.3.0)

**Conductor** is a structured multi-track development lifecycle manager designed for Google Antigravity. It empowers agentic AI pair programmers to plan, execute, review, revert, and track feature and bug work with structured persistence and interactive user feedback.

---

## 🚀 Overview

Conductor breaks down complex software development into isolated, tracked workflows called **Tracks**. Each track contains explicit specifications, breakdown plans, real-time status updates, audit reviews, and git-aware rollback checkpoints.

### Key Capabilities

- **Context Setup (`conductor-setup`)**: Initialize project-level domain knowledge, architecture patterns, tech stack details, and coding conventions into `conductor/setup.md`.
- **Track Planning (`conductor-new-track`)**: Create feature or bug tracks with specification (`spec.md`) and actionable task breakdown (`plan.md`).
- **Interactive Execution (`conductor-implement`)**: Step through track plans with real-time status updates (`[ ]`, `[in-progress]`, `[x]`), automated verification, and error logging.
- **Spec Auditing (`conductor-review`)**: Audit completed work against track requirements, codebase guidelines, and automated tests.
- **Git-Aware Rollbacks (`conductor-revert`)**: Roll back specific tasks, track phases, or entire tracks safely using Git integration.
- **Project Progress Dashboard (`conductor-status`)**: Visualize all active, blocked, and completed tracks across the project workspace.

---

## 📁 Plugin Architecture

```text
conductor/
├── plugin.json                 # Plugin manifest & metadata
├── VERSION                     # Version declaration (0.3.0)
├── README.md                   # Plugin documentation & usage guide
├── rules/
│   └── conductor_antigravity.md # Antigravity interactive UX & modal fallback rules
└── skills/
    ├── conductor-setup/
    │   └── SKILL.md            # Project baseline initialization protocol
    ├── conductor-new-track/
    │   └── SKILL.md            # Interactive track creation (spec & plan)
    ├── conductor-implement/
    │   └── SKILL.md            # Task-by-task execution engine
    ├── conductor-review/
    │   └── SKILL.md            # Audit & compliance verifier
    ├── conductor-revert/
    │   └── SKILL.md            # Git-aware rollback protocol
    └── conductor-status/
        └── SKILL.md            # Multi-track progress aggregator
```

---

## 🛠️ Track Directory Structure

When Conductor is activated in a workspace, track files and project baselines are stored in `conductor/`:

```text
conductor/
├── setup.md                    # Project context, tech stack, and conventions
└── tracks/
    ├── 001-user-auth/
    │   ├── spec.md             # Functional specs & requirements
    │   └── plan.md             # Task breakdown & status tracker
    └── 002-fix-login-modal/
        ├── spec.md
        └── plan.md
```

---

## 🚀 Quick Start & Installation

```bash
# 1. Install in Antigravity
agy plugins install https://github.com/gemini-cli-extensions/conductor
```

### Slash Commands Workflow

```bash
# 2. Set up the project (run once)
/conductor:conductor-setup

# 3. Create a new feature or bug track
/conductor:conductor-new-track "Add a dark mode toggle to the settings page"

# 4. Implement the track
/conductor:conductor-implement

# 5. Check status, review, or revert as needed
/conductor:conductor-status
/conductor:conductor-review
/conductor:conductor-revert
```

---

## 🎯 Commands & Skill Triggers

| Slash Command | Skill | Description |
| :--- | :--- | :--- |
| `/conductor:conductor-setup` | `conductor-setup` | Scans workspace and builds `conductor/setup.md` |
| `/conductor:conductor-new-track` | `conductor-new-track` | Interactively creates a new feature/bug track (`spec.md` + `plan.md`) |
| `/conductor:conductor-implement` | `conductor-implement` | Executes planned tasks sequentially with live status updates |
| `/conductor:conductor-review` | `conductor-review` | Audits diffs against track spec and guidelines |
| `/conductor:conductor-revert` | `conductor-revert` | Safely rolls back tasks, phases, or full tracks using Git |
| `/conductor:conductor-status` | `conductor-status` | Displays project progress dashboard |


---

## 📄 License

MIT License. Developed for Google Antigravity.

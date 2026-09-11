---
name: conductor-setup
description: >-
  Protocol for initializing project context (product domain, tech stack, workspace layout, workflows, and conventions).
  Use when initializing Conductor in a workspace or updating project baseline specifications in conductor/setup.md.
---

# 🎺 Conductor Setup Skill

The `conductor-setup` skill scans the current workspace to discover project domain knowledge, tech stack details, architecture, dependencies, build/test toolchains, and developer conventions. It consolidates this information into `conductor/setup.md` as the canonical project baseline.

---

## 📋 Execution Protocol

### Step 1: Workspace Discovery & Telemetry
1. Inspect the workspace root directory using `list_dir`.
2. Locate core manifests (e.g. `package.json`, `firebase.json`, `pubspec.yaml`, `go.mod`, `Cargo.toml`, `pyproject.toml`, `requirements.txt`, `CMakeLists.txt`, `Makefile`, etc.).
3. Identify existing test scripts, lint configs (`.eslintrc`, `l10n.yaml`, `.prettierrc`), deployment targets, and directory structures.
4. Run `git status` or `git log -n 5` to inspect recent branch history and commit conventions.

### Step 2: Interactive Context Solicitations (Optional)
If key product domain questions or architectural nuances are underspecified or ambiguous, prompt the user using `ask_question`:

```text
Question: What is the primary focus of this project context initialization?
Options:
- (Recommended) Full stack audit & complete setup (Product domain, Tech Stack, Guidelines, Workflows)
- Quick scan focused on Tech Stack & Build/Test tooling only
- Custom domain specification setup
```

### Step 3: Generate `conductor/setup.md`
Create or update `conductor/setup.md` using the following standardized schema:

```markdown
# 🧭 Conductor Project Context Setup

**Last Updated:** YYYY-MM-DD
**Workspace Root:** `<workspace_path>`

---

## 🎯 1. Product Overview & Domain Context
- **Project Name:** `<name>`
- **Description:** `<summary>`
- **Key Modules/Capabilities:**
  - `<module_1>`: `<description>`
  - `<module_2>`: `<description>`

---

## 🛠️ 2. Tech Stack & Architecture
- **Language / Runtime:** `<languages_and_versions>`
- **Frameworks & Libraries:** `<frameworks>`
- **Database / Storage:** `<storage_services>`
- **Hosting / Cloud Infrastructure:** `<cloud_services>`

---

## 🧪 3. Toolchain & Development Workflows
- **Build Command:** `<build_cmd>`
- **Dev Server Command:** `<dev_cmd>`
- **Test Command:** `<test_cmd>`
- **Lint / Code Quality Command:** `<lint_cmd>`

---

## 📐 4. Coding Guidelines & Conventions
- **Code Style & Formatting:** `<style_rules>`
- **State Management Pattern:** `<state_patterns>`
- **Error Handling & Logging Protocol:** `<error_patterns>`
- **Git Branching & Commit Message Format:** `<git_rules>`
```

### Step 4: Verification & Feedback
1. Confirm that `conductor/setup.md` exists and is properly populated.
2. Present a summary of the project setup to the user with clickable file link `[conductor/setup.md](file:///path/to/conductor/setup.md)`.

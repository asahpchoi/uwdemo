<!--
Sync Impact Report:
- Version change: 1.0.0 -> 1.1.0
- Added sections:
  - Core Principles: VI. Package Management
- Removed sections: None
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md
  - ✅ .specify/templates/spec-template.md
  - ✅ .specify/templates/tasks-template.md
  - ✅ .gemini/commands/speckit.analyze.toml
  - ✅ .gemini/commands/speckit.checklist.toml
  - ✅ .gemini/commands/speckit.clarify.toml
  - ✅ .gemini/commands/speckit.constitution.toml
  - ✅ .gemini/commands/speckit.implement.toml
  - ✅ .gemini/commands/speckit.plan.toml
  - ✅ .gemini/commands/speckit.specify.toml
  - ✅ .gemini/commands/speckit.tasks.toml
- Follow-up TODOs: None
-->
# uwdemo Constitution

## Core Principles

### I. Library-First
Every feature starts as a standalone library; Libraries must be self-contained, independently testable, documented; Clear purpose required - no organizational-only libraries.

### II. CLI Interface
Every library exposes functionality via CLI; Text in/out protocol: stdin/args → stdout, errors → stderr; Support JSON + human-readable formats.

### III. Test-First (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced.

### IV. Integration Testing
Focus areas requiring integration tests: New library contract tests, Contract changes, Inter-service communication, Shared schemas.

### V. Simplicity
Start simple, YAGNI principles.

### VI. Package Management
MUST use `yarn` for all package management. `npm` or other package managers are not permitted. This ensures consistency in dependency resolution and lockfile management.

## Additional Constraints

Technology stack requirements, compliance standards, deployment policies, etc.

## Development Workflow

Code review requirements, testing gates, deployment approval process, etc.

## Governance

Constitution supersedes all other practices; Amendments require documentation, approval, migration plan. All PRs/reviews must verify compliance; Complexity must be be justified.

**Version**: 1.1.0 | **Ratified**: 2025-10-07 | **Last Amended**: 2025-10-07

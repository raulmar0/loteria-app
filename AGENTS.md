# AGENTS.md

Guidance for AI coding agents working in this repository.

## Bump the version on every push

**Before every push, bump the app version in `package.json` following [semver](https://semver.org).**
Use your judgment for which part to increment, based on what the changes since the
last push actually do.

### Where the version lives

`package.json` → `"version"` is the **single source of truth**. It is injected at
build time as `__APP_VERSION__` (see `vite.config.ts`) and shown to users in the
Settings sheet (`src/components/SettingsSheet.tsx`). Bumping `package.json` is all
that's needed — do not hardcode the version anywhere else.

### How to choose the bump (judgment, not a formula)

This app is pre-1.0 (`0.x.y`), so the practical convention is:

- **Patch** (`0.1.0` → `0.1.1`) — bug fixes, copy/style tweaks, icon/asset polish,
  refactors, and other changes with no new user-facing capability.
- **Minor** (`0.1.0` → `0.2.0`) — a new feature or a noticeable behavior change
  (new screen, new setting, new game mode, etc.).
- **Major** (`0.x` → `1.0.0`) — reserved for the first stable release or a
  deliberate breaking change. Don't reach for this on routine work.

When a push mixes several changes, bump for the most significant one.

### Workflow

1. Make your changes.
2. Pick the semver bump and update `package.json` (`npm version <patch|minor|major>
   --no-git-tag-version` is fine, or edit the field directly).
3. Include the version bump in the same commit/push as the work it describes.
4. Push.

## Other conventions

- Commit messages and code comments are written in **English**; the app UI itself is
  bilingual (Spanish/English).
- `main` is a protected branch (no force-push, admins included). Land work via normal
  pushes/PRs.

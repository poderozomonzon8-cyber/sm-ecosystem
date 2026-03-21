# System Patterns & Conventions

*This file is the single source of truth for recurring patterns, conventions, and technical standards in this project.*

## Purpose

Documents the established architecture patterns, coding conventions, and technical standards the project follows. This file exists so the agent (and future sessions) can produce consistent code without re-discovering or re-debating how things are done here.

## When to Update This File

Update this file when:
- A new architectural pattern is introduced or adopted (e.g., repository pattern, event-driven flow)
- A coding convention is established that deviates from language defaults
- A reusable approach is identified and should be applied consistently (error handling, logging, validation)
- A pattern is deprecated or replaced by a better approach
- A new integration point is added that follows (or defines) a standard interface
- File/folder structure conventions change

**Do not** document one-off implementations. Only patterns that should be **replicated** across the codebase belong here.

## Format

Organize patterns by category. Each pattern follows this structure:

```
### [Pattern Name]

**Category:** Architecture | Data Flow | Error Handling | Testing | API Design | File Structure | [Other]
**Status:** Active | Deprecated
**Description:** What the pattern is and when to apply it.
**Implementation:**
[Code example or step-by-step description]
**Rationale:** Why this pattern was chosen.
```

When a pattern is **deprecated** you can either delete it or update its status and note the replacement.

If this file gets corrupted, re-create it. 
CRITICAL: Keep this file under 300 lines. You are allowed to summarize, change the format, delete entries, etc., in order to keep it under the limit.

---

## Architecture

<!-- Patterns related to high-level system structure -->

## Data Flow

<!-- Patterns for how data moves through the system -->

## Error Handling

<!-- Standard approaches to errors, validation, and recovery -->

### IntersectionObserver Stagger Reveal

**Category:** Data Flow
**Status:** Active
**Description:** All sections use IntersectionObserver + CSS classes (`stagger-child` / `visible`) for entrance animations. Apply `stagger-child` on mount, set `data-delay` for per-item delays, add `visible` class when intersecting.
**Rationale:** Performant, no library needed, fully CSS-transition based.

### Canvas 3D Without WebGL

**Category:** Architecture
**Status:** Active
**Description:** ThreeDContainer uses a pure 2D canvas with manual perspective projection (rotX/rotY/project helpers). No Three.js to avoid reconciler issues in Sandpack.
**Implementation:** Build geometry as Vec3 arrays, transform per frame, project to 2D with a simple FOV formula.
**Rationale:** Sandpack cannot reliably bundle @react-three/fiber; vanilla canvas is always safe.

### SDK Data + Static Fallback Pattern

**Category:** Data Flow
**Status:** Active
**Description:** All data-driven components use `useQuery('EntityName')` for live data. If `data` is empty or undefined during loading, a static `FALLBACK_*` array is shown so the UI is never blank.
**Implementation:** `const items = (data && data.length > 0) ? data : FALLBACK_ITEMS;`
**Rationale:** Pages look great immediately (before any data is seeded) and gracefully upgrade once real data exists.

### Fluid Responsive Typography

**Category:** Architecture
**Status:** Active
**Description:** Use `clamp()`-based CSS classes (`.text-fluid-*`) defined in index.css rather than Tailwind responsive prefixes for headline sizes. This ensures natural scaling across all viewport widths.

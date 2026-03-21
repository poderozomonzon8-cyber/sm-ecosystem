# System Decisions

*This file is the single source of truth for architectural and implementation decisions in this project.*

## Purpose

Records key technical decisions, their rationale, alternatives considered, and outcomes. This file prevents the same discussions from happening twice and helps future-you (or future-sessions) understand *why* things are the way they are.

## When to Update This File

Update this file when:
- A significant technical or architectural decision is made
- A library, framework, or tool is chosen over alternatives
- A design pattern or approach is selected for a non-trivial problem
- A previous decision is revisited, changed, or reversed
- A constraint or trade-off is discovered that shaped the implementation
- A workaround is chosen due to external limitations (API quirks, library bugs, etc.)

**Do not** log trivial decisions (variable naming, minor formatting). If it wouldn't be worth explaining to a teammate joining the project, skip it.

## Format

Each entry follows this structure:

```
### [YYYY-MM-DD] — [Short Decision Title]

**Status:** Accepted | Superseded | Deprecated
**Context:** Why this decision was needed. What problem or question triggered it.
**Decision:** What was decided.
**Alternatives Considered:**
- [Alternative A] — Why it was rejected.
- [Alternative B] — Why it was rejected.
**Consequences:** What this decision enables, constrains, or risks.
```

If this file gets corrupted, re-create it. 
CRITICAL: Keep this file under 300 lines. You are allowed to summarize, change the format, delete entries, etc., in order to keep it under the limit.

---

## Decisions

### 2026-03-15 — Router Lock Strategy

**Status:** Accepted
**Context:** Theme changes, animation upgrades, and UI iteration were silently at risk of modifying the router tree and breaking navigation.
**Decision:** App.tsx carries a `ROUTER LOCK` header comment and is rebuilt from scratch with all verified routes. AnimationProvider and ThemeAnimationBridge were injected into index.tsx. CommunityManagerPanel was wired into AdminShell. Dead `/reviews` link fixed in ReviewsSection. Incorrect `alias` field removed from package.json.
**Consequences:** The router is stable and locked. Future feature additions must only add imports + Route entries and must not reorder, rename, or remove existing routes.

### 2026-03-15 — SDK as Single Data Layer

**Status:** Accepted
**Context:** Needed a persistent, real-time data layer for Projects, Clients, Employees, Media, Blog, Store, and CommunityPosts without a custom backend.
**Decision:** Use `@animaapp/playground-react-sdk` with `useQuery`/`useMutation`/`useAuth` throughout. All components use SDK hooks; static arrays serve only as graceful fallbacks when the DB is empty.
**Alternatives Considered:**
- Zustand local state — no persistence across sessions.
- Custom REST API — out of scope for this environment.
**Consequences:** All data is persistent and automatically synced. Admin panels instantly reflect DB state. Client portal uses `useAuth` for real authentication.

### 2026-03-15 — Billing Visual Editor: Pure React State, No External DnD

**Status:** Accepted
**Context:** Full visual document editor needed without risking Sandpack bundler incompatibilities from drag-and-drop libraries.
**Decision:** Implement the document editor as a two-column left (controls) / right (live preview) layout. Section tabs (Items / Company / Client / Terms / Style) replace spatial drag-and-drop. Preview re-renders synchronously from state.
**Consequences:** Editor is fully functional and performant; structural DnD can be layered in later without breaking anything.

### 2026-03-15 — In-Browser SVG Charts

**Status:** Accepted
**Context:** Recharts and Chart.js both have reconciler issues in Sandpack environments.
**Decision:** Build all charts (BarChart, LineChart, DonutChart) as pure SVG components using direct path/rect math. No chart library dependency.
**Consequences:** Zero external dependencies, always renders. Charts are functional; interactivity (tooltips, zoom) can be added incrementally.

### 2026-03-15 — Multi-Page Architecture

**Status:** Accepted
**Context:** Expanding from a single-scroll landing page to a full multi-page ecosystem required a routing strategy.
**Decision:** Keep react-router-dom. Each public page wraps content in `PageShell` (HeaderNav + Footer). Admin stays as a full-screen SPA panel switcher.
**Consequences:** Clean URL structure (/services, /portfolio, /store, etc.). HeaderNav now uses `<Link>` instead of scroll anchors. Home page retains section-scroll behavior.

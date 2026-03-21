<instructions>
## 🚨 MANDATORY: CHANGELOG TRACKING 🚨

You MUST maintain this file to track your work across messages. This is NON-NEGOTIABLE.

---

## INSTRUCTIONS

- **MAX 5 lines** per entry - be concise but informative
- **Include file paths** of key files modified or discovered
- **Note patterns/conventions** found in the codebase
- **Sort entries by date** in DESCENDING order (most recent first)
- If this file gets corrupted, messy, or unsorted -> re-create it. 
- CRITICAL: Updating this file at the END of EVERY response is MANDATORY.
- CRITICAL: Keep this file under 300 lines. You are allowed to summarize, change the format, delete entries, etc., in order to keep it under the limit.

</instructions>

<changelog>
<!-- NEXT_ENTRY_HERE -->

## 2026-03-16 — Add-to-Bill: Push Project Add-ons Directly into Billing Documents
- `AdminShell.tsx` `ProjectsPanel` billing tab: new "+ Add to Bill" button opens modal with full add-on flow
- Modal lets admin pick any linked billing document, choose add-on type (Payment/Income, Expense, Labor, Custom), set qty/unit/unit price with live line total preview
- Labor type shows quick-fill chips per assigned employee (pre-filled from HourEntry totals); Expense type shows recent project expenses as one-click fills
- On save: new line appended to `lineItems` JSON, `subtotal`/`taxAmount`/`discountAmount`/`total` recalculated and saved via `updateDoc`; income/expense DB records also created for Payment and Expense type add-ons
- Added `createIncome` mutation to `ProjectsPanel`

## 2026-03-16 — Analytics, Messaging Hub & Scheduling Calendar — Full Build
- `src/admin/AnalyticsPanel.tsx`: NEW — real KPIs from DB: lead pipeline funnel (stages + conversion rate donut), monthly revenue line trend, lead sources bar, service interest breakdown, AI chat engagement stats, project pipeline status grid, client acquisition bar chart — all live data from SDK
- `src/admin/MessagingPanel.tsx`: NEW — 3-tab panel: "Client Messages" (threaded chat with any registered client, full read/unread tracking, reply from admin), "AI Lead Inbox" (captures all AI widget conversations so admin can follow up), "Broadcast" (compose + send to audience segments: all-clients / active / portal / leads, quick templates, recipient preview)
- `src/admin/CalendarPanel.tsx`: NEW — full month-grid calendar with 5 event types overlaid: projects (start→end timeline), employee work days (from HourEntry), expenses as cost markers, service bookings (from BillingDocument), custom CalendarEvent entries. Day sidebar shows day detail, month summary counts. Add Event modal links to projects/employees.
- `src/components/AdminShell.tsx`: wired all 3 new panels; Analytics/Calendar/Messaging moved to "core" group in sidebar; removed old AnalyticsPanel stub; added `Clock` import for calendar icon
- `src/pages/ClientPortalPage.tsx`: added "My Schedule" section — client-facing calendar event list showing project milestones, service visits, and team-created events; added `CalendarBlank` import; `schedule` nav item added
- DB: patched `Message` entity for direct messaging

## 2026-03-16 — Full Connected Data Ecosystem: Projects, Clients, Billing
- `AdminShell.tsx` `ProjectsPanel`: Added cover photo upload (FileReader → save to DB + live preview), "Team" sub-tab with employee assignment modal (auto-fills hourly rate, logs HourEntry), "Billing" tab now has "+ Add Expense/Material" quick modal, labor cost added to financial summary (4 KPIs: income, expenses, labor, net margin)
- `AdminShell.tsx` `ClientsPanel`: Added "Store" sub-tab showing matched Orders (by name/email), subscription billing docs, and totals; "Activity" sub-tab showing matched Leads and ChatMessages from AI chat/portal
- `BillingPanel.tsx` `DocumentEditor`: New "Source" tab as first tab — 4 billing source types (Project/Service/Store/Subscription); client dropdown auto-fills clientName+email+address; project dropdown auto-fills address; store order import populates line items; service plan adds subscription line item; `billingSource` field saved to DB
- DB: Patched `BillingDocument` entity with `billingSource` (string) and `projectId` (optional string) fields
- `BillingPanel` list view: Added source filter dropdown; source badge shown on each row when not "project"

## 2026-03-16 — Full CRUD for Clients & Projects admin panels with linking, notes, photos, billing
- `AdminShell.tsx` `ClientsPanel`: Added "+ Add Client" button + full create/edit modal (all fields: name, company, email, phone, address, city, status, portal access, notes, service interest); client detail view with Info / Projects / Billing / Notes sub-tabs
- `AdminShell.tsx` `ProjectsPanel`: Added "+ Add Project" button + full create/edit modal with client dropdown linkage; project detail view with Overview / Notes / Photos / Billing sub-tabs; photos upload via FileReader + ProjectAttachment entity; inline notes via ProjectNote entity; billing tab shows income, expenses, and billing documents per project
- `Project` entity patched: added clientId, clientName, status, description, address, budget, startDate, endDate, notes, coverImageUrl fields
- `ClientPortalPage.tsx`: removed clientEmail filter (client users see their own portal docs once admin links them by name via BillingDocument)

## 2026-03-16 — Header nav collapsed into deployable "Services" dropdown
- `HeaderNav.tsx`: extracted new `DesktopNav` component; added `CaretDown` import from phosphor
- Home + Contact links remain always-visible in the header; all other theme links (Renovations, Additions, Interiors, Structural Work, etc.) are grouped under a single "Services" dropdown trigger
- Dropdown renders a floating panel with arrow notch, per-link icons, active indicator dot, animated caret, and theme-aware light/dark coloring

## 2026-03-15 — Fix HeaderNav `isLightHeader` used before initialization
- Moved `isLightHeader` declaration to after the `useQuery("LogoAsset")` call and logo derivations
- Root cause: `isLightHeader` was declared on line ~40 but `useQuery` was called after it on line ~43, causing a temporal dead zone error in the bundler

## 2026-03-15 — Fix logo upload: entity missing + HeaderNav/Footer not consuming DB
- Patched `LogoAsset` DB entity (was never actually created — `backend_database_query_data` returned 404)
- `HeaderNav.tsx`: added `useQuery("LogoAsset")`, reads `light`/`dark` active logos, renders `<img>` in the logo mark slot when a URL is saved; falls back to "M" letter when empty
- `Footer.tsx`: same pattern — reads `dark` (preferred) then `light` logo, renders `<img>` in the brand column; falls back gracefully
- `LogoManagerPanel.tsx`: tightened `handleSave` to find existing by `type` only (not `active`), cast fields to `any` for SDK compatibility

## 2026-03-15 — Fix theme color persistence + add media file upload
- `ThemeContext.tsx`: Added `PRESET_OVERRIDES_KEY` localStorage store; `saveTheme()` now writes per-preset color overrides; `applyPreset()` merges saved overrides on top of built-in preset vars so custom colors survive switching
- `ThemeContext.tsx`: `setLiveVar` no longer nulls `activePresetId` — preserving preset context while editing colors
- `LogoManagerPanel.tsx`: Added `<input type="file" accept="image/*">` with `FileReader` → data-URL preview; file-upload button + preview card; URL input still available as fallback
- `VideoManagerPanel.tsx`: Added `<input type="file" accept="video/*">` with `FileReader` → data-URL; upload button + file name preview; URL input still available

## 2026-03-15 — Persist nav menu customisations to DB
- New `ThemeNavOverride` DB entity: presetId, navLinksJson, sectionsJson, ctaLabel, ctaHref
- New `src/hooks/useNavOverride.ts`: `useNavOverrides()` hook + `applyOverride()` helper — merges DB row over static config (icons retained from static)
- `HeaderNav.tsx`: calls `useNavOverrides()` and resolves the active preset's merged config before rendering links/CTA
- `ThemeManagerPanel.tsx` `MenuSectionsEditor`: loads DB override via `useQuery`, hydrates local state once on mount, saves via create/update, adds "Reset to Defaults" button


## 2026-03-15 — Real PWA icons added
- Generated gold-on-charcoal "SM" monogram icon via image_generation
- Hosted at animaapp CDN; manifest.json updated to reference the URL for both 192×192 and 512×512 entries
- Shortcut icons in manifest also updated to the real asset

## 2026-03-15 — Fix Footer.tsx build error (duplicate JSX block)
- Removed orphaned duplicate JSX block appended after the closing `}` of `Footer` in `src/components/Footer.tsx`
- Root cause: old un-themed footer body was left dangling outside the component function, causing "adjacent JSX elements" parse error

## 2026-03-15 — Full Theme-Specific Visual System Applied
- `ThemeContext.tsx`: extended with `ThemeSettings`, `DEFAULT_SETTINGS_BY_PRESET` for 3 ecosystems, `isNightMode` flag, night-mode time/system detection, CSS var injection for all settings vars
- `SoundContext.tsx`: new ambient sound system — per-theme defaults, smooth fade in/out, mobile auto-mute, admin-controllable
- `PageTransition.tsx`: theme-specific page transitions — dust-fade (Hardscape), blueprint-wipe (Construction), clean-slide (Maintenance), generic fade
- `NightModeOverlay.tsx`: fixed overlay with theme-specific tint, auto/time/system triggered
- `AmbientSoundWidget.tsx`: floating sound control widget, expandable volume slider
- `Footer.tsx`: fully rebuilt with `FooterParticles` canvas (stone/diamond/circle per theme), theme-driven gradient, accent, border, blueprint grid overlay, stone texture
- `HeaderNav.tsx`: full theme-specific styles — per-theme icon/logo colors, border, blur, shadow, maintenance light header, night-mode aware
- `HeroSection.tsx`: night-mode overlay + theme-specific eyebrow text
- `ThemeManagerPanel.tsx`: 9 tabs total — added Header, Footer, Sound, Night Mode, Transitions editors (all fully functional)
- `index.tsx`: injected SoundProvider, NightModeOverlay, AmbientSoundWidget
- `index.css`: added transition keyframes (dust-fade, blueprint-wipe, clean-slide), night mode global CSS class, settings CSS vars

## 2026-03-15 — Full Router Reconstruction + Ecosystem Lock
- `App.tsx` fully rebuilt with lock comment header; all 14 public routes, auth, portal, admin — stable and documented
- `index.tsx`: injected `AnimationProvider` (was defined but never mounted → `useAnimation()` would crash) + `ThemeAnimationBridge` renderless sync component
- `AdminShell.tsx`: imported and wired `CommunityManagerPanel` — community tab now renders the real panel instead of a placeholder grid
- `ReviewsSection.tsx`: fixed dead `/reviews` link (route doesn't exist) → corrected to `/about`
- `package.json`: removed incorrect `alias` field (only belongs in `vite.config.ts`, which already had the correct `@` alias)
- All imports verified: every `@/pages/*`, `@/components/*`, `@/admin/*`, `@/contexts/*`, `@/config/*`, `@/hooks/*` confirmed present and resolvable


## 2026-03-15 — Theme-Specific 3D Elements + Particle Systems + Admin Controls
- `ThreeDContainer.tsx` rebuilt: 3 theme-specific canvas engines — Hardscape (paver grid + floating stone slab + earth particles), Construction (blueprint grid + metallic cube + floorplan + gold micro-lines), Maintenance (service badge ring + wrench icon + soft blue-gray particles)
- `ThemeContext.tsx`: 6 new CSS vars — `--theme-3d-enabled`, `--theme-3d-model`, `--theme-3d-rotation-speed`, `--theme-particle-density`, `--theme-particle-size`, `--theme-particle-speed`; all 3 ecosystem presets carry their own defaults
- `ThemeManagerPanel.tsx`: new "3D & Particles" tab with `ThreeDParticlesEditor` — enable/disable toggle, model selector (auto/paver/blueprint/badge), rotation speed slider, particle density/size/speed sliders, color inputs with live preview strip, 6 quick-preset buttons, per-theme summary panel
- `index.css`: `:root` defaults added for 6 new 3D control vars

## 2026-03-15 — Theme-Specific Menus, Icons & Section Structures — Full Upgrade
- `ThemeNavConfig.tsx`: added `iconKey`, `menuPersonality`, `iconSet: ThemeIconEntry[]`, `style`/`accentFamily`/`visualNote` on `ThemeSectionDescriptor`; exported all icon components individually
- Hardscape: 5 rich section descriptors (stone-hero, project-gallery, material-showcase, before-after-slider, outdoor-inspiration) with full visual notes + accent family
- Construction: 5 section descriptors (blueprint-hero, renovation-case-studies, interior-design-section, process-timeline, certifications-permits)
- Maintenance: 5 section descriptors (service-plan-cards, subscription-tiers, seasonal-checklist, maintenance-timeline, emergency-services)
- `ThemeManagerPanel.tsx` Menus & Sections tab rebuilt: 3 inner tabs (Nav Menu / Section Structure / Icon Set), `SectionPreviewCard` with style badge + accent dot + visual note, `NavMiniPreview` themed header mockup, `SectionStructurePreview` wireframe, `IconShowcase` grouped by category

## 2026-03-15 — Theme-Specific Menus, Icons & Section Structures
- New `src/config/ThemeNavConfig.tsx`: full SVG icon set (stone, leaf, shovel, patio, paver, blueprint, hammer, level, floorplan, wrench, calendar, checklist, broom + 15 more), `ThemeNavLink`, `ThemeSectionDescriptor`, `ThemeNavConfig` types
- Three ecosystem configs: Hardscape (7 links, 5 sections), Construction (7 links, 5 sections), Maintenance (7 links, 5 sections) — each with theme-matched icons, CTA label, and CTA href
- `ThemeContext.tsx`: added `activeNavConfig` derived value (via `useMemo` + `getNavConfig`), exposed in context
- `HeaderNav.tsx`: consumes `activeNavConfig` — renders theme-specific nav links with per-link icons (fade-in on hover/active), theme CTA label/href, mobile drawer shows theme badge + icons per link
- `ThemeManagerPanel.tsx`: new "Menus & Sections" tab — per-ecosystem preset selector, inline nav link label/href editor, section order (move up/down), section enable/disable toggles, CTA editor, icon legend panel

## 2026-03-15 — Unified Service Selection System + Header Enhancements
- New `ServiceSelector.tsx`: `SERVICES` constant, `WhichAreYourNeedsButton` (desktop dropdown + mobile slide-up panel), `useServiceSelector` hook
- `HeaderNav.tsx`: always solid background via `--theme-header-bg` CSS var (never transparent), added `WhichAreYourNeedsButton` in desktop CTA row and mobile controls row
- `HeroSection.tsx`: video layer starts at `--nav-height` offset, no overlap with header, letterbox bars removed (no longer needed)
- `SplashScreen.tsx`: added bilingual sub-question "Which are your needs?" below main question text
- `PageShell.tsx`: `pt-[72px]` → `padding-top: var(--nav-height)` for theme compatibility
- `index.css`: added `.hero-below-header` utility; removed letterbox bar rules; added theme-var-driven header bg rule

## 2026-03-15 — Cinematic Splash Screen — Full Premium Rebuild
- Rebuilt `SplashScreen.tsx` from scratch with superior cinematic technique
- New `MonzonLogo` component: SVG stroke dashoffset draw-on animation (3s cubic ease), 4-corner architectural frame markers, inner accent diamond, center tick marks, glow halo behind mark, wordmark fade with expanding rule
- New `SparkField`: 36 radial seeds with glow box-shadow that collapse inward before formation begins
- New `ScanLine`: top-to-bottom gold sweep via `@keyframes scanDown` (added to index.css) that fires during spark/forming phases
- New `ArchitecturalGrid`: subtle gold grid overlay that fades in after assembly for depth
- `ServiceButton`: left accent bar, shimmer sweep, pressed state, refined typography hierarchy
- Phase sequence refined: idle→sparks(350ms)→forming(1050ms)→assembled(4400ms)→question(6200ms)→buttons(6850ms)
- All existing context wiring (SplashContext, ThemeContext, AdminShell) preserved — no functionality changed


## 2026-03-15 — Cinematic Splash Screen System Added
- New `SplashContext.tsx`: settings persistence (enabled, questionText, animationSpeed, particleIntensity, backgroundStyle, 3 configurable buttons), `shouldShowSplash` flag, `dismissSplash`, `resetSplashForPreview`
- New `SplashScreen.tsx`: full-screen cinematic intro with particle canvas, sparks pre-formation, SVG logo formation sequence (draw-on stroke animation), service selection buttons with hover states, skip link
- New `SplashManagerPanel.tsx`: admin panel for enable/disable, text editing, 3 background styles, speed/intensity sliders, per-button editor (label, sublabel, themePresetId, destination)
- `SplashProvider` injected in `index.tsx` wrapping the full app
- `App.tsx` refactored into `AppRoutes` inner component; `SplashScreen` renders on top of routes when `shouldShowSplash` is true
- `AdminShell.tsx`: `SplashManagerPanel` wired to new "Splash Screen" sidebar item under Appearance group; `Play` icon added to imports

## 2026-03-15 — Three Ecosystem Themes + Full Theme Manager Overhaul
- **ThemeContext**: Expanded from 17 to 40+ CSS variables (typography, spacing, shadows, borders, card styles, hero overlay, 3D/particle colors, button radius)
- **3 Ecosystem Presets**: Hardscape/Landscape (black+deep forest green), Construction/Renovation (charcoal+brass, blueprint), Maintenance/Service (pearl white+blue-gray)
- Each preset defines `useCases`, `heroVideoHint`, full color/shadow/particle/fade system
- **ThemeManagerPanel**: Rebuilt with Ecosystem hero cards (noise overlay, swatch strip, use-case pills, video hint badge), duplicate, export/import JSON, 8 token groups in editor
- `hero-video-overlay` and `canvas-container` CSS classes now read from `--theme-hero-overlay` and `--theme-3d-bg` vars so themes update them dynamically

## 2026-03-15 — 3 Ecosystem Theme Presets + Enhanced Theme Manager
- Added 3 new built-in presets: Industrial Loft (copper/concrete), Arctic Slate (icy blue), Ember Noir (crimson/noir)
- All presets now carry `description`, `mood`, and `swatches` metadata via new `ThemePresetMeta` type
- ThemeManagerPanel restructured: Presets tab / Color Editor tab switcher
- Ecosystem presets rendered as hero cards with hover-reveal descriptions and swatch palettes
- Classic presets upgraded with 4-swatch strips + mood labels; live preview now shows color swatch bar + preset description

## 2026-03-15 — StoreManagerPanel wired into AdminShell
- AdminShell now imports and renders StoreManagerPanel for the "store" sidebar tab
- Replaced the old placeholder card grid with the full StoreManagerPanel component
- StoreManagerPanel provides SM Store Products, SM Collection, Orders, and Discount Codes sub-tabs

## 2026-03-15 — Full 10-Module Ecosystem Integration
- 7 new DB entities: Review, SiteMetric, LogoAsset, CompanyProfile, AcademyItem, ServiceProduct, CartItem
- New public pages: /about/company (CompanyPage), /academy (AcademyPage), /maintenance (MaintenancePage)
- StorePage rebuilt: SM Store tab + SM Collection tab, full cart drawer, variant selector modal, size/color pickers
- MaintenancePage: services grid + subscription plans, category filter, subscribe/add-to-cart actions
- AcademyPage: courses/coaching/workshops/events with type filter, enrollment CTA, stats banner
- CompanyPage: founder, story, mission/vision, values grid, timeline, awards — all DB-driven
- 6 new admin panels: ReviewsPanel, MetricsPanel, LogoManagerPanel, CompanyProfilePanel, AcademyManagerPanel, ServiceShopPanel
- AdminShell: new "Content & Brand" sidebar group with 6 panels; store panel expanded
- ReviewsSection component: displays approved/featured reviews on About, Services pages
- HeaderNav: updated nav links (Maintenance, Academy added; Blog removed from main nav)
- Footer: removed Admin Panel/Client Portal links; added Academy, Maintenance, Our Story links

## 2026-03-15 — Complete Auth & RBAC System Added
- AuthContext: role detection (admin/manager/employee/accountant/client/guest), permission matrix, ADMIN_EMAILS whitelist, useAppAuth hook
- LoginModal: floating overlay for client/admin login; LoginPage: full-screen sign-in/register/admin with decorative left panel
- UserMenu: dropdown in nav for authenticated users with role badge + portal/admin links
- PermissionGuard + ProtectedRoute: inline and route-level access control components
- RoleManagerPanel: create/edit/delete roles, full permission checkbox editor, 16 permission types in 4 groups
- UserManagerPanel: lists all clients+employees, role assignment via select dropdown (persisted to localStorage per email)
- HeaderNav upgraded: Sign In / Register buttons for anonymous users, UserMenu for authenticated users, mobile drawer updated
- AdminShell: now uses useAppAuth, non-staff users see access-denied panel, added Roles + Users sidebar items
- App.tsx: added /login, /register, /admin/login routes; AuthProvider injected in index.tsx

## 2026-03-15 — Full Ecosystem Integration: 7 New Modules
- Public AI Chat Widget (AIChatWidget.tsx): floating bot, KB answers, buying-intent detection, lead capture → auto-creates Lead in DB, no pricing shared
- Admin AI Chat (AdminAIChat.tsx): P&L, expense breakdown, hours, project profitability, invoice collection — all live data from SDK
- Theme Manager (ThemeManagerPanel.tsx + ThemeContext.tsx): 13 CSS vars, color picker + HEX/HSL input, preset system, live preview panel, save/discard
- Appearance Base (AppearanceBasePanel.tsx): spacing scale, typography scale, section/card/button/form templates  
- Enhanced 3D (ThreeDContainer.tsx): particle layer, parallax depth strips, compact mode for Services/Portfolio pages
- Cinematic Hero (HeroSection.tsx): smooth fade-in, video play/pause control, depth strips
- Video Manager (VideoManagerPanel.tsx): library, URL add, preview modal, active selection
- Client Portal rebuilt: 7 sections (overview, projects, documents, payments, history, messages, profile), estimate approve, download, sidebar nav
- Admin + Portal both gated behind useAuth login — admins see admin panel, clients see portal
- PageShell and HomePage both inject AIChatWidget, ThemeProvider wraps entire app in index.tsx

## 2026-03-15 — Complete Economic & Billing Ecosystem Built
- 5 new DB entities: BillingDocument, Expense, Income, HourEntry, Lead
- BillingPanel: full visual document editor (estimate/invoice/receipt/work-order/credit-note), live preview, desktop/mobile toggle, email sender, status timeline, version history
- EconomicDashboardPanel: interactive SVG bar/line/donut charts, KPIs, project profitability ranking, materials vs labour
- ExpenseIncomePanel: full CRUD for expenses (6 categories) and income entries with project/employee assignment
- EmployeeHoursPanel: time tracking with group-by-employee and group-by-project views, approval toggles
- ProfitabilityPanel: per-project cost breakdown, income/expense timelines, margin bars
- LeadManagementPanel: kanban + list views, full lead detail modal, pipeline stage management
- ClientPortalPage: rebuilt with documents/payments/history tabs, inline document viewer, estimate approval
- AdminShell: 6 new fully-live sidebar panels (billing, economics, expenses, leads, hours, profitability), removed "Soon" badges

## 2026-03-15 — Advanced Module Placeholders Scaffolded
- Added `/ai-chat` public route with AIChatPage — chat UI shell, suggestion chips, feature preview cards
- Added 5 new admin sidebar panels: Economic Dashboard, Lead Management, Employee Hours, Profitability, AI Assistant
- Admin sidebar now grouped into 4 sections: Core / Finance & Ops / AI / System; "Soon" badges on new panels
- HeaderNav now shows "AI Chat" link with "Soon" badge pill
- All new panels are purely structural — no live data/logic, ready for future module development

## 2026-03-15 — Full Ecosystem Expansion + Anima SDK Integration
- Added 8 new pages: Services, Portfolio, Store, Community, Contact, About, Blog, ClientPortal
- Expanded AdminShell to 10 panels: Dashboard, Projects, Clients, Employees, Media, Store, Community, Billing, Analytics, Settings
- Integrated AnimaProvider in index.tsx; all data components use useQuery/useMutation/useAuth from @animaapp/playground-react-sdk
- ContactSection, PortfolioSection, CommunitySection, StorePreview all now read live data with SDK (fallback to static data if empty)
- HeaderNav and Footer updated with Link-based routing (react-router-dom) across all 9 public pages
- Added reusable PageShell, PageHero, PlaceholderPanel components
- ClientPortalPage uses useAuth for login gate + dashboard for authenticated clients

## 2026-03-15 — Full Website Rebuild (Cinematic Foundation)
- Rebuilt all 11 components: HeaderNav, HeroSection, ThreeDContainer, ServicesSection, PortfolioSection, StorePreview, CommunitySection, ContactSection, ClientPortalBanner, Footer, AdminShell
- Added PWA manifest at static/manifest.json; updated index.html with Apple PWA meta tags
- Extended tailwind.config.js: surface colors, fluid fonts, new keyframes (marquee, float, shimmer, scan-line, scale-in)
- Rewrote index.css: custom scrollbar, glass utilities, stagger reveal classes, fluid font utilities, noise overlay, parallax base layer
- ThreeDContainer uses custom 3D math (no Three.js), renders pavé grid + architectural wireframe, scroll+mouse reactive
- All sections use IntersectionObserver stagger-child/visible pattern for smooth entrance animations
- Admin panel upgraded to sidebar layout with 9 nav items and modular placeholder panels
</changelog>

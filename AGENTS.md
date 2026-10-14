# AGENTS.md - Project Architecture & Development Guide

This document serves as the primary system manual for AI agents, developers, and maintainers working on the Operations Planner & Cleaning Management Dashboard.

---

## 1. Directory Structure & Organization Standards

The codebase follows a strict separation of concerns under a clean `src/` directory:

```text
src/
├── app/                      # Next.js App Router pages and layouts
│   ├── dashboard/            # Operations dashboard & route segments
│   └── layout.tsx            # Root layout with global navigation wrapper
├── components/               # Modular UI components
│   ├── navigation/           # Global layout routing (Navbar)
│   ├── planner/              # Weekly calendar, grid views, and scheduling logic
│   └── settings/             # Administrative tables and configuration forms
├── lib/                      # Shared core infrastructure logic
│   ├── cache.ts              # Data caching and retrieval layers
│   └── utils.ts              # Pure helper functions and date calculation math
├── stores/                   # State handlers and data fetching layers
│   ├── cleanerStore.ts       # Cleaner roster operations
│   ├── propertyStore.ts      # Property portfolio dataset handlers
│   └── userStore.ts          # Team membership and role management
└── types/                    # TypeScript interfaces and type definitions
```

### Module Placement Rules:
* **`components/settings/`**: Houses administrative management tables and forms (e.g., `CleanersTable`, `PropertiesTable`, `SettingsForm`, `UsersTable`).
* **`components/navigation/`**: Houses layout and global navigation wrappers (e.g., `Navbar`).
* **`lib/`**: Central location for shared core utilities (`utils.ts`) and caching modules (`cache.ts`).
* **`stores/`**: Houses asynchronous file-system or database data-fetching layers (`jsonStore.ts`, `propertyStore.ts`, etc.).

---

## 2. Rendering, Caching, and Next.js Best Practices

* **`cacheComponents` Compatibility:** The application utilizes fine-grained caching components. Legacy route segment configurations (such as `export const dynamic = "force-dynamic"`) are strictly incompatible and must not be used.
* **Suspense Boundaries:** Any Server Component performing dynamic runtime filesystem reads (via `fs` or asynchronous data stores) must be isolated inside a `<Suspense>` boundary (or wrapped within a dedicated async component) to allow seamless streaming and leverage Next.js `loading.tsx` fallbacks without triggering prerendering blocks.

---

## 3. Dataset Scaling & Mock Service Rules

* **Dynamic Array Scaling:** When generating mock schedules or assignments (`mockService.ts`), always utilize dynamic array lengths (`cleaners.length` and `properties.length`) rather than hardcoded limits to ensure future scalability when portfolio sizes expand.
* **Deduplication Safety:** The scheduling engine enforces a strict programmatic safety check using `Set` structures to filter out duplicate property assignments on the same calendar day, ensuring data integrity across all active rosters.

---

## 4. Git & Code Maintenance Workflow

* Keep commits descriptive and scoped to specific modules (e.g., `fix(dashboard)`, `refactor(lib)`).
* Always verify that `.env` files and sensitive local assets are properly ignored via `.gitignore` prior to pushing modifications.
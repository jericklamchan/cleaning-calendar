# AGENTS.md — Cleaning Calendar Project Guidelines

## Project Overview
Property and cleaning operations management web application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

## Tech Stack & Architecture
- **Framework:** Next.js 15+ (App Router, Server Components by default, Client Components explicitly marked with `"use client"`).
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss";` with CSS theme variables in `app/globals.css`).
- **Icons:** `lucide-react`.
- **Language:** TypeScript (strict mode enabled).

## Directory Structure
- `app/` — Next.js App Router pages, layouts, and route handlers.
- `components/` — Reusable React components (e.g., `Navbar.tsx`, `Planner.tsx`, `DayRow.tsx`).
- `types/` — Shared TypeScript domain interfaces (e.g., `planner.ts`).
- `data/` — Static mock data fixtures and mock API stores (e.g., `mockPlanner.ts`).

## Code Standards & Best Practices
1. **DRY & Modular:** Keep components focused and under ~150 lines. Extract repeating UI elements into sub-components (e.g., `DayRow`).
2. **Type Safety:** 
   - Core domain models and shared types belong in `types/`.
   - Component-specific prop interfaces should be co-located inside their respective component file.
   - Avoid `any`. Use strict TypeScript interfaces.
3. **Server vs. Client Components:**
   - Default to Server Components (`async` components fetching data or handling server routing).
   - Use `"use client"` **only** when state (`useState`, `useEffect`), browser events, or hooks are strictly required.
4. **Styling Guidelines:**
   - Use Tailwind utility classes.
   - Adhere to the custom warm design color palette defined in globals (`bg-[#f8f7f4]`, custom borders `#e8e4dc`).

## Commands
- **Development:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
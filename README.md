# Operations Planner & Cleaning Management Dashboard

A production-grade, full-stack operations management dashboard designed for short-term rental property portfolios. Built with modern web technologies, it features dynamic weekly scheduling, robust data caching, and automated conflict-resolution pipelines for cleaners, properties, and team operations.

---

## 🚀 Key Features

* **Interactive Weekly Planner Matrix:** Real-time scheduling grid with automated turnover tracking, check-in/check-out tracking, and day-off management.
* **Smart Deduplication & Safety Filters:** Programmatic validation layers ensuring properties never experience double-booking or overlapping cleaning assignments on the same calendar day.
* **Multi-Property & Multi-Cleaner Scaling:** Supports dynamic data sets across major metropolitan portfolios (Los Angeles, New York City, Oslo) with modular roster management.
* **High-Performance Architecture:** Optimized for Next.js with fine-grained caching components and suspense boundaries for instant navigation.
* **Comprehensive Administration Suite:** Centralized tables and forms for managing team permissions (Admins, Operations Managers), cleaner rosters, and property configurations.

---

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **State Management & Caching:** Custom JSON storage layers with server-side caching (`lib/cache.ts`)
* **Icons & UI Utilities:** Modular component architecture (`components/planner/`, `components/settings/`, `components/navigation/`)

---

## 📂 Project Architecture

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

---

## ⚙️ Getting Started

### Prerequisites
Make sure you have **Node.js** (v18+ recommended) and **npm** installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jericklamchan/cleaning-calendar.git
   cd cleaning-calendar
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🔒 Security & Best Practices

* **No Hardcoded Secrets:** All sensitive credentials, environment variables, and platform keys are securely decoupled using `.env` configurations (excluded via `.gitignore`).
* **Robust Error Boundaries:** Server-side file operations are safely isolated within React Suspense boundaries to maintain optimal UI responsiveness and prevent prerendering blockages.

---

## 📄 License

This project is protected under standard copyright laws. All rights reserved. Code is provided for portfolio review and demonstration purposes only.
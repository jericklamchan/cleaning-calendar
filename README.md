# 🧹 Cleaning Calendar

A modern, responsive property and cleaning operations management web application built with **Next.js App Router**, **TypeScript**, and **Tailwind CSS v4**.

## ✨ Features

- **Weekly Planner View:** Interactive calendar breakdown of cleaning operations organized by week.
- **Accordion Day Rows:** Expandable daily drawers to check individual cleaner availability, tentative days off, and turnover schedules.
- **Clean Architecture:** Modular component structure following DRY principles and strict separation of concerns.
- **Custom Design System:** Tailored warm off-white layout (`#f8f7f4`) with refined borders (`#e8e4dc`) and optimized Geist typography.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** TypeScript
- **Icons:** `lucide-react`

---

## 📁 Project Directory Structure

```text
├── app/                  # Next.js App Router pages and layouts
│   ├── layout.tsx        # Root layout with fonts and global wrapper
│   ├── page.tsx          # Root redirect to active week planner
│   ├── globals.css       # Tailwind v4 import and CSS theme variables
│   └── planner/
│       └── [week]/       # Dynamic week route page
├── components/           # Reusable UI components
│   ├── Navbar.tsx        # Global navigation header
│   ├── Planner.tsx       # Main client-side planner view
│   └── DayRow.tsx        # Collapsible day accordion row
├── data/                 # Mock data fixtures and stores
│   └── mockPlanner.ts    # Static cleaning schedules and cleaner data
└── types/                # Shared TypeScript domain models
    └── planner.ts        # Core interfaces (Cleaner, DaySchedule, etc.)
```

---

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18+ recommended) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/cleaning-calendar.git
   cd cleaning-calendar
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000). The root URL will automatically redirect you to the active demo week planner.
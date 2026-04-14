# Cal.com Frontend Clone

A high-fidelity, production-ready frontend clone of Cal.com. This project meticulously replicates the core scheduling infrastructure, admin dashboard, and public booking wizard of the original SaaS platform utilizing a premium dark-mode, minimalist design system.

## 🚀 Key Features

*   **Public Booking Wizard:** A seamless, multi-step localized flow (`/:username/:slug`) connecting a dynamic calendar, conflict-free time slot generation, and booking capture form.
*   **Complex Availability Engine:** Global state management for configuring working days, distinct time buffers, timezone localization, and dynamic slot rendering.
*   **Event Types Management:** Admin dashboard to toggle visibility, copy public hooks, and review configured master events (15m, 30m slots).
*   **Bookings Dashboard:** A searchable, tab-filtered view for all historical and upcoming events.
*   **Premium SaaS Architecture:** Tailwind CSS setup enforcing pitch-black backgrounds, high-contrast typography, inset shadows, and radial gradients modeled identically after Linear & Cal.com patterns.

## 🛠 Tech Stack

*   **Core:** React 18, TypeScript, Vite
*   **Routing:** React Router v6 (`react-router-dom`)
*   **State Management:** Zustand (simulating a database via global memory stores and mock seeds)
*   **Styling:** Tailwind CSS v3 (configured with strict design tokens mapping to a custom `cal-*` CSS variable system)
*   **Date/Time Math:** `date-fns` for robust, timezone-aware localized calendar logic
*   **Icons:** `lucide-react`

---

## ⚙️ Getting Started

Follow these instructions to get the application up and running on your local machine.

### Prerequisites

Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
*   npm (or yarn / pnpm)

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/Aryaneefds/cal-clon.git
   cd cal-clon
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the app:**
   Open your browser and navigate to `http://localhost:5173`. 
   *(Note: If port 5173 is busy, Vite will automatically assign the next available port, e.g., 5174).*

---

## 🗺️ Project Structure

The project is heavily component-driven and relies on discrete state management containers, eliminating the need for complex prop drilling.

```text
cal-clon/
├── src/
│   ├── components/       
│   │   ├── booking/      # Calendars, time slot generators, capture forms
│   │   ├── bookings/     # Admin booking rows and history UI
│   │   ├── event-types/  # Admin master event management UI
│   │   ├── layout/       # App Shell, Navigation Sidebar, Top headers
│   │   └── ui/           # Reusable primitive tokens (Buttons, Inputs, Cards)
│   ├── data/             
│   │   └── seed.ts       # Central mock database initializing the Zustand stores
│   ├── lib/              
│   │   └── utils.ts      # Tailwind mergers (clsx/tailwind-merge) & time generators
│   ├── pages/            # Top-level routing components (Admin & Public wrappers)
│   ├── stores/           
│   │   ├── availabilityStore.ts  # Handles the master week schedules
│   │   ├── bookingStore.ts       # Handles confirmed and upcoming reservations
│   │   └── eventTypeStore.ts     # Handles event creation and visibility parameters
│   ├── App.tsx           # React Router DOM definitions and mapping
│   ├── index.css         # Tailwind directives and CSS mapped Design Tokens
│   └── main.tsx          # React application root
├── tailwind.config.js    # Strict V3 configuration
├── vite.config.ts        # Vite build tool setup
└── package.json
```

---

## 🧩 Modifying the Design System

The platform strictly attempts to bypass raw tailwind arbitrary values inside components to maintain consistency. If you want to change colors, corner radii, or core padding, update the CSS configurations:

1. **Colors & Spacing**: Modify the `:root` variables inside `src/index.css` (e.g., `--color-cal-bg-base`, `--radius-cal-xl`).
2. **Base Primitives**: Components like `src/components/ui/Input.tsx` and `Card.tsx` utilize dedicated CSS `@layer components` classes (e.g., `.cal-card`, `.cal-input`) found in `src/index.css`. Adjust those layers to universally affect all UI fields.

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```
This command compiles TypeScript via `tsc` and bundles the React application via `vite build` into the `dist/` directory perfectly minified for deployment on platforms like Vercel or Netlify.

```bash
npm run preview
```
Use this command to boot up a local static web server to preview the compiled `dist/` folder before launching it globally.

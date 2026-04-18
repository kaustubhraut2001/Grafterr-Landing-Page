# Grafterr Landing Page

A pixel-perfect, fully responsive React landing page for **Grafterr** — a modern restaurant technology platform.

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework — functional components + hooks only |
| **Vite** | Build tool and dev server for fast HMR |
| **CSS Modules** | Scoped, modular styling — no CSS frameworks |
| **PropTypes** | Runtime type checking for all components |

## Architecture Approach

- **Data-driven UI**: All visible text comes from `src/data/content.json` via a simulated API layer (`src/services/api.js`). Zero hardcoded text in JSX files.
- **Custom hooks**: `useContent` manages parallel data fetching with loading/error/retry states. `useCarousel` handles carousel navigation with touch swipe support.
- **Skeleton loading**: Every section renders animated shimmer placeholders while data is in-flight.
- **Error resilience**: The API simulates ~15% failure rate. The app catches errors and offers a retry button.
- **Responsive design**: Mobile-first with breakpoints at 768px (tablet) and 1024px (desktop). Carousel adapts items-per-view automatically.

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Project Structure

```
grafterr-landing/
├── public/images/         # Static assets (logo, product images)
├── src/
│   ├── components/
│   │   ├── ui/            # Reusable UI components (GradientText, ProductCard, Carousel, etc.)
│   │   └── sections/      # Page sections (HeroSection, FeaturesSection)
│   ├── hooks/             # Custom React hooks (useContent, useCarousel)
│   ├── services/          # API layer with simulated network delay
│   ├── data/              # Content JSON (single source of truth for all text)
│   ├── styles/            # Global styles and CSS custom properties
│   ├── App.jsx            # Root component with state orchestration
│   └── main.jsx           # Entry point
```

## Design Highlights

- Gradient accent (`#3B82F6 → #F97316`) used consistently across headline, CTAs, and interactive elements
- Floating shapes with smooth 4s bob animation for visual depth
- Fade-in content transitions (400ms ease)
- Cards with soft shadows and subtle hover scale transforms
- Inter font from Google Fonts for clean, modern typography

## Screenshots

> _Screenshots will be added after the first production build._

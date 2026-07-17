# AI Delivery Planner — Frontend

A SaaS tool for delivery managers: import a delivery list (Excel/CSV or manual entry), let AI
clean addresses, parse free-text notes, and flag duplicates, then have the backend geocode
stops and run Google OR-Tools route optimization across multiple drivers/vehicles — respecting
time windows and priorities. This repo is the web UI: a dashboard, a deliveries table, a
drivers list, a Google-Maps-based route map with timeline, and an AI chat assistant panel for
asking questions about the route and triggering replanning.

## Architecture

**Feature-based, not type-based.** Code is organized by business domain, not by technical
layer. Each `features/<domain>` folder owns its own `components/`, `api/`, and `types.ts`, and
exposes a public surface through `index.ts`. Shared, domain-agnostic building blocks live
outside `features/` (`components/shared`, `hooks`, `store`, `api/client.ts`, `types`, `utils`).

```
React (features/*, pages/*)
  │  calls
  ▼
Axios (api/client.ts)
  │  REST over HTTP
  ▼
FastAPI (backend, separate repo)
  │
  ▼
Service Layer
  │
  ▼
Repository
  │
  ▼
PostgreSQL
```

This repo only talks to the backend over REST — it never touches the database directly.

## Stack

- React 18 + TypeScript
- Vite
- React Router
- @tanstack/react-query
- Axios
- Zustand
- ESLint + typescript-eslint, Prettier

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to point at the backend API.

## Sibling repositories

This frontend is one of three sibling repositories for the AI Delivery Planner project:

- **This repo** — `ai-delivery-planner-frontend` (local folder: `AI-Planning-Assistant`)
- `ai-delivery-planner-backend` — FastAPI service layer, AI address cleanup, OR-Tools route
  optimization
- `ai-delivery-planner-infra` — infrastructure and deployment configuration

Create a new page named $ARGUMENTS and wire it into the app router.

Steps:
1. Create `src/pages/${ARGUMENTS}Page.tsx` with:
   - Outer div: `className="flex flex-col gap-6"`
   - Page header: `<div className="flex items-center justify-between gap-4">` with `<h1 className="text-2xl font-bold text-ink m-0">${ARGUMENTS}</h1>`
   - Placeholder content inside a card-like container

2. Add the route to `src/app/AppRouter.tsx`:
   - Import the new page
   - Add a `<Route>` wrapped in `<PrivateRoute>` at path `/${ARGUMENTS.toLowerCase()}`

3. Add a `NavLink` entry to the sidebar in `src/app/App.tsx`:
   - Add to the `NAV_LINKS` array: `{ to: '/${ARGUMENTS.toLowerCase()}', label: '${ARGUMENTS}', end: false }`

Rules:
- All pages are protected (wrapped in PrivateRoute)
- Use Tailwind classes, not custom CSS
- Keep the page component thin — delegate to feature components

Show me all files modified and the new page content.

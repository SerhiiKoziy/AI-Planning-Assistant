Scaffold a complete feature module named $ARGUMENTS inside `src/features/`.

Create these files:
1. `src/features/$ARGUMENTS/types.ts` — TypeScript interfaces for the domain entity and create/update payloads
2. `src/features/$ARGUMENTS/api/use${ARGUMENTS}s.ts` — useQuery hook fetching GET /$ARGUMENTS from apiClient
3. `src/features/$ARGUMENTS/api/useCreate${ARGUMENTS}.ts` — useMutation hook for POST /$ARGUMENTS, invalidates query on success
4. `src/features/$ARGUMENTS/components/${ARGUMENTS}List.tsx` — list component with loading/empty/error states using Tailwind
5. `src/features/$ARGUMENTS/index.ts` — barrel exporting the list component and types

Rules:
- Use Tailwind CSS classes throughout (color tokens: `bg-card`, `border-edge`, `text-ink`, `text-ink-muted`, `text-primary`, `text-danger`)
- Loading state: spinner with `w-5 h-5 border-2 border-edge border-t-primary rounded-full animate-spin`
- Empty state: centered emoji + message
- Error state: `text-danger` message
- All API functions use `apiClient` from `../../../api/client`
- Follow snake_case for API response fields (backend is FastAPI/Python)
- Export types with `export type`

After creating, show me a summary of what was created.

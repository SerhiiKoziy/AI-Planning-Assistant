Create a new shared React component named $ARGUMENTS.

Rules:
- File location: `src/components/shared/$ARGUMENTS.tsx`
- Use Tailwind CSS classes for all styling (no custom CSS classes)
- Follow the project's color tokens: `bg-canvas`, `bg-panel`, `bg-card`, `bg-card-hover`, `border-edge`, `text-primary`, `text-ink`, `text-ink-muted`, `text-danger`
- Export the component as a named export
- Use TypeScript with explicit prop interface
- Add the export to `src/components/shared/index.ts`

Example structure:
```tsx
interface ${ARGUMENTS}Props {
  // props here
}

export function $ARGUMENTS({ }: ${ARGUMENTS}Props) {
  return (
    <div className="...tailwind classes...">
      {/* content */}
    </div>
  );
}
```

After creating the file, show me the final component code.

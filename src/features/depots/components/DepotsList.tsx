import { useDepots } from '../api/useDepots';

export function DepotsList() {
  const { data: depots = [], isLoading, isError } = useDepots();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-3 py-16 text-ink-muted">
        <div className="w-5 h-5 border-2 border-edge border-t-primary rounded-full animate-spin" />
        <span>Loading depots…</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-danger">
        Failed to load depots.
      </div>
    );
  }

  if (depots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-2 text-center">
        <span className="text-5xl mb-2">🏬</span>
        <p className="font-semibold text-ink">No depots yet</p>
        <p className="text-sm text-ink-muted">Add a depot before generating routes</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {depots.map((depot) => (
        <div
          key={depot.id}
          className="bg-card border border-edge rounded-lg p-5 shadow-card hover:border-primary transition-colors flex flex-col gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-primary-muted text-primary font-bold text-lg flex items-center justify-center flex-shrink-0">
              🏬
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-ink truncate">{depot.address}</div>
            </div>
          </div>
          <div className="flex justify-between text-sm pt-3 border-t border-edge">
            <span className="text-ink-muted">Coordinates</span>
            <span className="font-mono text-xs text-ink">
              {depot.latitude.toFixed(4)}, {depot.longitude.toFixed(4)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

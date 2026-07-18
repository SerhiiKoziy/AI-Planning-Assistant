import { useState } from 'react';

import { useRoute } from '../features/routes/api/useRoute';
import { RouteMap } from '../features/routes/components/RouteMap';
import { RouteTimeline } from '../features/routes/components/RouteTimeline';

const inputCls =
  'bg-panel border border-edge rounded-lg px-3.5 py-2 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-primary transition-colors';

export function RoutesPage() {
  const [routeId, setRouteId] = useState('');
  const [loadedId, setLoadedId] = useState<string | null>(null);
  const { data: route, isLoading, isError } = useRoute(loadedId);

  const handleLoad = (e: React.FormEvent) => {
    e.preventDefault();
    if (routeId.trim()) setLoadedId(routeId.trim());
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-ink m-0">Routes</h1>
        <form className="flex gap-2" onSubmit={handleLoad}>
          <input
            className={`${inputCls} w-72`}
            placeholder="Enter Route ID…"
            value={routeId}
            onChange={(e) => setRouteId(e.target.value)}
          />
          <button className="btn btn--secondary" type="submit">
            Load
          </button>
        </form>
      </div>

      {!loadedId && (
        <div className="flex flex-col items-center justify-center py-16 gap-2 text-center">
          <span className="text-5xl mb-2">🗺️</span>
          <p className="font-semibold text-ink">No route loaded</p>
          <p className="text-sm text-ink-muted">
            Enter a Route ID above after running optimization
          </p>
        </div>
      )}

      {loadedId && isLoading && (
        <div className="flex items-center justify-center gap-3 py-16 text-ink-muted">
          <div className="w-5 h-5 border-2 border-edge border-t-primary rounded-full animate-spin" />
          <span>Loading route…</span>
        </div>
      )}

      {loadedId && isError && (
        <div className="flex items-center justify-center py-12 text-sm text-danger">
          Route not found or failed to load.
        </div>
      )}

      {route && (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5 min-h-[560px]">
          <div className="rounded-lg overflow-hidden border border-edge">
            <RouteMap route={route} />
          </div>
          <div className="border border-edge rounded-lg overflow-y-auto">
            <RouteTimeline route={route} />
          </div>
        </div>
      )}
    </div>
  );
}

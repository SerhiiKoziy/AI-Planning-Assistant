import { RouteMap, RouteTimeline } from '../features/routes';

export function RoutesPage() {
  return (
    <div className="routes-page">
      <RouteMap />
      <RouteTimeline />
    </div>
  );
}

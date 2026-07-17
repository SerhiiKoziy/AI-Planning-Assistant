import { useRoutes } from '../api/useRoutes';

export function RouteMap() {
  const { data } = useRoutes();

  // TODO: render Google Maps JS API with route polylines + stop markers
  return <div className="route-map">Route map placeholder ({data?.length ?? 0} routes)</div>;
}

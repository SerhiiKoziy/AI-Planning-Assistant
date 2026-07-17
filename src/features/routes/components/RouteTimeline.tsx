import type { Route } from '../types';

export interface RouteTimelineProps {
  route?: Route;
}

export function RouteTimeline(_props: RouteTimelineProps = {}) {
  // TODO: render ordered list of stops with ETAs
  return <div className="route-timeline">Route timeline placeholder</div>;
}

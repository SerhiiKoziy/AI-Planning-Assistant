import { useDashboardOverview } from '../api/useDashboardOverview';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  accent?: boolean;
  description?: string;
}

function StatCard({ label, value, icon, accent, description }: StatCardProps) {
  return (
    <div
      className={`flex items-center gap-4 p-5 rounded-lg border shadow-card transition-colors ${
        accent
          ? 'bg-danger-muted border-danger'
          : 'bg-card border-edge'
      }`}
    >
      <span className="text-4xl leading-none">{icon}</span>
      <div>
        <div className="text-[1.75rem] font-bold leading-none text-ink">{value}</div>
        <div className="text-xs text-ink-muted mt-1">{label}</div>
        {description && <div className="text-xs text-ink-muted/80 mt-0.5">{description}</div>}
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="h-[88px] rounded-lg border border-edge bg-card animate-skeleton" />
  );
}

export function OverviewCards() {
  const { data, isLoading, isError } = useDashboardOverview();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-danger">
        Could not load overview data.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
      <StatCard icon="📦" label="Deliveries Today" value={data.deliveriesToday} />
      <StatCard
        icon="🚗"
        label="Active Drivers"
        value={data.activeDrivers}
        description={`${data.driversOnRouteToday} on route, ${data.driversIdleToday} idle`}
      />
      <StatCard
        icon="🚐"
        label="Vehicles"
        value={data.activeVehicles}
        description={`${data.vehiclesInUseToday} in use, ${data.vehiclesAvailableToday} available`}
      />
      <StatCard icon="📍" label="Total Distance" value={`${data.totalDistanceKm} km`} />
      <StatCard
        icon="⚠️"
        label="Late Deliveries"
        value={data.lateDeliveries}
        accent={data.lateDeliveries > 0}
      />
    </div>
  );
}

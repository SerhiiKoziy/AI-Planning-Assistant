import { OverviewCards } from '../features/dashboard';

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink m-0">Dashboard</h1>
      </div>
      <OverviewCards />
    </div>
  );
}

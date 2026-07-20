import { OverviewCards, UsageChart } from '../features/dashboard';
import { SubscriptionCard } from '../features/organization';

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink m-0">Dashboard</h1>
      </div>
      <OverviewCards />
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4 items-start">
        <UsageChart />
        <SubscriptionCard />
      </div>
    </div>
  );
}

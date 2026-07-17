import { Card } from '../../../components/shared';
import { useDashboardOverview } from '../api/useDashboardOverview';

export function OverviewCards() {
  const { data, isLoading } = useDashboardOverview();

  // TODO: render real cards (deliveries today, active drivers, distance, late deliveries)
  return (
    <div className="overview-cards">
      <Card title="Overview">{isLoading ? 'Loading...' : JSON.stringify(data)}</Card>
    </div>
  );
}

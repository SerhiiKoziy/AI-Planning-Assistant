import { useDeliveries } from '../api/useDeliveries';

export interface DeliveriesTableProps {
  driverId?: string;
}

export function DeliveriesTable(_props: DeliveriesTableProps = {}) {
  const { data, isLoading } = useDeliveries();

  // TODO: render real table (address, priority, status, driver, time window)
  return (
    <div className="deliveries-table">
      {isLoading ? 'Loading deliveries...' : `${data?.length ?? 0} deliveries`}
    </div>
  );
}

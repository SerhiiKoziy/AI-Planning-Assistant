import { useDrivers } from '../api/useDrivers';

export function DriversList() {
  const { data, isLoading } = useDrivers();

  // TODO: render real list (name, vehicle, active deliveries)
  return (
    <div className="drivers-list">
      {isLoading ? 'Loading drivers...' : `${data?.length ?? 0} drivers`}
    </div>
  );
}

import { Badge } from '../../../components/shared';
import { useDrivers } from '../../drivers';
import { useVehicles } from '../api/useVehicles';

export function VehiclesList() {
  const { data: vehicles = [], isLoading, isError } = useVehicles();
  const { data: drivers = [] } = useDrivers();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-3 py-16 text-ink-muted">
        <div className="w-5 h-5 border-2 border-edge border-t-primary rounded-full animate-spin" />
        <span>Loading vehicles…</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-danger">
        Failed to load vehicles.
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-2 text-center">
        <span className="text-5xl mb-2">🚐</span>
        <p className="font-semibold text-ink">No vehicles yet</p>
        <p className="text-sm text-ink-muted">Add a vehicle before generating routes</p>
      </div>
    );
  }

  const driverName = (driverId: string | null) =>
    drivers.find((d) => d.id === driverId)?.name ?? null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {vehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          className="bg-card border border-edge rounded-lg p-5 shadow-card hover:border-primary transition-colors flex flex-col gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-primary-muted text-primary font-bold text-lg flex items-center justify-center flex-shrink-0">
              🚐
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-ink truncate">{vehicle.plate_number}</div>
              <div className="text-xs text-ink-muted mt-0.5">
                {driverName(vehicle.driver_id) ?? 'No driver assigned'}
              </div>
            </div>
            <Badge variant={vehicle.status as 'active' | 'inactive'}>
              {vehicle.status === 'active' ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          <div className="flex flex-col gap-2 pt-3 border-t border-edge">
            <div className="flex justify-between text-sm">
              <span className="text-ink-muted">Capacity</span>
              <span className="font-mono text-xs text-ink">
                {vehicle.capacity_weight_kg} kg · {vehicle.capacity_volume_m3} m³
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

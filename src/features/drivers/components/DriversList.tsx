import { Badge } from '../../../components/shared';
import { useDrivers } from '../api/useDrivers';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function fmtTime(t: string) {
  return t.slice(0, 5);
}

export function DriversList() {
  const { data: drivers = [], isLoading, isError } = useDrivers();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-3 py-16 text-ink-muted">
        <div className="w-5 h-5 border-2 border-edge border-t-primary rounded-full animate-spin" />
        <span>Loading drivers…</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-danger">
        Failed to load drivers.
      </div>
    );
  }

  if (drivers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-2 text-center">
        <span className="text-5xl mb-2">🚗</span>
        <p className="font-semibold text-ink">No drivers yet</p>
        <p className="text-sm text-ink-muted">Add your first driver to start planning routes</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {drivers.map((driver) => (
        <div
          key={driver.id}
          className="bg-card border border-edge rounded-lg p-5 shadow-card hover:border-primary transition-colors flex flex-col gap-4"
        >
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-primary-muted text-primary font-bold text-base flex items-center justify-center flex-shrink-0">
              {getInitials(driver.name)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-ink truncate">{driver.name}</div>
              <div className="text-xs text-ink-muted mt-0.5">{driver.phone}</div>
            </div>
            <Badge variant={driver.status as 'active' | 'inactive'}>
              {driver.status === 'active' ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-2 pt-3 border-t border-edge">
            <div className="flex justify-between text-sm">
              <span className="text-ink-muted">Working hours</span>
              <span className="font-mono text-xs text-ink">
                {fmtTime(driver.working_hours_start)} – {fmtTime(driver.working_hours_end)}
              </span>
            </div>
            {driver.break_start && driver.break_end && (
              <div className="flex justify-between text-sm">
                <span className="text-ink-muted">Break</span>
                <span className="font-mono text-xs text-ink">
                  {fmtTime(driver.break_start)} – {fmtTime(driver.break_end)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-ink-muted">Max shift</span>
              <span className="font-mono text-xs text-ink">
                {(driver.max_working_minutes / 60).toFixed(0)}h
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

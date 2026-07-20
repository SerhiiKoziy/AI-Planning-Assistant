import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useDashboardUsageHistory } from '../api/useDashboardUsageHistory';

function formatDay(isoDate: string) {
  // Slice the "YYYY-MM-DD" string directly instead of parsing a Date — the
  // API returns a plain calendar date with no time component, and letting
  // `new Date(...)` reinterpret it in the browser's local timezone can shift
  // the displayed day by one.
  return isoDate.slice(5);
}

export function UsageChart() {
  const { data, isLoading, isError } = useDashboardUsageHistory();

  if (isLoading) {
    return <div className="h-[320px] rounded-lg border border-edge bg-card animate-skeleton" />;
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center h-[320px] rounded-lg border border-edge bg-card text-sm text-danger">
        Could not load usage history.
      </div>
    );
  }

  const chartData = data.points.map((p) => ({
    ...p,
    day: formatDay(p.date),
  }));

  return (
    <div className="bg-card border border-edge rounded-lg p-5 shadow-card">
      <h3 className="text-sm font-semibold text-ink mb-1">Usage — last 30 days</h3>
      <p className="text-xs text-ink-muted mb-4">Deliveries handled and distance driven per day</p>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid stroke="#2a4331" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#9fb8a8"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: '#2a4331' }}
              minTickGap={24}
            />
            <YAxis
              yAxisId="deliveries"
              stroke="#9fb8a8"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              width={32}
            />
            <YAxis
              yAxisId="distance"
              orientation="right"
              stroke="#9fb8a8"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={40}
              unit="km"
            />
            <Tooltip
              contentStyle={{
                background: '#16281c',
                border: '1px solid #2a4331',
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: '#e8f3ec' }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line
              yAxisId="deliveries"
              type="monotone"
              dataKey="deliveriesCount"
              name="Deliveries"
              stroke="#2f9e5c"
              strokeWidth={2}
              dot={false}
            />
            <Line
              yAxisId="distance"
              type="monotone"
              dataKey="distanceKm"
              name="Distance (km)"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

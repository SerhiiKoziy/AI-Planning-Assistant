import { useState } from 'react';

import { Badge } from '../../../components/shared';
import { useDebounce } from '../../../hooks/useDebounce';
import { useDeleteDelivery } from '../api/useDeleteDelivery';
import { useDeliveries } from '../api/useDeliveries';
import type { DeliveryPriority, DeliveryStatus } from '../types';

const STATUS_LABELS: Record<DeliveryStatus, string> = {
  pending: 'Pending',
  assigned: 'Assigned',
  in_transit: 'In Transit',
  delivered: 'Delivered',
  failed: 'Failed',
};

const PRIORITY_LABELS: Record<DeliveryPriority, string> = {
  low: 'Low',
  normal: 'Normal',
  high: 'High',
  vip: 'VIP',
};

const inputCls =
  'bg-panel border border-edge rounded-lg px-3.5 py-2 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-primary transition-colors';

interface Props {
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: (ids: string[]) => void;
  selectionLimitReached?: boolean;
}

export function DeliveriesTable({ selectedIds, onToggle, onToggleAll, selectionLimitReached }: Props) {
  const { data: deliveries = [], isLoading, isError } = useDeliveries();
  const deleteDelivery = useDeleteDelivery();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<DeliveryStatus | ''>('');
  const [priorityFilter, setPriorityFilter] = useState<DeliveryPriority | ''>('');
  const debouncedSearch = useDebounce(search, 250);

  const filtered = deliveries.filter((d) => {
    const q = debouncedSearch.toLowerCase();
    const matchesSearch =
      !q ||
      d.customer_name.toLowerCase().includes(q) ||
      d.address.toLowerCase().includes(q) ||
      (d.order_number ?? '').toLowerCase().includes(q);
    const matchesStatus = !statusFilter || d.status === statusFilter;
    const matchesPriority = !priorityFilter || d.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const formatWindow = (start: string | null, end: string | null) => {
    if (!start && !end) return '—';
    const fmt = (t: string) => t.slice(0, 5);
    if (start && end) return `${fmt(start)} – ${fmt(end)}`;
    return start ? `From ${fmt(start)}` : `Until ${fmt(end!)}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-3 py-16 text-ink-muted">
        <div className="w-5 h-5 border-2 border-edge border-t-primary rounded-full animate-spin" />
        <span>Loading deliveries…</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-danger">
        Failed to load deliveries.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2.5">
        <input
          className={`${inputCls} w-64`}
          type="search"
          placeholder="Search customer, address, order…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={inputCls}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as DeliveryStatus | '')}
        >
          <option value="">All statuses</option>
          {(Object.keys(STATUS_LABELS) as DeliveryStatus[]).map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
        <select
          className={inputCls}
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as DeliveryPriority | '')}
        >
          <option value="">All priorities</option>
          {(Object.keys(PRIORITY_LABELS) as DeliveryPriority[]).map((p) => (
            <option key={p} value={p}>{PRIORITY_LABELS[p]}</option>
          ))}
        </select>
        <span className="ml-auto text-xs text-ink-muted">{filtered.length} results</span>
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-2 text-center">
          <span className="text-5xl mb-2">📦</span>
          <p className="font-semibold text-ink">No deliveries found</p>
          {deliveries.length === 0 && (
            <p className="text-sm text-ink-muted">Create your first delivery to get started</p>
          )}
        </div>
      ) : (
        /* Table */
        <div className="overflow-x-auto rounded-lg border border-edge">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-panel px-4 py-2.5 border-b border-edge w-10">
                  <input
                    type="checkbox"
                    checked={filtered.length > 0 && filtered.every((d) => selectedIds.has(d.id))}
                    ref={(el) => {
                      if (el) {
                        el.indeterminate =
                          filtered.some((d) => selectedIds.has(d.id)) &&
                          !filtered.every((d) => selectedIds.has(d.id));
                      }
                    }}
                    onChange={() => onToggleAll(filtered.map((d) => d.id))}
                  />
                </th>
                {['Customer', 'Address', 'Priority', 'Status', 'Time Window', 'Unload', ''].map(
                  (h) => (
                    <th
                      key={h}
                      className="bg-panel text-ink-muted font-medium text-xs uppercase tracking-wider px-4 py-2.5 text-left border-b border-edge whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((delivery) => (
                <tr
                  key={delivery.id}
                  className="border-b border-edge last:border-b-0 hover:bg-card-hover transition-colors"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(delivery.id)}
                      disabled={selectionLimitReached && !selectedIds.has(delivery.id)}
                      onChange={() => onToggle(delivery.id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-ink">{delivery.customer_name}</div>
                    {delivery.phone && (
                      <div className="text-xs text-ink-muted mt-0.5">{delivery.phone}</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-ink">{delivery.address}</div>
                    {delivery.order_number && (
                      <div className="text-xs text-ink-muted mt-0.5">#{delivery.order_number}</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={delivery.priority}>{PRIORITY_LABELS[delivery.priority]}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={delivery.status}>{STATUS_LABELS[delivery.status]}</Badge>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-ink-muted whitespace-nowrap">
                    {formatWindow(delivery.delivery_window_start, delivery.delivery_window_end)}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-ink-muted">
                    {delivery.unloading_minutes}m
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="px-2 py-1 rounded text-xs text-ink-muted hover:bg-danger-muted hover:text-danger transition-colors cursor-pointer bg-transparent border-none"
                      title="Delete"
                      onClick={() => {
                        if (confirm(`Delete delivery for ${delivery.customer_name}?`)) {
                          deleteDelivery.mutate(delivery.id);
                        }
                      }}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';

import { Button } from '../components/shared';
import { CreateDeliveryModal, DeliveriesTable } from '../features/deliveries';
import { GenerateRouteModal, MAX_ROUTE_DELIVERIES } from '../features/routes';

export function DeliveriesPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [showGenerateRoute, setShowGenerateRoute] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectionNotice, setSelectionNotice] = useState<string | null>(null);

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.has(id)) {
        const next = new Set(prev);
        next.delete(id);
        setSelectionNotice(null);
        return next;
      }
      if (prev.size >= MAX_ROUTE_DELIVERIES) {
        setSelectionNotice(`You can select up to ${MAX_ROUTE_DELIVERIES} deliveries for a route.`);
        return prev;
      }
      setSelectionNotice(null);
      return new Set(prev).add(id);
    });
  };

  const toggleAll = (ids: string[]) => {
    setSelectedIds((prev) => {
      const capped = ids.length > MAX_ROUTE_DELIVERIES ? ids.slice(0, MAX_ROUTE_DELIVERIES) : ids;
      const allSelected = capped.length > 0 && capped.every((id) => prev.has(id));
      if (allSelected) {
        const next = new Set(prev);
        ids.forEach((id) => next.delete(id));
        setSelectionNotice(null);
        return next;
      }
      if (ids.length > MAX_ROUTE_DELIVERIES) {
        setSelectionNotice(
          `Only the first ${MAX_ROUTE_DELIVERIES} deliveries were selected — maximum ${MAX_ROUTE_DELIVERIES} allowed.`,
        );
        return new Set(capped);
      }
      setSelectionNotice(null);
      return new Set([...prev, ...ids]);
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-ink m-0">Deliveries</h1>
        <div className="flex items-center gap-2.5">
          {selectedIds.size > 0 && (
            <Button variant="secondary" onClick={() => setShowGenerateRoute(true)}>
              Generate Route ({selectedIds.size})
            </Button>
          )}
          <Button onClick={() => setShowCreate(true)}>+ New Delivery</Button>
        </div>
      </div>
      {selectionNotice && <p className="form-error">{selectionNotice}</p>}
      <DeliveriesTable
        selectedIds={selectedIds}
        onToggle={toggle}
        onToggleAll={toggleAll}
        selectionLimitReached={selectedIds.size >= MAX_ROUTE_DELIVERIES}
      />
      <CreateDeliveryModal isOpen={showCreate} onClose={() => setShowCreate(false)} />
      <GenerateRouteModal
        isOpen={showGenerateRoute}
        onClose={() => setShowGenerateRoute(false)}
        deliveryIds={[...selectedIds]}
        onGenerated={() => setSelectedIds(new Set())}
      />
    </div>
  );
}

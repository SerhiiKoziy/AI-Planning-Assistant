import { useState } from 'react';

import { Button } from '../components/shared';
import { CreateDeliveryModal, DeliveriesTable } from '../features/deliveries';
import { GenerateRouteModal } from '../features/routes';

export function DeliveriesPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [showGenerateRoute, setShowGenerateRoute] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = (ids: string[]) => {
    setSelectedIds((prev) => {
      const allSelected = ids.length > 0 && ids.every((id) => prev.has(id));
      if (allSelected) {
        const next = new Set(prev);
        ids.forEach((id) => next.delete(id));
        return next;
      }
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
      <DeliveriesTable selectedIds={selectedIds} onToggle={toggle} onToggleAll={toggleAll} />
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

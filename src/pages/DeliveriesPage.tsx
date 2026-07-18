import { useState } from 'react';

import { Button } from '../components/shared';
import { CreateDeliveryModal, DeliveriesTable } from '../features/deliveries';

export function DeliveriesPage() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-ink m-0">Deliveries</h1>
        <Button onClick={() => setShowCreate(true)}>+ New Delivery</Button>
      </div>
      <DeliveriesTable />
      <CreateDeliveryModal isOpen={showCreate} onClose={() => setShowCreate(false)} />
    </div>
  );
}

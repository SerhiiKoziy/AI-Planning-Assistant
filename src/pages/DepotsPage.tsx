import { useState } from 'react';

import { Button } from '../components/shared';
import { CreateDepotModal, DepotsList } from '../features/depots';

export function DepotsPage() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-ink m-0">Depots</h1>
        <Button onClick={() => setShowCreate(true)}>+ New Depot</Button>
      </div>
      <DepotsList />
      <CreateDepotModal isOpen={showCreate} onClose={() => setShowCreate(false)} />
    </div>
  );
}

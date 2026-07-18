import { useState } from 'react';

import { Button } from '../components/shared';
import { CreateDriverModal, DriversList } from '../features/drivers';

export function DriversPage() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-ink m-0">Drivers</h1>
        <Button onClick={() => setShowCreate(true)}>+ New Driver</Button>
      </div>
      <DriversList />
      <CreateDriverModal isOpen={showCreate} onClose={() => setShowCreate(false)} />
    </div>
  );
}

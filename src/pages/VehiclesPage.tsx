import { useState } from 'react';

import { Button } from '../components/shared';
import { CreateVehicleModal, VehiclesList } from '../features/vehicles';

export function VehiclesPage() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-ink m-0">Vehicles</h1>
        <Button onClick={() => setShowCreate(true)}>+ New Vehicle</Button>
      </div>
      <VehiclesList />
      <CreateVehicleModal isOpen={showCreate} onClose={() => setShowCreate(false)} />
    </div>
  );
}

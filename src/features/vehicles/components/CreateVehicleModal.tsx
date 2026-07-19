import { useState } from 'react';

import { Button, Modal } from '../../../components/shared';
import { getApiErrorMessage } from '../../../utils/getApiErrorMessage';
import { useDrivers } from '../../drivers';
import { useCreateVehicle } from '../api/useCreateVehicle';
import type { VehicleCreate } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const EMPTY_FORM: VehicleCreate = {
  plate_number: '',
  capacity_weight_kg: 500,
  capacity_volume_m3: 5,
  driver_id: undefined,
};

export function CreateVehicleModal({ isOpen, onClose }: Props) {
  const createVehicle = useCreateVehicle();
  const { data: drivers = [], isLoading: driversLoading } = useDrivers();
  const [form, setForm] = useState<VehicleCreate>(EMPTY_FORM);

  const set = (field: keyof VehicleCreate) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const raw = e.target.value;
      const value =
        field === 'capacity_weight_kg' || field === 'capacity_volume_m3'
          ? Number(raw)
          : field === 'driver_id'
            ? raw || undefined
            : raw;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createVehicle.mutate(form, {
      onSuccess: () => {
        setForm(EMPTY_FORM);
        onClose();
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="New Vehicle"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
          <Button
            type="submit"
            form="create-vehicle-form"
            disabled={createVehicle.isPending}
          >
            {createVehicle.isPending ? 'Creating...' : 'Create'}
          </Button>
        </>
      }
    >
      {createVehicle.isError && (
        <div className="form-error">
          {getApiErrorMessage(createVehicle.error, 'Failed to create vehicle.')}
        </div>
      )}
      <form id="create-vehicle-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="veh-plate">Plate Number *</label>
          <input
            id="veh-plate"
            required
            value={form.plate_number}
            onChange={set('plate_number')}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="field">
            <label htmlFor="veh-weight">Capacity (kg)</label>
            <input
              id="veh-weight"
              type="number"
              min={0}
              value={form.capacity_weight_kg}
              onChange={set('capacity_weight_kg')}
            />
          </div>
          <div className="field">
            <label htmlFor="veh-volume">Capacity (m³)</label>
            <input
              id="veh-volume"
              type="number"
              min={0}
              step="any"
              value={form.capacity_volume_m3}
              onChange={set('capacity_volume_m3')}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="veh-driver">Driver</label>
          <select
            id="veh-driver"
            value={form.driver_id ?? ''}
            onChange={set('driver_id')}
            disabled={driversLoading}
          >
            <option value="">{driversLoading ? 'Loading drivers…' : 'No driver assigned'}</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>{driver.name}</option>
            ))}
          </select>
          <span className="text-xs text-ink-muted mt-1 block">
            A vehicle without a driver can't be used to generate a route.
          </span>
        </div>
      </form>
    </Modal>
  );
}

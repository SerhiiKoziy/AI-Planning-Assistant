import { useState } from 'react';

import { Button, Modal } from '../../../components/shared';
import { getApiErrorMessage } from '../../../utils/getApiErrorMessage';
import { useCreateDepot } from '../api/useCreateDepot';
import type { DepotCreate } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const EMPTY_FORM: DepotCreate = { address: '', latitude: 0, longitude: 0 };

export function CreateDepotModal({ isOpen, onClose }: Props) {
  const createDepot = useCreateDepot();
  const [form, setForm] = useState<DepotCreate>(EMPTY_FORM);

  const setField = (field: keyof DepotCreate) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = field === 'address' ? e.target.value : Number(e.target.value);
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createDepot.mutate(form, {
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
      title="New Depot"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
          <Button
            type="submit"
            form="create-depot-form"
            disabled={createDepot.isPending}
          >
            {createDepot.isPending ? 'Creating...' : 'Create'}
          </Button>
        </>
      }
    >
      {createDepot.isError && (
        <div className="form-error">
          {getApiErrorMessage(createDepot.error, 'Failed to create depot.')}
        </div>
      )}
      <form id="create-depot-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="dep-address">Address *</label>
          <input id="dep-address" required value={form.address} onChange={setField('address')} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="field">
            <label htmlFor="dep-lat">Latitude *</label>
            <input
              id="dep-lat"
              required
              type="number"
              step="any"
              value={form.latitude}
              onChange={setField('latitude')}
            />
          </div>
          <div className="field">
            <label htmlFor="dep-lng">Longitude *</label>
            <input
              id="dep-lng"
              required
              type="number"
              step="any"
              value={form.longitude}
              onChange={setField('longitude')}
            />
          </div>
        </div>
        <p className="text-xs text-ink-muted mt-1">
          Coordinates aren't geocoded automatically yet — look the address up on a map and paste
          its latitude/longitude here.
        </p>
      </form>
    </Modal>
  );
}

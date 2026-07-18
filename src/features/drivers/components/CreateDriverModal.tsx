import { useState } from 'react';

import { Button, Modal } from '../../../components/shared';
import { getApiErrorMessage } from '../../../utils/getApiErrorMessage';
import { useCreateDriver } from '../api/useCreateDriver';
import type { DriverCreate } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateDriverModal({ isOpen, onClose }: Props) {
  const createDriver = useCreateDriver();
  const [form, setForm] = useState<DriverCreate>({
    name: '',
    phone: '',
    working_hours_start: '08:00',
    working_hours_end: '18:00',
    break_start: '13:00',
    break_end: '14:00',
    max_working_minutes: 600,
  });

  const set = (field: keyof DriverCreate) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createDriver.mutate(
      {
        ...form,
        working_hours_start: form.working_hours_start + ':00',
        working_hours_end: form.working_hours_end + ':00',
        break_start: form.break_start ? form.break_start + ':00' : undefined,
        break_end: form.break_end ? form.break_end + ':00' : undefined,
      },
      {
        onSuccess: () => {
          setForm({
            name: '',
            phone: '',
            working_hours_start: '08:00',
            working_hours_end: '18:00',
            break_start: '13:00',
            break_end: '14:00',
            max_working_minutes: 600,
          });
          onClose();
        },
      },
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="New Driver"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
          <Button
            type="submit"
            form="create-driver-form"
            disabled={createDriver.isPending}
          >
            {createDriver.isPending ? 'Creating...' : 'Create'}
          </Button>
        </>
      }
    >
      {createDriver.isError && (
        <div className="form-error">
          {getApiErrorMessage(createDriver.error, 'Failed to create driver.')}
        </div>
      )}
      <form id="create-driver-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="drv-name">Name *</label>
          <input id="drv-name" required value={form.name} onChange={set('name')} />
        </div>
        <div className="field">
          <label htmlFor="drv-phone">Phone *</label>
          <input id="drv-phone" required type="tel" value={form.phone} onChange={set('phone')} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="field">
            <label htmlFor="drv-start">Work Start</label>
            <input id="drv-start" type="time" value={form.working_hours_start} onChange={set('working_hours_start')} />
          </div>
          <div className="field">
            <label htmlFor="drv-end">Work End</label>
            <input id="drv-end" type="time" value={form.working_hours_end} onChange={set('working_hours_end')} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="field">
            <label htmlFor="drv-brk-s">Break Start</label>
            <input id="drv-brk-s" type="time" value={form.break_start ?? ''} onChange={set('break_start')} />
          </div>
          <div className="field">
            <label htmlFor="drv-brk-e">Break End</label>
            <input id="drv-brk-e" type="time" value={form.break_end ?? ''} onChange={set('break_end')} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="drv-max">Max Working (min)</label>
          <input
            id="drv-max"
            type="number"
            min={60}
            max={1440}
            value={form.max_working_minutes}
            onChange={set('max_working_minutes')}
          />
        </div>
      </form>
    </Modal>
  );
}

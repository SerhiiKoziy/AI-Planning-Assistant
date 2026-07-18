import { useState } from 'react';

import { Button, Modal } from '../../../components/shared';
import { getApiErrorMessage } from '../../../utils/getApiErrorMessage';
import { useCreateDelivery } from '../api/useCreateDelivery';
import type { DeliveryCreate, DeliveryPriority } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PRIORITY_OPTIONS: DeliveryPriority[] = ['low', 'normal', 'high', 'vip'];

export function CreateDeliveryModal({ isOpen, onClose }: Props) {
  const createDelivery = useCreateDelivery();
  const [form, setForm] = useState<DeliveryCreate>({
    customer_name: '',
    address: '',
    priority: 'normal',
  });

  const set = (field: keyof DeliveryCreate) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createDelivery.mutate(form, {
      onSuccess: () => {
        setForm({ customer_name: '', address: '', priority: 'normal' });
        onClose();
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="New Delivery"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
          <Button
            type="submit"
            form="create-delivery-form"
            disabled={createDelivery.isPending}
          >
            {createDelivery.isPending ? 'Creating...' : 'Create'}
          </Button>
        </>
      }
    >
      {createDelivery.isError && (
        <div className="form-error">
          {getApiErrorMessage(createDelivery.error, 'Failed to create delivery.')}
        </div>
      )}
      <form id="create-delivery-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="cd-name">Customer Name *</label>
          <input id="cd-name" required value={form.customer_name} onChange={set('customer_name')} />
        </div>
        <div className="field">
          <label htmlFor="cd-phone">Phone</label>
          <input id="cd-phone" type="tel" value={form.phone ?? ''} onChange={set('phone')} />
        </div>
        <div className="field">
          <label htmlFor="cd-address">Address *</label>
          <input id="cd-address" required value={form.address} onChange={set('address')} />
        </div>
        <div className="field">
          <label htmlFor="cd-order">Order Number</label>
          <input id="cd-order" value={form.order_number ?? ''} onChange={set('order_number')} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="field">
            <label htmlFor="cd-priority">Priority</label>
            <select id="cd-priority" value={form.priority} onChange={set('priority')}>
              {PRIORITY_OPTIONS.map((p) => (
                <option key={p} value={p}>{p.toUpperCase()}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="cd-unload">Unloading (min)</label>
            <input id="cd-unload" type="number" min={0} value={form.unloading_minutes ?? 0} onChange={set('unloading_minutes')} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="field">
            <label htmlFor="cd-win-start">Window Start</label>
            <input id="cd-win-start" type="time" value={form.delivery_window_start ?? ''} onChange={set('delivery_window_start')} />
          </div>
          <div className="field">
            <label htmlFor="cd-win-end">Window End</label>
            <input id="cd-win-end" type="time" value={form.delivery_window_end ?? ''} onChange={set('delivery_window_end')} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="cd-notes">Notes</label>
          <textarea id="cd-notes" rows={3} value={form.notes ?? ''} onChange={set('notes')} />
        </div>
      </form>
    </Modal>
  );
}

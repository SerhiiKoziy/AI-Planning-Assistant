import { useEffect, useState } from 'react';

import { Button, Modal } from '../../../components/shared';
import { getApiErrorMessage } from '../../../utils/getApiErrorMessage';
import { useChangePlan } from '../api/useChangePlan';
import { PLAN_OPTIONS } from '../constants';
import type { SubscriptionPlan } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: SubscriptionPlan;
}

export function ChangePlanModal({ isOpen, onClose, currentPlan }: Props) {
  const changePlan = useChangePlan();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(currentPlan);

  useEffect(() => {
    if (isOpen) {
      setSelectedPlan(currentPlan);
      changePlan.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentPlan]);

  const handleSubmit = () => {
    if (selectedPlan === currentPlan) {
      onClose();
      return;
    }
    changePlan.mutate(selectedPlan, { onSuccess: onClose });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Change plan"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={changePlan.isPending}>
            {changePlan.isPending ? 'Saving…' : 'Confirm'}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-3">
        {changePlan.isError && (
          <div className="form-error">
            {getApiErrorMessage(changePlan.error, 'Failed to change plan.')}
          </div>
        )}

        {PLAN_OPTIONS.map((option) => {
          const isCurrent = option.plan === currentPlan;
          const isSelected = option.plan === selectedPlan;
          return (
            <label
              key={option.plan}
              className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${
                isSelected ? 'border-primary bg-primary-muted' : 'border-edge bg-panel'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="plan"
                  style={{ width: 'auto' }}
                  checked={isSelected}
                  onChange={() => setSelectedPlan(option.plan)}
                />
                <div>
                  <div className="font-semibold text-ink flex items-center gap-2">
                    {option.label}
                    {isCurrent && (
                      <span className="text-[0.65rem] uppercase tracking-wide text-primary-light">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-ink-muted">{option.requestsLimit} requests</div>
                </div>
              </div>
              <div className="font-mono text-sm text-ink whitespace-nowrap">
                {option.priceUsd === 0 ? 'Free' : `$${option.priceUsd}/mo`}
              </div>
            </label>
          );
        })}
      </div>
    </Modal>
  );
}

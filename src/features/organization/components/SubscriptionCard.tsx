import { useState } from 'react';

import { Badge, Button } from '../../../components/shared';
import { useOrganization } from '../api/useOrganization';
import type { SubscriptionPlan } from '../types';
import { ChangePlanModal } from './ChangePlanModal';

const PLAN_LABELS: Record<SubscriptionPlan, string> = {
  trial: 'Trial',
  free: 'Free',
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
};

export function SubscriptionCard() {
  const { data, isLoading, isError } = useOrganization();
  const [isChangingPlan, setIsChangingPlan] = useState(false);

  if (isLoading) {
    return <div className="h-[132px] rounded-lg border border-edge bg-card animate-skeleton" />;
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center py-8 rounded-lg border border-edge bg-card text-sm text-danger">
        Could not load subscription info.
      </div>
    );
  }

  const isUnlimited = data.apiRequestsLimit === null;
  const percentUsed = isUnlimited
    ? 0
    : Math.min(100, Math.round((data.apiRequestsUsed / Math.max(data.apiRequestsLimit!, 1)) * 100));
  const nearLimit = !isUnlimited && percentUsed >= 90;

  return (
    <div className="bg-card border border-edge rounded-lg p-5 shadow-card flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-ink-muted uppercase tracking-wide">Subscription</span>
        <div className="flex items-center gap-2">
          <Badge variant={data.subscriptionPlan === 'trial' ? 'default' : 'vip'}>
            {PLAN_LABELS[data.subscriptionPlan]} plan
          </Badge>
          <Button variant="secondary" onClick={() => setIsChangingPlan(true)}>
            Change plan
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between text-sm">
          <span className="text-ink-muted">API requests used</span>
          <span className="font-mono text-xs text-ink">
            {data.apiRequestsUsed}
            {isUnlimited ? '' : ` / ${data.apiRequestsLimit}`}
          </span>
        </div>
        {isUnlimited ? (
          <div className="text-xs text-primary-light">Unlimited on this plan</div>
        ) : (
          <>
            <div className="h-2 rounded-full bg-edge overflow-hidden">
              <div
                className={`h-full rounded-full ${nearLimit ? 'bg-danger' : 'bg-primary'}`}
                style={{ width: `${percentUsed}%` }}
              />
            </div>
            <div className={`text-xs ${nearLimit ? 'text-danger' : 'text-ink-muted'}`}>
              {data.apiRequestsRemaining} requests remaining
            </div>
          </>
        )}
      </div>

      <ChangePlanModal
        isOpen={isChangingPlan}
        onClose={() => setIsChangingPlan(false)}
        currentPlan={data.subscriptionPlan}
      />
    </div>
  );
}

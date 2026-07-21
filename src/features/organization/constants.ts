import type { SubscriptionPlan } from './types';

export interface PlanOption {
  plan: SubscriptionPlan;
  label: string;
  requestsLimit: number;
  priceUsd: number;
}

// requestsLimit mirrors PLAN_API_REQUEST_LIMITS / PLAN_ROUTE_LIMITS+PLAN_GEOCODE_LIMITS+PLAN_AI_CALL_LIMITS
// in the backend's app/core/plans.py — keep both in sync if either changes.
export const PLAN_OPTIONS: PlanOption[] = [
  { plan: 'trial', label: 'Trial', requestsLimit: 15, priceUsd: 0 },
  { plan: 'small', label: 'Small', requestsLimit: 30, priceUsd: 5 },
  { plan: 'medium', label: 'Medium', requestsLimit: 60, priceUsd: 10 },
  { plan: 'large', label: 'Large', requestsLimit: 100, priceUsd: 15 },
];

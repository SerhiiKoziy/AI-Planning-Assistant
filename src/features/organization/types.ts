export type SubscriptionPlan = 'trial' | 'free' | 'small' | 'medium' | 'large';

export interface Organization {
  id: string;
  name: string;
  subscriptionPlan: SubscriptionPlan;
  routesGeneratedCount: number;
  routesLimit: number | null;
  routesRemaining: number | null;
  geocodeCallsCount: number;
  geocodeCallsLimit: number | null;
  geocodeCallsRemaining: number | null;
  aiCallsCount: number;
  aiCallsLimit: number | null;
  aiCallsRemaining: number | null;
  apiRequestsUsed: number;
  apiRequestsLimit: number | null;
  apiRequestsRemaining: number | null;
}

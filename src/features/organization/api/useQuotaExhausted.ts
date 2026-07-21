import { useOrganization } from './useOrganization';

// `apiRequestsRemaining` is `null` on unlimited plans, so only a literal 0
// means the plan's combined request quota is actually exhausted.
export function useQuotaExhausted(): boolean {
  const { data } = useOrganization();
  return data?.apiRequestsRemaining === 0;
}

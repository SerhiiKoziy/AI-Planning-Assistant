import { useMutation } from '@tanstack/react-query';

import { apiClient } from '../../../api/client';

export interface GeocodeResult {
  latitude: number;
  longitude: number;
  formatted_address: string;
}

async function geocodeAddress(address: string): Promise<GeocodeResult> {
  const { data } = await apiClient.post<GeocodeResult>('/depots/geocode', { address });
  return data;
}

export function useGeocodeAddress() {
  return useMutation({ mutationFn: geocodeAddress });
}

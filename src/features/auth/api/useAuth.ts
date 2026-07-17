import { useMutation } from '@tanstack/react-query';

import { apiClient } from '../../../api/client';
import { useAuthStore } from '../../../store/authStore';
import type { AuthTokens, LoginRequest, User } from '../types';

async function login(request: LoginRequest): Promise<{ user: User; tokens: AuthTokens }> {
  // TODO: wire to real backend endpoint once available
  const { data } = await apiClient.post<{ user: User; tokens: AuthTokens }>(
    '/auth/login',
    request,
  );
  return data;
}

export function useAuth() {
  const storeLogin = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: ({ user, tokens }) => storeLogin(tokens.accessToken, user),
  });

  return { login: loginMutation, logout };
}

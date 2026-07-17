export interface User {
  id: string;
  email: string;
  name: string;
  role: 'manager' | 'admin';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

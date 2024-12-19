export type UserRole = 'administrator' | 'analyst' | 'operations';

export interface UserData {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthError {
  message: string;
  code?: string;
}
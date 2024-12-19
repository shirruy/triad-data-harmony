import React, { createContext, useContext, useMemo } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { UserData, UserRole } from '@/lib/auth/types';
import { useAuthState } from '@/hooks/auth/useAuthState';
import { useAuthActions } from '@/hooks/auth/useAuthActions';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userData: UserData | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  register: (email: string, password: string, role?: UserRole) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authState = useAuthState();
  const authActions = useAuthActions();

  const value = useMemo(() => ({
    ...authState,
    ...authActions,
  }), [authState, authActions]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
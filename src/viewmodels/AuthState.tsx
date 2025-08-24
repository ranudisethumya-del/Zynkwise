import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../api/authService';

type UserVM = { uid: string; name?: string; email?: string } | null;
type AuthStateType = { user: UserVM; loading: boolean };

const AuthStateCtx = createContext<AuthStateType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserVM>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = authService.onAuthChanged(u => {
      setUser(u ? { uid: u.uid, name: u.displayName ?? undefined, email: u.email ?? undefined } : null);
      setLoading(false);
    });
    return unsub;
  }, []);

  const value = useMemo(() => ({ user, loading }), [user, loading]);
  return <AuthStateCtx.Provider value={value}>{children}</AuthStateCtx.Provider>;
}

export function useAuthState() {
  const ctx = useContext(AuthStateCtx);
  if (!ctx) throw new Error('useAuthState must be used within AuthProvider');
  return ctx;
}

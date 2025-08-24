import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { authService, CreateUserPayload } from '../api/authService';

type UserVM = { uid: string; name?: string; email?: string } | null;

type AuthContextType = {
  user: UserVM;
  loading: boolean;
  signInEmail: (email: string, password: string) => Promise<void>;
  signUpEmail: (p: CreateUserPayload) => Promise<void>;
  signInGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthCtx = createContext<AuthContextType | null>(null);

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

  const value = useMemo<AuthContextType>(() => ({
    user,
    loading,
    async signInEmail(email, password) {
      await authService.signInWithEmail(email, password);
    },
    async signUpEmail(p) {
      await authService.signUpWithEmail(p);
    },
    async signInGoogle() {
      // supports both return shapes from the lib
      const result: any = await GoogleSignin.signIn();
      const idToken = result?.idToken ?? result?.data?.idToken;
      if (!idToken) throw new Error('No Google idToken');
      await authService.signInWithGoogleIdToken(idToken);
    },
    async signOut() {
      try { await GoogleSignin.signOut(); } catch {}
      await authService.signOut();
    },
  }), [user, loading]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

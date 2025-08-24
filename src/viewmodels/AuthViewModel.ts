/**
 * AuthViewModel.ts
 * ViewModel for Sign In / Sign Up flows (MVVM).
 *
 * Exports:
 *  - default: AuthViewModel (class)
 *  - useAuthViewModel(): AuthViewModel   // hook for screens
 *  - useAuthVM: same as useAuthViewModel // alias (used by SignInScreen)
 */

import { Alert } from 'react-native';
import { useRef } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default class AuthViewModel {
  // ------------ observable-ish fields ------------
  email: string = '';
  password: string = '';
  name: string = '';

  loading: boolean = false;
  error: string | null = null;

  // ------------ setters used by the View ------------
  setEmail = (v: string) => {
    this.email = (v ?? '').trim();
  };

  setPassword = (v: string) => {
    this.password = v ?? '';
  };

  setName = (v: string) => {
    this.name = (v ?? '').trim();
  };

  resetError = () => {
    this.error = null;
  };

  // ------------ Email/Password ------------
  /**
   * Sign in with email/password (alias method below matches what the View calls)
   */
  signInWithEmailPassword = async () => {
    if (!this.email || !this.password) {
      Alert.alert('Missing info', 'Please fill email and password.');
      return;
    }

    try {
      this.loading = true;
      await auth().signInWithEmailAndPassword(this.email, this.password);
      Alert.alert('Signed in', 'Welcome to Zynkwise 👋');
    } catch (e: any) {
      this.error = e?.message ?? String(e);
      Alert.alert('Sign-in failed', this.error);
      throw e;
    } finally {
      this.loading = false;
    }
  };

  /**
   * Sign up with email/password and optional display name.
   */
  signUpWithEmailPassword = async () => {
    if (!this.email || !this.password) {
      Alert.alert('Missing info', 'Please fill email and password.');
      return;
    }

    try {
      this.loading = true;
      const cred = await auth().createUserWithEmailAndPassword(
        this.email,
        this.password,
      );

      if (this.name) {
        await cred.user.updateProfile({ displayName: this.name });
      }

      Alert.alert('Account created', 'Welcome to Zynkwise 👋');
    } catch (e: any) {
      this.error = e?.message ?? String(e);
      Alert.alert('Sign-up failed', this.error);
      throw e;
    } finally {
      this.loading = false;
    }
  };

  // ------------ Google Sign-In ------------
  /**
   * Google OAuth → Firebase credential sign-in.
   */
  signInWithGoogle = async () => {
    try {
      this.loading = true;

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Best-effort clean sessions
      try {
        await GoogleSignin.signOut();
      } catch {}
      try {
        await auth().signOut();
      } catch {}

      // NOTE: Depending on lib version, result may be { idToken } or { data: { idToken } }
      const result: any = await GoogleSignin.signIn();
      const idToken = result?.idToken ?? result?.data?.idToken;
      if (!idToken) throw new Error('No idToken from Google');

      const credential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(credential);

      Alert.alert('Signed in', 'Welcome to Zynkwise 👋');
    } catch (e: any) {
      this.error = e?.message ?? String(e);
      Alert.alert('Google Sign-In failed', this.error);
      throw e;
    } finally {
      this.loading = false;
    }
  };

  // ------------ Sign out ------------
  signOut = async () => {
    try {
      await GoogleSignin.signOut().catch(() => {});
      await auth().signOut();
      Alert.alert('Signed out');
    } catch (e: any) {
      Alert.alert('Sign out failed', e?.message ?? String(e));
    }
  };

  // ------------ Aliases expected by the View ------------
  /**
   * Some screens call vm.signInWithEmail(); keep aliasing to the canonical method.
   */
  signInWithEmail = async () => this.signInWithEmailPassword();
}

/**
 * Hook that returns a stable instance of AuthViewModel.
 * This satisfies imports like:
 *   import { useAuthViewModel } from '../viewmodels/AuthViewModel';
 *   const vm = useAuthViewModel();
 */
export function useAuthViewModel() {
  const ref = useRef<AuthViewModel | null>(null);
  if (!ref.current) {
    ref.current = new AuthViewModel();
  }
  return ref.current;
}

/**
 * Alias used by some screens:
 *   import { useAuthVM } from '../viewmodels/AuthViewModel';
 */
export const useAuthVM = useAuthViewModel;

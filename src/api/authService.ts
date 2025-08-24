import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export type CreateUserPayload = {
  fullName: string;
  email: string;
  password: string;
  university?: string;
};

export const authService = {
  onAuthChanged(cb: (u: FirebaseAuthTypes.User | null) => void) {
    return auth().onAuthStateChanged(cb);
  },

  getCurrentUser() {
    return auth().currentUser;
  },

  async signInWithEmail(email: string, password: string) {
    return auth().signInWithEmailAndPassword(email.trim(), password);
  },

  async signUpWithEmail({ fullName, email, password }: CreateUserPayload) {
    const cred = await auth().createUserWithEmailAndPassword(email.trim(), password);
    await cred.user.updateProfile({ displayName: fullName });
    return cred.user;
  },

  async signInWithGoogleIdToken(idToken: string) {
    const cred = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(cred);
  },

  async signOut() {
    return auth().signOut();
  },
};

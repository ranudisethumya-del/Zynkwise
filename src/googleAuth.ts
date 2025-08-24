// src/googleAuth.ts
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export function configureGoogle() {
  GoogleSignin.configure({
    webClientId: '676501101616-kttlffdp4r4n46vrav3jg28mu2mqn6pg.apps.googleusercontent.com',
    offlineAccess: false,
  });
}

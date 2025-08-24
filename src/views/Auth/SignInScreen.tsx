// src/views/Auth/SignInScreen.tsx
import React, { useEffect } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthVM } from '../../viewmodels/AuthViewModel';
import { palette } from '../../theme/colors';
import SocialRow from '../../components/SocialRow';

export default function SignInScreen() {
  const insets = useSafeAreaInsets();
  const vm = useAuthVM();

  useEffect(() => {
    if (vm.error) {
      Alert.alert('Error', vm.error, [{ text: 'OK', onPress: vm.resetError }]);
    }
  }, [vm.error, vm.resetError]);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 24, paddingHorizontal: 20 },
      ]}
    >
      <Text style={styles.brand}>Zynkwise</Text>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.sub}>Sign in to manage your finances.</Text>

      {/* Email input */}
      <TextInput
        placeholder="Email or phone number"
        value={vm.email}
        onChangeText={vm.setEmail}
        style={styles.input}
        placeholderTextColor={palette.placeholder}
      />

      {/* Password input */}
      <TextInput
        placeholder="Password"
        value={vm.password}
        onChangeText={vm.setPassword}
        style={styles.input}
        placeholderTextColor={palette.placeholder}
        secureTextEntry
      />

      {/* Forgot password */}
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Primary sign-in button */}
      <TouchableOpacity
        style={[
          styles.primaryBtn,
          !vm.email || !vm.password ? styles.btnDisabled : null,
        ]}
        onPress={vm.signInWithEmail}
        disabled={!vm.email || !vm.password || vm.loading}
      >
        <Text style={styles.primaryText}>Sign In</Text>
      </TouchableOpacity>

      {/* Social sign-in row */}
      <SocialRow onGoogle={vm.signInWithGoogle} />

      {/* Footer link */}
      <Text style={styles.footerText}>
        New to Zynkwise? <Text style={styles.signUpLink}>Sign Up</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.background },
  brand: { fontSize: 22, fontWeight: '800', color: palette.primary },
  title: { marginTop: 12, fontSize: 28, fontWeight: '800', color: palette.text },
  sub: { marginTop: 6, color: palette.subtext },
  input: {
    marginTop: 16,
    height: 48,
    borderRadius: 12,
    backgroundColor: palette.inputBg,
    paddingHorizontal: 16,
    color: palette.text,
  },
  forgot: { marginTop: 12, color: palette.primary, fontWeight: '700' },
  primaryBtn: {
    marginTop: 12,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.primary,
  },
  primaryText: { color: '#fff', fontWeight: '700' },
  btnDisabled: { opacity: 0.5 },
  footerText: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: palette.subtext,
  },
  signUpLink: { color: palette.primary, fontWeight: '700' },
});

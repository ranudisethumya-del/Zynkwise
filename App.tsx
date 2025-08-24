import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { configureGoogle } from './src/googleAuth';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/viewmodels/AuthState';

export default function App() {
  const isDark = useColorScheme() === 'dark';
  useEffect(() => { configureGoogle(); }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../views/Auth/SignInScreen';
import SignUpScreen from '../views/Auth/SignUpScreen';
import HomeScreen from '../views/Home/HomeScreen';
import { useAuthState } from '../viewmodels/AuthState';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useAuthState();

  if (loading) return null; // optional: splash screen

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

// src/components/SocialRow.tsx
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { palette } from '../theme/colors';

interface Props {
  onGoogle?: () => void;
}

export default function SocialRow({ onGoogle }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Or continue with</Text>
      <TouchableOpacity style={styles.btn} onPress={onGoogle}>
        <Image
          source={require('../assets/icons/google.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  label: {
    color: palette.subtext,
    marginBottom: 8,
  },
  btn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.background,
  },
  icon: { width: 20, height: 20 },
});

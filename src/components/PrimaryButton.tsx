import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { palette } from '../theme/colors';

export default function PrimaryButton({
  title, onPress, disabled, loading,
}: { title: string; onPress: () => void; disabled?: boolean; loading?: boolean }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[s.btn, (disabled || loading) && { opacity: 0.6 }]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <Text style={s.text}>{loading ? 'Please wait…' : title}</Text>
      {loading ? <ActivityIndicator style={{ marginLeft: 8 }} /> : null}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  btn: {
    height: 48, borderRadius: 24, backgroundColor: palette.brand,
    alignItems: 'center', justifyContent: 'center',
  },
  text: { color: 'white', fontWeight: '700' },
});

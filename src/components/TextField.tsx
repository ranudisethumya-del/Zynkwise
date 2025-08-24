import React from 'react';
import { TextInput, TextInputProps, StyleSheet, View, Text } from 'react-native';
import { palette } from '../theme/colors';

type Props = TextInputProps & { label?: string; error?: string };

export default function TextField({ label, error, style, ...props }: Props) {
  return (
    <View style={{ marginBottom: 12 }}>
      {label ? <Text style={s.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor="#9CA3AF"
        style={[s.input, style, error && s.inputError]}
        {...props}
      />
      {error ? <Text style={s.error}>{error}</Text> : null}
    </View>
  );
}

const s = StyleSheet.create({
  label: { marginBottom: 6, color: palette.subtext },
  input: {
    height: 48,
    borderRadius: 12,
    backgroundColor: palette.inputBg,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: palette.inputBg,
  },
  inputError: { borderColor: palette.danger, backgroundColor: '#FDF2F2' },
  error: { color: palette.danger, marginTop: 6, fontSize: 12 },
});

import React from 'react';
import { StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import { palette } from '../theme/colors';

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
  returnKeyType?: any;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  containerStyle?: ViewStyle;
};

const Input: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  returnKeyType,
  autoCapitalize = 'none',
  containerStyle,
}) => {
  return (
    <View style={[styles.wrap, containerStyle]}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  wrap: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6', // softer than #E5E7EB
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    color: palette.text,
  },
});

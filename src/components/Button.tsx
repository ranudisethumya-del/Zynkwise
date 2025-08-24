import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { palette } from '../theme/colors';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
};

const Button: React.FC<Props> = ({ title, onPress, disabled, style }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.btn,
        disabled ? styles.disabled : styles.primary,
        style,
      ]}
    >
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: palette.brand, // #17A24A
  },
  disabled: {
    backgroundColor: '#C7E9D3',
  },
  label: {
    color: 'white',
    fontWeight: '800',
  },
});

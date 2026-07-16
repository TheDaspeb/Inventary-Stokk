import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";

import { AppInput } from "./AppInput";

type PasswordInputProps = {
  label?: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  error?: string;
};

export function PasswordInput({
  label = "Contraseña",
  value,
  onChangeText,
  placeholder = "Ingresa tu contraseña",
  error,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AppInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      error={error}
      secureTextEntry={!showPassword}
      autoCapitalize="none"
      rightElement={
        <Pressable
          onPress={() => setShowPassword((currentValue) => !currentValue)}
          hitSlop={10}
        >
          <Text style={styles.toggleText}>
            {showPassword ? "Ocultar" : "Ver"}
          </Text>
        </Pressable>
      }
    />
  );
}

const styles = StyleSheet.create({
  toggleText: {
    color: colors.primary,
    fontSize: typography.sizes.bodySmall,
    fontWeight: typography.weights.semiBold,
  },
});

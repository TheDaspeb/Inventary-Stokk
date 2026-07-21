import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  type TextInputProps,
} from "react-native";

import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";

import { AppInput } from "./AppInput";

type PasswordInputProps = Omit<TextInputProps, "secureTextEntry"> & {
  label?: string;
  error?: string;
};

export function PasswordInput({
  label = "Contraseña",
  placeholder = "Ingresa tu contraseña",
  error,
  ...textInputProps
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AppInput
      {...textInputProps}
      label={label}
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
import type { ReactNode } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";

type AppInputProps = TextInputProps & {
  label?: string;
  error?: string;
  rightElement?: ReactNode;
};

export function AppInput({
  label,
  error,
  rightElement,
  style,
  ...textInputProps
}: AppInputProps) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={[styles.inputContainer, error && styles.inputError]}>
        <TextInput
          {...textInputProps}
          style={[styles.input, style]}
          placeholderTextColor={colors.placeholder}
        />

        {rightElement ? (
          <View style={styles.rightElement}>{rightElement}</View>
        ) : null}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  label: {
    marginBottom: spacing.sm,
    color: colors.textPrimary,
    fontSize: typography.sizes.bodySmall,
    fontWeight: typography.weights.semiBold,
  },

  inputContainer: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
  },

  inputError: {
    borderColor: colors.danger,
  },

  input: {
    flex: 1,
    minHeight: 54,
    color: colors.textPrimary,
    fontSize: typography.sizes.body,
  },

  rightElement: {
    marginLeft: spacing.sm,
  },

  errorText: {
    marginTop: spacing.xs,
    color: colors.danger,
    fontSize: typography.sizes.caption,
  },
});
import type { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type ViewStyle,
} from "react-native";

import { colors } from "../../constants/colors";
import { typography } from "../../constants/typography";

type ButtonVariant = "primary" | "secondary" | "success" | "danger";

type AppButtonProps = PressableProps & {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
  leftIcon?: ReactNode;
  fullWidth?: boolean;
};

export function AppButton({
  title,
  variant = "primary",
  loading = false,
  disabled = false,
  leftIcon,
  fullWidth = true,
  style,
  ...pressableProps
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      {...pressableProps}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        fullWidth && styles.fullWidth,
        variantStyles[variant],
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "secondary" ? colors.primary : colors.white}
        />
      ) : (
        <>
          {leftIcon}
          <Text
            style={[
              styles.text,
              variant === "secondary"
                ? styles.secondaryText
                : styles.defaultText,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: colors.primary,
  },

  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
  },

  success: {
    backgroundColor: colors.success,
  },

  danger: {
    backgroundColor: colors.danger,
  },
};

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    borderRadius: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  fullWidth: {
    width: "100%",
  },

  text: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semiBold,
  },

  defaultText: {
    color: colors.white,
  },

  secondaryText: {
    color: colors.primary,
  },

  pressed: {
    opacity: 0.85,
  },

  disabled: {
    opacity: 0.5,
  },
});
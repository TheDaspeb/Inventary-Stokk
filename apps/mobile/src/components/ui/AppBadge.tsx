import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { radius } from "@/constants/radius";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";

type BadgeVariant = "info" | "success" | "warning" | "danger" | "neutral";

type AppBadgeProps = {
  label: string;
  variant?: BadgeVariant;
};

const badgeColors: Record<
  BadgeVariant,
  {
    background: string;
    text: string;
  }
> = {
  info: {
    background: "#DBEAFE",
    text: colors.primary,
  },

  success: {
    background: "#DCFCE7",
    text: colors.success,
  },

  warning: {
    background: "#FEF3C7",
    text: "#B45309",
  },

  danger: {
    background: "#FEE2E2",
    text: colors.danger,
  },

  neutral: {
    background: "#E2E8F0",
    text: colors.textSecondary,
  },
};

export function AppBadge({
  label,
  variant = "neutral",
}: AppBadgeProps) {
  const selectedColors = badgeColors[variant];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: selectedColors.background,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: selectedColors.text,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  text: {
    fontSize: typography.sizes.caption,
    fontWeight: typography.weights.semiBold,
  },
});
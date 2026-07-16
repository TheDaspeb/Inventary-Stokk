import type { PropsWithChildren } from "react";
import {
  StyleSheet,
  View,
  type ViewProps,
  type ViewStyle,
} from "react-native";

import { colors } from "@/constants/colors";
import { radius } from "@/constants/radius";
import { spacing } from "@/constants/spacing";

type CardVariant = "default" | "outlined";

type AppCardProps = PropsWithChildren<
  ViewProps & {
    variant?: CardVariant;
    padding?: keyof typeof spacing;
  }
>;

export function AppCard({
  children,
  variant = "default",
  padding = "md",
  style,
  ...viewProps
}: AppCardProps) {
  const variantStyle: ViewStyle =
    variant === "outlined"
      ? {
          borderWidth: 1,
          borderColor: colors.border,
        }
      : styles.shadow;

  return (
    <View
      {...viewProps}
      style={[
        styles.card,
        variantStyle,
        { padding: spacing[padding] },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: radius.md,
  },

  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
});
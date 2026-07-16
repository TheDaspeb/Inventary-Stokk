import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";

type AppLoaderProps = {
  message?: string;
  fullscreen?: boolean;
};

export function AppLoader({
  message = "Cargando...",
  fullscreen = false,
}: AppLoaderProps) {
  return (
    <View style={[styles.container, fullscreen && styles.fullscreen]}>
      <ActivityIndicator size="large" color={colors.primary} />

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },

  fullscreen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  message: {
    color: colors.textSecondary,
    fontSize: typography.sizes.bodySmall,
  },
});

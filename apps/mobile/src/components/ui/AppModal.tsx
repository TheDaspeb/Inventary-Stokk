import type { PropsWithChildren } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors } from "@/constants/colors";
import { radius } from "@/constants/radius";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";

type AppModalProps = PropsWithChildren<{
  visible: boolean;
  title?: string;
  onClose: () => void;
  closeOnBackdrop?: boolean;
}>;

export function AppModal({
  visible,
  title,
  onClose,
  closeOnBackdrop = true,
  children,
}: AppModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={closeOnBackdrop ? onClose : undefined}
        />

        <View style={styles.content}>
          {title ? (
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>

              <Pressable onPress={onClose} hitSlop={10}>
                <Text style={styles.close}>✕</Text>
              </Pressable>
            </View>
          ) : null}

          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    paddingHorizontal: spacing.lg,
  },

  content: {
    width: "100%",
    maxWidth: 420,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },

  title: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: typography.sizes.title,
    fontWeight: typography.weights.bold,
  },

  close: {
    color: colors.textSecondary,
    fontSize: typography.sizes.title,
  },
});
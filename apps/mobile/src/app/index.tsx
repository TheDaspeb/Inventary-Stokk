import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppBadge } from "@/components/ui/AppBadge";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppInput } from "@/components/ui/AppInput";
import { AppLoader } from "@/components/ui/AppLoader";
import { AppModal } from "@/components/ui/AppModal";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScreenContainer scrollable keyboardAvoiding>
      <View style={styles.container}>
        <Text style={styles.title}>Inventary-Stokk</Text>

        <Text style={styles.subtitle}>
          Prueba de componentes del Sprint 1
        </Text>

        <AppCard>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Producto de prueba</Text>

            <View style={styles.badges}>
              <AppBadge label="Disponible" variant="success" />
              <AppBadge label="Stock bajo" variant="warning" />
              <AppBadge label="Agotado" variant="danger" />
            </View>
          </View>
        </AppCard>

        <AppInput
          label="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          placeholder="correo@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <PasswordInput
          value={password}
          onChangeText={setPassword}
        />

        <AppButton
          title="Abrir modal"
          onPress={() => setModalVisible(true)}
        />

        <AppButton
          title="Cancelar"
          variant="secondary"
          onPress={() => console.log("Cancelar")}
        />

        <AppButton
          title="Guardar"
          variant="success"
          onPress={() => console.log({ email, password })}
        />

        <AppLoader message="Cargando productos..." />

        <AppModal
          visible={modalVisible}
          title="Modal de prueba"
          onClose={() => setModalVisible(false)}
        >
          <Text style={styles.modalText}>
            Los componentes base están funcionando correctamente.
          </Text>

          <View style={styles.modalButton}>
            <AppButton
              title="Cerrar"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </AppModal>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.lg,
  },

  title: {
    color: colors.textPrimary,
    fontSize: typography.sizes.heading,
    fontWeight: typography.weights.bold,
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.body,
  },

  cardContent: {
    gap: spacing.md,
  },

  cardTitle: {
    color: colors.textPrimary,
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semiBold,
  },

  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },

  modalText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.body,
  },

  modalButton: {
    marginTop: spacing.lg,
  },
});
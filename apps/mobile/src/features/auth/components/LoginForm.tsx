import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { PasswordInput } from "@/components/ui/PasswordInput";

import { useLogin } from "../hooks/useLogin";
import {
  loginSchema,
  type LoginSchema,
} from "../schemas/login.schema";

export function LoginForm() {
  const { login, isLoading, error, clearError } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(credentials: LoginSchema) {
    const success = await login(credentials);

    if (!success) {
      return;
    }

    console.log("Usuario autenticado correctamente");
  }

  return (
    <View>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            label="Correo electrónico"
            placeholder="correo@ejemplo.com"
            value={value}
            onBlur={onBlur}
            onChangeText={(text) => {
              clearError();
              onChange(text);
            }}
            error={errors.email?.message}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <PasswordInput
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            value={value}
            onBlur={onBlur}
            onChangeText={(text) => {
              clearError();
              onChange(text);
            }}
            error={errors.password?.message}
            editable={!isLoading}
          />
        )}
      />

      {error ? <Text>{error}</Text> : null}

      <AppButton
        title="Iniciar sesión"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        disabled={isLoading}
      />
    </View>
  );
}
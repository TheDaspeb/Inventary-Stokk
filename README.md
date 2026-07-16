# 📦 Inventary-Stokk

Sistema de inventario moderno desarrollado como un monorepo utilizando **Expo**, **Next.js**, **TypeScript** y **Supabase**.

El objetivo del proyecto es ofrecer una plataforma completa para la gestión de inventarios que funcione desde:

- 📱 Android
- 🍎 iOS
- 💻 Navegadores web
- 🖥️ Computadores

---

# 🚀 Tecnologías

## Frontend Mobile

- Expo
- React Native
- TypeScript

## Frontend Web

- Next.js
- React
- TypeScript

## Backend

- Supabase

## Validaciones

- Zod

## Formularios

- React Hook Form

---

# 📁 Arquitectura

El proyecto utiliza una arquitectura modular basada en **Features**.

```
inventary-stokk/

│

├── apps/
│ ├── mobile/
│ └── web/
│
├── docs/
│
└── README.md
```

## Mobile

```
src/

├── app/
├── components/
├── config/
├── constants/
├── features/
├── hooks/
├── lib/
├── services/
├── types/
└── utils/
```

---

# 📚 Convenciones

## app/

Contiene únicamente las rutas de Expo Router.

## components/

Componentes reutilizables para toda la aplicación.

## config/

Configuraciones globales del proyecto.

- Supabase
- Variables de entorno
- Navegación

## constants/

Valores globales.

- Colores
- Espaciados
- Radios
- Tipografía

## features/

Módulos del negocio.

Ejemplo:

```
features/

auth/

products/

inventory/

categories/
```

Cada módulo contiene:

```
components/

hooks/

schemas/

services/

types/
```

---

# 📂 Variables de entorno

## Mobile

Crear un archivo:

```
apps/mobile/.env
```

Agregar:

```env
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Estas variables pueden obtenerse desde:

Supabase

Project Settings

API

---

# ⚙️ Instalación

## 1 Clonar

```bash
git clone https://github.com/TheDaspeb/Inventary-Stokk.git
```

Entrar al proyecto

```bash
cd Inventary-Stokk
```

---

## 2 Instalar dependencias

### Mobile

```bash
cd apps/mobile

npm install
```

### Web

```bash
cd apps/web

npm install
```

---

# ▶️ Ejecutar el proyecto

## Mobile

```bash
cd apps/mobile

npx expo start
```

## Web

```bash
cd apps/web

npm run dev
```

---

# 📱 Ejecutar en Android

## Windows

Instalar:

- Node.js
- Android Studio
- Expo Go

Conectar el teléfono mediante USB.

Ejecutar:

```bash
npx expo start
```

---

## Linux

Instalar adb:

Ubuntu/Debian

```bash
sudo apt update

sudo apt install android-sdk-platform-tools
```

Verificar:

```bash
adb devices
```

Conectar el dispositivo:

```bash
adb reverse tcp:8081 tcp:8081
```

Iniciar Expo:

```bash
npx expo start --localhost
```

Abrir Expo Go.

---

# 🍎 Ejecutar en iOS

Requiere macOS.

Instalar:

- Xcode
- Expo Go

Ejecutar:

```bash
npx expo start
```

---

# 🛠️ Scripts

## Mobile

```bash
npm start
```

Inicia Expo.

```bash
npm run android
```

Ejecuta Android.

```bash
npm run ios
```

Ejecuta iOS.

```bash
npm run web
```

Ejecuta versión web.

---

# 📌 Estado actual

## Sprint 1

### Finalizado

- Arquitectura del proyecto
- Configuración de Expo
- Configuración de Supabase
- Variables de entorno
- Design System
- AppButton
- AppInput
- PasswordInput
- AppCard
- AppBadge
- AppLoader
- AppModal
- ScreenContainer

---

# 🚧 Próximos Sprints

## Sprint 2

- Login
- Registro
- Recuperar contraseña
- Persistencia de sesión

## Sprint 3

Dashboard

## Sprint 4

Productos

## Sprint 5

Inventario

## Sprint 6

Movimientos

---

# 🤝 Contribución

1.

Crear una rama

```bash
git checkout -b feature/nombre-feature
```

2.

Realizar cambios

3.

Commit

```bash
git commit -m "feat: descripción"
```

4.

Push

```bash
git push origin feature/nombre-feature
```

5.

Crear Pull Request

---

# 👨‍💻 Autor

Daniel Pérez

Full Stack Developer

Proyecto personal desarrollado con fines de aprendizaje y crecimiento profesional.
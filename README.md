# 🃏 Memory Game — Rick and Morty

> Aplicación web interactiva de memoria desarrollada como prueba técnica.

> 🚀 **Demo en producción:** [memorygamerickandmorty.netlify.app](https://memorygamerickandmorty.netlify.app/)

> 📁 **Repositorio:** [github.com/desingkuro/Memory-Game](https://github.com/desingkuro/Memory-Game.git)

---

## 🛠️ Enfoque de desarrollo

El desarrollo se centró en construir una arquitectura **modular, escalable y mantenible** mediante componentes funcionales y **Custom Hooks**.

- **Arquitectura basada en componentes**: La interfaz está dividida en componentes pequeños y reutilizables como `Button`, `Input`, `Loader` y `PasswordToggle`, lo que facilita su mantenimiento y escalabilidad.
- **Separación de responsabilidades**: Las vistas (como `Login.tsx`) están desacopladas de la lógica de negocio, la cual se extrae mediante Custom Hooks (por ejemplo, `useLogin.tsx`). Esto permite que los componentes de UI se concentren exclusivamente en el renderizado y la presentación visual.
- **Diseño responsivo**: Mediante las directivas de Tailwind CSS, la interfaz se estructura con medidas proporcionales, rangos ajustables (`max-w`, `max-h`) y clases responsivas, garantizando una experiencia óptima en dispositivos móviles, laptops y pantallas de gran tamaño.

---

## 🧠 Decisiones técnicas

### Librerías implementadas

| Librería | Razón de uso |
|---|---|
| **React 19 + TypeScript** | Tipado fuerte en props y estado que reduce bugs en desarrollo, además de ser el criterio técnico definido para la prueba. |
| **Vite** | Bundler de alta velocidad con Hot Module Replacement (HMR), que acelera significativamente el ciclo de desarrollo frente a alternativas basadas en Webpack. |
| **Tailwind CSS v4** | Enfoque *utility-first* que agiliza la maquetación directamente en los archivos TSX y simplifica la implementación de diseño responsivo. |
| **React Hook Form** | Manejo eficiente de inputs y validaciones sin generar re-renders innecesarios, a diferencia de los *controlled components* tradicionales. |
| **React Router 7** | Gestión de rutas nativa, actualizada y robusta para la navegación entre vistas y módulos. |
| **Axios** | Cliente HTTP adoptado por su simplicidad y sus ventajas frente a `fetch()`, como la intercepción de peticiones y respuestas. |
| **Notistack** | Proporciona retroalimentación visual al usuario mediante notificaciones (toasts), por ejemplo, para indicar si el inicio de sesión fue exitoso o fallido. |
| **React Icons** | Facilita la integración de íconos gracias a su amplia variedad y su sencilla implementación en cualquier proyecto. |
| **Supabase** | Servicio BaaS adoptado para centralizar la autenticación, el manejo del token JWT, la base de datos PostgreSQL y el restablecimiento de contraseña, eliminando la necesidad de un backend propio para estas responsabilidades. |

### Arquitectura interna

**Manejo de estado — `useState` vs `useReducer`:**
Se optó por estados locales con `useState` en lugar de `useReducer` en todos los hooks del proyecto. Ambos hooks presentan un rendimiento equivalente para el volumen de estados manejados en esta aplicación y, dado que cada estado mantiene una responsabilidad individual y clara, su lectura dentro de los hooks resulta igualmente legible sin necesidad de consolidarlos en un reducer. Escalar a `useReducer` habría añadido complejidad estructural sin un beneficio concreto.

**Ausencia de estado global — sin `useContext` para la lógica del juego:**
Se descartó deliberadamente el uso de un contexto global (como `useContext` + `useReducer`) para manejar el estado de la lógica del juego. La información fluye correctamente de padre a hijo a través de los hooks `useGame.tsx` → `useCharacters.tsx` y `useCountDown.tsx`, sin necesidad de atravesar múltiples niveles de componentes. Introducir un contexto global para este caso habría sido una abstracción innecesaria que añadiría overhead sin resolver ningún problema real de prop drilling.


El **único `useContext` implementado** es `AuthContext.tsx`, cuyo propósito es exponer el estado de la sesión del usuario a lo largo de toda la aplicación para que el componente `Guard.tsx` pueda proteger las rutas privadas de manera centralizada.


**Optimización de funciones — `useCallback` sobre `useMemo`:**
Las funciones expuestas por los hooks `useCharacters.tsx` y `useGame.tsx` (como `handleGame`, `handleCardClick`, `initShuffle`, `toggleCharactersById`, entre otras) fueron envueltas con `useCallback`. Esta decisión se tomó porque dichas funciones se propagan como props hasta el componente `Card.tsx`, que se renderiza **12 veces** simultáneamente (6 pares de cartas). Sin `useCallback`, cada render del hook padre generaría nuevas referencias de función, provocando re-renders innecesarios en todas las instancias de `Card.tsx`. Se descartó `useMemo` porque no existen cálculos computacionalmente costosos en el ciclo de render; las operaciones como `getSixCards` y `buildPairs` se ejecutan únicamente en eventos puntuales (inicio o reinicio del juego), no en cada render.


**Manejo de autenticación y token JWT — Supabase Auth:**
Toda la capa de autenticación fue delegada al servicio **Supabase Auth**, lo que incluye el login con email y contraseña, la generación del token JWT, el manejo automático del refresh token y el flujo de restablecimiento de contraseña mediante correo electrónico. Supabase persiste la sesión internamente y renueva el access token de forma transparente antes de su expiración, sin que el frontend deba intervenir en ningún momento en este proceso. Esto elimina completamente la necesidad de gestionar el token de manera manual en el cliente (como se haría con `sessionStorage` o `localStorage` directamente) y garantiza que las credenciales estén siempre protegidas por la infraestructura del servicio.


**Protección de rutas:**
Para verificar la identidad del usuario se implementó el componente `Guard.tsx`, que envuelve las rutas protegidas y consume el `AuthContext.tsx` a través del hook `useAuth.tsx`. Este mecanismo verifica si existe una sesión activa de Supabase antes de permitir el acceso, redirigiendo automáticamente al login en caso contrario.

**Lógica del juego:**
El hook `useGame.tsx` centraliza toda la lógica del juego e integra internamente dos hooks complementarios e independientes entre sí:
- `useCharacters.tsx`: gestiona las operaciones relacionadas con los personajes (petición a la API, estados de las cartas, barajado, emparejamiento y eliminación).
- `useCountDown.tsx`: maneja la cuenta regresiva mostrada en el toast antes de que las cartas sean volteadas al iniciar la partida.

**Experiencia de usuario (UX):**
Tomando como base el diseño del Figma proporcionado, se incorporaron las siguientes mejoras:

- **Modal explicativo** en la pantalla principal con las reglas del juego antes de comenzar.
- **Toast con cuenta regresiva** en la esquina superior derecha que indica el tiempo disponible para memorizar las cartas.
- **Animaciones** sutiles que enriquecen la interacción sin comprometer el rendimiento.
- **Pantalla de resultados** rediseñada visualmente para las felicitaciones al finalizar el juego.
- **Componente `Loader.tsx`** para suavizar las transiciones entre vistas y procesos, evitando cambios bruscos.

---

## 📁 Estructura del proyecto

```
.
├── eslint.config.js
├── index.html
├── netlify.toml
├── package.json
├── package-lock.json
├── public
│   ├── robots.txt
│   └── space-icon.svg
├── README.md
├── src
│   ├── app
│   │   ├── guard
│   │   │   └── Guard.tsx
│   │   ├── layouts
│   │   │   ├── AuthLayout.tsx
│   │   │   └── MainLayout.tsx
│   │   └── router
│   │       └── Router.tsx
│   ├── App.tsx
│   ├── assets
│   │   └── img
│   │       ├── backCard.png
│   │       └── logo.webp
│   ├── features
│   │   ├── auth
│   │   │   ├── forgotPassword
│   │   │   │   ├── ForgotPassword.tsx
│   │   │   │   └── hook
│   │   │   │       └── useForgotPassword.tsx
│   │   │   └── login
│   │   │       ├── components
│   │   │       │   ├── hooks
│   │   │       │   │   └── useLogin.tsx
│   │   │       │   └── PasswordToggle.tsx
│   │   │       └── Login.tsx
│   │   └── home
│   │       ├── components
│   │       │   ├── Card.tsx
│   │       │   ├── CharacterDetails.tsx
│   │       │   ├── FooterHome.tsx
│   │       │   ├── GameWinSection.tsx
│   │       │   ├── HeaderHome.tsx
│   │       │   └── RickAndMortyModal.tsx
│   │       ├── Home.tsx
│   │       ├── hooks
│   │       │   ├── useCharacters.tsx
│   │       │   ├── useCountDown.tsx
│   │       │   └── useGame.tsx
│   │       ├── styles
│   │       │   ├── Card.css
│   │       │   ├── GameWinSection.css
│   │       │   └── Home.css
│   │       └── types
│   │           └── useGameInterface.ts
│   ├── index.css
│   ├── main.tsx
│   └── shared
│       ├── components
│       │   ├── button.tsx
│       │   ├── ContainerLayout.tsx
│       │   ├── Footer.tsx
│       │   ├── Header.tsx
│       │   ├── Input.tsx
│       │   ├── Loader.tsx
│       │   ├── Modal.tsx
│       │   └── Toast.tsx
│       ├── context
│       │   └── AuthContext.tsx
│       ├── hooks
│       │   ├── useAuth.tsx
│       │   └── useConfetti.tsx
│       ├── services
│       │   ├── AlertServices.tsx
│       │   ├── Api.services.ts
│       │   ├── Supabase.client.ts
│       │   └── UUID.ts
│       ├── styles
│       │   └── Loader.css
│       └── types
│           ├── apiInterface.tsx
│           └── toast.tsx
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🔄 Flujo de trabajo y despliegue

- **Git Flow**: Se utilizó la metodología Git Flow para organizar el flujo de trabajo en ramas, separando el desarrollo de features, correcciones y releases de manera estructurada.
- **Despliegue continuo (CI/CD)**: La rama `main` está conectada directamente a **Netlify**, lo que habilita el despliegue automático con cada push, garantizando que la versión en producción siempre refleje el estado más reciente del código aprobado.

### Infraestructura de producción

| Capa | Tecnología | Plataforma |
|---|---|---|
| Frontend | React + Vite | Netlify |
| Auth + Backend | Supabase Auth | Supabase |
| Base de datos | PostgreSQL | Supabase |

---

## 🚀 Instrucciones para correr el proyecto localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/desingkuro/Memory-Game.git
cd rickandmortymemory
```

### 2. Instalar dependencias

Asegúrate de tener [Node.js](https://nodejs.org/) instalado. Luego, desde la raíz del proyecto ejecuta:

```bash
npm install
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

El proyecto estará disponible por defecto en [http://localhost:5173/](http://localhost:5173/).

### 4. Compilar para producción *(opcional)*

```bash
npm run build
```

Esto genera la versión optimizada del proyecto en la carpeta `dist/`.

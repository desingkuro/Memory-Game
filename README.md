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

### Arquitectura interna

**Manejo de estado:**
Se optó por estados locales con `useState` en lugar de `useReducer`, dado que ambos presentan un rendimiento equivalente en este contexto y los estados locales no generaban inconvenientes de legibilidad dentro de los hooks. Asimismo, se descartó el uso de un `useContext` global para el estado general, ya que la mayor parte de la información se encontraba centralizada y podía transmitirse directamente de padre a hijo sin necesidad de intermediarios.

**Manejo del token JWT:**
Se evaluó el manejo del token exclusivamente desde el backend mediante cookies; sin embargo, esta opción fue descartada porque el aplicativo no requería una capa de seguridad tan rigurosa. Como alternativa más adecuada al alcance del proyecto, se optó por `sessionStorage` para su gestión en el cliente. Para la persistencia de datos del usuario se utilizó una base de datos relacional **PostgreSQL** a través de **Supabase**, conectada a un backend en **Express.js** desplegado en **Railway**.

**Lógica del juego:**
El componente principal del juego implementa el hook `useGame.tsx`, que centraliza la lógica del juego y a su vez integra dos hooks complementarios:
- `useCharacters.tsx`: gestiona todas las operaciones relacionadas con los personajes (peticiones, estados, cálculos, etc.).
- `useCountDown.tsx`: maneja el contador de la cuenta regresiva mostrada en el toast antes de que las cartas sean barajadas y volteadas.

Ambos hooks son funcionalmente independientes entre sí.

**Protección de rutas:**
Para verificar la identidad del usuario se creó un componente guard que envuelve las rutas protegidas. Este componente implementa el hook `useAuth.tsx` junto con `AuthContext.tsx`, los cuales verifican si el usuario tiene una sesión activa antes de permitir el acceso a la vista solicitada.

**Experiencia de usuario (UX):**
Tomando como base el diseño del Figma proporcionado, se incorporaron las siguientes mejoras para hacer la experiencia más amena y fluida:

- **Modal explicativo** en la pantalla principal que describe las reglas del juego antes de comenzar.
- **Toast con cuenta regresiva** en la esquina superior derecha que indica el tiempo disponible para memorizar las cartas antes de que sean volteadas.
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
│   └── vite.svg
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
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   ├── img
│   │   │   ├── backCard.png
│   │   │   └── logo.webp
│   │   └── react.svg
│   ├── features
│   │   ├── auth
│   │   │   ├── components
│   │   │   │   ├── Input.tsx
│   │   │   │   └── PasswordToggle.tsx
│   │   │   ├── hooks
│   │   │   │   └── useLogin.tsx
│   │   │   └── Login.tsx
│   │   └── home
│   │       ├── components
│   │       │   ├── Card.tsx
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
│       │   ├── Loader.tsx
│       │   └── Toast.tsx
│       ├── context
│       │   └── AuthContext.tsx
│       ├── hooks
│       │   └── useAuth.tsx
│       ├── services
│       │   ├── AlertServices.tsx
│       │   ├── Api.services.ts
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

25 directories, 54 files
```

---

## 🔄 Flujo de trabajo y despliegue

- **Git Flow**: Se utilizó la metodología Git Flow para organizar el flujo de trabajo en ramas, separando el desarrollo de features, correcciones y releases de manera estructurada.
- **Despliegue continuo (CI/CD)**: La rama `main` está conectada directamente a **Netlify**, lo que habilita el despliegue automático con cada push, garantizando que la versión en producción siempre refleje el estado más reciente del código aprobado.

### Infraestructura de producción

| Capa | Tecnología | Plataforma |
|---|---|---|
| Frontend | React + Vite | Netlify |
| Backend | Express.js | Railway |
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

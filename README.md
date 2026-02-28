# Memory Game (Rick and Morty)

Este proyecto es una aplicación web interactiva desarrollada como parte de una prueba técnica.

## 🛠️ Tu enfoque de desarrollo

El desarrollo de esta aplicación se centró en crear una arquitectura modular, escalable y mantenible mediante el uso de componentes funcionales y **Custom Hooks**.

*   **Arquitectura Basada en Componentes**: La interfaz de usuario se ha dividido en componentes pequeños y reutilizables (como `Button`, `Input`, `Loader`, `PasswordToggle`), lo que facilita su mantenimiento y escalabilidad.
*   **Separación de Responsabilidades**: Las vistas (como `Login.tsx`) están separadas de la lógica de negocio y estado interno, la cual se extrae a través de Custom Hooks (por ejemplo, `useLogin.tsx`). Esto permite que el componente de UI se concentre únicamente en el renderizado y en manejar la presentación visual.
*   **Diseño Responsivo (Adaptable)**: A través de directivas de Tailwind CSS, el diseño de la aplicación y en particular de pantallas como el Login se ha estructurado con medidas proporcionales, rangos ajustables (`max-w`, `max-h`) y clases responsivas. El objetivo es que la interfaz se adapte perfectamente ya sea en un dispositivo móvil, una laptop o pantallas de gran tamaño.

## 🧠 Decisiones técnicas y razonamiento detrás

Se ha elegido el stack y las librerías actuales por varias razones técnicas relacionadas al rendimiento y la experiencia de desarrollo:

*   **React 19 + TypeScript**: TypeScript ayuda enormemente a reducir *bugs* durante la fase de desarrollo asegurando flexibilidad pero con fuerte tipado en los props y manejo del estado. React 19 proporciona el mejor ecosistema para construir interfaces dinámicas.
*   **Vite**: Se utilizó Vite como *bundler* (herramienta de construcción) por su extrema velocidad y recarga de módulos en caliente (HMR), acelerando significativamente el proceso de desarrollo en comparación con alternativas tradicionales base Webpack.
*   **Tailwind CSS (v4)**: Se optó por un enfoque *utility-first* usando Tailwind porque agiliza el proceso de maquetación directamente en el documento TSX, favoreciendo tener múltiples resoluciones (*responsive design*) de forma sencilla y directa.
*   **React Hook Form**: En lugar de manejar los inputs y errores (*controlled components*) de manera manual (lo cual genera *re-renders* innecesarios en React de toda la página), se utilizó React Hook Form por su excelente rendimiento y fácil manejo de validaciones integradas.
*   **React Router 7**: Manejo de rutas nativo, actualizado y robusto para interactuar entre las distintas vistas y módulos de la aplicación.
*   **Axios**: Adoptado como cliente HTTP debido a su simpleza para realizar de peticiones asíncronas y ventajas como la intercepción tanto en peticiones como respuestas frente a `fetch()`.

## 🚀 Instrucciones para correr el proyecto

Sigue los siguientes pasos para correr el entorno de desarrollo en tu máquina local de forma sencilla.

### 1. Clonar el repositorio
Si aún no lo has hecho, clona el proyecto en tu máquina local:
```bash
git clone <URL_DEL_REPOSITORIO>
cd rickandmortymemory
```

### 2. Instalar dependencias
Debes asegurarte de tener [Node.js](https://nodejs.org/) instalado. Luego, a nivel de la raíz ejecuta el siguiente comando:
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
Para lanzar el proyecto localmente (Hot-Module-Replacement activo):
```bash
npm run dev
```

El proyecto estará disponible por defecto usualmente en [http://localhost:5173/](http://localhost:5173/).

### 4. Compilar proyecto para producción (Opcional)
Para generar la versión optimizada de producción corre:
```bash
npm run build
```
Y para previsualizar cómo corren esos estáticos finalmente usa:
```bash
npm run preview
```

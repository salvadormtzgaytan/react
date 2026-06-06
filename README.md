# React + Vite

Template para iniciar en el mundo de React usando **Vite** como bundler y **pnpm** como gestor de paquetes.

## Tecnologías

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [pnpm](https://pnpm.io/)
- [ESLint](https://eslint.org/)

## Requisitos previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [pnpm](https://pnpm.io/installation)

```bash
npm install -g pnpm
```

## Iniciar el proyecto

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Compilar para producción
pnpm build

# Previsualizar la build de producción
pnpm preview

# Ejecutar el linter
pnpm lint
```

## Estructura del proyecto

```
react/
├── public/          # Archivos estáticos
├── src/
│   ├── assets/      # Imágenes y recursos
│   ├── App.css      # Estilos del componente principal
│   ├── App.jsx      # Componente principal
│   ├── index.css    # Estilos globales
│   └── main.jsx     # Punto de entrada
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

## Plugins de Vite utilizados

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) — usa [Oxc](https://oxc.rs) para transformación rápida

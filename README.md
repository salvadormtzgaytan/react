# React SPA — Proyecto de Aprendizaje

Proyecto de práctica paso a paso para aprender React 19 moderno. Está pensado especialmente para personas que ya saben JavaScript y jQuery, y quieren entender cómo se trabaja en el ecosistema de React actual.

Cubre desde los fundamentos (componentes, estado, props) hasta un CRUD completo con tests.

## ¿Por qué React si ya sé jQuery?

Con jQuery manipulas el DOM directamente: encuentras un elemento, lo cambias, listo. Funciona, pero escala mal. Cuando la aplicación crece, rastrear qué cambió el DOM y cuándo se vuelve difícil de mantener.

React invierte el modelo: **describes cómo debe verse la UI dado un estado**, y React se encarga de actualizar el DOM. Tú nunca tocas el DOM directamente.

```js
// jQuery — imperativo: "ve al DOM y cámbialo tú"
$("#contador").text(contador + 1);

// React — declarativo: "este es el estado, React se encarga del DOM"
const [contador, setContador] = useState(0);
// <p>{contador}</p> se actualiza solo cuando llamas setContador
```

## Tecnologías del proyecto

| Herramienta | Versión | Para qué sirve |
|---|---|---|
| [React](https://react.dev/) | 19 | Construir la UI con componentes |
| [Vite](https://vitejs.dev/) | 8 | Servidor de desarrollo rápido + empaquetador |
| [React Router](https://reactrouter.com/) | 7 | Navegar entre páginas sin recargar el navegador |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Estilos con clases utilitarias directamente en el JSX |
| [Zustand](https://zustand-demo.pmnd.rs/) | 5 | Estado global compartido entre componentes |
| [TanStack Query](https://tanstack.com/query) | 5 | Hacer fetch a APIs y manejar caché |
| [Vitest](https://vitest.dev/) | 4 | Correr tests automáticos |
| [React Testing Library](https://testing-library.com/) | 16 | Testear componentes como lo haría un usuario real |
| [MSW](https://mswjs.io/) | 2 | Simular una API en los tests sin hacer peticiones reales |
| [pnpm](https://pnpm.io/) | — | Gestor de paquetes (más rápido que npm) |

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [pnpm](https://pnpm.io/installation) — si no lo tienes:

```bash
npm install -g pnpm
```

## Cómo correr el proyecto

```bash
# 1. Instalar dependencias
pnpm install

# 2. Iniciar el servidor de desarrollo (abre http://localhost:5173)
pnpm dev
```

### Otros comandos útiles

```bash
# Compilar para producción
pnpm build

# Previsualizar la build de producción
pnpm preview

# Revisar errores de código (linter)
pnpm lint

# Correr los tests
pnpm test

# Ver cobertura de tests
pnpm test:coverage
```

## Rutas de la aplicación

Al abrir el proyecto verás un menú lateral con estas secciones:

| Ruta | Qué hace | Fase |
|---|---|---|
| `/` | Página de inicio | Fase 1 |
| `/perfil` | Editar perfil con estado global (Zustand) | Fase 2 |
| `/posts` | Lista de posts cargados desde una API externa | Fase 3 |
| `/products` | CRUD completo de productos con FakeStore API | Fase 8 |

## Estructura del proyecto

```
src/
├── __tests__/                         # Todos los tests automáticos
│   ├── components/
│   │   ├── ProductDeleteModal.test.jsx
│   │   ├── ProductForm.test.jsx
│   │   └── ProductList.test.jsx       # test de integración de ProductsPage
│   ├── hooks/
│   │   └── useProducts.test.js
│   └── services/
│       └── productsService.test.js
├── components/
│   ├── ui/                            # Componentes reutilizables de interfaz
│   │   ├── Button.jsx                 # Botón con variantes: primary, secondary, danger, ghost
│   │   ├── Input.jsx                  # Input con label accesible y mensaje de error
│   │   ├── Toast.jsx                  # Notificación flotante (éxito/error)
│   │   ├── Badge.jsx
│   │   └── Modal.jsx
│   ├── products/                      # Componentes del módulo CRUD
│   │   ├── ProductCard.jsx            # Tarjeta de un producto
│   │   ├── ProductDeleteModal.jsx     # Modal de confirmación para eliminar
│   │   ├── ProductFilters.jsx         # Botones para filtrar por categoría
│   │   ├── ProductForm.jsx            # Formulario para crear y editar
│   │   └── ProductList.jsx            # Grid de tarjetas + skeleton de carga
│   └── Menu.jsx                       # Menú lateral con navegación
├── hooks/
│   └── useProducts.js                 # Lógica del CRUD en un custom hook
├── lib/
│   └── utils.js                       # Función cn() para combinar clases de Tailwind
├── mocks/
│   ├── handlers.ts                    # Definición de endpoints simulados (MSW)
│   └── server.ts                      # Servidor de mocks para los tests
├── pages/
│   ├── Inicio.jsx
│   ├── Perfil.jsx
│   ├── Posts.jsx
│   └── ProductsPage.jsx               # Página principal del CRUD
├── services/
│   └── productsService.js             # Todas las llamadas a la API en un solo lugar
├── store/
│   ├── cartStore.js                   # Estado global del carrito (Zustand)
│   └── userStore.js                   # Estado global del usuario (Zustand)
└── test/
    └── setup.ts                       # Configuración inicial de los tests
```

## Cómo está organizado el CRUD

El módulo de productos sigue una estructura de tres capas. Cada capa tiene una sola responsabilidad:

```
ProductsPage        → orquesta: decide qué mostrar y qué modal abrir
    ↓ usa
useProducts         → lógica: loading, error, lista de productos, operaciones
    ↓ usa
productsService     → comunicación: hace fetch a la API y maneja errores HTTP
```

Si mañana cambias la API (de FakeStore a tu propio backend), solo modificas `productsService.js`. El resto del código no se entera.

## Cómo están organizados los tests

Los tests siguen el mismo orden de capas:

- **`productsService.test.js`** — verifica que las funciones llaman a las URLs correctas con el método y body adecuados. Usa un mock de `fetch` para no hacer peticiones reales.
- **`useProducts.test.js`** — verifica la lógica del hook: que los productos se cargan, que agregar/editar/eliminar actualiza el estado correctamente.
- **`ProductForm.test.jsx`** y **`ProductDeleteModal.test.jsx`** — simulan clicks y escritura del usuario para verificar que los formularios y modales funcionan.
- **`ProductList.test.jsx`** — test de integración: monta `ProductsPage` completa y verifica el flujo de principio a fin.

## Guía detallada

Ver [`fase8.md`](./fase8.md) para la documentación paso a paso del módulo CRUD: Tailwind CSS, arquitectura, componentes y tests.

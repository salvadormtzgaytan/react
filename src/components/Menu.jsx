import { NavLink } from "react-router-dom";
import { useUserStore } from "../store/userStore";

/**
 * Definición estática de las rutas del menú.
 *
 * Es un arreglo de objetos en lugar de HTML repetido. Cuando React
 * lo renderiza con .map(), genera un <NavLink> por cada elemento.
 * Para agregar una nueva sección, solo agregas un objeto aquí.
 */
const menuItems = [
  {
    path: "/",
    label: "Inicio",
    description: "Página de bienvenida",
    phase: "Fase 1",
  },
  {
    path: "/perfil",
    label: "Perfil",
    description: "Datos de usuario",
    phase: "Fase 2",
  },
  {
    path: "/posts",
    label: "Ver Posts (API)",
    description: "Carga de datos remota",
    phase: "Fase 3",
  },
  {
    path: "/products",
    label: "🛒 CRUD Productos",
    description: "FakeStore API · Tailwind · Testing",
    phase: "Fase 8",
  },
];

/**
 * Menú lateral de navegación de la aplicación.
 *
 * Muestra el avatar y nombre del usuario activo (tomados del estado global
 * con Zustand) y los enlaces de navegación entre páginas.
 *
 * `NavLink` es como un `<a>` normal pero React Router le agrega una prop
 * `isActive` que indica si la URL actual coincide con el `to` del enlace.
 * La usamos para resaltar la sección activa con un fondo azul.
 *
 * Los datos del usuario vienen de `useUserStore`. Si se cambia la foto o
 * el nombre en la página de Perfil, este menú se actualiza automáticamente
 * sin necesidad de hacer nada — eso es el estado global.
 */
export default function Menu() {
  // Leemos solo los valores que necesitamos del store global
  const nombre = useUserStore((state) => state.nombre);
  const fotoUrl = useUserStore((state) => state.fotoUrl);

  return (
    <div className="flex flex-col gap-4">
      {/* Tarjeta del perfil del usuario */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
        <img
          src={fotoUrl}
          alt="Avatar"
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
        />
        <div>
          <p className="font-semibold text-sm text-gray-800">{nombre}</p>
          <p className="text-xs text-gray-500">Sesión iniciada</p>
        </div>
      </div>

      {/* Lista de enlaces — se genera dinámicamente desde el arreglo menuItems */}
      <nav className="p-4 space-y-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              // isActive es true cuando la URL actual coincide con item.path
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            <div>
              <p className="font-medium text-sm">{item.label}</p>
              {item.description && (
                <p className="text-xs opacity-70">{item.description}</p>
              )}
            </div>
            <span className="ml-auto text-xs opacity-50">{item.phase}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

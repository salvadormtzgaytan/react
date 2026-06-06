import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Perfil from "./pages/Perfil";
import Posts from "./pages/Posts";
import Menu from "./components/Menu";
import ProductsPage from "./pages/ProductsPage";

/**
 * Componente raíz de la aplicación.
 *
 * En jQuery tendrías un index.html con todo el contenido y usarías
 * $.load() o show/hide para cambiar de "página". Aquí React Router
 * hace eso de forma declarativa: defines qué componente se muestra
 * según la URL, sin recargar el navegador.
 *
 * Layout general:
 * - El <aside> (menú lateral) siempre está visible.
 * - El <main> cambia según la ruta activa, renderizando el componente
 *   correspondiente a esa URL.
 */
export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar fijo — siempre visible independientemente de la ruta */}
      <aside className="w-64 border-r border-gray-200 bg-white p-4 flex flex-col gap-4">
        <h1 className="text-xl font-bold text-gray-900 px-4 py-2 flex items-center gap-2">
          React SPA 🚀
        </h1>
        <Menu />
      </aside>

      {/* Área de contenido — cambia según la URL */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/products" element={<ProductsPage />} />
          {/* Ruta comodín: captura cualquier URL que no coincida con las anteriores */}
          <Route path="*" element={<h2 className="p-8 text-2xl font-bold text-gray-800">404 - No encontrado</h2>} />
        </Routes>
      </main>
    </div>
  );
}

/**
 * Página de inicio — Fase 1.
 *
 * Componente puramente visual, sin estado ni efectos.
 * Sirve como punto de entrada a la app y muestra las tecnologías usadas.
 *
 * En React, cuando un componente no necesita estado ni datos externos,
 * es solo una función que devuelve JSX. No hay nada más que agregar.
 */
export default function Inicio() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2 mb-4">
          Página de Inicio 🏠
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Bienvenido a nuestra Single Page Application. Esta es la pantalla
          principal, ahora estilizada completamente con Tailwind CSS.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-2 text-lg">Aprendizaje React</h3>
          <p className="text-blue-700 text-sm leading-relaxed">
            Explora las rutas en el menú lateral para ver el estado global de usuario, posts desde la API y el CRUD completo de productos.
          </p>
        </div>
        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
          <h3 className="font-semibold text-purple-900 mb-2 text-lg">Tecnologías</h3>
          <p className="text-purple-700 text-sm leading-relaxed">
            Vite, React 19, React Router 7, Zustand, Tailwind CSS v4, MSW y Vitest para pruebas unitarias.
          </p>
        </div>
      </div>
    </div>
  );
}

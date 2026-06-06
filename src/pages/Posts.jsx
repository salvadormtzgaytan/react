import { useQuery } from "@tanstack/react-query";

/**
 * Función que hace el fetch a la API.
 *
 * Se define fuera del componente porque es una función pura: no necesita
 * acceso al estado de React. TanStack Query la llama cuando necesita los datos.
 *
 * @returns {Promise<Array>} Lista de posts desde JSONPlaceholder.
 * @throws {Error} Si la respuesta HTTP no es exitosa.
 */
const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  if (!res.ok) throw new Error("Error al cargar datos");
  return res.json();
};

/**
 * Página de posts — Fase 3.
 *
 * Muestra cómo cargar datos desde una API externa usando TanStack Query.
 *
 * En jQuery harías:
 * $.ajax({ url: "...", success: function(data) { ... } })
 * y tendrías que manejar tú mismo el estado de carga, error y datos.
 *
 * TanStack Query maneja todo eso con `useQuery`. Solo le dices:
 * - `queryKey`: un nombre único para identificar estos datos en el caché.
 * - `queryFn`: la función que trae los datos.
 *
 * Y te devuelve `{ data, isLoading, error }` listos para usar.
 * Además cachea el resultado: si navegas a otra página y vuelves,
 * los datos ya están disponibles sin hacer otro fetch.
 */
export default function Posts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"], // identificador único en el caché de TanStack Query
    queryFn: fetchPosts,
  });

  // Estado de carga: mostramos skeletons mientras esperamos la respuesta
  if (isLoading) {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 animate-pulse">Cargando Posts...</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-pulse space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Estado de error: TanStack Query captura el Error lanzado en fetchPosts
  if (error) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          ⚠️ Error al cargar posts: {error.message}
        </div>
      </div>
    );
  }

  // Estado con datos: renderizamos la lista
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Lista de Posts (Consumo de API)
          </h2>
          <p className="text-xs text-gray-500 mt-1">JSONPlaceholder API</p>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <h3 className="font-bold text-lg text-gray-950 capitalize mb-2">{post.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

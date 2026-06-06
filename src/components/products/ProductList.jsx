import ProductCard from "./ProductCard";

/**
 * Tarjeta "fantasma" que se muestra mientras los datos cargan.
 *
 * En lugar de un spinner genérico, mostramos la misma estructura de la tarjeta
 * real pero con bloques grises animados. Esto se llama "skeleton loading" y da
 * mejor sensación de velocidad al usuario porque ve el layout antes de los datos.
 *
 * `animate-pulse` de Tailwind hace que los bloques grises se desvanezcan y
 * reaparezcan en un loop, dando la sensación de que está cargando.
 */
function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-1/4 mt-3" />
      </div>
    </div>
  );
}

/**
 * Grid de productos con tres estados: cargando, vacío y con datos.
 *
 * Este componente maneja los tres posibles estados de la lista de una vez.
 * No hace fetch ni modifica nada — solo renderiza lo que recibe.
 *
 * El grid es responsivo gracias a las clases de Tailwind:
 * - 1 columna en móvil
 * - 2 columnas en pantallas sm (640px+)
 * - 3 columnas en lg (1024px+)
 * - 4 columnas en xl (1280px+)
 *
 * @param {Object} props
 * @param {Array<Object>} props.products - Lista de productos a renderizar.
 * @param {boolean} props.loading - Si es true, muestra los skeletons en lugar de los productos.
 * @param {function(Object): void} props.onEdit - Se pasa a cada ProductCard para el botón Editar.
 * @param {function(Object): void} props.onDelete - Se pasa a cada ProductCard para el botón Eliminar.
 */
export default function ProductList({ products, loading, onEdit, onDelete }) {
  // Estado 1: cargando — mostramos 8 skeletons
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Estado 2: sin resultados
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-2">📦</p>
        <p className="text-gray-500 text-sm">
          No hay productos en esta categoría
        </p>
      </div>
    );
  }

  // Estado 3: con datos — renderizamos una tarjeta por producto
  return (
    <div
      role="list"
      aria-label="Lista de productos"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4"
    >
      {products.map((product) => (
        // `key` es obligatorio cuando usas .map() en JSX. React lo usa
        // internamente para saber qué elemento cambió cuando se actualiza la lista.
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

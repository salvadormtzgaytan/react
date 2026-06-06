import { cn } from "../../lib/utils";

/**
 * Barra de filtros por categoría.
 *
 * Muestra un botón "Todas" fijo más un botón por cada categoría que llega
 * desde la API. El botón activo tiene fondo azul; los demás tienen borde gris.
 *
 * El componente no guarda qué categoría está seleccionada — eso lo maneja
 * el hook `useProducts`. Aquí solo recibimos `selected` para saber cuál
 * destacar, y llamamos a `onSelect` cuando el usuario hace clic.
 *
 * @param {Object} props
 * @param {string[]} props.categories - Lista de categorías disponibles (viene de la API).
 * @param {string} props.selected - Categoría actualmente seleccionada, o "all" para todas.
 * @param {function(string): void} props.onSelect - Se llama con la categoría elegida al hacer clic.
 *
 * @example
 * <ProductFilters
 *   categories={["electronics", "jewelery"]}
 *   selected={selectedCategory}
 *   onSelect={filterByCategory}
 * />
 */
export default function ProductFilters({ categories, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6 items-center">
      <span className="text-sm font-medium text-gray-500 mr-2">Categorías:</span>

      {/* Botón "Todas" — siempre visible, filtra con el valor especial "all" */}
      <button
        onClick={() => onSelect("all")}
        className={cn(
          "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 uppercase",
          // cn() aplica clases distintas según si este botón está activo o no
          selected === "all"
            ? "bg-blue-600 text-white shadow-sm"
            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
        )}
      >
        Todas
      </button>

      {/* Un botón por cada categoría que devuelve la API */}
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 uppercase",
            selected === category
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

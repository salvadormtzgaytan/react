import { cn } from "../../lib/utils";

export default function ProductFilters({ categories, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6 items-center">
      <span className="text-sm font-medium text-gray-500 mr-2">Categorías:</span>
      <button
        onClick={() => onSelect("all")}
        className={cn(
          "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 uppercase",
          selected === "all"
            ? "bg-blue-600 text-white shadow-sm"
            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
        )}
      >
        Todas
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 uppercase",
            selected === category
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

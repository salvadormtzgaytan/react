import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind de forma segura.
 *
 * El problema que resuelve: cuando construyes clases dinámicamente en JSX,
 * pueden aparecer conflictos. Por ejemplo, si tienes "px-2" y luego pasas
 * "px-4" desde el componente padre, ambas clases se aplican y Tailwind
 * no sabe cuál gana (depende del orden en el CSS generado).
 *
 * `clsx` filtra valores falsy (undefined, false, null) y concatena las clases.
 * `twMerge` resuelve los conflictos: si hay "px-2 px-4", se queda con "px-4".
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-blue-600", className)
 * // si isActive=true y className="px-6" → "py-2 bg-blue-600 px-6"
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

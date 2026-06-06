import { cn } from "../../lib/utils";

/**
 * Mapa de estilos por variante visual.
 *
 * En jQuery habrías tenido clases CSS predefinidas en un .css y las agregarías
 * con addClass(). Aquí las variantes son objetos de JavaScript: más fácil de
 * leer, sin salir del archivo.
 */
const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-400",
};

/** Mapa de tamaños: controla el padding y el tamaño del texto. */
const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

/**
 * Botón reutilizable con variantes de estilo, tamaños y estado de carga.
 *
 * En jQuery crearías un botón en el HTML y lo buscarías con $("button").
 * En React el botón es un componente que recibe sus datos como props y
 * se puede reusar en cualquier parte de la app con distintas configuraciones.
 *
 * @param {Object} props
 * @param {"primary"|"secondary"|"danger"|"ghost"} [props.variant="primary"] - Estilo visual del botón.
 * @param {"sm"|"md"|"lg"} [props.size="md"] - Tamaño del botón.
 * @param {boolean} [props.disabled=false] - Deshabilita el botón manualmente.
 * @param {boolean} [props.loading=false] - Muestra un spinner y deshabilita el botón mientras carga.
 * @param {string} [props.className] - Clases extra para sobreescribir estilos desde el componente padre.
 * @param {React.ReactNode} props.children - El texto o contenido dentro del botón.
 *
 * @example
 * <Button variant="danger" size="sm" onClick={handleDelete}>
 *   Eliminar
 * </Button>
 *
 * @example
 * // Con estado de carga mientras espera una respuesta de la API
 * <Button loading={isSaving} type="submit">
 *   Guardar
 * </Button>
 */
export default function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className,
  children,
  ...props // el resto de props nativas del <button>: onClick, type, aria-*, etc.
}) {
  return (
    <button
      // Se deshabilita si loading=true para evitar doble envío
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg font-medium",
        "transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        // Tailwind aplica estos estilos cuando el atributo disabled está presente
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {/* Spinner SVG — solo visible cuando loading=true */}
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}

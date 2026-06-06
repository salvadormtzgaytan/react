import { cn } from "../../lib/utils";

/**
 * Campo de texto reutilizable con label accesible y mensaje de error.
 *
 * La accesibilidad aquí viene del atributo `htmlFor` en el <label> y el `id`
 * en el <input>. Cuando están vinculados, hacer clic en el label enfoca el
 * input — y los lectores de pantalla saben qué campo es cuál.
 *
 * El `id` se genera automáticamente a partir del `label` si no se proporciona
 * uno explícito: "Título del producto" → "título-del-producto".
 *
 * @param {Object} props
 * @param {string} [props.label] - Texto del label visible encima del input.
 * @param {string} [props.error] - Mensaje de error que aparece debajo del input en rojo.
 *   Cuando tiene valor, el borde del input también cambia a rojo.
 * @param {string} [props.className] - Clases extra para el <input>.
 * @param {string} [props.id] - Id manual. Si no se pasa, se genera desde el label.
 *
 * @example
 * <Input
 *   label="Precio (USD)"
 *   name="price"
 *   type="number"
 *   value={values.price}
 *   onChange={handleChange}
 *   error={touched.price && errors.price}
 * />
 */
export default function Input({ label, error, className, id, ...props }) {
  // Si no pasan un id, lo generamos desde el label para vincular label↔input
  const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

  return (
    <div className="flex flex-col gap-1">
      {/* El label solo se renderiza si se pasó la prop — no hay label vacío en el DOM */}
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full rounded-lg border px-3 py-2 text-sm",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-1",
          // Borde rojo si hay error, azul si está bien
          error
            ? "border-red-400 focus:ring-red-400"
            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
          className,
        )}
        {...props}
      />
      {/* Mensaje de error — solo aparece si la prop error tiene valor */}
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}

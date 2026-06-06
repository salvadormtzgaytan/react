import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";

/**
 * Valida los campos del formulario y devuelve un objeto con los errores.
 *
 * Si no hay errores, devuelve un objeto vacío {}.
 * Si los hay, cada clave es el nombre del campo y el valor es el mensaje de error.
 *
 * Esta función vive fuera del componente porque es pura: recibe datos,
 * devuelve datos, no necesita acceso al estado de React.
 *
 * @param {Object} values - Los valores actuales del formulario.
 * @returns {Object} errors - Objeto con los mensajes de error por campo.
 */
function validate(values) {
  const errors = {};
  if (!values.title?.trim()) errors.title = "El título es requerido";
  if (!values.price || isNaN(values.price) || Number(values.price) <= 0)
    errors.price = "Precio debe ser mayor a 0";
  if (!values.category?.trim()) errors.category = "La categoría es requerida";
  if (!values.description?.trim())
    errors.description = "La descripción es requerida";
  return errors;
}

/**
 * Construye el estado inicial del formulario a partir del producto.
 *
 * Si `product` es null (creación), devuelve campos vacíos.
 * Si `product` tiene datos (edición), los pre-carga en el formulario.
 *
 * Se usa con la inicialización lazy de useState:
 *   `useState(() => buildInitialValues(product))`
 * así la función corre solo una vez al montar el componente, no en cada render.
 *
 * @param {Object|null} product - Producto a editar, o null para modo creación.
 * @returns {Object} - Valores iniciales del formulario.
 */
function buildInitialValues(product) {
  if (!product) {
    return { title: "", price: "", category: "", description: "", image: "" };
  }
  return {
    title: product.title || "",
    // price viene como número desde la API, lo convertimos a string para el input
    price: product.price?.toString() || "",
    category: product.category || "",
    description: product.description || "",
    image: product.image || "",
  };
}

/**
 * Formulario modal para crear o editar un producto.
 *
 * El mismo componente sirve para los dos casos:
 * - Si recibe `product` → modo edición, campos pre-cargados.
 * - Si `product` es null → modo creación, campos vacíos.
 *
 * La validación se muestra campo por campo a medida que el usuario
 * los toca (`touched`) o intenta enviar el formulario. Esto evita
 * mostrar todos los errores al mismo tiempo desde el inicio.
 *
 * @param {Object} props
 * @param {Object|null} props.product - Producto a editar, o null para crear uno nuevo.
 * @param {function(Object): void} props.onSubmit - Se llama con los datos del formulario cuando es válido.
 * @param {function(): void} props.onClose - Cierra el modal sin guardar.
 * @param {boolean} props.loading - Deshabilita el botón de submit mientras la API responde.
 */
export default function ProductForm({ product, onSubmit, onClose, loading }) {
  // Inicialización lazy: buildInitialValues corre solo al montar, no en cada render
  const [values, setValues] = useState(() => buildInitialValues(product));
  const [errors, setErrors] = useState({});
  // `touched` registra qué campos tocó el usuario — los errores solo se
  // muestran en campos que ya fueron visitados
  const [touched, setTouched] = useState({});

  const isEditing = Boolean(product);

  /** Actualiza el valor del campo que cambió y borra su error previo. */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Limpiamos el error de ese campo cuando el usuario empieza a corregirlo
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  /** Marca el campo como "tocado" cuando el usuario sale de él. */
  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  /** Valida todo el formulario al hacer submit. Si hay errores, los muestra; si no, llama a onSubmit. */
  const handleSubmit = (e) => {
    e.preventDefault(); // evita que el navegador recargue la página
    const newErrors = validate(values);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Marcamos todos los campos como tocados para mostrar todos los errores a la vez
      setTouched({ title: true, price: true, category: true, description: true });
      return;
    }
    // price se convierte de string a número antes de enviar
    onSubmit({ ...values, price: Number(values.price) });
  };

  return (
    // Overlay oscuro que cubre toda la pantalla
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-title"
    >
      {/* max-h-[90vh] + overflow-y-auto: el modal se puede desplazar si el contenido es muy largo */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Encabezado del modal */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 id="form-title" className="text-lg font-semibold text-gray-900">
            {isEditing ? "Editar Producto" : "Nuevo Producto"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-lg p-1"
          >
            ✕
          </button>
        </div>

        {/* noValidate desactiva la validación nativa del navegador para usar la nuestra */}
        <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">
          <Input
            label="Título del producto"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            // El error solo se muestra si el usuario ya tocó este campo (touched.title)
            error={touched.title && errors.title}
            placeholder="Ej. Laptop gamer ultrabook"
          />

          {/* Dos columnas en la misma fila usando CSS grid */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Precio (USD)"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.price && errors.price}
              placeholder="0.00"
            />
            <Input
              label="Categoría"
              name="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.category && errors.category}
              placeholder="Ej. electronics"
            />
          </div>

          {/* Textarea manual porque el componente Input solo envuelve <input>, no <textarea> */}
          <div className="flex flex-col gap-1">
            {/* htmlFor debe coincidir con el id del textarea para vincularlos */}
            <label
              htmlFor="description-input"
              className="text-sm font-medium text-gray-700"
            >
              Descripción
            </label>
            <textarea
              id="description-input"
              name="description"
              rows={3}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Descripción del producto..."
              className={`w-full rounded-lg border px-3 py-2 text-sm resize-none
                focus:outline-none focus:ring-2 focus:ring-offset-1
                ${
                  touched.description && errors.description
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
            />
            {touched.description && errors.description && (
              <p className="text-xs text-red-500">{errors.description}</p>
            )}
          </div>

          <Input
            label="URL de imagen (opcional)"
            name="image"
            type="url"
            value={values.image}
            onChange={handleChange}
            placeholder="https://..."
          />

          {/* Botones de acción al pie del formulario */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" loading={loading} className="flex-1">
              {isEditing ? "Guardar cambios" : "Crear producto"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// src/components/products/ProductForm.jsx

import { useState } from "react"; // ← ya no necesitas useEffect
import Button from "../ui/Button";
import Input from "../ui/Input";

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

// ✅ Función pura que construye el estado inicial desde las props
function buildInitialValues(product) {
  if (!product) {
    return { title: "", price: "", category: "", description: "", image: "" };
  }
  return {
    title: product.title || "",
    price: product.price?.toString() || "",
    category: product.category || "",
    description: product.description || "",
    image: product.image || "",
  };
}

export default function ProductForm({ product, onSubmit, onClose, loading }) {
  // ✅ Se inicializa UNA VEZ con los datos correctos desde el inicio
  // Si product existe → edición con datos pre-cargados
  // Si product es null → creación con campos vacíos
  const [values, setValues] = useState(() => buildInitialValues(product));
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const isEditing = Boolean(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(values);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({
        title: true,
        price: true,
        category: true,
        description: true,
      });
      return;
    }
    onSubmit({ ...values, price: Number(values.price) });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-title"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
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

        <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">
          <Input
            label="Título del producto"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && errors.title}
            placeholder="Ej. Laptop gamer ultrabook"
          />

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

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
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

import Button from "../ui/Button";

/**
 * Modal de confirmación para eliminar un producto.
 *
 * Antes de borrar algo permanentemente, es buena práctica pedirle
 * al usuario que confirme. Este modal hace exactamente eso.
 *
 * Nótese que el modal no elimina nada por sí solo. Cuando el usuario
 * confirma, llama a `onConfirm` y el componente padre (ProductsPage)
 * es quien ejecuta la operación real contra la API.
 *
 * Atributos de accesibilidad:
 * - `role="alertdialog"` indica que es un diálogo que requiere atención inmediata.
 * - `aria-modal="true"` avisa a los lectores de pantalla que el resto de la página
 *   está bloqueado mientras el modal está abierto.
 * - `aria-labelledby` apunta al id del título para que el lector de pantalla
 *   anuncie de qué trata el modal al abrirse.
 *
 * @param {Object} props
 * @param {Object} props.product - Producto que se va a eliminar (solo usamos `product.title`).
 * @param {function(): void} props.onConfirm - Se llama cuando el usuario confirma la eliminación.
 * @param {function(): void} props.onClose - Se llama cuando el usuario cancela o cierra el modal.
 * @param {boolean} props.loading - Si es true, el botón de confirmar muestra un spinner y se deshabilita.
 */
export default function ProductDeleteModal({
  product,
  onConfirm,
  onClose,
  loading,
}) {
  return (
    // Overlay oscuro que cubre toda la pantalla
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-title"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <div className="text-center mb-4">
          <div className="text-4xl mb-3">🗑️</div>
          <h2 id="delete-title" className="text-lg font-semibold text-gray-900">
            ¿Eliminar producto?
          </h2>
          {/* product?.title usa optional chaining por si product fuera null */}
          <p className="text-sm text-gray-500 mt-2">
            <strong className="text-gray-700">"{product?.title}"</strong> será
            eliminado permanentemente. Esta acción no se puede deshacer.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          {/* loading bloquea el botón para evitar múltiples clicks mientras la API responde */}
          <Button
            variant="danger"
            loading={loading}
            onClick={onConfirm}
            className="flex-1"
          >
            Sí, eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}

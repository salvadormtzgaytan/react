import Button from "../ui/Button";

export default function ProductDeleteModal({
  product,
  onConfirm,
  onClose,
  loading,
}) {
  return (
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
          <p className="text-sm text-gray-500 mt-2">
            <strong className="text-gray-700">"{product?.title}"</strong> será
            eliminado permanentemente. Esta acción no se puede deshacer.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
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

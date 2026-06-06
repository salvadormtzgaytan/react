import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductList from "../components/products/ProductList";
import ProductForm from "../components/products/ProductForm";
import ProductDeleteModal from "../components/products/ProductDeleteModal";
import ProductFilters from "../components/products/ProductFilters";
import Button from "../components/ui/Button";
import Toast from "../components/ui/Toast";

/**
 * Página principal del módulo de productos — el componente "orquestador".
 *
 * Su responsabilidad es decidir qué se muestra en pantalla y qué sucede
 * cuando el usuario interactúa. No contiene lógica de negocio ni llamadas
 * a la API directamente — eso lo delega al hook `useProducts`.
 *
 * Analogía con jQuery:
 * En jQuery habrías tenido todo en un mismo bloque: el $.ajax, el html()
 * para actualizar la lista, los .on("click") para abrir modales. Aquí cada
 * responsabilidad tiene su lugar: la API en services/, el estado en el hook,
 * y la coordinación aquí.
 *
 * Estado local de este componente:
 * - `modal`: controla qué modal está abierto y con qué producto.
 *   { type: "create"|"edit"|"delete"|null, product: Object|null }
 * - `toast`: controla la notificación temporal de éxito o error.
 */
export default function ProductsPage() {
  const {
    products,
    categories,
    loading,
    error,
    selectedCategory,
    addProduct,
    editProduct,
    removeProduct,
    filterByCategory,
  } = useProducts();

  // Un solo estado para todos los modales: qué tipo de modal y con qué producto
  const [modal, setModal] = useState({ type: null, product: null });
  const [toast, setToast] = useState(null);

  /** Muestra una notificación temporal y la oculta después de 3.5 segundos. */
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  /** Cierra cualquier modal activo. */
  const closeModal = () => setModal({ type: null, product: null });

  /** Crea un producto, muestra la notificación y cierra el modal si tiene éxito. */
  const handleCreate = async (data) => {
    const result = await addProduct(data);
    if (result.success) {
      showToast("Producto creado correctamente");
      closeModal();
    } else {
      showToast(result.error, "error");
    }
  };

  /** Actualiza el producto del modal activo. */
  const handleEdit = async (data) => {
    const result = await editProduct(modal.product.id, data);
    if (result.success) {
      showToast("Producto actualizado");
      closeModal();
    } else {
      showToast(result.error, "error");
    }
  };

  /** Elimina el producto del modal activo. */
  const handleDelete = async () => {
    const result = await removeProduct(modal.product.id);
    if (result.success) {
      showToast("Producto eliminado");
      closeModal();
    } else {
      showToast(result.error, "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra superior con título y botón de creación */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Gestión de Productos
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {products.length} productos · FakeStore API
            </p>
          </div>
          <Button onClick={() => setModal({ type: "create", product: null })}>
            + Nuevo Producto
          </Button>
        </div>
      </div>

      {/* Área de contenido principal */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Banner de error — solo aparece si el hook reporta un error */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            ⚠️ {error}
          </div>
        )}

        <ProductFilters
          categories={categories}
          selected={selectedCategory}
          onSelect={filterByCategory}
        />

        <ProductList
          products={products}
          loading={loading}
          onEdit={(product) => setModal({ type: "edit", product })}
          onDelete={(product) => setModal({ type: "delete", product })}
        />
      </div>

      {/* Modal de creación/edición — se monta solo cuando es necesario */}
      {(modal.type === "create" || modal.type === "edit") && (
        <ProductForm
          product={modal.product}
          // El mismo componente ProductForm sirve para crear y editar;
          // la diferencia es qué función se le pasa como onSubmit
          onSubmit={modal.type === "create" ? handleCreate : handleEdit}
          onClose={closeModal}
          loading={loading}
        />
      )}

      {/* Modal de confirmación de eliminación */}
      {modal.type === "delete" && (
        <ProductDeleteModal
          product={modal.product}
          onConfirm={handleDelete}
          onClose={closeModal}
          loading={loading}
        />
      )}

      {/* Toast — se monta solo cuando hay un mensaje que mostrar */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

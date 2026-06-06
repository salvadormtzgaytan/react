import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductList from "../components/products/ProductList";
import ProductForm from "../components/products/ProductForm";
import ProductDeleteModal from "../components/products/ProductDeleteModal";
import ProductFilters from "../components/products/ProductFilters";
import Button from "../components/ui/Button";
import Toast from "../components/ui/Toast";

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

  const [modal, setModal] = useState({ type: null, product: null });
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleCreate = async (data) => {
    const result = await addProduct(data);
    if (result.success) {
      showToast("Producto creado correctamente");
      setModal({ type: null, product: null });
    } else {
      showToast(result.error, "error");
    }
  };

  const handleEdit = async (data) => {
    const result = await editProduct(modal.product.id, data);
    if (result.success) {
      showToast("Producto actualizado");
      setModal({ type: null, product: null });
    } else {
      showToast(result.error, "error");
    }
  };

  const handleDelete = async () => {
    const result = await removeProduct(modal.product.id);
    if (result.success) {
      showToast("Producto eliminado");
      setModal({ type: null, product: null });
    } else {
      showToast(result.error, "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Error banner */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Filtros */}
        <ProductFilters
          categories={categories}
          selected={selectedCategory}
          onSelect={filterByCategory}
        />

        {/* Lista */}
        <ProductList
          products={products}
          loading={loading}
          onEdit={(product) => setModal({ type: "edit", product })}
          onDelete={(product) => setModal({ type: "delete", product })}
        />
      </div>

      {/* Modales */}
      {(modal.type === "create" || modal.type === "edit") && (
        <ProductForm
          product={modal.product}
          onSubmit={modal.type === "create" ? handleCreate : handleEdit}
          onClose={() => setModal({ type: null, product: null })}
          loading={loading}
        />
      )}

      {modal.type === "delete" && (
        <ProductDeleteModal
          product={modal.product}
          onConfirm={handleDelete}
          onClose={() => setModal({ type: null, product: null })}
          loading={loading}
        />
      )}

      {/* Toast notifications */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

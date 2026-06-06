import { useState, useEffect, useCallback, useRef } from "react";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getProductsByCategory,
} from "../services/productsService";

const initialState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
  selectedCategory: "all",
};

export function useProducts() {
  const [state, setState] = useState(initialState);

  // ✅ Ref para rastrear la categoría activa sin causas de re-render
  const categoryRef = useRef("all");

  // ── Fetching ──────────────────────────────────────────────────────────

  // ✅ La lógica async vive DENTRO del efecto, no afuera
  useEffect(() => {
    let cancelled = false; // evita setState si el componente se desmonta

    async function load() {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const category = categoryRef.current;
        const [products, categories] = await Promise.all([
          category === "all"
            ? getAllProducts()
            : getProductsByCategory(category),
          getCategories(),
        ]);

        if (!cancelled) {
          setState((prev) => ({
            ...prev,
            products,
            categories,
            loading: false,
            selectedCategory: category,
          }));
        }
      } catch (err) {
        if (!cancelled) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: err.message || "Error al cargar productos",
          }));
        }
      }
    }

    load();

    // cleanup: si el componente se desmonta antes de que termine el fetch
    return () => {
      cancelled = true;
    };
  }, []); // ✅ array vacío — solo corre al montar

  // ── filterByCategory: dispara una nueva carga ─────────────────────────
  // ✅ useCallback aquí SÍ es correcto porque no contiene setState directo
  const filterByCategory = useCallback(async (category) => {
    categoryRef.current = category;
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
      selectedCategory: category,
    }));

    try {
      const products = await (category === "all"
        ? getAllProducts()
        : getProductsByCategory(category));
      setState((prev) => ({ ...prev, products, loading: false }));
    } catch (err) {
      setState((prev) => ({ ...prev, loading: false, error: err.message }));
    }
  }, []);

  // ── CRUD Operations ───────────────────────────────────────────────────

  const addProduct = useCallback(async (productData) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const newProduct = await createProduct(productData);
      setState((prev) => ({
        ...prev,
        products: [{ ...productData, id: newProduct.id }, ...prev.products],
        loading: false,
      }));
      return { success: true, data: newProduct };
    } catch (err) {
      setState((prev) => ({ ...prev, loading: false, error: err.message }));
      return { success: false, error: err.message };
    }
  }, []);

  const editProduct = useCallback(async (id, productData) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const updated = await updateProduct(id, productData);
      setState((prev) => ({
        ...prev,
        products: prev.products.map((p) =>
          p.id === id ? { ...p, ...productData } : p,
        ),
        loading: false,
      }));
      return { success: true, data: updated };
    } catch (err) {
      setState((prev) => ({ ...prev, loading: false, error: err.message }));
      return { success: false, error: err.message };
    }
  }, []);

  const removeProduct = useCallback(async (id) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await deleteProduct(id);
      setState((prev) => ({
        ...prev,
        products: prev.products.filter((p) => p.id !== id),
        loading: false,
      }));
      return { success: true };
    } catch (err) {
      setState((prev) => ({ ...prev, loading: false, error: err.message }));
      return { success: false, error: err.message };
    }
  }, []);

  return {
    ...state,
    addProduct,
    editProduct,
    removeProduct,
    filterByCategory,
    refetch: () => filterByCategory(categoryRef.current),
  };
}

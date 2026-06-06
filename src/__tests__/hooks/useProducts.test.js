import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useProducts } from "../../hooks/useProducts";
import * as service from "../../services/productsService";

// Mock del módulo de servicios completo
vi.mock("../../services/productsService");

const fakeProducts = [
  {
    id: 1,
    title: "Producto A",
    price: 10,
    category: "electronics",
    description: "desc",
    image: "",
  },
  {
    id: 2,
    title: "Producto B",
    price: 20,
    category: "jewelery",
    description: "desc",
    image: "",
  },
];
const fakeCategories = ["electronics", "jewelery"];

describe("useProducts", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    service.getAllProducts.mockResolvedValue(fakeProducts);
    service.getCategories.mockResolvedValue(fakeCategories);
    service.getProductsByCategory.mockResolvedValue([fakeProducts[0]]);
    service.createProduct.mockResolvedValue({ id: 99, title: "Nuevo" });
    service.updateProduct.mockResolvedValue({ id: 1, title: "Editado" });
    service.deleteProduct.mockResolvedValue({ id: 1 });
  });

  it("carga productos y categorías al montar", async () => {
    const { result } = renderHook(() => useProducts());
    // Inicialmente loading es true
    expect(result.current.loading).toBe(true);

    // Esperamos a que se resuelva el fetch
    await act(async () => {});

    expect(result.current.products).toEqual(fakeProducts);
    expect(result.current.categories).toEqual(fakeCategories);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("maneja error en la carga inicial", async () => {
    service.getAllProducts.mockRejectedValue(new Error("Network error"));
    const { result } = renderHook(() => useProducts());

    await act(async () => {});

    expect(result.current.error).toBe("Network error");
    expect(result.current.products).toEqual([]);
  });

  it("addProduct agrega el nuevo producto al estado", async () => {
    const { result } = renderHook(() => useProducts());
    await act(async () => {}); // carga inicial

    const newProductData = {
      title: "Nuevo",
      price: 50,
      category: "test",
      description: "x",
      image: "",
    };

    await act(async () => {
      const res = await result.current.addProduct(newProductData);
      expect(res.success).toBe(true);
    });

    expect(result.current.products.some((p) => p.title === "Nuevo")).toBe(true);
  });

  it("editProduct actualiza el producto en el estado local", async () => {
    const { result } = renderHook(() => useProducts());
    await act(async () => {});

    await act(async () => {
      await result.current.editProduct(1, {
        title: "Editado",
        price: 99,
        category: "electronics",
        description: "x",
        image: "",
      });
    });

    const edited = result.current.products.find((p) => p.id === 1);
    expect(edited.title).toBe("Editado");
  });

  it("removeProduct elimina el producto del estado local", async () => {
    const { result } = renderHook(() => useProducts());
    await act(async () => {});

    await act(async () => {
      const res = await result.current.removeProduct(1);
      expect(res.success).toBe(true);
    });

    expect(result.current.products.find((p) => p.id === 1)).toBeUndefined();
  });

  it("filterByCategory filtra correctamente por categoría", async () => {
    const { result } = renderHook(() => useProducts());
    await act(async () => {});

    await act(async () => {
      result.current.filterByCategory("electronics");
    });
    await act(async () => {});

    expect(service.getProductsByCategory).toHaveBeenCalledWith("electronics");
    expect(result.current.selectedCategory).toBe("electronics");
  });
});

import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} from "../../services/productsService";

import { server } from "../../mocks/server";

// Mock global de fetch — controlamos totalmente la red
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

beforeAll(() => {
  server.close(); // Cerramos MSW en este archivo para que no interfiera con el mock de fetch
});

function mockResponse(data, ok = true, status = 200) {
  return Promise.resolve({
    ok,
    status,
    statusText: ok ? "OK" : "Not Found",
    json: () => Promise.resolve(data),
  });
}

describe("productsService", () => {
  beforeEach(() => mockFetch.mockClear());

  // ── GET ALL ───────────────────────────────────────────────────────────
  describe("getAllProducts()", () => {
    it("devuelve lista de productos correctamente", async () => {
      const fakeProducts = [{ id: 1, title: "Test" }];
      mockFetch.mockReturnValue(mockResponse(fakeProducts));

      const result = await getAllProducts();

      expect(mockFetch).toHaveBeenCalledWith(
        "https://fakestoreapi.com/products",
        expect.objectContaining({ headers: expect.any(Object) }),
      );
      expect(result).toEqual(fakeProducts);
    });

    it("agrega ?limit= cuando se pasa el parámetro", async () => {
      mockFetch.mockReturnValue(mockResponse([]));
      await getAllProducts(5);
      expect(mockFetch).toHaveBeenCalledWith(
        "https://fakestoreapi.com/products?limit=5",
        expect.any(Object),
      );
    });

    it("lanza Error cuando el servidor responde con error HTTP", async () => {
      mockFetch.mockReturnValue(mockResponse(null, false, 500));
      await expect(getAllProducts()).rejects.toThrow("HTTP 500");
    });
  });

  // ── GET BY ID ────────────────────────────────────────────────────────
  describe("getProductById()", () => {
    it("llama al endpoint correcto con el id", async () => {
      mockFetch.mockReturnValue(mockResponse({ id: 7 }));
      const result = await getProductById(7);
      expect(mockFetch).toHaveBeenCalledWith(
        "https://fakestoreapi.com/products/7",
        expect.any(Object),
      );
      expect(result.id).toBe(7);
    });

    it("lanza Error cuando el producto no existe (404)", async () => {
      mockFetch.mockReturnValue(mockResponse(null, false, 404));
      await expect(getProductById(999)).rejects.toThrow("HTTP 404");
    });
  });

  // ── CREATE ───────────────────────────────────────────────────────────
  describe("createProduct()", () => {
    it("envía POST con el body correcto", async () => {
      const newProduct = { title: "Nuevo", price: 10, category: "test" };
      mockFetch.mockReturnValue(mockResponse({ id: 21, ...newProduct }));

      const result = await createProduct(newProduct);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://fakestoreapi.com/products",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(newProduct),
        }),
      );
      expect(result.id).toBe(21);
    });
  });

  // ── UPDATE ───────────────────────────────────────────────────────────
  describe("updateProduct()", () => {
    it("envía PUT al endpoint del producto con los datos", async () => {
      const updates = { title: "Editado", price: 99 };
      mockFetch.mockReturnValue(mockResponse({ id: 3, ...updates }));

      await updateProduct(3, updates);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://fakestoreapi.com/products/3",
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify(updates),
        }),
      );
    });
  });

  // ── DELETE ───────────────────────────────────────────────────────────
  describe("deleteProduct()", () => {
    it("envía DELETE al endpoint correcto", async () => {
      mockFetch.mockReturnValue(mockResponse({ id: 5 }));
      await deleteProduct(5);
      expect(mockFetch).toHaveBeenCalledWith(
        "https://fakestoreapi.com/products/5",
        expect.objectContaining({ method: "DELETE" }),
      );
    });

    it("lanza Error si el DELETE falla", async () => {
      mockFetch.mockReturnValue(mockResponse(null, false, 403));
      await expect(deleteProduct(1)).rejects.toThrow("HTTP 403");
    });
  });

  // ── CATEGORÍAS ───────────────────────────────────────────────────────
  describe("getCategories()", () => {
    it("devuelve array de categorías", async () => {
      const cats = ["electronics", "jewelery"];
      mockFetch.mockReturnValue(mockResponse(cats));
      const result = await getCategories();
      expect(result).toEqual(cats);
    });
  });
});

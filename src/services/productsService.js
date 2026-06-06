// 📌 Concepto reforzado: Módulo ES, no clase. Funciones puras.
// La capa de servicio es un contrato: recibe datos, devuelve datos.

const BASE_URL = "https://fakestoreapi.com";

// Helper interno: centraliza el manejo de errores de red
async function fetchWithError(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    // Lanza un Error con información útil para el catch
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

// ── READ ──────────────────────────────────────────────────────────────────

export async function getAllProducts(limit) {
  const url = limit
    ? `${BASE_URL}/products?limit=${limit}`
    : `${BASE_URL}/products`;
  return fetchWithError(url);
}

export async function getProductById(id) {
  return fetchWithError(`${BASE_URL}/products/${id}`);
}

export async function getCategories() {
  return fetchWithError(`${BASE_URL}/products/categories`);
}

export async function getProductsByCategory(category) {
  return fetchWithError(
    `${BASE_URL}/products/category/${encodeURIComponent(category)}`,
  );
}

// ── CREATE ────────────────────────────────────────────────────────────────

export async function createProduct(productData) {
  return fetchWithError(`${BASE_URL}/products`, {
    method: "POST",
    body: JSON.stringify(productData),
  });
}

// ── UPDATE ────────────────────────────────────────────────────────────────

export async function updateProduct(id, productData) {
  return fetchWithError(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(productData),
  });
}

// ── DELETE ────────────────────────────────────────────────────────────────

export async function deleteProduct(id) {
  return fetchWithError(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
}

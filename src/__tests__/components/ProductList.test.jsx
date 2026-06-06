import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductsPage from "../../pages/ProductsPage";
import * as service from "../../services/productsService";

vi.mock("../../services/productsService");

const fakeProducts = [
  {
    id: 1,
    title: "Laptop Gaming",
    price: 999,
    category: "electronics",
    description: "Desc",
    image: "",
    rating: { rate: 4.5, count: 10 },
  },
];

describe("ProductsPage — integración", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    service.getAllProducts.mockResolvedValue(fakeProducts);
    service.getCategories.mockResolvedValue(["electronics"]);
    service.createProduct.mockResolvedValue({ id: 21, title: "Nuevo" });
    service.updateProduct.mockResolvedValue({ id: 1 });
    service.deleteProduct.mockResolvedValue({ id: 1 });
  });

  it("muestra los productos tras la carga", async () => {
    render(<ProductsPage />);
    await waitFor(() => {
      expect(screen.getByText("Laptop Gaming")).toBeInTheDocument();
    });
  });

  it('abre el modal de creación al hacer clic en "+ Nuevo Producto"', async () => {
    const user = userEvent.setup();
    render(<ProductsPage />);
    await waitFor(() => screen.getByText("Laptop Gaming"));

    await user.click(screen.getByRole("button", { name: /nuevo producto/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Nuevo Producto")).toBeInTheDocument();
  });

  it("muestra error banner cuando la carga falla", async () => {
    service.getAllProducts.mockRejectedValue(new Error("Network error"));
    render(<ProductsPage />);
    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });
});

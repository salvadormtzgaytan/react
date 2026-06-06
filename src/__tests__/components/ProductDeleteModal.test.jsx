import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductDeleteModal from "../../components/products/ProductDeleteModal";

const mockProduct = { id: 1, title: "Producto de Prueba" };
const mockOnConfirm = vi.fn();
const mockOnClose = vi.fn();

describe("ProductDeleteModal", () => {
  beforeEach(() => {
    mockOnConfirm.mockClear();
    mockOnClose.mockClear();
  });

  it("muestra el nombre del producto a eliminar", () => {
    render(
      <ProductDeleteModal
        product={mockProduct}
        onConfirm={mockOnConfirm}
        onClose={mockOnClose}
        loading={false}
      />,
    );
    expect(screen.getByText(/Producto de Prueba/i)).toBeInTheDocument();
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });

  it('llama a onConfirm al hacer clic en "Sí, eliminar"', async () => {
    const user = userEvent.setup();
    render(
      <ProductDeleteModal
        product={mockProduct}
        onConfirm={mockOnConfirm}
        onClose={mockOnClose}
        loading={false}
      />,
    );
    await user.click(screen.getByRole("button", { name: /sí, eliminar/i }));
    expect(mockOnConfirm).toHaveBeenCalledOnce();
  });

  it('llama a onClose al hacer clic en "Cancelar"', async () => {
    const user = userEvent.setup();
    render(
      <ProductDeleteModal
        product={mockProduct}
        onConfirm={mockOnConfirm}
        onClose={mockOnClose}
        loading={false}
      />,
    );
    await user.click(screen.getByRole("button", { name: /cancelar/i }));
    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it("deshabilita el botón de confirmación cuando loading=true", () => {
    render(
      <ProductDeleteModal
        product={mockProduct}
        onConfirm={mockOnConfirm}
        onClose={mockOnClose}
        loading={true}
      />,
    );
    expect(
      screen.getByRole("button", { name: /sí, eliminar/i }),
    ).toBeDisabled();
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductForm from "../../components/products/ProductForm";

const mockOnSubmit = vi.fn();
const mockOnClose = vi.fn();

const defaultProps = {
  product: null,
  onSubmit: mockOnSubmit,
  onClose: mockOnClose,
  loading: false,
};

describe("ProductForm", () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnClose.mockClear();
  });

  it("renderiza el formulario de creación correctamente", () => {
    render(<ProductForm {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Nuevo Producto")).toBeInTheDocument();
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/precio/i)).toBeInTheDocument();
  });

  it("pre-popula los campos cuando se edita un producto", () => {
    const product = {
      id: 1,
      title: "Laptop",
      price: 999,
      category: "electronics",
      description: "Buena laptop",
      image: "",
    };
    render(<ProductForm {...defaultProps} product={product} />);
    expect(screen.getByDisplayValue("Laptop")).toBeInTheDocument();
    expect(screen.getByDisplayValue("999")).toBeInTheDocument();
  });

  it("muestra errores de validación cuando el formulario está incompleto", async () => {
    const user = userEvent.setup();
    render(<ProductForm {...defaultProps} />);

    // Intenta enviar sin llenar campos
    await user.click(screen.getByRole("button", { name: /crear producto/i }));

    await waitFor(() => {
      expect(screen.getByText(/título es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/precio debe ser mayor/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("llama a onSubmit con los datos correctos al completar el formulario", async () => {
    const user = userEvent.setup();
    render(<ProductForm {...defaultProps} />);

    await user.type(screen.getByLabelText(/título/i), "Nuevo Producto Test");
    await user.type(screen.getByLabelText(/precio/i), "49.99");
    await user.type(screen.getByLabelText(/categoría/i), "electronics");
    await user.type(
      screen.getByLabelText(/descripción/i),
      "Descripción de prueba",
    );

    await user.click(screen.getByRole("button", { name: /crear producto/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Nuevo Producto Test",
          price: 49.99,
          category: "electronics",
          description: "Descripción de prueba",
        }),
      );
    });
  });

  it("llama a onClose al presionar Cancelar", async () => {
    const user = userEvent.setup();
    render(<ProductForm {...defaultProps} />);
    await user.click(screen.getByRole("button", { name: /cancelar/i }));
    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it("muestra spinner de carga cuando loading=true", () => {
    render(<ProductForm {...defaultProps} loading={true} />);
    // El botón de submit debe estar deshabilitado
    const submitBtn = screen.getByRole("button", { name: /crear producto/i });
    expect(submitBtn).toBeDisabled();
  });

  it("no envía precios negativos o cero", async () => {
    const user = userEvent.setup();
    render(<ProductForm {...defaultProps} />);

    await user.type(screen.getByLabelText(/precio/i), "-5");
    await user.click(screen.getByRole("button", { name: /crear producto/i }));

    await waitFor(() => {
      expect(screen.getByText(/precio debe ser mayor/i)).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});

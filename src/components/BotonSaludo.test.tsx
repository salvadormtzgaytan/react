import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BotonSaludo } from "./BotonSaludo";

describe("Pruebas del componente BotonSaludo", () => {
  it('debe mostrar "Hola" al inicio', () => {
    render(<BotonSaludo />);
    const boton = screen.getByText("Hola");
    expect(boton).toBeInTheDocument();
  });

  it('debe cambiar el texto a "Adiós" al hacer clic', () => {
    render(<BotonSaludo />);
    const boton = screen.getByText("Hola");

    // Simulamos el clic del usuario
    fireEvent.click(boton);

    // Verificamos que ahora diga "Adiós"
    const nuevoBoton = screen.getByText("Adiós");
    expect(nuevoBoton).toBeInTheDocument();
  });
});

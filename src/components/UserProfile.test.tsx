// src/components/UserProfile.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { UserProfile } from "./UserProfile";

describe("UserProfile", () => {
  it("debe renderizar el nombre del usuario después de cargar", async () => {
    render(<UserProfile />);

    // 1. Verificamos el estado de carga
    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();

    // 2. Esperamos a que los datos aparezcan (MSW interceptó el fetch)
    await waitFor(() => {
      expect(screen.getByText("Usuario de Prueba")).toBeInTheDocument();
    });
  });
});

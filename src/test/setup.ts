// src/test/setup.ts
import { afterEach, beforeAll, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { server } from "../mocks/server"; // Importa el server

// Configuramos MSW para escuchar en todos los tests
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers(); // Resetea los handlers para que no se mezclen entre tests
  cleanup();
});
afterAll(() => server.close()); // Cierra el server al terminar

// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/usuario", () => {
    return HttpResponse.json({
      id: 1,
      nombre: "Usuario de Prueba",
      email: "test@ejemplo.com",
    });
  }),
];

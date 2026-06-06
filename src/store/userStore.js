import { create } from "zustand";

// 1. Definimos nuestro almacén global (store)
export const useUserStore = create((set) => ({
  // Estado inicial
  nombre: "Carlos Desarrollador",
  fotoUrl:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",

  // Acciones (funciones) para modificar el estado
  cambiarFoto: (nuevaUrl) => set({ fotoUrl: nuevaUrl }),
}));

import { create } from "zustand";

// Creamos nuestro almacén global para un carrito de compras
export const useCartStore = create((set) => ({
  // 1. Nuestros datos (Estado inicial)
  productosCarrito: 0,

  // 2. Nuestras acciones (Funciones para modificar el estado)
  agregarAlCarrito: () =>
    set((state) => ({ productosCarrito: state.productosCarrito + 1 })),

  vaciarCarrito: () => set({ productosCarrito: 0 }),
}));

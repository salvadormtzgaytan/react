import { useCartStore } from "../store/cartStore";

export default function Catalogo() {
  // Aquí extraemos las acciones
  const agregarAlCarrito = useCartStore((state) => state.agregarAlCarrito);
  const vaciarCarrito = useCartStore((state) => state.vaciarCarrito);

  return (
    <div
      style={{ border: "1px solid gray", padding: "20px", marginTop: "20px" }}
    >
      <h2>Catálogo de Zapatos</h2>
      <button onClick={agregarAlCarrito}>Añadir al carrito +</button>
      <button onClick={vaciarCarrito} style={{ marginLeft: "10px" }}>
        Vaciar Carrito
      </button>
    </div>
  );
}

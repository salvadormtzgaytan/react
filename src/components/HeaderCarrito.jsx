import { useCartStore } from "../store/cartStore";

export default function HeaderCarrito() {
  // Solo extraemos el número de productos
  const productosCarrito = useCartStore((state) => state.productosCarrito);

  return (
    <header style={{ background: "orange", padding: "15px" }}>
      <h3>🛒 Carrito Global: {productosCarrito} items</h3>
    </header>
  );
}

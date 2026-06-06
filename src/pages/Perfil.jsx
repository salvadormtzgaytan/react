// src/pages/Perfil.jsx
import { useUserStore } from "../store/userStore";

export default function Perfil() {
  // Extraemos datos y la función para modificar el estado
  const fotoUrl = useUserStore((state) => state.fotoUrl);
  const cambiarFoto = useUserStore((state) => state.cambiarFoto);

  const accionarCambio = () => {
    const nuevaFoto =
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80";
    cambiarFoto(nuevaFoto); // Esto dispara la actualización global
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Página de Perfil</h2>
      <img
        src={fotoUrl}
        alt="Foto Grande"
        style={{ width: "150px", borderRadius: "50%" }}
      />
      <button onClick={accionarCambio}>Cambiar Foto</button>
    </div>
  );
}

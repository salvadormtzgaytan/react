// src/components/Menu.jsx
import { Link } from "react-router-dom";
import { useUserStore } from "../store/userStore"; // Importamos nuestro store

export default function Menu() {
  // Nos conectamos al almacén y extraemos lo que necesitamos
  const nombre = useUserStore((state) => state.nombre);
  const fotoUrl = useUserStore((state) => state.fotoUrl);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: "#222",
        color: "white",
      }}
    >
      <div>
        <Link to="/" style={{ marginRight: "15px" }}>
          Inicio
        </Link>
        <Link to="/perfil" style={{ marginRight: "15px" }}>
          Perfil
        </Link>
        <Link to="/posts" style={{ color: "green" }}>
          Ver Posts (API)
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span>{nombre}</span>
        <img
          src={fotoUrl}
          alt="Avatar"
          style={{ width: "35px", height: "35px", borderRadius: "50%" }}
        />
      </div>
    </nav>
  );
}

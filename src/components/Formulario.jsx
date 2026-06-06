import { useState } from "react";

export default function Formulario() {
  const [texto, setTexto] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();
    alert(`Enviado: ${texto}`);
    setTexto("");
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "15px",
      }}
    >
      <h2>2. El Formulario</h2>
      <form onSubmit={manejarEnvio}>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe algo..."
        />
        <button type="submit" style={{ marginLeft: "10px" }}>
          Enviar
        </button>
      </form>
      <p>Escribiendo: {texto}</p>
    </div>
  );
}

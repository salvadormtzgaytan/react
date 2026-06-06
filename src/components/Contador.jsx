import { useState } from "react";

export default function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "15px",
      }}
    >
      <h2>1. El Contador</h2>
      <p>Valor actual: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>Sumar +1</button>
    </div>
  );
}

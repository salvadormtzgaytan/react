import { useState } from "react";

export const BotonSaludo = () => {
  const [saludo, setSaludo] = useState("Hola");

  return <button onClick={() => setSaludo("Adiós")}>{saludo}</button>;
};

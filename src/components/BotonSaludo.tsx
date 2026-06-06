import { useState } from "react";

/**
 * Botón de saludo — ejemplo básico de estado local con useState.
 *
 * `useState` es el equivalente a tener una variable que, cuando cambia,
 * hace que React vuelva a renderizar el componente con el nuevo valor.
 *
 * En jQuery harías:
 *   let saludo = "Hola";
 *   $("button").on("click", function() {
 *     saludo = "Adiós";
 *     $("button").text(saludo); // tienes que actualizar el DOM tú mismo
 *   });
 *
 * Con useState:
 *   const [saludo, setSaludo] = useState("Hola");
 *   // Cuando llamas setSaludo("Adiós"), React actualiza el DOM automáticamente.
 */
export const BotonSaludo = () => {
  const [saludo, setSaludo] = useState("Hola");

  return <button onClick={() => setSaludo("Adiós")}>{saludo}</button>;
};

import { useEffect, useState } from "react";

/**
 * Componente que carga y muestra el perfil del usuario desde una API.
 *
 * Muestra cómo usar `useEffect` para hacer un fetch al montar el componente.
 *
 * `useEffect` con array vacío `[]` equivale al clásico `$(document).ready()`
 * de jQuery: el código dentro corre una sola vez, cuando el componente
 * aparece en pantalla por primera vez.
 *
 * En jQuery harías:
 *   $(document).ready(function() {
 *     $.getJSON("/api/usuario", function(data) {
 *       $("#nombre").text(data.nombre);
 *     });
 *   });
 *
 * Con useEffect + useState:
 *   - Guardas el resultado en estado con useState.
 *   - React actualiza el DOM cuando el estado cambia.
 *   - No tienes que buscar elementos con selectores.
 *
 * El tipo `{ nombre: string } | null` es TypeScript diciéndonos que `user`
 * puede ser un objeto con una propiedad `nombre` de tipo string, o null
 * mientras los datos no han llegado todavía.
 */
export const UserProfile = () => {
  const [user, setUser] = useState<{ nombre: string } | null>(null);

  useEffect(() => {
    // El array vacío [] significa: ejecuta esto solo al montar el componente
    fetch("/api/usuario")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  // Mientras user es null, mostramos un estado de carga
  if (!user) return <div>Cargando...</div>;

  return <h1>{user.nombre}</h1>;
};

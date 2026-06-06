import { useState, useEffect } from "react";

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        // Solo tomamos los primeros 3 para no hacer la lista enorme
        setUsuarios(datos.slice(0, 3));
        setCargando(false);
      });
  }, []);

  return (
    <div style={{ border: "1px solid #ccc", padding: "15px" }}>
      <h2>3. Lista de la API</h2>
      {cargando ? (
        <p>Cargando datos...</p>
      ) : (
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>{usuario.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

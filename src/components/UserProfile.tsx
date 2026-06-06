// src/components/UserProfile.tsx
import { useEffect, useState } from "react";

export const UserProfile = () => {
  const [user, setUser] = useState<{ nombre: string } | null>(null);

  useEffect(() => {
    fetch("/api/usuario")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user) return <div>Cargando...</div>;
  return <h1>{user.nombre}</h1>;
};

import { useQuery } from "@tanstack/react-query";

// Esta es la función que realmente va a Internet por los datos
const fetchPosts = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
  );
  if (!res.ok) throw new Error("Error al cargar datos");
  return res.json();
};

export default function Posts() {
  // Aquí ocurre la magia: React Query maneja el estado por ti
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"], // El "nombre" único de estos datos
    queryFn: fetchPosts, // La función que los trae
  });

  if (isLoading)
    return <h2>Cargando Posts... (El asistente está trabajando)</h2>;
  if (error) return <h2>Error: {error.message}</h2>;

  return (
    <div>
      <h2>Lista de Posts (Consumo de API)</h2>
      {data.map((post) => (
        <div
          key={post.id}
          style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}
        >
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

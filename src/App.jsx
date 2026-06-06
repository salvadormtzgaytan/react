import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Perfil from "./pages/Perfil";
import Posts from "./pages/Posts"; // Importamos la nueva página
import Menu from "./components/Menu";
import ProductsPage from "./pages/ProductsPage";

export default function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Mi Primera SPA en React 🚀</h1>
      <Menu />
      <div style={{ border: "2px dashed gray", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="*" element={<h2>404</h2>} />
        </Routes>
      </div>
    </div>
  );
}

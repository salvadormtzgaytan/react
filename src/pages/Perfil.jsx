import { useUserStore } from "../store/userStore";
import Button from "../components/ui/Button";

/**
 * Página de perfil de usuario — Fase 2.
 *
 * Muestra los datos del usuario y permite cambiar su foto de perfil.
 * Los datos vienen del store global de Zustand (`useUserStore`).
 *
 * Cuando el usuario hace clic en "Cambiar Foto", se llama a `cambiarFoto`
 * del store. Esa función actualiza el estado global, y automáticamente
 * todos los componentes que lean ese estado (como el menú lateral) se
 * actualizan también — sin necesidad de pasar props ni emitir eventos.
 *
 * Esto es la diferencia con jQuery: allá tendrías que buscar todos los
 * elementos del DOM que muestran la foto y actualizarlos uno a uno.
 * Aquí solo cambias el estado y React se encarga del resto.
 */
export default function Perfil() {
  // Extraemos los valores y la acción que necesitamos del store global
  const nombre = useUserStore((state) => state.nombre);
  const fotoUrl = useUserStore((state) => state.fotoUrl);
  const cambiarFoto = useUserStore((state) => state.cambiarFoto);

  const accionarCambio = () => {
    const nuevaFoto =
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80";
    // Esta llamada actualiza el estado global; el menú lateral y esta página
    // se re-renderizan solos con la nueva foto
    cambiarFoto(nuevaFoto);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 self-start">Página de Perfil</h2>

        <div className="relative group">
          <img
            src={fotoUrl}
            alt="Foto Grande"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold text-gray-800">{nombre}</h3>
          <p className="text-sm text-gray-500">Estudiante de React</p>
        </div>

        <Button onClick={accionarCambio} variant="primary" className="mt-2">
          Cambiar Foto
        </Button>
      </div>
    </div>
  );
}

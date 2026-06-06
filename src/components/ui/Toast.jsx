import { cn } from "../../lib/utils";

/**
 * Notificación flotante temporal (toast) de éxito o error.
 *
 * Aparece fija en la esquina inferior derecha de la pantalla. El componente
 * padre se encarga de mostrarla y ocultarla usando un setTimeout:
 *
 * @example
 * // En el componente padre:
 * const [toast, setToast] = useState(null);
 *
 * const showToast = (message, type = "success") => {
 *   setToast({ message, type });
 *   setTimeout(() => setToast(null), 3500); // se oculta después de 3.5s
 * };
 *
 * // En el JSX:
 * {toast && <Toast message={toast.message} type={toast.type} />}
 *
 * @param {Object} props
 * @param {string} props.message - Texto que se muestra en la notificación.
 * @param {"success"|"error"} [props.type="success"] - Determina el color y el ícono.
 */
export default function Toast({ message, type = "success" }) {
  return (
    // `fixed` lo saca del flujo del documento y lo posiciona sobre todo lo demás
    <div className="fixed bottom-5 right-5 z-50 animate-bounce">
      <div
        className={cn(
          "px-4 py-3 rounded-lg shadow-lg border text-sm flex items-center gap-2",
          // Color verde para éxito, rojo para error
          type === "success"
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-red-50 border-red-200 text-red-800",
        )}
      >
        <span>{type === "success" ? "✅" : "❌"}</span>
        <span>{message}</span>
      </div>
    </div>
  );
}

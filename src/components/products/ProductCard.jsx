import Button from "../ui/Button";

/**
 * Tarjeta visual de un producto individual.
 *
 * Muestra la imagen, categoría, título, descripción y precio del producto,
 * junto con los botones de Editar y Eliminar.
 *
 * Este componente no sabe nada de la API ni del estado global. Solo recibe
 * un objeto `product` y dos funciones como props. Cuando el usuario hace clic,
 * llama a la función que le pasó el padre — que sí sabe qué hacer con eso.
 *
 * En jQuery harías: $(".card .btn-edit").on("click", function() { ... })
 * Aquí el onClick vive en el componente directamente como prop.
 *
 * @param {Object} props
 * @param {Object} props.product - Objeto con los datos del producto.
 * @param {number} props.product.id
 * @param {string} props.product.title
 * @param {string} props.product.description
 * @param {number} props.product.price
 * @param {string} props.product.image - URL de la imagen.
 * @param {string} props.product.category
 * @param {function(Object): void} props.onEdit - Se llama con el producto cuando el usuario hace clic en Editar.
 * @param {function(Object): void} props.onDelete - Se llama con el producto cuando el usuario hace clic en Eliminar.
 */
export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Área de imagen con badge de categoría superpuesto */}
      <div className="h-48 bg-gray-50 flex items-center justify-center p-4 relative">
        <img
          src={product.image || "https://placehold.co/200x200?text=No+Image"}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
        {/* `absolute` posiciona el badge sobre la imagen, no empuja el contenido */}
        <span className="absolute top-3 right-3 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full uppercase">
          {product.category}
        </span>
      </div>

      {/* Contenido de la tarjeta — flex-1 hace que ocupe el espacio restante */}
      <div className="p-4 flex flex-col flex-1">
        {/* line-clamp-2 corta el título a máximo 2 líneas con "..." */}
        <h3
          className="font-semibold text-gray-900 line-clamp-2 min-h-[3rem] text-sm hover:text-blue-600 transition-colors"
          title={product.title}
        >
          {product.title}
        </h3>

        {/* flex-1 en la descripción empuja el precio y botones hacia abajo */}
        <p className="text-gray-500 text-xs mt-1 line-clamp-3 flex-1">
          {product.description}
        </p>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          {/* toFixed(2) asegura siempre dos decimales: 9.9 → "9.90" */}
          <span className="text-lg font-bold text-gray-900">
            ${product.price?.toFixed(2)}
          </span>

          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(product)}
            >
              Editar
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(product)}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

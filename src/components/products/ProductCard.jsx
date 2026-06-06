import Button from "../ui/Button";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
      <div className="h-48 bg-gray-50 flex items-center justify-center p-4 relative">
        <img
          src={product.image || "https://placehold.co/200x200?text=No+Image"}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
        <span className="absolute top-3 right-3 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full uppercase">
          {product.category}
        </span>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[3rem] text-sm hover:text-blue-600 transition-colors" title={product.title}>
          {product.title}
        </h3>
        
        <p className="text-gray-500 text-xs mt-1 line-clamp-3 flex-1">
          {product.description}
        </p>
        
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
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

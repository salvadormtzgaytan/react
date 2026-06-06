import { cn } from "../../lib/utils";

export default function Input({ label, error, className, id, ...props }) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full rounded-lg border px-3 py-2 text-sm",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-1",
          error
            ? "border-red-400 focus:ring-red-400"
            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}

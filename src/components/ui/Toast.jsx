import { cn } from "../../lib/utils";

export default function Toast({ message, type = "success" }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce">
      <div
        className={cn(
          "px-4 py-3 rounded-lg shadow-lg border text-sm flex items-center gap-2",
          type === "success"
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-red-50 border-red-200 text-red-800"
        )}
      >
        <span>{type === "success" ? "✅" : "❌"}</span>
        <span>{message}</span>
      </div>
    </div>
  );
}

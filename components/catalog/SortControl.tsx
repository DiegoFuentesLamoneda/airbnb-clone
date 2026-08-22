import type { SortOrder } from "@/types";

interface SortControlProps {
  order: SortOrder;
  onChange: (order: SortOrder) => void;
}

/**
 * Etiquetas cortas a propósito: con "Precio: menor primero" el grupo se iba a
 * ~340px y no cabía en un viewport de 375px sin scroll horizontal.
 */
const OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "asc", label: "Menor precio" },
  { value: "desc", label: "Mayor precio" },
];

/**
 * Conmutador de orden por precio. Dos botones en un grupo en vez de un
 * desplegable: a 375px un `select` nativo abre una hoja del sistema que tapa
 * los resultados, y aquí el estado activo se ve sin abrir nada.
 */
const SortControl = ({ order, onChange }: SortControlProps) => (
  <div
    role="group"
    aria-label="Ordenar resultados"
    className="inline-flex rounded-full border border-hairline p-1"
  >
    {OPTIONS.map((option) => (
      <button
        key={option.value}
        type="button"
        onClick={() => onChange(option.value)}
        aria-pressed={order === option.value}
        className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition ${
          order === option.value
            ? "bg-ink text-white"
            : "text-muted hover:text-ink"
        }`}
      >
        {option.label}
      </button>
    ))}
  </div>
);

export default SortControl;

import type { Category } from "@/types";
import CategoryIcon from "@/components/ui/CategoryIcon";

interface CategoryPillProps {
  category: Category;
  isActive: boolean;
  onSelect: (id: string) => void;
}

/**
 * Una sola categoría de la fila de filtros. La activa se resalta con texto
 * oscuro y una línea inferior, igual que en la captura de la portada.
 */
const CategoryPill = ({ category, isActive, onSelect }: CategoryPillProps) => (
  <button
    type="button"
    onClick={() => onSelect(category.id)}
    aria-pressed={isActive}
    className={`flex shrink-0 flex-col items-center gap-2 border-b-2 pb-3 transition ${
      isActive
        ? "border-ink text-ink"
        : "border-transparent text-muted hover:border-hairline hover:text-ink"
    }`}
  >
    <CategoryIcon name={category.icon} />
    <span className="text-xs font-medium whitespace-nowrap">{category.label}</span>
  </button>
);

export default CategoryPill;

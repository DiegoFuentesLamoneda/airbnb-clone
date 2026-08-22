import type { Category } from "@/types";
import CategoryPill from "@/components/home/CategoryPill";

interface CategoryFiltersProps {
  categories: Category[];
  activeId: string;
  onSelect: (id: string) => void;
}

/**
 * Fila horizontal de categorías bajo la navbar. Scrollea en horizontal y nunca
 * envuelve: a 375px caben tres y media, y eso es intencionado — el corte
 * invita a arrastrar.
 */
const CategoryFilters = ({
  categories,
  activeId,
  onSelect,
}: CategoryFiltersProps) => (
  <div className="border-b border-hairline bg-white">
    <div className="no-scrollbar mx-auto flex max-w-[1600px] gap-8 overflow-x-auto px-5 pt-4 md:px-10">
      {categories.map((category) => (
        <CategoryPill
          key={category.id}
          category={category}
          isActive={category.id === activeId}
          onSelect={onSelect}
        />
      ))}
    </div>
  </div>
);

export default CategoryFilters;

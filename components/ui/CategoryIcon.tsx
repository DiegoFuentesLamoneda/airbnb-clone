import type { CategoryIconName } from "@/types";

/**
 * Trazados de los iconos de categoría. Se guardan como datos y no como JSX para
 * que el componente quepa en unas pocas líneas. Sin librería de iconos.
 */
const PATHS: Record<CategoryIconName, string> = {
  trending: "M3 17l6-6 4 4 8-8M15 7h6v6",
  beach: "M2 17c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2M2 21c2 0 2 2 4 2M12 15V4M12 4c-4 0-7 2-8 5h16c-1-3-4-5-8-5z",
  mansion: "M3 21V9l9-6 9 6v12M9 21v-6h6v6M3 21h18",
  pool: "M6 4v10M10 4v10M6 8h4M2 18c2 0 2 1.5 4 1.5s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5",
  cabin: "M4 21L12 4l8 17zM9 21v-6h6v6M7.5 14h9",
  city: "M3 21V8h7v13M10 21V3h11v18M3 21h18M6 12h1M6 16h1M14 7h1M14 12h1M14 16h1M18 7h1M18 12h1M18 16h1",
  countryside: "M3 20l5-6 4 4.5L17 12l4 8zM3 20h18M17 7a2 2 0 100-4 2 2 0 000 4z",
  lake: "M3 13l4-5 4 5 3-3 7 8M3 20c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1",
};

interface CategoryIconProps {
  name: CategoryIconName;
  className?: string;
}

const CategoryIcon = ({ name, className = "h-6 w-6" }: CategoryIconProps) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d={PATHS[name]} />
  </svg>
);

export default CategoryIcon;

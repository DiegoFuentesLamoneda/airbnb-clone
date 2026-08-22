import type { Category } from "@/types";

/** Fila de filtros bajo la navbar. El primero es el activo por defecto. */
export const CATEGORIES: Category[] = [
  { id: "all", label: "Todo", icon: "all" },
  { id: "trending", label: "Tendencias", icon: "trending" },
  { id: "beach", label: "Playa", icon: "beach" },
  { id: "mansion", label: "Mansiones", icon: "mansion" },
  { id: "pool", label: "Piscinas", icon: "pool" },
  { id: "cabin", label: "Cabañas", icon: "cabin" },
  { id: "city", label: "Ciudad", icon: "city" },
  { id: "countryside", label: "Campo", icon: "countryside" },
  { id: "lake", label: "Junto al lago", icon: "lake" },
];

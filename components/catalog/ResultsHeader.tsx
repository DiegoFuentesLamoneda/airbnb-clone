import type { SortOrder } from "@/types";
import SortControl from "@/components/catalog/SortControl";

interface ResultsHeaderProps {
  count: number;
  order: SortOrder;
  onOrderChange: (order: SortOrder) => void;
}

/**
 * Recuento de resultados y control de orden. Apilados a 375px, en la misma
 * fila a partir de md.
 */
const ResultsHeader = ({ count, order, onOrderChange }: ResultsHeaderProps) => (
  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    <div>
      <h1 className="text-xl font-semibold">
        {count} {count === 1 ? "alojamiento" : "alojamientos"} en España
      </h1>
      <p className="text-sm text-muted">Precios por noche, impuestos incluidos</p>
    </div>

    <div className="no-scrollbar -mx-5 overflow-x-auto px-5 md:mx-0 md:overflow-visible md:px-0">
      <SortControl order={order} onChange={onOrderChange} />
    </div>
  </div>
);

export default ResultsHeader;

import type { Listing } from "@/types";
import ListingCard from "@/components/listings/ListingCard";

interface ListingGridProps {
  listings: Listing[];
  /** El catálogo aprieta la cuadrícula a dos columnas porque cede sitio al mapa. */
  columnsClassName?: string;
}

/**
 * Coloca las tarjetas y resuelve el caso vacío. Una columna a 375px, y va
 * añadiendo columnas conforme hay sitio.
 */
const ListingGrid = ({
  listings,
  columnsClassName = "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}: ListingGridProps) => {
  if (listings.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-medium">No hay alojamientos que coincidan</p>
        <p className="mt-1 text-sm text-muted">
          Prueba con otro destino o quita algún filtro.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 gap-6 ${columnsClassName}`}>
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

export default ListingGrid;

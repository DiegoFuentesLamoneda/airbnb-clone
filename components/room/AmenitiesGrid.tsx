import type { Amenity } from "@/types";
import AmenityIcon from "@/components/ui/AmenityIcon";

interface AmenitiesGridProps {
  amenities: Amenity[];
}

/**
 * Servicios del alojamiento. Una columna a 375px y dos a partir de md: la
 * captura los lista en vertical en móvil, y en escritorio Airbnb los reparte en
 * dos columnas.
 */
const AmenitiesGrid = ({ amenities }: AmenitiesGridProps) => (
  <section className="border-b border-hairline py-6">
    <h2 className="text-xl font-semibold">Lo que ofrece este alojamiento</h2>

    <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      {amenities.map((amenity) => (
        <li key={amenity.id} className="flex items-center gap-4">
          <AmenityIcon name={amenity.icon} className="h-6 w-6 shrink-0" />
          <span className="text-sm">{amenity.label}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default AmenitiesGrid;

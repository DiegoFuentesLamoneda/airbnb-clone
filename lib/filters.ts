import type { Listing, SortOrder } from "@/types";

/** Rango Unicode de las marcas combinantes que deja `normalize("NFD")`. */
const COMBINING_START = 0x0300;
const COMBINING_END = 0x036f;

/**
 * Pasa a minúsculas y quita tildes, para que buscar "malaga" encuentre
 * "Málaga". Sin esto el buscador falla justo con los destinos españoles.
 *
 * `NFD` separa cada letra acentuada en letra + marca combinante, y aquí se
 * descartan esas marcas por código. Se comparan códigos en lugar de usar un
 * regex para que el fuente no lleve caracteres combinantes sueltos.
 */
const normalize = (text: string): string =>
  Array.from(text.toLowerCase().normalize("NFD"))
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code < COMBINING_START || code > COMBINING_END;
    })
    .join("");

interface FilterOptions {
  /** Texto del buscador. Se compara contra título y ubicación. */
  query: string;
  /** Categoría activa. `"all"` desactiva este filtro. */
  categoryId: string;
}

/**
 * Los dos filtros de la portada aplicados a la vez. Es una función pura y
 * síncrona: se recalcula en cada pulsación sin tocar la red.
 */
export const filterListings = (
  listings: Listing[],
  { query, categoryId }: FilterOptions,
): Listing[] => {
  const term = normalize(query.trim());

  return listings.filter((listing) => {
    const matchesCategory =
      categoryId === "all" || listing.categoryId === categoryId;

    const matchesQuery =
      term === "" ||
      normalize(listing.title).includes(term) ||
      normalize(listing.location).includes(term);

    return matchesCategory && matchesQuery;
  });
};

/** Ordena por precio por noche sin mutar el array recibido. */
export const sortByPrice = (listings: Listing[], order: SortOrder): Listing[] =>
  [...listings].sort((a, b) =>
    order === "asc"
      ? a.pricePerNight - b.pricePerNight
      : b.pricePerNight - a.pricePerNight,
  );

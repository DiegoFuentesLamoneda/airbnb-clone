/**
 * Estructuras de datos principales de la aplicación.
 *
 * `Listing` es el alojamiento tal y como aparece en una tarjeta (Home y
 * Catálogo). `Room` lo extiende con todo lo que sólo hace falta en la vista de
 * detalle, para que las tarjetas no arrastren datos que no usan.
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

/** Alojamiento en su forma de tarjeta: lo mínimo que pinta `ListingCard`. */
export interface Listing {
  id: string;
  title: string;
  location: string;
  /** Precio en euros por noche. */
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  /** Id de la categoría a la que pertenece — ver `CATEGORIES` en lib/categories.ts */
  categoryId: string;
  /** Rango de fechas mostrado bajo el título, p. ej. "5-10 de mar". */
  availability: string;
  isGuestFavorite: boolean;
  coordinates: Coordinates;
  /** Fotos del alojamiento. La primera es la que sale en la tarjeta. */
  photos: Photo[];
}

/**
 * Una foto de un alojamiento.
 *
 * El degradado no es decorativo: se pinta debajo de la imagen y es lo que se ve
 * mientras el archivo carga, en vez de un rectángulo blanco. Son clases de
 * Tailwind (`from-* to-*`) y no colores sueltos, para no necesitar un `style`
 * en línea al pintarlas.
 */
export interface Photo {
  id: string;
  label: string;
  gradient: string;
  /**
   * Ruta del archivo en `/public`. Puede faltar: un hueco sin foto todavía se
   * queda con su degradado en lugar de romper la vista.
   */
  src?: string;
}

export interface Host {
  name: string;
  yearsHosting: number;
  isSuperhost: boolean;
  /** Iniciales que se pintan dentro del placeholder de avatar. */
  initials: string;
}

export interface Amenity {
  id: string;
  label: string;
  /** Clave del icono en `components/ui/AmenityIcon.tsx`. */
  icon: AmenityIconName;
}

export type AmenityIconName =
  | "wifi"
  | "kitchen"
  | "parking"
  | "pool"
  | "ac"
  | "tv"
  | "washer"
  | "workspace";

/** Alojamiento completo para la vista `/rooms/[id]`. */
export interface Room extends Listing {
  description: string;
  host: Host;
  amenities: Amenity[];
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

export interface Category {
  id: string;
  label: string;
  icon: CategoryIconName;
}

export type CategoryIconName =
  | "all"
  | "beach"
  | "mansion"
  | "trending"
  | "cabin"
  | "pool"
  | "city"
  | "countryside"
  | "lake";

/** Orden de resultados en el catálogo. */
export type SortOrder = "asc" | "desc";

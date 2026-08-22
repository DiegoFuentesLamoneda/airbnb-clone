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
  /** Placeholders de foto: cada entrada es un par de colores para el degradado. */
  photos: PhotoPlaceholder[];
}

/**
 * No usamos imágenes reales: cada "foto" es un degradado determinista más una
 * etiqueta descriptiva, suficiente para validar la arquitectura de componentes
 * sin depender de assets externos.
 */
export interface PhotoPlaceholder {
  id: string;
  label: string;
  from: string;
  to: string;
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

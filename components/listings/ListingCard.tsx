import Link from "next/link";
import type { Listing } from "@/types";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import StarRating from "@/components/ui/StarRating";

interface ListingCardProps {
  listing: Listing;
}

/**
 * La tarjeta de alojamiento. Se reutiliza tal cual en la portada y en el
 * catálogo: es el mismo componente, sólo cambia la cuadrícula que lo envuelve.
 *
 * El corazón es un `span` y no un `button` porque la tarjeta entera ya es un
 * enlace, y anidar un botón dentro de un enlace rompe la navegación por teclado.
 */
const ListingCard = ({ listing }: ListingCardProps) => (
  <Link href={`/rooms/${listing.id}`} className="group block">
    <div className="relative">
      <PhotoPlaceholder
        photo={listing.photos[0]}
        className="aspect-square w-full overflow-hidden rounded-xl transition group-hover:brightness-95"
      />

      {listing.isGuestFavorite && (
        <span className="absolute top-3 left-3 rounded-full bg-white px-2.5 py-1 text-xs font-semibold shadow-sm">
          Favorito de huéspedes
        </span>
      )}

      <span aria-hidden="true" className="absolute top-3 right-3">
        <svg
          viewBox="0 0 24 24"
          fill="rgba(0,0,0,0.45)"
          stroke="white"
          strokeWidth={2}
          className="h-6 w-6 transition group-hover:scale-110"
        >
          <path d="M12 20.5l-1.4-1.3C5.8 15 3 12.4 3 9.2 3 6.7 5 4.8 7.4 4.8c1.4 0 2.8.7 3.6 1.8.8-1.1 2.2-1.8 3.6-1.8C17 4.8 19 6.7 19 9.2c0 3.2-2.8 5.8-7.6 10z" />
        </svg>
      </span>
    </div>

    <div className="mt-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="truncate font-medium">{listing.title}</h3>
        <StarRating rating={listing.rating} className="shrink-0 text-sm" />
      </div>
      <p className="mt-0.5 truncate text-sm text-muted">{listing.location}</p>
      <p className="text-sm text-muted">{listing.availability}</p>
      <p className="mt-1.5 text-sm">
        <span className="font-semibold">{listing.pricePerNight} €</span> noche
      </p>
    </div>
  </Link>
);

export default ListingCard;

import Image from "next/image";
import type { Photo } from "@/types";

interface ListingPhotoProps {
  photo: Photo;
  /** Clases de tamaño y forma que aporta quien lo usa (tarjeta, galería...). */
  className?: string;
  /**
   * Anchura que ocupará la imagen en cada breakpoint. `next/image` la necesita
   * para no servir una foto de 1200px a una tarjeta de 350px.
   */
  sizes?: string;
  /** La galería rotula la foto; las tarjetas no. */
  showLabel?: boolean;
  /** Para la primera imagen visible, que suele ser la más grande de la página. */
  priority?: boolean;
}

/**
 * Una foto de alojamiento. El degradado va debajo y es lo que se ve mientras la
 * imagen carga; si el hueco no tiene archivo todavía, el degradado se queda
 * como está y la vista no se rompe.
 */
const ListingPhoto = ({
  photo,
  className = "",
  sizes = "100vw",
  showLabel = false,
  priority = false,
}: ListingPhotoProps) => (
  <div
    role={photo.src ? undefined : "img"}
    aria-label={photo.src ? undefined : photo.label}
    className={`relative overflow-hidden bg-linear-to-br ${photo.gradient} ${className}`}
  >
    {photo.src && (
      <Image
        src={photo.src}
        alt={photo.label}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    )}

    {showLabel && (
      <p className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-3 text-xs font-medium text-white">
        {photo.label}
      </p>
    )}
  </div>
);

export default ListingPhoto;

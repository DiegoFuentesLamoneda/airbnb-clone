import type { PhotoPlaceholder as Photo } from "@/types";

interface PhotoPlaceholderProps {
  photo: Photo;
  /** Clases de tamaño/forma que aporta quien lo usa (tarjeta, galería...). */
  className?: string;
  /** La galería rotula la foto; las tarjetas no. */
  showLabel?: boolean;
}

/**
 * El hueco de foto. No hay imágenes reales en el proyecto: cada foto es un
 * degradado determinista con su etiqueta como texto accesible.
 */
const PhotoPlaceholder = ({
  photo,
  className = "",
  showLabel = false,
}: PhotoPlaceholderProps) => (
  <div
    role="img"
    aria-label={photo.label}
    className={`bg-linear-to-br ${photo.gradient} flex items-end ${className}`}
  >
    {showLabel && (
      <p className="w-full bg-linear-to-t from-black/55 to-transparent p-3 text-xs font-medium text-white">
        {photo.label}
      </p>
    )}
  </div>
);

export default PhotoPlaceholder;

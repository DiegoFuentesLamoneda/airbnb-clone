"use client";

import { useState } from "react";
import type { PhotoPlaceholder as Photo } from "@/types";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";

interface RoomGalleryProps {
  photos: Photo[];
}

/** Flecha de navegación, girada 180º para la de "siguiente". */
const ARROW = "M15 5l-7 7 7 7";

/**
 * Galería de fotos con navegación. El índice visible es el estado; los botones
 * se desactivan en los extremos en lugar de dar la vuelta, para que se note
 * dónde empieza y acaba la galería.
 */
const RoomGallery = ({ photos }: RoomGalleryProps) => {
  const [index, setIndex] = useState(0);

  const isFirst = index === 0;
  const isLast = index === photos.length - 1;

  const buttonClass =
    "absolute top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/9] md:rounded-2xl">
      <PhotoPlaceholder
        photo={photos[index]}
        showLabel
        className="h-full w-full"
      />

      <button
        type="button"
        onClick={() => setIndex(index - 1)}
        disabled={isFirst}
        aria-label="Foto anterior"
        className={`${buttonClass} left-4`}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d={ARROW} />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => setIndex(index + 1)}
        disabled={isLast}
        aria-label="Foto siguiente"
        className={`${buttonClass} right-4`}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 rotate-180">
          <path d={ARROW} />
        </svg>
      </button>

      <span className="absolute right-4 bottom-4 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white">
        {index + 1} / {photos.length}
      </span>
    </div>
  );
};

export default RoomGallery;

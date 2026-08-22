interface StarRatingProps {
  rating: number;
  /** El detalle muestra "· 218 reseñas"; la tarjeta sólo la nota. */
  reviewsCount?: number;
  className?: string;
}

/** Estrella maciza + nota, con el recuento de reseñas opcional al lado. */
const StarRating = ({ rating, reviewsCount, className = "" }: StarRatingProps) => (
  <span className={`flex items-center gap-1 ${className}`}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0 fill-current"
    >
      <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.3l6.5-.9z" />
    </svg>
    <span>{rating.toFixed(2)}</span>
    {reviewsCount !== undefined && (
      <span className="text-muted">· {reviewsCount} reseñas</span>
    )}
  </span>
);

export default StarRating;

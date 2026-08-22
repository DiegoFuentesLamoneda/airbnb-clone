interface GuestCounterProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

/**
 * Contador de huéspedes acotado por la capacidad real del alojamiento: los
 * botones se desactivan al llegar al tope en vez de dejar pasar un número
 * imposible.
 */
const GuestCounter = ({ value, min, max, onChange }: GuestCounterProps) => {
  const buttonClass =
    "flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-lg leading-none transition hover:border-ink disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-hairline";

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold uppercase">Huéspedes</p>
        <p className="text-sm text-muted">Máximo {max}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(value - 1)}
          disabled={value <= min}
          aria-label="Quitar un huésped"
          className={buttonClass}
        >
          −
        </button>

        <span aria-live="polite" className="w-6 text-center text-sm font-medium">
          {value}
        </span>

        <button
          type="button"
          onClick={() => onChange(value + 1)}
          disabled={value >= max}
          aria-label="Añadir un huésped"
          className={buttonClass}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default GuestCounter;

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * El campo de búsqueda de la navbar. Es controlado a propósito: no guarda
 * estado propio, sólo notifica cada pulsación. Quien lo usa decide qué filtra.
 */
const SearchInput = ({
  value,
  onChange,
  placeholder = "Busca un destino",
}: SearchInputProps) => (
  <div className="relative w-full">
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-label="Busca un destino"
      className="w-full rounded-full border border-hairline py-3 pr-4 pl-11 text-sm shadow-sm transition focus:border-ink focus:outline-none"
    />
  </div>
);

export default SearchInput;

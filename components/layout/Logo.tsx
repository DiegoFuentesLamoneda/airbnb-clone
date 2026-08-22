import Link from "next/link";

/**
 * Marca de Airbnb: el símbolo siempre, el logotipo sólo a partir de md.
 * A 375px la captura muestra únicamente el símbolo, para dejar sitio al
 * buscador.
 */
const Logo = () => (
  <Link
    href="/"
    aria-label="Airbnb — ir a la portada"
    className="flex shrink-0 items-center gap-1.5 text-rausch"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 fill-current">
      <path d="M12 2c-1.3 0-2.2.8-3 2.4-.35.7-.8 1.6-1.35 2.8C5.95 10.6 5 12.9 4.5 14.4c-.35 1.1-.5 2-.5 2.8C4 20.1 6.1 22 8.9 22c1.3 0 2.4-.5 3.1-1.3.7.8 1.8 1.3 3.1 1.3 2.8 0 4.9-1.9 4.9-4.8 0-.8-.15-1.7-.5-2.8-.5-1.5-1.45-3.8-3.15-7.2-.55-1.2-1-2.1-1.35-2.8C14.2 2.8 13.3 2 12 2z" />
    </svg>
    <span className="hidden text-xl font-bold tracking-tight md:inline">
      airbnb
    </span>
  </Link>
);

export default Logo;

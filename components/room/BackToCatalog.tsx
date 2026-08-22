import Link from "next/link";

/**
 * Miga de pan de vuelta al catálogo. Usa `<Link>` y no `<a href>`: con `<a>`
 * el navegador recargaría la aplicación entera en lugar de navegar en cliente.
 */
const BackToCatalog = () => (
  <nav aria-label="Miga de pan" className="text-sm">
    <Link
      href="/catalog"
      className="inline-flex items-center gap-2 text-muted transition hover:text-ink"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M15 5l-7 7 7 7" />
      </svg>
      Volver al catálogo
    </Link>
  </nav>
);

export default BackToCatalog;

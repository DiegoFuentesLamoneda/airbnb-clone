import Link from "next/link";
import Logo from "@/components/layout/Logo";
import SearchInput from "@/components/layout/SearchInput";
import UserMenu from "@/components/layout/UserMenu";

interface NavbarProps {
  /**
   * Sólo la portada filtra en vivo. Cuando no llegan estas props, el buscador
   * se convierte en un enlace a la portada, que es donde se puede buscar.
   */
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

const Navbar = ({ searchValue, onSearchChange }: NavbarProps) => (
  <header className="sticky top-0 z-30 border-b border-hairline bg-white">
    <nav className="mx-auto flex max-w-[1600px] items-center gap-4 px-5 py-3 md:gap-8 md:px-10">
      <Logo />

      <div className="min-w-0 flex-1 md:max-w-md md:mx-auto">
        {onSearchChange ? (
          <SearchInput value={searchValue ?? ""} onChange={onSearchChange} />
        ) : (
          <Link
            href="/"
            className="flex items-center gap-3 rounded-full border border-hairline px-4 py-3 text-sm text-muted shadow-sm transition hover:shadow-md"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              className="h-4 w-4 text-ink"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            Empieza tu búsqueda
          </Link>
        )}
      </div>

      <UserMenu />
    </nav>
  </header>
);

export default Navbar;

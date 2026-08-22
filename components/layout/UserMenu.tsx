/**
 * Menú de usuario de la navbar: hamburguesa + avatar dentro de una píldora,
 * tal como aparece a la derecha en la captura de escritorio. Es decorativo —
 * el enunciado no pide sesión de usuario.
 */
const UserMenu = () => (
  <div className="flex shrink-0 items-center gap-2">
    <span className="hidden rounded-full px-4 py-2 text-sm font-medium transition hover:bg-neutral-100 lg:inline">
      Pon tu casa en Airbnb
    </span>
    <button
      type="button"
      aria-label="Menú de usuario"
      className="flex items-center gap-3 rounded-full border border-hairline py-1.5 pr-1.5 pl-3 transition hover:shadow-md"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        className="h-4 w-4"
      >
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-white">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
          <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-3.3 0-6 2-6 4.5V20h12v-1.5c0-2.5-2.7-4.5-6-4.5z" />
        </svg>
      </span>
    </button>
  </div>
);

export default UserMenu;

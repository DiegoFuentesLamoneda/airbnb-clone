import type { Host } from "@/types";

interface HostInfoProps {
  host: Host;
}

/**
 * Fila del anfitrión: avatar con iniciales, nombre y antigüedad. El avatar es
 * un placeholder porque en este proyecto no hay imágenes reales.
 */
const HostInfo = ({ host }: HostInfoProps) => (
  <section className="flex items-center gap-4 border-y border-hairline py-6">
    <span
      aria-hidden="true"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-lg font-semibold text-white"
    >
      {host.initials}
    </span>

    <div className="min-w-0">
      <p className="font-medium">Anfitrión: {host.name}</p>
      <p className="text-sm text-muted">
        {host.yearsHosting} años como anfitrión
        {host.isSuperhost && (
          <span className="ml-2 rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-ink">
            Superanfitrión
          </span>
        )}
      </p>
    </div>
  </section>
);

export default HostInfo;

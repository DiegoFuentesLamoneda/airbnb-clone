interface LoadingGridProps {
  /** Cuántos esqueletos pintar mientras llegan los datos. */
  count?: number;
}

/**
 * Indicador de carga de las cuadrículas: mismos huecos que tendrán las tarjetas
 * reales, para que la página no dé un salto cuando lleguen los datos.
 */
const LoadingGrid = ({ count = 8 }: LoadingGridProps) => (
  <div
    role="status"
    aria-label="Cargando alojamientos"
    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    {Array.from({ length: count }, (_, index) => (
      <div key={index} className="animate-pulse">
        <div className="aspect-square w-full rounded-xl bg-neutral-200" />
        <div className="mt-3 h-4 w-3/4 rounded bg-neutral-200" />
        <div className="mt-2 h-3 w-1/2 rounded bg-neutral-200" />
        <div className="mt-2 h-3 w-1/3 rounded bg-neutral-200" />
      </div>
    ))}
  </div>
);

export default LoadingGrid;

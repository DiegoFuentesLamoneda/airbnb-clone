/**
 * Indicador de carga de la vista de detalle: reproduce el hueco de la galería y
 * los bloques de texto para que la página no salte cuando lleguen los datos.
 */
const RoomSkeleton = () => (
  <div role="status" aria-label="Cargando alojamiento" className="animate-pulse">
    <div className="aspect-[4/3] w-full bg-neutral-200 md:aspect-[16/9] md:rounded-2xl" />

    <div className="mx-auto max-w-[1120px] px-5 py-6 md:px-10">
      <div className="h-7 w-2/3 rounded bg-neutral-200" />
      <div className="mt-3 h-4 w-1/2 rounded bg-neutral-200" />
      <div className="mt-8 h-4 w-full rounded bg-neutral-200" />
      <div className="mt-2 h-4 w-11/12 rounded bg-neutral-200" />
      <div className="mt-2 h-4 w-3/4 rounded bg-neutral-200" />
    </div>
  </div>
);

export default RoomSkeleton;

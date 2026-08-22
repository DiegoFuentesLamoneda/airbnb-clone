/**
 * Recuadro gris que ocupa el sitio del mapa: se ve mientras cargan los datos y
 * mientras llega el chunk de Leaflet. Es también el aspecto que tendría el
 * catálogo si nos quedáramos en el placeholder en vez del mapa real.
 */
const MapPlaceholder = () => (
  <div className="flex h-full w-full items-center justify-center rounded-xl bg-neutral-200 text-sm font-medium text-muted">
    Mapa
  </div>
);

export default MapPlaceholder;

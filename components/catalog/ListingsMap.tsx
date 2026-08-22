"use client";

import { divIcon } from "leaflet";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import type { Listing } from "@/types";
import FitBounds from "@/components/catalog/FitBounds";
import "leaflet/dist/leaflet.css";

interface ListingsMapProps {
  listings: Listing[];
}

/**
 * Pin de precio en burbuja blanca, copiado de la captura: Airbnb no usa la
 * chincheta por defecto de Leaflet, pinta el precio directamente sobre el mapa.
 * Se construye con `divIcon` porque Leaflet dibuja fuera del árbol de React.
 */
const priceIcon = (listing: Listing) =>
  divIcon({
    className: "",
    html: `<span class="inline-block rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-ink shadow-md ring-1 ring-black/10">${listing.pricePerNight} €</span>`,
    iconSize: [56, 26],
    iconAnchor: [28, 13],
  });

/**
 * Mapa del catálogo con un pin por alojamiento. Sólo se renderiza en cliente:
 * Leaflet necesita `window`, así que la página lo carga con `dynamic`.
 */
const ListingsMap = ({ listings }: ListingsMapProps) => (
  <MapContainer
    center={[40.2, -3.7]}
    zoom={5}
    scrollWheelZoom={false}
    className="h-full w-full"
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {listings.map((listing) => (
      <Marker
        key={listing.id}
        position={[listing.coordinates.lat, listing.coordinates.lng]}
        icon={priceIcon(listing)}
      >
        <Tooltip direction="top" offset={[0, -12]}>
          {listing.title} · {listing.location}
        </Tooltip>
      </Marker>
    ))}

    <FitBounds listings={listings} />
  </MapContainer>
);

export default ListingsMap;

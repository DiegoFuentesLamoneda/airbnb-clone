"use client";

import { useEffect } from "react";
import { latLngBounds } from "leaflet";
import { useMap } from "react-leaflet";
import type { Listing } from "@/types";

interface FitBoundsProps {
  listings: Listing[];
}

/**
 * Encuadra el mapa para que quepan todos los pines. Va aparte de `ListingsMap`
 * porque `useMap` sólo funciona dentro del `MapContainer`, así que necesita ser
 * un hijo y no puede vivir en el mismo componente.
 */
const FitBounds = ({ listings }: FitBoundsProps) => {
  const map = useMap();

  useEffect(() => {
    if (listings.length === 0) return;

    const bounds = latLngBounds(
      listings.map((listing) => [listing.coordinates.lat, listing.coordinates.lng]),
    );

    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 12 });
  }, [listings, map]);

  return null;
};

export default FitBounds;

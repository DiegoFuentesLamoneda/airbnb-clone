"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { Listing, SortOrder } from "@/types";
import { LISTINGS } from "@/lib/listings";
import { sortByPrice } from "@/lib/filters";
import Navbar from "@/components/layout/Navbar";
import ResultsHeader from "@/components/catalog/ResultsHeader";
import ListingGrid from "@/components/listings/ListingGrid";
import LoadingGrid from "@/components/ui/LoadingGrid";
import MapPlaceholder from "@/components/catalog/MapPlaceholder";

const FAKE_LATENCY = 800;

/**
 * Leaflet toca `window` nada más importarse, así que el mapa se carga sólo en
 * cliente. Mientras llega el chunk se ve el recuadro gris, que es también el
 * aspecto que tendría el placeholder si no hubiéramos puesto mapa real.
 */
const ListingsMap = dynamic(() => import("@/components/catalog/ListingsMap"), {
  ssr: false,
  loading: () => <MapPlaceholder />,
});

const CatalogPage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<SortOrder>("asc");

  useEffect(() => {
    const timer = setTimeout(() => {
      setListings(LISTINGS);
      setIsLoading(false);
    }, FAKE_LATENCY);

    return () => clearTimeout(timer);
  }, []);

  const sortedListings = useMemo(
    () => sortByPrice(listings, order),
    [listings, order],
  );

  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-[1600px] px-5 py-6 md:px-10 md:py-8">
        <div className="lg:flex lg:items-start lg:gap-8">
          <div className="lg:w-[62%]">
            <ResultsHeader
              count={sortedListings.length}
              order={order}
              onOrderChange={setOrder}
            />

            <div className="mt-6">
              {isLoading ? (
                <LoadingGrid count={6} />
              ) : (
                <ListingGrid
                  listings={sortedListings}
                  columnsClassName="sm:grid-cols-2"
                />
              )}
            </div>
          </div>

          {/* Debajo de las tarjetas en móvil, columna fija a la derecha en escritorio. */}
          <aside className="mt-8 lg:mt-0 lg:w-[38%]">
            {/*
              `isolate` es necesario, no decorativo: Leaflet pinta sus paneles
              en z-index 400 y, sin un contexto de apilado propio, el mapa
              taparía la navbar sticky al hacer scroll.
            */}
            <div className="isolate h-80 overflow-hidden rounded-xl lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
              {isLoading ? (
                <MapPlaceholder />
              ) : (
                <ListingsMap listings={sortedListings} />
              )}
            </div>
          </aside>
        </div>
      </main>
    </>
  );
};

export default CatalogPage;

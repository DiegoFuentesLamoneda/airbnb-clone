"use client";

import { useEffect, useMemo, useState } from "react";
import type { Listing } from "@/types";
import { LISTINGS } from "@/lib/listings";
import { CATEGORIES } from "@/lib/categories";
import { filterListings } from "@/lib/filters";
import Navbar from "@/components/layout/Navbar";
import CategoryFilters from "@/components/home/CategoryFilters";
import ListingGrid from "@/components/listings/ListingGrid";
import LoadingGrid from "@/components/ui/LoadingGrid";
import Link from "next/link";

/** Retardo simulado de red, en milisegundos. */
const FAKE_LATENCY = 1000;

const HomePage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Simula la carga de datos al montar: lista vacía -> cargando -> datos.
  useEffect(() => {
    const timer = setTimeout(() => {
      setListings(LISTINGS);
      setIsLoading(false);
    }, FAKE_LATENCY);

    return () => clearTimeout(timer);
  }, []);

  // Los dos filtros son locales y se recalculan en cada pulsación de tecla.
  const visibleListings = useMemo(
    () => filterListings(listings, { query, categoryId: activeCategory }),
    [listings, query, activeCategory],
  );

  return (
    <>
      <Navbar searchValue={query} onSearchChange={setQuery} />
      <CategoryFilters
        categories={CATEGORIES}
        activeId={activeCategory}
        onSelect={setActiveCategory}
      />

      <main className="mx-auto w-full max-w-[1600px] px-5 py-6 md:px-10 md:py-8">
        {isLoading ? (
          <LoadingGrid />
        ) : (
          <>
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <h1 className="text-xl font-semibold">
                Alojamientos que te pueden gustar
              </h1>
              <Link
                href="/catalog"
                className="shrink-0 text-sm font-medium underline underline-offset-2"
              >
                Ver catálogo
              </Link>
            </div>
            <ListingGrid listings={visibleListings} />
          </>
        )}
      </main>
    </>
  );
};

export default HomePage;

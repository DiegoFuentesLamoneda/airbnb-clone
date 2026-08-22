"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Room } from "@/types";
import { getRoomById } from "@/lib/rooms";
import Navbar from "@/components/layout/Navbar";
import BackToCatalog from "@/components/room/BackToCatalog";
import RoomGallery from "@/components/room/RoomGallery";
import RoomHeader from "@/components/room/RoomHeader";
import HostInfo from "@/components/room/HostInfo";
import RoomDescription from "@/components/room/RoomDescription";
import AmenitiesGrid from "@/components/room/AmenitiesGrid";
import BookingCard from "@/components/room/BookingCard";
import RoomSkeleton from "@/components/room/RoomSkeleton";
import RoomNotFound from "@/components/room/RoomNotFound";

const FAKE_LATENCY = 800;

const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<Room | undefined>(undefined);
  const [loadedId, setLoadedId] = useState<string | null>(null);

  // Carga el alojamiento a partir del id de la URL, con latencia simulada.
  useEffect(() => {
    const timer = setTimeout(() => {
      setRoom(getRoomById(id));
      setLoadedId(id);
    }, FAKE_LATENCY);

    return () => clearTimeout(timer);
  }, [id]);

  /*
   * La carga se deriva del id ya cargado en vez de guardarse aparte. Saltar de
   * un alojamiento a otro no desmonta esta página —cambia el parámetro y ya—,
   * así que un `isLoading` propio se quedaría en `false` y enseñaría los datos
   * del alojamiento anterior mientras llega el nuevo.
   */
  const isLoading = loadedId !== id;

  if (isLoading) {
    return (
      <>
        <Navbar />
        <RoomSkeleton />
      </>
    );
  }

  if (!room) {
    return (
      <>
        <Navbar />
        <RoomNotFound id={id} />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-[1120px] pb-12 md:px-10 md:pt-6">
        <RoomGallery photos={room.photos} />

        <div className="px-5 md:px-0">
          <div className="py-4">
            <BackToCatalog />
          </div>

          <div className="lg:flex lg:items-start lg:gap-12">
            <div className="lg:flex-1">
              <RoomHeader room={room} />
              <HostInfo host={room.host} />
              <RoomDescription description={room.description} />
              <AmenitiesGrid amenities={room.amenities} />
            </div>

            <aside className="mt-8 lg:mt-0 lg:w-[372px] lg:shrink-0">
              <div className="lg:sticky lg:top-28">
                <BookingCard room={room} />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default RoomPage;

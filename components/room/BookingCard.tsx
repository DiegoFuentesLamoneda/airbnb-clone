"use client";

import { useState } from "react";
import type { Room } from "@/types";
import StarRating from "@/components/ui/StarRating";
import GuestCounter from "@/components/room/GuestCounter";

interface BookingCardProps {
  room: Room;
}

/**
 * Tarjeta de reserva: precio por noche y contador de huéspedes. En el flujo de
 * la página a 375px; columna derecha fija a partir de lg, como en Airbnb.
 */
const BookingCard = ({ room }: BookingCardProps) => {
  const [guests, setGuests] = useState(1);

  return (
    <div className="rounded-2xl border border-hairline p-6 shadow-lg">
      <div className="flex items-baseline justify-between gap-3">
        <p>
          <span className="text-xl font-semibold">{room.pricePerNight} €</span>
          <span className="text-sm text-muted"> noche</span>
        </p>
        <StarRating
          rating={room.rating}
          reviewsCount={room.reviewsCount}
          className="text-sm"
        />
      </div>

      <div className="mt-5 rounded-xl border border-hairline p-4">
        <GuestCounter
          value={guests}
          min={1}
          max={room.maxGuests}
          onChange={setGuests}
        />
      </div>

      <button
        type="button"
        className="mt-5 w-full rounded-lg bg-rausch py-3 font-semibold text-white transition hover:bg-rausch-dark"
      >
        Reservar
      </button>

      <p className="mt-4 text-center text-sm text-muted">
        No se te cobrará nada por ahora
      </p>
    </div>
  );
};

export default BookingCard;

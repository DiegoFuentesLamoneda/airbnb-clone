import type { Room } from "@/types";
import StarRating from "@/components/ui/StarRating";

interface RoomHeaderProps {
  room: Room;
}

/**
 * Título, valoración, ubicación y capacidad. Alineado a la izquierda: la
 * captura lo centra porque el alojamiento capturado es un hotel, pero un
 * alojamiento normal de Airbnb va alineado a la izquierda.
 */
const RoomHeader = ({ room }: RoomHeaderProps) => {
  const capacity = [
    `${room.maxGuests} huéspedes`,
    `${room.bedrooms} dormitorios`,
    `${room.beds} camas`,
    `${room.bathrooms} ${room.bathrooms === 1 ? "baño" : "baños"}`,
  ];

  return (
    <header>
      <h1 className="text-2xl leading-tight font-semibold md:text-3xl">
        {room.title}
      </h1>

      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <StarRating rating={room.rating} reviewsCount={room.reviewsCount} />
        <span className="text-muted">·</span>
        <span className="text-muted underline underline-offset-2">
          {room.location}
        </span>
      </div>

      <p className="mt-3 text-sm text-muted">{capacity.join(" · ")}</p>
    </header>
  );
};

export default RoomHeader;

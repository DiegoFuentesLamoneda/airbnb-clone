import type { Amenity, AmenityIconName, Host, Room } from "@/types";
import { LISTINGS } from "@/lib/listings";

/** Catálogo de servicios reutilizable: cada alojamiento referencia sus claves. */
const AMENITIES: Record<AmenityIconName, Amenity> = {
  wifi: { id: "wifi", label: "Wifi de alta velocidad", icon: "wifi" },
  kitchen: { id: "kitchen", label: "Cocina equipada", icon: "kitchen" },
  parking: { id: "parking", label: "Aparcamiento gratuito", icon: "parking" },
  pool: { id: "pool", label: "Piscina privada", icon: "pool" },
  ac: { id: "ac", label: "Aire acondicionado", icon: "ac" },
  tv: { id: "tv", label: 'TV de 55" con Netflix', icon: "tv" },
  washer: { id: "washer", label: "Lavadora", icon: "washer" },
  workspace: { id: "workspace", label: "Zona de trabajo", icon: "workspace" },
};

/**
 * Lo que añade la vista de detalle sobre los datos de tarjeta. Los servicios se
 * guardan como claves y se resuelven al construir `ROOMS`.
 */
interface RoomDetail {
  description: string;
  host: Host;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenityKeys: AmenityIconName[];
}

/** `capacity` es [huéspedes, dormitorios, camas, baños]. */
const detail = (
  description: string,
  host: Host,
  capacity: [number, number, number, number],
  amenityKeys: AmenityIconName[],
): RoomDetail => ({
  description,
  host,
  maxGuests: capacity[0],
  bedrooms: capacity[1],
  beds: capacity[2],
  bathrooms: capacity[3],
  amenityKeys,
});

const ROOM_DETAILS: Record<string, RoomDetail> = {
  "casa-acantilado-nerja": detail(
    "Casa colgada sobre el acantilado con acceso privado a una cala. Los ventanales del salón abren de par en par a una terraza donde se desayuna viendo el mar. A diez minutos andando del centro de Nerja.",
    { name: "Lucía", yearsHosting: 7, isSuperhost: true, initials: "L" },
    [6, 3, 4, 2],
    ["wifi", "kitchen", "parking", "ac", "tv", "washer"],
  ),
  "villa-miramar-marbella": detail(
    "Villa de 400 m² en la Milla de Oro, con piscina infinita orientada al sur y jardín mediterráneo. Pensada para grupos grandes que quieren playa sin renunciar al espacio.",
    { name: "Andrés", yearsHosting: 4, isSuperhost: false, initials: "A" },
    [10, 5, 6, 4],
    ["wifi", "kitchen", "parking", "pool", "ac", "tv", "washer", "workspace"],
  ),
  "atico-vistas-madrid": detail(
    "Ático reformado en un séptimo con ascensor, a dos calles de Gran Vía. El balcón corrido da a los tejados del centro y el metro queda a 200 metros.",
    { name: "Marta", yearsHosting: 5, isSuperhost: true, initials: "M" },
    [4, 2, 2, 1],
    ["wifi", "kitchen", "ac", "tv", "washer", "workspace"],
  ),
  "cabana-pinos-cercedilla": detail(
    "Cabaña de madera en plena sierra de Guadarrama, rodeada de pinos y sin vecinos a la vista. Chimenea encendida en invierno y rutas de senderismo desde la puerta.",
    { name: "Javier", yearsHosting: 9, isSuperhost: true, initials: "J" },
    [4, 2, 3, 1],
    ["wifi", "kitchen", "parking", "washer"],
  ),
  "cortijo-olivar-ronda": detail(
    "Cortijo andaluz restaurado en un olivar en activo, a quince minutos de Ronda. Patio encalado, vigas originales y silencio absoluto por la noche.",
    { name: "Carmen", yearsHosting: 12, isSuperhost: true, initials: "C" },
    [8, 4, 5, 3],
    ["wifi", "kitchen", "parking", "pool", "ac", "washer"],
  ),
  "loft-born-barcelona": detail(
    "Loft de ladrillo visto en el Born, en un edificio industrial rehabilitado. Techos de cuatro metros, dormitorio en altillo y el Picasso a cinco minutos andando.",
    { name: "Pau", yearsHosting: 3, isSuperhost: false, initials: "P" },
    [3, 1, 2, 1],
    ["wifi", "kitchen", "ac", "tv", "washer", "workspace"],
  ),
  "casa-lagar-mijas": detail(
    "Antiguo lagar convertido en casa de campo, con piscina privada y porche cubierto. La costa queda a veinte minutos en coche y el pueblo de Mijas a diez.",
    { name: "Rocío", yearsHosting: 6, isSuperhost: true, initials: "R" },
    [7, 4, 5, 3],
    ["wifi", "kitchen", "parking", "pool", "ac", "tv", "washer"],
  ),
  "refugio-lago-sanabria": detail(
    "Refugio de piedra a cincuenta metros de la orilla del lago de Sanabria, con embarcadero propio. Estufa de leña, cero cobertura móvil y muchas estrellas.",
    { name: "Alberto", yearsHosting: 8, isSuperhost: true, initials: "A" },
    [4, 2, 3, 1],
    ["kitchen", "parking", "washer"],
  ),
  "apartamento-triana-sevilla": detail(
    "Apartamento con balcón sobre el Guadalquivir, en pleno Triana. Suelos hidráulicos originales, azulejos sevillanos y el mercado justo debajo.",
    { name: "Inma", yearsHosting: 5, isSuperhost: false, initials: "I" },
    [4, 2, 2, 1],
    ["wifi", "kitchen", "ac", "tv", "washer"],
  ),
  "casa-piedra-cudillero": detail(
    "Casa de piedra asturiana frente al puerto pesquero, con vistas al anfiteatro de casas de colores. Cocina de leña y sidrería a treinta metros.",
    { name: "Nuria", yearsHosting: 10, isSuperhost: true, initials: "N" },
    [5, 3, 4, 2],
    ["wifi", "kitchen", "parking", "washer", "tv"],
  ),
  "villa-sa-punta-ibiza": detail(
    "Villa blanca sobre un acantilado del norte de Ibiza, con piscina orientada al atardecer y zona chill out exterior. Cala privada bajando por un sendero de piedra.",
    { name: "Tomeu", yearsHosting: 6, isSuperhost: true, initials: "T" },
    [12, 6, 8, 5],
    ["wifi", "kitchen", "parking", "pool", "ac", "tv", "washer", "workspace"],
  ),
  "estudio-playa-gran-canaria": detail(
    "Estudio compacto y luminoso a dos minutos andando de las dunas de Maspalomas. Todo lo justo y necesario para quien va a pasar el día fuera.",
    { name: "Dani", yearsHosting: 2, isSuperhost: false, initials: "D" },
    [2, 1, 1, 1],
    ["wifi", "kitchen", "ac", "tv"],
  ),
};

/** Alojamientos completos: tarjeta + detalle, resueltos los servicios. */
export const ROOMS: Room[] = LISTINGS.map((listing) => {
  const { amenityKeys, ...rest } = ROOM_DETAILS[listing.id];
  return {
    ...listing,
    ...rest,
    amenities: amenityKeys.map((key) => AMENITIES[key]),
  };
});

/** Busca un alojamiento por el `id` que llega en la URL. */
export const getRoomById = (id: string): Room | undefined =>
  ROOMS.find((room) => room.id === id);

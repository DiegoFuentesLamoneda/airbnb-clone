import type { Listing, Photo } from "@/types";

/**
 * Construye las fotos de un alojamiento. Cada entrada es
 * [etiqueta, clases de degradado] y, opcionalmente, `false` para marcar un
 * hueco que todavia no tiene archivo de imagen.
 *
 * `src` se deriva del id en vez de escribirse a mano: el script de descarga
 * nombra los archivos con ese mismo patron, asi que no pueden desincronizarse.
 */
const photos = (
  id: string,
  entries: [string, string, boolean?][],
): Photo[] =>
  entries.map(([label, gradient, hasFile = true], index) => {
    const photoId = `${id}-${index + 1}`;
    return {
      id: photoId,
      label,
      gradient,
      src: hasFile ? `/photos/${photoId}.jpg` : undefined,
    };
  });

/**
 * Datos simulados. En un proyecto real esto llegaría de una API; aquí se sirve
 * desde memoria y las páginas fingen la latencia con `setTimeout`.
 */
export const LISTINGS: Listing[] = [
  {
    id: "casa-acantilado-nerja",
    title: "Casa del Acantilado",
    location: "Nerja, Málaga",
    pricePerNight: 142,
    rating: 4.92,
    reviewsCount: 218,
    categoryId: "beach",
    availability: "5-10 de mar",
    isGuestFavorite: true,
    coordinates: { lat: 36.7452, lng: -3.8748 },
    photos: photos("casa-acantilado-nerja", [
      ["Vista al mar desde la terraza", "from-sky-500 to-slate-900"],
      ["Salón con ventanales", "from-slate-50 to-slate-400"],
      ["Dormitorio principal", "from-amber-100 to-amber-600"],
      ["Terraza al atardecer", "from-rose-400 to-orange-900"],
      ["Cocina abierta", "from-slate-200 to-slate-600"],
    ]),
  },
  {
    id: "villa-miramar-marbella",
    title: "Villa Miramar",
    location: "Marbella, Málaga",
    pricePerNight: 480,
    rating: 4.85,
    reviewsCount: 96,
    categoryId: "mansion",
    availability: "12-18 de mar",
    isGuestFavorite: false,
    coordinates: { lat: 36.5099, lng: -4.8863 },
    photos: photos("villa-miramar-marbella", [
      ["Fachada de la villa", "from-amber-200 to-amber-700"],
      ["Piscina infinita", "from-sky-400 to-sky-900"],
      ["Salón de doble altura", "from-slate-100 to-slate-500"],
      ["Jardín mediterráneo", "from-green-400 to-green-900"],
    ]),
  },
  {
    id: "atico-vistas-madrid",
    title: "Ático con vistas a Gran Vía",
    location: "Madrid",
    pricePerNight: 118,
    rating: 4.78,
    reviewsCount: 341,
    categoryId: "city",
    availability: "2-7 de mar",
    isGuestFavorite: true,
    coordinates: { lat: 40.4203, lng: -3.7058 },
    photos: photos("atico-vistas-madrid", [
      ["Skyline desde el balcón", "from-orange-500 to-orange-950"],
      ["Salón con sofá gris", "from-gray-200 to-gray-600"],
      ["Dormitorio luminoso", "from-yellow-100 to-yellow-700"],
      ["Baño reformado", "from-slate-300 to-slate-700"],
    ]),
  },
  {
    id: "cabana-pinos-cercedilla",
    title: "Cabaña de los Pinos",
    location: "Cercedilla, Madrid",
    pricePerNight: 96,
    rating: 4.95,
    reviewsCount: 127,
    categoryId: "cabin",
    availability: "20-25 de mar",
    isGuestFavorite: true,
    coordinates: { lat: 40.7411, lng: -4.0553 },
    photos: photos("cabana-pinos-cercedilla", [
      ["Cabaña entre pinos", "from-green-600 to-green-950"],
      ["Chimenea encendida", "from-amber-500 to-orange-900"],
      ["Dormitorio abuhardillado", "from-amber-100 to-amber-800"],
      ["Porche de madera", "from-neutral-400 to-zinc-700"],
    ]),
  },
  {
    id: "cortijo-olivar-ronda",
    title: "Cortijo El Olivar",
    location: "Ronda, Málaga",
    pricePerNight: 165,
    rating: 4.88,
    reviewsCount: 74,
    categoryId: "countryside",
    availability: "8-14 de mar",
    isGuestFavorite: false,
    coordinates: { lat: 36.7413, lng: -5.1663 },
    photos: photos("cortijo-olivar-ronda", [
      ["Olivar al amanecer", "from-lime-500 to-lime-900"],
      ["Patio encalado", "from-stone-50 to-stone-500"],
      ["Salón con vigas", "from-orange-200 to-orange-900"],
      ["Vistas al tajo", "from-blue-400 to-blue-900"],
    ]),
  },
  {
    id: "loft-born-barcelona",
    title: "Loft del Born",
    location: "Barcelona",
    pricePerNight: 210,
    rating: 4.81,
    reviewsCount: 452,
    categoryId: "trending",
    availability: "1-6 de mar",
    isGuestFavorite: true,
    coordinates: { lat: 41.3851, lng: 2.1834 },
    photos: photos("loft-born-barcelona", [
      ["Loft de ladrillo visto", "from-amber-600 to-amber-950"],
      ["Cocina industrial", "from-zinc-200 to-zinc-700"],
      ["Dormitorio en altillo", "from-rose-200 to-rose-900"],
      ["Calle del Born", "from-amber-400 to-amber-900"],
    ]),
  },
  {
    id: "casa-lagar-mijas",
    title: "Casa Lagar con piscina privada",
    location: "Mijas, Málaga",
    pricePerNight: 275,
    rating: 4.9,
    reviewsCount: 158,
    categoryId: "pool",
    availability: "15-21 de mar",
    isGuestFavorite: true,
    coordinates: { lat: 36.5959, lng: -4.6374 },
    photos: photos("casa-lagar-mijas", [
      ["Piscina privada", "from-cyan-400 to-cyan-800"],
      ["Porche con hamacas", "from-amber-200 to-amber-700"],
      ["Salón abierto al jardín", "from-stone-100 to-stone-600"],
      ["Dormitorio con terraza", "from-sky-100 to-sky-700"],
    ]),
  },
  {
    id: "refugio-lago-sanabria",
    title: "Refugio junto al lago",
    location: "Sanabria, Zamora",
    pricePerNight: 88,
    rating: 4.97,
    reviewsCount: 63,
    categoryId: "lake",
    availability: "22-27 de mar",
    isGuestFavorite: true,
    coordinates: { lat: 42.1194, lng: -6.7042 },
    photos: photos("refugio-lago-sanabria", [
      ["Lago al amanecer", "from-sky-400 to-slate-900"],
      ["Embarcadero de madera", "from-stone-400 to-stone-800"],
      ["Salón con estufa", "from-amber-400 to-amber-900"],
      ["Bosque de robles", "from-green-400 to-green-900"],
    ]),
  },
  {
    id: "apartamento-triana-sevilla",
    title: "Apartamento en Triana",
    location: "Sevilla",
    pricePerNight: 105,
    rating: 4.83,
    reviewsCount: 289,
    categoryId: "trending",
    availability: "3-9 de mar",
    isGuestFavorite: false,
    coordinates: { lat: 37.3833, lng: -6.0025 },
    photos: photos("apartamento-triana-sevilla", [
      ["Balcón sobre el Guadalquivir", "from-orange-400 to-orange-900"],
      // Pendiente: la cuota de Unsplash corto antes de resolver esta.
      ["Salón con azulejos", "from-sky-200 to-sky-800", false],
      ["Dormitorio blanco", "from-neutral-50 to-zinc-500"],
      ["Puente de Triana", "from-yellow-400 to-yellow-900"],
    ]),
  },
  {
    id: "casa-piedra-cudillero",
    title: "Casa de piedra frente al puerto",
    location: "Cudillero, Asturias",
    pricePerNight: 132,
    rating: 4.91,
    reviewsCount: 112,
    categoryId: "countryside",
    availability: "10-15 de mar",
    isGuestFavorite: false,
    coordinates: { lat: 43.5622, lng: -6.1447 },
    photos: photos("casa-piedra-cudillero", [
      ["Puerto de Cudillero", "from-sky-400 to-cyan-900"],
      ["Muros de piedra", "from-stone-300 to-stone-700"],
      ["Cocina con leña", "from-orange-200 to-orange-900"],
      ["Acantilados verdes", "from-green-500 to-green-900"],
    ]),
  },
  {
    id: "villa-sa-punta-ibiza",
    title: "Villa Sa Punta",
    location: "Ibiza, Baleares",
    pricePerNight: 620,
    rating: 4.87,
    reviewsCount: 88,
    categoryId: "mansion",
    availability: "18-24 de mar",
    isGuestFavorite: false,
    coordinates: { lat: 38.9067, lng: 1.4206 },
    photos: photos("villa-sa-punta-ibiza", [
      // Pendiente: la cuota de Unsplash corto antes de resolver esta.
      ["Villa blanca sobre el mar", "from-slate-50 to-sky-500", false],
      ["Piscina al atardecer", "from-pink-400 to-fuchsia-900"],
      ["Chill out exterior", "from-orange-300 to-orange-900"],
      ["Suite principal", "from-slate-200 to-slate-600"],
    ]),
  },
  {
    id: "estudio-playa-gran-canaria",
    title: "Estudio a 2 min de la playa",
    location: "Maspalomas, Gran Canaria",
    pricePerNight: 74,
    rating: 4.69,
    reviewsCount: 503,
    categoryId: "beach",
    availability: "6-11 de mar",
    isGuestFavorite: false,
    coordinates: { lat: 27.7606, lng: -15.586 },
    photos: photos("estudio-playa-gran-canaria", [
      ["Dunas de Maspalomas", "from-amber-300 to-amber-800"],
      ["Estudio compacto", "from-zinc-100 to-zinc-600"],
      ["Terraza con vistas", "from-sky-300 to-sky-900"],
      ["Paseo marítimo", "from-rose-400 to-rose-900"],
    ]),
  },
];

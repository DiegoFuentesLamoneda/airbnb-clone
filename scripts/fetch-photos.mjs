/**
 * Descarga una foto de Unsplash por cada hueco de foto del catálogo y las deja
 * en `public/photos/`. Se ejecuta a mano y una sola vez:
 *
 *   node scripts/fetch-photos.mjs
 *
 * Necesita `UNSPLASH_ACCESS_KEY` en `.env.local` (que git ignora).
 *
 * Las apps en modo demo de Unsplash tienen un límite de 50 peticiones por hora
 * y aquí hay 49 búsquedas, así que va justo. Por eso guarda una caché en
 * `scripts/.photo-cache.json`: si el límite corta a mitad, se relanza dentro de
 * una hora y sólo pide lo que falta.
 */

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PHOTOS_DIR = path.join(ROOT, "public", "photos");
const CACHE_FILE = path.join(ROOT, "scripts", ".photo-cache.json");

/**
 * Una búsqueda por hueco de foto, para que la imagen se corresponda con su
 * etiqueta. La clave es el id de la foto en `lib/listings.ts`.
 */
const QUERIES = {
  "casa-acantilado-nerja-1": "sea view terrace mediterranean house",
  "casa-acantilado-nerja-2": "living room sofa big window sea view",
  "casa-acantilado-nerja-3": "bedroom white linen coastal",
  "casa-acantilado-nerja-4": "terrace sunset sea",
  "casa-acantilado-nerja-5": "open kitchen modern white",

  "villa-miramar-marbella-1": "luxury villa exterior mediterranean",
  "villa-miramar-marbella-2": "infinity pool luxury villa",
  "villa-miramar-marbella-3": "double height living room luxury",
  "villa-miramar-marbella-4": "mediterranean garden palm trees",

  "atico-vistas-madrid-1": "madrid rooftop city skyline",
  "atico-vistas-madrid-2": "grey sofa living room apartment",
  "atico-vistas-madrid-3": "bright bedroom apartment morning",
  "atico-vistas-madrid-4": "modern bathroom tiles",

  "cabana-pinos-cercedilla-1": "wooden cabin pine forest",
  "cabana-pinos-cercedilla-2": "fireplace cozy cabin interior",
  "cabana-pinos-cercedilla-3": "attic bedroom wooden roof",
  "cabana-pinos-cercedilla-4": "wooden porch cabin",

  "cortijo-olivar-ronda-1": "olive grove sunrise andalusia",
  "cortijo-olivar-ronda-2": "andalusian whitewashed courtyard",
  "cortijo-olivar-ronda-3": "rustic living room wooden beams",
  "cortijo-olivar-ronda-4": "ronda spain gorge view",

  "loft-born-barcelona-1": "brick loft interior",
  "loft-born-barcelona-2": "industrial kitchen loft",
  "loft-born-barcelona-3": "loft bedroom wooden beams apartment",
  "loft-born-barcelona-4": "barcelona old town street",

  "casa-lagar-mijas-1": "private pool villa spain",
  "casa-lagar-mijas-2": "hammock terrace garden house summer",
  "casa-lagar-mijas-3": "living room open to garden",
  "casa-lagar-mijas-4": "bedroom with terrace view",

  "refugio-lago-sanabria-1": "lake sunrise mist mountains",
  "refugio-lago-sanabria-2": "wooden pier lake",
  "refugio-lago-sanabria-3": "wood stove cabin interior",
  "refugio-lago-sanabria-4": "oak forest green",

  "apartamento-triana-sevilla-1": "seville river balcony",
  "apartamento-triana-sevilla-2": "colourful ceramic tiles wall andalusia",
  "apartamento-triana-sevilla-3": "bedroom bed white pillows sunlight",
  "apartamento-triana-sevilla-4": "triana bridge seville",

  "casa-piedra-cudillero-1": "asturias fishing village harbour",
  "casa-piedra-cudillero-2": "stone wall house interior",
  "casa-piedra-cudillero-3": "rustic kitchen wood",
  "casa-piedra-cudillero-4": "green cliffs atlantic coast",

  "villa-sa-punta-ibiza-1": "white mediterranean house cliff sea",
  "villa-sa-punta-ibiza-2": "swimming pool sunset villa",
  "villa-sa-punta-ibiza-3": "outdoor lounge terrace summer",
  "villa-sa-punta-ibiza-4": "master suite luxury bedroom",

  "estudio-playa-gran-canaria-1": "maspalomas dunes gran canaria",
  "estudio-playa-gran-canaria-2": "small studio apartment interior",
  "estudio-playa-gran-canaria-3": "balcony chairs ocean view sunny",
  "estudio-playa-gran-canaria-4": "seaside promenade sunset",
};

/**
 * Huecos cuya primera foto no servia: la busqueda pedia un concepto y Unsplash
 * devolvio la interpretacion artistica en vez del objeto. Al arrancar se borran
 * su entrada de cache y su archivo, para que se vuelvan a resolver con la
 * busqueda corregida de arriba.
 */
const REDO = [
  "apartamento-triana-sevilla-3",
  "casa-acantilado-nerja-2",
  "casa-lagar-mijas-2",
  "estudio-playa-gran-canaria-3",
];

const readKey = async () => {
  const env = await fs.readFile(path.join(ROOT, ".env.local"), "utf8");
  const match = env.match(/^UNSPLASH_ACCESS_KEY\s*=\s*(.+)$/m);
  if (!match) throw new Error("Falta UNSPLASH_ACCESS_KEY en .env.local");
  return match[1].trim();
};

const readCache = async () => {
  try {
    return JSON.parse(await fs.readFile(CACHE_FILE, "utf8"));
  } catch {
    return {};
  }
};

/** Busca en Unsplash y devuelve el primer resultado que no se haya usado ya. */
const search = async (key, query, usedIds) => {
  const url =
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}` +
    `&per_page=8&orientation=landscape&content_filter=high`;

  const res = await fetch(url, { headers: { Authorization: `Client-ID ${key}` } });

  if (res.status === 403) throw new Error("RATE_LIMIT");
  if (!res.ok) throw new Error(`Unsplash respondió ${res.status}`);

  const { results } = await res.json();
  const pick = results.find((r) => !usedIds.has(r.id));
  if (!pick) throw new Error(`Sin resultados nuevos para "${query}"`);

  return {
    id: pick.id,
    // `raw` permite pedir el tamaño exacto y ahorra ancho de banda.
    src: `${pick.urls.raw}&w=1200&q=75&fm=jpg&fit=crop`,
    author: pick.user.name,
    authorUrl: pick.user.links.html,
    pageUrl: pick.links.html,
  };
};

const main = async () => {
  const key = await readKey();
  const cache = await readCache();
  await fs.mkdir(PHOTOS_DIR, { recursive: true });

  for (const photoId of REDO) {
    if (!cache[photoId]) continue;
    delete cache[photoId];
    await fs.rm(path.join(PHOTOS_DIR, `${photoId}.jpg`), { force: true });
    console.log(`rehacer  ${photoId}`);
  }

  const entries = Object.entries(QUERIES);
  const usedIds = new Set(Object.values(cache).map((p) => p.id));
  let searched = 0;

  for (const [photoId, query] of entries) {
    if (cache[photoId]) continue;

    try {
      cache[photoId] = await search(key, query, usedIds);
      usedIds.add(cache[photoId].id);
      searched += 1;
      await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2));
      console.log(`buscado  ${photoId}`);
    } catch (error) {
      if (error.message === "RATE_LIMIT") {
        console.log(
          `\nLímite de Unsplash alcanzado tras ${searched} búsquedas.` +
            `\nVuelve a lanzar esto dentro de una hora: la caché conserva lo hecho.`,
        );
        break;
      }
      console.log(`FALLO    ${photoId}: ${error.message}`);
    }
  }

  // Las descargas van a images.unsplash.com y no gastan cuota de la API.
  let downloaded = 0;
  for (const [photoId, photo] of Object.entries(cache)) {
    const file = path.join(PHOTOS_DIR, `${photoId}.jpg`);
    try {
      await fs.access(file);
      continue;
    } catch {
      // no está descargada todavía
    }

    const res = await fetch(photo.src);
    if (!res.ok) {
      console.log(`FALLO    descarga ${photoId}: ${res.status}`);
      continue;
    }

    await fs.writeFile(file, Buffer.from(await res.arrayBuffer()));
    downloaded += 1;
    console.log(`bajado   ${photoId}.jpg`);
  }

  // Unsplash pide atribuir autor y enlazar a la foto original.
  const credits = [
    "# Créditos de las fotos",
    "",
    "Todas las fotos vienen de [Unsplash](https://unsplash.com) y se usan bajo",
    "su licencia. Descargadas con `scripts/fetch-photos.mjs`.",
    "",
    "| Archivo | Autor | Original |",
    "|---|---|---|",
    ...Object.entries(cache).map(
      ([id, p]) =>
        `| \`${id}.jpg\` | [${p.author}](${p.authorUrl}) | [Unsplash](${p.pageUrl}) |`,
    ),
    "",
  ].join("\n");

  await fs.writeFile(path.join(PHOTOS_DIR, "CREDITS.md"), credits);

  const total = Object.keys(cache).length;
  console.log(
    `\n${total}/${entries.length} fotos resueltas · ${downloaded} descargadas ahora`,
  );
};

main();

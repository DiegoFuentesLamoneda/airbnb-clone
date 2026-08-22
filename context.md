# context.md — Clon de la interfaz de Airbnb

Mini-brief del proyecto: qué se construye, para quién, y de qué piezas se
compone. Escrito antes de tocar código y actualizado a medida que las capturas
de referencia se convierten en especificaciones de componentes.

---

## 1. El usuario

Quien entra aquí es alguien que está planeando un viaje y todavía no ha decidido
nada. No busca un producto concreto: busca **hacerse una idea**. Llega con una
ventana de fechas más o menos flexible, un presupuesto aproximado en la cabeza y
una intuición del tipo de sitio que le apetece — playa, campo, algo con piscina.

Su recorrido es siempre el mismo embudo, y la interfaz existe para acompañarlo:

1. **Explorar** — abre la portada y ojea. Filtra por categoría o escribe un
   destino para acotar el ruido. Todavía no compara: descarta.
2. **Comparar** — pasa al catálogo, donde ya hay un conjunto acotado. Aquí sí
   ordena por precio y mira dónde cae cada sitio en el mapa. La pregunta ya no es
   "¿qué hay?" sino "¿cuál de estos?".
3. **Decidir** — abre un alojamiento concreto. Necesita ver más fotos, saber
   quién es el anfitrión, qué incluye la casa y cuánto le va a costar de verdad
   para su grupo.

La consecuencia de diseño es que **cada vista responde a una pregunta distinta**
y no debe intentar responder las tres. La portada inspira, el catálogo compara,
el detalle convence.

Además, este usuario está en el móvil. Mira alojamientos en el metro, en el sofá,
en una pausa del trabajo. Por eso el proyecto es mobile-first de verdad: se
diseña a 375 px y sólo después se aprovecha el espacio de escritorio a partir de
768 px.

---

## 2. Las tres páginas

### `/` — Portada

La página de descubrimiento. De arriba abajo: una barra de navegación con el
logo, un campo de búsqueda y los iconos de usuario; debajo una fila horizontal de
categorías con las que se acota por tipo de alojamiento; y ocupando el resto, una
cuadrícula de tarjetas.

Lo que la hace viva son dos filtros que trabajan **a la vez y en local**: el texto
que se escribe en el buscador y la categoría activa. No hay recarga ni petición:
la lista completa vive en memoria y se recalcula en cada pulsación de tecla.

Al montar, la página simula una carga de red (lista vacía → estado de carga →
datos) para que el esqueleto de carga sea real y no decorativo.

### `/catalog` — Catálogo de resultados

La página de comparación. Reutiliza exactamente la misma tarjeta de la portada —
si esa tarjeta cambia, cambia en las dos vistas — pero cambia el marco alrededor:

- Una cabecera que dice cuántos resultados hay y ofrece **ordenar por precio**,
  ascendente o descendente.
- Un **mapa** con un pin por alojamiento. En escritorio va a la derecha de la
  lista, en columna fija; en móvil se coloca debajo de las tarjetas, porque a
  375 px un mapa lateral no cabe sin robarle el sitio a lo que de verdad se lee.

### `/rooms/[id]` — Detalle del alojamiento

La página de decisión, y la única que depende de un parámetro de URL. Cinco
secciones, cada una con una responsabilidad y cada una en su propio componente:

1. **Galería** — las fotos del alojamiento con navegación Anterior / Siguiente.
2. **Cabecera** — título, valoración, número de reseñas y ubicación.
3. **Anfitrión** — avatar, nombre y años como anfitrión.
4. **Servicios** — cuadrícula de pares icono + etiqueta.
5. **Tarjeta de reserva** — precio por noche y un contador de huéspedes acotado
   por la capacidad real del alojamiento.

Los datos se cargan en `useEffect` a partir del `id` de la URL, con el mismo
retardo simulado que en la portada. Si el `id` no existe, la vista lo dice en
lugar de romperse.

---

## 3. Inventario de componentes

Un componente, una responsabilidad. Ninguno pasa de ~80 líneas; cuando uno
crecía, se ha partido.

### Compartidos

| Componente | Responsabilidad |
|---|---|
| `Navbar` | Logo, buscador y menú de usuario. Presente en las tres vistas. |
| `Logo` | La marca. Símbolo siempre, logotipo a partir de md. |
| `SearchInput` | Sólo el campo de texto: recibe valor y notifica cambios. No sabe qué se filtra. |
| `UserMenu` | Hamburguesa y avatar de la derecha. |
| `ListingCard` | La tarjeta de alojamiento. **Se reutiliza en portada y catálogo.** |
| `ListingGrid` | Coloca las tarjetas y resuelve el caso de lista vacía. |
| `PhotoPlaceholder` | El hueco de foto (degradado + etiqueta). No hay imágenes reales. |
| `StarRating` | Estrella + nota, con recuento de reseñas opcional. |
| `CategoryIcon` / `AmenityIcon` | SVG en línea por clave. Sin librería de iconos. |
| `LoadingGrid` | Esqueletos con la forma de las tarjetas mientras cargan los datos. |

### Portada

| Componente | Responsabilidad |
|---|---|
| `CategoryFilters` | La fila horizontal de categorías; resalta la activa. |
| `CategoryPill` | Una sola categoría: icono, etiqueta y estado activo. |

### Catálogo

| Componente | Responsabilidad |
|---|---|
| `ResultsHeader` | Recuento de resultados y control de orden. |
| `SortControl` | Sólo el conmutador ascendente / descendente. |
| `ListingsMap` | Mapa con un pin de precio por alojamiento. |
| `FitBounds` | Encuadra el mapa a los pines. Va aparte porque `useMap` exige ser hijo del mapa. |
| `MapPlaceholder` | El recuadro gris que ocupa el sitio del mapa mientras carga. |

### Detalle

| Componente | Responsabilidad |
|---|---|
| `RoomGallery` | Foto actual, botones Anterior / Siguiente y contador. |
| `RoomHeader` | Título, valoración, reseñas, ubicación y capacidad. |
| `HostInfo` | Avatar, nombre y antigüedad del anfitrión. |
| `RoomDescription` | El texto descriptivo del alojamiento. |
| `AmenitiesGrid` | Cuadrícula de servicios. |
| `BookingCard` | Precio y contador de huéspedes. |
| `GuestCounter` | Sólo los botones − / + y el número, con sus topes. |
| `BackToCatalog` | Miga de pan de vuelta al catálogo. |
| `RoomSkeleton` | Estado de carga de la vista. |
| `RoomNotFound` | Qué se ve si el `id` de la URL no existe. |

---

## 4. Modelo de datos

Dos interfaces principales, definidas en [`types/index.ts`](types/index.ts):

- **`Listing`** — el alojamiento tal y como lo pinta una tarjeta: id, título,
  ubicación, precio por noche, valoración, número de reseñas, categoría,
  disponibilidad, coordenadas y fotos. Es lo mínimo que necesitan la portada y el
  catálogo.
- **`Room extends Listing`** — añade lo que sólo hace falta en el detalle:
  descripción, anfitrión, servicios y capacidad (huéspedes, dormitorios, camas,
  baños).

La herencia es deliberada: la tarjeta se reutiliza en tres sitios y no debe
arrastrar datos que no pinta. Un `Room` **es** un `Listing`, así que se le puede
pasar a `ListingCard` sin conversiones.

Los datos son simulados y viven en [`lib/`](lib/). Las fotos no son imágenes:
cada una es un degradado determinista con una etiqueta descriptiva, suficiente
para validar la arquitectura de componentes sin depender de assets externos.

---

## 5. Decisiones técnicas

- **Next.js 16 con App Router**, TypeScript y Tailwind CSS 4. Sin plantilla de
  inicio y **sin librería de componentes**: nada de shadcn, MUI, Ant ni Chakra.
  Todo son clases de utilidad de Tailwind y componentes propios.
- **Mobile-first**: las clases sin prefijo describen los 375 px. `md:` (768 px) y
  `lg:` sólo añaden, nunca corrigen.
- **Navegación con `<Link>`** de Next en todos los saltos internos. Ninguna
  `<a href>` plana entre vistas: rompería el enrutado del cliente y provocaría
  recarga completa.
- **Estado con `useState`** en cinco sitios distintos: texto de búsqueda,
  categoría activa, orden del catálogo, índice de la galería y contador de
  huéspedes.
- **`useEffect` para simular la carga** en portada y detalle: lista vacía →
  `isLoading = true` → `setTimeout` → datos y `isLoading = false`.
- **Componentes funcionales declarados como `const`**. Ninguna clase.
- El mapa se carga con `dynamic(..., { ssr: false })` porque Leaflet necesita
  `window` y reventaría en el renderizado de servidor.

---

## 6. Especificaciones derivadas de capturas

> **Flujo de visión → especificación.** Las capturas de referencia están en
> [`design-refs/`](design-refs/) — tres pantallas de Airbnb a 375 px de ancho.
> Cada bloque de abajo es la especificación que se extrajo de una captura
> (nombre del componente, props y relación de layout) y que guió la
> implementación de esa vista.

### Nota previa: dónde la captura y el enunciado no coinciden

Las capturas son de Airbnb en 2026, y su portada ya no es la que describe el
enunciado. Donde chocan, **manda el enunciado** (es el requisito) y la captura
aporta el lenguaje visual. Las tres divergencias:

| Enunciado | Airbnb hoy | Qué hacemos |
|---|---|---|
| Cuadrícula de tarjetas en la portada | Carruseles horizontales por sección ("Popular homes in Madrid") | Cuadrícula, como pide el enunciado |
| Fila de categorías con icono + etiqueta (Playa, Mansiones, Tendencias) | Sólo tres pestañas: All / Homes / Experiences, y una fila de filtros de texto | Fila de categorías con icono, como pide el enunciado |
| Precio por noche | Precio total de la estancia ("€356 total") | Por noche, como pide el enunciado |

En móvil, Airbnb sí muestra el mapa: una franja fija en la cabecera del catálogo
con los precios como pines. Nosotros lo ponemos debajo de las tarjetas porque es
lo que pide el enunciado, pero los pines de precio sí los copiamos.

---

### Spec A — `01-home.png` (portada, 375 px)

**Lo que se ve:** buscador como píldora blanca con sombra y lupa a la izquierda;
fila de pestañas con icono; secciones con título y flecha; tarjetas en carrusel
con foto redondeada, chapa "Guest favorite" arriba a la izquierda, corazón
arriba a la derecha, y tres líneas de texto debajo.

```
Navbar
  props: —
  layout: sticky top-0, fondo blanco, borde inferior hairline.
          375px → logo + lupa; 768px+ → logo | buscador centrado | menú.
  hijos: Logo · SearchInput · UserMenu

SearchInput
  props: { value: string; onChange: (value: string) => void; placeholder?: string }
  layout: píldora rounded-full, borde hairline, sombra suave, lupa a la
          izquierda. Controlado: no guarda estado propio.

CategoryPill
  props: { category: Category; isActive: boolean; onSelect: (id: string) => void }
  layout: columna icono(24px) + etiqueta(12px). Activa = texto oscuro,
          opacidad 100 y subrayado inferior de 2px. Inactiva = gris.

CategoryFilters
  props: { categories: Category[]; activeId: string; onSelect: (id: string) => void }
  layout: fila horizontal con scroll y sin barra visible (`.no-scrollbar`),
          gap 28px. Sin envolver a ninguna anchura.

ListingCard
  props: { listing: Listing }
  layout: enlace a /rooms/[id]. Foto cuadrada rounded-xl; chapa "Favorito de
          huéspedes" absoluta arriba-izquierda si `isGuestFavorite`; corazón
          absoluto arriba-derecha. Debajo: fila 1 = título + valoración
          alineada a la derecha; fila 2 = ubicación (gris); fila 3 =
          disponibilidad (gris); fila 4 = precio en negrita + "noche".

ListingGrid
  props: { listings: Listing[] }
  layout: 1 columna a 375px · 2 a sm · 3 a lg · 4 a xl. gap 24px.
          Si la lista viene vacía, mensaje de "sin resultados".
```

---

### Spec B — `02-catalog.png` + `04-catalog-desktop.png` (catálogo)

**Lo que se ve (móvil):** cabecera con flecha atrás y píldora de búsqueda de dos
líneas; franja de mapa con pines de precio en burbuja blanca; hoja blanca con
esquinas superiores redondeadas montada sobre el mapa; recuento "99 homes"
centrado; lista en una sola columna.

**Lo que se ve (escritorio):** lista a la izquierda en dos columnas ocupando ~62%
del ancho, mapa fijo a la derecha ocupando el resto y toda la altura. Recuento
"14 homes" en negrita sobre la lista. Pines de precio también en burbuja blanca.

```
SortControl
  props: { order: SortOrder; onChange: (order: SortOrder) => void }
  layout: dos botones en un grupo con borde rounded-full. El activo lleva fondo
          oscuro y texto blanco. Sustituye al desplegable de "Filters" de la
          captura, porque el enunciado pide orden por precio.

ResultsHeader
  props: { count: number; order: SortOrder; onOrderChange: (o: SortOrder) => void }
  layout: 375px → recuento arriba y control debajo, apilados.
          768px+ → misma fila, recuento a la izquierda y control a la derecha.

ListingsMap
  props: { listings: Listing[] }
  layout: rounded-xl con overflow oculto. Alto fijo 320px en móvil;
          en lg+ ocupa toda la altura de la columna y queda `sticky`.
          Un pin por alojamiento, como burbuja blanca con el precio dentro
          (copiado de la captura). Encuadre automático a los pines.

/catalog (página)
  layout: 375px → ResultsHeader · ListingGrid · ListingsMap (mapa debajo).
          1024px+ → dos columnas: lista (~62%) | mapa (~38%) fijo a la derecha.
```

---

### Spec C — `03-room-detail.png` (detalle, 375 px)

**Lo que se ve:** foto a sangre completa sin márgenes, con controles circulares
translúcidos superpuestos (atrás a la izquierda; compartir y corazón a la
derecha) y una chapa oscura "1 / 110" abajo a la derecha. Sobre la foto monta
una hoja blanca con esquinas redondeadas: título grande, subtítulo gris,
"★5.0 · 1 review", separador hairline y la fila del anfitrión. Los servicios van
en lista de icono + etiqueta. El precio vive en una barra inferior fija: "From
€598" en negrita subrayado, "total · Aug 22 – 23" en gris, y el CTA en rausch.

```
RoomGallery
  props: { photos: PhotoPlaceholder[]; title: string }
  estado: useState del índice de la foto visible.
  layout: foto a sangre 4:3 (16:9 en md+). Botones Anterior/Siguiente
          circulares translúcidos centrados en vertical; chapa "n / total"
          abajo a la derecha. Los botones se desactivan en los extremos.

RoomHeader
  props: { room: Room }
  layout: título 24px/32px en md+, luego "★ nota · n reseñas · ubicación",
          luego la línea de capacidad "6 huéspedes · 3 dormitorios · …".
          Alineado a la izquierda: la captura lo centra porque es un hotel,
          pero un alojamiento normal de Airbnb lo alinea a la izquierda.

HostInfo
  props: { host: Host }
  layout: avatar circular de 48px con las iniciales dentro, y a la derecha
          "Anfitrión: {nombre}" con "{n} años como anfitrión" en gris.
          Chapa "Superanfitrión" si corresponde. Separadores hairline arriba
          y abajo.

AmenitiesGrid
  props: { amenities: Amenity[] }
  layout: 1 columna a 375px, 2 en md+. Cada fila: icono 24px + etiqueta.
          La captura usa lista vertical; el enunciado pide cuadrícula, así que
          es lista en móvil y cuadrícula en escritorio.

GuestCounter
  props: { value: number; min: number; max: number; onChange: (n: number) => void }
  layout: etiqueta a la izquierda; a la derecha − , número, +. Botones
          circulares con borde; se desactivan al tocar el tope.

BookingCard
  props: { room: Room }
  estado: useState del número de huéspedes.
  layout: tarjeta con borde y sombra. Precio en negrita + "noche".
          Debajo GuestCounter y el CTA en rausch a ancho completo.
          375px → en el flujo, al final de la página.
          1024px+ → columna derecha `sticky top-24`.
```

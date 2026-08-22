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
| `SearchInput` | Sólo el campo de texto: recibe valor y notifica cambios. No sabe qué se filtra. |
| `ListingCard` | La tarjeta de alojamiento. **Se reutiliza en portada y catálogo.** |
| `ListingGrid` | Coloca las tarjetas: una columna a 375 px, varias en escritorio. |
| `PhotoPlaceholder` | El hueco de foto (degradado + etiqueta). No hay imágenes reales. |
| `StarRating` | Estrella + nota numérica. |
| `CategoryIcon` / `AmenityIcon` | SVG en línea por clave. Sin librería de iconos. |
| `LoadingState` | Lo que se ve mientras los datos no están. |

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
| `ListingsMap` | Mapa con un pin por alojamiento. |

### Detalle

| Componente | Responsabilidad |
|---|---|
| `RoomGallery` | Foto actual + botones Anterior / Siguiente. |
| `RoomHeader` | Título, valoración, reseñas, ubicación. |
| `HostInfo` | Avatar, nombre y antigüedad del anfitrión. |
| `AmenitiesGrid` | Cuadrícula de servicios. |
| `BookingCard` | Precio y contador de huéspedes. |
| `GuestCounter` | Sólo los botones − / + y el número, con sus topes. |

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

_Pendiente: se completa al leer las capturas de `design-refs/`._

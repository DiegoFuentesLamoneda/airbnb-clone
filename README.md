# Clon de la interfaz de Airbnb

Tres vistas de la experiencia de Airbnb implementadas con Next.js 16, React 19,
TypeScript y Tailwind CSS 4. Sin librerías de componentes: todo son componentes
propios y clases de utilidad.

El brief del proyecto —qué hace cada página, quién es el usuario, de qué
componentes se compone y qué se sacó de cada captura de referencia— está en
**[`context.md`](context.md)**.

## Arrancar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Rutas

| Ruta | Qué es |
|---|---|
| `/` | Portada: buscador en vivo, filtros por categoría y cuadrícula de alojamientos |
| `/catalog` | Catálogo: recuento, orden por precio y mapa con un pin por alojamiento |
| `/rooms/[id]` | Detalle: galería, cabecera, anfitrión, servicios y tarjeta de reserva |

## Estructura

```
app/            Rutas del App Router
components/     UI reutilizable, agrupada por vista
  layout/         navbar, logo, buscador, menú de usuario
  listings/       tarjeta y cuadrícula de alojamientos
  home/           filtros por categoría
  catalog/        cabecera de resultados, orden y mapa
  room/           las secciones de la vista de detalle
  ui/             primitivas compartidas (iconos, valoración, placeholders)
lib/            Datos simulados y funciones de filtrado y orden
types/          Interfaces de TypeScript
design-refs/    Capturas de Airbnb usadas para derivar las especificaciones
```

## Notas de implementación

- **Mobile-first**: las clases sin prefijo describen los 375 px; `md:` y `lg:`
  sólo añaden.
- **Sin imágenes reales**: cada foto es un degradado determinista con etiqueta.
  Los degradados se guardan como clases de Tailwind y no como colores, para no
  necesitar ningún `style` en línea.
- **Carga simulada**: la portada y el detalle fingen latencia de red con
  `setTimeout` dentro de `useEffect`, con estado de carga visible.
- **Mapa real** con react-leaflet y teselas de OpenStreetMap, cargado con
  `dynamic(..., { ssr: false })` porque Leaflet necesita `window`.

## Why

El sitio de portafolio actual es una página estática de una sola página sin capacidad de publicar contenido dinámico. Agregar un blog permitirá compartir artículos técnicos, experiencias y conocimiento, mejorando el SEO, la presencia profesional y entregando valor recurrente a los visitantes.

## What Changes

- Agregar una sección/blog al sitio con listado de entradas
- Soportar archivos Markdown (`.md`) como fuente de entradas del blog
- Cada entrada de blog será una página individual con ruta propia
- Agregar navegación hacia/desde el blog en el navbar
- Las entradas se ordenarán por fecha (más reciente primero)
- Layout tipográfico optimizado para lectura de artículos

## Capabilities

### New Capabilities
- `blog`: sistema de blog con contenido en Markdown, listado de entradas, paginación individual, y navegación integrada al portafolio existente

### Modified Capabilities

(ninguna — es una adición pura, no modifica requisitos existentes)

## Impact

- **Dependencias nuevas**: Astro tiene soporte nativo para Markdown; no se requieren dependencias externas adicionales
- **`astro.config.mjs`**: podría requerir configuración menor (e.g., `base` para GitHub Pages)
- **Nuevos archivos**: layouts, componentes y páginas para el blog (listado + entrada individual)
- **`src/pages/blog/`**: nueva ruta de páginas para el blog
- **`src/content/blog/`**: directorio con archivos `.md` como content collection de Astro
- **`src/components/`**: nuevos componentes como `BlogCard.astro`, `BlogLayout.astro`
- **`src/styles/`**: estilos adicionales para tipografía de lectura y listado del blog
- **Navbar**: se agregará enlace al blog
- **SEO**: cada entrada será una página indexable con metadata propia

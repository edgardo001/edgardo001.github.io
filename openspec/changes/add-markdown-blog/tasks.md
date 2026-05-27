## 1. Configuración y Dependencias

- [x] 1.1 Configurar `site` y `base` en `astro.config.mjs` para GitHub Pages
- [x] 1.2 Crear directorio `src/content/blog/` con ejemplo de entrada `.md`

## 2. Content Collection y Schema

- [x] 2.1 Definir Content Collection `blog` en `src/content/config.ts` con schema Zod (`title`, `description`, `pubDate`)
- [x] 2.2 Crear archivo de ejemplo `src/content/blog/primer-articulo.md` con frontmatter válido

## 3. Blog Layout

- [x] 3.1 Crear `src/layouts/BlogLayout.astro` con tipografía de lectura (~720px ancho, fuente base ≥18px, interlineado amplio)
- [x] 3.2 Agregar estilos para bloques de código, títulos, y elementos inline dentro del layout de lectura

## 4. Página de Listado del Blog

- [x] 4.1 Crear `src/pages/blog/index.astro` con query a Content Collection ordenado por fecha descendente
- [x] 4.2 Crear componente `BlogCard.astro` para mostrar título, fecha y descripción de cada entrada
- [x] 4.3 Manejar estado vacío (sin entradas) en la página de listado

## 5. Página Individual de Entrada

- [x] 5.1 Crear `src/pages/blog/[...slug].astro` con `getStaticPaths()` y renderizado de Markdown
- [x] 5.2 Integrar `BlogLayout.astro` en la página de entrada individual
- [x] 5.3 Manejar 404 para slugs inexistentes

## 6. Integración con el Sitio Existente

- [x] 6.1 Agregar enlace "Blog" en `Navbar.astro`
- [x] 6.2 Agregar meta tags SEO (título, descripción, OG) en las páginas del blog

## 7. Build y Verificación

- [x] 7.1 Ejecutar `npm run build` y verificar que el blog se genera correctamente en `dist/`
- [x] 7.2 Verificar rutas `/blog/` y `/blog/[slug]/` funcionan en preview
- [x] 7.3 Verificar que el navbar mantiene consistencia visual con el resto del sitio

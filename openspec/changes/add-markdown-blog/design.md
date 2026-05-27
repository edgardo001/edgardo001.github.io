## Context

El portafolio actual es un sitio Astro estático de una sola página. Astro v4 tiene soporte nativo para Content Collections y Markdown, lo que permite agregar un blog sin dependencias externas. El sitio se despliega en GitHub Pages desde `dist/` mediante GitHub Actions.

## Goals / Non-Goals

**Goals:**
- Permitir escribir entradas del blog en archivos `.md` dentro del proyecto
- Generar páginas estáticas para el listado del blog y cada entrada individual
- Integrar el blog al navbar del sitio existente
- Layout de lectura optimizado para artículos (tipografía, ancho de columna, espaciado)
- Metadatos SEO por entrada (título, descripción, fecha)

**Non-Goals:**
- Comentarios en entradas (futuro)
- RSS feed (futuro)
- Categorización/tags (futuro)
- CMS o editor visual
- Búsqueda en el blog
- Modo oscuro específico para el blog (hereda el tema del sitio)

## Decisions

1. **Content Collections de Astro** sobre archivos Markdown sueltos: Content Collections proveen tipado, validación de frontmatter con Zod y queries eficientes. Es la vía recomendada por Astro.
2. **`src/content/blog/`** como directorio de entradas: convención de Astro para content collections. Cada archivo `.md` es una entrada.
3. **Tipografía serif para lectura**: una variable font serif (o aumentar el tamaño de Inter) para maximizar legibilidad en artículos largos.
4. **Ruta `/blog/` y `/blog/[slug]/`**: patrón estándar de rutas de Astro con `getStaticPaths()`.
5. **Sin dependencias externas**: Astro maneja Markdown nativamente; no se requiere MDX, remark ni rehype.
6. **Layout de lectura separado**: `BlogLayout.astro` con estilos de tipografía y espaciado, distinto del `Layout.astro` principal.

## Risks / Trade-offs

- [Riesgo] Al ser un sitio estático, agregar muchas entradas aumenta el tiempo de build → Mitigación: mantener entradas en órdenes de decenas, no cientos. Si crece, evaluar paginación o `partial: true`.
- [Riesgo] Las rutas de GitHub Pages pueden requerir configurar `base` en Astro → Mitigación: verificar que `astro.config.mjs` tenga `site` y `base` correctos.
- [Trade-off] Usar `.md` (no MDX) limita componentes interactivos dentro de artículos → aceptable para un blog técnico donde el contenido es principalmente texto y código.

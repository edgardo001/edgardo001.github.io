# edgardo001.github.io — Portafolio Profesional

> **Mantenimiento obligatorio**: actualiza este archivo periódicamente y con cada aprendizaje relevante (convenciones, decisiones, reglas). Al terminar una tarea, revisa si algo quedó obsoleto (métricas de Lighthouse, pasos de deploy, herramientas) y corrígelo o elimínalo. Mantenlo breve (máximo 200 líneas): solo lo que no se deduce del código.

Sitio personal de **Edgardo Vásquez Valenzuela** (Solutions Architect, Technical Lead & Senior Software Engineer) — https://edgardovasquez.cl

## Stack y arquitectura

Astro v7 (static output) · Vanilla CSS (`src/styles/global.css`) · Vanilla JS en componentes · i18next ES/EN (`src/i18n/`) · GitHub Pages (CNAME) · GA4 vía GTM.

- `src/components/` componentes `.astro` · `src/layouts/` `Layout.astro` + `BlogLayout.astro` · `src/pages/` `index.astro`, `blog/index.astro`, `blog/[slug].astro`
- `src/content/blog/*.md` posts; el slug es el nombre del archivo.
- `public/blog/img/` imágenes de posts, referenciadas como `/blog/img/nombre.webp`.
- Sin framework JS cliente, sin router, sin API.

Comandos: `start-dev.bat` (dev) · `npx astro build` (build).

## Blog: frontmatter

| Campo | Regla |
|-------|-------|
| `title`, `pubDate` (ISO) | Obligatorios |
| `description` | Obligatorio, máx 160 caracteres |
| `image` | `/blog/img/*.webp` (OG image) |
| `tags` | Minúscula; siglas en mayúscula (`SEO`) |
| `updatedDate` | ISO, opcional |
| `shareX` | `len(shareX) + 2 + len(url) ≤ 280`; url = `https://edgardovasquez.cl/blog/{slug}/` |
| `shareWhatsApp`, `shareReddit` (título ≤ 300), `shareInstagram` | Opcionales; fallback: `description` → `title` |

- `[slug].astro` lee los campos custom con **gray-matter** desde disco, porque `getStaticPaths` solo conserva `title`, `description` y `pubDate`. El schema Zod de `src/content/config.ts` solo sirve para validar en dev.
- LinkedIn y Facebook usan los OG tags (cache ~7 días; refrescar con https://www.linkedin.com/post-inspector/).

## Blog: imágenes y diagramas

- **Solo WebP** (~100KB) en `public/blog/img/`. No pushear el post sin su imagen. Nunca commitear `image.png` (raíz, en `.gitignore`).
- Borrar de `public/blog/img/` las imágenes que el post no use.
- Pie de imagen: `<figure>` + `<figcaption>` con `Elaboración propia con OpenCode (MiMo v2.5, Xiaomi).` (ajustar si cambia la herramienta).
- **Infografías HTML+CSS**: `.html` temporal → `chrome.exe --headless --screenshot=out.png --window-size=960,560 archivo.html` → `sharp('out.png').webp({ quality: 90 })` → borrar `.html` y `.png`.
- **Mermaid** (flujos, secuencias, comparaciones simples): bloques ` ```mermaid `, cargados por CDN solo si el post los usa; `BlogLayout.astro` agrega el figcaption automáticamente. Los IDs de `subgraph` no admiten emojis ni caracteres especiales; los labels sí, entre comillas: `subgraph id ["Label ❌"]`.

## Blog: redacción

- **Voz**: primera persona, cercana, honesta, con experiencia real y código concreto. Trato de **tú** en todo el post (nunca "ustedes").
- **Sin absolutos ni clickbait**: "uno de los errores más comunes", no "el error más común"; evitar "nunca" y "siempre". H2/H3 descriptivos.
- **Conceptos técnicos**: explicarlos entre paréntesis en lenguaje simple, **una sola vez** por post. Agregar una FAQ si el post apunta a un público no técnico.
- **Tiempos verbales** coherentes (algo en curso va en presente).
- **Sin repeticiones**: nada de muletillas ("Ahí…"), párrafos redundantes ni repetir la presentación del inicio en el cierre.
- **Español correcto**: tildes también en Mermaid; evitar anglicismos con equivalente ("prueba de realidad", no "reality check").
- **Precisión técnica**: definiciones exactas (StandardScaler estandariza, no lleva a un rango), aclarar los umbrales arbitrarios y poner en backticks los identificadores tal como están en el código.
- **Verificar** cualquier afirmación sobre repos o datos (ej. "sin datos aleatorios") antes de publicarla.
- **Links externos**: siempre `<a href="..." target="_blank" rel="noopener noreferrer">texto</a>`, nunca `[texto](url)`.

## Flujo de trabajo

1. `/council "cambio"`: debate de roles (Arquitecto, Developer, UI/UX, Tester, Profile Expert, Cliente). El Arquitecto resuelve: ✅ / 🔄 / ❌.
2. Si se aprueba: OpenSpec con `/opsx-propose` → `/opsx-apply` → `/opsx-archive`.
3. El push se hace solo con la aprobación del Líder Técnico.

## Lighthouse

- **Umbral: 90+** en performance, accessibility, best-practices y seo, medido contra producción (no localhost). Guardar el reporte en `lighthouse/report.json` (desktop) y `lighthouse/report-mobile.json`.
- Base (jul 2026): desktop 91-98 / 100 / 100 / 100 · mobile **84** / 96 / 96 / 100.
- El cuello de botella mobile es GTM (163KB, ya en `async` + init en `window.load`). Para llegar a 90+: reemplazarlo (Plausible/Umami) o cargarlo tras la primera interacción. Pendientes: minificar el CSS crítico (`<style is:global>` en vez de `?raw`) y evaluar si Fira Code es necesario.
- No revertir: global.css render-blocking y fuentes con `display=optional` (resolvieron el CLS 0.825 → 0), ni el preload AVIF del hero con `fetchpriority=high`.

```bash
npx lighthouse https://edgardovasquez.cl --only-categories="performance,accessibility,best-practices,seo" --output json --output-path lighthouse/report.json --chrome-path "C:\Program Files\Google\Chrome\Application\chrome.exe" --preset=desktop
npx lighthouse https://edgardovasquez.cl --only-categories="performance" --output json --output-path lighthouse/report-mobile.json --chrome-path "C:\Program Files\Google\Chrome\Application\chrome.exe" --emulated-form-factor=mobile --throttling-method=simulate
```

- El error EPERM de cleanup en Windows se ignora (el reporte ya quedó generado). No usar el MCP `chrome-devtools` para medir performance.

## Deploy (GitHub Actions)

- `.github/workflows/deploy.yml` corre **solo con push a `main`** (`build` → `deploy` con `actions/deploy-pages@v4`). No tiene `workflow_dispatch`.
- Para relanzar: "Re-run" en la UI, `gh run rerun <id> [--failed]` o `git commit --allow-empty -m "ci: trigger deploy" && git push origin main`.
- Si queda en `queued` o falla el deploy sin pasos ejecutados, revisar https://www.githubstatus.com antes de tocar el código: suele ser un incidente de GitHub.
- "cannot be rerun; already running" significa que hay un run en curso: esperar o usar `gh run cancel <id>`.

## Git

- Conventional Commits en inglés, con scope (`feat(hero):`, `fix(navbar):`, `ci:`…) y commits atómicos. Agregar body cuando el cambio no sea obvio.
- Revisar `git status` y `git diff` antes de commitear. No commitear `node_modules/`, `dist/`, `.astro/` ni temporales.

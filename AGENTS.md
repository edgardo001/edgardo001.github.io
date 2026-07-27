# edgardo001.github.io — Portafolio Profesional

> Este archivo se actualiza con cada aprendizaje relevante: nuevas convenciones, patrones, decisiones de arquitectura, o reglas que faciliten el trabajo futuro. Es responsabilidad del agente en curso mantenerlo.

## Proyecto

Sitio web personal de **Edgardo Vásquez Valenzuela** — Solutions Architect, Technical Lead & Senior Software Engineer.
URL: https://edgardovasquez.cl

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Astro.js v7 (static output) |
| Estilos | Vanilla CSS (global.css con variables CSS) |
| Interactividad | Vanilla JS embebido en componentes |
| Hosting | GitHub Pages |
| Dominio | edgardovasquez.cl (CNAME) |
| Analytics | Google Analytics 4 (GTM) |

## Arquitectura

```
src/
├── components/     → 12 componentes .astro (Hero, QueAporto, Skills, Contact…)
├── content/
│   └── blog/       → Artículos en markdown (.md) con frontmatter (title, description, pubDate)
├── i18n/           → Traducciones ES/EN (i18next)
├── layouts/        → Layout.astro + BlogLayout.astro (shell HTML + head + theme script)
├── pages/          → index.astro + /blog/index.astro + /blog/[slug].astro
└── styles/         → global.css (~1400 líneas, variables, layout, secciones)

public/
└── blog/
    └── img/        → Imágenes de artículos del blog (WebP optimizado ~100KB)
```

Single-page estática + blog con content collections (Astro v7). Sin framework JS cliente, sin router, sin API. Los slugs de blog se derivan del nombre del archivo `.md`. Las imágenes del blog van en `public/blog/img/` y se referencian como `/blog/img/nombre.webp`.

## Blog

- **Tono**: Personal, profesional, directo. Sin clickbait ni frases absolutas ("se murió", "te doy la solución", "nunca", "siempre"). Demostrar conocimiento compartiendo experiencia real con ejemplos concretos del código del proyecto.
- **Frontmatter**: `title`, `description` (máx 160 caracteres), `pubDate` en formato ISO.
- **Imagen destacada**: WebP optimizado (~100KB) en `public/blog/img/`, referenciada como `/blog/img/nombre.webp`.
- **Navbar**: Incluir enlace a `/blog/` con entrada i18n `nav.blog` en ES/EN.
- **SEO/AEO/GEO en contenido**:
  - Encabezados H2/H3 descriptivos, evitar "clickbait".
  - Incluir ejemplos de código real del proyecto (ARIA labels, preconnect, fetchpriority, etc.).
  - Párrafos cortos y directos, sin exageraciones.
  - Sección de cierre sin sensacionalismo.
- **JSON-LD estructurado**: Todo post debe tener schema Article vía `<script type="application/ld+json">` en el `<head>`, incluyendo headline, description, datePublished, author, publisher, url y mainEntityOfPage. Se implementa en `BlogLayout.astro` con las props del post + `Astro.site` para la URL canónica.
- **Figcaption**: Imágenes con pie usan `<figure>` + `<figcaption>` con estilo global en BlogLayout (centrado, mono, itálica, tono muted).
- **FAQ para público no técnico**: Incluir sección FAQ cuando el artículo mencione conceptos técnicos (frontend, backend, etc.). Explicar en lenguaje simple, sin jerga. Ideal para posts orientados a clientes o reclutadores.

## Flujo de trabajo

Los cambios pasan por **OpenSpec** (plan → diseño → tareas → implementación) usando los comandos `/opsx-*`.

## Comandos útiles

- `start-dev.bat` — inicia el servidor de desarrollo (`npm run dev`).
- `npx astro build` — build de producción.

## Auditoría con Lighthouse

Toda versión debe pasar auditoría Lighthouse antes de darse por completa.

**Umbral mínimo: 90+ en todas las categorías** (performance, accessibility, best-practices, seo).

**Línea base actual (julio 2026):**
| Dispositivo | Performance | Accessibility | Best-practices | SEO |
|-------------|-------------|---------------|----------------|-----|
| Desktop | 91-98 | 100 | 100 | 100 |
| Mobile | 84 | 96 | 96 | 100 |

Mobile está bajo el umbral (84). Los principales cuellos de botella mobile son:
- **CLS** (ya resuelto: 0.000 con CSS render-blocking + font-display:optional)
- **LCP** (~4.3s): Hero image tarda en cargar por Slow 4G + JS execution
- **TBT** (~90ms): GTM (163KB) + módulo i18next (18.5KB) en main thread
- **Style & Layout** (~1.0s, 51% del main thread): CSS inline sin minificar + global.css render-blocking

### Estrategias aplicadas

| Técnica | Impacto | Notas |
|---------|---------|-------|
| Critical CSS inlined (sin minificar vía `?raw`) | +FCP/LCP desktop, ~5KB inline | No minificado porque `?raw` bypass el procesamiento de Vite |
| global.css render-blocking | Fix CLS (0.825→0.000) | Necesario para evitar layout shifts al aplicar estilos asíncronos |
| Font CSS async con `display=optional` | -render-blocking, sin CLS | `media="print"` + onload swap. `optional` evita font swap CLS |
| Hero image AVIF preload con fetchpriority=high | +LCP | Primer elemento en `<head>` |
| Preconnect GTM, Google Fonts, simpleicons | -latencia conexiones | Antes del CSS crítico |
| i18next init deferred a requestIdleCallback | ~-JS execution | La UI responde antes, i18n se init en idle |
| gtag init deferred a window.load | ~-TBT | Analytics no bloquea interacción |
| Navbar styles restaurados | Fix visual | Mobile menu + theme toggle duplicado en mobile |

### Cuello de botella principal: Google Tag Manager (GTM)

**GTM** (`https://www.googletagmanager.com/gtag/js?id=G-HQ7V2L86TR`) es el script de Google Analytics que mide las visitas del sitio. Es el principal culpable de que mobile no alcance 90+ en Lighthouse.

| Impacto | Valor |
|---------|-------|
| Peso | **163KB** (~35% del total de la página) |
| Script Evaluation | **0.2-0.8s** en el hilo principal |
| Conexiones adicionales | DNS + TCP + TLS a `googletagmanager.com` |
| Tracking adicional | `analytics.google.com`, `doubleclick.net`, `google.cl/ads` |

No se puede eliminar porque las visitas se miden con Google Analytics 4. Ya está mitigado con:
- `gtag()` init diferido a `window.load` (no bloquea interacción temprana)
- Script con atributo `async` (no bloquea parsing)

Si en el futuro se requiere llegar a 90+ mobile, GTM debe reemplazarse por un sistema de analytics más liviano (ej. Plausible, Umami) o cargarse solo después de interacción del usuario.

### Pendiente mobile (para llegar a 90+)

- **CSS crítico sin minificar**: Usar `<style is:global>` en el template en vez de `?raw` para que Astro lo minifique.
- **Reducir pesos de fuentes**: Actualmente ~70KB (Inter + Fira Code). Evaluar si Fira Code es necesario.

### Ejecutar

Desktop:
```bash
npx lighthouse https://edgardovasquez.cl --only-categories="performance,accessibility,best-practices,seo" --output json --output-path lighthouse/report.json --chrome-path "C:\Program Files\Google\Chrome\Application\chrome.exe" --preset=desktop
```

Mobile:
```bash
npx lighthouse https://edgardovasquez.cl --only-categories="performance" --output json --output-path lighthouse/report-mobile.json --chrome-path "C:\Program Files\Google\Chrome\Application\chrome.exe" --emulated-form-factor=mobile --throttling-method=simulate
```

- Ejecutar contra producción (no localhost) para resultados realistas.
- Si alguna categoría baja de 90, no se considera completo.
- Lighthouse CLI falla con EPERM en cleanup (Windows temp) pero los reportes se generan antes del error — ignorar.
- El MCP `chrome-devtools` NO incluye la categoría performance correctamente — usar siempre la CLI oficial.

### Guardado

El reporte JSON va en `lighthouse/report.json` (desktop) y `lighthouse/report-mobile.json` (mobile).

---

## Agentes de desarrollo

Cada agente representa un rol con expertise específica. Colaboran mediante el **Consejo Técnico** para debatir y refinar cambios antes de implementar.

### Agentes disponibles

| Agente | Rol | Expertise |
|--------|-----|-----------|
| **Arquitecto** | Diseña la solución | Estructura, escalabilidad, impacto en el sistema completo |
| **Developer** | Implementa el código | Astro, CSS, JS, buenas prácticas, rendimiento |
| **UI/UX** | Diseña la experiencia | Accesibilidad, diseño responsive, micro-interacciones, consistencia visual |
| **Tester** | Valida la calidad | Lighthouse, a11y, regresiones, edge cases, mobile-first |
| **Profile Expert** | Mejora el perfil profesional | Redacción, posicionamiento, marca personal, qué mostrar y cómo |
| **Líder Técnico** | Supervisa la ejecución | Aprueba cambios, revisa calidad, coordina agentes, vela por coherencia del proyecto |
| **Cliente** | Representa al usuario final | Revisa desde la perspectiva de reclutadores, clientes y colegas |

### Consejo Técnico (debate)

Antes de implementar un cambio, los agentes debaten invocando `/council`:

```
/council "descripción del cambio propuesto"
```

El flujo del consejo:

1. **Arquitecto** evalúa viabilidad técnica y propone enfoque
2. **Developer** identifica implicancias de implementación
3. **UI/UX** revisa impacto visual y experiencia de usuario
4. **Tester** señala riesgos de regresión o calidad
5. **Profile Expert** evalúa cómo impacta la marca personal
6. **Cliente** opina desde su perspectiva (reclutador/cliente/colega)
7. **Arquitecto** sintetiza y emite resolución final: ✅ aprobado, 🔄 requiere cambios, ❌ rechazado

Si es aprobado → `/opsx-propose` para generar los artefactos OpenSpec.

---

## Git

- **Commits atómicos**: un commit por cambio lógico
- **Usa [Conventional Commits](https://www.conventionalcommits.org/)**:
  - `feat(scope):` — nueva funcionalidad o ejemplo
  - `fix(scope):` — corrección de bugs o errores de compilación
  - `docs(scope):` — cambios en README, comentarios, documentación
  - `refactor(scope):` — reestructuración sin cambiar comportamiento
  - `style(scope):` — cambios de formato, espacios, indentación
  - `chore(scope):` — dependencias, configs, archivos auxiliares
  - `perf(scope):` — mejoras de rendimiento
  - `test(scope):` — agregar o modificar tests
  - `ci(scope):` — cambios en pipelines CI/CD
- **Scope**: nombre del componente o módulo afectado (ej. `feat(skills):`, `fix(hero):`)
- **Body explicativo** cuando el cambio no es obvio
- **Commit messages en inglés**, claros y descriptivos
- **No commitea** `node_modules/`, `dist/`, `.astro/`, ni archivos temporales
- **Verifica estado** antes de commitear (`git status`, `git diff`)
- **Push** solo cuando el Líder Técnico aprueba la revisión completa

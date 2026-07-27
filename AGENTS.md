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

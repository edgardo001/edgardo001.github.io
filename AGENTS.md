# edgardo001.github.io — Portafolio Profesional

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
├── layouts/        → Layout.astro (shell HTML + head + theme script)
├── pages/          → index.astro (página única que importa todos los componentes)
└── styles/         → global.css (~1400 líneas, variables, layout, secciones)
```

Single-page estática. Sin framework JS cliente, sin router, sin API. Cada componente es autónomo con su template + estilo scoped.

## Flujo de trabajo

Los cambios pasan por **OpenSpec** (plan → diseño → tareas → implementación) usando los comandos `/opsx-*`.

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

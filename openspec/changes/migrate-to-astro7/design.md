## Context

El portafolio es un sitio Astro estático (`output: 'static'`) con 11 componentes `.astro`, 1 layout, y 3 páginas (index, 404, blog). Se despliega en GitHub Pages sin adaptador SSR. Las dependencias son mínimas: `astro` ^4.9.2 + `i18next` para traducciones. No usa integraciones oficiales de Astro, remark/rehype plugins, ni configuraciones experimentales.

La migración a Astro 7 implica dos saltos mayores (v4→v5→v6→v7), pero usando `@astrojs/upgrade` el proceso se automatiza. Los cambios de mayor impacto para este proyecto son: (1) `compressHTML: 'jsx'` como default, que colapsa whitespace entre inline elements, y (2) compilador Rust estricto que no tolera HTML malformado.

## Goals / Non-Goals

**Goals:**
- Actualizar Astro de v4.9.2 a v7.0.x sin errores de build
- Mantener la apariencia visual idéntica después de la migración
- Corregir todos los problemas de whitespace JSX introducidos por `compressHTML: 'jsx'`
- Validar que todos los componentes `.astro` compilan con el compilador Rust
- Mantener compatibilidad con GitHub Pages deploy y dominio edgardovasquez.cl

**Non-Goals:**
- No se adoptarán features nuevas de Astro 7 (Advanced Routing, Route Caching, CDN Cache Providers) en esta iteración
- No se cambiará el diseño visual ni funcionalidades existentes
- No se migrará a SSR ni se agregarán adaptadores
- No se configurarán AI Enhancements (background dev server, JSON logging)

## Decisions

### 1. Estrategia de actualización: `@astrojs/upgrade`
- **Decisión**: Usar `npx @astrojs/upgrade` para automatizar la migración.
- **Alternativas**: Actualizar manualmente `package.json` y resolver dependencias a mano.
- **Razón**: La herramienta oficial maneja breaking changes entre versiones, actualiza integraciones, y aplica codemods cuando es necesario. Para un salto de 3 majors, es más seguro que hacerlo manual.

### 2. Whitespace: corregir en componentes vs revertir config
- **Decisión**: Identificar y corregir problemas de whitespace agregando `{' '}` explícito donde sea necesario.
- **Alternativas**: Usar `compressHTML: true` en config para mantener el comportamiento antiguo.
- **Razón**: El default `'jsx'` es el futuro de Astro y produce HTML más predecible. Corregir ahora evita depender de un flag legacy que eventualmente será removido. Además, el sitio es pequeño (single-page), el esfuerzo de corrección es bajo.

### 3. Markdown: mantener Sätteri (default)
- **Decisión**: Usar Sätteri, el nuevo pipeline Rust por defecto.
- **Alternativas**: Instalar `@astrojs/markdown-remark` y configurar `processor: unified()`.
- **Razón**: El proyecto no usa remark/rehype plugins. Sätteri es más rápido y nativo. Es la dirección oficial de Astro.

### 4. Sin adopción de nuevas features
- **Decisión**: No adoptar Advanced Routing, Route Caching, ni AI Enhancements en esta iteración.
- **Alternativas**: Implementar `src/fetch.ts` para Advanced Routing, o cache providers para CDN.
- **Razón**: El sitio es puramente estático (GitHub Pages), no se beneficia de features de SSR/cache. Advanced Routing es innecesario para una single-page. Mantener el scope mínimo reduce riesgo.

## Risks / Trade-offs

- **[Riesgo] Whitespace colapsado rompe espaciado visual** → **Mitigación**: Revisar cada componente después del build, comparar visualmente con la versión live actual. Prestar especial atención a `<span>`, `<strong>`, `<em>`, `<a>` adyacentes.
- **[Riesgo] Tags HTML no cerrados causan error de build** → **Mitigación**: El compilador Rust reporta errores con ubicación exacta (archivo:línea). Corregir uno por uno hasta que el build sea limpio.
- **[Riesgo] `i18next` podría tener breaking changes** → **Mitigación**: Verificar changelog de i18next. Si es necesario, actualizar a una versión compatible. Si hay problemas, actualizar i18next por separado antes de la migración de Astro.
- **[Riesgo] CSS output puede cambiar ligeramente** → **Mitigación**: El compilador Rust usa Lightning CSS para CSS scoping. Colores named pueden convertirse a hex, y `url()` paths pueden ganar/perder quotes. Inspeccionar visualmente el build output.
- **[Trade-off] `compressHTML: 'jsx'` es más estricto pero más predecible** → Aceptamos el trade-off porque es el estándar de la industria (React, JSX) y el default oficial de Astro 7.

## Migration Plan

1. **Pre-migración**: Hacer backup del build actual (`dist/`) para comparación. Tomar screenshots de cada sección.
2. **Actualizar**: Ejecutar `npx @astrojs/upgrade`, o manualmente `npm install astro@latest`.
3. **Verificar build**: `npm run build`. Corregir errores de compilación (tags no cerrados, whitespace).
4. **Verificar visual**: `npm run preview`, comparar contra screenshots de referencia.
5. **Rollback**: Si hay problemas críticos, volver al `package-lock.json` anterior con `git checkout package.json package-lock.json && npm ci`.

## Open Questions

- ¿El archivo de blog (`src/pages/blog/`) usa Markdown/MDX y podría verse afectado por Sätteri?
- ¿i18next requiere actualización de versión mayor junto con Astro?

## 1. Pre-migración: Respaldo y análisis

- [x] 1.1 Tomar screenshots de cada sección del sitio en desktop (1440px), tablet (768px) y mobile (375px) como referencia visual
- [x] 1.2 Hacer backup del build actual ejecutando `npm run build` y guardando `dist/` como `dist-backup/`
- [x] 1.3 Verificar `git status` limpio y crear branch `feat/astro7-migration`
- [x] 1.4 Revisar dependencias: `npm outdated` para identificar estado de `astro`, `i18next` y peer dependencies

## 2. Actualización de dependencias

- [x] 2.1 Ejecutar `npx @astrojs/upgrade` para actualizar astro e integraciones automáticamente
- [x] 2.2 Verificar que `package.json` tiene `"astro": "^7.0.0"` o superior
- [x] 2.3 Revisar changelog de i18next y actualizar si hay breaking changes (actual: ^26.3.6)
- [x] 2.4 Ejecutar `npm install` para regenerar `package-lock.json` con las nuevas versiones

## 3. Configuración de Astro 7

- [x] 3.1 Revisar `astro.config.mjs` — verificar que no hay flags experimentales de v4 que requieran migración
- [x] 3.2 Confirmar que `site` y otras configuraciones básicas siguen válidas post-upgrade
- [x] 3.3 Verificar que no se necesita `@astrojs/markdown-remark` (Sätteri es suficiente para el blog existente)
- [x] 3.4 Validar que la configuración de content collections en `src/content/config.ts` es compatible con Astro 7

## 4. Corrección de markup para compilador Rust

- [x] 4.1 Ejecutar `npm run build` y recolectar todos los errores de compilación (tags no cerrados, markup inválido)
- [x] 4.2 Corregir tags no cerrados en componentes: `Hero.astro`, `Navbar.astro`, `Skills.astro`, `QueAporto.astro`, `Projects.astro`, `Logros.astro`, `Saas.astro`, `Trajectory.astro`, `Contact.astro`, `Footer.astro`, `BlogCard.astro`
- [x] 4.3 Corregir tags no cerrados en layouts: `Layout.astro`, `BlogLayout.astro`
- [x] 4.4 Corregir tags no cerrados en páginas: `index.astro`, `404.astro`, `blog/index.astro`, `blog/[slug].astro`
- [x] 4.5 Verificar que el build es limpio (0 errores, 0 warnings relevantes)

## 5. Corrección de whitespace (compressHTML: 'jsx')

- [x] 5.1 Hacer build y `npm run preview` comparando visualmente contra screenshots de referencia
- [x] 5.2 Identificar elementos inline adyacentes que perdieron espacios: `<span>`, `<strong>`, `<em>`, `<a>`, `<button>`, `<time>`
- [x] 5.3 Agregar `{' '}` o espacio literal entre inline elements en los componentes afectados
- [x] 5.4 Revisar el componente `Hero.astro` — alto riesgo por texto estilizado con spans
- [x] 5.5 Revisar `Navbar.astro` y `Footer.astro` — enlaces inline que pueden colapsar
- [x] 5.6 Revisar `Skills.astro` — botones de filtro y badges inline
- [x] 5.7 Revisar `QueAporto.astro`, `Trajectory.astro`, `Logros.astro` — texto con énfasis inline
- [x] 5.8 Revisar los layouts (`Layout.astro`, `BlogLayout.astro`) — slots con contenido inline
- [x] 5.9 Verificar que `primer-articulo.md` renderiza correctamente con Sätteri
- [x] 5.10 Si la cantidad de correcciones es excesiva (>30 ubicaciones), evaluar usar `compressHTML: true` en config como fallback temporal y documentarlo

## 6. Verificación de build y preview

- [x] 6.1 Ejecutar `npm run build` — confirmar build exitoso sin errores ni warnings
- [x] 6.2 Ejecutar `npm run preview` — inspeccionar visualmente todas las secciones
- [x] 6.3 Comparar tamaño de `dist/` contra `dist-backup/` — confirmar que no hay inflación inesperada
- [x] 6.4 Verificar theme toggle (claro/oscuro) funciona correctamente
- [x] 6.5 Verificar skills matrix filtering funciona correctamente
- [x] 6.6 Verificar contact form redirige a WhatsApp correctamente
- [x] 6.7 Verificar traducciones i18n (es/en) funcionan en ambos layouts
- [x] 6.8 Verificar página 404 se renderiza correctamente
- [x] 6.9 Verificar blog: listado (`/blog`) y artículo individual (`/blog/primer-articulo`) renderizan correctamente

## 7. Pruebas de compatibilidad

- [x] 7.1 Probar en Chrome, Firefox y Edge (últimas versiones)
- [x] 7.2 Probar en resoluciones: desktop (1440px), tablet (768px), mobile (375px)
- [x] 7.3 Verificar `CNAME` y configuración de GitHub Pages no se ven afectados
- [x] 7.4 Ejecutar lighthouse (Performance, Accessibility, Best Practices, SEO) y comparar con `lighthouse.json` actual

## 8. Limpieza y commit

- [x] 8.1 Eliminar `dist-backup/` y screenshots temporales
- [x] 8.2 Actualizar `AGENTS.md` si hay cambios relevantes en el stack
- [x] 8.3 Commit: `chore(deps): migrate to Astro 7 with Rust compiler, Vite 8, and Sätteri`
- [ ] 8.4 Push y crear PR para revisión
- [ ] 8.5 Desplegar en GitHub Pages y verificar dominio edgardovasquez.cl funciona

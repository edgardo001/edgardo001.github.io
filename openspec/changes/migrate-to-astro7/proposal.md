## Why

El portafolio corre actualmente en Astro 4.9.2 (lanzado en mayo 2024). La versión 7 (junio 2026) introduce un compilador Rust nativo, pipeline Markdown en Rust (Sätteri), renderizado por colas (~2.4x más rápido), Vite 8 con Rolldown, y cacheo de rutas. Los benchmarks muestran builds 15-61% más rápidos. Actualizar ahora permite aprovechar estas mejoras de rendimiento antes de que el proyecto crezca con más contenido (blog, más páginas).

## What Changes

- **BREAKING**: `compressHTML` cambia de `true` a `'jsx'` — los espacios entre elementos inline se colapsan. Requiere agregar `{' '}` explícito entre `<span>` y otros inline elements.
- **BREAKING**: El nuevo compilador Rust no autocorrige HTML inválido. Tags no cerrados ahora producen errores. Requiere revisar todos los archivos `.astro` para validar markup.
- Actualizar `astro` de `^4.9.2` a `^7.0.0` (salto de 3 versiones mayores).
- Migrar el procesador Markdown por defecto de unified/remark a Sätteri (Rust). Sin impacto porque el proyecto no usa remark/rehype plugins.
- Actualizar `i18next` si hay breaking changes detectados.
- Configuración mínima: el `astro.config.mjs` actual solo define `site`, no requiere cambios.
- Eliminar/actualizar flags experimentales que pasaron a stable (ninguno en uso actual).

## Capabilities

### New Capabilities
- `astro7-core`: Build y dev server con compilador Rust, Vite 8 (Rolldown), renderizado por colas, y compresión JSX whitespace por defecto.
- `astro7-whitespace-correction`: Corrección de espacios explícitos `{' '}` entre elementos inline afectados por el nuevo `compressHTML: 'jsx'`.

### Modified Capabilities
- `astro-portfolio`: El sistema de build existente se actualiza a Astro 7. Los requisitos funcionales (theme toggle, skills matrix, contact form, build estático) no cambian, pero la validación de markup se vuelve más estricta con el compilador Rust.

## Impact

- `package.json`: `astro` ^4.9.2 → ^7.0.0
- `astro.config.mjs`: posiblemente agregar `compressHTML: true` si hay demasiados problemas de whitespace
- Todos los archivos `src/components/*.astro`, `src/layouts/*.astro`, `src/pages/*.astro` deben revisarse por tags HTML no cerrados
- `src/styles/global.css`: sin cambios esperados
- `node_modules/`: actualización completa de dependencias
- Build output (`dist/`): verificar que el HTML generado es visualmente idéntico
- CI/CD (GitHub Actions): sin cambios, el build script `npm run build` sigue igual

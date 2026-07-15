# astro7-core Specification

## Purpose
Ensure the project builds and runs correctly on Astro 7 with the new Rust compiler, Vite 8 (Rolldown), queued rendering, and Sätteri Markdown pipeline as default.

## ADDED Requirements

### Requirement: Astro 7 Build
El sistema SHALL compilar el proyecto con Astro 7.x sin errores usando el comando `npm run build`, generando HTML y CSS estáticos en el directorio `dist/`.

#### Scenario: Successful static build on Astro 7
- **WHEN** el comando `npm run build` es ejecutado
- **THEN** Astro 7 compila el proyecto sin errores y genera archivos HTML, CSS y JS en `dist/`

#### Scenario: No compiler errors from invalid HTML
- **WHEN** el build se ejecuta
- **THEN** el compilador Rust no reporta errores de tags no cerrados o HTML malformado en ningún archivo `.astro`

### Requirement: Vite 8 with Rolldown
El build SHALL usar Vite 8 con Rolldown como bundler por defecto, como parte de la actualización a Astro 7.

#### Scenario: Build completes with Vite 8
- **WHEN** el comando `npm run build` es ejecutado
- **THEN** el proceso de build utiliza Vite 8 y Rolldown sin configuraciones adicionales

### Requirement: Sätteri as Default Markdown Processor
El procesamiento de Markdown SHALL usar Sätteri (Rust) como pipeline por defecto en lugar de unified/remark, sin requerir instalación adicional de `@astrojs/markdown-remark`.

#### Scenario: Markdown renders with Sätteri
- **WHEN** cualquier archivo Markdown o MDX en el proyecto es procesado
- **THEN** el contenido se renderiza usando Sätteri sin errores y sin necesidad de instalar `@astrojs/markdown-remark`

### Requirement: Queued Rendering Default
El motor de renderizado SHALL usar queued rendering como estrategia por defecto, sin flags experimentales requeridos.

#### Scenario: Render uses queued rendering
- **WHEN** Astro renderiza páginas durante el build
- **THEN** el motor de renderizado opera en modo queued rendering sin configuración adicional

### Requirement: Dev Server Compatibility
El servidor de desarrollo (`npm run dev`) SHALL iniciar correctamente con hot reloading funcional en Astro 7.

#### Scenario: Dev server starts on Astro 7
- **WHEN** el comando `npm run dev` es ejecutado
- **THEN** el servidor de desarrollo inicia en `localhost:4321` con hot reloading funcional

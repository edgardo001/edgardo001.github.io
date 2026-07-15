# astro7-whitespace-correction Specification

## Purpose
Ensure visual consistency after the `compressHTML` default changes from `true` to `'jsx'` in Astro 7, which collapses whitespace between inline elements.

## ADDED Requirements

### Requirement: Whitespace Between Inline Elements
El sistema SHALL preservar espacios visibles entre elementos inline (span, strong, em, a, etc.) donde el diseño original requiere separación visual entre palabras o elementos consecutivos.

#### Scenario: Space between consecutive inline elements is preserved
- **WHEN** dos elementos HTML inline consecutivos deben mostrar un espacio entre ellos (ej: `<span>Hola</span><span>Mundo</span>`)
- **THEN** el HTML renderizado contiene un espacio explícito `{' '}` o un espacio literal entre los tags, mostrando "Hola Mundo" y no "HolaMundo"

### Requirement: Visual Regression Prevention
La apariencia visual del sitio después de la migración SHALL ser idéntica a la versión pre-migración (Astro 4.9.2) en todos los navegadores modernos.

#### Scenario: Visual comparison after migration
- **WHEN** se compara el sitio migrado con la versión anterior en resoluciones desktop (1440px), tablet (768px) y mobile (375px)
- **THEN** no hay diferencias visuales perceptibles en espaciado, alineación, o layout de ningún componente

### Requirement: No CompressHTML Config Revert
El sistema SHALL mantener `compressHTML` con el valor por defecto `'jsx'` de Astro 7, sin revertir a `true` mediante configuración explícita, a menos que sea estrictamente necesario.

#### Scenario: Default compressHTML is used
- **WHEN** el proyecto es migrado y construido
- **THEN** `astro.config.mjs` no contiene `compressHTML: true` a menos que la corrección de whitespace resulte inviable

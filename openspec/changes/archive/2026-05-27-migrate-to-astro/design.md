## Context

El portafolio profesional de Edgardo Vásquez Valenzuela es actualmente un sitio HTML/CSS/JS estático. Aunque funciona correctamente, carece de modularidad, lo cual dificulta la adición de nuevas páginas, integraciones futuras con headless CMS, o la automatización de la compilación/optimización de recursos estáticos.

## Goals / Non-Goals

**Goals:**
- Convertir la estructura estática a componentes nativos de Astro.js (.astro).
- Separar las secciones principales en componentes independientes bajo `src/components/` para modularidad y mantenibilidad.
- Preservar al 100% el diseño visual premium y la interactividad original.
- Optimizar la carga de JS del lado del cliente limitándola a las etiquetas `<script>` embebidas en los componentes específicos de Astro.

**Non-Goals:**
- No se agregará un Framework frontend complejo (React, Vue, etc.) para mantener la huella de JS mínima.
- No se cambiarán las funcionalidades ni el diseño estético de la UI en esta iteración.

## Decisions

### 1. Arquitectura de Componentes de Astro
- **Decisión**: Estructurar la aplicación utilizando Astro.js puro.
- **Alternativas**: Utilizar Next.js o Sveltekit.
- **Razón**: Astro genera HTML ultra-ligero por defecto ("zero JS" inicial) y compila estáticamente a la perfección para desplegar en GitHub Pages.

### 2. Estructura CSS Global
- **Decisión**: Migrar `styles.css` a `src/styles/global.css` e importarlo directamente en el Layout principal.
- **Razón**: Evita la necesidad de reescribir estilos y asegura consistencia total.

### 3. Scripts del Cliente en Componentes Específicos
- **Decisión**: Incorporar los scripts JS necesarios para cada componente usando la etiqueta `<script>` nativa de Astro.
- **Razón**: Permite la colocalización del código, facilita el empaquetado optimizado y asegura que la interactividad se inicialice solo en las partes de la UI que lo requieren.

## Risks / Trade-offs

- **[Riesgo] Visual Flashing en cambio de Tema** → **Mitigación**: Añadir un script en el `<head>` del Layout que cargue e inicialice el tema desde `localStorage` de manera síncrona antes del renderizado del contenido principal.

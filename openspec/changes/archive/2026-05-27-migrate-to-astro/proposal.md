## Why

Convertir el portafolio estático actual en una aplicación web basada en Astro.js para mejorar el rendimiento global, facilitar el mantenimiento modular mediante componentes reutilizables, y permitir una futura escalabilidad y optimizaciones SEO de vanguardia, manteniendo el diseño de alta calidad y la interactividad.

## What Changes

- Migrar el archivo `index.html` a una estructura basada en componentes en Astro.js.
- Modularizar las secciones en componentes de Astro en `src/components/`.
- Trasladar los estilos a un archivo global `global.css` e importarlo en el layout base.
- Integrar la interactividad del lado del cliente (`main.js`) en sus respectivos componentes usando scripts optimizados de Astro.
- Organizar los recursos estáticos (imágenes, fuentes, favicon) bajo las mejores prácticas de Astro.

## Capabilities

### New Capabilities
- `astro-portfolio`: Portafolio web modular, altamente interactivo y veloz desarrollado con Astro.js, con soporte nativo de SEO, cambio de tema oscuro/claro optimizado, y filtrado interactivo.

### Modified Capabilities

## Impact

- Código fuente estático heredado (`index.html`, `styles.css`, `main.js`) será reemplazado/reestructurado en el directorio `src/`.
- Dependencias del proyecto administradas a través de `package.json`.
- Flujo de compilación y despliegue a GitHub Pages (o hosting estático) optimizado con Astro.

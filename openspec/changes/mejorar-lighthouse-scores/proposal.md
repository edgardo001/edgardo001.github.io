## Why

El sitio web presenta oportunidades de mejora en métricas Lighthouse: el SEO tiene un `robots.txt` con directivas no estándar (puntuación 0.92), la accesibilidad tiene encabezados con jerarquía incorrecta (puntuación 0.98), y el rendimiento tiene recursos que bloquean el renderizado y falta de precarga (puntuación 0.92). Mejorar estas métricas a ~1.0 en todas las categorías aumenta la visibilidad en buscadores, la usabilidad para usuarios con discapacidades y la velocidad de carga percibida.

## What Changes

- Crear `public/robots.txt` válido con directivas estándar, reemplazando el manejado por Cloudflare que contiene `Content-Signal` no estándar
- Corregir jerarquía de encabezados: cambiar `<h4>` a `<h3>` en Skills.astro y `<h5>` a `<h4>` en Contact.astro, actualizando los selectores CSS correspondientes
- Optimizar carga de Google Fonts: cambiar de render-blocking a carga diferida con `media="print" onload="this.media='all'"`
- Agregar `preconnect` para orígenes de terceros críticos (`googletagmanager.com`, `cdn.simpleicons.org`)
- Agregar `fetchpriority="high"` y `decoding="async"` a la imagen del héroe (LCP element)
- Mejorar tiempo de bloqueo total (TBT) optimizando scripts inline

## Capabilities

### New Capabilities
- `lighthouse-performance`: Optimizaciones de rendimiento (carga de fuentes, precargas, prioridad de imagen LCP)
- `lighthouse-accessibility`: Correcciones de accesibilidad (jerarquía de encabezados)
- `lighthouse-seo`: Correcciones SEO (robots.txt válido)

### Modified Capabilities

<!-- No existing specs to modify -->

## Impact

- `public/robots.txt` - archivo nuevo
- `src/layouts/Layout.astro` - modificado (preconnects, carga diferida de fuentes)
- `src/components/Hero.astro` - modificado (fetchpriority en imagen)
- `src/components/Skills.astro` - modificado (h4→h3)
- `src/components/Contact.astro` - modificado (h5→h4)
- `src/styles/global.css` - modificado (selectores de encabezados)

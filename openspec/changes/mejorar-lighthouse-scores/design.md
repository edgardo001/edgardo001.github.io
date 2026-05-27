## Context

El sitio portafolio construido con Astro.js presenta puntuaciones Lighthouse subóptimas en tres categorías: SEO (0.92), Accesibilidad (0.98) y Rendimiento (0.92). El análisis del reporte Lighthouse revela problemas específicos:

- **SEO**: `robots.txt` servido por Cloudflare contiene directiva no estándar `Content-Signal` que los crawlers no reconocen, causando error de validación.
- **Accesibilidad**: Jerarquía de encabezados incorrecta — `<h4>` aparece directamente después de `<h2>` en Skills, y `<h5>` después de `<h2>` en Contact, saltando niveles intermedios.
- **Rendimiento**: Google Fonts CSS bloquea el rendering (~224ms), falta precarga para la imagen LCP, y no hay preconnect para orígenes de terceros como Google Tag Manager y SimpleIcons.

El sitio se despliega como sitio estático en GitHub Pages/Cloudflare. No hay backend ni framework JS del lado del cliente.

## Goals / Non-Goals

**Goals:**
- Alcanzar score 1.0 en SEO, Accesibilidad y Best Practices
- Alcanzar score ~0.99 en Performance
- Eliminar errores de consola y bloqueos de renderizado
- Mantener compatibilidad total con navegadores modernos

**Non-Goals:**
- Cambiar el diseño visual o la funcionalidad existente
- Migrar a un framework diferente
- Agregar nuevas dependencias npm
- Modificar la paleta de colores, tipografía o layout

## Decisions

1. **robots.txt en `/public/` en lugar de modificar Cloudflare**: Crear un `robots.txt` en `/public/` sobreescribe el manejado por Cloudflare al servirse desde el origen. Usar solo directivas estándar (`User-agent`, `Allow`, `Disallow`, `Sitemap`).

2. **Carga diferida de Google Fonts con `media="print" onload`**: Usar el patrón `media="print" onload="this.media='all'"` para que el CSS de Google Fonts no bloquee el renderizado inicial. Incluir `<link rel="preload">` para iniciar la descarga temprano y `<noscript>` como fallback. Combinado con `display=swap` en la URL, esto asegura que el texto sea visible inmediatamente con fuente de sistema mientras se cargan las fuentes personalizadas.

3. **Preconnect para todos los orígenes de terceros**: Agregar `<link rel="preconnect">` para `fonts.googleapis.com`, `fonts.gstatic.com`, `www.googletagmanager.com` y `cdn.simpleicons.org` para reducir latencia de conexión.

4. **fetchpriority="high" en imagen LCP**: La imagen de perfil en Hero.astro es el elemento LCP. Agregar `fetchpriority="high"` para priorizar su carga sobre otros recursos.

5. **Jerarquía de encabezados**: Cambiar `<h4>` a `<h3>` en Skill cards y `<h5>` a `<h4>` en métodos de contacto. Actualizar selectores CSS correspondientes.

## Risks / Trade-offs

- [Riesgo] Carga diferida de Google Fonts puede causar FOIT (Flash of Invisible Text) si `display=swap` no funciona → Mitigación: `display=swap` ya está en la URL, y la precarga asegura descarga temprana.
- [Riesgo] robots.txt personalizado puede deshabilitar reglas de bloqueo de Cloudflare para bots de IA → Mitigación: Incluir explícitamente `Disallow` para `GPTBot`, `ClaudeBot`, `Google-Extended`, etc.
- [Trade-off] La optimización TBT tiene impacto limitado porque los scripts inline de gtag y theme toggle son necesarios para funcionalidad.

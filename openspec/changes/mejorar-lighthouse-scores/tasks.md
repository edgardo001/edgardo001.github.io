## 1. SEO - robots.txt

- [x] 1.1 Crear `public/robots.txt` con directivas estándar (User-agent, Allow, Disallow, Sitemap)
- [x] 1.2 Incluir reglas Allow para bots legítimos y Disallow para bots de IA (GPTBot, ClaudeBot, Google-Extended, etc.)

## 2. Accesibilidad - Jerarquía de Encabezados

- [x] 2.1 Cambiar `<h4>` a `<h3>` en todos los skill cards (Skills.astro)
- [x] 2.2 Actualizar selector CSS `.skill-card h4` → `.skill-card h3` en global.css
- [x] 2.3 Cambiar `<h5>` a `<h4>` en métodos de contacto (Contact.astro)
- [x] 2.4 Actualizar selector CSS `.contact-method-text h5` → `.contact-method-text h4` en global.css

## 3. Rendimiento - Google Fonts y Preconnect

- [x] 3.1 Cambiar carga de Google Fonts a diferida (`media="print" onload="this.media='all'"`) en Layout.astro
- [x] 3.2 Agregar `<link rel="preload" as="style">` para Google Fonts CSS
- [x] 3.3 Agregar `<noscript>` fallback para Google Fonts
- [x] 3.4 Agregar `<link rel="preconnect">` para `www.googletagmanager.com` y `cdn.simpleicons.org`

## 4. Rendimiento - Imagen LCP

- [x] 4.1 Agregar `fetchpriority="high"` a la imagen de perfil en Hero.astro
- [x] 4.2 Agregar `decoding="async"` a la imagen de perfil en Hero.astro

## 5. Documentación

- [x] 5.1 Documentar el proceso OpenSpec y mejoras Lighthouse en README.md

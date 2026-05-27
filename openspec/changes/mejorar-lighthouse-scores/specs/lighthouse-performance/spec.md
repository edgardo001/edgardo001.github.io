## ADDED Requirements

### Requirement: Google Fonts no debe bloquear el renderizado inicial
El CSS de Google Fonts SHALL cargarse de forma diferida sin bloquear el renderizado del contenido.

#### Scenario: Carga diferida con fallback
- **WHEN** el navegador procesa el `<link>` de Google Fonts con `media="print"`
- **THEN** el CSS no bloquea el renderizado
- **AND** después de cargar, `onload` cambia `media` a `all` para aplicar las fuentes

#### Scenario: Fallback sin JavaScript
- **WHEN** JavaScript está deshabilitado
- **THEN** el `<noscript>` proporciona un `<link rel="stylesheet">` estándar

### Requirement: Precarga de recursos críticos
El sitio SHALL incluir `<link rel="preload">` para el CSS de Google Fonts y `<link rel="preconnect">` para orígenes de terceros.

#### Scenario: Preconnect para orígenes de terceros
- **WHEN** el navegador encuentra recursos de `fonts.googleapis.com`, `fonts.gstatic.com`, `www.googletagmanager.com`, o `cdn.simpleicons.org`
- **THEN** la conexión temprana reduce la latencia gracias a `<link rel="preconnect">`

#### Scenario: Preload del CSS de fuentes
- **WHEN** el navegador procesa el `<link rel="preload" as="style">` para Google Fonts
- **THEN** inicia la descarga del CSS inmediatamente sin bloquear el renderizado

### Requirement: La imagen LCP debe tener prioridad de carga
La imagen de perfil en el Hero SHALL cargarse con máxima prioridad.

#### Scenario: fetchpriority en la imagen del héroe
- **WHEN** el navegador carga la imagen `/mpedf3pv-img.jpg`
- **THEN** debe tener el atributo `fetchpriority="high"` para priorizar sobre otros recursos
- **AND** debe tener `decoding="async"` para permitir decode asíncrono

## ADDED Requirements

### Requirement: Blog post list page
El sistema SHALL generar una página `/blog/` que liste todas las entradas del blog ordenadas por fecha descendente, mostrando título, fecha de publicación, y un extracto/descripción de cada entrada.

#### Scenario: View blog list page
- **WHEN** un usuario navega a `/blog/`
- **THEN** el sistema muestra una lista de todas las entradas publicadas, ordenadas de la más reciente a la más antigua, cada una con su título, fecha y descripción

#### Scenario: Blog list with no entries
- **WHEN** no existen entradas en `src/content/blog/`
- **THEN** la página `/blog/` muestra un mensaje indicando que no hay artículos aún

### Requirement: Individual blog post page
El sistema SHALL generar una página individual por cada entrada del blog en la ruta `/blog/[slug]/`, renderizando el contenido Markdown a HTML con un layout tipográfico optimizado para lectura.

#### Scenario: View individual blog post
- **WHEN** un usuario navega a `/blog/una-entrada/`
- **THEN** el sistema muestra el contenido completo de la entrada con título, fecha, y el cuerpo del artículo renderizado desde Markdown

#### Scenario: Non-existent blog post returns 404
- **WHEN** un usuario navega a `/blog/slug-inexistente/`
- **THEN** el sistema retorna una página 404

### Requirement: Blog markdown content collection
El sistema SHALL definir una Content Collection de Astro llamada `blog` en `src/content/blog/`, donde cada archivo `.md` incluye frontmatter con los campos `title`, `description` y `pubDate`.

#### Scenario: Define blog content collection schema
- **WHEN** el sistema compila
- **THEN** valida que cada archivo `.md` en `src/content/blog/` contenga `title` (string), `description` (string) y `pubDate` (Date) en su frontmatter

### Requirement: Blog navigation integration
El navbar del sitio SHALL incluir un enlace "Blog" que navegue a la página `/blog/`.

#### Scenario: Navbar blog link visible
- **WHEN** un usuario visita cualquier página del sitio
- **THEN** el navbar muestra un enlace "Blog" que dirige a `/blog/`

### Requirement: SEO metadata per blog post
Cada página de entrada individual SHALL incluir meta tags para título, descripción y Open Graph en el `<head>` del documento.

#### Scenario: Blog post page includes meta tags
- **WHEN** un usuario visita una entrada del blog
- **THEN** la página incluye `<title>` con el título de la entrada, `<meta name="description">` con su descripción, y las etiquetas OG correspondientes

### Requirement: Blog reading layout
El sistema SHALL proporcionar un layout de lectura para las entradas del blog con tipografía adecuada, ancho máximo de columna (~720px), espaciado generoso y resaltado de código.

#### Scenario: Blog post page has reading-optimized layout
- **WHEN** un usuario visita `/blog/[slug]/`
- **THEN** el contenido se muestra con un ancho máximo de ~720px, tipografía de lectura (tamaño base ≥ 18px), interlineado amplio, y bloques de código con estilo diferenciado

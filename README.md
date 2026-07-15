# Edgardo Vásquez Valenzuela - Portafolio Profesional (Astro.js)

Este proyecto es el portafolio profesional de **Edgardo Vásquez Valenzuela** (Software Development Manager & Arquitecto Cloud e Integración de IA), migrado de un sitio web estático tradicional a **Astro.js** para garantizar alta modularidad, excelente rendimiento de carga y facilidades de mantenimiento futuro.

---

## 🚀 Tecnologías Utilizadas

- **Core:** [Astro.js](https://astro.build/) (v4+) - Framework web diseñado para la velocidad.
- **Estilos:** Vanilla CSS (organizado globalmente).
- **Interactividad:** Vanilla JavaScript (encapsulado directamente dentro de los componentes correspondientes).
- **SEO & Metadatos:** Metatags semánticos para motores de búsqueda, optimización OpenGraph y Google Analytics incorporado.

---

## 📁 Estructura del Proyecto

La estructura actual del código sigue el estándar de Astro:

```text
├── public/                 # Recursos estáticos servidos directamente (ej. imágenes, favicon)
│   └── mpedf3pv-img.jpg    # Imagen de perfil
├── src/
│   ├── components/         # Componentes modulares reutilizables
│   │   ├── Contact.astro   # Formulario con redirección a WhatsApp
│   │   ├── Footer.astro    # Pie de página y copyright
│   │   ├── Hero.astro      # Banner de bienvenida y presentación
│   │   ├── Kpi.astro       # Tarjetas de métricas e impacto
│   │   ├── Navbar.astro    # Navegación, menú móvil y control de tema
│   │   ├── Saas.astro      # Resumen de logros clave
│   │   ├── Skills.astro    # Matriz de habilidades interactiva con filtrado
│   │   └── Trajectory.astro# Timeline de experiencia y educación
│   ├── layouts/
│   │   └── Layout.astro    # Plantilla base (HTML, Head, Fonts, Analytics, Theme Script)
│   ├── pages/
│   │   └── index.astro     # Página de inicio (combina todos los componentes)
│   └── styles/
│       └── global.css      # Estilos globales de la aplicación
├── astro.config.mjs        # Configuración de Astro
├── package.json            # Scripts de Node.js y dependencias
└── README.md               # Documentación general del proyecto
```

---

## 🛠️ Comandos de Desarrollo y Producción

Dentro de la carpeta raíz del proyecto, puedes ejecutar los siguientes comandos utilizando tu gestor de paquetes (`npm`):

### 1. Instalar dependencias
Si estás descargando el proyecto por primera vez, instala los módulos de Node necesarios:
```bash
npm install
```

### 2. Ejecutar en Entorno de Desarrollo (Dev)
Para iniciar un servidor de desarrollo local con recarga rápida en tiempo real (Hot Module Replacement):
```bash
npm run dev
```
Por defecto, tu sitio estará disponible en [http://localhost:4321/](http://localhost:4321/).

### 3. Compilar para Producción (Build)
Para compilar el sitio optimizado de forma estática para su distribución final:
```bash
npm run build
```
Este comando generará el build de producción optimizado dentro de la carpeta `/dist`.

### 4. Vista Previa Local del Build de Producción (Preview)
Para previsualizar localmente el build de producción antes de desplegar:
```bash
npm run preview
```

---

## 💡 Detalles de Implementación Destacados

- **Theme Toggle sin parpadeos:** Se integró un pequeño script síncrono inline directamente en el `<head>` del Layout principal. Este lee inmediatamente del `localStorage` antes de pintar el DOM o procesar el CSS grande, evitando el molesto cambio brusco de color (*visual flashing*) al recargar la página.
- **Filtrado dinámico de Habilidades:** El componente `Skills.astro` autogestiona su interactividad. Cuando el usuario selecciona una categoría, las tarjetas se ocultan o muestran dinámicamente aplicando una animación fluida (`fadeIn`) definida localmente.
- **Formulario integrado a WhatsApp:** El formulario de contacto valida los datos e invoca la API web de WhatsApp (`wa.me`) codificando el mensaje en formato de texto enriquecido e iniciando la conversación en una nueva pestaña sin interrumpir la navegación del usuario.

---

## 🌐 Despliegue en GitHub Pages

Al compilarse como un sitio puramente estático (`output: "static"` por defecto en Astro), es totalmente compatible con GitHub Pages. Puedes configurar tu repositorio para desplegar la carpeta resultante `/dist` o configurar un flujo de trabajo de GitHub Actions (`.github/workflows/deploy.yml`) para compilar de forma automática al hacer push a la rama `main`.

---

## 🌐 Despliegue en Netlify

El proyecto incluye un archivo `netlify.toml` con la configuración necesaria para desplegar automáticamente en Netlify.

### Prerrequisitos

1. Haz push del repositorio a GitHub (o GitLab / Bitbucket).
2. Conéctate a [Netlify](https://app.netlify.com/) e inicia sesión con tu proveedor Git.

### Pasos para desplegar

1. En Netlify, haz clic en **Add new site → Import an existing project**.
2. Selecciona tu repositorio.
3. Netlify detectará automáticamente la configuración desde `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 20
4. Haz clic en **Deploy site**.

### Dominio personalizado

Si deseas usar `edgardovasquez.cl` (o cualquier dominio propio):

1. Ve a **Site settings → Domain management → Add custom domain**.
2. Sigue las instrucciones de Netlify para configurar los DNS (agrega registros CNAME o apunta los nameservers).
3. Netlify emitirá automáticamente un certificado SSL (Let's Encrypt).

> **Nota:** Si también tienes configurado GitHub Pages con el mismo dominio, solo uno puede estar activo a la vez. Decide qué plataforma usar y apunta el DNS únicamente a esa.

### Re-despliegues automáticos

Cada vez que hagas push a la rama principal (ej. `main`), Netlify ejecutará `astro build` y publicará el resultado automáticamente.

---

## 📊 Lighthouse Performance & OpenSpec Workflow

### OpenSpec - Gestión de Cambios

Este proyecto usa **OpenSpec** para planificar, diseñar e implementar cambios de forma estructurada. El flujo de trabajo es:

```text
openspec new change "<nombre>"   → Crea directorio con artifactos
proposal.md                      → Define qué y por qué
design.md                        → Define cómo (arquitectura y decisiones)
specs/<capability>/spec.md       → Define requisitos detallados
tasks.md                         → Checklist de implementación
```

Comandos útiles:
```bash
openspec status --change "<nombre>"        # Ver progreso
openspec instructions <artifact> --change "<nombre>"  # Ver instrucciones
```

Los cambios se almacenan en `openspec/changes/<nombre>/`.

### Optimizaciones Lighthouse Aplicadas

Basado en auditorías Lighthouse, se aplicaron las siguientes optimizaciones:

| Categoría | Problema | Solución |
|---|---|---|
| **SEO** | `robots.txt` con directiva `Content-Signal` no estándar (manejada por Cloudflare) | `public/robots.txt` propio con directivas estándar |
| **Accesibilidad** | Jerarquía de encabezados incorrecta (h2→h4 en Skills, h2→h5 en Contact) | h4→h3 en Skills, h5→h4 en Contact |
| **Rendimiento** | Google Fonts CSS bloqueaba el renderizado (~224ms) | Carga diferida con `media="print" onload="this.media='all'"` |
| **Rendimiento** | Falta de precarga para imagen LCP | `fetchpriority="high"` + `decoding="async"` en Hero img |
| **Rendimiento** | Sin preconnect para orígenes de terceros | Preconnect para `googletagmanager.com` y `cdn.simpleicons.org` |

Para ejecutar una auditoría Lighthouse:
```bash
npx lighthouse https://edgardovasquez.cl/ --view --preset=desktop
```

O desde Chrome DevTools → Lighthouse → Generate report.

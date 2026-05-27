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

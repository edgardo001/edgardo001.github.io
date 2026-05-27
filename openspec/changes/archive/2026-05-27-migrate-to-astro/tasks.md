## 1. Setup e Inicialización de Astro

- [x] 1.1 Crear el archivo `package.json` con las dependencias de Astro
- [x] 1.2 Crear el archivo `astro.config.mjs` de configuración
- [x] 1.3 Ejecutar `npm install` para instalar dependencias de Astro

## 2. Layout y Estilos Globales

- [x] 2.1 Migrar la hoja de estilos original a `src/styles/global.css`
- [x] 2.2 Crear `src/layouts/Layout.astro` con metadatos SEO, fuentes, analytics y script síncrono para inicialización de tema libre de parpadeo

## 3. Componentes Modulares

- [x] 3.1 Crear `src/components/Navbar.astro` con barra de navegación, menú hamburguesa y botón de selector de tema
- [x] 3.2 Crear `src/components/Hero.astro` con presentación y links a LinkedIn y consultoría
- [x] 3.3 Crear `src/components/Kpi.astro` con las tarjetas de impacto
- [x] 3.4 Crear `src/components/Saas.astro` con los logros en desarrollo de productos críticos
- [x] 3.5 Crear `src/components/Skills.astro` con la matriz de habilidades y script del lado del cliente para filtrado interactivo con animaciones
- [x] 3.6 Crear `src/components/Trajectory.astro` con experiencia laboral, educación y certificaciones
- [x] 3.7 Crear `src/components/Contact.astro` con formulario de contacto y lógica de redirección a WhatsApp Web
- [x] 3.8 Crear `src/components/Footer.astro` con links y copyright

## 4. Ensamblado de Página y Recursos

- [x] 4.1 Crear `src/pages/index.astro` importando y organizando todos los componentes modulares
- [x] 4.2 Asegurar que la imagen `mpedf3pv-img.jpg` esté ubicada en `public/` para que sea servida correctamente

## 5. Verificación y Limpieza

- [x] 5.1 Ejecutar `npm run build` para validar la compilación estática de Astro
- [x] 5.2 Eliminar los archivos estáticos obsoletos: `index.html`, `styles.css` y `main.js`

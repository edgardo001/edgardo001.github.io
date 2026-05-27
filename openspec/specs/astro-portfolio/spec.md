# astro-portfolio Specification

## Purpose
TBD - created by archiving change migrate-to-astro. Update Purpose after archive.
## Requirements
### Requirement: Astro Project Foundation
El sistema de compilación de Astro SHALL generar un build estático sin errores y permitir la ejecución del servidor de desarrollo con soporte de hot reloading.

#### Scenario: Successful build of static portfolio
- **WHEN** el comando `npm run build` es ejecutado
- **THEN** Astro compila correctamente el proyecto y genera los archivos HTML y CSS estáticos en el directorio `dist/`

### Requirement: Theme Toggle and Storage Persistence
El sistema de cambio de tema SHALL inicializar el tema (claro/oscuro) de forma inmediata durante el procesamiento del documento para prevenir parpadeos visuales (flashing), y SHALL persistir la preferencia del usuario en el almacenamiento local.

#### Scenario: Initializing and persisting theme preference
- **WHEN** un usuario visita la página o presiona el botón de cambio de tema
- **THEN** el tema de la aplicación cambia instantáneamente, actualiza el atributo `data-theme` en el elemento raíz del DOM y almacena la selección en el `localStorage` del navegador

### Requirement: Skills Matrix Filtering
La matriz de habilidades SHALL filtrar dinámicamente las tarjetas de habilidades visibles basándose en la categoría seleccionada por el usuario, aplicando una animación suave de desvanecimiento (fade-in) para las tarjetas activadas.

#### Scenario: Filter skill cards by category
- **WHEN** el usuario hace clic en el botón de filtro de una categoría específica (ej. 'liderazgo')
- **THEN** el sistema oculta las tarjetas que no pertenecen a esa categoría y muestra únicamente las correspondientes aplicando la animación `fadeIn`

### Requirement: Contact Form WhatsApp Redirect
El formulario de contacto SHALL capturar el nombre, asunto y mensaje, codificar estos valores en formato URI y redirigir al usuario en una nueva pestaña a la plataforma de WhatsApp Web con el mensaje pre-configurado.

#### Scenario: Submit contact form to WhatsApp
- **WHEN** el usuario envía el formulario con datos válidos
- **THEN** el sistema abre una nueva ventana/pestaña en el navegador apuntando al dominio `wa.me` con los parámetros correspondientes


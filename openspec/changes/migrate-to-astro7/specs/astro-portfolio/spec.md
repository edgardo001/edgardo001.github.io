# astro-portfolio Specification (Delta)

## MODIFIED Requirements

### Requirement: Astro Project Foundation
El sistema de compilación de Astro **v7.x** SHALL generar un build estático sin errores y permitir la ejecución del servidor de desarrollo con soporte de hot reloading. El compilador Rust SHALL validar estrictamente el markup sin autocorrección de HTML inválido.

#### Scenario: Successful build of static portfolio
- **WHEN** el comando `npm run build` es ejecutado
- **THEN** Astro compila correctamente el proyecto y genera los archivos HTML y CSS estáticos en el directorio `dist/`

#### Scenario: Rust compiler validates markup strictly
- **WHEN** el build se ejecuta con el compilador Rust de Astro 7
- **THEN** cualquier tag HTML no cerrado o markup inválido produce un error de compilación con ubicación exacta (archivo:línea)

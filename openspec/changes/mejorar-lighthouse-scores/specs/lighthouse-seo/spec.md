## ADDED Requirements

### Requirement: robots.txt debe ser válido
El archivo robots.txt SHALL contener solo directivas estándar reconocidas por el protocolo de exclusión de robots.

#### Scenario: robots.txt con directivas estándar
- **WHEN** un crawler solicita `/robots.txt`
- **THEN** el archivo contiene solo directivas `User-agent`, `Allow`, `Disallow` y `Sitemap`
- **AND** no contiene directivas no estándar como `Content-Signal`

#### Scenario: Bloqueo de bots de IA
- **WHEN** `GPTBot`, `ClaudeBot`, `Google-Extended` o `CCBot` solicitan el sitio
- **THEN** reciben `Disallow: /`
- **AND** bots legítimos como `Googlebot` tienen `Allow: /`

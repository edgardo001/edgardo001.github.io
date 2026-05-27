## ADDED Requirements

### Requirement: Jerarquía de encabezados sin saltos de nivel
La página SHALL mantener una jerarquía de encabezados secuencial sin saltar niveles (no h2→h4 ni h2→h5).

#### Scenario: Skills cards usan h3
- **WHEN** se renderizan las skill cards en la sección "Matriz de Habilidades"
- **THEN** los títulos de cada card usan `<h3>` (no `<h4>`)
- **AND** el selector CSS usa `.skill-card h3`

#### Scenario: Contact methods usan h4
- **WHEN** se renderizan los métodos de contacto (WhatsApp, Email)
- **THEN** los títulos usan `<h4>` (no `<h5>`)
- **AND** el selector CSS usa `.contact-method-text h4`

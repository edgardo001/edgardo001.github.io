import re

with open('src/components/Projects.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# Modify Mueblería Ledezmaze description
content = content.replace(
    'Sitio de presentación profesional para maestro mueblista con 30+ años de experiencia. Galería de trabajos, sección "Conoce al Maestro" y contacto vía WhatsApp con animaciones scroll y contador de estadísticas.',
    'Sitio de presentación profesional para maestro mueblista con 30+ años de experiencia. Galería de trabajos, sección "Conoce al Maestro" y contacto vía WhatsApp con animaciones scroll y contador de estadísticas. Desarrollado como parte del servicio de Landing Page SPA para MicroPYMEs. Diseño + desarrollo completo, WhatsApp integrado y hosting gratuito.'
)

# Find all project cards
card_pattern = re.compile(r'(<!-- .*? -->\s*<div class="project-card">.*?</div>\s*</div>)', re.DOTALL)
# Wait, the closing div of project-card is complicated because it has nested divs.
# Let's write a better parser.

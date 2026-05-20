// Smooth scroll effect on navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Responsive Hamburger Menu
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close hamburger menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Keyframe animation for skill card fade-in
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(styleSheet);

// Interactive Habilidades Matrix Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        skillCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (filterValue === 'all' || cardCategory === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.4s ease-out forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

const initialTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

htmlElement.setAttribute('data-theme', initialTheme);

themeToggle.addEventListener('click', () => {
    const isLight = htmlElement.getAttribute('data-theme') === 'light';
    const newTheme = isLight ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Contact form → WhatsApp redirect
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    const subject = document.getElementById('form-subject').value;
    const message = document.getElementById('form-message').value;

    const rawMessage = `Hola Edgardo,\n\nMi nombre es ${name}.\nMe comunico para consultar sobre: *${subject}*.\n\n*Detalles del Proyecto:*\n${message}`;
    const encodedText = encodeURIComponent(rawMessage);

    const whatsappUrl = `https://wa.me/+56999219760?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
});

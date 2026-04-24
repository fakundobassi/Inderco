document.addEventListener("DOMContentLoaded", () => {

    // 1. Menú móvil — hamburguesa
    const menuToggle = document.getElementById('menu-toggle');
    const menuNavegacion = document.getElementById('menu-navegacion');

    if (menuToggle && menuNavegacion) {

        // Abrir/cerrar menú principal
        menuToggle.addEventListener('click', () => {
            menuNavegacion.classList.toggle('activo');
        });

        // Toggle de submenús en móvil
        document.querySelectorAll('.dropdown > a').forEach(dropdownLink => {
            dropdownLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 900) {
                    e.preventDefault();
                    e.stopPropagation();
                    const dropdown = dropdownLink.parentElement;
                    // Cierra otros dropdowns abiertos
                    document.querySelectorAll('.dropdown').forEach(d => {
                        if (d !== dropdown) d.classList.remove('activo');
                    });
                    dropdown.classList.toggle('activo');
                }
            });
        });

        // Cierra el menú al tocar un enlace final (no dropdown)
        document.querySelectorAll('.submenu a, .menu-navegacion > li:not(.dropdown) > a').forEach(enlace => {
            enlace.addEventListener('click', () => {
                menuNavegacion.classList.remove('activo');
                document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('activo'));
            });
        });
    }

    // 2. Sombra en navbar al hacer scroll
    const cabecera = document.getElementById('cabecera');
    if (cabecera) {
        window.addEventListener('scroll', () => {
            cabecera.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // 3. Formulario de contacto (solo si existe en la página)
    const form = document.getElementById('form-contacto');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Gracias por su consulta. Un representante de INDERCO S.A. se pondrá en contacto a la brevedad.');
            form.reset();
        });
    }
});

// Carrusel
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const indicadores = document.querySelectorAll('.indicador');

function mostrarSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicadores.forEach(ind => ind.classList.remove('active'));
    if (slides[index]) slides[index].classList.add('active');
    if (indicadores[index]) indicadores[index].classList.add('active');
}

function cambiarSlide(n) {
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    mostrarSlide(slideIndex);
}

function irASlide(n) {
    slideIndex = n;
    mostrarSlide(slideIndex);
}

if (slides.length > 0) {
    mostrarSlide(slideIndex);
    let autoPlay = setInterval(() => cambiarSlide(1), 5000);
    const carrusel = document.querySelector('.carrusel');
    if (carrusel) {
        carrusel.addEventListener('mouseenter', () => clearInterval(autoPlay));
        carrusel.addEventListener('mouseleave', () => {
            autoPlay = setInterval(() => cambiarSlide(1), 5000);
        });
    }
}

// AOS (solo si está disponible)
if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true, offset: 100 });
}

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById('menu-toggle');
    const menuNavegacion = document.getElementById('menu-navegacion');

    if (menuToggle && menuNavegacion) {

        menuToggle.addEventListener('click', function() {
            menuNavegacion.classList.toggle('activo');
        });

        // Submenú en móvil
        var dropdownLinks = document.querySelectorAll('.dropdown > a');
        dropdownLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    var dropdown = link.parentElement;
                    var abierto = dropdown.classList.contains('activo');
                    document.querySelectorAll('.dropdown').forEach(function(d) {
                        d.classList.remove('activo');
                    });
                    if (!abierto) {
                        dropdown.classList.add('activo');
                    }
                }
            });
        });

        // Cerrar al tocar enlace final
        var enlacesCierre = document.querySelectorAll('.submenu a, .menu-navegacion > li:not(.dropdown) > a');
        enlacesCierre.forEach(function(enlace) {
            enlace.addEventListener('click', function() {
                menuNavegacion.classList.remove('activo');
                document.querySelectorAll('.dropdown').forEach(function(d) {
                    d.classList.remove('activo');
                });
            });
        });
    }

    // Sombra navbar en scroll
    var cabecera = document.getElementById('cabecera');
    if (cabecera) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                cabecera.classList.add('scrolled');
            } else {
                cabecera.classList.remove('scrolled');
            }
        });
    }

    // Formulario
    var form = document.getElementById('form-contacto');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Gracias por su consulta. Un representante de INDERCO S.A. se pondrá en contacto a la brevedad.');
            form.reset();
        });
    }
});

// Carrusel
var slideIndex = 0;
var slides = document.querySelectorAll('.slide');
var indicadores = document.querySelectorAll('.indicador');

function mostrarSlide(index) {
    slides.forEach(function(s) { s.classList.remove('active'); });
    indicadores.forEach(function(i) { i.classList.remove('active'); });
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
    var autoPlay = setInterval(function() { cambiarSlide(1); }, 5000);
    var carrusel = document.querySelector('.carrusel');
    if (carrusel) {
        carrusel.addEventListener('mouseenter', function() { clearInterval(autoPlay); });
        carrusel.addEventListener('mouseleave', function() {
            autoPlay = setInterval(function() { cambiarSlide(1); }, 5000);
        });
    }
}

if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true, offset: 100 });
}

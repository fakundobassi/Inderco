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

function crearCarrusel(imagenes, altText) {
    var wrap = document.createElement('div');
    wrap.className = 'prod-carrusel';

    imagenes.forEach(function (src, i) {
        var slide = document.createElement('div');
        slide.className = 'prod-carrusel-slide' + (i === 0 ? ' activo' : '');
        var img = document.createElement('img');
        img.src = src;
        img.alt = altText || '';
        img.loading = 'lazy';
        slide.appendChild(img);
        wrap.appendChild(slide);
    });

    if (imagenes.length <= 1) return wrap;

    var prevBtn = document.createElement('button');
    prevBtn.className = 'prod-carr-btn prev';
    prevBtn.innerHTML = '&#8249;';
    prevBtn.setAttribute('aria-label', 'Anterior');

    var nextBtn = document.createElement('button');
    nextBtn.className = 'prod-carr-btn next';
    nextBtn.innerHTML = '&#8250;';
    nextBtn.setAttribute('aria-label', 'Siguiente');

    var dotsDiv = document.createElement('div');
    dotsDiv.className = 'prod-carr-dots';

    var allSlides = wrap.querySelectorAll('.prod-carrusel-slide');
    var dots = [];
    imagenes.forEach(function (_, i) {
        var dot = document.createElement('span');
        dot.className = 'prod-carr-dot' + (i === 0 ? ' activo' : '');
        dots.push(dot);
        dotsDiv.appendChild(dot);
    });

    wrap.appendChild(prevBtn);
    wrap.appendChild(nextBtn);
    wrap.appendChild(dotsDiv);

    var current = 0;

    function irA(n) {
        allSlides[current].classList.remove('activo');
        dots[current].classList.remove('activo');
        current = (n + imagenes.length) % imagenes.length;
        allSlides[current].classList.add('activo');
        dots[current].classList.add('activo');
    }

    prevBtn.addEventListener('click', function (e) { e.stopPropagation(); irA(current - 1); });
    nextBtn.addEventListener('click', function (e) { e.stopPropagation(); irA(current + 1); });
    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function (e) { e.stopPropagation(); irA(i); });
    });

    return wrap;
}

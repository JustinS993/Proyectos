/**
 * KOPPEE - Coffee Shop Website JavaScript
 * =============================================
 * Este archivo contiene todas las funcionalidades JavaScript
 * necesarias para el sitio web de la cafetería KOPPEE
 */

(function ($) {
    "use strict";

    /**
     * Inicialización de Componentes
     * =============================
     */
    $(document).ready(function () {
        initializeNavbar();
        initializeBackToTop();
        initializeDateTimePickers();
        initializeTestimonialsCarousel();
    });

    /**
     * Navegación
     * ==========
     * Maneja el comportamiento del menú desplegable en hover
     */
    function initializeNavbar() {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown')
                    .on('mouseover', function () {
                        $('.dropdown-toggle', this).trigger('click');
                    })
                    .on('mouseout', function () {
                        $('.dropdown-toggle', this).trigger('click').blur();
                    });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }

        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    }

    /**
     * Botón Volver Arriba
     * ===================
     * Maneja la visibilidad y funcionalidad del botón
     */
    function initializeBackToTop() {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.back-to-top').fadeIn('slow');
            } else {
                $('.back-to-top').fadeOut('slow');
            }
        });

        $('.back-to-top').click(function () {
            $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
            return false;
        });
    }

    /**
     * Selectores de Fecha y Hora
     * ==========================
     * Inicializa los componentes de fecha y hora
     */
    function initializeDateTimePickers() {
        $('.date').datetimepicker({
            format: 'L' // Formato largo de fecha
        });
        
        $('.time').datetimepicker({
            format: 'LT' // Formato largo de hora
        });
    }

    /**
     * Carrusel de Testimonios
     * =======================
     * Configura el carrusel de testimonios con Owl Carousel
     */
    function initializeTestimonialsCarousel() {
        $(".testimonial-carousel").owlCarousel({
            autoplay: true,      // Reproducción automática
            smartSpeed: 1500,    // Velocidad de transición
            margin: 30,          // Margen entre elementos
            dots: true,          // Mostrar indicadores
            loop: true,          // Bucle infinito
            center: true,        // Centrar elementos
            responsive: {
                0: { items: 1 },     // Móvil
                576: { items: 1 },    // Móvil horizontal
                768: { items: 2 },    // Tablet
                992: { items: 3 }     // Desktop
            }
        });
    }

})(jQuery);


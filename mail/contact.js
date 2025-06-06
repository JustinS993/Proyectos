/**
 * KOPPEE - Manejador del Formulario de Contacto
 * ============================================
 * Este archivo gestiona la validación y envío del formulario de contacto,
 * incluyendo el manejo de respuestas y mensajes de estado.
 */

$(function () {
    // Constantes para mensajes
    const MESSAGES = {
        success: "¡Tu mensaje ha sido enviado exitosamente!",
        error: "Lo sentimos, parece que nuestro servidor no está respondiendo. Por favor, inténtalo más tarde."
    };

    // Constantes para selectores
    const SELECTORS = {
        form: '#contactForm',
        inputs: '#contactForm input, #contactForm textarea',
        submitButton: '#sendMessageButton',
        successContainer: '#success',
        nameInput: '#name'
    };

    /**
     * Inicialización de la validación del formulario
     */
    $(SELECTORS.inputs).jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // Espacio para manejar errores de validación específicos si es necesario
        },
        submitSuccess: handleFormSubmit,
        filter: function () {
            return $(this).is(':visible');
        }
    });

    /**
     * Maneja el envío del formulario
     * @param {jQuery} $form - El formulario jQuery
     * @param {Event} event - El evento de envío
     */
    function handleFormSubmit($form, event) {
        event.preventDefault();

        // Recolectar datos del formulario
        const formData = {
            name: $('input#name').val(),
            email: $('input#email').val(),
            subject: $('input#subject').val(),
            message: $('textarea#message').val()
        };

        const $submitButton = $(SELECTORS.submitButton);
        $submitButton.prop('disabled', true);

        // Enviar datos al servidor
        $.ajax({
            url: 'contact.php',
            type: 'POST',
            data: formData,
            cache: false,
            success: () => showResponseMessage('success', MESSAGES.success),
            error: () => showResponseMessage('danger', MESSAGES.error, formData.name),
            complete: () => resetSubmitButton($submitButton)
        });
    }

    /**
     * Muestra un mensaje de respuesta al usuario
     * @param {string} type - Tipo de mensaje ('success' o 'danger')
     * @param {string} message - Mensaje a mostrar
     * @param {string} [name] - Nombre del usuario (opcional)
     */
    function showResponseMessage(type, message, name = '') {
        const $success = $(SELECTORS.successContainer);
        const alertClass = `alert-${type}`;
        const fullMessage = name ? `${name}, ${message}` : message;

        $success.html(`
            <div class='alert ${alertClass}'>
                <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
                <strong>${fullMessage}</strong>
            </div>
        `);

        $(SELECTORS.form).trigger('reset');
    }

    /**
     * Restablece el estado del botón de envío
     * @param {jQuery} $button - El botón jQuery
     */
    function resetSubmitButton($button) {
        setTimeout(() => {
            $button.prop('disabled', false);
        }, 1000);
    }

    // Event Handlers
    $('a[data-toggle="tab"]').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    // Limpiar mensajes al enfocar el campo de nombre
    $(SELECTORS.nameInput).focus(function () {
        $(SELECTORS.successContainer).html('');
    });
});

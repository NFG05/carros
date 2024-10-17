document.addEventListener('DOMContentLoaded', function() {
    // Función para manejar los sliders
    function setupSlider(sliderContainer) {
        const slides = sliderContainer.querySelectorAll('.slide, img');
        const prevBtn = sliderContainer.querySelector('.prev');
        const nextBtn = sliderContainer.querySelector('.next');
        let currentSlide = 0;

        function showSlide(n) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
        }

        // Iniciar el slider
        showSlide(0);
    }

    // Configurar el slider principal
    const mainSlider = document.querySelector('.main-slider');
    if (mainSlider) {
        const mainSlides = mainSlider.querySelectorAll('.slide');
        const mainPrevBtn = mainSlider.querySelector('.prev');
        const mainNextBtn = mainSlider.querySelector('.next');
        let mainCurrentSlide = 0;

        function showMainSlide(n) {
            mainSlides[mainCurrentSlide].classList.remove('active');
            mainCurrentSlide = (n + mainSlides.length) % mainSlides.length;
            mainSlides[mainCurrentSlide].classList.add('active');
        }

        function nextMainSlide() {
            showMainSlide(mainCurrentSlide + 1);
        }

        function prevMainSlide() {
            showMainSlide(mainCurrentSlide - 1);
        }

        if (mainPrevBtn && mainNextBtn) {
            mainPrevBtn.addEventListener('click', prevMainSlide);
            mainNextBtn.addEventListener('click', nextMainSlide);
        }

        // Iniciar el slider principal
        showMainSlide(0);
    }

    // Configurar los sliders de carros
    document.querySelectorAll('.carro-slider').forEach(setupSlider);

    // Modal de reserva
    const modal = document.getElementById('reserva-modal');
    const reservarBtns = document.querySelectorAll('.reservar-btn');
    const closeBtn = document.querySelector('.close');
    const reservaForm = document.getElementById('reserva-form');

    reservarBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modelo = this.getAttribute('data-modelo');
            const precio = this.getAttribute('data-precio');
            const imagen = this.closest('.carro').querySelector('img.active').src;

            document.getElementById('reserva-imagen').src = imagen;
            document.getElementById('reserva-modelo').textContent = `Modelo: ${modelo}`;
            document.getElementById('reserva-precio').textContent = `Precio: $${precio}`;

            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        resetForm();
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            resetForm();
        }
    });

    // Validación y envío del formulario de reserva
    reservaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulación de proceso de reserva
            showLoadingOverlay();
            
            setTimeout(() => {
                hideLoadingOverlay();
                showSuccessMessage();
                resetForm();
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 3000);
            }, 2000);
        }
    });

    function validateForm() {
        const inputs = reservaForm.querySelectorAll('input');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                showError(input, input.validationMessage);
                isValid = false;
            } else {
                clearError(input);
            }
        });

        return isValid;
    }

    function showError(input, message) {
        clearError(input);
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        input.parentNode.appendChild(errorElement);
        input.classList.add('invalid');
    }

    function clearError(input) {
        const errorElement = input.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        input.classList.remove('invalid');
    }

    function resetForm() {
        reservaForm.reset();
        const errorMessages = reservaForm.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        const invalidInputs = reservaForm.querySelectorAll('.invalid');
        invalidInputs.forEach(input => input.classList.remove('invalid'));
    }

    function showLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(overlay);
    }

    function hideLoadingOverlay() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.remove();
        }
    }

    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.id = 'success-message';
        successMessage.textContent = '¡Reserva realizada con éxito! Nos pondremos en contacto contigo pronto para confirmar los detalles.';
        modal.querySelector('.modal-content').appendChild(successMessage);
    }

    // Validación en tiempo real
    reservaForm.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                clearError(this);
            }
        });
    });
});
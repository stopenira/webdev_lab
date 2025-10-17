/**
 * Українська традиція - Main JavaScript
 * Features: Mobile menu toggle, form validation
 */

// ======================================
// Mobile Menu Toggle
// ======================================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Update aria-label for accessibility
            const isActive = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-label', isActive ? 'Закрити меню' : 'Відкрити меню');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-label', 'Відкрити меню');
            }
        });
    }
});

// ======================================
// Form Validation
// ======================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Remove previous error states
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => group.classList.remove('error'));

        let isValid = true;

        // Validate Name
        const nameInput = document.getElementById('name');
        if (!nameInput.value.trim()) {
            showError(nameInput, "Будь ласка, введіть ваше ім'я");
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showError(nameInput, "Ім'я повинно містити мінімум 2 символи");
            isValid = false;
        }

        // Validate Email
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            showError(emailInput, "Будь ласка, введіть email адресу");
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, "Будь ласка, введіть коректну email адресу");
            isValid = false;
        }

        // Validate Phone (optional, but if filled - must be valid)
        const phoneInput = document.getElementById('phone');
        if (phoneInput.value.trim()) {
            const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,6}$/;
            if (!phoneRegex.test(phoneInput.value.trim().replace(/\s/g, ''))) {
                showError(phoneInput, "Будь ласка, введіть коректний номер телефону");
                isValid = false;
            }
        }

        // Validate Subject
        const subjectSelect = document.getElementById('subject');
        if (!subjectSelect.value) {
            showError(subjectSelect, "Будь ласка, оберіть тему звернення");
            isValid = false;
        }

        // Validate Message
        const messageTextarea = document.getElementById('message');
        if (!messageTextarea.value.trim()) {
            showError(messageTextarea, "Будь ласка, введіть ваше повідомлення");
            isValid = false;
        } else if (messageTextarea.value.trim().length < 10) {
            showError(messageTextarea, "Повідомлення повинно містити мінімум 10 символів");
            isValid = false;
        }

        // If all validations pass
        if (isValid) {
            // Show success message
            const formSuccess = document.getElementById('formSuccess');
            if (formSuccess) {
                formSuccess.style.display = 'block';
                contactForm.style.display = 'none';

                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Log form data (in real app, this would be sent to server)
                console.log('Form submitted successfully with data:', {
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    phone: phoneInput.value.trim(),
                    subject: subjectSelect.value,
                    message: messageTextarea.value.trim()
                });

                // Reset form
                contactForm.reset();
            }
        } else {
            // Scroll to first error
            const firstError = contactForm.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Real-time validation on input
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            // Remove error state when user starts typing
            const formGroup = this.closest('.form-group');
            if (formGroup && formGroup.classList.contains('error')) {
                formGroup.classList.remove('error');
            }
        });
    });
}

/**
 * Show error for a specific field
 * @param {HTMLElement} field - The input field
 * @param {string} message - Error message to display
 */
function showError(field, message) {
    const formGroup = field.closest('.form-group');
    if (formGroup) {
        formGroup.classList.add('error');
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage && message) {
            errorMessage.textContent = message;
        }
    }
}

/**
 * Validate individual field
 * @param {HTMLElement} field - The input field to validate
 */
function validateField(field) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;

    formGroup.classList.remove('error');

    switch (field.id) {
        case 'name':
            if (!field.value.trim()) {
                showError(field, "Будь ласка, введіть ваше ім'я");
            } else if (field.value.trim().length < 2) {
                showError(field, "Ім'я повинно містити мінімум 2 символи");
            }
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!field.value.trim()) {
                showError(field, "Будь ласка, введіть email адресу");
            } else if (!emailRegex.test(field.value.trim())) {
                showError(field, "Будь ласка, введіть коректну email адресу");
            }
            break;

        case 'phone':
            if (field.value.trim()) {
                const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,6}$/;
                if (!phoneRegex.test(field.value.trim().replace(/\s/g, ''))) {
                    showError(field, "Будь ласка, введіть коректний номер телефону");
                }
            }
            break;

        case 'subject':
            if (!field.value) {
                showError(field, "Будь ласка, оберіть тему звернення");
            }
            break;

        case 'message':
            if (!field.value.trim()) {
                showError(field, "Будь ласка, введіть ваше повідомлення");
            } else if (field.value.trim().length < 10) {
                showError(field, "Повідомлення повинно містити мінімум 10 символів");
            }
            break;
    }
}

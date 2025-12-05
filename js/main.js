document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initThemeSwitcher();
    initCurrentDate();
    initAccordion();
    initRecipeCardManipulation();
    initDynamicContent();
    initNavHighlight();
    initFontSizeControl();
    initFormValidation();
});

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-label', isActive ? 'Закрити меню' : 'Відкрити меню');
        });

        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-label', 'Відкрити меню');
            }
        });
    }
}

function initThemeSwitcher() {
    const themeSwitcher = document.getElementById('theme-switcher');

    if (themeSwitcher) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeSwitcher.checked = true;
        }

        themeSwitcher.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

function initCurrentDate() {
    const footer = document.querySelector('footer .footer-container');
    if (footer) {
        const dateElement = document.createElement('p');
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString('uk-UA', options);
        dateElement.textContent = `Сьогодні: ${formattedDate}`;
        dateElement.style.fontSize = '0.9rem';
        dateElement.style.color = 'var(--color-gray)';
        footer.appendChild(dateElement);
    }
}

function initAccordion() {
    const aboutSection = document.querySelector('.about-preview');
    if (aboutSection) {
        const paragraphs = aboutSection.querySelectorAll('p');
        if (paragraphs.length > 1) {
            const hiddenContent = document.createElement('div');
            hiddenContent.className = 'accordion-content';
            hiddenContent.style.display = 'none';
            hiddenContent.style.marginTop = '1rem';

            for (let i = 1; i < paragraphs.length; i++) {
                hiddenContent.appendChild(paragraphs[i].cloneNode(true));
            }

            for (let i = paragraphs.length - 1; i > 0; i--) {
                paragraphs[i].remove();
            }

            const toggleButton = document.createElement('button');
            toggleButton.textContent = 'Показати більше';
            toggleButton.className = 'btn btn-secondary';
            toggleButton.style.lineHeight = '1.6';

            aboutSection.insertBefore(toggleButton, aboutSection.querySelector('.btn'));
            aboutSection.insertBefore(hiddenContent, aboutSection.querySelector('.btn'));

            toggleButton.addEventListener('click', function() {
                if (hiddenContent.style.display === 'none') {
                    hiddenContent.style.display = 'block';
                    toggleButton.textContent = 'Показати менше';
                } else {
                    hiddenContent.style.display = 'none';
                    toggleButton.textContent = 'Показати більше';
                }
            });
        }
    }
}

function initRecipeCardManipulation() {
    const recipeCards = document.querySelectorAll('.recipe-card');
    if (recipeCards.length > 0) {
        recipeCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                if (document.body.classList.contains('dark-theme')) {
                    this.style.backgroundColor = '#3a3a3a';
                } else {
                    this.style.backgroundColor = '#fffbf0';
                }
            });

            card.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
        });
    }
}

function initDynamicContent() {
    const main = document.querySelector('main');
    const popularSection = document.querySelector('.popular-recipes');

    if (main && popularSection) {
        const dynamicParagraph = document.createElement('p');
        dynamicParagraph.textContent = 'Наша колекція рецептів постійно оновлюється. Слідкуйте за новинками!';
        dynamicParagraph.className = 'dynamic-info';
        main.appendChild(dynamicParagraph);
    }
}

function initNavHighlight() {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.classList.add('nav-highlight');
            }
        });

        link.addEventListener('mouseleave', function() {
            this.classList.remove('nav-highlight');
        });
    });
}

function initFontSizeControl() {
    let currentFontSize = 100;
    const minFontSize = 80;
    const maxFontSize = 140;

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (currentFontSize < maxFontSize) {
                currentFontSize += 10;
                document.body.style.fontSize = currentFontSize + '%';
            }
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (currentFontSize > minFontSize) {
                currentFontSize -= 10;
                document.body.style.fontSize = currentFontSize + '%';
            }
        }
    });
}

function initFormValidation() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        const savedName = localStorage.getItem('userName');
        const nameInput = document.getElementById('name');

        if (savedName && nameInput) {
            nameInput.value = savedName;
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach(group => group.classList.remove('error'));

            let isValid = true;

            if (!nameInput.value.trim()) {
                showError(nameInput, "Будь ласка, введіть ваше ім'я");
                isValid = false;
            } else if (nameInput.value.trim().length < 3) {
                showError(nameInput, "Ім'я повинно містити мінімум 3 символи");
                isValid = false;
            }

            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                showError(emailInput, "Будь ласка, введіть email адресу");
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, "Будь ласка, введіть коректну email адресу");
                isValid = false;
            }

            const phoneInput = document.getElementById('phone');
            if (phoneInput.value.trim()) {
                const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,6}$/;
                if (!phoneRegex.test(phoneInput.value.trim().replace(/\s/g, ''))) {
                    showError(phoneInput, "Будь ласка, введіть коректний номер телефону");
                    isValid = false;
                }
            }

            const subjectSelect = document.getElementById('subject');
            if (!subjectSelect.value) {
                showError(subjectSelect, "Будь ласка, оберіть тему звернення");
                isValid = false;
            }

            const messageTextarea = document.getElementById('message');
            if (!messageTextarea.value.trim()) {
                showError(messageTextarea, "Будь ласка, введіть ваше повідомлення");
                isValid = false;
            } else if (messageTextarea.value.trim().length < 10) {
                showError(messageTextarea, "Повідомлення повинно містити мінімум 10 символів");
                isValid = false;
            }

            if (isValid) {
                localStorage.setItem('userName', nameInput.value.trim());

                const formSuccess = document.getElementById('formSuccess');
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                    contactForm.style.display = 'none';
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    console.log('Form submitted successfully with data:', {
                        name: nameInput.value.trim(),
                        email: emailInput.value.trim(),
                        phone: phoneInput.value.trim(),
                        subject: subjectSelect.value,
                        message: messageTextarea.value.trim()
                    });

                    contactForm.reset();
                }
            } else {
                const firstError = contactForm.querySelector('.form-group.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });

        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                const formGroup = this.closest('.form-group');
                if (formGroup && formGroup.classList.contains('error')) {
                    formGroup.classList.remove('error');
                }
            });
        });
    }
}

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

function validateField(field) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;

    formGroup.classList.remove('error');

    switch (field.id) {
        case 'name':
            if (!field.value.trim()) {
                showError(field, "Будь ласка, введіть ваше ім'я");
            } else if (field.value.trim().length < 3) {
                showError(field, "Ім'я повинно містити мінімум 3 символи");
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

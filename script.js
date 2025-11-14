document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('burger-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  burger.addEventListener('click', function () {
    mobileNav.classList.toggle('active');
  });
});


// Плавная прокрутка к якорям
document.querySelectorAll('.main-nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const elementPosition = targetElement.getBoundingClientRect().top;
            const headerHeight = document.querySelector('.site-header').offsetHeight;

            window.scrollBy({
                top: elementPosition - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Плавная прокрутка для кнопок "Обсудить встречу" и "Назначить встречу"
document.querySelector('.btn-primary').addEventListener('click', function() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const elementPosition = contactSection.getBoundingClientRect().top;
        window.scrollBy({
            top: elementPosition - headerHeight,
            behavior: 'smooth'
        });
    }
});

document.querySelector('.btn-secondary').addEventListener('click', function() {
    const bookingSection = document.getElementById('services-booking'); // Ведет к секции с такси
    if (bookingSection) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const elementPosition = bookingSection.getBoundingClientRect().top;
        window.scrollBy({
            top: elementPosition - headerHeight,
            behavior: 'smooth'
        });
    }
});

// Обработка кликов по кнопкам "Заказать"
document.querySelectorAll('.btn-order').forEach(button => {
    button.addEventListener('click', function() {
        // В реальном приложении здесь может быть открытие модального окна,
        // добавление товара в корзину или переход на страницу оформления заказа.
        // Пока просто выведем сообщение.
        alert('Нажмите "Оставить заявку", чтобы мы могли связаться с вами для уточнения деталей по вашему заказу!');

        // Можно также прокрутить к форме заявки
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const headerHeight = document.querySelector('.site-header').offsetHeight;
            const elementPosition = contactSection.getBoundingClientRect().top;
            window.scrollBy({
                top: elementPosition - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});


// Обработка отправки формы
document.querySelector('.contact-form-section form').addEventListener('submit', function(e) {
    e.preventDefault(); // Предотвращаем стандартное действие отправки формы
    alert('Заявка отправлена! (В реальном приложении данные будут обработаны сервером)');
    this.reset(); // Очищаем форму после "отправки"
});


document.addEventListener('DOMContentLoaded', () => {
    // === Маска для ввода телефона ===
    const phoneInput = document.getElementById('contact-phone');

    if (phoneInput) {
        phoneInput.addEventListener('input', (event) => {
            let value = event.target.value.replace(/\D/g, ''); // Оставляем только цифры
            let formattedValue = '';

            // Если номер начинается не с 7 или 8, добавляем 7
            if (value.length > 0 && (value[0] !== '7' && value[0] !== '8')) {
                value = '7' + value;
            }

            if (value.startsWith('8')) {
                value = '7' + value.substring(1); // Заменяем 8 на 7
            }
            
            if (value.startsWith('7')) {
                formattedValue += '+7';
                if (value.length > 1) {
                    formattedValue += ' (' + value.substring(1, 4);
                }
                if (value.length >= 5) {
                    formattedValue += ') ' + value.substring(4, 7);
                }
                if (value.length >= 8) {
                    formattedValue += '-' + value.substring(7, 9);
                }
                if (value.length >= 10) {
                    formattedValue += '-' + value.substring(9, 11);
                }
            } else {
                formattedValue = value; // Если не начинается с 7/8, оставляем как есть
            }
            
            event.target.value = formattedValue;
        });

        // Дополнительно форматируем при потере фокуса, если неполный номер
        phoneInput.addEventListener('blur', (event) => {
            let value = event.target.value.replace(/\D/g, '');
            if (value.length > 0 && value.length < 11) { // Если номер неполный, очищаем или добавляем +7 (если только 1 цифра)
                if (value.length === 1 && (value[0] === '7' || value[0] === '8')) {
                     event.target.value = '+7'; // Оставляем только +7
                } else if (value.length > 1 && value.length < 11) {
                     event.target.value = ''; // Очищаем поле, если неполный номер
                } else {
                     event.target.value = '';
                }
            }
        });

        // При фокусе, если пусто, ставим +7
        phoneInput.addEventListener('focus', (event) => {
            if (event.target.value === '') {
                event.target.value = '+7 (';
            }
        });
    }

    // === Обработка отправки форм (пример) ===

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Предотвращаем стандартную отправку формы
            const emailInput = document.getElementById('email-subscribe');
            const email = emailInput.value;

            if (email && emailInput.checkValidity()) {
                alert(`Спасибо за подписку! Ваша почта: ${email}`);
                // Здесь можно отправить данные на сервер, например, с помощью fetch API
                // fetch('/subscribe', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({ email: email }),
                // })
                // .then(response => response.json())
                // .then(data => console.log(data))
                // .catch((error) => console.error('Error:', error));
                emailInput.value = ''; // Очистить поле
            } else {
                alert('Пожалуйста, введите корректный адрес электронной почты.');
            }
        });
    }

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Предотвращаем стандартную отправку формы
            
            const name = document.getElementById('contact-name').value;
            const phone = document.getElementById('contact-phone').value;
            const privacyCheckbox = document.getElementById('privacy-checkbox');

            if (!privacyCheckbox.checked) {
                alert('Пожалуйста, примите пользовательское соглашение.');
                return;
            }

            // Дополнительная проверка на полноту номера телефона
            const cleanedPhone = phone.replace(/\D/g, '');
            if (name && cleanedPhone.length === 11) { // Проверяем, что имя не пустое и номер телефона 11 цифр (с +7)
                alert(`Заявка отправлена! Имя: ${name}, Телефон: ${phone}`);
                // Здесь также можно отправить данные на сервер
                // fetch('/submit-contact', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({ name: name, phone: phone }),
                // })
                // .then(response => response.json())
                // .then(data => console.log(data))
                // .catch((error) => console.error('Error:', error));

                document.getElementById('contact-name').value = '';
                document.getElementById('contact-phone').value = '';
                privacyCheckbox.checked = false; // Сбросить чекбокс
            } else {
                alert('Пожалуйста, заполните все поля корректно.');
            }
        });
    }
});


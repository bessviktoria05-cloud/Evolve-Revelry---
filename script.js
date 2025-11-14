document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('burger-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  burger.addEventListener('click', function () {
    mobileNav.classList.toggle('active');
  });
});
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
    const bookingSection = document.getElementById('services-booking'); 
    if (bookingSection) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const elementPosition = bookingSection.getBoundingClientRect().top;
        window.scrollBy({
            top: elementPosition - headerHeight,
            behavior: 'smooth'
        });
    }
});
document.querySelectorAll('.btn-order').forEach(button => {
    button.addEventListener('click', function() {
        alert('Нажмите "Оставить заявку", чтобы мы могли связаться с вами для уточнения деталей по вашему заказу!');
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
document.querySelector('.contact-form-section form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Заявка отправлена! (В реальном приложении данные будут обработаны сервером)');
    this.reset();
});
document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('contact-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (event) => {
            let value = event.target.value.replace(/\D/g, '');
            let formattedValue = '';
            if (value.length > 0 && (value[0] !== '7' && value[0] !== '8')) {
                value = '7' + value;
            }
            if (value.startsWith('8')) {
                value = '7' + value.substring(1); 
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
                formattedValue = value; 
            }
            event.target.value = formattedValue;
        });
        phoneInput.addEventListener('blur', (event) => {
            let value = event.target.value.replace(/\D/g, '');
            if (value.length > 0 && value.length < 11) { 
                if (value.length === 1 && (value[0] === '7' || value[0] === '8')) {
                     event.target.value = '+7'; 
                } else if (value.length > 1 && value.length < 11) {
                     event.target.value = ''; 
                } else {
                     event.target.value = '';
                }
            }
        });
        phoneInput.addEventListener('focus', (event) => {
            if (event.target.value === '') {
                event.target.value = '+7 (';
            }
        });
    }
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const emailInput = document.getElementById('email-subscribe');
            const email = emailInput.value;
            if (email && emailInput.checkValidity()) {
                alert(`Спасибо за подписку! Ваша почта: ${email}`);
                emailInput.value = ''; 
            } else {
                alert('Пожалуйста, введите корректный адрес электронной почты.');
            }
        });
    }
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            const name = document.getElementById('contact-name').value;
            const phone = document.getElementById('contact-phone').value;
            const privacyCheckbox = document.getElementById('privacy-checkbox');
            if (!privacyCheckbox.checked) {
                alert('Пожалуйста, примите пользовательское соглашение.');
                return;
            }
            const cleanedPhone = phone.replace(/\D/g, '');
            if (name && cleanedPhone.length === 11) { 
                alert(`Заявка отправлена! Имя: ${name}, Телефон: ${phone}`);
                document.getElementById('contact-name').value = '';
                document.getElementById('contact-phone').value = '';
                privacyCheckbox.checked = false; 
            } else {
                alert('Пожалуйста, заполните все поля корректно.');
            }
        });
    }
});

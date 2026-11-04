document.addEventListener('DOMContentLoaded', () => {
  // Инициализация всплывающих подсказок Bootstrap (Интерактивность #1)
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // --- 1. Валидация формы регистрации ---
  const regForm = document.getElementById('registrationForm');
  if (regForm) {
    regForm.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();

      let isValid = true;

      // Проверка совпадения паролей
      const password = document.getElementById('password');
      const confirmPassword = document.getElementById('confirmPassword');
      if (password && confirmPassword) {
        if (password.value !== confirmPassword.value || password.value.length < 8) {
          confirmPassword.setCustomValidity('Пароли не совпадают или слишком короткие.');
          document.getElementById('confirmPasswordFeedback').innerText = 'Пароли должны совпадать (мин. 8 символов).';
          isValid = false;
        } else {
          confirmPassword.setCustomValidity('');
        }
      }

      if (!regForm.checkValidity() || !isValid) {
        regForm.classList.add('was-validated');
      } else {
        regForm.classList.remove('was-validated');
        regForm.reset();
        const alertBox = document.getElementById('regSuccessAlert');
        if (alertBox) alertBox.classList.remove('d-none');
      }
    });
  }

  // --- 2. Валидация контактной формы + Защита от спама ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const captchaInput = document.getElementById('spamCheck');
      let captchaValid = true;

      // Простая капча 5 + 3 = 8
      if (captchaInput && captchaInput.value.trim() !== '8') {
        captchaInput.setCustomValidity('Неверный ответ');
        captchaValid = false;
      } else if (captchaInput) {
        captchaInput.setCustomValidity('');
      }

      if (!contactForm.checkValidity() || !captchaValid) {
        contactForm.classList.add('was-validated');
      } else {
        contactForm.classList.remove('was-validated');
        contactForm.reset();
        const alertBox = document.getElementById('contactSuccessAlert');
        if (alertBox) alertBox.classList.remove('d-none');
      }
    });
  }

  // --- 3. Интерактивность #2: Фильтрация программ (Поиск на лету) ---
  const programSearch = document.getElementById('programSearch');
  if (programSearch) {
    programSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const cards = document.querySelectorAll('.program-card');

      cards.forEach((card) => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const text = card.querySelector('.card-text').textContent.toLowerCase();
        if (title.includes(query) || text.includes(query)) {
          card.parentElement.style.display = 'block';
        } else {
          card.parentElement.style.display = 'none';
        }
      });
    });
  }
});
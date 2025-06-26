// Scroll to products section
const cta = document.querySelector('.cta');
if (cta) {
  cta.addEventListener('click', function(e) {
    e.preventDefault();
    const products = document.getElementById('products');
    if (products) {
      products.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

const countdown = document.getElementById('countdown');
if (countdown) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 60);
  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;
    if (diff <= 0) {
      countdown.textContent = 'Available now!';
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    countdown.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
}
// Light/Dark mode toggle
const modeToggle = document.getElementById('mode-toggle');
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (modeToggle) modeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}
if (modeToggle) {
  modeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(current === 'light' ? 'dark' : 'light');
  });
}
// On load, set theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme('light');
}

const whatsappForm = document.getElementById('whatsapp-form');
const whatsappInput = document.getElementById('whatsapp-input');
const whatsappError = document.getElementById('whatsapp-error');
const whatsappSuccess = document.getElementById('whatsapp-success');
const whatsappSubmit = document.getElementById('whatsapp-submit');

function validateWhatsAppNumber(number) {
  number = number.trim();
  const match = number.match(/^(\+91|0)?([6-9][0-9]{9})$/);
  return match ? '+91' + match[2] : false;
}

function showError(msg) {
  whatsappError.textContent = msg;
  whatsappSuccess.textContent = '';
}
function showSuccess(msg) {
  whatsappError.textContent = '';
  whatsappSuccess.textContent = msg;
}

if (whatsappForm) {
  whatsappInput.removeAttribute('disabled');
  whatsappInput.addEventListener('input', function () {
    const formatted = validateWhatsAppNumber(whatsappInput.value);
    if (!whatsappInput.value.trim()) {
      showError('');
      whatsappSubmit.disabled = false;
      whatsappSubmit.classList.remove('success');
      whatsappSubmit.textContent = 'Notify Me';
      return;
    }
    if (!formatted) {
      showError('Enter a valid WhatsApp number (start with +91 or 0, 10 digits)');
      whatsappSubmit.disabled = true;
    } else {
      showError('');
      whatsappSubmit.disabled = false;
    }
    whatsappSubmit.classList.remove('success');
    whatsappSubmit.textContent = 'Notify Me';
  });

  whatsappForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formatted = validateWhatsAppNumber(whatsappInput.value);
    if (!formatted) {
      showError('Enter a valid WhatsApp number (start with +91 or 0, 10 digits)');
      return;
    }

    whatsappSubmit.disabled = true;
    whatsappSubmit.textContent = 'Submitting...';

    const webhookUrl = 'https://script.google.com/macros/s/AKfycbwKqVgODS6AS7T0qYTsWM_n3MdlmpBhNbNfw-nnmYT5UbIoHqgdG32u2t5Wfn8crD5s/exec';

    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        number: formatted,
        timestamp: new Date().toISOString(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success' || data === 'OK') {
          showSuccess('🎉 You’re on the list! We’ll message you when new dog posters drop.');
          whatsappSubmit.disabled = true;
          whatsappSubmit.classList.add('success');
          whatsappSubmit.textContent = 'Registered!';
          whatsappInput.disabled = true;
        } else {
          throw new Error(data.message || 'Server error');
        }
      })
      .catch((err) => {
        console.error('Submission failed:', err);
        showError('Something went wrong. Please try again!');
        whatsappSubmit.disabled = false;
        whatsappSubmit.textContent = 'Notify Me';
      });
  });
}

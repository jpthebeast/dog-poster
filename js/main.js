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
// Countdown timer for coming soon page
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
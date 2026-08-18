const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;
let isThemeAnimating = false;

function updateThemeToggle() {
  if (!themeToggle) return;

  const isLight = root.classList.contains('light-mode');
  themeToggle.setAttribute('aria-pressed', String(isLight));
  themeToggle.setAttribute(
    'aria-label',
    isLight ? 'Switch to dark mode' : 'Switch to light mode'
  );
}

function saveTheme(theme) {
  try {
    localStorage.setItem('theme', theme);
  } catch (error) {
    return;
  }
}

function animateThemeChange(nextTheme) {
  if (!themeToggle || isThemeAnimating) return;

  isThemeAnimating = true;
  const rect = themeToggle.getBoundingClientRect();
  const wipe = document.createElement('span');

  wipe.className = 'theme-wipe';
  wipe.style.setProperty('--wipe-x', `${rect.left + rect.width / 2}px`);
  wipe.style.setProperty('--wipe-y', `${rect.top + rect.height / 2}px`);
  wipe.style.setProperty(
    '--wipe-color',
    nextTheme === 'light' ? '#f7f4ef' : '#0d0d0d'
  );

  document.body.appendChild(wipe);
  root.classList.add('theme-changing');
  themeToggle.disabled = true;

  window.setTimeout(() => {
    root.classList.toggle('light-mode', nextTheme === 'light');
    saveTheme(nextTheme);
    updateThemeToggle();
  }, 590);

  wipe.addEventListener('animationend', () => {
    wipe.remove();
    root.classList.remove('theme-changing');
    themeToggle.disabled = false;
    isThemeAnimating = false;
  }, { once: true });
}

updateThemeToggle();

themeToggle?.addEventListener('click', () => {
  const nextTheme = root.classList.contains('light-mode') ? 'dark' : 'light';
  animateThemeChange(nextTheme);
});

const menu = document.getElementById('navLinks');
const menuButton = document.getElementById('hamburger');
function setMenu(open) {
  menu.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
}
function toggleMenu() { setMenu(!menu.classList.contains('open')); }
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('open')) {
    setMenu(false);
    menuButton.focus();
  }
});
const backToTop = document.getElementById('btt');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function updateBackToTop() { backToTop.classList.toggle('show', window.scrollY > 400); }
window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' }));

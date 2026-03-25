
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top = e.clientY + 'px';
  setTimeout(() => {
    ring.style.left = e.clientX + 'px';
    ring.style.top = e.clientY + 'px';
  }, 80);
});

document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.width = '6px';
    cur.style.height = '6px';
    ring.style.width = '50px';
    ring.style.height = '50px';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.width = '12px';
    cur.style.height = '12px';
    ring.style.width = '36px';
    ring.style.height = '36px';
  });
});

const roles = ['Developer', 'Cloud Architect', 'DSA Enthusiast', 'React Dev', 'Problem Solver'];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const word = roles[ri];
  typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  if (!deleting && ci > word.length) {
    deleting = true;
    setTimeout(type, 1400);
    return;
  }
  if (deleting && ci < 0) {
    deleting = false;
    ri = (ri + 1) % roles.length;
    ci = 0;
  }
  setTimeout(type, deleting ? 60 : 90);
}
type();

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

const bttBtn = document.getElementById('btt');
window.addEventListener('scroll', () => {
  bttBtn.classList.toggle('show', window.scrollY > 400);
});
bttBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  let valid = true;

  const name = document.getElementById('cf-name');
  const email = document.getElementById('cf-email');
  const subject = document.getElementById('cf-subject');
  const msg = document.getElementById('cf-msg');

  const showError = (id, visible) => {
    document.getElementById(id).style.display = visible ? 'block' : 'none';
  };

  // Name
  if (name.value.trim().length < 2) {
    showError('err-name', true); valid = false;
  } else { showError('err-name', false); }

  // Email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    showError('err-email', true); valid = false;
  } else { showError('err-email', false); }

  // Subject
  if (subject.value.trim().length < 3) {
    showError('err-subject', true); valid = false;
  } else { showError('err-subject', false); }

  // Message
  if (msg.value.trim().length < 20) {
    showError('err-msg', true); valid = false;
  } else { showError('err-msg', false); }

  if (valid) {
    this.reset();
    const successEl = document.getElementById('form-success');
    successEl.style.display = 'block';
    setTimeout(() => { successEl.style.display = 'none'; }, 4000);
  }
});

const fieldMap = [
  ['cf-name', 'err-name'],
  ['cf-email', 'err-email'],
  ['cf-subject', 'err-subject'],
  ['cf-msg', 'err-msg'],
];
fieldMap.forEach(([inputId, errId]) => {
  document.getElementById(inputId).addEventListener('input', () => {
    document.getElementById(errId).style.display = 'none';
  });
});

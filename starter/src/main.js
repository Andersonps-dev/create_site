import './styles.css';

document.documentElement.classList.add('js');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Banner: entrada única
const hero = document.querySelector('[data-enter]');
if (hero) requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-in')));

// Header: linha inferior ao rolar
const header = document.querySelector('[data-header]');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Menu mobile (tela cheia)
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('site-nav');
if (toggle && nav) {
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
}

// Títulos sobem palavra por palavra ao entrar na tela (uma vez)
const titles = document.querySelectorAll('h2.sec-title');
if (titles.length && !reduce && 'IntersectionObserver' in window) {
  titles.forEach((t) => {
    let n = 0;
    const walk = (node) => [...node.childNodes].forEach((ch) => {
      if (ch.nodeType === 3) {
        const frag = document.createDocumentFragment();
        ch.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(part); return; }
          const w = document.createElement('span'); w.className = 'rv-w';
          const i = document.createElement('span'); i.className = 'rv-i'; i.style.setProperty('--i', n++); i.textContent = part;
          w.append(i); frag.append(w);
        });
        ch.replaceWith(frag);
      } else if (ch.nodeType === 1 && !ch.classList.contains('nw')) walk(ch);
      else if (ch.nodeType === 1) {
        const w = document.createElement('span'); w.className = 'rv-w';
        const i = document.createElement('span'); i.className = 'rv-i'; i.style.setProperty('--i', n++);
        ch.replaceWith(w); i.append(ch); w.append(i);
      }
    });
    walk(t);
  });
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-revealed'); io.unobserve(e.target); }
  }), { threshold: 0.3 });
  titles.forEach((t) => io.observe(t));
}

// Formulário → mensagem pronta no WhatsApp (marque o form com data-wa-form)
const waForm = document.querySelector('[data-wa-form]');
waForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(waForm);
  const nome = String(f.get('nome') || '').trim();
  const det = String(f.get('detalhes') || '').trim();
  const msg = `Olá!${nome ? ` Meu nome é ${nome}.` : ''} Gostaria de um orçamento.` + (det ? `\n${det}` : '');
  window.open(`https://wa.me/${import.meta.env.VITE_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});

// Ano no rodapé
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

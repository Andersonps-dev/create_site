# Receitas de efeitos (testadas em produção)

Todas usam `--ease: cubic-bezier(.12,.77,.16,.93)`, respeitam `prefers-reduced-motion` e animam só `transform`/`opacity`/`filter`. Escolha 2 ou 3 por site, não todas.

## 1. Entrada do banner (uma vez)
```css
.js [data-enter] .hero-copy > * { opacity: 0; transform: translateY(18px); transition: opacity .9s var(--ease), transform .9s var(--ease) }
.js [data-enter].is-in .hero-copy > * { opacity: 1; transform: none }
.js [data-enter].is-in .hero-copy > :nth-child(2) { transition-delay: .08s }
```
```js
document.documentElement.classList.add('js');
const hero = document.querySelector('[data-enter]');
if (hero) requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-in')));
```

## 2. Banner preso coberto pelo conteúdo (wezom)
O banner fica `sticky`; as seções seguintes (com fundo e `z-index: 1`) sobem por cima. O banner esmaece enquanto é coberto.
```html
<div class="cover-scope"><section class="hero">…</section><div class="brand-band">…</div><section class="sec">…</section></div>
```
```css
.cover-scope { position: relative }
.cover-scope > :not(.hero) { position: relative; z-index: 1; background: var(--bg) }
@media (min-width: 901px) {
  .hero { position: sticky; top: var(--header-h); z-index: 0 }
  .hero > .container { opacity: var(--hero-o, 1); transform: translateY(var(--hero-y, 0)) }
}
```
```js
const update = () => {
  if (getComputedStyle(hero).position !== 'sticky') return;
  const p = Math.min(1, Math.max(0, scrollY / (hero.offsetHeight * .9)));
  hero.style.setProperty('--hero-o', (1 - p * .75).toFixed(3));
  hero.style.setProperty('--hero-y', `${(-p * 40).toFixed(1)}px`);
};
```
No celular, deixe o banner estático (não preso).

## 3. Faixa de marcas (marquee infinito)
Duas listas iguais lado a lado, a segunda com `aria-hidden="true"`.
```css
.marquee { display: flex; overflow: hidden; user-select: none }
.marquee-track { display: flex; flex: none; gap: 72px; padding-right: 72px; animation: marquee 32s linear infinite }
.marquee:hover .marquee-track { animation-play-state: paused }
@keyframes marquee { to { transform: translateX(-100%) } }
@media (prefers-reduced-motion: reduce) { .marquee-track { flex-wrap: wrap } .marquee-track[aria-hidden] { display: none } }
```

## 4. Cards empilhados (Case Studies do wezom)
Cada card é `sticky`; quando o próximo sobe, o anterior recua e escurece.
```css
.case { position: sticky; top: calc(var(--header-h) + 20px); transform-origin: 50% 0; transform: scale(var(--s, 1)); filter: brightness(var(--b, 1)) }
```
```js
cases.forEach((card, i) => { const next = cases[i + 1]; if (!next) return;
  const p = Math.min(1, Math.max(0, 1 - (next.getBoundingClientRect().top - card.getBoundingClientRect().top) / card.offsetHeight));
  card.style.setProperty('--s', (1 - p * .06).toFixed(4)); card.style.setProperty('--b', (1 - p * .45).toFixed(3)); });
```
Foto inteira sem corte: `object-fit: contain` e, no fundo, a própria foto desfocada (`-blur.webp` ampliado via classe, não `style` inline por causa da CSP).

## 5. Etapas ligadas à rolagem (desktop)
Wrapper alto (`height: 280svh`) com bloco `sticky` dentro; a etapa ativa e a barra de progresso (`--tp`) seguem a rolagem. Só com `(min-width: 901px) and (min-height: 700px)`. **No celular, troque por linha do tempo estática** com todas as etapas visíveis (abas presas no celular não funcionaram).

## 6. Títulos palavra por palavra
O JS envolve cada palavra em `.rv-w > .rv-i` e um IntersectionObserver adiciona `.is-revealed` (threshold .3, uma vez).
```css
.rv-w { display: inline-block; overflow: hidden; vertical-align: bottom; padding-bottom: .1em; margin-bottom: -.1em }
.rv-i { display: inline-block; transform: translateY(108%); transition: transform 1s var(--ease); transition-delay: calc(var(--i, 0) * 40ms) }
.is-revealed .rv-i { transform: none }
```
Cuidado: se o título tem `<span>` colorido, force `span:is(.rv-w,.rv-i) { color: inherit }` senão o título inteiro herda a cor.

## 7. Números que contam
`data-count="5" data-decimals="1"`; IntersectionObserver (threshold .6) anima 1,4 s com ease-out cúbico e `toLocaleString('pt-BR')`. Só números reais.

## 8. Acordeão (serviços / FAQ)
Serviços: botões com `aria-expanded`, um aberto por vez. FAQ: `<details>` nativo com animação de altura:
```css
@supports (interpolate-size: allow-keywords) {
  .faq-list { interpolate-size: allow-keywords }
  .faq details::details-content { block-size: 0; overflow: clip; transition: block-size .4s var(--ease), content-visibility .4s allow-discrete }
  .faq details[open]::details-content { block-size: auto }
}
```

## 9. Partículas no banner (canvas)
Floco de partículas que se transforma em sigla da marca (B&B). Arquivo modelo: projeto barros_brandino_site `src/hero-flake.js`. Pontos amostrados de formas (desenho em canvas oculto → pixels), desenho em lote por cor, densidade = tamanho/165, pausa fora da tela e com reduced-motion. Use quando o negócio pede um elemento "de marca" no topo e não há foto/vídeo forte.

## 10. Brilho passando no botão principal
```css
.btn-hero::after { content: ''; position: absolute; inset: 0 auto 0 0; width: 30%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent); transform: translateX(-160%) rotate(20deg); animation: shine 3.6s var(--ease) 1.2s infinite }
@keyframes shine { 0% { transform: translateX(-160%) rotate(20deg) } 45%, 100% { transform: translateX(1100%) rotate(20deg) } }
```

## Desempenho
Eventos de rolagem com `{ passive: true }` + `requestAnimationFrame` (um "ticking" por efeito). Não ler layout depois de escrever estilo no mesmo quadro.

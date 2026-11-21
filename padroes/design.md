# Padrões de design (valem para qualquer estilo)

Estes são princípios e medidas. Cores, fonte e clima mudam a cada site.

## Processo
1. Meça a referência no navegador (chrome-devtools `evaluate_script` com `getComputedStyle` / `getBoundingClientRect`): largura máxima do container, margem lateral, tamanho do H1 e dos H2, espaço entre seções, raio dos cantos, curva das transições. Não estime a olho.
2. Registre tudo como tokens em `:root` e no `DESIGN.md`.
3. Mostre ao usuário por screenshot a cada bloco. Ajustes de margem costumam ir e voltar: chegue na medida da referência.

## Tokens base (ajuste os valores por site)
```css
:root {
  --bg; --bg-soft; --ink; --text; --muted; --line;      /* neutros */
  --accent; --accent-grad;                                /* destaque (texto em destaque ≥ 4.5:1) */
  --night; --on-night; --on-night-muted;                  /* painel escuro, se houver */
  --radius-xl: 28px; --radius: 20px; --radius-sm: 12px;
  --header-h: 80px;                                       /* 64px no celular */
  --ease: cubic-bezier(.12, .77, .16, .93);               /* curva do wezom: rápida no início, assenta suave */
  --sec-y: clamp(48px, 4.2vw, 60px);                      /* espaço entre seções */
  --gutter: clamp(16px, 2.8vw, 40px);                     /* margem lateral */
  --hero-gutter: clamp(16px, 8.3vw, 120px);               /* o banner pode ter margem própria, maior */
}
.container { width: 100%; max-width: 1568px; margin-inline: auto; padding-inline: var(--gutter) }
```
Referência medida (wezom): container 1568px, margem 40px, banner com 120px.

## Layout
- Layout de ponta a ponta, sem caixa central estreita. Faixas (marquee, fotos) podem ir de borda a borda.
- Banner (hero): título grande + uma frase curta + um botão + um elemento visual forte. Pouco texto. Etiquetas de serviço em colchetes ou chips são um bom "rodapé" do banner.
- Uma ideia por seção. Seções alternando fundo claro e painel escuro dão ritmo.
- Fechamento em tela cheia com a ação principal (formulário/WhatsApp), estilo "Start growing your business" do wezom.
- Botão flutuante de contato no celular, escondido no banner e no fechamento.

## Tipografia
- Uma fonte variável (Manrope, Inter, Geist, etc.), hospedada no site, subconjunto latino.
- Títulos com `letter-spacing` negativo (-.035em), `text-wrap: balance`; parágrafos com `text-wrap: pretty`.
- Texto de apoio 16–18px, cinza (`--muted`) com contraste ≥ 4.5:1.
- Palavra que não pode quebrar (ex.: "ar-condicionado"): `<span class="nw">`.

## Acessibilidade (sempre)
- Link "Pular para o conteúdo", foco visível, menu e acordeões operáveis por teclado, `aria-expanded`/`aria-controls`.
- `[hidden]` precisa vencer o `display` do componente: `.x[hidden] { display: none }`.
- `prefers-reduced-motion`: desliga animações e mostra o conteúdo final.
- Alvos de toque ≥ 44px.

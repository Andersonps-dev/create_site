# Versão celular

A maioria dos clientes de negócio local chega pelo celular. Desenhe a versão celular à parte, depois que o desktop estiver aprovado, **sem alterar o desktop** (tudo dentro de `@media (max-width: 900px)`).

## Regras
- **Menos texto.** Esconda no celular parágrafos de apoio que repetem o título (intro de seção, descrição de card, nota do banner, aviso do formulário). O texto continua no HTML (SEO) e aparece no desktop. Meta: cerca de metade das palavras do desktop.
- Nada de efeito preso à rolagem que dependa de altura (abas presas, passo a passo com scroll): vire lista ou linha do tempo estática.
- Banner não preso; altura natural.
- Header 64px; menu em tela cheia com botão de orçamento curto ("Orçamento").
- Botão flutuante de WhatsApp, escondido no banner e na seção de contato.
- Grids viram uma coluna; cards empilhados podem continuar `sticky` com topo menor.
- Fotos: `sizes="(max-width: 900px) 92vw, 520px"`.

## Pegadinhas de celular (skill mobile-native)
- `100svh` em vez de `100vh`.
- Inputs com `font-size` ≥ 16px (senão o iPhone dá zoom).
- `-webkit-tap-highlight-color: transparent`, `touch-action: manipulation`.
- `overflow-x: clip` no body para nada vazar de lado; verifique `document.documentElement.scrollWidth === innerWidth`.
- `overscroll-behavior: contain` no menu aberto.

## Teste
chrome-devtools `emulate` com `390x844x2,mobile,touch` e `360x740x2,mobile,touch`; screenshot de cada seção; Lighthouse mobile; medir altura total da página antes e depois de enxugar.

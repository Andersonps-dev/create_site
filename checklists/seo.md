# Verificações de SEO (rodar no site publicado ou no build)

Fonte inicial: reel @jorgedaweb "20 verificações obrigatórias de SEO para o seu site criado com IA" + o que aplicamos no site Barros & Brandino.

| # | Item | Como verificar / padrão |
|---|---|---|
| 1 | sitemap.xml | Gerado no build (`vite.config.js` do starter). Inclui todas as páginas e as imagens principais. `lastmod` = data do arquivo, não do build. |
| 2 | robots.txt | `Allow: /` + linha `Sitemap:`. Gerado no build. |
| 3 | Sem noindex | `<meta name="robots" content="index, follow, max-image-preview:large">` na home. noindex só na 404 e na prévia. |
| 4 | URL canônica | `<link rel="canonical">` em toda página, com URL limpa (sem .html). |
| 5 | Título | Único por página, **até ~60 caracteres**: serviço principal + cidade + marca. |
| 6 | Meta description | 140 a 160 caracteres, com serviço, cidade e chamada para ação. |
| 7 | Um H1 por página | Com o serviço principal e a cidade. |
| 8 | Hierarquia | H1 → H2 → H3 sem pular nível. Títulos de cards = H3. |
| 9 | Alt nas imagens | Descreve a foto de verdade ("Condensadora Midea em suporte na parede"). Decorativas: `alt=""`. |
| 10 | Dados estruturados | JSON-LD: `WebSite` + tipo do negócio (`LocalBusiness` ou subtipo: `HVACBusiness`, `Dentist`, `Restaurant`…) + `FAQPage`. Validar em search.google.com/test/rich-results. FAQ na página e no JSON-LD com o mesmo texto. |
| 11 | Links internos | Entre páginas de serviço, home e contato. Página única = só âncoras; considere uma página por serviço/cidade. |
| 12 | Links quebrados | `curl` em todos os href (WhatsApp, Maps, Instagram, Google) e no 404 de URL inexistente. |
| 13 | Imagens | WebP, 2 tamanhos (480/960) com `srcset`/`sizes`, `width`/`height`, `loading="lazy"` fora da primeira tela. Nenhuma acima de ~200 KB. |
| 14 | Core Web Vitals | Trace do chrome-devtools em celular (CPU 4x, Fast 4G): LCP < 2,5 s, CLS < 0,1. |
| 15 | Responsivo | Lighthouse mobile; sem rolagem horizontal em 360px; alvos de toque ≥ 44px. |
| 16 | HTTPS | http → https (301), www → domínio principal (301), HSTS. |
| 17 | Slugs | Minúsculas, com hífen, sem acento: `/politica-de-privacidade`, `/instalacao-ar-condicionado-extrema`. |
| 18 | Imagem de compartilhamento | `og:image` 1200x630 (gerada no `build-images.mjs`), `og:title`, `og:description`, `og:url`, `twitter:card`. Testar colando o link no WhatsApp. |
| 19 | Google Search Console | Verificar domínio (arquivo `googleXXXX.html` em `public/`, nunca redirecionar esse arquivo), enviar sitemap, conferir "Páginas indexadas". |
| 20 | llms.txt | `/llms.txt` com resumo do negócio para IAs (ver `starter/public/llms.txt`). |

## Extras que já usamos
- `lang="pt-BR"`, `theme-color`, favicon 32, apple-touch-icon 180, manifest.
- SEO local: cidade no título, H1, descrição, H2 de serviços e FAQ; nome/endereço/telefone iguais ao Perfil da Empresa no Google.
- Link para o Perfil da Empresa no Google (nota) em vez de inventar `AggregateRating`.
- Política de privacidade (LGPD) com controlador, CNPJ e e-mail.
- Lighthouse: alvo 100 em Acessibilidade, Boas práticas e SEO.

## Script rápido (site publicado)
```bash
B=https://DOMINIO; for p in / /robots.txt /sitemap.xml /llms.txt /nao-existe; do curl -s -o /dev/null -w "%{http_code} $p\n" "$B$p?x=$RANDOM"; done
curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" http://DOMINIO/
```
Para título, descrição, headings, alts e JSON-LD, baixe o HTML e extraia com Python (`re` + `json`).

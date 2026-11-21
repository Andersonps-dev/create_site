# NOME DO SITE

Site estático (HTML + CSS + JS) com build via Vite. Criado a partir do starter da skill `/criar-site`.

```bash
npm install
npm run dev       # http://localhost:5173
npm run images    # assets-src/logo.png e assets-src/fotos/ → public/
npm run build     # gera dist/ (+ robots.txt e sitemap.xml)
npm run deploy    # (Git Bash) build + envio para o servidor
```

## Antes de publicar
1. Copie `.env.example` para `.env` e preencha (o build avisa enquanto houver `PREENCHER`).
2. Troque `PREENCHER` / `DOMINIO` / `NOME-DO-SITE` em: `index.html` (título, descrição, JSON-LD), `public/llms.txt`, `public/site.webmanifest`, `scripts/deploy.sh`, `deploy/nginx/site.conf.template`, `scripts/build-images.mjs` (cores e textos da og-image), `politica-de-privacidade.html` (data e seções 2–6).
3. Coloque o arquivo de verificação do Google Search Console em `public/`.

## Estrutura
```
index.html, politica-de-privacidade.html, 404.html
src/styles.css, src/main.js
public/                 favicons, manifest, llms.txt, img/
assets-src/             originais (logo.png, fotos/)
scripts/                build-images.mjs, deploy.sh
deploy/nginx/           config do nginx (cópia da que está no servidor)
PRODUCT.md, DESIGN.md   produto e sistema visual
```

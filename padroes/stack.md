# Stack e estrutura

## Padrão: site estático com Vite (HTML + CSS + JS puro)
Para sites institucionais, landing pages e portfólios. Rápido (Lighthouse 100), sem servidor, barato de hospedar.

| Peça | Escolha |
|---|---|
| Build | Vite (multi-página via `rollupOptions.input`) |
| Fontes | `@fontsource-variable/<fonte>` hospedada no próprio site (nada de Google Fonts: privacidade + CSP) |
| Imagens | `sharp` em `scripts/build-images.mjs`: originais em `assets-src/`, saída WebP 480/960/blur em `public/img/` |
| Dados do negócio | `.env` com `VITE_*`, usados no HTML como `%VITE_NOME%` |
| SEO automático | plugin no `vite.config.js` gera `robots.txt` e `sitemap.xml` (com imagens) |
| Contato | links `wa.me` com mensagem pronta; formulário monta a mensagem e abre o WhatsApp (sem backend) |
| Deploy | `scripts/deploy.sh`: build → tar via ssh → rsync `--delete` na pasta servida pelo nginx |

**Quando usar outra coisa:** precisa de blog com muitos posts ou CMS → Astro. App com login, painel ou muito estado → React/Next (aí entram MCP shadcn, 21st Magic e as skills vercel-*). Pergunte ao usuário antes de sair do padrão.

## Estrutura
```
index.html, politica-de-privacidade.html, 404.html
src/styles.css, src/main.js (+ módulos de efeitos, ex.: hero-flake.js)
public/          favicons, manifest, llms.txt, img/, googleXXXX.html
assets-src/      originais (logo, fotos)
scripts/build-images.mjs, scripts/deploy.sh
deploy/nginx/<site>.conf.template
PRODUCT.md, DESIGN.md, README.md, .env.example
```

## Comandos
```bash
npm install
npm run dev        # http://localhost:5173 (use --host para testar no celular na mesma rede)
npm run images     # regenera logo, favicons, og-image e fotos
npm run build
npm run deploy     # Git Bash
```

## Ferramentas da sessão (instaladas no Claude Code)
- **MCP chrome-devtools**: abrir referência, medir, screenshot, Lighthouse, trace de performance, emular celular. Principal ferramenta de verificação.
- **MCP Playwright**: alternativa para navegar/testar fluxos.
- **MCP shadcn** e **21st Magic** (precisa `API_KEY_21ST`): componentes React. Não usar em site estático puro.
- **Skills de design**: impeccable (init, critique, polish, finish reviewer, documenter), design-taste-frontend, emil-design-eng, apple-design, animate, choreograph, mobile-native, web-design-guidelines.
- **Skills Vercel**: deploy-to-vercel (prévias rápidas), react-best-practices.

## Segurança (nginx)
CSP restrita: `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self' data:` …
- Nada de `style=""` inline no HTML nem `<script>` inline (exceto JSON-LD, que não executa). Use classes. Variáveis CSS via JS (`el.style.setProperty`) funcionam.
- Se usar Cloudflare com Web Analytics, libere `static.cloudflareinsights.com` na CSP ou desligue o recurso.
- HTML com `Cache-Control: no-cache`; `/assets/` com cache de 1 ano (nomes com hash).

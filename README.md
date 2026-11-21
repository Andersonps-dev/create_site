# create_site: biblioteca para criar sites com o Claude Code

Processo, padrões, checklists, referências e um projeto inicial para criar sites institucionais do zero com o [Claude Code](https://claude.com/claude-code). O visual muda a cada site; o que fica é o método e o nível de acabamento (Lighthouse 100, SEO local, LGPD, celular pensado à parte).

Dois comandos:
- **`/criar-site`**: conduz o site novo em 8 fases (briefing → referência → projeto inicial → design → celular → SEO → prévia e deploy → fechamento).
- **`/guardar-achado`**: guarda na biblioteca uma dica encontrada (print do Instagram, link, vídeo, texto), no arquivo certo.

## Instalação (tudo de uma vez)
Pré-requisitos: [Node.js 20+](https://nodejs.org), Git e [Claude Code](https://claude.com/claude-code).

**Windows (PowerShell):**
```powershell
git clone https://github.com/Andersonps-dev/create_site.git "$env:USERPROFILE\.claude\skills\criar-site"
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\.claude\skills\criar-site\instalar.ps1"
```

**macOS / Linux:**
```bash
git clone https://github.com/Andersonps-dev/create_site.git ~/.claude/skills/criar-site
bash ~/.claude/skills/criar-site/instalar.sh
```

O instalador coloca:

| Ferramenta | Para que serve | Fonte |
|---|---|---|
| `/criar-site` e `/guardar-achado` | processo e biblioteca | este repositório |
| Skills do Emil Kowalski (emil-design-eng, animate, apple-design, mobile-native, review-animations…) | design, animação, celular | [emilkowalski/skills](https://github.com/emilkowalski/skills) (MIT) |
| Taste (design-taste-frontend) | estrutura e sensação de sites de alto nível | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT) |
| Impeccable | design, crítica, polimento, PRODUCT.md/DESIGN.md | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) (Apache 2.0) |
| Skills da Vercel (web-design-guidelines, deploy-to-vercel…) | revisão de UI, deploy de prévia | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) |
| MCP chrome-devtools | abrir referências, medir, prints, Lighthouse | [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) |
| MCP Playwright | testar no navegador e no celular | [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) (Apache 2.0) |
| MCP shadcn | componentes (projetos React) | [Jpisnice/shadcn-ui-mcp-server](https://github.com/Jpisnice/shadcn-ui-mcp-server) |

Opcionais: `-Figma` / `--figma` (Figma MCP oficial) e `-Magic` / `--magic` (plugin [21st Magic](https://github.com/21st-dev/magic-mcp), precisa da chave `API_KEY_21ST`).

Depois: feche e abra o Claude Code, abra uma pasta vazia e digite `/criar-site`. Prompts prontos em [`prompts/brief.md`](prompts/brief.md).

Observação: o Impeccable adiciona hooks globais no `~/.claude/settings.json` (é o instalador oficial dele).

**Atualizar:** `git -C ~/.claude/skills/criar-site pull` e rode o instalador de novo.

## Estrutura
```
SKILL.md                  roteiro do /criar-site
checklists/               briefing, SEO (20+ itens), lançamento
padroes/                  stack, design, efeitos (com código), celular, conteúdo
referencias/              sites de referência e caixa de achados
licoes.md                 erros que já aconteceram e como evitar
prompts/brief.md          prompts prontos (começar, refinar, SEO)
instalar.ps1 / .sh        instalador de tudo
starter/                  projeto Vite inicial (infra sem estilo visual)
extras/guardar-achado/    skill /guardar-achado
```

## Créditos
Setup de skills e prompt de brief inspirados no guia gratuito "Setup de Web Design no Claude", da Deploy Club. As skills e MCPs pertencem aos seus autores (licenças acima) e são baixadas dos repositórios oficiais pelo instalador; este repositório não as redistribui.

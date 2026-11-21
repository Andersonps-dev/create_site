# create_site: biblioteca para criar sites com o Claude Code

Processo, padrões, checklists, referências e um projeto inicial para criar sites institucionais do zero com o [Claude Code](https://claude.com/claude-code). O visual muda a cada site; o que fica é o método e o nível de acabamento (Lighthouse 100, SEO local, LGPD, celular pensado à parte).

Dois comandos:
- **`/criar-site`**: conduz o site novo em 8 fases (briefing → referência → projeto inicial → design → celular → SEO → prévia e deploy → fechamento).
- **`/guardar-achado`**: guarda na biblioteca uma dica encontrada (print do Instagram, link, vídeo, texto), no arquivo certo.

## Instalação

```bash
# macOS / Linux / Git Bash no Windows
git clone https://github.com/Andersonps-dev/create_site.git ~/.claude/skills/criar-site
mkdir -p ~/.claude/skills/guardar-achado
cp ~/.claude/skills/criar-site/extras/guardar-achado/SKILL.md ~/.claude/skills/guardar-achado/
```

```powershell
# PowerShell no Windows
git clone https://github.com/Andersonps-dev/create_site.git "$env:USERPROFILE\.claude\skills\criar-site"
New-Item -ItemType Directory -Force "$env:USERPROFILE\.claude\skills\guardar-achado" | Out-Null
Copy-Item "$env:USERPROFILE\.claude\skills\criar-site\extras\guardar-achado\SKILL.md" "$env:USERPROFILE\.claude\skills\guardar-achado\"
```

Reabra o Claude Code e digite `/criar-site` numa pasta vazia.

**Atualizar:** `git -C ~/.claude/skills/criar-site pull` (e copie de novo o `guardar-achado` se ele mudou).

## Recomendado (opcional)
O processo usa estas ferramentas quando estão instaladas:
- MCP **chrome-devtools** (medir referências, screenshots, Lighthouse): `claude mcp add chrome-devtools -- npx chrome-devtools-mcp@latest`
- Skills de design: impeccable, design-taste-frontend, emil-design-eng, apple-design, animate, mobile-native
- Node.js 20+ e Git Bash (Windows) para o projeto inicial e o deploy

## Estrutura
```
SKILL.md                  roteiro do /criar-site
checklists/               briefing, SEO (20+ itens), lançamento
padroes/                  stack, design, efeitos (com código), celular, conteúdo
referencias/              sites de referência e caixa de achados
licoes.md                 erros que já aconteceram e como evitar
starter/                  projeto Vite inicial (infra sem estilo visual)
extras/guardar-achado/    skill /guardar-achado
```

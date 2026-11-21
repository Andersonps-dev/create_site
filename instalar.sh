#!/usr/bin/env bash
# Instala a biblioteca /criar-site e todas as ferramentas de design usadas com ela.
# Uso (macOS / Linux, depois de clonar o repositório em ~/.claude/skills/criar-site):
#   bash ~/.claude/skills/criar-site/instalar.sh [--figma] [--magic]
# No Windows use instalar.ps1 (os MCPs precisam do "cmd /c").
# Pré-requisitos: Node.js 20+, Git e Claude Code instalados.
set -u
SKILLS="$HOME/.claude/skills"
FIGMA=0; MAGIC=0
for a in "$@"; do case "$a" in --figma) FIGMA=1;; --magic) MAGIC=1;; esac; done

passo() { printf '\n\033[36m==> %s\033[0m\n' "$1"; }
for c in node npx git claude; do command -v "$c" >/dev/null || { echo "Falta instalar: $c"; exit 1; }; done

passo "Skill /guardar-achado"
mkdir -p "$SKILLS/guardar-achado"
cp "$SKILLS/criar-site/extras/guardar-achado/SKILL.md" "$SKILLS/guardar-achado/SKILL.md"

passo "Skills de design e animação (Emil Kowalski)"
npx -y skills@latest add emilkowalski/skills -g -a claude-code -y

passo "Skill Taste (design-taste-frontend)"
npx -y skills@latest add https://github.com/Leonxlnx/taste-skill --skill design-taste-frontend -g -a claude-code -y

passo "Skills da Vercel"
npx -y skills@latest add vercel-labs/agent-skills -g -a claude-code -y

passo "Impeccable (depois rode /impeccable init em cada projeto)"
npx -y impeccable install --providers=claude --scope=global < /dev/null

passo "MCP chrome-devtools"
claude mcp add -s user chrome-devtools -- npx -y chrome-devtools-mcp@latest

passo "MCP Playwright"
claude mcp add -s user playwright -- npx -y @playwright/mcp@latest

passo "MCP shadcn (projetos React)"
claude mcp add -s user shadcn -- npx -y @jpisnice/shadcn-ui-mcp-server

if [ "$FIGMA" = 1 ]; then
  passo "MCP Figma (depois: /mcp > figma > Authenticate)"
  claude mcp add -s user --transport http figma https://mcp.figma.com/mcp
fi

if [ "$MAGIC" = 1 ]; then
  passo "Plugin 21st Magic (precisa de API_KEY_21ST)"
  claude plugin marketplace add 21st-dev/magic-mcp
  claude plugin install 21st@21st-dev
  [ -z "${API_KEY_21ST:-}" ] && echo "    Crie a chave em 21st.dev/magic e exporte API_KEY_21ST no seu ~/.bashrc ou ~/.zshrc"
fi

printf '\n\033[32mPronto.\033[0m Feche e abra o Claude Code e pergunte: "Quais skills de design você tem?"\nPara começar um site: abra uma pasta vazia e digite /criar-site\n'

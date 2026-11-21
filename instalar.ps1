# Instala a biblioteca /criar-site e todas as ferramentas de design usadas com ela.
# Uso (PowerShell, depois de clonar o repositório em ~/.claude/skills/criar-site):
#   powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\.claude\skills\criar-site\instalar.ps1"
# Pré-requisitos: Node.js 20+, Git e Claude Code instalados.
# Opcional: -Figma (conecta o Figma MCP)  -Magic (plugin 21st Magic; precisa de API_KEY_21ST)

param([switch]$Figma, [switch]$Magic)
$ErrorActionPreference = 'Continue'
$skills = "$env:USERPROFILE\.claude\skills"

function Passo($t) { Write-Host "`n==> $t" -ForegroundColor Cyan }
function Ok($t) { Write-Host "    ok: $t" -ForegroundColor Green }

foreach ($cmd in 'node', 'npx', 'git', 'claude') {
  if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) { Write-Host "Falta instalar: $cmd" -ForegroundColor Red; exit 1 }
}

Passo 'Skill /guardar-achado'
New-Item -ItemType Directory -Force "$skills\guardar-achado" | Out-Null
Copy-Item "$skills\criar-site\extras\guardar-achado\SKILL.md" "$skills\guardar-achado\SKILL.md" -Force
Ok 'guardar-achado'

Passo 'Skills de design e animação (Emil Kowalski: emil-design-eng, animate, apple-design, mobile-native...)'
npx -y skills@latest add emilkowalski/skills -g -a claude-code -y

Passo 'Skill Taste (design-taste-frontend)'
npx -y skills@latest add https://github.com/Leonxlnx/taste-skill --skill design-taste-frontend -g -a claude-code -y

Passo 'Skills da Vercel (web-design-guidelines, react-best-practices, deploy-to-vercel...)'
npx -y skills@latest add vercel-labs/agent-skills -g -a claude-code -y

Passo 'Impeccable (design, crítica, polimento; depois rode /impeccable init em cada projeto)'
npx -y impeccable install --providers=claude --scope=global

Passo 'MCP chrome-devtools (navegador: medir, screenshot, Lighthouse)'
claude mcp add -s user chrome-devtools -- cmd /c npx -y chrome-devtools-mcp@latest

Passo 'MCP Playwright (navegador: testar fluxos e celular)'
claude mcp add -s user playwright -- cmd /c npx -y '@playwright/mcp@latest'

Passo 'MCP shadcn (componentes, para projetos React)'
claude mcp add -s user shadcn -- cmd /c npx -y '@jpisnice/shadcn-ui-mcp-server'

if ($Figma) {
  Passo 'MCP Figma (depois: /mcp > figma > Authenticate)'
  claude mcp add -s user --transport http figma https://mcp.figma.com/mcp
}

if ($Magic) {
  Passo 'Plugin 21st Magic (gera componentes; precisa da variável API_KEY_21ST)'
  claude plugin marketplace add 21st-dev/magic-mcp
  claude plugin install 21st@21st-dev
  if (-not $env:API_KEY_21ST) { Write-Host '    Crie a chave em 21st.dev/magic e defina: setx API_KEY_21ST "sua-chave"' -ForegroundColor Yellow }
}

Write-Host "`nPronto. Feche e abra o Claude Code e pergunte: 'Quais skills de design você tem?'" -ForegroundColor Green
Write-Host "Para começar um site: abra uma pasta vazia e digite /criar-site"

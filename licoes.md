# Lições aprendidas (erros que já custaram tempo)

## Técnicas
- **`[hidden]` não esconde** se o componente tem `display: grid/flex`. Sempre: `.componente[hidden] { display: none }`.
- **Título inteiro mudou de cor** depois de quebrar em palavras animadas: os spans novos pegaram a regra `.titulo span { color: accent }`. Force `color: inherit` nos spans de animação.
- **Canvas absoluto com largura zero** por causa de `justify-self: end` no grid. Use `justify-self: stretch` + `inset: 0`.
- **Git Bash converte `/preview/` em caminho do Windows.** Prefixe com `MSYS_NO_PATHCONV=1`.
- **CSP `style-src 'self'` bloqueia `style=""` no HTML.** Funciona local, quebra em produção. Use classes; para imagem de fundo por card, uma classe por imagem.
- **Navegador mostra o site antigo depois do deploy**: HTML sem `Cache-Control` é cacheado por heurística. Configure `add_header Cache-Control "no-cache"` para HTML no nginx; até lá, teste com `?v=2`.
- **Cloudflare Web Analytics** injeta script de outro domínio que a CSP bloqueia (erro no console, Best Practices 92). Desligue no painel ou libere na CSP.
- **Cloudflare esconde e-mails** (`/cdn-cgi/l/email-protection`): o script é do mesmo domínio, então funciona com CSP `'self'`. Conferir no navegador que o e-mail aparece.
- **Ferramenta de screenshot do chrome-devtools** só salva dentro do workspace: salve em uma pasta do projeto que esteja no `.gitignore` (ex.: `divulgacao/`).
- **Servidor muda sem avisar** (ex.: o contêiner do nginx foi trocado por outro). Antes de mexer em config, descubra o contêiner atual (`docker ps`, `docker inspect` mounts) e compare com a cópia do repositório.

## De processo
- **"Ao redor" / termos vagos**: confirme o que o usuário quer antes de mexer (uma vez mudei a animação de fundo quando ele queria o layout do texto).
- **Margens**: vá direto à medida da referência; "menos margem" depois "agora foi muito" custou 3 rodadas.
- **Escopo do negócio**: o usuário disse "não vendemos", depois "vendemos sim". Antes de remover um serviço de todo lugar, confirme.
- **"O desktop está perfeito, não altere"**: mudanças de celular só dentro de `@media (max-width: 900px)` e verifique o desktop depois (medidas, não só olhar).
- **Prévia antes do deploy**: cliente aprova a prévia `/preview/` com noindex; deploy só com aprovação.
- **Repositório sem remote**: confira `git remote -v` no começo do projeto, não na hora do push.

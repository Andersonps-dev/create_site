# Lançamento

## Antes da prévia
- [ ] `npm run build` sem avisos de `.env` (`PREENCHER`)
- [ ] Testado em desktop 1440x900 e celular 390x844 / 360x740
- [ ] Console sem erros (chrome-devtools `list_console_messages`)
- [ ] `prefers-reduced-motion` testado (emulate `reduce`)
- [ ] Textos conferidos com o cliente / site antigo (nada inventado)
- [ ] Checklist de SEO (`seo.md`)

## Prévia para o cliente aprovar
Pasta `/preview/` no mesmo servidor, sem indexação:
```bash
MSYS_NO_PATHCONV=1 npx vite build --base /preview/ --outDir dist-preview
for f in dist-preview/*.html; do sed -i 's#<head>#<head>\n<meta name="robots" content="noindex, nofollow">#' "$f"; done
tar -C dist-preview -czf - . | ssh root@SERVIDOR 'rm -rf /opt/SITE/site/preview && mkdir -p /opt/SITE/site/preview && tar -xzf - -C /opt/SITE/site/preview'
```
- `MSYS_NO_PATHCONV=1` é obrigatório no Git Bash do Windows (senão `/preview/` vira caminho do Windows).
- `dist-preview/` no `.gitignore`.
- O deploy de produção com `rsync --delete` apaga a prévia sozinho.
- Alternativa sem servidor: `npx vercel` (skill deploy-to-vercel) gera link de prévia.

## Deploy (só com aprovação explícita do usuário)
- [ ] `npm run deploy`
- [ ] Verificar o site **publicado**: `curl` do HTML procurando um texto novo, CSS novo com 200, 404 em URL inexistente, prévia apagada
- [ ] Abrir no navegador com `?v=2` (o navegador pode mostrar o HTML antigo do cache)
- [ ] Lighthouse mobile no publicado
- [ ] Arquivo de verificação do Search Console respondendo 200

## Depois do deploy
- [ ] Search Console: enviar sitemap, pedir indexação da home
- [ ] Perfil da Empresa no Google: colocar o link do site
- [ ] Instagram: link na bio
- [ ] Avisar o cliente para abrir com Ctrl+F5 / `?v=2` se vir a versão antiga
- [ ] Post de antes e depois (roteiro modelo: Reels 30–40 s com narração IA no CapCut ou ElevenLabs, carrossel 4:5 no Canva, 3 stories, post no Google)
- [ ] Commit (quando o usuário pedir)

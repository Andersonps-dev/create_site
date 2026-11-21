---
name: guardar-achado
description: Guarda na biblioteca de criação de sites (skill criar-site) uma dica, referência, checklist, efeito ou ferramenta que o usuário encontrou (print do Instagram, link, vídeo, texto colado). Use quando o usuário digitar /guardar-achado, mandar um print/link dizendo "guarda isso", "salva na biblioteca", "adiciona isso pros próximos sites" ou algo parecido.
---

# Guardar achado na biblioteca

Biblioteca: `~/.claude/skills/criar-site/` (no Windows `C:\Users\aaand\.claude\skills\criar-site\`).

## Passos
1. **Entenda o achado.** Leia o print (Read na imagem), abra o link (web-fetch) ou leia o texto. Se for um site de referência, abra-o no navegador (chrome-devtools) e meça o que interessa: margens, largura máxima, fontes, curvas de animação, comportamento no celular.
2. **Compare com o que já existe.** Leia o arquivo de destino antes de escrever. Se já está coberto, diga isso e só complemente o que for novo. Não duplique.
3. **Escolha o destino:**

| Tipo de achado | Arquivo |
|---|---|
| Site para se inspirar | `referencias/sites.md` (site, por que é bom, o que copiar, medidas) |
| Item de SEO | `checklists/seo.md` |
| Item de lançamento/deploy/divulgação | `checklists/lancamento.md` |
| Pergunta para o cliente | `checklists/briefing.md` |
| Efeito/animação | `padroes/efeitos.md` (com código funcional, reduced-motion e quando usar) |
| Regra de layout, tipografia, cor | `padroes/design.md` |
| Regra de celular | `padroes/mobile.md` |
| Regra de texto/conteúdo | `padroes/conteudo.md` |
| Ferramenta, biblioteca, MCP, skill | `padroes/stack.md` |
| Erro a evitar | `licoes.md` |
| Arquivo pronto (config, script, template) | `starter/` |

4. **Registre sempre em `referencias/achados.md`** (data, fonte, resumo, onde aplicou, status). Se o achado for duvidoso ou só uma ideia, deixe só ali com status `novo`.
5. **Seja crítico.** Dicas de redes sociais às vezes estão erradas ou desatualizadas. Se contradiz um padrão que já funciona, diga ao usuário e pergunte antes de trocar. Status `descartado (motivo)` também vale.
6. **Opcional:** se o usuário estiver num projeto de site, ofereça verificar o site atual contra o achado.
7. A biblioteca é um repositório git (GitHub Andersonps-dev/create_site). Se o achado mudou `extras/guardar-achado/SKILL.md`, copie também para `~/.claude/skills/guardar-achado/`. Faça commit com mensagem curta ("achado: <título>") e push quando o usuário pedir.

## Resposta ao usuário
Curta: o que foi guardado, em qual arquivo, e se algo já existia ou foi descartado.

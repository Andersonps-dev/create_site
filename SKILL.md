---
name: criar-site
description: Cria um site institucional do zero seguindo a biblioteca pessoal do usuário (processo, padrões, referências, checklists e projeto inicial). Use quando o usuário pedir para criar, começar ou planejar um site novo, landing page ou site de empresa/cliente, ou digitar /criar-site. O site pode ter qualquer estilo; a biblioteca define processo e padrões, não a aparência.
---

# Criar site do zero

Biblioteca pessoal, alimentada pelo usuário com `/guardar-achado`. Antes de cada fase, leia o arquivo indicado: ele é a fonte da verdade e pode ter mudado desde a última vez.

```
criar-site/
  SKILL.md                  este roteiro
  checklists/briefing.md    perguntas e dados a coletar do cliente
  checklists/seo.md         verificações obrigatórias de SEO
  checklists/lancamento.md  prévia, aprovação, deploy, pós-deploy
  padroes/stack.md          tecnologias, estrutura e comandos
  padroes/design.md         layout, tipografia, cor, espaçamento
  padroes/efeitos.md        receitas de animação testadas (com código)
  padroes/mobile.md         versão celular
  padroes/conteudo.md       textos, o que nunca inventar
  referencias/sites.md      sites de referência e o que copiar de cada um
  referencias/achados.md    caixa de entrada: dicas encontradas (Instagram etc.)
  licoes.md                 erros que já aconteceram e como evitar
  starter/                  projeto inicial (infra pronta, sem estilo visual)
```

## Princípios
- **Cada site é diferente.** Não copie o visual de um site anterior. Copie o processo, a infraestrutura e o nível de acabamento.
- **Nada inventado.** Depoimentos, preços, garantias, números, prazos, marcas e serviços só entram com confirmação do cliente (ver `padroes/conteudo.md`).
- **Decisões que são do usuário, pergunte.** Estilo, cor, referência, o que o negócio faz. O resto (técnica, acessibilidade, SEO) segue o padrão sem perguntar.
- Fale com o usuário em português do Brasil.

## Fases

### 1. Briefing (`checklists/briefing.md`)
Colete os dados do negócio e as escolhas de estilo. Pergunte em blocos curtos (AskUserQuestion, até 4 por vez). Se o usuário já tiver um site publicado, leia-o e extraia os textos e dados antes de perguntar.
Saída: `PRODUCT.md` na raiz do projeto (quem é, público, serviços, diferenciais, o que não pode ser inventado) e `.env` preenchido.

### 2. Referência visual (`referencias/sites.md`)
Peça 1 ou 2 sites de referência (ou sugira os da lista que combinam com o negócio). Abra a referência no navegador (chrome-devtools) e **meça**, não chute: margens laterais, largura máxima, tamanhos de título, espaçamento entre seções, curva das animações, comportamento no celular. Anote as medidas no `DESIGN.md`.

### 3. Projeto inicial (`padroes/stack.md`)
Copie `starter/` para a pasta nova, ajuste `package.json` (nome), `.env`, `vite.config.js` (páginas), `deploy.sh` e nginx (domínio). `npm install` e `npm run dev`.
Se existir a skill `impeccable`, rode `/impeccable init` para registrar produto e design.

### 4. Design e construção (`padroes/design.md`, `padroes/efeitos.md`)
Monte a página seção por seção. Use as skills de design disponíveis (impeccable, design-taste-frontend, emil-design-eng, apple-design, animate) e o MCP shadcn/21st só se o projeto for React. Mostre ao usuário no navegador a cada bloco grande (screenshot) e ajuste.
Efeitos vêm das receitas testadas em `padroes/efeitos.md`; só invente um novo se nenhuma servir, e depois registre-o lá.

### 5. Celular (`padroes/mobile.md`)
Versão celular pensada à parte, não só "encolhida". Teste em 390x844 e 360x740. Menos texto que no desktop.

### 6. SEO e conteúdo (`checklists/seo.md`, `padroes/conteudo.md`)
Rode a checklist inteira no build. Corrija tudo que for possível sem o cliente; liste o que depende dele.

### 7. Prévia, aprovação e deploy (`checklists/lancamento.md`)
Prévia online com noindex para o cliente aprovar. Deploy só depois da aprovação explícita. Depois do deploy, verifique o site publicado (não o local).

### 8. Fechamento
- Atualize `licoes.md` com qualquer erro novo que custou tempo.
- Se um efeito ou padrão novo deu certo, registre em `padroes/`.
- Commit só quando o usuário pedir.

# Conteúdo e textos

## Nunca inventar (sem confirmação do cliente)
- Depoimentos, nomes ou fotos de clientes
- Preços ou faixas de preço
- Garantia, prazos, tempo de resposta
- Números: anos de mercado, clientes atendidos, obras
- Serviços, produtos ou marcas que o cliente não confirmou
- `AggregateRating` no JSON-LD (use link para o Perfil do Google)

Se o cliente muda de ideia sobre o que faz (ex.: "não vendemos" → "vendemos sim"), confirme e altere **em todos os lugares** juntos: página, FAQ, JSON-LD, meta description, PRODUCT.md.

## Tom
- Português do Brasil, falando com "você", frases curtas.
- Termo técnico explicado em palavras simples ("vácuo na tubulação: tira ar e umidade antes de liberar o gás").
- Cidade no texto, não só no rodapé (SEO local).
- Textos que o cliente mandou: use como ele escreveu; só organize (tópicos, quebra de linha), sem reescrever o sentido.

## Onde cada texto aparece duas vezes
- FAQ: na página e no `FAQPage` do JSON-LD (mesmo texto).
- Serviços: na página e em `hasOfferCatalog` / `knowsAbout` do JSON-LD.
- Descrição: `meta description` e `og:description`.

## Formatos que funcionam
- Banner: título com serviço + cidade, 1 frase curta, 1 botão, etiquetas dos serviços.
- Serviço: título, chips com tipos/modelos, 1 frase, lista com ✓ dos passos, frase de fechamento.
- Prova: fotos reais com legenda do que foi feito; nota do Google com link.
- Formulário que vira mensagem de WhatsApp: nome, cidade, serviço (select), detalhes.

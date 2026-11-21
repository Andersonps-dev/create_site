# Briefing: o que coletar antes de construir

## Dados do negócio (obrigatórios)
- [ ] Nome fantasia (como aparece no logo) e razão social
- [ ] CNPJ (ou CPF/MEI); confira na BrasilAPI: `https://brasilapi.com.br/api/cnpj/v1/<cnpj>`
- [ ] E-mail de contato (LGPD: canal para o titular)
- [ ] Telefone/WhatsApp com DDD
- [ ] Endereço (ou só área de atendimento, se o Perfil do Google esconde o endereço)
- [ ] Cidades atendidas
- [ ] Horário de atendimento (igual ao Perfil da Empresa no Google)
- [ ] Domínio (já tem? onde foi comprado?)
- [ ] Redes sociais (Instagram, Facebook, link do Perfil da Empresa no Google)
- [ ] Logo em boa resolução (de preferência vetor ou PNG grande)

**Nome, endereço e telefone precisam ser idênticos** no site, no Google e no Instagram (SEO local).

## O que o negócio faz
- [ ] Lista de serviços/produtos, com as palavras que o cliente usa
- [ ] O que NÃO faz (evita prometer errado)
- [ ] Diferenciais verdadeiros e verificáveis (os 3 principais)
- [ ] Público principal (residencial, empresas, faixa de renda, como chega: Google, Instagram, indicação)
- [ ] Ação principal do site (WhatsApp, ligação, agendamento, compra, formulário)

## Provas (só o que existir de verdade)
- [ ] Fotos reais de trabalhos (pedir originais, sem compressão do WhatsApp se possível)
- [ ] Nota e quantidade de avaliações no Google
- [ ] Depoimentos: pode mostrar? Com nome? (precisa de autorização)
- [ ] Marcas com que trabalha
- [ ] Garantia, formas de pagamento, prazos (só se o cliente confirmar)
- [ ] Números (anos, clientes, obras): só se o cliente confirmar

## Estilo (pergunte, não decida sozinho)
- [ ] Site atual: manter algo dele? (cores do logo, textos aprovados)
- [ ] Sites de referência que o cliente ou o usuário gostam (ver `referencias/sites.md`)
- [ ] Clima: sério/técnico, acolhedor, sofisticado, jovem, minimalista
- [ ] Cor de destaque (derivada do logo ou nova)
- [ ] Elemento visual de impacto no topo (foto, vídeo, animação, partículas, 3D)

## Saídas desta fase
1. `PRODUCT.md`: plataforma, usuários, propósito, posicionamento, contexto de operação, restrições, compromissos de marca, provas disponíveis, **lista do que não pode ser inventado**, princípios.
2. `.env` preenchido a partir de `.env.example`.
3. Lista do que ainda falta pedir ao cliente.

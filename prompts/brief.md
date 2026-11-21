# Prompts prontos

Base: guia gratuito "Setup de Web Design no Claude", da Deploy Club (Vinícius Guimarães), adaptado ao processo desta biblioteca. O guia original não está neste repositório; procure pela Deploy Club para baixá-lo.

## 1. Começar um site (use depois de instalar tudo)
Copie, troque o que está entre colchetes e cole no Claude Code numa pasta vazia:

```
/criar-site
Cria um site institucional pra [o que a empresa faz, numa linha].
Público: [quem, o mais específico possível]. Sensação: [ex.: limpo, premium, confiável].
Usa como referência a sensação de [1 ou 2 links de sites que você admira].
Páginas: [início, serviços, sobre, contato].
Seções da home: hero com uma promessa clara, [3 benefícios], prova (fotos reais), FAQ, um CTA.
Marca: cores [hex], fontes [nomes]. Ação principal: [WhatsApp / ligação / agendamento].
Dados do negócio: [cole aqui ou passe o link do site atual].
Constrói, depois tira print no desktop e no celular e corrige espaçamento, overflow
e alinhamento antes de me mostrar.
```

| Colchete | O que colocar |
|---|---|
| o que a empresa faz | uma linha, com a cidade se for negócio local |
| quem | quanto mais específico, melhor |
| links de referência | é daqui que vem o gosto; sem referência o resultado fica genérico |
| hex / fontes | cores da marca e nomes das fontes (ou "deriva do logo") |

## 2. Refinar (cobre coisa específica, não sensação)
```
Ajusta o hero: mais respiro, título maior, um botão em vez de dois.
Deixa o espaçamento entre as seções consistente em [96px]. Corrige o overflow do menu no celular.
Me mostra prints de antes e depois.
```

```
Analisa [site de referência] e compara com o meu: espaçamentos, margens, efeitos,
animações e estrutura. Mede no navegador e me diz o que aplicar.
```

```
Faz a versão celular usando [referência] como modelo. Menos texto que no desktop.
A versão do PC está aprovada, não altere.
```

## 3. Quando fica com cara de genérico
| Sintoma | Correção |
|---|---|
| Ainda parece IA | Faltou a skill de Taste ou a referência. Use as duas. |
| Apertado ou desalinhado | Dê números exatos de espaçamento, peça "totalmente responsivo" e conferência no celular. |
| Imagens parecem falsas | Use fotos reais do cliente (ou gere imagens próprias) e reconstrua a página em volta delas. |
| Fontes erradas no ar | "Configura as web fonts direito para produção", hospedadas no próprio site. |

> O gosto vem das skills instaladas e das referências que você passa, não de pedir com jeitinho.

## 4. Verificar SEO
```
Verifica no site publicado [URL] a checklist de SEO da biblioteca e me retorna o que falta.
```

## 5. Guardar um achado
```
/guardar-achado [cole o print, o link ou o texto]
```

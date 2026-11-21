#!/usr/bin/env bash
# Publica o site na VPS (pasta servida pelo nginx).
# Uso (Git Bash):  npm run deploy
# Não reinicia nada: só troca os arquivos. O --delete também apaga a prévia /preview/.
set -euo pipefail

HOST="root@IP-DO-SERVIDOR"          # PREENCHER
DIR="/opt/NOME-DO-SITE"             # PREENCHER (a pasta site/ dentro dela é montada no nginx)
URL="https://DOMINIO"               # PREENCHER

cd "$(dirname "$0")/.."

npm run build

echo "→ Enviando dist/ para $HOST:$DIR/site"
tar -C dist -czf - . | ssh "$HOST" "set -e
  mkdir -p $DIR/site $DIR/incoming
  rm -rf $DIR/incoming/*
  tar -xzf - -C $DIR/incoming --no-same-owner --warning=no-timestamp
  # rsync dentro da pasta (não recria o diretório, que pode estar montado num contêiner)
  rsync -a --delete $DIR/incoming/ $DIR/site/
  chmod -R a+rX $DIR/site"

echo "→ Verificando $URL"
curl -fsS --ssl-no-revoke -o /dev/null -w "   HTTP %{http_code}\n" "$URL/?v=$RANDOM" || echo "   (site não responde em HTTPS — DNS/certificado?)"
echo "✓ Publicado. Abra com ?v=2 ou Ctrl+F5 para não ver o cache do navegador."

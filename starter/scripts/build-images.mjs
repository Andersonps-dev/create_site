// Gera os assets otimizados a partir de assets-src/.
// Uso: npm run images
//   assets-src/logo.png        → logo, símbolo, favicons, ícones, og-image
//   assets-src/fotos/*.jpg     → public/img/fotos/<nome>-{480,960,blur}.webp
// Ajuste CORES, TEXTOS_OG e os recortes do logo para cada site.
import sharp from 'sharp';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';

const OUT = 'public';
const IMG = `${OUT}/img`;
mkdirSync(IMG, { recursive: true });

const CORES = { fundo: '#111111', ogDe: '#111111', ogAte: '#333333', texto: '#ffffff', textoSuave: '#cccccc' };
const TEXTOS_OG = ['SERVIÇO em', 'CIDADE', 'Serviço 1 · Serviço 2 · Serviço 3'];

const LOGO = 'assets-src/logo.png';
if (existsSync(LOGO)) {
  const meta = await sharp(LOGO).metadata();
  const lado = Math.min(meta.width, meta.height);
  // logo quadrado centralizado; se o símbolo for só uma parte do logo, faça um extract próprio para "mark"
  const logo = await sharp(LOGO)
    .extract({ left: Math.round((meta.width - lado) / 2), top: Math.round((meta.height - lado) / 2), width: lado, height: lado })
    .png().toBuffer();
  const mark = logo;

  const webp = (buf, w, file) => sharp(buf).resize(w, w).webp({ quality: 86 }).toFile(file);
  const png = (buf, w, file) => sharp(buf).resize(w, w).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(file);
  await Promise.all([
    webp(logo, 480, `${IMG}/logo-480.webp`),
    webp(mark, 96, `${IMG}/mark-96.webp`),
    png(mark, 32, `${OUT}/favicon-32.png`),
    png(logo, 192, `${OUT}/icon-192.png`),
    png(logo, 512, `${OUT}/icon-512.png`),
  ]);
  // apple-touch-icon com fundo sólido (iOS não lida bem com transparência)
  await sharp({ create: { width: 180, height: 180, channels: 4, background: CORES.fundo } })
    .composite([{ input: await sharp(mark).resize(180, 180).toBuffer() }])
    .png({ palette: true }).toFile(`${OUT}/apple-touch-icon.png`);

  // Imagem de compartilhamento 1200x630 (WhatsApp, Facebook, LinkedIn)
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const og = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${CORES.ogDe}"/><stop offset="1" stop-color="${CORES.ogAte}"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="560" y="270" font-family="Segoe UI, Arial, sans-serif" font-size="56" font-weight="800" fill="${CORES.texto}">${esc(TEXTOS_OG[0])}</text>
  <text x="560" y="340" font-family="Segoe UI, Arial, sans-serif" font-size="56" font-weight="800" fill="${CORES.texto}">${esc(TEXTOS_OG[1])}</text>
  <text x="560" y="405" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="${CORES.textoSuave}">${esc(TEXTOS_OG[2])}</text>
</svg>`);
  await sharp(og)
    .composite([{ input: await sharp(logo).resize(420, 420).toBuffer(), left: 90, top: 105 }])
    .jpeg({ quality: 85, mozjpeg: true }).toFile(`${IMG}/og-image.jpg`);
  console.log('Logo, ícones e og-image gerados');
} else {
  console.warn(`⚠️  ${LOGO} não encontrado: pulei logo, ícones e og-image`);
}

// Fotos: 960 (principal), 480 (celular), blur (fundo desfocado de 32px)
const SRC = 'assets-src/fotos';
const DEST = `${IMG}/fotos`;
// Recortes pontuais por nome de arquivo (ex.: tirar marca d'água): { 'nome': { left, top, width, height } }
const CROPS = {};
if (existsSync(SRC)) {
  mkdirSync(DEST, { recursive: true });
  for (const file of readdirSync(SRC).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort()) {
    const name = file.replace(/\.[^.]+$/, '');
    let img = sharp(`${SRC}/${file}`).rotate();
    if (CROPS[name]) img = img.extract(CROPS[name]);
    const buf = await img.toBuffer();
    await Promise.all([
      sharp(buf).resize({ width: 960, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${DEST}/${name}-960.webp`),
      sharp(buf).resize({ width: 480 }).webp({ quality: 78 }).toFile(`${DEST}/${name}-480.webp`),
      sharp(buf).resize({ width: 32 }).webp({ quality: 60 }).toFile(`${DEST}/${name}-blur.webp`),
    ]);
    const { width, height } = await sharp(`${DEST}/${name}-960.webp`).metadata();
    console.log(`  fotos/${name}  ${width}x${height}`);
  }
}
console.log('Imagens geradas em /public');

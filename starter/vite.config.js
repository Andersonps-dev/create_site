import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'node:path';
import { existsSync, readdirSync, statSync } from 'node:fs';

// Dados do negócio usados no HTML como %VITE_*%. Ficam em .env
const REQUIRED = ['VITE_SITE_URL', 'VITE_MARCA', 'VITE_NOME_FANTASIA', 'VITE_RAZAO_SOCIAL', 'VITE_CNPJ', 'VITE_EMAIL', 'VITE_TELEFONE', 'VITE_WHATSAPP'];

// Páginas indexáveis: [arquivo, caminho público]. A 404 fica de fora do sitemap.
const PAGES = [
  ['index.html', '/'],
  ['politica-de-privacidade.html', '/politica-de-privacidade'],
];

// Pasta com as fotos que entram no sitemap de imagens (Google Imagens)
const PHOTO_DIR = 'public/img/fotos';

function seoFiles(env) {
  const url = (env.VITE_SITE_URL || '').replace(/\/$/, '');
  const lastmod = (file) => statSync(resolve(import.meta.dirname, file)).mtime.toISOString().slice(0, 10);
  const photos = existsSync(resolve(import.meta.dirname, PHOTO_DIR))
    ? readdirSync(resolve(import.meta.dirname, PHOTO_DIR)).filter((f) => f.endsWith('-960.webp')).map((f) => `${url}/img/fotos/${f}`)
    : [];
  return {
    name: 'seo-files',
    apply: 'build',
    buildStart() {
      const missing = REQUIRED.filter((k) => !env[k] || env[k].includes('PREENCHER'));
      if (missing.length) this.warn(`\n\n⚠️  Dados não preenchidos no .env: ${missing.join(', ')}\n   Não publique antes de preencher.\n`);
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n` });
      const entry = ([file, path], i) =>
        `  <url>\n    <loc>${url}${path}</loc>\n    <lastmod>${lastmod(file)}</lastmod>\n` +
        (i === 0 ? [`${url}/img/og-image.jpg`, ...photos].map((p) => `    <image:image><image:loc>${p}</image:loc></image:image>\n`).join('') : '') +
        `  </url>`;
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
          PAGES.map(entry).join('\n') + `\n</urlset>\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    plugins: [seoFiles(env)],
    build: {
      rollupOptions: {
        input: Object.fromEntries([...PAGES.map(([f]) => f), '404.html'].map((p) => [p.replace('.html', ''), resolve(import.meta.dirname, p)])),
      },
    },
  };
});

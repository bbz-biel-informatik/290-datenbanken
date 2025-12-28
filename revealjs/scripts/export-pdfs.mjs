import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..', '..');

const args = process.argv.slice(2);
const dirArg = args.find((arg) => !arg.startsWith('--'));
const slidesDir = dirArg
  ? path.isAbsolute(dirArg)
    ? dirArg
    : path.resolve(repoRoot, dirArg)
  : path.join(repoRoot, 'slides');

const slidesStat = await fs.stat(slidesDir).catch(() => null);
if (!slidesStat || !slidesStat.isDirectory()) {
  console.error(`Slides directory not found: ${slidesDir}`);
  process.exit(1);
}

const htmlFiles = await collectHtmlFiles(slidesDir);
if (htmlFiles.length === 0) {
  console.error(`No .html files found under: ${slidesDir}`);
  process.exit(1);
}

let puppeteer;
try {
  const imported = await import('puppeteer');
  puppeteer = imported.default ?? imported;
} catch (error) {
  console.error('Puppeteer is not installed. Run "npm install" inside revealjs.');
  process.exit(1);
}

const { server, baseUrl } = await startServer(repoRoot);
const browser = await puppeteer.launch();

let failures = 0;

for (const htmlFile of htmlFiles) {
  const urlPath = toUrlPath(path.relative(repoRoot, htmlFile));
  const targetUrl = `${baseUrl}/${urlPath}?print-pdf`;
  const outputPath = htmlFile.replace(/\.html$/i, '.pdf');

  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });

  try {
    await page.goto(targetUrl, { waitUntil: 'load', timeout: 60000 });
    await page.waitForFunction(
      () => window.Reveal && window.Reveal.isReady && window.Reveal.isReady(),
      { timeout: 30000 }
    );
    await page.waitForFunction(
      () => document.querySelectorAll('.pdf-page').length > 0,
      { timeout: 30000 }
    );
    await page.evaluate(() =>
      document.fonts ? document.fonts.ready : Promise.resolve()
    );
    await page.pdf({
      path: outputPath,
      printBackground: true,
      preferCSSPageSize: true
    });
    console.log(`Saved ${path.relative(repoRoot, outputPath)}`);
  } catch (error) {
    failures += 1;
    console.error(
      `Failed to export ${path.relative(repoRoot, htmlFile)}: ${error.message}`
    );
  } finally {
    await page.close();
  }
}

await browser.close();
await stopServer(server);

if (failures > 0) {
  process.exit(1);
}

async function collectHtmlFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectHtmlFiles(fullPath)));
      continue;
    }
    if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

function toUrlPath(filePath) {
  return filePath.split(path.sep).map(encodeURIComponent).join('/');
}

async function startServer(rootDir) {
  const rootPath = path.resolve(rootDir);
  const server = http.createServer(async (req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.statusCode = 405;
      res.end();
      return;
    }

    const requestUrl = new URL(req.url ?? '/', 'http://127.0.0.1');
    const pathname = decodeURIComponent(requestUrl.pathname);
    const resolvedPath = path.resolve(rootPath, '.' + pathname);

    if (
      resolvedPath !== rootPath &&
      !resolvedPath.startsWith(rootPath + path.sep)
    ) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }

    let filePath = resolvedPath;
    let stat = await fs.stat(filePath).catch(() => null);
    if (stat && stat.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
      stat = await fs.stat(filePath).catch(() => null);
    }

    if (!stat || !stat.isFile()) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }

    const contentType = contentTypeFor(filePath);
    res.setHeader('Content-Type', contentType);
    if (req.method === 'HEAD') {
      res.end();
      return;
    }

    const data = await fs.readFile(filePath);
    res.end(data);
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Unable to determine server port.');
  }

  return { server, baseUrl: `http://127.0.0.1:${address.port}` };
}

async function stopServer(server) {
  await new Promise((resolve) => server.close(resolve));
}

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.js':
    case '.mjs':
      return 'application/javascript; charset=utf-8';
    case '.json':
    case '.map':
      return 'application/json; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.gif':
      return 'image/gif';
    case '.webp':
      return 'image/webp';
    case '.woff':
      return 'font/woff';
    case '.woff2':
      return 'font/woff2';
    case '.ttf':
      return 'font/ttf';
    case '.otf':
      return 'font/otf';
    case '.mp4':
      return 'video/mp4';
    case '.webm':
      return 'video/webm';
    case '.pdf':
      return 'application/pdf';
    default:
      return 'application/octet-stream';
  }
}

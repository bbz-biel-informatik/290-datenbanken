import http from "node:http";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

// Use puppetter-core or just puppeteer if installed.
// We installed 'puppeteer' which includes Chrome, preventing potential issues with system Chrome.
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..", "..");
const distDir = path.join(projectRoot, "dist");
const slidesDir = path.join(distDir, "modul");

async function main() {
  // Check if dist/slides exists
  try {
    await fs.access(slidesDir);
  } catch {
    console.error(
      `Slides directory not found: ${slidesDir}. Did you run 'npm run build' first?`
    );
    process.exit(1);
  }

  const htmlFiles = await collectHtmlFiles(slidesDir);
  if (htmlFiles.length === 0) {
    console.log(
      `No .html files found in ${slidesDir}. Skipping PDF generation.`
    );
    return;
  }

  // Start a simple server to serve 'dist'
  const { server, baseUrl } = await startServer(distDir);
  console.log(`Server started at ${baseUrl}`);

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // Useful for CI environments
  });

  let failures = 0;

  for (const htmlFile of htmlFiles) {
    // Calculate relative path from dist to the file, e.g. "slides/01-intro.html"
    const relPath = path.relative(distDir, htmlFile);

    // Construct array-based URL path for consistency
    const urlPath = relPath.split(path.sep).map(encodeURIComponent).join("/");

    const targetUrl = `${baseUrl}/${urlPath}?print-pdf`;
    const outputPath = htmlFile.replace(/\.html$/i, ".pdf");

    console.log(`Generating PDF for ${relPath}...`);

    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 2 }); // Improved quality

    try {
      await page.goto(targetUrl, { waitUntil: "networkidle0", timeout: 60000 });

      // Wait for Reveal to be ready
      await page.waitForFunction(
        () => window.Reveal && window.Reveal.isReady(),
        { timeout: 30000 }
      );

      // Wait until the print stylesheet has applied its magic (if any specific marker exists)
      // Reveal.js adds 'print-pdf' class to body, but just waiting a tick or for networkidle0 is often enough.
      // We can also verify that all resources are loaded.

      await page.pdf({
        path: outputPath,
        printBackground: true,
        format: "A4",
        landscape: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      });

      console.log(`✓ Saved ${path.relative(projectRoot, outputPath)}`);
    } catch (error) {
      failures++;
      console.error(`✗ Failed to export ${relPath}: ${error.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  await stopServer(server);

  if (failures > 0) {
    console.error(`Finished with ${failures} failures.`);
    process.exit(1);
  } else {
    console.log("All PDFs generated successfully.");
  }
}

async function collectHtmlFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectHtmlFiles(fullPath)));
    } else if (
      entry.isFile() &&
      entry.name.toLowerCase().endsWith(".slides.html")
    ) {
      files.push(fullPath);
    }
  }
  return files;
}

// Simple static file server
async function startServer(rootDir) {
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      let filePath = path.join(rootDir, url.pathname);

      // Basic directory traversal protection
      if (!filePath.startsWith(rootDir)) {
        res.statusCode = 403;
        res.end("Forbidden");
        return;
      }

      let stat;
      try {
        stat = await fs.stat(filePath);
      } catch {
        res.statusCode = 404;
        res.end("Not found");
        return;
      }

      if (stat.isDirectory()) {
        filePath = path.join(filePath, "modul/index.html");
        try {
          stat = await fs.stat(filePath);
        } catch {
          res.statusCode = 404;
          res.end("index.html not found");
          return;
        }
      }

      const data = await fs.readFile(filePath);
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpg",
        ".svg": "image/svg+xml",
        ".pdf": "application/pdf",
        ".woff": "font/woff",
        ".woff2": "font/woff2",
        ".ttf": "font/ttf",
      };

      res.setHeader(
        "Content-Type",
        mimeTypes[ext] || "application/octet-stream"
      );
      res.end(data);
    } catch (err) {
      res.statusCode = 500;
      res.end("Internal Server Error");
      console.error(err);
    }
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${port}` });
    });
  });
}

function stopServer(server) {
  return new Promise((resolve) => server.close(resolve));
}

main().catch(console.error);

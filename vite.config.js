import { defineConfig } from "vite";
import path, { resolve } from "path";
import { globSync } from "glob";
import fs from "fs";
import { compilePage } from "./src/scripts/compile-pages.mjs";
import { compileDrawing } from "./src/scripts/compile-drawings.mjs";

export default defineConfig({
  root: ".",
  base: "./",
  plugins: [
    {
      name: "markdown-pages",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const url = req.url.split("?")[0];
          if (url.endsWith(".html")) {
            // Check if corresponding md exists
            const mdPath = path.join(__dirname, url.replace(/\.html$/, ".md"));
            if (fs.existsSync(mdPath)) {
              try {
                let html = await compilePage(mdPath);
                html = await server.transformIndexHtml(url, html);
                res.setHeader("Content-Type", "text/html");
                res.setHeader("Cache-Control", "no-cache");
                res.end(html);
                return;
              } catch (e) {
                console.error(e);
                next(e);
              }
            }
          }
          next();
        });
      },
      resolveId(id) {
        // If the html file doesn't exist, but md does, we handle it
        const cleanId = id.split("?")[0];
        if (cleanId.endsWith(".html") && !fs.existsSync(cleanId)) {
          const mdPath = cleanId.replace(/\.html$/, ".md");
          if (fs.existsSync(mdPath)) {
            return cleanId;
          }
        }
      },
      load(id) {
        const cleanId = id.split("?")[0];
        if (cleanId.endsWith(".html")) {
          const mdPath = cleanId.replace(/\.html$/, ".md");
          if (fs.existsSync(mdPath)) {
            return compilePage(mdPath);
          }
        }
      },
      async handleHotUpdate({ file, server }) {
        if (file.endsWith(".md")) {
          server.ws.send({
            type: "full-reload",
            path: "*",
          });
          return [];
        }
      },
    },
  ],
  assetsInclude: ["**/*.md"],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "modul/index.html"),
        ...Object.fromEntries(
          globSync("**/*.md", {
            ignore: ["node_modules/**", "dist/**", "README.md"],
          }).map((file) => [
            path.relative(__dirname, file).slice(0, -3), // Remove .md extension
            resolve(__dirname, file).replace(/\.md$/, ".html"),
          ])
        ),
        ...Object.fromEntries(
          globSync("modul/**/*.html", {
            ignore: ["node_modules/**", "dist/**"],
          }).map((file) => [
            path.relative(__dirname, file).slice(0, -5), // Remove .html extension
            resolve(__dirname, file),
          ])
        ),
      },
    },
  },
});

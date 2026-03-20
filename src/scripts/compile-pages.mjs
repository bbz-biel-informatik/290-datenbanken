import fs from "fs";
import path from "path";
import { marked } from "marked";
import { glob } from "glob";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");

export const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Module 290 - Datenbanken</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.0/github-markdown-light.min.css">
    <style>
        body {
            box-sizing: border-box;
            min-width: 200px;
            max-width: 980px;
            margin: 0 auto;
            padding: 45px;
        }
        @media (max-width: 767px) {
            body {
                padding: 15px;
            }
        }
        .markdown-body img {
            background-color: white;
        }
        .footer {
            margin-top: 3rem;
            font-size: 0.9rem;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body class="markdown-body">
    {{content}}
    <div class="footer">
        <p>BBZ Biel - Nicolas Müller</p>
    </div>
</body>
</html>`;

export async function compilePage(filePath) {
  const markdown = fs.readFileSync(filePath, "utf-8");
  let htmlContent = marked.parse(markdown);
  htmlContent = htmlContent.replaceAll(".md", ".html");
  return template.replace("{{content}}", htmlContent);
}

async function main() {
  // Compile markdown files to dist
  const files = await glob("**/*.md", {
    cwd: projectRoot,
    ignore: ["node_modules/**", "dist/**", "README.md"],
  });

  for (const file of files) {
    const filePath = path.join(projectRoot, file);
    const finalHtml = await compilePage(filePath);

    // Output to dist preserving structure
    const relativePath = file; // relative to root
    const htmlFileName = relativePath.replace(/\.md$/, ".html");
    const outputFilePath = path.join(projectRoot, "dist", htmlFileName);

    fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });

    fs.writeFileSync(outputFilePath, finalHtml);
    console.log(`Compiled ${file} to ${outputFilePath}`);
  }
}

// Check if running directly
if (process.argv[1] === __filename) {
  main().catch(console.error);
}

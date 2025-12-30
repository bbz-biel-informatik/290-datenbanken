import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');

export const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Module 290 - Datenbanken</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            background-color: #f4f4f9;
            color: #333;
        }
        h1 {
            color: #2c3e50;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            background: white;
            margin: 0.5rem 0;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: transform 0.2s;
        }
        li:hover {
            transform: translateY(-2px);
        }
        a {
            text-decoration: none;
            color: #007bff;
            font-weight: bold;
            display: block;
        }
        a:hover {
            color: #0056b3;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
            background: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        th, td {
            text-align: left;
            padding: 1rem;
            border-bottom: 1px solid #eee;
        }
        th {
            background-color: #f8f9fa;
            color: #2c3e50;
        }
        tr:last-child td {
            border-bottom: none;
        }
        blockquote {
            background: #f8f9fa;
            border-left: 5px solid #007bff;
            margin: 1.5em 0;
            padding: 1em;
            font-style: italic;
        }
        .footer {
            margin-top: 3rem;
            font-size: 0.9rem;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>
    {{content}}
    <div class="footer">
        <p>BBZ Biel - Nicolas Müller</p>
    </div>
</body>
</html>`;

export async function compilePage(filePath) {
    const markdown = fs.readFileSync(filePath, 'utf-8');
    const htmlContent = marked.parse(markdown);
    return template.replace('{{content}}', htmlContent);
}

async function main() {
    // Compile markdown files to dist
    const files = await glob('**/*.md', { 
        cwd: projectRoot, 
        ignore: ['node_modules/**', 'dist/**', 'README.md'] 
    });
    
    for (const file of files) {
        const filePath = path.join(projectRoot, file);
        const finalHtml = await compilePage(filePath);
        
        // Output to dist preserving structure
        const relativePath = file; // relative to root
        const htmlFileName = relativePath.replace(/\.md$/, '.html');
        const outputFilePath = path.join(projectRoot, 'dist', htmlFileName);
        
        fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
        
        fs.writeFileSync(outputFilePath, finalHtml);
        console.log(`Compiled ${file} to ${outputFilePath}`);
    }
}

// Check if running directly
if (process.argv[1] === __filename) {
    main().catch(console.error);
}


import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { glob } from 'glob';

const __dirname = path.resolve();
const projectRoot = path.join(__dirname, '..');
const buildDir = path.join(projectRoot, 'build');

const template = `<!DOCTYPE html>
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

function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    let entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            // Avoid copying node_modules recursively if it exists inside other copied folders, though usually it's in root/revealjs
             if (entry.name === 'node_modules') continue;
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

async function compilePages() {
    // 1. Create build directory
    if (fs.existsSync(buildDir)) {
        fs.rmSync(buildDir, { recursive: true, force: true });
    }
    fs.mkdirSync(buildDir);
    console.log('Created build directory');

    // 2. Copy assets
    const foldersToCopy = ['revealjs', 'images', 'slides'];
    for (const folder of foldersToCopy) {
        const src = path.join(projectRoot, folder);
        const dest = path.join(buildDir, folder);
        if (fs.existsSync(src)) {
            copyDir(src, dest);
            console.log(`Copied ${folder} to build directory`);
        }
    }

    // 3. Compile markdown files
    const files = await glob('**/*.md', { cwd: projectRoot, ignore: ['revealjs/**', 'node_modules/**', 'build/**'] });
    
    for (const file of files) {
        const filePath = path.join(projectRoot, file);
        const markdown = fs.readFileSync(filePath, 'utf-8');
        const htmlContent = marked.parse(markdown);
        
        const finalHtml = template.replace('{{content}}', htmlContent);
        
        const outputFilePath = path.join(buildDir, file.replace('.md', '.html'));
        const outputDir = path.dirname(outputFilePath);
        
        if (!fs.existsSync(outputDir)) {
             fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outputFilePath, finalHtml);
        console.log(`Compiled ${file} to ${outputFilePath}`);
    }
}

compilePages().catch(console.error);

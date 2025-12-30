import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import excalidrawToSvg from 'excalidraw-to-svg';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..', '..');

export async function compileDrawing(inputPath) {
    const outputPath = inputPath.replace(/\.excalidraw$/, '.svg');
    const relInput = path.relative(repoRoot, inputPath);
    const relOutput = path.relative(repoRoot, outputPath);
    
    console.log(`Compiling ${relInput}...`); // Log for vite
    
    try {
        const inputData = await fs.readFile(inputPath, 'utf-8');
        const scene = JSON.parse(inputData);
        
        const svg = await excalidrawToSvg(scene);
        
        await fs.writeFile(outputPath, svg.outerHTML, 'utf-8');
        console.log(`Generated ${relOutput}`);
        return true;
    } catch (error) {
        console.error(`Failed to compile ${relInput}:`, error);
        throw error;
    }
}

async function collectExcalidrawFiles(dir) {
    let files = [];
    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'dist') {
                files.push(...(await collectExcalidrawFiles(fullPath)));
            } else if (entry.isFile() && entry.name.endsWith('.excalidraw')) {
                files.push(fullPath);
            }
        }
    } catch (err) {
        if (err.code !== 'ENOENT') console.error(`Error reading directory ${dir}:`, err);
    }
    return files;
}

async function main() {
    const files = await collectExcalidrawFiles(repoRoot);
    
    if (files.length === 0) {
        console.log('No .excalidraw files found.');
        return;
    }

    console.log(`Found ${files.length} .excalidraw files.`);
    let failures = 0;

    for (const inputPath of files) {
        const outputPath = inputPath.replace(/\.excalidraw$/, '.svg');
        
        let shouldCompile = true;
        try {
            const inputStat = await fs.stat(inputPath);
            const outputStat = await fs.stat(outputPath);
            if (inputStat.mtime <= outputStat.mtime) {
                shouldCompile = false;
            }
        } catch (e) {
            // Output likely doesn't exist
        }

        if (shouldCompile) {
            try {
                await compileDrawing(inputPath);
            } catch (error) {
                failures++;
            }
        } else {
            console.log(`Skipping ${path.relative(repoRoot, inputPath)} (up to date)`);
        }
    }
    
    if (failures > 0) process.exit(1);
}

// Check if running directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    main().catch(err => {
        console.error('Script failed:', err);
        process.exit(1);
    });
}

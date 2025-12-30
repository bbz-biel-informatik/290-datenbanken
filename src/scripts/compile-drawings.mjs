import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..', '..');

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
            console.log(`Compiling ${path.relative(repoRoot, inputPath)}...`);
            try {
                // Run npx excalidraw-to-svg. 
                const relInput = path.relative(repoRoot, inputPath);
                const relOutput = path.relative(repoRoot, outputPath);
                
                await execAsync(`npx excalidraw-to-svg "${relInput}" "${relOutput}"`, { cwd: repoRoot });
            } catch (error) {
                console.error(`Failed to compile ${path.relative(repoRoot, inputPath)}:`, error.message);
            }
        } else {
            console.log(`Skipping ${path.relative(repoRoot, inputPath)} (up to date)`);
        }
    }
}

main().catch(err => {
    console.error('Script failed:', err);
    process.exit(1);
});

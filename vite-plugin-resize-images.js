import sharp from 'sharp';
import { readdir, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';

/* ─── Default resize targets ────────────────────────────────────────────────
   Per-directory configs override defaults. Filename conventions still apply:
   - "-card." → cardMaxWidth × cardMaxHeight
   - "-avatar." → avatarMaxWidth × avatarMaxHeight  
   - other → detailMaxWidth × detailMaxHeight
─────────────────────────────────────────────────────────────────────────── */
const DEFAULT_TARGETS = {
    cardMaxWidth: 1000,
    cardMaxHeight: 700,
    detailMaxWidth: 1600,
    detailMaxHeight: 1000,
    avatarMaxWidth: 400,
    avatarMaxHeight: 400,
};

export default function vitePluginResizeImages(options = {}) {
    const {
        includeDirs = ['projects', 'profile'],
        dirConfigs = {},
    } = options;

    // Merge per-directory configs with defaults
    const dirTargets = {};
    for (const dir of includeDirs) {
        dirTargets[dir] = { ...DEFAULT_TARGETS, ...(dirConfigs[dir] || {}) };
    }

    return {
        name: 'vite-plugin-resize-images',
        apply: 'build',
        async buildStart() {
            const publicDir = join(process.cwd(), 'public');
            let totalBefore = 0;
            let totalAfter = 0;
            let count = 0;

            for (const dir of includeDirs) {
                const dirPath = join(publicDir, dir);
                await processDir(dirPath);
            }

            async function processDir(dirPath) {
                let entries;
                try {
                    entries = await readdir(dirPath, { withFileTypes: true });
                } catch {
                    return; // Directory doesn't exist, skip
                }
                for (const entry of entries) {
                    const fullPath = join(dirPath, entry.name);
                    if (entry.isDirectory()) {
                        await processDir(fullPath);
                    } else if (['.webp', '.jpg', '.jpeg', '.png'].includes(extname(entry.name).toLowerCase())) {
                        await resizeImage(fullPath);
                    }
                }
            }

            async function resizeImage(filePath) {
                let before, metadata, data;
                try {
                    data = await readFile(filePath);
                    before = data.length;
                    metadata = await sharp(data).metadata();
                } catch {
                    return; // File locked or unreadable, skip silently
                }

                // Determine resize targets based on directory + filename
                const relPath = filePath.split('public\\').pop() || filePath.split('public/').pop();
                const topDir = relPath.split(/[/\\]/)[0];
                const targets = dirTargets[topDir] || DEFAULT_TARGETS;

                let maxW, maxH;
                const name = filePath.toLowerCase();
                if (name.includes('-card.')) {
                    maxW = targets.cardMaxWidth;
                    maxH = targets.cardMaxHeight;
                } else if (name.includes('-avatar.')) {
                    maxW = targets.avatarMaxWidth;
                    maxH = targets.avatarMaxHeight;
                } else {
                    maxW = targets.detailMaxWidth;
                    maxH = targets.detailMaxHeight;
                }

                // Skip if already small enough
                if (!metadata.width || !metadata.height) return;
                if (metadata.width <= maxW && metadata.height <= maxH) return;

                let buffer;
                try {
                    buffer = await sharp(data)
                        .resize(maxW, maxH, { fit: 'inside', withoutEnlargement: true })
                        .toBuffer();
                } catch {
                    return; // Processing failed, skip
                }

                // Only overwrite if smaller
                if (buffer.length < before) {
                    try {
                        await writeFile(filePath, buffer);
                        const after = buffer.length;
                        const savings = ((1 - after / before) * 100).toFixed(1);
                        totalBefore += before;
                        totalAfter += after;
                        count++;
                        const rel = filePath.split('public\\').pop() || filePath.split('public/').pop();
                        console.log(`  🔧 resize: ${rel} ${metadata.width}×${metadata.height} → ${Math.round(buffer.length / 1024 * 10) / 10}KB (-${savings}%)`);
                    } catch {
                        // File locked on write, skip
                    }
                }
            }

            if (count > 0) {
                console.log(`\n  📊 Resize: ${count} images optimized, saved ${((totalBefore - totalAfter) / 1024).toFixed(1)}KB`);
            }
        },
    };
}

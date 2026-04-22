import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const imagesToOptimize = [
    'public/stateImages/Uttrakhand/1.png',
    'public/stateImages/Himachal/1.png',
    'public/stateImages/Tawang/1.png',
    'public/stateImages/Tawang/5.png'
];

async function optimizeImages() {
    console.log('--- Starting Project-Wide Image Optimization ---');
    
    for (const imagePath of imagesToOptimize) {
        const fullPath = path.resolve(imagePath);
        const ext = path.extname(imagePath);
        const webpPath = imagePath.replace(ext, '.webp');
        const fullWebpPath = path.resolve(webpPath);

        try {
            const stats = await fs.stat(fullPath);
            const originalSize = (stats.size / 1024 / 1024).toFixed(2);
            
            console.log(`Optimizing: ${imagePath} (${originalSize} MB)`);

            await sharp(fullPath)
                .webp({ quality: 80 })
                .toFile(fullWebpPath);

            const newStats = await fs.stat(fullWebpPath);
            const newSize = (newStats.size / 1024 / 1024).toFixed(2);
            const reduction = (((stats.size - newStats.size) / stats.size) * 100).toFixed(1);

            console.log(`  -> Created WebP: ${webpPath} (${newSize} MB) [${reduction}% reduction]`);
        } catch (error) {
            console.error(`  !! Error processing ${imagePath}:`, error.message);
        }
    }

    console.log('--- Optimization Complete ---');
}

optimizeImages();

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function compressImage(inputPath, outputPath) {
  try {
    const metadata = await sharp(inputPath).metadata();
    const originalSize = fs.statSync(inputPath).size / 1024 / 1024;
    console.log(`Original: ${path.basename(inputPath)} (${originalSize.toFixed(2)}MB)`);
    
    if (metadata.format === 'png') {
      // Convert PNG to WebP for better compression
      const webpOutput = inputPath.replace(/\.png$/i, '.webp');
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(webpOutput);
      const compressedSize = fs.statSync(webpOutput).size / 1024 / 1024;
      console.log(`  → Converted to WebP: ${compressedSize.toFixed(2)}MB (${((1 - compressedSize/originalSize) * 100).toFixed(1)}% reduction)`);
    } else if (metadata.format === 'jpeg') {
      // Compress JPEG
      await sharp(inputPath)
        .jpeg({ quality: 85, progressive: true })
        .toFile(inputPath);
      const compressedSize = fs.statSync(inputPath).size / 1024 / 1024;
      console.log(`  → Compressed: ${compressedSize.toFixed(2)}MB (${((1 - compressedSize/originalSize) * 100).toFixed(1)}% reduction)`);
    }
  } catch (error) {
    console.error(`Error compressing ${inputPath}:`, error.message);
  }
}

async function main() {
  const assetsDir = path.join(__dirname, 'attached_assets');
  
  if (!fs.existsSync(assetsDir)) {
    console.log('Assets directory not found');
    return;
  }
  
  const files = fs.readdirSync(assetsDir).filter(f => /\.(png|jpe?g)$/i.test(f));
  
  console.log(`Found ${files.length} image files to compress:\n`);
  
  for (const file of files) {
    const inputPath = path.join(assetsDir, file);
    await compressImage(inputPath, inputPath);
  }
  
  console.log('\n✓ Compression complete! Run: npm run build');
}

main().catch(console.error);

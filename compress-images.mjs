import sharp from 'sharp';
import { readdir, stat, mkdir, copyFile } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { existsSync } from 'fs';

const QUALITY = 75;
const MAX_WIDTH = 1920;

async function getAllImages(dir) {
  const files = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...await getAllImages(fullPath));
      } else {
        const ext = extname(entry.name).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  } catch (err) {
    // Directory doesn't exist
  }
  return files;
}

async function ensureDir(dir) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

async function compressImage(inputPath) {
  try {
    const inputStats = await stat(inputPath);
    const inputSizeKB = inputStats.size / 1024;
    
    // Skip if already small
    if (inputSizeKB < 150) {
      return { skipped: true, saved: 0, reason: 'already small' };
    }

    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    let pipeline = image;
    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
    }
    
    // Compress in place - overwrite original with WebP
    const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const tempPath = inputPath + '.tmp.webp';
    
    await pipeline
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(tempPath);
    
    const outputStats = await stat(tempPath);
    const outputSizeKB = outputStats.size / 1024;
    const savedKB = inputSizeKB - outputSizeKB;
    const savedPercent = ((savedKB / inputSizeKB) * 100).toFixed(0);
    
    // Copy temp to final location
    await copyFile(tempPath, outputPath);
    
    // If output is different from input, we can remove input later
    // For now just report
    
    console.log(`✅ ${basename(inputPath)}: ${inputSizeKB.toFixed(0)}KB → ${outputSizeKB.toFixed(0)}KB (-${savedPercent}%)`);
    
    return { skipped: false, saved: savedKB * 1024, tempPath, outputPath, inputPath };
  } catch (err) {
    console.error(`❌ ${basename(inputPath)}: ${err.message}`);
    return { skipped: true, saved: 0, reason: err.message };
  }
}

async function main() {
  console.log('🖼️  716 Details Image Compression (In-Place)');
  console.log('============================================\n');
  
  // Get all images
  const imageDirs = ['./images', './Homepage Services images', './favicons'];
  let allImages = [];
  
  for (const dir of imageDirs) {
    const images = await getAllImages(dir);
    allImages.push(...images);
    console.log(`Found ${images.length} images in ${dir}`);
  }
  
  // Filter only large files (>150KB)
  const largeImages = [];
  for (const img of allImages) {
    const stats = await stat(img);
    if (stats.size > 150 * 1024) {
      largeImages.push({ path: img, size: stats.size });
    }
  }
  
  console.log(`\nTotal images: ${allImages.length}`);
  console.log(`Large images (>150KB) to compress: ${largeImages.length}\n`);
  
  let totalSaved = 0;
  let processed = 0;
  let errors = 0;
  const tempFiles = [];
  
  for (const { path: imagePath, size } of largeImages) {
    const result = await compressImage(imagePath);
    if (!result.skipped) {
      processed++;
      totalSaved += result.saved;
      if (result.tempPath) tempFiles.push(result.tempPath);
    } else if (result.reason !== 'already small') {
      errors++;
    }
  }
  
  console.log('\n============================================');
  console.log(`✅ Compressed: ${processed} images`);
  console.log(`❌ Errors: ${errors}`);
  console.log(`💾 Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
  console.log(`\n⚠️  Temp files created with .tmp.webp extension`);
  console.log(`   Review and rename/delete originals as needed`);
}

main().catch(console.error);

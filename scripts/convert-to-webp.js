/**
 * Convert JPG hero images to WebP format
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const IMAGES_DIR = path.join(__dirname, "..", "images");

const imagesToConvert = [
  "siding-hero.jpg",
  "contact-hero.jpg",
  "projects-hero.jpg",
  "testimonials-hero.jpg",
  "service-areas-hero.jpg",
  "about-hero.jpg"
];

async function convertToWebp(filename) {
  const inputPath = path.join(IMAGES_DIR, filename);
  const outputPath = path.join(IMAGES_DIR, filename.replace(".jpg", ".webp"));
  
  if (!fs.existsSync(inputPath)) {
    console.log(`   ⏭️  Skipping ${filename} (file not found)`);
    return false;
  }
  
  try {
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);
    
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const savings = Math.round((1 - outputStats.size / inputStats.size) * 100);
    
    console.log(`   ✅ ${filename} → ${filename.replace(".jpg", ".webp")} (${savings}% smaller)`);
    return true;
  } catch (error) {
    console.error(`   ❌ Error converting ${filename}: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("   Converting JPG to WebP");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  let successCount = 0;
  
  for (const filename of imagesToConvert) {
    const success = await convertToWebp(filename);
    if (success) successCount++;
  }
  
  console.log(`\n✅ Converted ${successCount} images to WebP format`);
}

main().catch(console.error);

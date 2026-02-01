/**
 * Guardian Roofing - Hero Image Downloader
 * Downloads royalty-free stock images from Unsplash for hero sections
 * 
 * Usage: node download-hero-images.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.join(__dirname, "..", "images");

// Curated Unsplash image URLs for roofing/construction context
// These are direct links to royalty-free images
const imageDownloads = [
  {
    filename: "projects-hero.jpg",
    // Traditional two-story home with nice landscaping
    url: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1920&q=85",
    description: "Traditional American home with new roof"
  },
  {
    filename: "about-hero.jpg",
    // Nice residential home - colonial/traditional style
    url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=85",
    description: "Traditional residential home exterior"
  }
];

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, (redirectResponse) => {
          redirectResponse.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve(true);
          });
        }).on('error', (err) => {
          fs.unlink(filepath, () => {});
          reject(err);
        });
      } else if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else {
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("   Guardian Roofing - Hero Image Downloader");
  console.log("═══════════════════════════════════════════════════════════");
  console.log(`\n📁 Output directory: ${OUTPUT_DIR}`);
  console.log(`📝 Images to download: ${imageDownloads.length}\n`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let successCount = 0;
  let failCount = 0;

  for (const image of imageDownloads) {
    const outputPath = path.join(OUTPUT_DIR, image.filename);
    console.log(`📸 Downloading: ${image.filename}`);
    console.log(`   ${image.description}`);

    try {
      await downloadImage(image.url, outputPath);
      const stats = fs.statSync(outputPath);
      console.log(`   ✅ Saved: ${outputPath} (${Math.round(stats.size / 1024)}KB)\n`);
      successCount++;
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}\n`);
      failCount++;
    }
  }

  console.log("═══════════════════════════════════════════════════════════");
  console.log(`   Complete! ✅ ${successCount} succeeded, ❌ ${failCount} failed`);
  console.log("═══════════════════════════════════════════════════════════\n");

  if (successCount > 0) {
    console.log("📌 Next steps:");
    console.log("   1. Review the downloaded images in /images/");
    console.log("   2. Convert to WebP using: cwebp -q 85 image.jpg -o image.webp");
    console.log("   3. Commit and push changes\n");
  }
}

main().catch(console.error);

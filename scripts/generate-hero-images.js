/**
 * Guardian Roofing - Hero Image Generator
 * Uses Gemini API to generate appropriate hero images for each page
 *
 * Usage: npm run generate-heroes
 */

import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from parent directory's .env.local
// Environment variables from Cloud Agent secrets take precedence
dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

// Check both Gemini_API_KEY and GEMINI_API_KEY (case variations)
const API_KEY = process.env.Gemini_API_KEY || process.env.GEMINI_API_KEY;
const OUTPUT_DIR = path.join(__dirname, "..", "images");

// Hero image generation configurations
const heroConfigs = [
  {
    filename: "siding-hero.jpg",
    prompt: `Professional photography of vinyl siding installation on a residential home. Key details:
- Two professional contractors installing horizontal vinyl siding on a typical American two-story house
- Workers on scaffolding or ladders, wearing safety gear and tool belts
- House partially showing old damaged siding being replaced with new crisp blue-gray vinyl siding
- Professional work truck visible in driveway with ladders
- Bright sunny day, clear blue sky with some white clouds
- Suburban residential neighborhood setting
- Workers focused on precise installation work
- Clean, organized work site
- Wide angle shot showing the scope of work
- Photorealistic, professional commercial photography style
- NO text or watermarks`,
    description: "Siding page hero - Vinyl siding installation in progress"
  },
  {
    filename: "contact-hero.jpg",
    prompt: `Professional photography of a roofing contractor meeting with homeowners at their front door. Key details:
- Friendly male contractor in his 40s wearing a company polo shirt and holding a clipboard
- Standing at the front porch of a typical American suburban home
- Speaking with a couple (homeowners) who look engaged and comfortable
- Contractor pointing at the roof while explaining something
- Nice residential home with visible asphalt shingle roof in background
- Warm, welcoming atmosphere
- Sunny day lighting
- Professional but approachable demeanor
- Medium shot showing interaction between contractor and homeowners
- Photorealistic, lifestyle commercial photography
- NO text or watermarks`,
    description: "Contact page hero - Contractor consulting with homeowners"
  },
  {
    filename: "projects-hero.jpg",
    prompt: `Professional exterior photography of a beautiful completed residential roofing project. Key details:
- Large two-story traditional American home with brand new architectural shingle roof
- Rich charcoal gray dimensional shingles catching the light
- Clean white gutters and trim
- Well-manicured lawn and landscaping
- Blue sky with a few white clouds
- Late afternoon golden hour lighting
- House at slight angle showing roof dimension and detail
- Upscale but attainable suburban home (not ultra-luxury)
- NO people in image
- Wide angle architectural photography
- Photorealistic, real estate quality photography
- NO text or watermarks`,
    description: "Projects page hero - Completed roof installation showcase"
  },
  {
    filename: "testimonials-hero.jpg",
    prompt: `Professional photography of a happy middle-aged couple standing proudly in front of their home with a new roof. Key details:
- Caucasian couple in their 50s, casually dressed, genuine warm smiles
- Standing in their front yard with arms around each other
- Behind them: their two-story home with beautiful new brown architectural shingle roof
- The house looks like a typical American suburban home with vinyl siding
- Green lawn, some landscaping
- Bright sunny day
- Feeling of satisfaction and pride in their home
- Medium wide shot showing couple and home
- Natural, candid feeling (not too posed)
- Photorealistic, lifestyle photography
- NO text or watermarks`,
    description: "Testimonials page hero - Happy homeowners with new roof"
  },
  {
    filename: "service-areas-hero.jpg",
    prompt: `Professional aerial or elevated view of a typical American suburban neighborhood. Key details:
- Bird's eye or elevated view showing multiple residential homes
- Mix of house styles typical of Pennsylvania/New Jersey suburbs
- Various roof colors and styles (mostly shingle roofs)
- Tree-lined streets with mature trees
- Well-maintained lawns and driveways
- Late afternoon lighting with warm tones
- Sense of established, middle-class neighborhood
- Some variety in home sizes but all residential
- Peaceful, community feeling
- Wide angle landscape orientation
- Photorealistic, real estate aerial photography style
- NO text, watermarks, or labels`,
    description: "Service Areas page hero - Suburban neighborhood overview"
  },
  {
    filename: "about-hero.jpg",
    prompt: `Professional group photo of a roofing company team at a job site. Key details:
- Group of 5-6 roofing professionals standing together
- Mix of ages, friendly and professional appearance
- Some wearing company polo shirts, others in work clothes
- Standing in front of a house with a roof project in progress
- Ladders and work equipment visible in background
- Team looks confident and approachable
- Sunny day on a residential job site
- Natural poses, some with arms crossed, others hands on hips
- Feeling of teamwork and professionalism
- Medium wide shot showing full team
- Photorealistic, corporate team photography style
- NO text or watermarks`,
    description: "About page hero - Company team photo at job site"
  }
];

async function generateImage(ai, config) {
  console.log(`\n📸 Generating: ${config.filename}`);
  console.log(`   ${config.description}`);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: config.prompt,
      config: {
        responseModalities: ["image", "text"],
      }
    });

    // Find the image part in the response
    let imageData = null;
    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content?.parts || []) {
        if (part.inlineData?.mimeType?.startsWith("image/")) {
          imageData = part.inlineData;
          break;
        }
      }
    }

    if (imageData) {
      const imageBuffer = Buffer.from(imageData.data, "base64");
      const outputPath = path.join(OUTPUT_DIR, config.filename);
      fs.writeFileSync(outputPath, imageBuffer);
      console.log(`   ✅ Saved: ${outputPath}`);
      return true;
    } else {
      console.error(`   ❌ No image data in response for ${config.filename}`);
      if (response.text) {
        console.log("   Response text:", response.text.slice(0, 200));
      }
      return false;
    }
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    if (error.message.includes("API key")) {
      console.error("   Please check your Gemini_API_KEY in .env.local");
    }
    return false;
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("   Guardian Roofing - Hero Image Generator");
  console.log("═══════════════════════════════════════════════════════════");

  // Verify API key
  if (!API_KEY || API_KEY === "your_api_key_here") {
    console.error("\n❌ ERROR: Gemini_API_KEY not found or not set");
    console.error("   Options:");
    console.error("   1. Set in .env.local: Gemini_API_KEY=your_key_here");
    console.error("   2. Set as environment variable: export Gemini_API_KEY=your_key_here");
    console.error("   3. For Cloud Agents: Add to Cursor Dashboard > Cloud Agents > Secrets");
    console.error("\n   Get a free API key at: https://aistudio.google.com/app/apikey");
    process.exit(1);
  }

  console.log(`\n📁 Output directory: ${OUTPUT_DIR}`);
  console.log(`📝 Images to generate: ${heroConfigs.length}`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Initialize Gemini AI
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  // Generate images sequentially (to avoid rate limits)
  let successCount = 0;
  let failCount = 0;

  for (const config of heroConfigs) {
    const success = await generateImage(ai, config);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }

    // Add delay between requests to respect rate limits
    if (heroConfigs.indexOf(config) < heroConfigs.length - 1) {
      console.log("   ⏳ Waiting 5 seconds before next image...");
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  console.log("\n═══════════════════════════════════════════════════════════");
  console.log(`   Complete! ✅ ${successCount} succeeded, ❌ ${failCount} failed`);
  console.log("═══════════════════════════════════════════════════════════\n");

  if (successCount > 0) {
    console.log("📌 Next steps:");
    console.log("   1. Review the generated images in /images/");
    console.log("   2. Convert to WebP: for f in *.jpg; do cwebp -q 85 \"$f\" -o \"${f%.jpg}.webp\"; done");
    console.log("   3. Commit and push changes");
  }

  if (failCount > 0) {
    process.exit(1);
  }
}

main().catch(console.error);

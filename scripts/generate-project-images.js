/**
 * Guardian Roofing - Project Image Generator
 * Uses Gemini 3 Pro Image API to generate before/after and project images
 *
 * Usage: npm run generate-images
 */

import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from parent directory's .env.local
dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

const API_KEY = process.env.Gemini_API_KEY;
const OUTPUT_DIR = path.join(__dirname, "..", "images");

// Image generation configurations
const imageConfigs = [
  {
    filename: "before-after-1-before.webp",
    prompt: `Professional real estate photography of a two-story brick colonial style house with a severely hail-damaged roof. Key details:
- Classic red-brown brick exterior with white painted window trim
- Symmetrical facade with centered front door and covered porch with white columns
- Roof showing significant storm damage: missing shingles, exposed underlayment, dented metal vents
- Mature green lawn with foundation shrubs
- Overcast gray sky suggesting recent storm
- NO people in the image
- Wide angle shot showing complete front facade
- Photorealistic, high-quality architectural photography style`,
    description: "Before - Brick colonial with hail-damaged roof"
  },
  {
    filename: "before-after-1-after.webp",
    prompt: `Professional real estate photography of a two-story brick colonial style house with a brand new roof installation. Key details:
- SAME classic red-brown brick exterior with white painted window trim (identical to before image)
- Symmetrical facade with centered front door and covered porch with white columns
- Beautiful NEW charcoal gray architectural shingle roof, pristine condition
- Mature green lawn with foundation shrubs
- Bright sunny day with blue sky
- Happy middle-aged Caucasian male homeowner (45-55 years old) standing in driveway, arms crossed, proud smile, wearing casual polo shirt
- Natural realistic face with no blemishes or artifacts
- Wide angle shot showing complete front facade
- Photorealistic, high-quality architectural photography style`,
    description: "After - Same brick colonial with new roof + male homeowner"
  },
  {
    filename: "before-after-2-before.webp",
    prompt: `Professional real estate photography of a single-story ranch style house with damaged vinyl siding. Key details:
- Low-profile ranch home with attached two-car garage on the right side
- Damaged beige/cream colored vinyl siding: faded sections, warped panels, visible cracks, storm damage marks
- Simple rectangular footprint with front-facing windows
- Concrete driveway leading to garage
- Basic lawn and minimal landscaping
- Overcast cloudy day
- NO people in the image
- Wide angle shot showing complete front facade
- Photorealistic, high-quality architectural photography style`,
    description: "Before - Ranch with damaged beige siding"
  },
  {
    filename: "before-after-2-after.webp",
    prompt: `Professional real estate photography of a single-story ranch style house with beautiful new siding. Key details:
- SAME low-profile ranch home with attached two-car garage on the right side (identical layout to before image)
- Brand NEW modern blue-gray vinyl siding, professionally installed, pristine condition
- Fresh white trim around windows and garage door
- Simple rectangular footprint with front-facing windows
- Concrete driveway leading to garage
- Well-maintained lawn
- Bright sunny day with blue sky
- Happy middle-aged Caucasian female homeowner (40-50 years old) standing near front door, warm genuine smile, wearing casual blouse
- Natural realistic face with no blemishes or artifacts
- Wide angle shot showing complete front facade
- Photorealistic, high-quality architectural photography style`,
    description: "After - Same ranch with new blue-gray siding + female homeowner"
  },
  {
    filename: "project-10.webp",
    prompt: `Professional photography of an emergency storm damage roof repair scene at a residential home. Key details:
- Large fallen tree branch on residential roof showing significant impact damage
- Professional roofing contractors on scene actively working
- Blue emergency tarp covering the damaged section of roof
- Workers wearing safety gear (hard hats, harnesses)
- White work truck with ladder rack visible in driveway
- Partially cloudy sky, active workday lighting
- Sense of professional emergency response and competence
- Wide angle shot showing the scope of damage and repair work
- Photorealistic, documentary-style photography`,
    description: "Storm damage project - emergency tree damage repair"
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
      // Log the response for debugging
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
  console.log("   Guardian Roofing - Project Image Generator");
  console.log("═══════════════════════════════════════════════════════════");

  // Verify API key
  if (!API_KEY || API_KEY === "your_api_key_here") {
    console.error("\n❌ ERROR: Gemini_API_KEY not found or not set in .env.local");
    console.error("   Get a free API key at: https://aistudio.google.com/app/apikey");
    process.exit(1);
  }

  console.log(`\n📁 Output directory: ${OUTPUT_DIR}`);
  console.log(`📝 Images to generate: ${imageConfigs.length}`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Initialize Gemini AI
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  // Generate images sequentially (to avoid rate limits)
  let successCount = 0;
  let failCount = 0;

  for (const config of imageConfigs) {
    const success = await generateImage(ai, config);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }

    // Add delay between requests to respect rate limits
    if (imageConfigs.indexOf(config) < imageConfigs.length - 1) {
      console.log("   ⏳ Waiting 3 seconds before next image...");
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  console.log("\n═══════════════════════════════════════════════════════════");
  console.log(`   Complete! ✅ ${successCount} succeeded, ❌ ${failCount} failed`);
  console.log("═══════════════════════════════════════════════════════════\n");

  if (failCount > 0) {
    process.exit(1);
  }
}

main().catch(console.error);

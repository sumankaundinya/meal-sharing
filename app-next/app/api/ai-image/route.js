// app/api/ai-image/route.js
import OpenAI from "openai";
import cloudinary from "cloudinary";
import fs from "fs";
import path from "path";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const body = await req.json();
  const { title } = body;

  if (!title) {
    return new Response(JSON.stringify({ message: "Meal title is required" }), {
      status: 400,
    });
  }

  try {
    // Generate image with OpenAI
    const aiResponse = await openai.images.generate({
      model: "gpt-image-1",
      prompt: `A high-quality, appetizing photo of ${title}`,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = aiResponse.data[0].url;

    // Download image locally
    const imageResponse = await fetch(imageUrl);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const tempFilePath = path.join(process.cwd(), `temp_${Date.now()}.png`);
    fs.writeFileSync(tempFilePath, buffer);

    // Upload to Cloudinary
    const uploadResult = await cloudinary.v2.uploader.upload(tempFilePath, {
      folder: "meals",
      use_filename: true,
    });

    fs.unlinkSync(tempFilePath);

    return new Response(JSON.stringify({ url: uploadResult.secure_url }), {
      status: 200,
    });
  } catch (err) {
    console.error("OpenAI Image Generation Error:", err.message);

    const fallbackUrl =
      "https://res.cloudinary.com/dupsgxjoi/image/upload/v1762288988/meals/abrm5osjg7c1tnd4h1fw.jpg";

    return new Response(JSON.stringify({ url: fallbackUrl, fallback: true }), {
      status: 200,
    });
  }
}

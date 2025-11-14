import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { title } = await req.json();

    const prompt = `Write a short, catchy description in 10-15 words for a meal titled "${title}".`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const description =
      completion.choices[0].message.content.trim() ||
      "A tasty meal you’ll love!";

    return new Response(JSON.stringify({ description }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("AI error:", err);
    return new Response(JSON.stringify({ error: "AI generation failed" }), {
      status: 500,
    });
  }
}

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { meals, userPreferences } = await req.json();

    const prompt = `
    Based on user preferences: ${JSON.stringify(userPreferences)}.
    Choose 3 meals from this list that match best:
    ${meals.map((m) => m.title).join(", ")}.
    Return JSON like [{ "title": "Meal Name" }].
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const text = completion.choices[0].message.content;

    let recommendations = [];
    try {
      recommendations = JSON.parse(text);
    } catch {
      recommendations = meals.slice(0, 3).map((m) => ({ title: m.title }));
    }

    return new Response(JSON.stringify({ recommendations }), { status: 200 });
  } catch (err) {
    console.error("AI Recommendations error:", err);
    return new Response(
      JSON.stringify({
        recommendations: [
          { title: "Fallback Meal 1" },
          { title: "Fallback Meal 2" },
          { title: "Fallback Meal 3" },
        ],
      }),
      { status: 200 }
    );
  }
}

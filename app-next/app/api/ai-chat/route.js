import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant for the Meal Sharing App. Answer questions about meals, reservations, and app features in a friendly, concise way.",
        },
        { role: "user", content: message },
      ],
    });

    const reply = response.choices[0].message.content;
    return new Response(JSON.stringify({ reply }), { status: 200 });
  } catch (error) {
    console.error("AI Chatbot error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get AI response" }),
      {
        status: 500,
      }
    );
  }
}

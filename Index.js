import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(express.json());

// تشخيص باش نعرفو واش Render قرا المفتاح
console.log("OPENAI_API_KEY =", process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// test route
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    key: process.env.OPENAI_API_KEY ? "FOUND" : "MISSING"
  });
});

// analyze route
app.post("/analyze", async (req, res) => {
  try {
    const text = req.body.text;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
حلل النص التالي:
- هل فيه نميمة؟
- هل فيه سب أو شتم؟
إذا كان سيء أرجع تحذير + آية قصيرة.

النص: "${text}"
          `
        }
      ]
    });

    res.json({
      result: response.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

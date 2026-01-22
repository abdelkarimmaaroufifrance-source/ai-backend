import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
  try {
    const text = req.body.text || "";

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + process.env.OPENAI_KEY
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: `حلل النص:
هل فيه نميمة؟
هل فيه سب أو شتم؟
إذا كان سيء رجع تحذير + آية قصيرة.

النص: "${text}"`
            }
          ]
        })
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Server error", details: e.toString() });
  }
});

app.get("/", (req, res) => {
  res.send("NDbr backend is running");
});

app.listen(3000, () => {
  console.log("Server running");

});
app.get("/ping", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString()
  });
});

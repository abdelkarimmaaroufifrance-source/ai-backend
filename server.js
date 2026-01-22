app.post("/analyze", async (req, res) => {
  try {
    if (!process.env.OPENAI_KEY) {
      return res.status(500).json({ error: "OPENAI_KEY missing" });
    }

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "user", content: req.body.text }
          ]
        })
      }
    );

    const data = await response.json();
    res.json(data);

  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

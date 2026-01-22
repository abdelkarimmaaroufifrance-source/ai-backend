app.post("/analyze", async (req, res) => {
  res.json({
    received: true,
    text: req.body.text || null
  });
});

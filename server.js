import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://cardbey-landing.onrender.com",
      "https://landing.cardbey.com",
    ],
  })
);

// health check
app.get("/", (_req, res) => res.send("Backend is alive ✅"));

// chat route
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "messages[] required" });
    }

    const provider = (process.env.CHAT_PROVIDER || "xai").toLowerCase();
    let url, headers, body;

    if (provider === "xai") {
      url = "https://api.x.ai/v1/chat/completions";
      headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.XAI_API_KEY}`,
      };
      body = JSON.stringify({
        model: process.env.CHAT_MODEL || "grok-2-1212",
        messages,
      });
    } else {
      url = "https://api.openai.com/v1/chat/completions";
      headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      };
      body = JSON.stringify({
        model: process.env.CHAT_MODEL || "gpt-4o-mini",
        messages,
      });
    }

    const r = await fetch(url, { method: "POST", headers, body });
    const text = await r.text();
    res.status(r.status).type("application/json").send(text);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Chat error." });
  }
});

// listen
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

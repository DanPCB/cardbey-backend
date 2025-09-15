const express = require("express");
const router = express.Router();

// if you're on Node 18+, fetch is global
// if not, install node-fetch and import it
// const fetch = (...args) => import("node-fetch").then(({default: f}) => f(...args));

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "messages[] required" });
    }

    const provider = (process.env.CHAT_PROVIDER || "xai").toLowerCase();
    let url, headers, body;

    if (provider === "xai") {
      const key = process.env.XAI_API_KEY;
      if (!key) return res.status(500).json({ error: "Missing XAI_API_KEY" });

      url = "https://api.x.ai/v1/chat/completions";
      headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      };
      body = JSON.stringify({
        model: process.env.CHAT_MODEL || "grok-2-1212",
        messages,
      });
    } else {
      const key = process.env.OPENAI_API_KEY;
      if (!key) return res.status(500).json({ error: "Missing OPENAI_API_KEY" });

      url = "https://api.openai.com/v1/chat/completions";
      headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      };
      body = JSON.stringify({
        model: process.env.CHAT_MODEL || "gpt-4o-mini",
        messages,
      });
    }

    const r = await fetch(url, { method: "POST", headers, body });
    const text = await r.text();
    res.status(r.status).type("application/json").send(text);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chat error." });
  }
});

module.exports = router;

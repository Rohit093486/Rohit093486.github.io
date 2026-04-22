require("dotenv").config();
const path = require("path");
const express = require("express");
const OpenAI = require("openai");

const app = express();
const port = Number(process.env.PORT || 3000);

const portfolioContext = `
You are the AI assistant for Rohit Parihar's portfolio website.

Use this profile data as first-party truth:
- Role: Senior Full Stack Developer with 5+ years experience.
- Domains: Banking, insurance, automation, industrial systems.
- Core stack: React, Angular, TypeScript, Python, FastAPI, Node.js, PostgreSQL, MySQL, MongoDB.
- Security/auth: Azure MSAL, OAuth 2.0, JWT, RBAC, Keycloak.
- DevOps: Docker, Kubernetes, Azure DevOps, Jenkins, CI/CD, Helm.
- Key outcomes: 67% onboarding time reduction, 45% verification cost reduction, 40% UI performance improvement.
- Company: WalkingTree Technologies (Associate Software Engineer Jan 2021-Apr 2023, Software Engineer Apr 2023-Apr 2024, Senior Software Engineer Apr 2024-Present).
- Projects:
  1) Mashreq Audit Platform (Tech Lead): React 19 + FastAPI + PostgreSQL + Azure MSAL + SSE.
  2) TAP-DAP Test Automation (Tech Lead): AI test generation with LangChain/LangGraph.
  3) Profile Trading Platform (Tech Lead): secure marketplace with JWT/OAuth2.
  4) Plutas.AI Insurance Claims Platform: 50% faster processing.
  5) Alpha Tree Stock Analysis Platform: 35% faster decision flow.
  6) Diwas Video-KYC (IDRBT): onboarding from 15 to 5 minutes, 45% lower validation cost.
  7) Grid Scaled Foundations Robotics UI.
  8) Profile Management Portal.
  9) Oneshield Industrial Management.
- Contact: rohitparihar9758@gmail.com, +91-8791458460, linkedin.com/in/-rohitparihar.

Behavior rules:
1) If user asks about Rohit, portfolio, resume, skills, projects, impact, hiring, rates, availability, answer from profile context.
2) If question is unrelated or out-of-scope (general knowledge/current events), use web search tool to provide helpful answer.
3) Keep answers concise, clear, and professional.
4) Never invent resume data not listed above.
`;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post("/api/chat", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "Missing OPENAI_API_KEY in environment.",
      });
    }

    const { message, history } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message is required" });
    }

    const safeHistory = Array.isArray(history) ? history.slice(-6) : [];
    const historyLines = safeHistory
      .map((item) => `${item.role === "assistant" ? "Assistant" : "User"}: ${item.content}`)
      .join("\n");

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: [
        {
          role: "system",
          content: portfolioContext,
        },
        {
          role: "user",
          content: `Conversation so far:\n${historyLines || "None"}\n\nCurrent user question:\n${message}`,
        },
      ],
      tools: [{ type: "web_search_preview" }],
    });

    const reply = response.output_text || "I could not generate an answer at this moment.";
    res.json({ reply });
  } catch (error) {
    res.status(500).json({
      error: "Failed to generate chatbot response.",
      details: error?.message || "Unknown error",
    });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Portfolio running at http://localhost:${port}`);
});

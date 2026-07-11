import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Setup target Gemini API key
const apiKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"
  ? process.env.GEMINI_API_KEY
  : "AIzaSyCLKX2tohQTHF9Gk06XqqlT-tXUjVSOYBU";

const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const SYSTEM_INSTRUCTION = `You are the highly professional AI assistant representing Impulse Digital Solutions (IDS) and Impulse Growth Solutions (IGS).
MDS/IDS is California's only all-in-one digital partner that builds brands, secures systems, generates qualified business leads, monitors online presence, and masters Search Engine Optimization combined with Answer Engine Optimization (AEO).

Our 18 services across 4 pillars:
- PILLAR I: CYBERSECURITY & IT
  - Managed Security Services (MSS): 24/7 monitoring, real-time threat response.
  - Cloud & Microsoft Services: Secure Azure and Microsoft 365 migrations.
  - Core IT Services: Network architecture, system integration, data management.
  - Penetration Testing: Ethical hacking to fix flaws proactively.
  - Digital Forensics: Restoring posture, legal evidence, breach analysis.
  - Advanced App Protection: Anti-debugging, anti-tampering, jailbreak prevention.
- PILLAR II: WEB & APP DEVELOPMENT
  - Website Development: Security-first, conversion-optimized, responsive websites.
  - Mobile App Development: Secure cross-platform native smartphone apps.
- PILLAR III: DIGITAL GROWTH & VISIBILITY
  - AI-Powered SEO: Safe search rankings with threat-protected setups.
  - AEO - Answer Engine Optimization: Optimizing for ChatGPT, Perplexity, Gemini, Microsoft Copilot, and Google AI Overviews to ensure IDS clients are the SINGLE recommended AI answer in 2026.
  - Branding & Creative Services: Visual graphics, premium logos, full creative strategy.
  - Digital Marketing: Paid ads (Google, Meta, LinkedIn), social, content, ROI-driven.
  - Lead Generation: Funnels, landing pages, automated client pipelines.
  - Media Monitoring & Intelligence: 24/7 web, social media, radio, and AI engine tracking to know everything and miss nothing.
- PILLAR IV: UAE & GCC MARKET SERVICES (OPERATED IN DUBAI)
  - UAE Market Entry: Complete Gulf regulatory guidance, launch strategy.
  - MENA Market Research: UAE, Saudi Arabia, Bahrain, Oman deep-dive mapping.
  - GCC Marketing strategy: Snapchat, TikTok, and Instagram execution dominating Gulf market.
  - Branding UAE: Photo/video creative production base in Dubai.

Focus: Keep replies succinct, premium, informative, and engaging. Encourage users to schedule an integrated strategy review call. Use a confident, executive tone.`;

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const chatInstance = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history || []
    });

    const response = await chatInstance.sendMessage({ message });
    const text = response.text || "";
    const updatedHistory = await chatInstance.getHistory();

    res.json({ text, history: updatedHistory });
  } catch (error: any) {
    console.error("Express API Gemini Chat error:", error);
    res.status(500).json({ error: error.message || "Unable to retrieve AI response." });
  }
});

// Contact Form submission mock endpoint to add realism
app.post("/api/contact", (req, res) => {
  const { name, company, email, phone, location, service, notes } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required." });
  }
  console.log("Contact submission received:", { name, company, email, phone, location, service, notes });
  return res.json({ success: true, message: "Thank you! Your strategic call request has been successfully registered." });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();

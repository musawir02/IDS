import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { createContactHandler } from "./server/contact";
import {
  logStartupWarning,
  parseTrustProxy,
  registerEnquiryRoutes,
  startSmtpStartupCheck,
} from "./server/enquiry";

// Use .env.local for local development. In production, Hostinger injects these
// environment variables directly and dotenv will not overwrite them.
dotenv.config({ path: ".env.local" });

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Real visitor IP behind the hosting proxy, used only for the landing page's per-IP rate limit
const trustProxy = parseTrustProxy(process.env.TRUST_PROXY);
if (trustProxy.value !== undefined) {
  app.set("trust proxy", trustProxy.value);
} else if (trustProxy.warning) {
  logStartupWarning(trustProxy.warning);
}

// Setup target Gemini API key. Without one, only the chatbot is unavailable.
const apiKey = process.env.GEMINI_API_KEY?.trim();
const hasGeminiKey = Boolean(apiKey) && apiKey !== "MY_GEMINI_API_KEY";

if (!hasGeminiKey) {
  console.warn("GEMINI_API_KEY is not set. The chatbot is unavailable; the rest of the site keeps working.");
}

const ai = hasGeminiKey
  ? new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    })
  : null;

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
  if (!ai) {
    return res.status(503).json({ error: "Chat is temporarily unavailable." });
  }
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

app.post("/api/contact", createContactHandler());

// Digital Marketing Packages landing page: enquiries by email, separate from /api/contact
registerEnquiryRoutes(app, { perIpLimit: trustProxy.perIpLimit });

// The landing page lives at /digital-marketing/. Without the slash, Vite's dev server would
// serve the main site, so redirect and keep the query string (campaign parameters)
app.get("/digital-marketing", (req, res, next) => {
  const queryStart = req.originalUrl.indexOf("?");
  const pathname = queryStart === -1 ? req.originalUrl : req.originalUrl.slice(0, queryStart);
  if (pathname.endsWith("/")) return next();
  const query = queryStart === -1 ? "" : req.originalUrl.slice(queryStart);
  res.redirect(301, `/digital-marketing/${query}`);
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
    // Runs in the background and only logs; missing or unavailable SMTP never blocks startup
    startSmtpStartupCheck();
  });
}

startServer();

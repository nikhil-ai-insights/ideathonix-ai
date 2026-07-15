import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { generateIdea } from "./server/gemini";

// Load environment variables in local dev
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json({ limit: "10mb" }));

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // POST generate idea
  app.post("/api/generate", async (req, res) => {
    try {
      const { mode, inputs } = req.body;
      if (!mode || !inputs) {
        return res.status(400).json({ error: "Missing required fields 'mode' or 'inputs'" });
      }

      if (mode !== "hackathon" && mode !== "startup" && mode !== "organizer") {
        return res.status(400).json({ error: "Invalid 'mode' parameter. Must be 'hackathon', 'startup', or 'organizer'" });
      }

      const result = await generateIdea(mode, inputs);
      return res.json({ success: true, result });
    } catch (error: any) {
      console.error("Express Error generating idea:", error);
      return res.status(500).json({ 
        error: error.message || "Failed to generate AI response. Please verify the Gemini API key." 
      });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});

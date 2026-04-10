import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import userRoutes from "./routes/user.routes.js";
import adventureRoutes from "./routes/adventure.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import stateRoutes from "./routes/state.routes.js";
import sitemapRouter from "./routes/sitemap.routes.js";

import configurePassport from "./config/passport.js";
import { isOriginAllowed, setCorsHeaders } from "./utils/corsHelper.js";
import connectDB from "./db/index.js";

dotenv.config();

const app = express();

/* =======================
   CORS (SAME CLEAN PATTERN)
======================= */
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // postman / server-to-server

    if (isOriginAllowed(origin)) {
      return callback(null, origin); // exact origin for cookies
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

/* =======================
   BODY / COOKIE
======================= */
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

/* =======================
   COOP / COEP (OAuth Safe)
======================= */
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});

/* =======================
   PASSPORT (SAFE ON VERCEL)
======================= */
configurePassport();
app.use(passport.initialize());

/* =======================
   DATABASE CONNECTION MIDDLEWARE (FOR VERCEL SERVERLESS)
======================= */
app.use(async (req, res, next) => {
  // Ensure DB is connected before handling request (important for serverless)
  if (mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
    } catch (error) {
      console.error("Database connection error:", error);
      setCorsHeaders(req, res);
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
      });
    }
  }
  next();
});

/* =======================
   REQUEST LOGGER
======================= */
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

/* =======================
   ROUTES
======================= */
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/v1", adventureRoutes);
app.use("/api/states", stateRoutes);

// SEO sitemap
app.use("/", sitemapRouter);

// Backend robots.txt - frontend SEO-friendly version with all sitemaps
app.get("/robots.txt", (req, res) => {
  const robotsTxt = `# robots.txt for FriskyTrails (https://www.friskytrails.in)
# Purpose: maximize SEO for tour pages, block private/admin paths, and prevent duplicate content from query strings.

User-agent: *
# Allow crawling of the main site content
Allow: /

# Block admin/private/internal pages
Disallow: /admin/
Disallow: /login/
Disallow: /dashboard/
Disallow: /api/
Disallow: /temp/

# Protect against duplicate content from search/filter query parameters
Disallow: /*?s=
Disallow: /*?search=
Disallow: /search/
Disallow: /*?filter=

# Sitemap declaration(s) for search engines
Sitemap: https://www.friskytrails.in/sitemap.xml
Sitemap: https://www.friskytrails.in/sitemap-static.xml
Sitemap: https://www.friskytrails.in/sitemap-blogs.xml
Sitemap: https://www.friskytrails.in/sitemap-countries.xml
Sitemap: https://www.friskytrails.in/sitemap-states.xml
Sitemap: https://www.friskytrails.in/sitemap-cities.xml
Sitemap: https://www.friskytrails.in/sitemap-tours-listing.xml
Sitemap: https://www.friskytrails.in/sitemap-tags-listing.xml

# Block overly aggressive scrapers and bots that waste server resources
User-agent: MJ12bot
Disallow: /

User-agent: Dotbot
Disallow: /

User-agent: Rogerbot
Disallow: /

User-agent: Exabot
Disallow: /

User-agent: AhrefsBot
Disallow: /`;
  
  res.header("Content-Type", "text/plain");
  res.send(robotsTxt);
});

/* =======================
   HEALTH CHECKS
======================= */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Frisky Trails API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

/* =======================
   ROUTE DEBUGGER
======================= */
app.get("/__routes", (req, res) => {
  try {
    const stack =
      (app._router && app._router.stack) ||
      (app.router && app.router.stack) ||
      [];

    const routes = stack.map((layer) => {
      if (layer.route) {
        return { path: layer.route.path, methods: layer.route.methods };
      }
      return { name: layer.name };
    });

    res.json({ success: true, routes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* =======================
   404 HANDLER
======================= */
app.use((req, res) => {
  setCorsHeaders(req, res);
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

/* =======================
   GLOBAL ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.message);

  setCorsHeaders(req, res);

  let statusCode = 500;

  if (typeof err.statusCode === "number" && err.statusCode >= 100 && err.statusCode < 600) {
    statusCode = err.statusCode;
  } else if (err.code === 11000) {
    statusCode = 409;
  } else if (err.name === "ValidationError" || err.name === "CastError") {
    statusCode = 400;
  } else if (err.name === "JsonWebTokenError" || err.name === "UnauthorizedError") {
    statusCode = 401;
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

/* =======================
   EXPORT (VERCEL STYLE)
======================= */
export default app;

/* =======================
   LOCAL DEV SERVER ONLY
======================= */
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.log("MONGODB connection failed: ", err);
      process.exit(1);
    });
}

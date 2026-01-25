import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let auth;
let sheets;

try {
  // 👉 PROD / VERCEL: use ENV variables
  if (process.env.GOOGLE_PRIVATE_KEY) {
    console.log("🔐 Using Google credentials from ENV");

    auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }
  // 👉 LOCAL: use credentials.json
  else {
    const credentialsPath = path.join(__dirname, "..", "credentials.json");

    if (!fs.existsSync(credentialsPath)) {
      throw new Error(
        `Google credentials.json not found at ${credentialsPath}`
      );
    }

    console.log("📄 Using local credentials.json");

    auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }

  sheets = google.sheets({
    version: "v4",
    auth,
  });

  console.log("✅ Google Sheets API initialized successfully");
} catch (error) {
  console.error("❌ Failed to initialize Google Sheets API:", error.message);

  // Prevent app crash
  sheets = {
    spreadsheets: {
      values: {
        append: async () => {
          throw new Error("Google Sheets credentials not configured");
        },
      },
    },
  };
}

export { sheets };

// This file MUST be the first import in index.js.
// ES module imports are hoisted, so dotenv.config() inside a regular file
// won't run before other modules are evaluated. Importing THIS file first
// ensures env vars are loaded before any other module reads them.
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../.env") });

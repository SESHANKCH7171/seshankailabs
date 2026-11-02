import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to safely read file content
function readSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    return '';
  }
}

// 1. Gather core specs from seshank_skill.md
const specContent = readSafe(path.join(rootDir, 'seshank_skill.md'));

// 2. Gather architecture definitions
const architecturesContent = readSafe(path.join(rootDir, 'src/data/architectures.js'));

// 3. Compile clean, dense facts
const siteKnowledge = {
  organization: "Seshank AI Labs",
  founder: "Seshank (AI Agent Systems Architect)",
  domain: "B2B Aerospace & Defense in India, GCC & UK Corridor",
  targetEcosystems: ["Nashik manufacturing corridor", "HAL Ozar", "MIDC Satpur / Ambad ecosystem"],
  focusProblems: [
    "AS9100 / military standard compliance documentation and audit readiness",
    "Defense RFP and multi-hundred-page tender parsing with clause cross-referencing",
    "Complex supply chain traceability and vendor qualification"
  ],
  services: [
    "Enterprise AI agent systems architecture",
    "Custom local RAG and document intelligence pipelines",
    "Defense-grade automated verification and audit systems",
    "Specialist AI systems engineering and consulting"
  ],
  contact: {
    email: "seshank@seshankailabs.com",
    action: "Book a 20-minute discovery call or send an email"
  },
  systemSummary: `
Seshank AI Labs designs and deploys autonomous AI agent systems for aerospace, defense, and high-precision manufacturing. 
We do not use generic AI wrappers or ungrounded hype. Systems are engineered for strict compliance, high reliability, zero hallucination, and deterministic business outcomes.
`
};

const outputPath = path.join(rootDir, 'site_knowledge.json');
fs.writeFileSync(outputPath, JSON.stringify(siteKnowledge, null, 2));

console.log(`[Knowledge Compiler] Successfully updated persistent site knowledge at: ${outputPath}`);

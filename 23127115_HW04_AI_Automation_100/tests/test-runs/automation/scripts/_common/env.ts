import fs from 'node:fs';
import path from 'node:path';

type AutomationEnv = {
  frontendBaseUrl: string;
  apiBaseUrl: string;
};

const scriptsRoot = path.resolve(__dirname, '..');
const envPath = path.join(scriptsRoot, '.env');

function parseEnvValue(rawValue: string): string {
  const trimmed = rawValue.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function loadEnvFile(filePath: string): void {
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const normalized = trimmed.startsWith('export ') ? trimmed.slice(7).trim() : trimmed;
    const equalsIndex = normalized.indexOf('=');
    if (equalsIndex <= 0) continue;

    const key = normalized.slice(0, equalsIndex).trim();
    const value = parseEnvValue(normalized.slice(equalsIndex + 1));
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(envPath);

export const automationEnv: AutomationEnv = {
  frontendBaseUrl: process.env.ESHOP_FRONTEND_BASE_URL ?? 'http://localhost:5173',
  apiBaseUrl: process.env.ESHOP_API_BASE_URL ?? 'http://localhost:3000',
};

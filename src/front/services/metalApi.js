export async function getDailyMetals({ force = false } = {}) {
  if (!API_KEY) throw new Error("Falta VITE_METALS_KEY en .env");
  const goldCached = readDaily("gold");
  const silverCached = readDaily("silver");
  if (!force && isFresh(goldCached) && isFresh(silverCached)) return { gold: goldCached, silver: silverCached };
  if (!force && inFlight) return inFlight;
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    if (goldCached || silverCached) return { gold: goldCached, silver: silverCached };
  }
  inFlight = (async () => {
    const url = `${API_BASE.replace(/\/$/, "")}/latest?api_key=${encodeURIComponent(API_KEY)}&base=${encodeURIComponent(CURRENCY)}&currencies=XAU,XAG`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    let xau = Number(data?.rates?.XAU);
    let xag = Number(data?.rates?.XAG);
    if (!Number.isFinite(xau) || !Number.isFinite(xag)) throw new Error("Respuesta sin tasas XAU/XAG válidas");
    const priceOzXAU = xau < 1 ? 1 / xau : xau;
    const priceOzXAG = xag < 1 ? 1 / xag : xag;
    const now = NOW();
    const today = TODAY();
    const gold = { date: today, currency: CURRENCY, priceOz: priceOzXAU, priceGram: priceOzXAU / OZ_TO_G, fetchedAt: now };
    const silver = { date: today, currency: CURRENCY, priceOz: priceOzXAG, priceGram: priceOzXAG / OZ_TO_G, fetchedAt: now };
    try { saveRecord("gold", gold); saveRecord("silver", silver); } catch {}
    return { gold, silver };
  })();
  try { return await inFlight; } finally { inFlight = null; }
}

export async function getDailyGold({ force = false } = {}) {
  const c = readDaily("gold");
  if (!force && isFresh(c)) return c;
  const both = await getDailyMetals({ force });
  return both.gold;
}

export async function getDailySilver({ force = false } = {}) {
  const c = readDaily("silver");
  if (!force && isFresh(c)) return c;
  const both = await getDailyMetals({ force });
  return both.silver;
}

export function getGoldHistory()   { return readHistory("gold"); }
export function getSilverHistory() { return readHistory("silver"); }
export function clearGoldCache()   { localStorage.removeItem(keys("gold").daily); }
export function clearSilverCache() { localStorage.removeItem(keys("silver").daily); }

const env = (k, fb = "") => {
  const v = typeof import.meta !== "undefined" ? import.meta.env : {};
  const viteVal = v && (v[`VITE_${k}`] ?? v[k]); if (viteVal !== undefined) return viteVal;
  const pe = typeof process !== "undefined" ? process.env : {};
  const craVal = pe && (pe[`REACT_APP_${k}`] ?? pe[k]); if (craVal !== undefined) return craVal;
  return fb;
};

const API_BASE = env("METALS_BASE", "https://api.metalpriceapi.com/v1");
const API_KEY  = env("METALS_KEY", "");
const CURRENCY = env("CURRENCY", "EUR");
const TTL_H    = Number(env("METALS_TTL_HOURS", 24));

const OZ_TO_G = 31.1034768;
const NOW = () => Date.now();
const TODAY = () => new Date().toISOString().slice(0, 10);

const keys = (metal) => ({
  daily: `cuatrok:${metal}:${CURRENCY}:daily`,
  hist:  `cuatrok:${metal}:${CURRENCY}:history`,
});

const isFresh = (rec) => rec && typeof rec.fetchedAt === "number" && Date.now() - rec.fetchedAt < TTL_H * 3600_000;

function saveRecord(metal, record) {
  const k = keys(metal);
  localStorage.setItem(k.daily, JSON.stringify(record));
  const history = JSON.parse(localStorage.getItem(k.hist) || "[]").filter((r) => r.date !== record.date);
  history.push(record);
  localStorage.setItem(k.hist, JSON.stringify(history));
}

function readDaily(metal)   { try { return JSON.parse(localStorage.getItem(keys(metal).daily) || "null"); } catch { return null; } }
function readHistory(metal) { try { return JSON.parse(localStorage.getItem(keys(metal).hist)  || "[]").sort((a,b)=>a.date.localeCompare(b.date)); } catch { return []; } }

let inFlight = null;
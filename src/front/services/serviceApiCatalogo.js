// src/front/services/serviceApiCatalogo.js
const RAW_BASE =
  import.meta?.env?.VITE_API_URL ||
  "http://localhost:3001"; // ajusta si tu backend corre en otro puerto

// Normaliza: sin barra final
const API_BASE_URL = RAW_BASE.replace(/\/+$/, "");

// Une base y path evitando // y garantizando una sola /
const join = (base, path) => {
  const cleanPath = String(path ?? "").replace(/^\/+/, "");
  return `${base}/${cleanPath}`;
};

async function requestJson(path, options = {}) {
  const { method = "GET", body = null, signal } = options;

  const response = await fetch(join(API_BASE_URL, path), {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    throw new Error(`Error ${response.status}: ${details || response.statusText}`);
  }
  return response.json();
}

/**
 * GET /jewells?category=...&brand=... etc.
 */
export async function fetchProducts(filters = {}, signal) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(filters)) {
    if (v !== undefined && v !== null && v !== "") params.set(k, v);
  }
  const qs = params.toString();
  const result = await requestJson(`jewells${qs ? `?${qs}` : ""}`, { signal });
  return Array.isArray(result?.items) ? result.items : Array.isArray(result) ? result : [];
}

// (Opcional) carro de compras para el 422
export async function getShoppingCart(signal) {
  // Asegúrate de que tu backend acepte GET y no requiera auth obligatoria
  return requestJson("api/shopping-cart", { signal });
}

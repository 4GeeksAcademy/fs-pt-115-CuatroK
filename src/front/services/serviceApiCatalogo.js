// src/front/services/serviceApiCatalogo.js

// Normaliza la URL base para evitar dobles barras y permite usar variables de entorno de Vite
const RAW_BASE =
  import.meta?.env?.VITE_API_URL ||
  process.env?.VITE_API_URL ||
  "http://localhost:3001"; // cambia al puerto de tu backend

// Elimina cualquier barra final
const API_BASE_URL = RAW_BASE.replace(/\/+$/, "");

/**
 * Helper para peticiones JSON
 * - credentials: 'include' para enviar cookies/sesión si el backend lo requiere
 * - timeout opcional para evitar cuelgues
 */
async function requestJson(path, options = {}) {
  const {
    method = "GET",
    body = null,
    signal,
    timeoutMs = 15000,
    headers = {},
    credentials = "include", // cámbialo a 'same-origin' o 'omit' si no usas sesión
  } = options;

  const controller = new AbortController();
  const t = setTimeout(
    () => controller.abort(new DOMException("Timeout", "AbortError")),
    timeoutMs
  );

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: signal ?? controller.signal,
      credentials,
    });

    if (!response.ok) {
      const details = await response.text().catch(() => "");
      throw new Error(`Error ${response.status}: ${details || response.statusText}`);
    }

    // Si no hay contenido, devuelve null
    if (response.status === 204) return null;

    return response.json();
  } finally {
    clearTimeout(t);
  }
}

/**
 * Obtiene productos (joyas) desde /jewells.
 * Puedes pasar filtros de catálogo: { category, brand, metal, ... }
 * Devuelve siempre un array (items).
 */
export async function fetchProducts(filters = {}, signal) {
  const queryParams = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.set(key, value);
    }
  }

  const qs = queryParams.toString();
  const result = await requestJson(`/jewells${qs ? `?${qs}` : ""}`, { signal });

  // La API suele responder { ok, total, items }
  return Array.isArray(result?.items) ? result.items : Array.isArray(result) ? result : [];
}

// (Opcional) exporta también el helper si lo necesitas en otros servicios
export { requestJson, API_BASE_URL };

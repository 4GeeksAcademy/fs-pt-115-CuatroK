
const API_BASE_URL = (
  import.meta.env.VITE_BACKEND_URL
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_BACKEND_URL ||
  "http://localhost:3001"
).replace(/\/$/, "");


export async function getJoyasSearch() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/jewells`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const json = await res.json();

    let items = [];

    if (Array.isArray(json)) {
      items = json;
    } else if (json && typeof json === "object") {
      if (Array.isArray(json.items)) {
        items = json.items;
      } else if (Array.isArray(json.results)) {
        items = json.results;
      } else if (Array.isArray(json.data)) {
        items = json.data;
      }
    }

    console.log("[getJoyasSearch] items cargados:", items.length || 0);

    return Array.isArray(items) ? items : [];
  } catch (err) {
    console.error("[getJoyasSearch] Falló la carga:", err);
    return [];
  }
}

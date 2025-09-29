const API_BASE_URL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");

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

export const postJewell = async (jewell, setLoading, setSuccessful) => {
  try {
    setLoading(true);
    const response = await fetch(`${API_BASE_URL}/api/jewells`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jewell),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error HTTP: ${response.status}`);
    }
    setSuccessful("Joya creada satisfactoriamente");
    return await response.json();
  } catch (error) {
    console.error("❌ postJewell error:", error.message);
    throw error;
  } finally {
    setLoading(false);
  }
};

export const updateJewell = async (idOrSlug, formData, setSaving) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/jewells/${idOrSlug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    alert("Producto actualizado ✅");
  } catch (err) {
    console.error(err);
    alert("Error al actualizar producto ❌");
  } finally {
    setSaving(false);
  }
};

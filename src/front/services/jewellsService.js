const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

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
    setSuccessful("Hubo un error en la creación de la joya");
    console.error("❌ postJewell error:", error.message);
    throw error;
  } finally {
    setLoading(false);
  }
};

export const updateJewell = async (
  idOrSlug,
  formData,
  setSaving,
  setUpdateSuccessfull
) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/jewells/${idOrSlug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    setUpdateSuccessfull("Se actualizo la joya correctamente");
  } catch (err) {
    setUpdateSuccessfull(
      "No se pudo actualizar la joya, verifica los datos colocados"
    );
    console.error(err);
  } finally {
    setSaving(false);
  }
};

export const deleteJewell = async (jewell_id, setDeleting) => {
  setDeleting(true);
  try {
    const res = await fetch(`${API_BASE_URL}/api/jewells/${jewell_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
  } catch (error) {
    console.error(err);
  } finally {
    setDeleting(false);
  }
};

export const postCatalogo = async (catalogo) => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  try {
    const response = await fetch(`${API_URL}/api/jewells`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ catalogo }),
    });
    const data = await response.json();
  } catch (error) {
    console.error(error);
  }
};

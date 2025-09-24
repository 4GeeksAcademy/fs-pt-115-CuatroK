const url = import.meta.env.VITE_BACKEND_URL + "/api";
export const SumCartProduct = async (jewell_id) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await fetch(`${url}/shopping-cart/${jewell_id}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Error en el fetch");
  } catch (error) {
    console.error(error.message);
  }
};
export const substractCartProduct = async (jewell_id) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await fetch(
      `${url}/shopping-cart/${jewell_id}/substract`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Error en el fetch");
  } catch (error) {
    console.error(error.message);
  }
};

export const removeCartItem = async (jewell_id) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await fetch(
      `${url}/shopping-cart/${jewell_id}/remove-item`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Error en el fetch");
  } catch (error) {
    console.error(error.message);
  }
};

export const getSales = async (user_id) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${url}/sale/${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Error en el fetch");
  const data = await response.json();
  return data;
};
export const GetCartProducts = async () => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await fetch(`${url}/shopping-cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Error al obtener el carrito");
    return await response.json(); 
  } catch (error) {
    console.error(error.message);
    return [];
  }
};
export const getUser = async () => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(
    "https://musical-robot-g44jp7xjvrwj299vr-3001.app.github.dev/api/user/client/user",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
};

export const updateUserData = async (dataUpdated) => {
  const token = sessionStorage.getItem("token");
  console.log(dataUpdated);
  try {
    const response = await fetch(
      "https://musical-robot-g44jp7xjvrwj299vr-3001.app.github.dev/api/user/client/user",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataUpdated),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      console.error(data.msg);
    }
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const updateAddressData = async (dataUpdated, id) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await fetch(
      `https://musical-robot-g44jp7xjvrwj299vr-3001.app.github.dev/api/user/client/address/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataUpdated),
      }
    );
    if (!response.ok) {
      throw new Error("Error al crear la dirección");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const createAddress = async (address) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await fetch(
      "https://musical-robot-g44jp7xjvrwj299vr-3001.app.github.dev/api/user/client/address",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(address),
      }
    );

    if (!response.ok) {
      throw new Error("Error al crear la dirección");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("createAddress error:", error.message);
    throw error;
  }
};

export const deleteAddress = async (id) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await fetch(
      `https://musical-robot-g44jp7xjvrwj299vr-3001.app.github.dev/api/user/client/address/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al borrar Dirección");
    }
    return await response.json();
  } catch (error) {
    console.error("createAddress error:", error.message);
    throw error;
  }
};

export const ChangePassword = async (userEmail, setAlert) => {
  console.log(userEmail);
  try {
    await fetch(
      "https://musical-robot-g44jp7xjvrwj299vr-3001.app.github.dev/api/user/client/email-change-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
        }),
      }
    );
    setAlert(
      "Si tenemos un correo registrado le enviaremos un link para reestablecer su contraseña"
    );
  } catch (error) {
    console.error(error);
    setAlert(
      "Si tenemos un correo registrado le enviaremos un link para reestablecer su contraseña"
    );
  }
};

export const resetPassword = async (token, password) => {
  try {
    const response = await fetch(
      "https://musical-robot-g44jp7xjvrwj299vr-3001.app.github.dev/api/user/client/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: password,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
export const getJoyasSearch = async () => {
  try {
    const res = await fetch("https://urban-computing-machine-5gwj946rvqp2p44v-3001.app.github.dev/api/jewells", {
      method: "GET" 
    })
    const data = await res.json();
    console.log(data);
    
  } catch (error) {
    console.error(error);
  }
};



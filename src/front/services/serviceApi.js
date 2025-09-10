// export const registerUser = async (
//   userData,
//   navigate,
//   setAlertError,
//   setAlertMsg
// ) => {
//   try {
//     const response = await fetch(
//       "https://musical-robot-g44jp7xjvrwj299vr-3001.app.github.dev/api/user/client/register",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.msg);
//     }

//     setAlertError(false);
//     console.log(data);
//     navigate("/login");
//     return data;
//   } catch (error) {
//     setAlertError(true);
//     setAlertMsg(error.message);
//     console.error(error.message);
//   }
// };

// export const loginUser = async (
//   userData,
//   navigate,
//   tokenData,
//   setAlertError,
//   setAlertMsg
// ) => {
//   try {
//     const response = await fetch(
//       "https://musical-robot-g44jp7xjvrwj299vr-3001.app.github.dev/api/user/client/login",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       }
//     );
//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.msg);
//     }

//     setAlertError(false);
//     navigate("/");
//     console.log(data);
//     tokenData(data.token);
//     return data;
//   } catch (error) {
//     setAlertMsg(error.message);
//     setAlertError(true);
//     console.error(error.message);
//   }
// };

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

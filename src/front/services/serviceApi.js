export const registerUser = async (
  userData,
  navigate,
  setAlertError,
  setAlertMsg
) => {
  try {
    const response = await fetch(
      "https://musical-robot-g44jp7xjvrwj299vr-3001.app.github.dev/api/user/client/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg);
    }

    setAlertError(false);
    console.log(data);
    navigate("/login");
    return data;
  } catch (error) {
    setAlertError(true);
    setAlertMsg(error.message);
    console.error(error.message);
  }
};

export const loginUser = async (
  userData,
  navigate,
  tokenData,
  setAlertError,
  setAlertMsg
) => {
  try {
    const response = await fetch(
      "https://musical-robot-g44jp7xjvrwj299vr-3001.app.github.dev/api/user/client/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg);
    }

    setAlertError(false);
    navigate("/");
    console.log(data);
    tokenData(data.token);
    return data;
  } catch (error) {
    setAlertMsg(error.message);
    setAlertError(true);
    console.error(error.message);
  }
};

import axios from "axios";

export const authenticateGoogleToken = async (t: string | undefined) => {
  if (!t) return;

  try {
    const response = await axios.post("/api/auth/google", { google_token: t });

    const { user, access_token } = response.data;
    return { user, access_token };
  } catch (error) {
    console.log(error);
  }
};

export const logoutRequest = async (cb: () => void) => {
  try {
    axios.post("/api/auth/logout").then(() => cb());
  } catch (error) {
    console.log(error);
  }
};

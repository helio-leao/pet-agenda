import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const session = localStorage.getItem("session");
    if (!session) {
      return config;
    }
    const { accessToken } = JSON.parse(session);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const config = error.config;

    // get session from local storage
    const sessionData = localStorage.getItem("session");
    if (!sessionData) {
      return Promise.reject(error);
    }
    const session = JSON.parse(sessionData);

    // get a new access token
    try {
      const { data } = await axios.post(`${API_URL}/auth/token`, {
        refreshToken: session.refreshToken,
      });
      session.accessToken = data.accessToken;
      localStorage.setItem("session", JSON.stringify(session));

      // retry the original request with the new token
      config.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(config);
    } catch (refreshError) {
      // localStorage.removeItem("session");  // should logout from api before removing this
      return Promise.reject(refreshError);
    }
  }
);

export default api;

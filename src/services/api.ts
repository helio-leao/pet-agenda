import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const session = localStorage.getItem("session");

    if (session) {
      const { accessToken } = JSON.parse(session);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const config = error.config;

    // Avoid multiple refresh attempts for the same request
    if (config._retry) {
      return Promise.reject(error);
    }

    // get session from local storage
    const sessionData = localStorage.getItem("session");
    if (!sessionData) {
      return Promise.reject(error);
    }
    const session = JSON.parse(sessionData);

    // get a new access token
    try {
      const { data } = await api.post(`/auth/token`, {
        refreshToken: session.refreshToken,
      });
      session.accessToken = data.accessToken;
      localStorage.setItem("session", JSON.stringify(session));

      // retry the original request with the new token
      config.headers.Authorization = `Bearer ${data.accessToken}`;
      config._retry = true;
      return api(config);
    } catch (refreshError) {
      // todo: logout???
      return Promise.reject(refreshError);
    }
  }
);

export default api;

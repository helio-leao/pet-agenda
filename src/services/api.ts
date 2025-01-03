import axios from "axios";
import {
  getLocalStorageSession,
  setLocalStorageSession,
} from "../utils/localStorageSession";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const { accessToken } = getLocalStorageSession();
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

    // Avoid multiple refresh attempts for the same request
    if (config._retry) {
      return Promise.reject(error);
    }

    // get session from local storage
    const session = getLocalStorageSession();
    if (!session) {
      return Promise.reject(error);
    }

    // get a new access token
    try {
      const {
        data: { accessToken },
      } = await api.post(`/auth/token`, {
        refreshToken: session.refreshToken,
      });
      session.accessToken = accessToken;
      setLocalStorageSession(session);

      // retry the original request with the new token
      config.headers.Authorization = `Bearer ${accessToken}`;
      config._retry = true;
      return api(config);
    } catch (refreshError) {
      // todo: logout???
      return Promise.reject(refreshError);
    }
  }
);

export default api;

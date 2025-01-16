import axios from "axios";
import {
  getLocalStorageSession,
  removeLocalStorageSession,
  setLocalStorageSession,
} from "../utils/localStorageSession";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const session = getLocalStorageSession();
    if (session) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const { config, response } = error;

    // Avoid multiple refresh attempts for the same request
    if (response?.status !== 401 || config._retry) {
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
      } = await api.post<{ accessToken: string }>(`/auth/token`, {
        refreshToken: session.refreshToken,
      });
      session.accessToken = accessToken;
      setLocalStorageSession(session);

      // retry the original request with the new token
      config.headers.Authorization = `Bearer ${accessToken}`;
      config._retry = true;
      return api(config);
    } catch (refreshError) {
      // todo: clean session instead of reload
      removeLocalStorageSession();
      alert("Session expired. Please, login again.");
      window.location.reload();

      return Promise.reject(refreshError);
    }
  }
);

export default api;

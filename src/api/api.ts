import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const session = localStorage.getItem("session"); // todo: get from context, access token will be removed from there

    if (!session) {
      return config;
    }
    const accessToken = JSON.parse(session).accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

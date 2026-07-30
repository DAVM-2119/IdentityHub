import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});


// Add access token to every request
api.interceptors.request.use((config) => {

  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});


// Automatically refresh expired access token
api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("token/refresh/")
    ) {

      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

      if (!refresh) {

        window.location.href = "/login";

        return Promise.reject(error);

      }

      try {

        const response = await axios.post(

          "http://127.0.0.1:8000/api/token/refresh/",

          {
            refresh,
          }

        );

        const newAccess = response.data.access;
        const newRefresh = response.data.refresh;

        localStorage.setItem("access", newAccess);

        if (newRefresh) {
          localStorage.setItem("refresh", newRefresh);
        }

        originalRequest.headers.Authorization =
          `Bearer ${newAccess}`;

        return api(originalRequest);

      }

      catch (refreshError) {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        window.location.href = "/login";

        return Promise.reject(refreshError);

      }

    }

    return Promise.reject(error);

  }

);

export default api;
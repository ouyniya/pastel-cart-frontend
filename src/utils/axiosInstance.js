import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const persisted = localStorage.getItem("ecom-store"); // ไม่ใช้ React hook
      if (persisted) {
        const { token } = JSON.parse(persisted).state;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.log("Error reading token from localStorage: ", error);
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;

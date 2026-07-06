import axios from "axios";

//create custom axios instance
const axiosClient = axios.create({
  baseURL: "https://spending-tracker-4l2u.onrender.com",
});

// Attach token automatically
// config contains all request details(method,URL,headers)
// Request interceptor
axiosClient.interceptors.request.use((config) => {
  const storage = localStorage.getItem("user");
  if (storage) {
    const user = JSON.parse(storage);
    if (user.token) {
      config.headers.Authorization = "Bearer " + user.token;
    }
  }
  return config;
});

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    error.customMessage = error.response?.data?.message || "Request failed";
    return Promise.reject(error);
  }
);

export default axiosClient;



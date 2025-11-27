import axios from "axios";

//create custom axios instance
const axiosClient = axios.create({
  baseURL: "https://spending-tracker-4l2u.onrender.com",
});

// Attach token automatically
//config contains all request details(method,URL,headers)
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

/* Global error handler
response interceptor runs after every response
If server returns success (status 200, 201, 204 etc.)
→ just return the response as it is.
*/
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Request failed";
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;


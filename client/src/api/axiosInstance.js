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
    error.customMessage = error.response?.data?.message || "Request failed";
    return Promise.reject(error);
  }
);

export default axiosClient;

/*
use()method accept 2 functions
1️⃣ First arrow function → handles success:
(response) => response
Meaning:
If the API request succeeds
Just return the response normally
2️⃣ Second arrow function → handles errors:
(error) => {
  const message = error.response?.data?.message || "Request failed";
  return Promise.reject(new Error(message));
}
Meaning:
If the API fails
Extract the error message from server
Return your own custom Error

Interceptors = Functions that run automatically before a request is sent OR after a response comes back.

🧩 Where do they run?
✔ Request interceptor
Runs before axios sends the request.
✔ Response interceptor
Runs after axios receives the response.

🧠 Simple analogy
Interceptors work like this:
You → interceptor → server → interceptor → You
First interceptor: modify request
Second interceptor: clean/modify response 
*/

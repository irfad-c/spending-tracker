// Base URL of your backend API
const BASE_URL = "http://localhost:5000/api";

// A reusable fetch wrapper that:
// 1. Reads token from localStorage
// 2. Automatically attaches it to Authorization header
// 3. Sends request and returns JSON response
async function fetchAPI(
  endpoint,
  { method = "GET", body = null, headers = {} } = {}
) {
  // Check if user is stored
  const storage = localStorage.getItem("user");
  if (storage) {
    const user = JSON.parse(storage);
    if (user.token) {
      headers["Authorization"] = "Bearer " + user.token;
    }
  }

  // If sending JSON data, add Content-Type
  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }

  // Make the request
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body,
  });

  // Convert response to JSON
  const data = await response.json();

  // If backend sends an error response
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export default fetchAPI;

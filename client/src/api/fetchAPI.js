// Base URL of your backend API
const BASE_URL = "http://localhost:5000";

/*A reusable fetch wrapper that:
 1. Reads token from localStorage
2. Automatically attaches it to Authorization header
3. Sends request and returns JSON response*/

async function fetchAPI(
  //endpoint - The route we want to call
  endpoint,
  /*headers = {} → start with an empty headers object (we will add things to it).
  headers is like a bag where we put things that describe our request.*/
  { method = "GET", body = null, headers = {} } = {}
) {
  // Check if user is stored
  const storage = localStorage.getItem("user");
  /**If the user is logged in, we take their token and automatically add it to:
   Authorization: Bearer <token>
   This means no need to manually attach token inside every API call. */

  if (storage) {
    const user = JSON.parse(storage);
    if (user.token) {
      /* This means we are adding a key named "Authorization" to the  headers object.Why add "Bearer " and a space?
         Because this is how tokens must be formatted in HTTP:
         Authorization: Bearer YOUR_TOKENThere must be a space between Bearer and the token.This is a standard rule (not our choice). */
      headers["Authorization"] = "Bearer " + user.token;
    }
  }

  if (body) {
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

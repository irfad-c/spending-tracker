const BASE_URL = "http://localhost:5000";

async function fetchAPI(
  endpoint,
  { method = "GET", body = null, headers = {} } = {}
) {
  const storage = localStorage.getItem("user");
  if (storage) {
    const user = JSON.parse(storage);
    if (user.token) {
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

/*
A reusable fetch wrapper that:
✅ Adds your base URL (http://localhost:5000)
✅ Adds your token (if the user is already logged in)
✅ Converts your data to JSON
✅ Handles errors and response parsing (using await response.json())
✅ Reads token from localStorage
✅ Automatically attaches it to Authorization header
✅ Sends request and returns JSON response

 //endpoint - The route we want to call

  headers = {} → start with an empty headers object (we will add things to it).
  headers is like a bag where we put things that describe our request.

  This part:
({ method = "GET", body = null, headers = {} } = {})
This is a fancy way to give default values if something is missing.
If you call:
fetchAPI("/api/login", { method: "POST", body: { email, password } })
Then the function uses your given values instead of defaults.

After login
When user logs in, you probably do something like:
localStorage.setItem("user", JSON.stringify({
  id: "123",
  name: "Irfad",
  email: "irfad@gmail.com",
  token: "abcd123"
}))
Now when you use fetchAPI() for another request:
const storage = localStorage.getItem("user");
That returns a string:
'{"id":"123","name":"Irfad","email":"irfad@gmail.com","token":"abcd123"}'
Then this line:
const user = JSON.parse(storage);
makes it a JS object:
{
  id: "123",
  name: "Irfad",
  email: "irfad@gmail.com",
  token: "abcd123"
}
Then:
headers["Authorization"] = "Bearer " + user.token;
adds this header automatically:
Authorization: Bearer abcd123
✅ So, now your backend can recognize which user is making the request.

headers commonly look like this
headers:{
"Content-Type":"application/json",
Authorization:Bearer token}

/**we are adding token to Authorization
   Authorization: Bearer <token>
   This means no need to manually attach token inside every API call. */
/* This means we are adding a key named "Authorization" to the  headers object.
      Why add "Bearer " and a space?
      Because this is how tokens must be formatted in HTTP:
      Authorization: Bearer YOUR_TOKEN 
      There must be a space between Bearer and the token.This is a standard rule (not our choice). */

//data which is sendig is from frontend to backend called request body
//HTTP requests can include headers. Headers are like extra information packaged with the request.
// */

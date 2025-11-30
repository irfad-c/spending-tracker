import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //jwt.verify() decodes the token and returns what was inside it — the { id: user._id } object

    const user = await User.findById(decoded.id).select("-password");
    //here id we already defined in authRoutes.js when we loggged in
    //select("-password") means “get all fields except password.”

    if (!user) return res.status(401).json({ message: "User not found" });
    //attaches user info to req.user
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

/*
What is the purpose of this file

we are verifying the validity of token using id.This id we stored when we create the token.

The "body" is the data we send to the backend during requests such as login or signup. 
Example: { email, password }. It must be converted to JSON before sending.

The "Authorization" header is where we send the JWT token. 
The format must be "Authorization: Bearer <token>". 
This token is used by the backend to verify who the user is.

The token only stores the user’s id. So after verifying the token,
we use decoded.id to find the actual user from the database.
User.findById(decoded.id) retrieves the user document.
.select("-password") makes sure the password is not included.
Finally, we attach this user to req.user so any protected route
knows which user is logged in.

*/

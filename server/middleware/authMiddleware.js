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
    //jwt.verify() decodes the token and returns what was inside it — the { id: user._id } object
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //here id we already defined in authRoutes.js when we loggged in
    //select("-password") means “get all fields except password.”
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(401).json({ message: "User not found" });
    //attaches user info to req.user
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

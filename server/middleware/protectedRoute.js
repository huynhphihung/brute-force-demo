import jwt from "jsonwebtoken";
import AuthModel from "../models/auth.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await AuthModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;

    next();
  } catch (error) {
    console.error("Protected route error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

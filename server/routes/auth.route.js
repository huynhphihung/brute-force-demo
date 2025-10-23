import express from "express";
import { login, signOut, signup } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", signOut);

router.get("/check-auth", protectedRoute, (req, res) => {
  res.status(200).json({
    message: "Authenticated",
    user: { username: req.user.username, _id: req.user._id },
  });
});

export default router;

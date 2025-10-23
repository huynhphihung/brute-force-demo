import AuthModel from "../models/auth.model.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const accessToken = (userId, res) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Check if user already exists
    const existedUser = await AuthModel.findOne({ username });

    if (existedUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new AuthModel({ username, password: hashedPassword });

    if (newUser) {
      accessToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        message: "User created successfully",
        user: { username: newUser.username, _id: newUser._id },
      });
    }
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await AuthModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    accessToken(user._id, res);
    return res.status(200).json({
      message: "Login successful",
      user: { username: user.username, _id: user._id },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signOut = async (req, res) => {
  try {
    // Here you can handle any server-side sign-out logic if needed
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    return res.status(200).json({ message: "Sign-out successful" });
  } catch (error) {
    console.error("Sign-out error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

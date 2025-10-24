import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

export const useAuthStore = create((set) => ({
  user: null,
  message: null,
  isCheckingAuth: false,
  isLogin: false,
  isSignup: false,
  login: async (userData) => {
    set({ isLogin: true });
    try {
      const res = await axiosInstance.post("/auth/login", userData);
      if (res.status === 200) {
        set({ user: res.data.user });
      }
      set({ isLogin: false });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      set({ message: errorMessage });
    } finally {
      set({ isLogin: false });
    }
  },
  signup: async (userData) => {
    set({ isSignup: true });
    try {
      const res = await axiosInstance.post("/auth/signup", userData);
      if (res.status === 200) {
        set({ user: res.data.user });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      set({ message: errorMessage });
    } finally {
      set({ isSignup: false });
    }
  },
  signout: async () => {
    const res = await axiosInstance.post("/auth/logout");
    if (res.status === 200) {
      set({ user: null });
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check-auth", {
        withCredentials: true,
      });
      if (res.status === 200) {
        set({ user: res.data.user });
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));

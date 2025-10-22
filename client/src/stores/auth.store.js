import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

export const useAuthStore = create((set) => ({
  user: null,
  isCheckingAuth: false,
  isLogin: false,
  login: async (userData) => {
    set({ isLogin: true });
    const res = await axiosInstance.post("/auth/login", userData);
    if (res.status === 200) {
      set({ user: res.data.user });
    }
    set({ isLogin: false });
  },
  signup: async (userData) => {
    console.log(userData);

    set({ isLogin: true });
    const res = await axiosInstance.post("/auth/signup", userData);
    if (res.status === 200) {
      set({ user: res.data.user });
    }
    set({ isLogin: false });
  },
  signout: async () => {
    set({ isLogin: true });
    const res = await axiosInstance.post("/auth/logout");
    if (res.status === 200) {
      set({ user: null });
    }
    set({ isLogin: false });
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

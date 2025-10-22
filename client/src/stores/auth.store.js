import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

export const useAuthStore = create((set) => ({
  user: null,
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
}));

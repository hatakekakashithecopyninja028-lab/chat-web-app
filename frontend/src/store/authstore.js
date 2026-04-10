import { create } from "zustand";

import { api } from "../api/axios.js";
import toast from "react-hot-toast";


const BASE_API = import.meta.env.MODE === "development" ? "http://localhost:8000" : "/";
import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers :[],
  socket: null,

checkAuth: async () => {
    try {
      const res = await api.get("/auth/check");

      set({ authUser: res.data });
       get().connectSocket();
     
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await api.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await api.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
       get().connectSocket();

      
    } catch (error) {
      toast.error(error.response.data.message);
       get().disconnectSocket();
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await api.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_API, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    socket.getReceiverSocketId = (userId) => {
      // This will be populated from backend somehow
      return null; // temporary
    };

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    const handleTyping = () => {
  socket.emit("typing", { receiverId });
};

const handleStopTyping = () => {
  socket.emit("stopTyping", { receiverId });
};
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },


}))


 
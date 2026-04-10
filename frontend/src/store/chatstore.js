import { create } from "zustand";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authstore";
import { io } from "socket.io-client";

import { api } from "../api/axios";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await api.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await api.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await api.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error);
    }
  },
  sendingmessage: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  notsendingmessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  emitTyping: (receiverId) => {
  const socket = useAuthStore.getState().socket;
  socket.emit("typing", { receiverId });
},

emitStopTyping: (receiverId) => {
  const socket = useAuthStore.getState().socket;
  socket.emit("stopTyping", { receiverId });
},

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  }
}));

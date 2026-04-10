import React from 'react'
import { useChatStore } from "../store/chatstore";
import { useEffect, useRef, useState} from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from '../store/authstore';

import { Loader } from 'lucide-react';
import { formatMessageTime } from '../api/utils';

const Selected = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    sendingmessage,
    notsendingmessage,

    
  } = useChatStore();
  const { authUser ,socket} = useAuthStore();
  const messageEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    console.log('Selected render - socket:', !!socket, 'selectedUser:', !!selectedUser, 'isTyping:', isTyping);
  });

  useEffect(() => {
    if (!socket) return;

    const handleTyping = () => {
      console.log('>>> Selected.jsx RECEIVED TYPING - setting true');
      setIsTyping(true);
    };
    const handleStopTyping = () => {
      console.log('>>> Selected.jsx RECEIVED STOP TYPING - setting false');
      setIsTyping(false);
    };

    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
  }, [socket]);

  useEffect(() => {
    getMessages(selectedUser._id);

    sendingmessage();

    return () => notsendingmessage();
  }, [selectedUser._id, getMessages, sendingmessage, notsendingmessage]);


   useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
<Loader/>
        <MessageInput />
      </div>
    );
  }
 return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/mikasa.png"
                      : selectedUser.profilePic || "/mikasa.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
        {isTyping && (
          <div className="absolute bottom-20 left-4 right-4 bg-black/80 backdrop-blur-sm border border-blue-500 rounded-2xl p-4 shadow-2xl z-50 animate-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.1s]"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.1s]"></div>
              </div>
              <span className="text-white font-medium text-sm">Typing...</span>
            </div>
          </div>
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default Selected;

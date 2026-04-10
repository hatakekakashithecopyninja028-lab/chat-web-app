import React from 'react';
import { Camera, CheckCheck, Mail, Settings, User, X, ArrowLeft, MessageSquare } from "lucide-react";
import { useChatStore } from '../store/chatstore';
import { useAuthStore } from '../store/authstore';
import { Link, useNavigate } from "react-router-dom";

const Otherprofile = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();
  const navigate = useNavigate();

  if (!selectedUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/20 to-black">
        <div className="text-center p-8">
          <User className="size-24 text-slate-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">No User Selected</h1>
          <p className="text-slate-400 mb-8">Select a user from chat sidebar</p>
          <Link to="/" className="btn btn-primary">
            Go to Chat
          </Link>
        </div>
      </div>
    );
  }

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-black">
      {/* Back button */}
      <div className="p-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to Chat</span>
        </button>
      </div>

      <div className="max-w-md mx-auto p-6 lg:p-8 bg-slate-900/80 border border-white/20 rounded-4xl shadow-2xl shadow-purple-500/10 backdrop-blur-lg">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-4">
            {selectedUser.fullName}
          </h1>
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isOnline ? 'bg-green-500/20 text-green-200' : 'bg-gray-500/20 text-gray-300'
            }`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center mb-8">
          <div className="relative group">
            <img 
              src={selectedUser.profilePic || "/mikasa.png"} 
              alt={selectedUser.fullName}
              className="size-32 object-cover rounded-4xl ring-4 ring-white/20 shadow-2xl group-hover:scale-105 transition-transform duration-300" 
            />
            <Camera className="absolute -top-2 -right-2 size-8 bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-3xl text-white shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </div>
        </div>

        {/* Info Cards */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <User className="w-5 h-5" />
              <span>Full Name</span>
            </div>
            <div className="px-6 py-4 backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl font-semibold text-white shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
              {selectedUser.fullName}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </div>
            <div className="px-6 py-4 backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl font-semibold text-white shadow-lg hover:shadow-purple-500/20 transition-all duration-300 break-words">
              {selectedUser.email || 'email@example.com'}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 space-y-3">
          <button 
            onClick={() => {
              setSelectedUser(selectedUser);
              navigate('/');
            }}
            className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-3xl shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            Send Message
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default Otherprofile;

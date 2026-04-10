import React from 'react';
import { LogOut, User, Mail, CheckCheck } from 'lucide-react';
import { useAuthStore } from '../store/authstore';

const Setting = () => {
  const { authUser, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-black">
      <div className="max-w-2xl mx-auto p-8">
        <div className="border-white/20 rounded-4xl p-8 shadow-2xl shadow-purple-500/10 space-y-8 bg-slate-900/60 border-white/20 ">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-slate-900/60 border-white/20  bg-clip-text text-white mb-2">Settings</h1>
            <p className="text-white text-lg">Manage your account</p>
          </div>

          {/* Account Info */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-slate-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Username
              </div>
              <p className="px-6 py-4 backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl font-medium text-white shadow-lg shadow-purple-500/10">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-slate-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </div>
              <p className="px-6 py-4 backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl font-medium text-white shadow-lg shadow-purple-500/10 break-all">
                {authUser?.email }
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-slate-400 flex items-center gap-2">
                <CheckCheck className="w-4 h-4 text-green-400" />
                Member Since
              </div>
              <p className="px-6 py-4 backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl font-medium text-white shadow-lg shadow-purple-500/10">
                {authUser.createdAt?.split("T")[0] }
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <div className="pt-8 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/10 flex items-center justify-center gap-3 text-lg"
            >
              <LogOut className="w-5 h-5" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
